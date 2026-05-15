#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { HARNESS_VERSION } from './index.js';
import { BriefSchema, LandingSpecSchema } from './schemas/index.js';
import { generateLandingSpecWithLLM, generateLandingSpecWithLLMResult, landingSpecFromBrief } from './pipeline/index.js';
import { renderLandingToTSX } from './render/index.js';
import { describeRegistry } from './registry/index.js';
import { describeActiveProvider, hasLLMCredentials } from './providers/index.js';
import {
  appendLog,
  appendReviewerNote,
  fileLandingToWiki,
  ingestBrief,
  readLog,
  rebuildIndex,
  runLint,
  scaffoldWikiPage,
  updateLandingStatus,
  wikiSync,
  type LandingStatus,
  type LintScope,
  type LogOp,
  type WikiPageType,
} from './wiki/index.js';
import { REGISTRY } from './registry/index.js';
import { describeActiveProvider as describeProviderAgain } from './providers/index.js';
void describeProviderAgain;

const ROOT = resolve(process.cwd());

async function findRepoRoot(start: string): Promise<string> {
  // Ищем pnpm-workspace.yaml вверх по дереву; CLI могут вызывать из подпакета.
  let dir = start;
  for (let i = 0; i < 10; i++) {
    try {
      await readFile(resolve(dir, 'pnpm-workspace.yaml'));
      return dir;
    } catch {
      // not found here, go up
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return start;
}

const program = new Command();

program
  .name('harness')
  .description('LLM harness CLI — генерация SaaS-лендингов из brief')
  .version(HARNESS_VERSION);

program
  .command('generate')
  .description('Сгенерировать артефакт из brief')
  .argument('<kind>', 'тип артефакта: landing | illustration')
  .option('-b, --brief <path>', 'путь к brief.json (относительно репозитория)')
  .option('-s, --slug <slug>', 'slug черновика', 'draft')
  .option('--no-llm', 'детерминированный fallback вместо LLM (для тестов/CI)')
  .action(async (kind: string, opts: { brief?: string; slug: string; llm: boolean }) => {
    if (kind !== 'landing') {
      console.error(chalk.red(`[harness] kind=${kind} не поддерживается (пока только landing)`));
      process.exit(1);
    }
    if (!opts.brief) {
      console.error(chalk.red('[harness] --brief обязателен'));
      process.exit(1);
    }

    const root = await findRepoRoot(ROOT);
    const briefPath = resolve(root, opts.brief);
    console.log(chalk.cyan(`[harness] read brief: ${briefPath}`));

    const briefRaw = await readFile(briefPath, 'utf-8');
    const brief = BriefSchema.parse(JSON.parse(briefRaw));

    const wantLLM = opts.llm !== false;
    const canLLM = hasLLMCredentials();
    const useLLM = wantLLM && canLLM;

    let spec;
    let sources: string[] = [];
    let archetype: string | undefined;
    let tokenEstimate: number | undefined;
    let durationMs = 0;
    let generator = '';
    if (useLLM) {
      const provider = describeActiveProvider();
      console.log(chalk.cyan(`[harness] provider: ${provider}`));
      console.log(chalk.dim(`[harness] generating with LLM…`));
      const t0 = Date.now();
      const result = await generateLandingSpecWithLLMResult(brief);
      durationMs = Date.now() - t0;
      spec = result.spec;
      sources = result.sources;
      generator = provider;
      console.log(chalk.green(`[harness] ✓ LLM spec in ${durationMs}ms (sources=${sources.length})`));
    } else {
      const reason = !wantLLM ? '--no-llm' : 'no API key';
      console.log(chalk.yellow(`[harness] deterministic fallback (${reason})`));
      spec = landingSpecFromBrief(brief);
      sources = [];
      generator = `deterministic-fallback (${reason})`;
    }
    archetype = spec.pageType;
    void tokenEstimate;

    // Сохраняем meta в spec, чтобы content/landings/<slug>.json содержал traceability.
    spec.meta = {
      sources,
      generatedAt: new Date().toISOString(),
      generator,
      archetype,
    };

    const specPath = resolve(root, 'content', 'landings', `${opts.slug}.json`);
    await mkdir(dirname(specPath), { recursive: true });
    await writeFile(specPath, JSON.stringify(spec, null, 2) + '\n', 'utf-8');
    console.log(chalk.green(`[harness] ✓ spec  → ${specPath}`));

    const tsx = renderLandingToTSX(spec, opts.slug);
    const tsxPath = resolve(root, 'generated', 'landings', opts.slug, 'page.tsx');
    await mkdir(dirname(tsxPath), { recursive: true });
    await writeFile(tsxPath, tsx, 'utf-8');
    console.log(chalk.green(`[harness] ✓ tsx   → ${tsxPath}`));

    // M4b filing back: wiki/landings/<slug>.md
    try {
      const wikiPath = await fileLandingToWiki(root, {
        slug: opts.slug,
        brief,
        briefPath: opts.brief!,
        spec,
        sources,
        archetype,
        durationMs,
        generator,
      });
      console.log(chalk.green(`[harness] ✓ wiki  → ${wikiPath}`));
    } catch (err) {
      console.log(chalk.yellow(`[harness] warn: filing back failed: ${(err as Error).message}`));
    }

    // M3 post-generate hook: wiki/log.md
    await appendLog(root, {
      op: 'generate',
      slug: opts.slug,
      status: 'ok',
      note: `archetype=${archetype} sections=${spec.sections.length} via=${useLLM ? 'llm' : 'fallback'} sources=${sources.length} dur=${durationMs}ms`,
    }).catch((err) => {
      console.log(chalk.yellow(`[harness] warn: не удалось записать в wiki/log.md: ${(err as Error).message}`));
    });

    console.log(chalk.dim(`\nПревью: http://localhost:3000/landings/${opts.slug}`));
  });

program
  .command('validate')
  .description('Валидировать существующий spec')
  .argument('<slug>', 'slug черновика')
  .action(async (slug: string) => {
    const root = await findRepoRoot(ROOT);
    const path = resolve(root, 'content', 'landings', `${slug}.json`);
    const raw = await readFile(path, 'utf-8');
    const parsed = LandingSpecSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) {
      console.error(chalk.red(`[harness] ✗ spec invalid`));
      console.error(parsed.error.format());
      process.exit(1);
    }
    console.log(chalk.green(`[harness] ✓ spec valid (${parsed.data.sections.length} sections)`));
  });

program
  .command('registry')
  .description('Показать component registry (для system prompt LLM)')
  .action(() => {
    console.log(describeRegistry());
  });

program
  .command('providers')
  .description('Показать активный LLM-провайдер и наличие ключей')
  .action(() => {
    console.log(`[harness] ${describeActiveProvider()}`);
    if (!hasLLMCredentials()) {
      console.log(
        chalk.yellow(
          '\nLLM недоступен. Положите ключ в .env.local:\n' +
            '  AI_GATEWAY_API_KEY=...   (рекомендуется)\n' +
            '  ANTHROPIC_API_KEY=...    (direct fallback)\n' +
            '  OPENAI_API_KEY=...       (direct fallback)\n',
        ),
      );
    }
  });

const wiki = program
  .command('wiki')
  .description('Команды для работы с wiki/ (sync, index, new, validate)');

wiki
  .command('sync')
  .description('Регенерировать derived из design-system/kaiten-v01/tokens.json: tokens.css, wiki/design-system/*.md gen-blocks')
  .action(async () => {
    const root = await findRepoRoot(ROOT);
    console.log(chalk.cyan('[harness] wiki sync: tokens.json → tokens.css + wiki/design-system/*.md'));
    const result = await wikiSync(root);
    for (const p of result.written) console.log(chalk.green(`  written  ${p}`));
    for (const p of result.unchanged) console.log(chalk.dim(`  ok       ${p}`));
    for (const p of result.missingPages)
      console.log(chalk.yellow(`  missing  ${p}  (создайте страницу руками)`));
    console.log(
      chalk.cyan(
        `[harness] wiki sync done: ${result.written.length} written, ${result.unchanged.length} unchanged, ${result.missingPages.length} missing`,
      ),
    );
    await appendLog(root, {
      op: 'wiki-sync',
      status: 'ok',
      note: `written=${result.written.length} unchanged=${result.unchanged.length} missing=${result.missingPages.length}`,
    });
  });

wiki
  .command('index')
  .description('Регенерировать wiki/index.md из всех страниц wiki/**.md (читает front-matter)')
  .action(async () => {
    const root = await findRepoRoot(ROOT);
    const result = await rebuildIndex(root);
    if (result.changed) {
      console.log(chalk.green(`[harness] ✓ wiki/index.md regenerated (${result.pageCount} pages)`));
    } else {
      console.log(chalk.dim(`[harness] wiki/index.md уже актуален (${result.pageCount} pages)`));
    }
    await appendLog(root, {
      op: 'wiki-index',
      status: 'ok',
      note: `pages=${result.pageCount} changed=${result.changed}`,
    });
  });

wiki
  .command('new')
  .description('Создать новую wiki-страницу (audience | pattern | landing | archetype)')
  .argument('<type>', 'тип страницы: audience | pattern | landing | archetype')
  .argument('<slug>', 'kebab-case идентификатор')
  .action(async (type: string, slug: string) => {
    const allowed: WikiPageType[] = ['audience', 'pattern', 'landing', 'archetype'];
    if (!allowed.includes(type as WikiPageType)) {
      console.error(chalk.red(`[harness] неподдерживаемый тип: ${type} (ожидается: ${allowed.join(', ')})`));
      process.exit(1);
    }
    const root = await findRepoRoot(ROOT);
    const result = await scaffoldWikiPage(root, type as WikiPageType, slug);
    if (result.alreadyExists) {
      console.log(chalk.yellow(`[harness] ${result.path} уже существует — не перетёрт`));
    } else {
      console.log(chalk.green(`[harness] ✓ scaffolded ${result.path}`));
    }
  });

wiki
  .command('validate')
  .description('Алиас для `harness lint --scope wiki`')
  .action(async () => {
    const root = await findRepoRoot(ROOT);
    const result = await runLint(root, 'wiki', REGISTRY.map((c) => c.name));
    printLintResult(result);
  });

program
  .command('lint')
  .description('Проверки drift и валидность wiki/, tokens, registry')
  .option('--scope <scope>', 'all | wiki | registry | prompts', 'all')
  .option('--json', 'JSON вывод (для CI)', false)
  .action(async (opts: { scope: string; json: boolean }) => {
    const root = await findRepoRoot(ROOT);
    const scope = (['all', 'wiki', 'registry', 'prompts'].includes(opts.scope) ? opts.scope : 'all') as LintScope;
    const result = await runLint(root, scope, REGISTRY.map((c) => c.name));
    if (opts.json) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      printLintResult(result);
    }
    await appendLog(root, {
      op: 'lint',
      status: result.issues.some((i) => i.severity === 'error') ? 'fail' : 'ok',
      note: `scope=${scope} files=${result.filesChecked} errors=${result.issues.filter((i) => i.severity === 'error').length} warnings=${result.issues.filter((i) => i.severity === 'warning').length}`,
    });
    if (result.issues.some((i) => i.severity === 'error')) process.exit(1);
  });

