---
name: design-system-kaiten-v01
description: Kaiten landing design system V01. Use when designing, reviewing, or implementing Kaiten-style landing pages, marketing UI sections, responsive grids, spacing, typography, colors, component states, FAQ/accordion, review cards, CTA blocks, headers, footers, and product-led SaaS UI patterns.
---

# Design System Kaiten V01

Use this skill to keep Kaiten landing pages and UI components consistent with the studied Figma design system and landing prototype.

Canonical source of truth: `design-system/kaiten-v01/` (HTML/PDF/PNG). This skill is a distilled extract — if anything conflicts, trust the source.

## Core Style

Design calm B2B/SaaS interfaces: white surfaces, light-gray sections, real product UI screenshots, restrained typography, and violet as the single primary interaction color. Prefer product-led composition over decorative marketing layouts.

Avoid scanning or relying on the Figma `Bloks` area unless the user explicitly asks.

## Colors

Use these core tokens:

```css
--neutral-000: #ffffff;
--neutral-050: #fafafa;
--neutral-100: #f5f5f5;
--neutral-200: #eeeeee;
--neutral-300: #e0e0e0;
--neutral-400: #bdbdbd;
--neutral-500: #9e9e9e;
--neutral-600: #757575;
--neutral-700: #616161;
--neutral-800: #424242;
--neutral-900: #2d2d2d;
--neutral-950: #121212;

--violet-100: #7d4ccf;
--violet-12: #efe9f9;

--purple-100: #ab47bd;
--purple-12: #f4e8f7;
--blue-100: #2196f3;
--blue-12: #e4f2fd;
--green-100: #4caf51;
--green-12: #e9f5ea;
--lime-100: #a5ca00;
--lime-12: #f4f8e0;
--orange-100: #ffa100;
--orange-12: #fff3e0;
--red-100: #f44336;
--red-12: #fde8e6;
```

Use semantic aliases:

```css
--text-primary: var(--neutral-900);
--text-secondary: var(--neutral-600);
--text-inverse: var(--neutral-000);
--text-accent: var(--violet-100);
--surface-page: var(--neutral-000);
--surface-section: var(--neutral-100);
--surface-card: var(--neutral-000);
--border-default: var(--neutral-300);
--action-primary: var(--violet-100);
--action-primary-soft: var(--violet-12);
```

Use violet for CTA, links, active states, icons, focused/opened accordions, and carousel next controls. Use neutral grays for text hierarchy, borders, section backgrounds, and inactive UI.

## Typography

Use a neutral grotesk close to Inter:

```css
--font-family-base: "Inter", system-ui, sans-serif;

--text-xs: 12px; --leading-xs: 16px;
--text-sm: 14px; --leading-sm: 20px;
--text-md: 16px; --leading-md: 24px;
--text-lg: 18px; --leading-lg: 28px;
--text-xl: 20px; --leading-xl: 28px;
--text-2xl: 24px; --leading-2xl: 32px;
--text-3xl: 30px; --leading-3xl: 36px;
--text-4xl: 36px; --leading-4xl: 40px;
--text-5xl: 48px; --leading-5xl: 52px;
--text-6xl: 60px; --leading-6xl: 64px;
```

Use weights `Regular`, `Medium`, and `SemiBold`. Prefer `SemiBold` for headings and CTA labels, `Medium` for navigation and component titles, and `Regular` for body text.

Recommended landing usage:

- Desktop hero: `text-5xl` or `text-6xl`, `SemiBold`, tight line height.
- Mobile hero: `text-3xl`, `SemiBold`.
- Section headings: `text-3xl` to `text-4xl`.
- Body: `text-md` or `text-lg`.
- UI labels and meta: `text-xs` or `text-sm`.

### Hanging prepositions — forced wrap on adaptives (RU text)

Short Russian function words (prepositions/conjunctions: в, и, к, с, у, о, на, по, за, из, от, до, под, без, для, над, при, про, что, как, или, а, но, не, если…) must **never** be left alone at the end of a line. Glue each to the **following** word with a non-breaking space (`&nbsp;` in HTML, ` ` in code, Alt+0160 in mockups) so on wrap the word moves to the next line **together** with the preposition.

