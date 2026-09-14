#!/usr/bin/env node
/**
 * Собирает SSR-страницу /landings/<slug> в один автономный HTML-файл с inline
 * CSS и без JS-чанков. Открывается двойным кликом без dev-сервера.
 *
 * Интерактивные секции (TabbedFeature, IndustryPicker) останутся в default
 * state (первый таб / первая индустрия) — это OK для статичной копии.
 *
 * Usage:
 *   node scripts/build-static-html.mjs <slug> [outPath]
 *   node scripts/build-static-html.mjs crm out/crm/crm.html
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const args = process.argv.slice(2);
/** --split-css: вынести стили в соседний styles.css вместо инлайна. */
const splitCss = args.includes('--split-css');
const [slug = 'crm', outPathArg] = args.filter((a) => !a.startsWith('--'));
const outPath = outPathArg ?? `out/${slug}/${slug}.html`;
const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.text();
}

function absolutize(href) {
  if (href.startsWith('http://') || href.startsWith('https://')) return href;
  if (href.startsWith('//')) return `http:${href}`;
  if (href.startsWith('/')) return `${baseUrl}${href}`;
  return new URL(href, baseUrl).toString();
}

async function inlineStylesheets(html) {
  const linkRegex = /<link\s+[^>]*rel=["']stylesheet["'][^>]*>/gi;
  const links = html.match(linkRegex) ?? [];
  const cssBlocks = [];

  for (const tag of links) {
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
    if (!hrefMatch) continue;
    const url = absolutize(hrefMatch[1]);
    try {
      const css = await fetchText(url);
      cssBlocks.push(`/* inlined from ${hrefMatch[1]} */\n${css}`);
    } catch (err) {
      console.warn(`! failed to inline ${url}: ${err.message}`);
    }
  }

  const combined = cssBlocks.length
    ? `\n<style data-inlined="true">\n${cssBlocks.join('\n\n')}\n</style>\n`
    : '';
  return html.replace(linkRegex, '') + (combined && '\n' + combined);
}

function stripScripts(html) {
  // Удаляем все <script>...</script> и <script src="…"></script> — статике
  // hydration не нужен; интерактив (табы) останется в default-state из SSR.
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<script\b[^>]*\/>/gi, '');
}

