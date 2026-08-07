import archiver from 'archiver';
import { createWriteStream } from 'node:fs';
import { mkdir, readFile, stat } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import type { LandingSpec } from '../schemas/landing-spec';
import { LandingSpecSchema } from '../schemas/landing-spec';
import { scopeCss } from './scope-css';

/**
 * СТАТИЧЕСКИЙ хендофф — пакет для верстальщика, который вставляет лендинг в НЕ-Next.js
 * сайт (напр. LESS-сайт Кайтена). В отличие от `buildHandoff` (исходники Next.js+Tailwind),
 * тут отдаётся чистая статика — ровно как в ручном ZIP для вебинара 6 августа:
 *
 *   landing-<slug>/
 *     ├── index.html          чистая разметка (без скриптов/RSC/preload), линк на styles.css
 *     ├── styles.css          Tailwind-утилиты + DS-переменные + кастомные компоненты, один файл
 *     ├── styles.scoped.css   то же, обёрнутое в .kaiten-webinar (защита от коллизий с LESS)
 *     ├── content-spec.json   исходный LandingSpec
 *     ├── README-ВЁРСТКА.md    что внутри, дизайн-токены, структура, TODO
 *     └── assets/             картинки лендинга + icons/ (инлайн-SVG, вынесенные в файлы)
 *
 * Источник HTML/CSS — SSR-страница самого завода (`<baseUrl>/landings/<slug>`): переиспользуем
 * рендер Next (моки, иллюстрации, типографика), а не скрейпим прод.
 */

export interface StaticHandoffManifest {
  slug: string;
  zipPath: string;
  files: string[];
  bytes: number;
  components: string[];
  illustrations: string[];
}

interface BuildStaticOptions {
  root: string;
  /** Базовый URL запущенного завода, напр. http://localhost:3000. */
  baseUrl: string;
  outPath?: string;
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { accept: 'text/html,text/css,*/*' } });
  if (!res.ok) throw new Error(`fetch ${url} → ${res.status}`);
  return res.text();
}

