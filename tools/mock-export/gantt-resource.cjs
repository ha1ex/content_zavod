/* Мокап «Гант ресурсное планирование».

   Верх — рендер ModuleGanttChartMock один в один, низ — панель ресурсного
   планирования по макету Landing-DS (node 11891-81326): переключатель
   «Часы / Карточки», строки сотрудников, загрузка по дням, выходные серым,
   перегрузка красным.

   Хвост «Реализации» вырезается из готового кадра, а не из разметки: полосы
   справа лежат во вложенных обертках без своих координат. Границы полосы
   реза берутся по реальным строкам левой колонки, поэтому рез всегда
   попадает между строк.

   Запуск из корня репозитория (нужен out/gantt.html из render.cjs):
     node tools/mock-export/gantt-resource.cjs

   Итог: design-system/presentation-v02/assets/mocks/gantt-resource.png
   Полотно до подрезки и координаты полосы — tools/mock-export/out/. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT = 'design-system/presentation-v02/assets/mocks/gantt-resource.png';
const CSS = fs.readFileSync('design-system/presentation-v02/assets/module-mocks.css', 'utf8');
const GANTT = fs.readFileSync('tools/mock-export/out/gantt.html', 'utf8');

const NAME_W = 300;
const DAY_W = 26;
const DAYS = 28;

const LINE = '#e0e0e0';
const GREEN_TEXT = '#2e7d32';
const GREEN_SOFT = '#e8f5e9';
const GREEN_HARD = '#c8e6c9';
const RED_TEXT = '#c62828';
const RED_SOFT = '#ffebee';

// 1 июня 2026 — понедельник, поэтому выходные приходятся на эти числа.
// Те же колонки затенены в самой диаграмме Ганта, панель повторяет их.
const WEEKEND = new Set([6, 7, 13, 14, 20, 21, 27, 28]);
const WEEKEND_BG = '#f5f5f5';

// Загрузка по рабочим дням, ключ — число месяца. Значение в скобках — акцент.
// Больше восьми часов — перегрузка, такие дни красные: это то, ради чего
// на ресурсное планирование и смотрят.
const ANNA = { 1: 0, 2: 0, 3: 0, 4: 8, 5: 8, 8: 8, 9: 16, 10: 12, 11: [8], 12: 8, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 22: 0, 23: 0, 24: 0, 25: 0, 26: 0 };
const PAVEL = { 1: 0, 2: 0, 3: 8, 4: 8, 5: 8, 8: 0, 9: 0, 10: 0, 11: 8, 12: 8, 15: 8, 16: 16, 17: 12, 18: 0, 19: 0, 22: 0, 23: 0, 24: 0, 25: 0, 26: 0 };
const NORM = 8;
// Свернутые строки: только бледные полосы занятости
const BANDS = {
  andrey: [[3, 5], [11, 13], [16, 20]],
  maria: [[2, 4], [9, 12], [18, 20]],
};

const box = (bg, inner = '', color = GREEN_TEXT) =>
  `<div style="width:${DAY_W}px;flex:none;border-left:.5px solid ${LINE};background:${bg};display:flex;align-items:center;justify-content:center;font-size:16px;color:${color}">${inner}</div>`;

const hoursRow = (map) => {
  const cells = [];
  for (let d = 1; d <= DAYS; d++) {
    if (WEEKEND.has(d)) { cells.push(box(WEEKEND_BG)); continue; }
    const v = map[d];
    if (v === undefined) { cells.push(box('transparent')); continue; }
    const accent = Array.isArray(v);
    const num = accent ? v[0] : v;
    const over = num > NORM;
    const bg = accent ? GREEN_HARD : over ? RED_SOFT : num > 0 ? GREEN_SOFT : 'transparent';
    cells.push(box(bg, String(num), over ? RED_TEXT : GREEN_TEXT));
  }
  return cells.join('');
};

const bandRow = (ranges) => {
  const cells = [];
  for (let d = 1; d <= DAYS; d++) {
    if (WEEKEND.has(d)) { cells.push(box(WEEKEND_BG)); continue; }
    const on = ranges.some(([a, b]) => d >= a && d <= b);
    cells.push(box(on ? GREEN_SOFT : 'transparent'));
  }
  return cells.join('');
};

const chevron = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;color:#757575"><path d="M6 9l6 6 6-6"/></svg>`;
const calendar = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px;color:#9e9e9e"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>`;

const avatar = (letter, bg) =>
  `<span style="width:26px;height:26px;flex:none;border-radius:50%;background:${bg};color:#fff;display:flex;align-items:center;justify-content:center;font-size:15px">${letter}</span>`;

const person = (letter, bg, name, cells, withCalendar = false) => `
<div style="display:flex;border-top:1px solid ${LINE}">
  <div style="width:${NAME_W}px;flex:none;border-right:1px solid ${LINE};height:40px;display:flex;align-items:center;gap:12px;padding-left:13px">
    ${chevron}${avatar(letter, bg)}
    <span style="font-size:18px;color:#2d2d2d">${name}</span>
    ${withCalendar ? `<span style="margin-left:auto;padding-right:14px;display:flex">${calendar}</span>` : ''}
  </div>
  <div style="display:flex;height:40px">${cells}</div>
</div>`;

const subRow = (text) => `
<div style="display:flex;border-top:1px solid ${LINE}">
  <div style="width:${NAME_W}px;flex:none;border-right:1px solid ${LINE};height:36px;display:flex;align-items:center;padding-left:52px">
    <span style="font-size:17px;color:#9e9e9e">${text}</span>
  </div>
  <div style="display:flex;height:36px">${Array.from({ length: DAYS }, () => `<div style="width:${DAY_W}px;flex:none;border-left:1px solid ${LINE}"></div>`).join('')}</div>
</div>`;

const PANEL = `
<div style="border-top:1px solid ${LINE};background:#fff">
  <div style="display:flex;align-items:center;height:44px;padding:0 16px">
    <span style="font-size:18px;font-weight:500;color:#2d2d2d">Ресурсное планирование</span>
    <span style="margin-left:auto;margin-right:auto;display:flex;align-items:center;gap:20px">
      <span style="display:flex;align-items:center;gap:8px;font-size:17px;color:#2d2d2d">
        <i style="width:15px;height:15px;border-radius:50%;border:4px solid #7d4ccf;box-sizing:border-box"></i>Часы
      </span>
      <span style="display:flex;align-items:center;gap:8px;font-size:17px;color:#2d2d2d">
        <i style="width:15px;height:15px;border-radius:50%;border:1.5px solid #b0b0b6;box-sizing:border-box"></i>Карточки
      </span>
    </span>
    <span style="display:flex;align-items:center;gap:14px;color:#9e9e9e">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" style="width:17px;height:17px"><circle cx="12" cy="12" r="9.2"/><path d="M9.4 9.1a2.7 2.7 0 1 1 3.4 2.6c-.6.2-.9.7-.9 1.3v.6" stroke-linecap="round"/><path d="M12 17.2h.01" stroke-linecap="round"/></svg>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" style="width:17px;height:17px"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </span>
  </div>
  ${person('А', '#7d4ccf', 'Анна', hoursRow(ANNA))}
  ${person('А', '#2f80ed', 'Андрей', bandRow(BANDS.andrey))}
  ${person('П', '#f5a623', 'Павел', hoursRow(PAVEL))}
  ${person('М', '#26a69a', 'Мария', bandRow(BANDS.maria))}
</div>`;

// Панель уходит внутрь окна Ганта, перед его закрывающим div
const last = GANTT.lastIndexOf('</div>');
const markup = GANTT.slice(0, last) + PANEL + GANTT.slice(last);

const html = `<!doctype html><html><head><meta charset="utf-8" />
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600&display=swap" rel="stylesheet" />
<style>${CSS}
html,body{margin:0;padding:0;background:transparent}
body{font-family:"Roboto",system-ui,sans-serif}
#shot{display:inline-block;padding:4px}
.mkp > div{box-shadow:none !important}
</style></head><body><div id="shot"><div class="mkp">${markup}</div></div></body></html>`;
fs.writeFileSync('tools/mock-export/out/gantt-resource.html', html, 'utf8');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1400, height: 1400 }, deviceScaleFactor: 3 });
  await p.goto('file:///' + path.resolve('tools/mock-export/out/gantt-resource.html').split(path.sep).join('/'), { waitUntil: 'networkidle' });

  await p.evaluate(() => {
    const rows = document.querySelector(".mkp > div").children[1].children[0].children;
    rows[rows.length - 1].style.borderBottom = "0";
  });

  await p.waitForTimeout(600);

  // Хвост «Реализации» вырезаем из готового кадра, а не из разметки: полосы
  // справа лежат во вложенных обертках без своих координат, и снять их
  // по стилю нельзя. Границы полосы берем по реальным строкам слева.
  const CUT_ROWS = 5;
  const band = await p.evaluate((cut) => {
    const shot = document.getElementById('shot').getBoundingClientRect();
    const rows = [...document.querySelector('.mkp > div').children[1].children[0].children];
    const first = rows[rows.length - cut].getBoundingClientRect();
    const last = rows[rows.length - 1].getBoundingClientRect();
    return { from: first.top - shot.top, to: last.bottom - shot.top };
  }, CUT_ROWS);
  // Стрелки связей ведут к полосам, которые уйдут вместе с полосой реза.
  // Те, что заходят в вырезаемую зону, снимаем — иначе останутся висеть.
  const arrows = await p.evaluate((from) => {
    const shot = document.getElementById('shot').getBoundingClientRect();
    const svg = document.querySelector('.mkp > div svg.pointer-events-none');
    if (!svg) return 0;
    let n = 0;
    [...svg.children].forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.height === 0 && r.width === 0) return;
      if (r.bottom - shot.top > from - 2) { el.remove(); n++; }
    });
    return n;
  }, band.from);
  console.log('снято стрелок связи:', arrows);

  const FULL = 'tools/mock-export/out/gantt-resource-full.png';
  await p.locator('#shot').screenshot({ path: FULL, omitBackground: true });
  await b.close();

  // Склейка: верх до полосы реза и низ после нее, полоса выпадает
  const SCALE = 3;
  const y1 = Math.round(band.from * SCALE);
  const y2 = Math.round(band.to * SCALE);
  const meta = await sharp(FULL).metadata();
  const cutH = y2 - y1;
  const top = await sharp(FULL).extract({ left: 0, top: 0, width: meta.width, height: y1 }).toBuffer();
  const bottom = await sharp(FULL)
    .extract({ left: 0, top: y2, width: meta.width, height: meta.height - y2 })
    .toBuffer();
  await sharp({
    create: { width: meta.width, height: meta.height - cutH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: top, top: 0, left: 0 }, { input: bottom, top: y1, left: 0 }])
    .png()
    .toFile(OUT);

  console.log('снято:', OUT, '·', meta.width + 'x' + (meta.height - cutH), '· вырезано', cutH, 'px');
})();
