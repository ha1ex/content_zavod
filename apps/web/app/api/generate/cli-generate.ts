import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { prepareLanding, ingestLanding } from '@kaiten/harness/agent';
import type { Brief } from '@kaiten/harness/schemas';

export type GenStage = 'prepare' | 'llm' | 'parse' | 'apply' | 'done' | 'error';

export interface GenProgress {
  stage: GenStage;
  message: string;
  detail?: string;
}

export interface GenResult {
  ok: boolean;
  error?: string;
  previewUrl?: string;
  editUrl?: string;
  approveUrl?: string;
  sectionsCount?: number;
}

const CLAUDE_TIMEOUT_MS = 4 * 60_000;

interface RunClaudeOk {
  ok: true;
  text: string;
  costUsd?: number;
}

interface RunClaudeFail {
  ok: false;
  error: string;
}

function findJsonObject(text: string): unknown | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced && fenced[1]) {
    try {
      return JSON.parse(fenced[1].trim());
    } catch {
      // continue
    }
  }
  try {
    return JSON.parse(text.trim());
  } catch {
    // continue
  }
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start !== -1 && end > start) {
    try {
      return JSON.parse(text.slice(start, end + 1));
    } catch {
      // continue
    }
  }
  return null;
}

async function runClaude(
  prompt: string,
  onTick: () => void,
): Promise<RunClaudeOk | RunClaudeFail> {
  return new Promise((resolve) => {
    const child = spawn('claude', ['-p', '--output-format', 'json'], {
      env: { ...process.env, FORCE_COLOR: '0', NO_COLOR: '1' },
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (c: Buffer) => {
      stdout += c.toString('utf-8');
    });
    child.stderr.on('data', (c: Buffer) => {
      stderr += c.toString('utf-8');
    });

    const heartbeat = setInterval(onTick, 15_000);
    const timer = setTimeout(() => {
      clearInterval(heartbeat);
      try {
        child.kill('SIGTERM');
      } catch {
        // ignore
      }
      resolve({ ok: false, error: `claude timeout (${CLAUDE_TIMEOUT_MS / 1000}s)` });
    }, CLAUDE_TIMEOUT_MS);

    child.on('error', (err) => {
      clearTimeout(timer);
      clearInterval(heartbeat);
      resolve({ ok: false, error: `claude spawn error: ${err.message}` });
    });

    child.on('close', (code) => {
      clearTimeout(timer);
      clearInterval(heartbeat);
      if (code !== 0) {
        resolve({
          ok: false,
          error: `claude exit ${code}. stderr: ${stderr.slice(0, 600)}`,
        });
        return;
      }
      try {
        const meta = JSON.parse(stdout) as {
          is_error?: boolean;
          result?: string;
          total_cost_usd?: number;
        };
        if (meta.is_error) {
          resolve({ ok: false, error: 'claude вернул is_error=true' });
          return;
        }
        if (!meta.result) {
          resolve({ ok: false, error: 'claude вернул пустой result' });
          return;
        }
        resolve({ ok: true, text: meta.result, costUsd: meta.total_cost_usd });
      } catch (err) {
        resolve({
          ok: false,
          error: `Не удалось разобрать ответ claude: ${(err as Error).message}`,
        });
      }
    });

    child.stdin.write(prompt);
    child.stdin.end();
  });
}

/**
 * Полный pipeline генерации лендинга через локальный claude CLI (без API ключа).
 *
 * Шаги:
 *  1. prepareLanding (программно) → собирает system+user+schema из BriefSchema
 *  2. claude -p --output-format json → получает текст LandingSpec
 *  3. parse JSON → write в content/landings/<slug>.json
 *  4. ingestLanding → валидация (Zod + 8 validators) + рендер TSX
 *  5. return preview/edit/approve URLs
 *
 * onProgress даёт SSE-стрим для UI: каждая фаза + heartbeat каждые 15 сек во время claude.
 */
export async function generateLandingViaCli(
  root: string,
  slug: string,
  brief: Brief,
  onProgress: (p: GenProgress) => void,
): Promise<GenResult> {
  const briefPathRel = `content/briefs/${slug}.json`;

  // 1. prepare
  onProgress({ stage: 'prepare', message: '1/4 Готовлю system+user prompts и JSON schema...' });
  let artifact;
  try {
    artifact = await prepareLanding({ root, briefPath: briefPathRel, slug });
  } catch (err) {
    const msg = (err as Error).message;
    return { ok: false, error: `prepare упал: ${msg}` };
  }

  // 2. claude
  const promptForClaude = [
    'Ты — host LLM. Ниже SYSTEM, USER и JSON SCHEMA для генерации LandingSpec.',
    '',
    '=== SYSTEM ===',
    artifact.system,
    '',
    '=== USER ===',
    artifact.user,
    '',
    '=== SCHEMA (JSON Schema для LandingSpec) ===',
    JSON.stringify(artifact.schema),
    '',
    '=== ИНСТРУКЦИЯ ===',
    'Сгенерируй один JSON-объект, валидный по SCHEMA выше.',
    'Верни ТОЛЬКО JSON, без markdown-обёрток, без объяснений, без вызовов tools.',
    'Все строки на русском, тон — clear, professional, non-hype. Brand voice валидатор',
    'отклоняет hype-слова (революционный, AI-powered, best-in-class и пр.) — не используй.',
  ].join('\n');

  onProgress({
    stage: 'llm',
    message: '2/4 Запускаю claude (генерация LandingSpec, обычно 30-90 сек)...',
    detail: `Передаю ~${Math.round(promptForClaude.length / 1000)}KB промпта в claude -p.`,
  });

  const tickCount = { n: 0 };
  const claudeResult = await runClaude(promptForClaude, () => {
    tickCount.n += 1;
    onProgress({
      stage: 'llm',
      message: `claude всё ещё работает (${tickCount.n * 15}с)...`,
    });
  });

  if (!claudeResult.ok) {
    return { ok: false, error: claudeResult.error };
  }

  // 3. parse
  onProgress({ stage: 'parse', message: '3/4 Парсю LandingSpec из ответа claude...' });
  const specJson = findJsonObject(claudeResult.text);
  if (!specJson) {
    return {
      ok: false,
      error:
        'claude не вернул валидный JSON. Открой content/landings/' +
        slug +
        '.json чтобы увидеть что записано (если что-то), или попробуй ещё раз с более конкретным brief.',
    };
  }

  const specPath = `${root}/content/landings/${slug}.json`;
  try {
    await writeFile(specPath, JSON.stringify(specJson, null, 2) + '\n', 'utf-8');
  } catch (err) {
    return {
      ok: false,
      error: `Не удалось записать spec: ${(err as Error).message}`,
    };
  }

  // 4. ingest (validate + render)
  onProgress({ stage: 'apply', message: '4/4 Валидирую и рендерю TSX...' });
  let ingestResult;
  try {
    ingestResult = await ingestLanding({
      root,
      slug,
      briefPath: briefPathRel,
      generator: 'web-claude-cli',
      noAudienceGate: true, // первая генерация может не пройти audience-score — даём ingest пройти, спец увидит в редакторе
      noDiversityAudit: true, // без сравнения с другими лендингами
    });
  } catch (err) {
    return {
      ok: false,
      error: `ingest упал: ${(err as Error).message}`,
    };
  }
  void brief; // brief параметр оставлен для будущей логики (например metadata)

  if (!ingestResult.ok) {
    const errSummary = ingestResult.errors
      .slice(0, 5)
      .map((e) => `[${e.kind}] ${e.message}`)
      .join('\n');
    return {
      ok: false,
      error: `Spec не прошёл валидацию:\n${errSummary}\n\nSpec сохранён в content/landings/${slug}.json — можно открыть в редакторе /edit/${slug} и поправить.`,
      previewUrl: `/landings/${slug}`,
      editUrl: `/edit/${slug}`,
      approveUrl: `/approve/${slug}`,
      sectionsCount: ingestResult.sectionsCount,
    };
  }

  onProgress({
    stage: 'done',
    message: `Готово. ${ingestResult.sectionsCount} секций. ${
      claudeResult.costUsd ? `Cost: $${claudeResult.costUsd.toFixed(4)}` : ''
    }`,
  });

  return {
    ok: true,
    previewUrl: `/landings/${slug}`,
    editUrl: `/edit/${slug}`,
    approveUrl: `/approve/${slug}`,
    sectionsCount: ingestResult.sectionsCount,
  };
}