const ingest = program
  .command('ingest')
  .description('Ingest brief/feedback в wiki (audiences, lessons, reviewer notes)');

ingest
  .command('brief')
  .description('Классифицировать brief через LLM и создать wiki/audiences/*.md')
  .argument('<path>', 'путь к brief.json')
  .option('--no-llm', 'детерминированный fallback')
  .action(async (path: string, opts: { llm: boolean }) => {
    const root = await findRepoRoot(ROOT);
    const briefPath = resolve(root, path);
    const briefRaw = await readFile(briefPath, 'utf-8');
    const brief = BriefSchema.parse(JSON.parse(briefRaw));
    console.log(chalk.cyan(`[harness] ingest brief: ${path}`));
    const result = await ingestBrief(root, brief, path, { useLLM: opts.llm !== false });
    console.log(chalk.green(`  archetype hint: ${result.archetypeHint}`));
    for (const p of result.audiencesCreated) console.log(chalk.green(`  created  ${p}`));
    for (const p of result.audiencesUpdated) console.log(chalk.dim(`  exists   ${p}`));
    if (result.patternCandidates.length) {
      console.log(chalk.cyan(`  pattern hints: ${result.patternCandidates.join(', ')}`));
    }
    if (!result.llmUsed) {
      console.log(chalk.yellow('  (no-llm fallback использован)'));
    }
  });