/** Все строковые значения из props секции — для дампа контента в README. */
function collectStrings(o: unknown, acc: string[]): void {
  if (typeof o === 'string') {
    const s = o.replace(/ /g, ' ').trim();
    if (s && s.length > 1 && !/^https?:|^\/|^#/.test(s)) acc.push(s);
  } else if (Array.isArray(o)) {
    for (const v of o) collectStrings(v, acc);
  } else if (o && typeof o === 'object') {
    for (const v of Object.values(o)) collectStrings(v, acc);
  }
}

function makeReadme(spec: LandingSpec, slug: string, tokens: Record<string, string>): string {
  const t = (k: string, fb: string) => tokens[k] ?? fb;
  const sectionsMd = spec.sections
    .map((s, i) => {
      const strings: string[] = [];
      collectStrings((s as { props?: unknown }).props ?? {}, strings);
      const uniq = Array.from(new Set(strings)).slice(0, 24);
      const body = uniq.length ? uniq.map((x) => `  - ${x}`).join('\n') : '  _(визуальный блок / мок)_';
      return `### [${i}] ${s.component} (id: ${'id' in s ? s.id : '—'})\n${body}`;
    })
    .join('\n\n');

  return `# Вёрстка лендинга «${spec.seo.title}»

Пакет для верстальщика (чистая статика, не Next.js). Собрано Контент-заводом Кайтен.

- **Статичная вёрстка:** \`index.html\` (только разметка) + \`styles.css\` (DS-переменные +
  Tailwind-утилиты + кастомные компоненты одним файлом) + \`assets/\`. Без скриптов/RSC.
- **Скоуп:** \`styles.scoped.css\` — то же под \`.kaiten-webinar\`; чтобы включить, оберните
  контент в \`<div class="kaiten-webinar"> … </div>\` и подключите его вместо \`styles.css\`.
- **Машиночитаемый контент:** \`content-spec.json\`.

## Дизайн-система (Kaiten V01)

- **Шрифт:** Roboto (в \`styles.css\` — фолбэк; подключите свой / Google Fonts).
- **Контейнер:** max-width **1216px**, центрируется авто-отступами; на десктопе боковой padding 0.
- **Палитра (ключевое):**
  - Акцент / кнопки: \`${t('--color-violet-100', '#7d4ccf')}\` (soft \`${t('--color-violet-12', '#efe9f9')}\`)
  - Текст: \`${t('--color-neutral-900', '#2d2d2d')}\` · вторичный \`${t('--color-neutral-600', '#757575')}\`
  - Фон: \`${t('--color-neutral-000', '#ffffff')}\` · секции \`${t('--color-neutral-100', '#f5f5f5')}\` · границы \`${t('--color-neutral-300', '#e0e0e0')}\`

## Типографика

- Бренд — по решению команды (в заголовках может быть «Кайтен» кириллицей, в подписях латиницей «Kaiten»); к единому не приводить.
- Неразрывные пробелы уже проставлены в разметке (короткие предлоги/союзы, тире).
- Кавычки — «ёлочки». Заголовки — без точек.

## Структура страницы (сверху вниз)

${sectionsMd}

## SEO / мета

- **title:** ${spec.seo.title}
- **description:** ${spec.seo.description}

## Для верстальщика: по статике

- **RSC/preload и весь фреймворк-JS убраны.** Остался ровно один маленький ванильный
  скрипт в конце \`index.html\` — переключение вкладок (кнопки \`[data-kt-tab]\` ↔ панели
  \`[data-kt-panel]\`). Без зависимостей; переиспользуйте или замените своим.
- **Все стили в одном \`styles.css\`** (внешний Tailwind-CSS + бывшие inline-\`<style>\` слиты).
- **CSS-переменные на месте** — классы вида \`text-(--color-text-accent)\` резолвятся из \`:root\`.
- **Скоуп** — \`styles.scoped.css\` (обёртка \`.kaiten-webinar\`, \`@layer\` развёрнут, чтобы утилиты
  перебивали глобальный LESS). Авто-трансформ — прогоните у себя; пуленепробиваемо — Tailwind-префикс на своей сборке.
- **SVG-иконки** — вынесены в \`assets/icons/\`, в разметке оставлены инлайн (красятся через currentColor).
- **Это статика:** анимации появления показаны сразу, формы ничего не отправляют.

## TODO для верстальщика

1. Реальные endpoint'ы форм/кнопок (если есть) + экран «Спасибо».
2. Аналитика/UTM.
3. og-теги / favicon / canonical — добавить на своей стороне.
`;
}

/** Парсим CSS-переменные из tokens.css (@theme { --x: val; }). */
function parseTokens(tokensCss: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of tokensCss.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    if (m[1] && m[2] !== undefined) out[m[1]] = m[2].trim();
  }
  return out;
}

