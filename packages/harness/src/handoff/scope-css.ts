/**
 * Скоуп-трансформер Tailwind v4 CSS для статик-хендоффа.
 *
 * Оборачивает все правила в `.kaiten-webinar`, разворачивает `@layer` (иначе
 * слоёные утилиты проигрывают неслоёному LESS Кайтена), preflight/`:root`/`html`
 * ремапит на скоуп. `@property`/`@keyframes` оставляет глобальными.
 *
 * Порт проверенного Python-трансформера из ручной сборки хендоффа.
 */

const NOSCOPE_AT = new Set([
  'keyframes',
  'property',
  'font-face',
  'charset',
  'import',
  'namespace',
  'counter-style',
  'page',
  'font-feature-values',
]);
const RECURSE_AT = new Set(['media', 'supports', 'container', 'scope', 'starting-style']);

function splitTopCommas(sel: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let cur = '';
  for (const ch of sel) {
    if (ch === '(' || ch === '[') depth++;
    else if (ch === ')' || ch === ']') depth--;
    if (ch === ',' && depth === 0) {
      parts.push(cur);
      cur = '';
    } else cur += ch;
  }
  if (cur.trim()) parts.push(cur);
  return parts;
}

function scopeSelectors(sel: string, scope: string): string {
  const out: string[] = [];
  for (const raw of splitTopCommas(sel)) {
    const s = raw.trim();
    if (!s) continue;
    const head = /^([a-zA-Z*:_-][\w*:-]*)/.exec(s)?.[1] ?? '';
    if (s === ':root' || s === ':host') out.push(scope);
    else if (head === 'html' || head === 'body') out.push(scope + s.slice(head.length));
    else if (head === ':root') out.push(scope + s.slice(':root'.length));
    else if (head === ':host') out.push(scope + s.slice(':host'.length));
    else out.push(scope + ' ' + s);
  }
  return out.join(', ');
}

export function scopeCss(css: string, scope = '.kaiten-webinar'): string {
  const L = css.length;
  let i = 0;
  const out: string[] = [];
  const skipComment = (p: number): number => {
    const e = css.indexOf('*/', p);
    return e === -1 ? L : e + 2;
  };
  while (i < L) {
    const ch = css[i];
    if (ch === ' ' || ch === '\t' || ch === '\r' || ch === '\n') {
      out.push(ch);
      i++;
      continue;
    }
    if (css.startsWith('/*', i)) {
      const j = skipComment(i);
      out.push(css.slice(i, j));
      i = j;
      continue;
    }
    // читаем prelude до верхнеуровневого { ; }
    let j = i;
    let depth = 0;
    let instr: string | null = null;
    while (j < L) {
      const c = css[j];
      if (instr) {
        if (c === instr && css[j - 1] !== '\\') instr = null;
        j++;
        continue;
      }
      if (c === '"' || c === "'") {
        instr = c;
        j++;
        continue;
      }
      if (css.startsWith('/*', j)) {
        j = skipComment(j);
        continue;
      }
      if (c === '(') depth++;
      else if (c === ')') depth--;
      else if (depth === 0 && (c === '{' || c === ';' || c === '}')) break;
      j++;
    }
    const prelude = css.slice(i, j);
    if (j >= L) {
      out.push(prelude);
      break;
    }
    if (css[j] === ';') {
      const at = /^\s*@([\w-]+)/.exec(prelude);
      if (at && at[1]?.toLowerCase() === 'layer') {
        // drop `@layer a,b,c;` (flatten)
      } else out.push(prelude + ';');
      i = j + 1;
      continue;
    }
    if (css[j] === '}') {
      out.push(prelude);
      break;
    }
    // css[j] === '{' — блок, ищем закрывающую
    depth = 0;
    let k = j;
    instr = null;
    while (k < L) {
      const c = css[k];
      if (instr) {
        if (c === instr && css[k - 1] !== '\\') instr = null;
        k++;
        continue;
      }
      if (c === '"' || c === "'") {
        instr = c;
        k++;
        continue;
      }
      if (css.startsWith('/*', k)) {
        k = skipComment(k);
        continue;
      }
      if (c === '{') depth++;
      else if (c === '}') {
        depth--;
        if (depth === 0) break;
      }
      k++;
    }
    const body = css.slice(j + 1, k);
    const pre = prelude.trim();
    const at = /^@([\w-]+)/.exec(pre);
    if (at) {
      const name = (at[1] ?? '').toLowerCase();
      if (name === 'layer') out.push(scopeCss(body, scope)); // разворачиваем слой
      else if (NOSCOPE_AT.has(name)) out.push(prelude + '{' + body + '}');
      else out.push(prelude + '{' + scopeCss(body, scope) + '}'); // media/supports/…
    } else {
      out.push(scopeSelectors(pre, scope) + '{' + body + '}');
    }
    i = k + 1;
  }
  return out.join('');
}