ingest
  .command('feedback')
  .description('Добавить заметку ревьюера в wiki/landings/<slug>.md')
  .argument('<slug>', 'slug лендинга')
  .argument('<note>', 'текст заметки')
  .action(async (slug: string, note: string) => {
    const root = await findRepoRoot(ROOT);
    const path = await appendReviewerNote(root, { slug, note });
    console.log(chalk.green(`[harness] ✓ reviewer note → ${path}`));
    await appendLog(root, { op: 'ingest', slug, status: 'ok', note: `feedback: ${note.slice(0, 60)}${note.length > 60 ? '…' : ''}` });
  });

program
  .command('approve')
  .description('Обновить статус лендинга на approved (для интеграции с Approve UI / handoff)')
  .argument('<slug>', 'slug лендинга')
  .option('--baseline-ref <ref>', 'ссылка на visual baseline')
  .option('--note <text>', 'дополнительная заметка', '')
  .action(async (slug: string, opts: { baselineRef?: string; note?: string }) => {
    const root = await findRepoRoot(ROOT);
    const path = await updateLandingStatus(root, {
      slug,
      status: 'approved' as LandingStatus,
      baselineRef: opts.baselineRef,
      note: opts.note || 'approved via CLI',
    });
    console.log(chalk.green(`[harness] ✓ status=approved → ${path}`));
    await appendLog(root, { op: 'approve', slug, status: 'ok', note: opts.baselineRef ? `baseline=${opts.baselineRef}` : '' });
  });

