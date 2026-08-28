/* Сборка автономного превью дека — один файл со всеми стилями и картинками.

   Запуск: node tools/deck-preview/build.js [путь к выходному файлу]
   По умолчанию пишет в design-system/presentation-v02/examples/preview.html
   (файл генерируемый и в git не хранится).

   Тема и текущий слайд переключаются радиокнопками, а не скриптом и не
   якорями: чат-рендерер перехватывает клики по ссылкам, и :target там не
   срабатывает. */
const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '../../design-system/presentation-v02');
const OUT = process.argv[2] ?? path.join(SRC, 'examples/preview.html');
const read = (p) => fs.readFileSync(path.join(SRC, p), 'utf8');

const mime = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' };
const dataUri = (file) => {
  const ext = path.extname(file).toLowerCase();
  const buf = fs.readFileSync(path.join(SRC, 'assets', file));
  return `data:${mime[ext]};base64,${buf.toString('base64')}`;
};

let html = read('examples/kaiten-content-factory.html');
let css = [
  read('kaiten-slides.css'),
  read('theme-light.css'),
  read('theme-dark.css'),
  read('theme-comparison.css'),
  read('assets/feature-mocks.css'),
  read('assets/diagram-mocks.css'),
  read('assets/module-project.css'),
  read('assets/module-mocks.css'),
].join('\n\n');

// Правило якорной листалки цепляется к радиокнопочной с большей
// специфичностью и держит первый ряд поверх текущего. Вырезаем.
css = css.replace(/body:not\(:has\(\.slide:target\)\) \.nav-row:first-child \{[^}]*\}/g, '');

css = css.split('[data-theme="dark"]').join('body:has(#th-dark:checked)')
         .split('[data-theme="comparison"]').join('body:has(#th-cmp:checked)')
         .split('[data-theme="light"]').join('body:has(#th-light:checked)');

// Только файлы: внутри assets/ есть подпапки (coolicons).
const assets = fs.readdirSync(path.join(SRC, 'assets'), { withFileTypes: true })
  .filter((e) => e.isFile() && /\.(svg|png|jpe?g)$/i.test(e.name))
  .map((e) => e.name);
for (const f of assets) {
  const uri = dataUri(f);
  html = html.split(`../assets/${f}`).join(uri);
  css = css.split(`assets/${f}`).join(uri);
}

// Повторяющиеся растровые мокапы выносим в css-правила, иначе каждый повтор
// тащит свою копию base64.
const PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const hoisted = [];
for (const f of assets) {
  if (!/\.(png|jpe?g)$/i.test(f)) continue;
  const uri = dataUri(f);
  const n = html.split(`src="${uri}"`).length - 1;
  if (n === 0) continue;
  const cls = `pic-${f.replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/gi, '-')}`;
  html = html.split(`src="${uri}"`).join(`data-pic="${cls}" src="${PIXEL}"`);
  css += `\n.${cls} { content: url("${uri}"); }\n`;
  hoisted.push(`${f} x${n}`);
}
html = html.replace(/data-pic="([^"]+)"/g, (m, cls) => `class="${cls}"`);