- **Forced wrap on adaptives is the whole point of the rule.** It applies on ALL breakpoints (desktop / tablet / mobile), not only desktop. Narrow viewports wrap more, so hanging prepositions appear most often on mobile. `&nbsp;` forces the preposition to move to the next line together with its word the moment that word no longer fits the container — this is the required behavior on adaptives.
- The browser/container does the wrapping. **Never** hardcode line breaks with `<br>` — manual `<br>` breaks the responsive layout. `&nbsp;` controls only the hanging words; everything else wraps naturally.
- **Applies to EVERY text element of the landing — no exceptions.** A common mistake is to fix only the section heading + subline and skip text inside components. A hanging preposition must not be left at the end of a line in **any** text element: H1/H2 and sublines; accordion / FAQ item titles **and** bodies (question + answer); card titles **and** descriptions (features, templates, steps, benefits); buttons / CTA, navigation, footer; captions, badges, list items, tags, mockup / UI labels. If text is visible and can wrap, it must not contain hanging prepositions. The most reliable method is a single pass over the whole markup (e.g. a regex that replaces the plain space after every standalone preposition with `&nbsp;`), then verify each text block at 360–390px.
- **Particles `ли`, `же`, `бы`, `ль`** are the mirror case: glue them to the **preceding** word (`Можно&nbsp;ли`, `Есть&nbsp;ли`, `так&nbsp;же`), not the following one — they must not hang either, nor start a line detached from their word.
- Verify at **360–390px** — the narrowest width exposes hanging words best. Result: a preposition and its word either both stay on the current line, or **both move to the next line together** — the preposition never hangs at the end of a line alone.

### Em-dash + короткое слово — короткое слово переносится (ОБЯЗАТЕЛЬНО)

Если после длинного тире (`—`) идёт **короткое слово** (1–3 буквы: `это`, `как`, `так`, `все`, `для`, `наш`, союзы/частицы и т.п.), это короткое слово при переносе строки уходит на следующую строку, **а тире остаётся в конце текущей строки** — приклеенным к предшествующему слову. Тире никогда не начинает новую строку.

Реализация — неразрывный пробел `&nbsp;` **перед** тире, между тире и предыдущим словом. После тире оставляй обычный пробел (там перенос разрешён), чтобы короткое слово могло уехать на следующую строку.

```html
<!-- ❌ тире оторвано от слова / короткое слово прибито к тире -->
<p>Kaiten —это платформа управления работой</p>

<!-- ✅ тире держится за «Kaiten», «это» свободно переносится на следующую строку -->
<p>Kaiten&nbsp;— это платформа управления работой</p>
```

- Применяется ко всему видимому тексту макета (заголовки, подзаголовки, тела, карточки, подписи), на всех адаптивах.
- Тире всегда отбивается неразрывным пробелом от предыдущего слова (`слово&nbsp;—`) — это исключает висящее тире в начале строки; слово после тире переносится свободно.
- Не путать с висячими предлогами выше: там предлог клеится к следующему слову; здесь тире клеится к **предыдущему** слову, а короткое слово после тире уходит на новую строку.
- Проверяй на 360–390px — узкая ширина чаще всего обнажает оторванное тире.

### Короткое слово после точки — не висит в конце строки (ОБЯЗАТЕЛЬНО)

Когда предложение закончилось точкой и следующее предложение начинается с **короткого слова** (1–3 буквы: `Все`, `Это`, `Мы`, `Он`, `Их`, `Так`, `Как`, `Для`, `Что` и т.п.), это короткое слово **не должно оставаться последним словом строки** сразу после точки. Переноси его на следующую строку — вместе со своим предложением, а не хвостом к предыдущему.

Реализация — неразрывный пробел `&nbsp;` между этим коротким словом и **следующим** за ним словом. Тогда короткое слово не может «прилипнуть» в конец строки в одиночку: как только следующее слово не помещается, оба уезжают на новую строку, и новое предложение начинается с чистой строки.

