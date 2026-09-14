import { readFile } from 'node:fs/promises';
import { resolve, normalize, sep, extname } from 'node:path';

// Раздаёт файлы презентаций из design-system/presentation-v02,
// чтобы деки открывались из того же приложения: /deck/examples/<имя>.html
// (относительные ссылки ../kaiten-slides.css резолвятся в /deck/…).

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
  '.pdf': 'application/pdf',
  '.md': 'text/markdown; charset=utf-8',
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: parts } = await params;
  const file = normalize(resolve(ROOT, ...parts.map(decodeURIComponent)));
  if (!file.startsWith(ROOT + sep)) {
    return new Response('Forbidden', { status: 403 });
  }
  try {
    const body = await readFile(file);
    return new Response(new Uint8Array(body), {
      headers: { 'Content-Type': TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream' },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
