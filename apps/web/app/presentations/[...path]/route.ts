import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { presentationsDir } from '../decks';

/**
 * Монтирует design-system/presentation-v02 на /presentations. Дек — это обычные
 * HTML/CSS/JS-файлы вне apps/web, статикой из public их не отдать, а относительные
 * ссылки внутри слайдов (../kaiten-slides.css, ../assets/mocks/*.png) резолвятся
 * по URL — поэтому отдаём весь каталог, а не один HTML. Логика как в serve.mjs.
 */

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.json': 'application/json; charset=utf-8',
};

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const root = presentationsDir();
  if (!root) return new Response('Not found', { status: 404 });

  const { path } = await params;
  const file = normalize(join(root, path.join('/')));
  // Не выпускаем запрос за пределы каталога презентаций.
  if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    if (!(await stat(file)).isFile()) return new Response('Not found', { status: 404 });
    return new Response(new Uint8Array(await readFile(file)), {
      headers: {
        'content-type': TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream',
        'cache-control': 'no-store',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