```html
<!-- ❌ «Все» висит в конце второй строки, оторвано от своего предложения -->
<p>Глубокий PM, база знаний и сервисные модули. Все
процессы в едином контуре</p>

<!-- ✅ «Все» склеено со следующим словом → переносится на новую строку вместе -->
<p>Глубокий PM, база знаний и сервисные модули. Все&nbsp;процессы в&nbsp;едином контуре</p>
```

- Пробел **перед** коротким словом (после точки) — обычный (там перенос разрешён и желателен). Неразрывный ставится только **после** короткого слова.
- Применяется ко всему видимому тексту макета, на всех адаптивах.
- Это частный случай общего принципа «короткие слова не висят в конце строки» (ср. висячие предлоги выше) — но именно для первого слова нового предложения после точки.
- Проверяй на 360–390px — на узкой ширине такое короткое слово чаще всего оказывается в конце строки.

### Heading alignment — center on desktop/tablet, left on mobile (ОБЯЗАТЕЛЬНО)

Заголовки и подзаголовки секций (H1/H2/H3 + их подзаголовки/сублайны) выравниваются:

- **Desktop и tablet (≥ tablet breakpoint) — по центру** (`text-align: center`).
- **Mobile (< tablet breakpoint) — по левому краю** (`text-align: left`).

Это правило применяется всегда, к заголовку и подзаголовку каждой секции (hero, section headings, CTA-блоки и т.п.). Body-текст, списки и подписи внутри карточек этим правилом не затрагиваются — речь именно о заголовках и подзаголовках.

Реализация — mobile-first: базовый `text-left`, на планшете/десктопе переопределяем на `center`.

```html
<!-- ✅ mobile: left → tablet/desktop: center -->
<h2 class="text-left md:text-center">Заголовок секции</h2>
<p class="text-left md:text-center">Подзаголовок секции</p>
```

```css
/* эквивалент без утилит */
.section-title,
.section-subtitle { text-align: left; }              /* mobile */
@media (min-width: 768px) {                            /* tablet и выше */
  .section-title,
  .section-subtitle { text-align: center; }
}
```

При центрированном заголовке следи, чтобы блок с текстом был ограничен по ширине и центрирован (`mx-auto max-w-…`), иначе строки центрируются относительно слишком широкого контейнера. Проверяй на 360–390px (левый край) и на tablet/desktop (центр).

### No trailing period — точка в конце не ставится (ОБЯЗАТЕЛЬНО)

В текстах макета **не ставим точку в конце последнего предложения**:

- В конце **последнего предложения блока** (текстовый блок, абзац-подводка, описание карточки, пункт списка) точка не ставится.
- В **заголовках и подзаголовках** (H1/H2/H3, сублайны, eyebrow, заголовки карточек) точки нет.
- Также без точки: подписи, бейджи, лейблы, кнопки/CTA, пункты списков, значения в мокапах.

Точки **внутри** текста сохраняются: если в блоке несколько предложений, точки между ними на месте — убирается только финальная, самая последняя точка блока. Другие знаки конца предложения (`?`, `!`, `…`) в конце оставляем — правило именно про точку.

```html
<!-- ❌ -->
<h2>Управляйте задачами и процессами в одной платформе.</h2>
<p>Глубокий PM, база знаний и сервисные модули. Всё в едином контуре.</p>

<!-- ✅ финальная точка убрана; точка между предложениями осталась -->
<h2>Управляйте задачами и процессами в одной платформе</h2>
<p>Глубокий PM, база знаний и сервисные модули. Всё в едином контуре</p>
```

Проверяй перед сдачей: пройди по всем текстовым элементам и убери завершающую точку у последнего предложения каждого блока и у всех заголовков/подзаголовков.

## Spacing

Use a 4px-based spacing scale:

