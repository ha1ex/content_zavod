/* Снимает WindowCardMock под банковский дек.

   Прошлый кадр брался из разметки, скопированной с лендинга, а CSS под нее
   не собирался: утилиты Tailwind не резолвились, из-за чего пропали поля и
   скругление — карточка выглядела вырезанным прямоугольником. Теперь
   разметка идет из конвейера (.context/render-card.cjs), а стиль — из
   out/mocks.css, собранного под нее же.

   Текст подменяется здесь, а не в packages/ui: компонент общий, его тексты
   принадлежат лендингу. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CSS = fs.readFileSync('tools/mock-export/out/mocks.css', 'utf8');
let MOCK = fs.readFileSync('tools/mock-export/out/card-window.html', 'utf8');

// Слайд 6 рассказывает, как устроена работа: колонки, ответственные, сроки,
// метки. Берем заявку МСБ — она же ведет к слайду 7 с той же карточкой в упор.
const SWAP = [
  ['Подготовить отчёт по исполнению бюджета за I квартал 2025 года',
   'Согласовать кредитный лимит по заявке МСБ'],
  ['#64925252', '#30021144'],
  ['Teamlead', 'Иванов Петр'],
  ['Новая доска / Очередь', 'Корпоративный бизнес / Андеррайтинг'],
  ['1 мая', '24 мар.'],
  ['поручение', 'заявка'],
  ['Финансово-экономичес…', 'ООО «Вектор»'],
  ['Основание', 'Продукт'],
  ['Протокол совещания № 12 от 09.04.2025, п. 3.2', 'Кредит МСБ, 15 млн ₽'],
];
for (const [from, to] of SWAP) {
  if (!MOCK.includes(from)) throw new Error('нет строки: ' + from);
  MOCK = MOCK.split(from).join(to);
}
if (/ё/.test(MOCK.replace(/<[^>]+>/g, ''))) throw new Error('в тексте осталась «ё»');

const W = 1080;
const html = `<!doctype html><html><head><meta charset="utf-8" />
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600&display=swap" rel="stylesheet" />
<style>${CSS}
html,body{margin:0;padding:0;background:transparent}
body{font-family:"Roboto",system-ui,sans-serif}
/* Поле вокруг — только чтобы в кадр вошло скругление, без запаса под тень:
   тень карточке дает уже сам слайд. */
#shot{display:inline-block;padding:4px}
#shot .mkp{width:${W}px}
#shot .mkp > div{box-shadow:none}
</style></head><body><div id="shot"><div class="mkp">${MOCK}</div></div></body></html>`;
fs.writeFileSync('.context/card-bank.html', html, 'utf8');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1400, height: 1400 }, deviceScaleFactor: 3 });
  await p.goto('file:///' + path.resolve('.context/card-bank.html').split(path.sep).join('/'), { waitUntil: 'networkidle' });
  await p.waitForTimeout(600);
  const geo = await p.evaluate(() => {
    const c = document.querySelector('.mkp > div');
    const s = getComputedStyle(c);
    return { radius: s.borderTopLeftRadius, padding: s.padding, w: Math.round(c.getBoundingClientRect().width) };
  });
  console.log('скругление', geo.radius, '· поля', geo.padding, '· ширина', geo.w);
  await p.locator('#shot').screenshot({
    path: '.context/card-window-narrow.png',
    omitBackground: true,
  });
  await b.close();
  console.log('снято: .context/card-window-narrow.png');
})();
