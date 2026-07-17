import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { z } from 'zod';
import { BriefSchema } from '@kaiten/harness/schemas';
import { generateLandingViaCli, type GenProgress } from './cli-generate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

function findRepoRoot(): string {
  return resolve(process.cwd(), '..', '..');
}

const SlugSchema = z
  .string()
  .min(2)
  .max(64)
  .regex(/^[a-z0-9][a-z0-9-]*$/i, 'kebab-case, латиница и цифры');

const BodySchema = z.object({
  slug: SlugSchema,
  brief: BriefSchema,
});

function sseEncode(data: string, event?: string): string {
  const lines: string[] = [];
  if (event) lines.push(`event: ${event}`);
  for (const line of data.split('\n')) lines.push(`data: ${line}`);
  lines.push('');
  return lines.join('\n') + '\n';
}

export async function POST(req: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid json body' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: 'invalid brief', issues: parsed.error.flatten() }),
      { status: 400, headers: { 'content-type': 'application/json' } },
    );
  }

  const { slug, brief } = parsed.data;
  const root = findRepoRoot();
  const briefPath = resolve(root, 'content', 'briefs', `${slug}.json`);

  await mkdir(resolve(root, 'content', 'briefs'), { recursive: true });
  await writeFile(briefPath, JSON.stringify(brief, null, 2) + '\n', 'utf-8');

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      function send(data: string, event?: string) {
        try {
          controller.enqueue(encoder.encode(sseEncode(data, event)));
        } catch {
          // controller closed (client disconnected)
        }
      }

      send(`brief сохранён: content/briefs/${slug}.json`, 'progress');
      send('начинаю generation pipeline через локальный claude CLI (без API ключа)', 'progress');

      const onProgress = (p: GenProgress) => {
        const text = p.detail ? `${p.message}\n${p.detail}` : p.message;
        send(text, 'progress');
      };

      let result;
      try {
        result = await generateLandingViaCli(root, slug, brief, onProgress);
      } catch (err) {
        send(
          `Неожиданная ошибка: ${(err as Error).message}\nПроверь что claude установлен и авторизован: запусти "claude -p ping" в терминале.`,
          'error',
        );
        controller.close();
        return;
      }

      if (!result.ok) {
        send(result.error ?? 'Неизвестная ошибка генерации', 'error');
        if (result.editUrl) {
          send(`Можно открыть в редакторе и поправить: ${result.editUrl}`, 'progress');
        }
        controller.close();
        return;
      }

      send(
        [
          `Готово! ${result.sectionsCount} секций сгенерировано.`,
          `Preview: ${result.previewUrl}`,
          `Редактор: ${result.editUrl}`,
          `Approve: ${result.approveUrl}`,
        ].join('\n'),
        'done',
      );
      controller.close();
    },

    cancel() {
      // client disconnected — пока что не убиваем child process,
      // потому что он живёт в generateLandingViaCli через свой timeout.
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-store, no-transform',
      'x-accel-buffering': 'no',
    },
  });
}
