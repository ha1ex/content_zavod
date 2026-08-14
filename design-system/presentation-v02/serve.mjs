/* Статический сервер для просмотра презентаций.
   Нужен потому, что дек — это обычные HTML/CSS/JS-файлы, и поднимать ради него
   Next.js незачем. Написан на голом Node без единой зависимости: в git-воркtree
   node_modules нет, и `next dev` там падает на резолве самого next.

   Запуск: node design-system/presentation-v02/serve.mjs [порт]
   Или через preview_start по имени «presentation» из .claude/launch.json. */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PORT = Number(process.argv[2] ?? process.env.PORT ?? 4180);

const TYPES = {
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

const server = createServer(async (req, res) => {
  let rel = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (rel === '/') rel = '/examples/kaiten-content-factory.html';

  // Не выпускаем запрос за пределы каталога презентаций.
  const path = normalize(join(ROOT, rel));
  if (!path.startsWith(ROOT.endsWith(sep) ? ROOT : ROOT + sep)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  try {
    const info = await stat(path);
    if (info.isDirectory()) {
      res.writeHead(302, { Location: rel.replace(/\/?$/, '/') + 'index.html' }).end();
      return;
    }
    const body = await readFile(path);
    res.writeHead(200, {
      'Content-Type': TYPES[extname(path).toLowerCase()] ?? 'application/octet-stream',
      // Правки в css видны сразу после перезагрузки, без сброса кеша руками.
      'Cache-Control': 'no-store',
    }).end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Не найдено: ' + rel);
  }
});

server.listen(PORT, () => {
  console.log(`Презентации: http://localhost:${PORT}/`);
  console.log(`Каталог: ${ROOT}`);
});