export async function buildStaticHandoff(
  slug: string,
  opts: BuildStaticOptions,
): Promise<StaticHandoffManifest> {
  const { root, baseUrl } = opts;
  const base = baseUrl.replace(/\/$/, '');

  const specPath = resolve(root, 'content', 'landings', `${slug}.json`);
  if (!(await fileExists(specPath))) throw new Error(`Spec not found: ${specPath}`);
  const spec = LandingSpecSchema.parse(JSON.parse(await readFile(specPath, 'utf-8')));
  const components = Array.from(new Set(spec.sections.map((s) => s.component))).sort();

  // 1. SSR-страница завода в хендофф-режиме: без dev-инспектора, секции-табы
  //    раскрыты в стопку (моки всех вкладок попадают в разметку).
  let html = await fetchText(`${base}/landings/${slug}?handoff=1`);

  // 2. Внешний Tailwind-CSS
  const cssHref = /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/.exec(html)?.[1];
  let tailwindCss = '';
  if (cssHref) tailwindCss = await fetchText(cssHref.startsWith('http') ? cssHref : base + cssHref);

  // 3. Инлайновые <style> (кастомные компоненты) — вытащить перед вырезанием
  const inlineStyles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n\n');

  // 4. styles.css: Tailwind + компоненты + оверрайды; url(/…) → абсолютные
  let stylesCss =
    `/* Лендинг «${spec.seo.title}» — стили одним файлом.\n` +
    `   DS-переменные + Tailwind-утилиты + кастомные компоненты. Шрифт Roboto (подключите свой). */\n\n` +
    tailwindCss +
    `\n\n/* ===== кастомные компоненты (в SSR были inline) ===== */\n` +
    inlineStyles +
    `\n\n/* статика: блоки, появляющиеся по скроллу (JS), показываем сразу */\n` +
    `.pain-bubbles__item{opacity:1 !important;animation:none !important}\n` +
    // RoadmapSteps (ProcessSteps variant=roadmap): карточки этапов на opacity:0 до JS-класса
    // .on, а прогресс линии — через --p. Без JS видна только пустая линия. Форсируем финал.
    `.rmp__item{opacity:1 !important;transform:none !important}\n` +
    `.rmp__item .rmp__dot{background:#7d4ccf !important;transform:none !important}\n` +
    `.rmp{--p:1}\n` +
    `\n:root{--font-sans:'Roboto',system-ui,-apple-system,'Segoe UI',sans-serif}\n`;
  stylesCss = stylesCss.replace(/url\(\s*\//g, `url(${base}/`);

  // 5. styles.scoped.css (+ дочистка краевых нескоупленных корневых селекторов)
  const scopedCss = scopeCss(stylesCss)
    .replace(/(^|})(\s*):root(\s*\{)/g, '$1$2.kaiten-webinar$3')
    .replace(/(^|})(\s*)html(\s*\{)/g, '$1$2.kaiten-webinar$3')
    .replace(/(^|})(\s*)body(\s*\{)/g, '$1$2.kaiten-webinar$3');

  // 6. index.html: чистим и линкуем styles.css
  html = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<script\b[^>]*\/?>/g, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/g, '')
    .replace(/<link\b[^>]*>/g, '')
    .replace(/<!--\$[^>]*-->|<!--\/\$-->/g, '')
    // dev-атрибуты инспектора завода не нужны верстальщику
    .replace(/\sdata-comp(-index)?="[^"]*"/g, '')
    .replace(/\sdata-inspect(?:="[^"]*")?/g, '');

  // Без JS reveal-классы (.is-play) не навешиваются на скролл-моки, поэтому терминалы
  // (.dterm/.ctd__term), чипы ИИ (.aim) и мини-гант (.mg) остаются на opacity:0 / width:0
  // и выглядят пустыми. Форсируем финальное состояние: добавляем is-play всем reveal-корням,
  // чтобы сработали их собственные `.<root>.is-play …` правила из styles.css.
  const REVEAL_ROOTS = ['dterm', 'aim', 'mg', 'ctd__term', 'pain-bubbles'];
  html = html.replace(/\sclass="([^"]*)"/g, (m, cls: string) => {
    const tokens = cls.split(/\s+/);
    if (tokens.includes('is-play')) return m;
    return REVEAL_ROOTS.some((r) => tokens.includes(r)) ? ` class="${cls} is-play"` : m;
  });

  // ассеты лендинга (/landings/<slug>/…) → assets/<file>
  const assetRefs = new Set<string>();
  html = html.replace(
    new RegExp(`/landings/${slug}/([^"'\\s)]+)`, 'g'),
    (_m, file: string) => {
      assetRefs.add(file);
      return `assets/${basename(file)}`;
    },
  );
  html = html.replace(/(src|href)="(\/_next\/[^"]*)"/g, `$1="${base}$2"`);
  html = html.replace('</head>', '<link rel="stylesheet" href="styles.css">\n</head>');

  // Единственный скрипт пакета — ванильный, без зависимостей. Делает три вещи,
  // которые в живом лендинге держатся на React/хуках (в статике их нет):
  //   1) tabs  — переключение вкладок (TabbedFeatureSection: [data-kt-tab]/[data-kt-panel]);
  //   2) fit   — масштабирование моков фикс. ширины под контейнер (замена компонента
  //              ScaleToFit) — иначе на узких экранах терминал 700px вылезает/режется;
  //   3) band  — на мобиле опускает подсветку колонки в таблице сравнения под
  //              полноширинный заголовок (--kctc-bg-top / --kct-bg-top), иначе полоса
  //              лезет вверх в шапку. Всё пересчитывается на resize/load.
  const HELPER_SCRIPT =
    '<script>/* handoff: вкладки + адаптив моков (без React) */\n' +
    '(function(){' +
    'function tabs(){document.querySelectorAll("[data-kt-tabs]").forEach(function(root){' +
    'var btns=root.querySelectorAll("[data-kt-tab]"),panels=root.querySelectorAll("[data-kt-panel]");' +
    'btns.forEach(function(btn){btn.addEventListener("click",function(){var idx=btn.getAttribute("data-kt-tab");' +
    'btns.forEach(function(b){b.removeAttribute("data-active")});btn.setAttribute("data-active","");' +
    'panels.forEach(function(p){p.style.display=p.getAttribute("data-kt-panel")===idx?"":"none";});});});});}' +
    'function fit(){document.querySelectorAll("[style*=\\"transform-origin\\"]").forEach(function(inner){' +
    'var w=parseFloat(inner.style.width);if(!w)return;var outer=inner.parentElement;' +
    'if(!outer||!outer.clientWidth)return;' + // нет ширины (ещё не в лэйауте) → не трогаем, чтобы не схлопнуть в scale(0)
    'var s=Math.min(1,outer.clientWidth/w);inner.style.transform="scale("+s+")";' +
    'outer.style.height=(inner.offsetHeight*s)+"px";});}' +
    'function band(){[[".kctc-table","--kctc-bg-top",".kctc-hcell--label"],' +
    '[".kct-table","--kct-bg-top",".kct-hcell--label"]].forEach(function(c){' +
    'document.querySelectorAll(c[0]).forEach(function(t){var h=t.querySelector(c[2]);' +
    't.style.setProperty(c[1],(window.innerWidth<768&&h?h.offsetHeight:0)+"px");});});}' +
    'function adapt(){fit();band();}' +
    'tabs();adapt();window.addEventListener("resize",adapt);' +
    'window.addEventListener("load",adapt);setTimeout(adapt,300);' +
    '})();</script>';
  html = html.includes('</body>')
    ? html.replace('</body>', HELPER_SCRIPT + '\n</body>')
    : html + HELPER_SCRIPT;

  // 7. иконки: уникальные инлайн-SVG → assets/icons/
  const svgs = [...html.matchAll(/<svg\b[\s\S]*?<\/svg>/g)].map((m) => m[0]);
  const uniqSvgs = Array.from(new Set(svgs));
  const iconFiles: { name: string; svg: string }[] = uniqSvgs.map((svg, idx) => {
    const withNs = /xmlns=/.test(svg.slice(0, 80))
      ? svg
      : svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    return { name: `icon-${String(idx + 1).padStart(2, '0')}.svg`, svg: withNs };
  });

  // 8. токены (для README) + сборка файлов
  const tokensCss = await readFile(resolve(root, 'packages', 'ui', 'src', 'tokens.css'), 'utf-8').catch(() => '');
  const tokens = parseTokens(tokensCss);

  const files: { archivePath: string; content: string | Buffer }[] = [
    { archivePath: `landing-${slug}/index.html`, content: html },
    { archivePath: `landing-${slug}/styles.css`, content: stylesCss },
    { archivePath: `landing-${slug}/styles.scoped.css`, content: scopedCss },
    { archivePath: `landing-${slug}/content-spec.json`, content: JSON.stringify(spec, null, 2) + '\n' },
    { archivePath: `landing-${slug}/README-ВЁРСТКА.md`, content: makeReadme(spec, slug, tokens) },
  ];

  // картинки лендинга из public/
  for (const ref of assetRefs) {
    const src = resolve(root, 'apps', 'web', 'public', 'landings', slug, ref);
    if (await fileExists(src)) {
      files.push({ archivePath: `landing-${slug}/assets/${basename(ref)}`, content: await readFile(src) });
    }
  }
  // иконки
  for (const ic of iconFiles) {
    files.push({ archivePath: `landing-${slug}/assets/icons/${ic.name}`, content: ic.svg });
  }
  if (iconFiles.length) {
    files.push({
      archivePath: `landing-${slug}/assets/icons/_МАНИФЕСТ.txt`,
      content:
        'Уникальные иконки страницы. В index.html оставлены инлайн (currentColor);\n' +
        'файлы — для переиспользования у себя.\n\n' +
        iconFiles.map((i) => i.name).join('\n'),
    });
  }

  // 9. zip
  const zipPath = opts.outPath ?? resolve(root, 'out', `landing-${slug}-static.zip`);
  await mkdir(dirname(zipPath), { recursive: true });
  const archive = archiver('zip', { zlib: { level: 9 } });
  const output = createWriteStream(zipPath);
  const finished = new Promise<number>((res, rej) => {
    output.on('close', () => res(archive.pointer()));
    output.on('error', rej);
    archive.on('error', rej);
  });
  archive.pipe(output);
  for (const f of files) archive.append(f.content, { name: f.archivePath });
  await archive.finalize();
  const bytes = await finished;

  return {
    slug,
    zipPath,
    files: files.map((f) => f.archivePath),
    bytes,
    components,
    illustrations: [],
  };
}