program
  .command('log')
  .description('Показать последние записи wiki/log.md')
  .option('-n, --tail <n>', 'количество последних записей', '20')
  .option('--filter <op>', 'фильтр по операции: generate | ingest | lint | wiki-sync | approve | handoff')
  .action(async (opts: { tail: string; filter?: string }) => {
    const root = await findRepoRoot(ROOT);
    const entries = await readLog(root, {
      tail: parseInt(opts.tail, 10) || 20,
      filter: opts.filter as LogOp | undefined,
    });
    if (entries.length === 0) {
      console.log(chalk.dim('(log пуст или фильтр ничего не нашёл)'));
      return;
    }
    for (const line of entries) console.log(line);
  });

function printLintResult(result: { issues: { code: string; severity: string; message: string; path?: string }[]; filesChecked: number }): void {
  const errors = result.issues.filter((i) => i.severity === 'error');
  const warnings = result.issues.filter((i) => i.severity === 'warning');
  for (const i of errors) {
    console.log(chalk.red(`  ✗ [${i.code}] ${i.message}`));
  }
  for (const i of warnings) {
    console.log(chalk.yellow(`  ! [${i.code}] ${i.message}`));
  }
  if (errors.length === 0 && warnings.length === 0) {
    console.log(chalk.green(`[harness] ✓ lint clean (${result.filesChecked} files checked)`));
  } else {
    console.log(
      chalk.cyan(
        `[harness] ${errors.length} error(s), ${warnings.length} warning(s) across ${result.filesChecked} files`,
      ),
    );
  }
}

program
  .command('handoff')
  .description('Собрать ZIP-пакет для передачи разработчикам')
  .argument('<slug>', 'slug черновика')
  .action((slug: string) => {
    console.log(chalk.yellow(`[harness] handoff ${slug} — будет добавлено на этапе 6`));
  });

program.parseAsync(process.argv).catch((err) => {
  console.error(chalk.red('[harness] fatal:'), err);
  process.exit(1);
});