const ids = [...html.matchAll(/<section class="slide[^"]*" id="(s\d+)"/g)].map((m) => m[1]);
if (!ids.length) throw new Error('слайды не найдены');

html = html.replace(/ is-active/g, '');
html = html.replace(/<nav class="nav-fallback"[\s\S]*?<\/nav>/, '');
html = html.replace(/<script[\s\S]*?<\/script>/g, '');

const navRules = ids.map((id) =>
  `body:has(#sl-${id}:checked) #${id} { display:flex; }\n` +
  `body:has(#sl-${id}:checked) .nav-row[data-for="${id}"] { display:flex; }`).join('\n');

const first = ids[0], last = ids[ids.length - 1];
const navRows = ids.map((id, i) => {
  const prev = ids[i - 1], next = ids[i + 1];
  const navIcon = { first:'0 0 12 10|M11 9L7 5L11 1M5 9L1 5L5 1', prev:'0 0 16 14|M15 7H1M7 1L1 7L7 13', next:'0 0 16 14|M1 7H15M9 13L15 7L9 1', last:'0 0 12 10|M7 1L11 5L7 9M1 1L5 5L1 9' };
  const ic = (k) => { const [vb,d]=navIcon[k].split('|'); return '<svg viewBox="'+vb+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+d+'"/></svg>'; };
  const arrow = (t, sign) => (t && t !== id
    ? `<label class="go" for="sl-${t}">${sign}</label>`
    : `<span class="go is-off">${sign}</span>`);
  return `<div class="nav-row" data-for="${id}">` +
    `${arrow(i > 0 ? first : null, ic('first'))}${arrow(prev, ic('prev'))}` +
    `<span class="counter">${i + 1} / ${ids.length}</span>` +
    `${arrow(next, ic('next'))}${arrow(i < ids.length - 1 ? last : null, ic('last'))}</div>`;
}).join('\n');

const radios = ids.map((id, i) =>
  `<input type="radio" name="slide" id="sl-${id}"${i === 0 ? ' checked' : ''} />`).join('\n');

const chrome = `
<input type="radio" name="theme" id="th-light" checked />
<input type="radio" name="theme" id="th-dark" />
<input type="radio" name="theme" id="th-cmp" />
${radios}
<div class="css-bar css-bar-top">
  <div class="css-themes">
    <label for="th-light">Light</label>
    <label for="th-dark">Dark</label>
    <label for="th-cmp">Сравнение</label>
  </div>
</div>
<div class="css-bar css-bar-bottom">
  <div class="css-nav">${navRows}</div>
</div>
`;

const chromeCss = `
input[name="theme"], input[name="slide"] { position:fixed; opacity:0; pointer-events:none; }
.css-bar {
  position:fixed; left:50%; transform:translateX(-50%);
  z-index:20; display:flex; align-items:center; gap:8px;
  background:rgba(255,255,255,.94); border:1px solid #e0e0e0; border-radius:999px;
  padding:5px 8px; box-shadow:0 2px 12px rgba(0,0,0,.08);
  font-family:var(--font); font-size:13px; user-select:none;
}
.css-bar-top { top:2.2vh; }
.css-bar-bottom { bottom:2.2vh; }
.css-themes, .css-nav { display:flex; align-items:center; gap:4px; }
.css-sep { width:1px; height:18px; background:#e0e0e0; flex:none; }
.css-themes label, .css-nav .go {
  display:flex; align-items:center; justify-content:center;
  min-width:26px; height:26px; padding:0 10px; border-radius:999px;
  color:#757575; cursor:pointer;
}
.css-themes label:hover, .css-nav .go:hover { background:#efe9f9; color:#7d4ccf; }
.css-nav .go.is-off { color:#e0e0e0; cursor:default; }
.css-nav .go svg { width:12px; height:10px; display:block; }
.css-nav .counter { color:#757575; padding:0 6px; font-variant-numeric:tabular-nums; white-space:nowrap; }
.css-nav .nav-row { display:none; align-items:center; gap:4px; }
body:has(#th-light:checked) .css-themes label[for="th-light"],
body:has(#th-dark:checked)  .css-themes label[for="th-dark"],
body:has(#th-cmp:checked)   .css-themes label[for="th-cmp"] { background:#7d4ccf; color:#fff; }
body:has(#th-dark:checked) .css-bar {
  background:rgba(255,255,255,.07); border-color:rgba(255,255,255,.14); box-shadow:none;
}
body:has(#th-dark:checked) .css-themes label, body:has(#th-dark:checked) .css-nav .go,
body:has(#th-dark:checked) .css-nav .counter { color:rgba(255,255,255,.72); }
body:has(#th-dark:checked) .css-sep { background:rgba(255,255,255,.18); }
${navRules}
`;

html = html.replace(/<link rel="stylesheet"[^>]*>/g, '');
html = html.replace('</head>', `<style>\n${css}\n${chromeCss}\n</style>\n</head>`);
html = html.replace('<body>', `<body>\n${chrome}`);
fs.writeFileSync(OUT, html, 'utf8');

console.log('слайдов:', ids.length);
console.log('id по порядку:', ids.join(' '));
console.log('ссылок <a> в листалке:', (html.match(/<a /g) || []).length);
console.log('скрипта нет:', !/<script/.test(html));
console.log('картинки вынесены в css:', hoisted.join(', ') || 'нет');
console.log('размер:', Math.round(fs.statSync(OUT).size / 1024), 'КБ');