```css
--space-0: 0px;
--space-0-5: 2px;
--space-1: 4px;
--space-1-5: 6px;
--space-2: 8px;
--space-2-5: 10px;
--space-3: 12px;
--space-3-5: 14px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-7: 28px;
--space-8: 32px;
--space-9: 36px;
--space-10: 40px;
--space-11: 44px;
--space-12: 48px;
--space-14: 56px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

Read labels like `12/48` as `token / pixels`: `space-12 = 48px`.

### Vertical spacing — outer / inner / inner-gap (ОБЯЗАТЕЛЬНО)

Вертикальные отступы блоков задаются по адаптиву. **Внешние** — по высоте между блоками (в т.ч. начало и конец блока, вертикальный отступ секции до/после контента). **Внутренние** — вертикальные отступы внутри блока (между его внутренними элементами/группами). **Между внутренними блоками** — по высоте между соседними внутренними блоками/группами.

| Breakpoint | Внешние (outer) | Внутренние (inner) | Между внутренними блоками (inner-gap) |
|---|---|---|---|
| Desktop | **96px** (`space-24`) | **48px** (`space-12`) | **32px** (`space-8`) |
| Tablet | **64px** (`space-16`) | **32px** (`space-8`) | **24px** (`space-6`) |
| Mobile | **48px** (`space-12`) | **24px** (`space-6`) | **16px** (`space-4`) |

- **Outer** — вертикальный `padding`/зазор на границах блока: сверху первого и снизу последнего блока, вертикальный ритм секций. По умолчанию именно эти значения для «начала и конца блока».
- **Inner** — вертикальные отступы внутри блока между крупными группами (заголовок → подзаголовок → контент → CTA).
- **Inner-gap (между внутренними блоками)** — вертикальный отступ по высоте между соседними внутренними блоками/группами внутри блока (например между строками контента, карточками, пунктами списка одной группы).
- Реализация mobile-first: база — mobile, затем переопределяем на tablet и desktop.

```css
.block {                 /* mobile */
  padding-block: 48px;   /* outer */
  row-gap: 24px;         /* inner */
}
.block__items {          /* mobile */
  row-gap: 16px;         /* inner-gap — между внутренними блоками */
}
@media (min-width: 768px) {   /* tablet */
  .block { padding-block: 64px; row-gap: 32px; }
  .block__items { row-gap: 24px; }
}
@media (min-width: 1024px) {  /* desktop */
  .block { padding-block: 96px; row-gap: 48px; }
  .block__items { row-gap: 32px; }
}
```

```html
<!-- утилитами (mobile → tablet → desktop) -->
<section class="py-12 md:py-16 lg:py-24">   <!-- outer 48/64/96 -->
  <div class="flex flex-col gap-6 md:gap-8 lg:gap-12"> <!-- inner 24/32/48 -->
    <div class="flex flex-col gap-4 md:gap-6 lg:gap-8"> <!-- inner-gap 16/24/32 -->
      …
    </div>
  </div>
