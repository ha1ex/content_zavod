import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Деки — обычные HTML/CSS/JS-файлы в `design-system/presentation-v02/`, вне
 * `apps/web/public`. Копировать их в public нельзя: единственный источник правды —
 * каталог дизайн-системы, копия сразу разъедется. Поэтому раздаём отсюда, повторяя
 * `serve.mjs`: путь `/presentations/view/examples/<deck>.html` держит относительные
 * ссылки дека (`../kaiten-slides.css`, `../assets/...`) рабочими без правок в HTML.
 */
const ROOT = resolve(process.cwd(), '..', '..', 'design-system', 'presentation-v02');

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8',
};

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ path: string[] }> },
): Promise<Response> {
  const { path: segments } = await ctx.params;
  const rel = segments.map((s) => decodeURIComponent(s)).join('/');
  const file = normalize(join(ROOT, rel));

  // Не выпускаем запрос за пределы каталога презентаций.
  if (!file.startsWith(ROOT.endsWith(sep) ? ROOT : ROOT + sep)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const info = await stat(file);
    if (info.isDirectory()) return new Response('Not found', { status: 404 });
    const body = await readFile(file);
    return new Response(new Uint8Array(body), {
      status: 200,
      headers: {
        'content-type': TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream',
        // Правки в деке видны сразу после перезагрузки, без сброса кеша руками.
        'cache-control': 'no-store',
      },
    });
  } catch {
    return new Response(`Не найдено: ${rel}`, {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }
}
