/* Экспорт дека в PDF без диалога печати.

   Открывает деку в headless-браузере, включает печатный режим (класс is-print,
   который в обычной жизни ставится на beforeprint) и печатает в файл. Страница
   ровно 1920x1080 px, поля нулевые, фон рисуется — правила уже описаны
   в kaiten-slides.css.

   Запуск:
     node tools/deck-pdf/export.mjs [url или путь к html] [выходной файл]

   По умолчанию берет дек контент-завода и кладет PDF рядом с ним. */
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { resolve, dirname, basename } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';

const ROOT = resolve(new URL('../..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const input = process.argv[2] ?? 'design-system/presentation-v02/examples/kaiten-content-factory.html';
const isUrl = /^https?:\/\//.test(input);
const src = isUrl ? input : pathToFileURL(resolve(ROOT, input)).href;
const out = resolve(ROOT, process.argv[3] ?? (isUrl
  ? 'deck.pdf'
  : input.replace(/\.html$/, '.pdf')));

mkdirSync(dirname(out), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(src, { waitUntil: 'networkidle' });

// Печатный режим включаем сами: событие beforeprint при печати в файл
// не срабатывает, а без класса печатные правила не применяются.
await page.evaluate(() => document.documentElement.classList.add('is-print'));
await page.waitForTimeout(400);

await page.pdf({
  path: out,
  width: '1920px',
  height: '1080px',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
  preferCSSPageSize: true,
});

const slides = await page.evaluate(() => document.querySelectorAll('.slide').length);
await browser.close();

console.log('слайдов:', slides);
console.log('PDF:', out, existsSync(out) ? '— записан' : '— НЕ создан');