</section>
```

#### Разные разделы на одном фоне — увеличенный отступ (ОБЯЗАТЕЛЬНО)

Если на **одном фоне** друг за другом идут блоки **разных смысловых разделов** (нет смены цвета/поверхности между ними), вертикальный отступ между ними увеличивается — чтобы разделы не сливались и было больше «воздуха».

| Breakpoint | Отступ между разделами | Стандартный outer (для сравнения) |
|---|---|---|
| Desktop | **128px** | 96px |
| Tablet | **96px** | 64px |
| Mobile | **64px** | 48px |

- Применять, только когда смены фона нет: соседние секции на одинаковой поверхности. Если фон между разделами меняется (белый → серый и т.п.), граница читается сама — хватает стандартного outer (96/64/48).
- «Стандартный отступ 96 сверху и снизу» — это обычный вертикальный ритм секции; между разными разделами на общем фоне доводим суммарный зазор до 128/96/64.
- Реализация mobile-first — увеличенный `padding-block`/`margin` на стыке: `py-16 md:py-24 lg:py-32` (64/96/128) вместо `py-12 md:py-16 lg:py-24`.
- **Цветной CTA-блок** — тот же увеличенный отступ **до и после** блока: desktop 128 / tablet 96 / mobile 64. Акцентный блок должен «дышать» и явно отделяться от соседних секций сверху и снизу, поэтому здесь увеличенный зазор применяется даже несмотря на смену фона (это исключение из правила «только на одном фоне»).

Desktop rules:

- Header height: `80px`.
- Header/menu rhythm: `12/48`.
- Text stack gap: `4/16`.
- Text to CTA gap: `6/24`.
- Hero content to media: `12/48` or `16/64`, depending on object visual weight.
- Grid/card gap: `32px`.
- Section vertical spacing: `20/80` or `24/96`.
- Close elements in one group: `3/12`.

Tablet/mobile rules:

- Header height: `72px`.
- Side padding: `24px` on tablet, `16px` on mobile.
- Compact internal gap: `3/12`.
- Medium internal gap: `4/16`.
- Text to action gap: `6/24`.
- Larger block gap: `8/32`.
- Section spacing: `9/36` or `12/48`, depending on object visual weight.
- Grid step: `24px` on tablet, `16px` on mobile.

## Grid

Use these responsive grids:

```css
--grid-desktop-container: 1216px;
--grid-desktop-columns: 12;
--grid-desktop-column: 72px;
--grid-desktop-gutter: 32px;

--grid-tablet-columns: 6;
--grid-tablet-column: 100px;
--grid-tablet-gutter: 24px;
--grid-tablet-margin: 24px;

--grid-mobile-columns: 4;
--grid-mobile-column: 70px;
--grid-mobile-gutter: 16px;
--grid-mobile-margin: 16px;
```

Desktop: `1920px` artboard, 12-column centered fixed grid, `1216px` content width, `72px` columns, `32px` gutters, `248px` outer margins.

Tablet: `768px` artboard, 6-column stretch grid, `100px` columns, `24px` gutters, `24px` side margins.

Mobile: `360px` artboard, 4-column stretch grid, `70px` columns, `16px` gutters, `16px` side margins.

### Adaptive preview — показывать на брейкпоинтах (ОБЯЗАТЕЛЬНО)

Лендинг обязан адаптироваться под ширину окна, а не только выглядеть на десктопе. При сборке лендинга/секции ВСЕГДА показывай результат набором инлайн-превью на разной ширине, чтобы было видно перестроение сетки под брейкпоинты — не одним десктопным скриншотом.

- Минимум три ширины: **desktop ~1280–1440px, tablet 768px, mobile 375–390px** (при сомнениях добавь узкий `360px`).
- На каждой ширине проверяй перестроение: колонки схлопываются (`12 → 6 → 4`), hero и фиче-секции складываются в одну колонку, навигация сворачивается, широкие продуктовые мокапы (канбан, таблицы, Ганта) скроллятся внутри рамки (`overflow-x: auto`, `min-width: 0` на предках), а не растягивают страницу.
- У `body`/страницы НЕ должно быть горизонтального скролла ни на одной ширине. Тексты переносятся без висячих предлогов (см. правило выше).
- Сломанный адаптив (горизонтальный скролл, наезд элементов, обрезанный мокап) — это **блокер**: чинить до сдачи, а не откладывать.

## Full-bleed & decorative layers (CRITICAL — частый баг)

Section background, gradient glows, mesh blobs, hero halos и любая декоративная подложка ОБЯЗАНЫ занимать **всю** ширину своего ближайшего `position: relative` родителя. Контентом капится только **content container**, не декорации.

Правила:

- Декоративный absolute-слой использует `inset-0` (или `inset-x-0 top-…` для частичного) **БЕЗ** `max-w-*` и **БЕЗ** `mx-auto`. Иначе на мониторах шире `1440px`/`1920px` фон обрезается полосами по бокам.
- Родитель такого слоя — `relative isolate overflow-hidden`. `overflow-hidden` нужен, чтобы фон не «вылезал» из секции, `isolate` — чтобы `-z-10` не уходил под предыдущие секции.
- Только контентный wrapper получает `mx-auto w-full max-w-(--container-kaiten)` (1216px). Это слой текста/карточек, не фона.
- Радиальные/линейные градиенты задавай в процентах (`60% 60% at 70% 0%`), чтобы они переезжали вместе с шириной экрана, а не «уплывали» в угол.
- Перед сдачей проверяй макет на 1440 / 1920 / 2560 шириной — фон должен доходить до краёв вьюпорта.

Anti-pattern (НЕ ДЕЛАЙ ТАК):

```tsx
// ❌ на ширине >1440px фон обрезается полосами слева/справа
<div class="absolute inset-x-0 -top-32 -z-10 mx-auto h-[720px] max-w-[1440px] bg-[radial-gradient(...)]" />
```

Pattern (ДЕЛАЙ ТАК):

```tsx
// ✅ фон тянется на всю ширину секции, контент капится отдельно
<section class="relative isolate overflow-hidden">
  <div aria-hidden class="pointer-events-none absolute inset-x-0 -top-32 -z-10 h-[720px] bg-[radial-gradient(...)]" />
  <div class="mx-auto w-full max-w-(--container-kaiten) px-4 md:px-6">
    {/* content */}
  </div>
