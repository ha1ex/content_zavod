/* Собирает CSS для мокапов Module*, отрисованных render.tsx.
   Preflight не берем — он сбрасывает html/body и сломал бы дек; вместо него
   ниже идет свой минимальный сброс. Все селекторы уводим под .mkp, чтобы
   утилиты Tailwind не пересекались с классами презентации. */
const postcss = require('postcss');
const tw = require('@tailwindcss/postcss');
const fs = require('fs');

const SCOPE = '.mkp';
const from = 'tools/mock-export/entry.css';

/* Делим только по запятым верхнего уровня. В именах классов Tailwind
   запятая встречается экранированной — shadow-[0_0_44px_-16px_rgba(45,45,45,0.38)] —
   и наивный split ломал такой селектор на куски, каждый из которых получал
   свой .mkp. Правило оставалось в файле, но не совпадало ни с чем: так
   пропадали тени у мокапов гаджетов. */
const splitTop = (sel) => {
  const out = [];
  let buf = '', depth = 0, esc = false;
  for (const ch of sel) {
    if (esc) { buf += ch; esc = false; continue; }
    if (ch === String.fromCharCode(92)) { buf += ch; esc = true; continue; }
    if (ch === '(' || ch === '[') depth++;
    if (ch === ')' || ch === ']') depth--;
    if (ch === ',' && depth === 0) { out.push(buf); buf = ''; continue; }
    buf += ch;
  }
  out.push(buf);
  return out;
};

const scope = (sel) =>
  splitTop(sel).map((s) => {
    s = s.trim();
    if (s === ':root' || s === ':host' || s === '*') return SCOPE;
    if (s.startsWith('&')) return s;
    return `${SCOPE} ${s}`;
  }).join(', ');

const prefixer = {
  postcssPlugin: 'scope-to-mkp',
  Once(root) {
    root.walkRules((rule) => {
      const p = rule.parent;
      if (p && p.type === 'atrule' && /keyframes|property|font-face/.test(p.name)) return;
      rule.selector = scope(rule.selector);
    });
  },
};

// Токены лежат в @theme и вычищаются по неиспользуемости; синтаксис
// bg-(--color-surface-card) Tailwind не считает использованием, поэтому
// подкладываем весь набор как обычные объявления.
const tokens = fs.readFileSync('packages/ui/src/tokens.css', 'utf8');
const body = tokens.slice(tokens.indexOf('@theme {') + 8, tokens.lastIndexOf('}'));

// Сброс обязан лежать в слое. Безслойные объявления по каскаду сильнее любых
// слойных независимо от специфичности, а утилиты Tailwind сидят в
// @layer utilities — сброс вне слоя обнулял бы им padding, border, тень и
// размер шрифта, и мокапы разваливались бы в текст без карточек.
const reset = `
@layer base {
  ${SCOPE}, ${SCOPE} *, ${SCOPE} *::before, ${SCOPE} *::after {
    box-sizing: border-box; border: 0 solid var(--color-border-default);
    margin: 0; padding: 0; font: inherit; color: inherit;
  }
  ${SCOPE} { font-family: var(--font-sans); color: var(--color-text-primary);
    line-height: 1.5; text-align: left; -webkit-font-smoothing: antialiased; }
  ${SCOPE} svg { display: block; }
  ${SCOPE} ul, ${SCOPE} ol { list-style: none; }
  ${SCOPE} table { border-collapse: collapse; }
  ${SCOPE} button, ${SCOPE} input { background: none; }
}
`;

postcss([tw(), prefixer]).process(fs.readFileSync(from, 'utf8'), { from })
  .then((r) => {
    const out = '@layer theme, base, components, utilities;\n'
      + '/* Сгенерировано tools/mock-export — правки вносить в источники в packages/ui. */\n'
      + `${SCOPE} {${body}}\n${reset}\n${r.css}`;
    fs.writeFileSync('tools/mock-export/out/mocks.css', out, 'utf8');
    console.log('CSS:', Math.round(out.length / 1024), 'КБ');
    console.log('preflight остался:', /\bhtml\s*[,{]/.test(r.css));
  })
  .catch((e) => console.log('ОШИБКА:', e.message));
