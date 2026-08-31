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

/** Классы, реально встречающиеся в разметке страницы (включая инлайновые <style>). */
function collectUsedClasses(html) {
  const used = new Set();
  for (const m of html.matchAll(/\sclass(?:Name)?=["']([^"']*)["']/gi)) {
    for (const token of m[1].split(/\s+/)) if (token) used.add(token);
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

    const kept = prelude
      .split(',')
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

  console.log('→ injecting static banner');
  const finalHtml = injectStaticBanner(withFonts, slug);

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
    const css = blocks.join('\n');
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