</section>
```

## Radius

Use:

```css
--radius-none: 0px;
--radius-sm: 2px;
--radius-base: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;
--radius-2xl: 16px;
--radius-3xl: 24px;
--radius-4xl: 32px;
--radius-full: 9999px;
```

Use `lg/xl` for buttons and accordion rows, `2xl/3xl` for cards and large sections, and `full` for pills, badges, round buttons, and avatars.

### Block radius — по адаптиву (ОБЯЗАТЕЛЬНО)

Скругление углов блоков (карточки, секции-контейнеры, медиа-рамки, мокап-обёртки) задаётся по брейкпоинту:

| Breakpoint | Radius блока |
|---|---|
| Desktop | **16px** (`radius-2xl`) |
| Tablet | **12px** (`radius-xl`) |
| Mobile | **12px** (`radius-xl`) |

- Правило распространяется на скругление именно **блоков** (карточки, контейнеры, медиа/мокап-рамки). Кнопки (`8px`), пилюли/бейджи (`full`) и мелкие атомы этим правилом не затрагиваются — у них радиус фиксированный.
- Реализация mobile-first: база — mobile/tablet (`12px`), переопределяем на desktop (`16px`).

```css
.block {                 /* mobile + tablet */ border-radius: 12px; }
@media (min-width: 1024px) { .block { border-radius: 16px; } }  /* desktop */
```

```html
<div class="rounded-xl lg:rounded-2xl">…</div> <!-- 12 → 16 -->
```

## CSS audit before publish (ОБЯЗАТЕЛЬНО)

Перед финальной выгрузкой лендинга в GitHub проверь styles.css на мусор — лендинги собираются на шелле предыдущего и обрастают патч-правками:

1. Правила секций, которых нет на странице (чужие `#id` из шелла-донора).
2. Стили удалённых или заменённых компонентов.
3. Неиспользуемые ассеты: сверь `src` в index.html со списком файлов в assets/ — лишние не выкладывать (как и служебный preview.html).

Метод: собрать все id/классы из index.html + script.js → найти селекторы с несуществующими токенами → вырезать мёртвые правила целиком (правило удаляется, только если ВСЕ его селекторы мёртвые). После чистки — попиксельная проверка: рендер до/после на 1366/900/390 и сравнение скриншотов; расхождения допустимы только в анимированных зонах.

Прецеденты: «Кайтен для ритейла» (в репо уехал Puck-CSS редактора), «Кайтен для Trello» (342 мёртвых правила шелла, 158→131 КБ).

## Components

Structure work around landing sections and reusable organisms:

- Atoms: logo mark, icon, badge, button, avatar, divider, chevron, plus/minus, text styles.
- Molecules: nav item, CTA group, feature item, FAQ row, tab item, review card, author identity.
- Organisms: header, hero, benefits strip, testimonials carousel, FAQ section, slider accordion, CTA block, footer, comparison block.
- Templates: desktop/mobile landing layouts and responsive section shells.

