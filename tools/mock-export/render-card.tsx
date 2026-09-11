/* Отдельная точка рендера: WindowCardMock не входит в render.tsx конвейера,
   а трогать общий список ради одного кадра не нужно. Разметку кладем рядом
   с остальными, чтобы build-css.cjs собрал под нее утилиты. */
import { renderToStaticMarkup } from 'react-dom/server';
import { writeFileSync, readFileSync } from 'node:fs';
import { WindowCardMock } from '../packages/ui/src/landing/mocks/WindowCardMock';

const html = renderToStaticMarkup(<WindowCardMock />);
writeFileSync('tools/mock-export/out/card-window.html', html, 'utf8');

// build-css.cjs сканирует out/all.html — дописываем туда наш блок
const all = readFileSync('tools/mock-export/out/all.html', 'utf8');
if (!all.includes('data-mock="card-window"')) {
  writeFileSync(
    'tools/mock-export/out/all.html',
    all + `\n<section data-mock="card-window">${html}</section>`,
    'utf8',
  );
}
console.log('card-window ->', html.length, 'символов');