function stripPreloads(html) {
  // Удаляем <link rel="preload"> и <link rel="modulepreload"> — они ссылаются
  // на /_next/static chunks которые недоступны при открытии файла локально.
  return html
    .replace(/<link\s+[^>]*rel=["'](?:preload|modulepreload|prefetch)["'][^>]*\/?>/gi, '')
    .replace(/<link\s+[^>]*rel=["'](?:dns-prefetch|preconnect)["'][^>]*\/?>/gi, '');
}

/**
 * В атрибуте class спецсимволы приходят сущностями: произвольный вариант
 * Tailwind `md:[&>div:first-child]:order-2` в разметке выглядит как
 * `md:[&amp;&gt;div:first-child]:order-2`. В CSS-селекторе он же экранирован
 * бэкслешами, и без декодирования классы не сходятся — правило улетало при
 * чистке, а мок вставал справа вместо левой колонки.
 */
function decodeEntities(text) {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

/** Классы, реально встречающиеся в разметке страницы (включая инлайновые <style>). */
function collectUsedClasses(html) {
  const used = new Set();
  for (const m of html.matchAll(/\sclass(?:Name)?=["']([^"']*)["']/gi)) {
    for (const token of decodeEntities(m[1]).split(/\s+/)) if (token) used.add(token);
  }
  return used;
}

/** `.md\:px-6` → `md:px-6`: убираем экранирование, которым Tailwind защищает спецсимволы. */
function selectorClasses(selector) {
  const out = [];
  for (const m of selector.matchAll(/\.((?:\\.|[^\s.,#:>+~()[\]{}"'\\])+)/g)) {
    out.push(m[1].replace(/\\(.)/g, '$1'));
  }
  return out;
}

/**
 * Разбивает список селекторов по запятым верхнего уровня. Наивный `split(',')`
 * рвал произвольные значения Tailwind: селектор
 * `.bg-\[linear-gradient\(180deg\,\#ece0ff\,\#cdecff\)\]` разваливался на три
 * куска, и после сборки получался мусор, который браузер выкидывал целиком —
 * градиент на панели аккордиона пропадал. То же и с `shadow-[…rgba(…)]`.
 */
function splitSelectorList(prelude) {
  const parts = [];
  let buf = '';
  let depth = 0;
  let quote = null;
  for (let i = 0; i < prelude.length; i++) {
    const ch = prelude[i];
    if (ch === '\\') {
      buf += ch + (prelude[i + 1] ?? '');
      i++;
      continue;
    }
    if (quote) {
      buf += ch;
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      buf += ch;
      continue;
    }
    if (ch === '(' || ch === '[') depth++;
    else if (ch === ')' || ch === ']') depth--;
    if (ch === ',' && depth === 0) {
      parts.push(buf);
      buf = '';
      continue;
    }
    buf += ch;
  }
  parts.push(buf);
  return parts;
}

/**
 * Выкидывает правила, чьи классы на странице не встречаются. Правила без
 * классов (`:root`, теги, `@property`, переменные темы) не трогаем — на них
 * держится вся типографика и палитра.
 */
function purgeCss(css, used) {
  let i = 0;
  const readBlock = () => {
    let depth = 0;
    const start = i;
    for (; i < css.length; i++) {
      if (css[i] === '{') depth++;
      else if (css[i] === '}') {
        depth--;
        if (depth === 0) {
          i++;
          return css.slice(start, i);
        }
      }
    }
    return css.slice(start);
  };

  let out = '';
  while (i < css.length) {
    const braceAt = css.indexOf('{', i);
    if (braceAt === -1) {
      out += css.slice(i);
      break;
    }
    const semiAt = css.indexOf(';', i);
    // одиночная директива без блока: @import, @charset, @layer a, b;
    if (semiAt !== -1 && semiAt < braceAt) {
      out += css.slice(i, semiAt + 1);
      i = semiAt + 1;
      continue;
    }

    const prelude = css.slice(i, braceAt).trim();
    i = braceAt;
    const block = readBlock();
    const body = block.slice(block.indexOf('{') + 1, block.lastIndexOf('}'));

    if (prelude.startsWith('@')) {
      // @media / @supports / @layer с телом — чистим содержимое рекурсивно,
      // остальные (@property, @font-face, @keyframes) оставляем как есть.
      if (/^@(media|supports|layer|container)\b/i.test(prelude)) {
        const inner = purgeCss(body, used).trim();
        if (inner) out += `${prelude}{${inner}}`;
      } else {
        out += `${prelude}{${body}}`;
      }
      continue;
    }

    const kept = splitSelectorList(prelude)
      .map((s) => s.trim())
      .filter((s) => s && selectorClasses(s).every((c) => used.has(c)));
    if (kept.length) out += `${kept.join(',')}{${body}}`;
  }
  return out;
}

/**
 * Next.js раздаёт Roboto как локальные woff2 из /_next/static/media. В отдельном
 * файле эти пути не резолвятся, поэтому меняем 36 мёртвых @font-face на одну
 * ссылку Google Fonts — начертания те же (400/500/600/700).
 */
function replaceFontFaces(html) {
  const withoutLocal = html.replace(
    /@font-face\s*{[^}]*url\("\.\.\/media\/[^}]*}/g,
    '',
  );
  const link =
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap"/>';
  return withoutLocal.replace(/<\/head>/i, `${link}</head>`);
}

function purgeInlineCss(html) {
  const used = collectUsedClasses(html);
  return html.replace(
    /<style data-inlined="true">([\s\S]*?)<\/style>/i,
    (_m, css) => `<style>${purgeCss(css, used)}</style>`,
  );
}

/**
 * Моки нарисованы под фиксированную ширину (520–620px), а в вёрстке их ужимает
 * `MockFit` — компонент на React, и вместе с остальным JS он из выгрузки
 * вырезан. Без него мок на планшете и мобилке вылезает за колонку и тянет
 * горизонтальную прокрутку. Возвращаем ровно эту логику двенадцатью строками
 * на месте: считаем масштаб по ширине контейнера и держим высоту.
 */
/**
 * Второй проход по стилям, уже после чистки правил: выкидывает то, на что
 * никто не ссылается — `@property` и объявления переменных без единого `var()`,
 * мёртвые `@keyframes`, комментарии сборки и пустые строки. Ссылки ищем и в
 * разметке: часть переменных задаётся инлайновым style.
 */
function tidyCss(css, html) {
  const both = css + html;
  const used = new Set([...both.matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => m[1]));
  const isUsed = (name) => used.has(name);

  let out = css;

  // @property без единого var() — правило описывает переменную, которой нет
  out = out.replace(/@property\s+(--[\w-]+)\s*\{[^}]*\}\s*/g, (m, name) =>
    isUsed(name) ? m : '',
  );

  // объявления переменных, к которым никто не обращается
  out = out.replace(/(--[\w-]+)\s*:\s*[^;{}]*;/g, (m, name) => (isUsed(name) ? m : ''));

  // анимации, на которые никто не ссылается
  out = out.replace(/@keyframes\s+([\w-]+)\s*\{(?:[^{}]|\{[^{}]*\})*\}\s*/g, (m, name) =>
    new RegExp(`animation[^;}]*\\b${name}\\b`).test(both) ? m : '',
  );

  return out
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\s*\}/g, '')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function injectMockFit(html) {
  const script = `<script>(function(){function fit(){var outers=document.querySelectorAll('[data-mockfit="outer"]');for(var i=0;i<outers.length;i++){var o=outers[i],n=o.querySelector('[data-mockfit="inner"]');if(!n)continue;n.style.transform='none';o.style.height='';var nw=n.offsetWidth,nh=n.offsetHeight,ow=o.clientWidth;if(!nw||!ow)continue;var s=Math.min(1,ow/nw);n.style.transformOrigin='top left';n.style.transform='scale('+s+')';o.style.height=Math.round(nh*s)+'px';}}window.__ktFitMocks=fit;fit();addEventListener('load',fit);addEventListener('resize',fit);})();</script>`;
  return html.replace(/<\/body>/i, `${script}</body>`);
}

/**
 * Аккордион «Справочный центр в стиле вашей компании» переключается наведением,
 * а это состояние React — вместе с остальным JS оно из выгрузки вырезано, и
 * страница застывала на первой строке. Компонент отдаёт для каждой строки пару
 * data-атрибутов с классами «открыто» и «закрыто» и держит в панели моки всех
 * строк, так что переключение сводится к перестановке классов.
 */
function injectAccordion(html) {
  const script = `<script>(function(){var rows=document.querySelectorAll('[data-acc-row]');if(!rows.length)return;function apply(el,on){var a=el.getAttribute('data-acc-on')||'',b=el.getAttribute('data-acc-off')||'';(on?b:a).split(/\\s+/).forEach(function(c){if(c)el.classList.remove(c)});(on?a:b).split(/\\s+/).forEach(function(c){if(c)el.classList.add(c)})}function select(id){for(var i=0;i<rows.length;i++){var row=rows[i],on=row.getAttribute('data-acc-row')===id;apply(row,on);var kids=row.querySelectorAll('[data-acc-on],[data-acc-off]');for(var j=0;j<kids.length;j++)apply(kids[j],on);var btn=row.querySelector('button');if(btn)btn.setAttribute('aria-expanded',on?'true':'false')}var panels=document.querySelectorAll('[data-acc-panel]');for(var k=0;k<panels.length;k++)panels[k].classList.toggle('hidden',panels[k].getAttribute('data-acc-panel')!==id);if(window.__ktFitMocks)window.__ktFitMocks()}for(var i=0;i<rows.length;i++){(function(row){var id=row.getAttribute('data-acc-row');row.addEventListener('mouseenter',function(){select(id)});row.addEventListener('click',function(){select(id)});row.addEventListener('focusin',function(){select(id)})})(rows[i])}})();</script>`;
  return html.replace(/<\/body>/i, `${script}</body>`);
}

function injectStaticBanner(html, slug) {
  const banner = `\n<!--\n  Static export of /landings/${slug}\n  Generated: ${new Date().toISOString()}\n  Note: интерактив (табы, picker) показывает default-state.\n        Для полной интерактивности откройте через dev-сервер.\n-->\n`;
  return html.replace(/<html[^>]*>/i, (match) => `${match}${banner}`);
}

async function main() {
  console.log(`→ fetching ${baseUrl}/landings/${slug}`);
  const rawHtml = await fetchText(`${baseUrl}/landings/${slug}`);

  console.log('→ inlining stylesheets');
  const withInlineCss = await inlineStylesheets(rawHtml);

  console.log('→ stripping <script> tags');
  const noScripts = stripScripts(withInlineCss);

  console.log('→ stripping preload/prefetch links to chunks');
  const noPreloads = stripPreloads(noScripts);

  console.log('→ purging unused CSS');
  const purged = purgeInlineCss(noPreloads);

  console.log('→ swapping local @font-face for Google Fonts');
  const withFonts = replaceFontFaces(purged);

  console.log('→ injecting mock-fit scaler');
  const withMockFit = injectMockFit(withFonts);

  console.log('→ injecting accordion switcher');
  const withAccordion = injectAccordion(withMockFit);

  console.log('→ injecting static banner');
  const finalHtml = injectStaticBanner(withAccordion, slug);

  const absOut = resolve(process.cwd(), outPath);
  await mkdir(dirname(absOut), { recursive: true });

  let htmlOut = finalHtml;
  if (splitCss) {
    console.log('→ extracting styles.css');
    const blocks = [];
    htmlOut = finalHtml.replace(/<style>([\s\S]*?)<\/style>/gi, (_m, css) => {
      blocks.push(css);
      return '';
    });
    const cssFile = resolve(dirname(absOut), 'styles.css');
    // Чистим и собственные стили моков: они приезжают отдельными <style> и
    // раньше проходили мимо purge — в файле оставались правила для моков,
    // которых на этой странице нет.
    const raw = purgeCss(blocks.join('\n'), collectUsedClasses(htmlOut));
    const css = tidyCss(raw, htmlOut);
    const saved = (Buffer.byteLength(raw) - Buffer.byteLength(css)) / 1024;
    console.log(`→ tidying styles.css (−${saved.toFixed(1)} KB)`);
    await writeFile(cssFile, css, 'utf-8');
    htmlOut = htmlOut.replace(
      /<\/head>/i,
      '<link rel="stylesheet" href="styles.css"/></head>',
    );
    console.log(`✓ saved ${cssFile} (${(Buffer.byteLength(css) / 1024).toFixed(1)} KB)`);
  }

  await writeFile(absOut, htmlOut, 'utf-8');

  const sizeKB = (Buffer.byteLength(htmlOut) / 1024).toFixed(1);
  console.log(`✓ saved ${absOut} (${sizeKB} KB)`);
}

main().catch((err) => {
  console.error('build-static-html failed:', err);
  process.exit(1);
});