Button atom:

Use `Roboto`, `Medium`, letter spacing `-0.2px`, radius `8px`, and no layout shift between states. Buttons can be text with optional left/right icons or icon-only.

```css
--button-radius: 8px;
--button-fill-bg: #7d4ccf;
--button-fill-bg-hover: #6f43b8;
--button-fill-bg-disabled: #f5f5f5;
--button-fill-text: #ffffff;
--button-fill-text-disabled: #9e9e9e;
--button-outline-bg: #ffffff;
--button-outline-bg-hover: #efe9f9;
--button-outline-border: #e0e0e0;
--button-outline-border-hover: rgba(125, 76, 207, 0.48);
--button-outline-text: #7d4ccf;
--button-outline-text-hover: #6f43b8;
--button-outline-text-disabled: #e0e0e0;
--button-focus-brand: 0 0 0 4px rgba(55, 88, 249, 0.2);
--button-focus-default: 0 0 0 4px rgba(152, 162, 179, 0.14);
```

Button sizes:

- `sm`: height `40px`, text padding `10px 14px`, text+icon gap `6px`, icon `20px`, label text `14/20`.
- `sm icon-only`: `40px` square, padding `10px`, icon `20px`.
- `md`: height `44px`, text padding `10px 16px`, text+icon gap `4px`, icon `24px`, label text `16/24`.
- `md icon-only`: `44px` square, padding `10px`, icon `24px`.
- `lg`: height `48px`, text padding `12px 20px`, text+icon gap `4px`, icon `24px`, label text `16/24`.
- `lg icon-only`: `48px` square, padding `12px`, icon `24px`.

Button variants and states:

- Fill default: violet background `#7d4ccf`, white text and icons.
- Fill hover: background `#6f43b8`, white text and icons.
- Fill focus: default fill plus `--button-focus-brand`.
- Fill disabled: background `#f5f5f5`, text/icons `#9e9e9e`, no hover.
- Outline default: white background, `#e0e0e0` border, violet text/icons.
- Outline hover: `#efe9f9` background, `rgba(125, 76, 207, 0.48)` border, text/icons `#6f43b8`.
- Outline focus: default outline plus `--button-focus-default`.
- Outline disabled: white background, `#e0e0e0` border, text/icons `#e0e0e0`, no hover.

Use `fill` for primary conversion actions and active icon actions. Use `outline` for secondary actions, header secondary CTAs, previous controls, neutral utility actions, and icon-only phone/menu actions when they sit on white.

FAQ/accordion states:

- Closed: white row, neutral text, plus icon.
- Hover/accent: title or border shifts to violet.
- Open: white or soft violet panel, violet border, violet title, minus/chevron-up icon, body text below.

Carousel:

- Previous button: white circular button with neutral border.
- Next button: filled violet circular button.
- Counter: neutral text with current index emphasis.
- **Отступ стрелок-листалки по вертикали (ОБЯЗАТЕЛЬНО):** когда в интерфейсе есть стрелки для листания контента вбок (карусель/слайдер/таб-скроллер), вертикальный отступ сверху и снизу от блока стрелок равен **внутреннему** отступу (inner): **desktop 48px · tablet 32px · mobile 24px**. Т.е. блок со стрелками отбивается от соседнего контента сверху и снизу на inner-значение (`space-12 / space-8 / space-6`), mobile-first: `my-6 md:my-8 lg:my-12`.

Header:

- Desktop: full logo, nav items with chevrons, CTA/action area.
- Mobile: logo plus hamburger.

## Motion

Use restrained UI motion:

```css
--duration-fast: 120ms;
--duration-base: 180ms;
--duration-slow: 240ms;
--ease-ui: cubic-bezier(.2, 0, .2, 1);
```

Animate hover, focus, accordion open/close, carousel slide transitions, and button press feedback. Keep motion functional and quiet.
