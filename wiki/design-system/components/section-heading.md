# Section Heading

Компонент заголовка секции (`SectionTitleK`). Используется в начале каждой контентной секции лендинга. Состоит из опционального бейджа (`BageSfera`), основного заголовка и опциональной подписи. Четыре варианта: два выравнивания (Left / Center) × два брейкпоинта (Desktop / Mobile).

---

## Anatomy

```
┌── BageSfera (опционально) ────────────────────────┐
│  bg: rgba(125,76,207,0.12)  border-radius: 16px   │
│  "Текст бейджа"  (14px Medium #7d4ccf — Desktop)  │
│                  (12px Medium #7d4ccf — Mobile)    │
└───────────────────────────────────────────────────┘
┌── Title block ────────────────────────────────────┐
│  Основной заголовок  (36px SemiBold — Desktop)    │
│                      (24px SemiBold — Mobile)     │
│                                                   │
│  Описание (опционально)                           │
│  (16px Regular #2d2d2d — Desktop)                 │
│  (14px Regular #2d2d2d — Mobile)                  │
└───────────────────────────────────────────────────┘
```

---

## Variants

| Вариант | View | Alignment | Node ID | Width | Gap |
|---------|------|-----------|---------|-------|-----|
| Desktop Left | Desktop | Left | `2390:14393` | `1216px` | `16px` |
| Desktop Center | Desktop | Center | `2390:14405` | `1216px` | `16px` |
| Mobile Left | Mobile | Left | `2390:14399` | `328px` | `12px` |
| Mobile Center | Mobile | Center | `2390:14411` | `328px` | `12px` |

---

## Figma

| Нода | Описание | Ссылка |
|------|----------|--------|
| `2390:14429` | Section — все варианты | [Открыть в Figma](https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=2390-14429) |
| `2390:14393` | Desktop / Left | [Открыть в Figma](https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=2390-14393) |
| `2390:14405` | Desktop / Center | [Открыть в Figma](https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=2390-14405) |
| `2390:14399` | Mobile / Left | [Открыть в Figma](https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=2390-14399) |
| `2390:14411` | Mobile / Center | [Открыть в Figma](https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=2390-14411) |

---

## Sub-components

### BageSfera (badge)

| Prop | Тип | Default | Описание |
|------|-----|---------|----------|
| `text` | `string` | `"???"` | Текст бейджа |
| `view` | `"Desktop" \| "Mobile"` | `"Desktop"` | Брейкпоинт |

**Desktop** · node `4632:7857`
- `bg: rgba(125,76,207,0.12)` · `px: 16px` · `py: 4px` · `border-radius: 16px`
- Текст: `14px Medium #7d4ccf` · `line-height: 20px` · `letter-spacing: -0.2px`

**Mobile** · node `4633:10386`
- `bg: rgba(125,76,207,0.12)` · `px: 12px` · `py: 4px` · `border-radius: 16px`
- Текст: `12px Medium #7d4ccf` · `line-height: 16px` · `letter-spacing: -0.2px`

---

## Tokens

| Token | Value | Использование |
|-------|-------|---------------|
| `--colors/kaiten/brand-12k` | `rgba(125,76,207,0.12)` | Фон бейджа |
| `--section-title/badge-color` | `#7d4ccf` | Цвет текста бейджа |
| `--text/title-color` | `#2d2d2d` | Цвет заголовка и описания |
| `--border-radius/rounded-2xl` | `16px` | Скругление бейджа |
| `--spacing/1` | `4px` | py бейджа (все варианты) |
| `--spacing/3` | `12px` | px бейджа Mobile; gap Mobile |
| `--spacing/4` | `16px` | px бейджа Desktop; gap Desktop |
| `--size/4xl` | `36px` | Заголовок Desktop |
| `--size/2xl` | `24px` | Заголовок Mobile |
| `--size/md` | `16px` | Описание Desktop |
| `--size/sm` | `14px` | Описание Mobile |
| `--size/xs` | `12px` | Текст бейджа Mobile |
| `--line-height/4xl` | `40px` | LH заголовка Desktop |
| `--line-height/2xl` | `32px` | LH заголовка Mobile |
| `--line-height/md` | `24px` | LH описания Desktop |
| `--line-height/sm` | `20px` | LH описания Mobile; LH бейджа Desktop |
| `--line-height/xs` | `16px` | LH бейджа Mobile |
| `--family/family` | `'Roboto'` | Шрифт |

> **Важно:** Заголовок Desktop (`size/4xl`, `36px`) имеет `letter-spacing: 0` (без трекинга). Все остальные текстовые элементы — `letter-spacing: -0.2px`.

---

## Props

### SectionTitleK

| Prop | Тип | Default | Описание |
|------|-----|---------|----------|
| `view` | `"Desktop" \| "Mobile"` | `"Desktop"` | Брейкпоинт |
| `alignment` | `"Left" \| "Center"` | `"Left"` | Выравнивание |
| `mainHeading` | `string` | `"Заголовок"` | Основной заголовок |
| `description` | `string` | `"…"` | Текст описания |
| `showSubheading` | `boolean` | `true` | Показывать бейдж |
| `subline` | `boolean` | `true` | Показывать описание |

---

## HTML + CSS

```html
<!-- ============================================================
     SECTION HEADING COMPONENT  (SectionTitleK + BageSfera)
     4 variants: Desktop Left / Desktop Center / Mobile Left / Mobile Center
     Responsive: ≥ 768px → Desktop styles, < 768px → Mobile styles
     ============================================================ -->

<style>
  /* ── Design Tokens ─────────────────────────────────────────── */
  :root {
    --badge-bg:          rgba(125, 76, 207, 0.12);
    --badge-color:       #7d4ccf;
    --heading-color:     #2d2d2d;
    --radius-2xl:        16px;
    --ls:                -0.2px;
    --font:              'Roboto', sans-serif;
    --fw-reg:            400;
    --fw-med:            500;
    --fw-semi:           600;

    /* spacing */
    --sp-1:  4px;
    --sp-3:  12px;
    --sp-4:  16px;

    /* type scale */
    --fs-xs:  12px;  --lh-xs:  16px;
    --fs-sm:  14px;  --lh-sm:  20px;
    --fs-md:  16px;  --lh-md:  24px;
    --fs-2xl: 24px;  --lh-2xl: 32px;
    --fs-4xl: 36px;  --lh-4xl: 40px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ══ BageSfera — Badge ════════════════════════════════════════ */
  .sh-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--badge-bg);
    border-radius: var(--radius-2xl);
    flex-shrink: 0;
  }

  /* Desktop badge · node 4632:7857 */
  .sh-badge--desktop {
    padding: var(--sp-1) var(--sp-4);   /* py:4px px:16px */
  }
  .sh-badge--desktop .sh-badge__text {
    font-family: var(--font);
    font-size: var(--fs-sm);            /* 14px */
    font-weight: var(--fw-med);
    line-height: var(--lh-sm);          /* 20px */
    letter-spacing: var(--ls);
    color: var(--badge-color);
    white-space: nowrap;
    word-break: break-word;
    font-variation-settings: "wdth" 100;
  }

  /* Mobile badge · node 4633:10386 */
  .sh-badge--mobile {
    padding: var(--sp-1) var(--sp-3);   /* py:4px px:12px */
  }
  .sh-badge--mobile .sh-badge__text {
    font-family: var(--font);
    font-size: var(--fs-xs);            /* 12px */
    font-weight: var(--fw-med);
    line-height: var(--lh-xs);          /* 16px */
    letter-spacing: var(--ls);
    color: var(--badge-color);
    white-space: nowrap;
    word-break: break-word;
    font-variation-settings: "wdth" 100;
  }

  /* ══ SectionTitleK — wrapper ══════════════════════════════════ */
  .sh {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  /* ── Desktop variants ──────────────────────────────────────── */

  /* Desktop / Left · node 2390:14393 */
  .sh--desktop-left {
    gap: var(--sp-4);         /* 16px */
    align-items: flex-start;
    width: 1216px;
  }

  /* Desktop / Center · node 2390:14405 */
  .sh--desktop-center {
    gap: var(--sp-4);         /* 16px */
    align-items: center;
    width: 1216px;
  }

  /* ── Mobile variants ───────────────────────────────────────── */

  /* Mobile / Left · node 2390:14399 */
  .sh--mobile-left {
    gap: var(--sp-3);         /* 12px */
    align-items: flex-start;
    width: 328px;
  }

  /* Mobile / Center · node 2390:14411 */
  .sh--mobile-center {
    gap: var(--sp-3);         /* 12px */
    align-items: center;
    width: 328px;
  }

  /* ── Title block ───────────────────────────────────────────── */
  .sh__title-block {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 100%;
    word-break: break-word;
    color: var(--heading-color);
  }

  /* Desktop title block */
  .sh__title-block--desktop {
    gap: var(--sp-4);         /* 16px */
    align-items: flex-start;  /* overridden by Center variant below */
  }
  .sh--desktop-center .sh__title-block--desktop {
    align-items: center;
    text-align: center;
  }

  /* Mobile title block */
  .sh__title-block--mobile {
    gap: var(--sp-3);         /* 12px */
    align-items: flex-start;
    letter-spacing: var(--ls);
  }
  .sh--mobile-center .sh__title-block--mobile {
    align-items: center;
    text-align: center;
  }

  /* ── Heading text ──────────────────────────────────────────── */

  /* Desktop heading · node 2390:14397 / 2390:14409 */
  .sh__heading--desktop {
    font-family: var(--font);
    font-size: var(--fs-4xl);           /* 36px */
    font-weight: var(--fw-semi);
    line-height: var(--lh-4xl);         /* 40px */
    letter-spacing: 0;                  /* 0 per Figma Text 4xl/Semibold */
    color: var(--heading-color);
    flex-shrink: 0;
    width: 100%;
    font-variation-settings: "wdth" 100;
  }

  /* Mobile heading · node 2390:14403 / 2390:14415 */
  .sh__heading--mobile {
    font-family: var(--font);
    font-size: var(--fs-2xl);           /* 24px */
    font-weight: var(--fw-semi);
    line-height: var(--lh-2xl);         /* 32px */
    letter-spacing: var(--ls);          /* -0.2px per Figma Text 2xl/Semibold */
    color: var(--heading-color);
    flex-shrink: 0;
    width: 100%;
    font-variation-settings: "wdth" 100;
  }

  /* ── Description text ──────────────────────────────────────── */

  /* Desktop description · node 2390:14398 / 2390:14410 */
  .sh__desc--desktop {
    font-family: var(--font);
    font-size: var(--fs-md);            /* 16px */
    font-weight: var(--fw-reg);
    line-height: var(--lh-md);          /* 24px */
    letter-spacing: var(--ls);
    color: var(--heading-color);
    flex-shrink: 0;
    width: 100%;
    font-variation-settings: "wdth" 100;
  }

  /* Mobile description · node 2390:14404 / 2390:14416 */
  .sh__desc--mobile {
    font-family: var(--font);
    font-size: var(--fs-sm);            /* 14px */
    font-weight: var(--fw-reg);
    line-height: var(--lh-sm);          /* 20px */
    /* letter-spacing not set on Mobile description in Figma */
    color: var(--heading-color);
    flex-shrink: 0;
    width: 100%;
    font-variation-settings: "wdth" 100;
  }

  /* ── Responsive: show/hide variants ───────────────────────────
   * By default show Desktop variants, hide Mobile variants.
   * At < 768px swap visibility.
   * Use .sh--responsive wrapper for auto-switching,
   * or use .sh--desktop-* / .sh--mobile-* directly for fixed layouts.
   */
  .sh--mobile-left,
  .sh--mobile-center {
    display: none;
  }

  @media (max-width: 767px) {
    .sh--desktop-left,
    .sh--desktop-center {
      display: none;
    }
    .sh--mobile-left,
    .sh--mobile-center {
      display: flex;
      width: 100%;          /* fluid on mobile */
    }
  }
</style>


<!-- ══════════════════════════════════════════════════════════
     VARIANT 1 — Desktop / Left
     node 2390:14393
     ══════════════════════════════════════════════════════════ -->
<div
  class="sh sh--desktop-left"
  data-node-id="2390:14393"
  data-name="View=Desktop, Alignment=Left"
>
  <!-- BageSfera Desktop · node 4632:7857 -->
  <div class="sh-badge sh-badge--desktop" data-node-id="4632:7857">
    <p class="sh-badge__text" data-node-id="4546:48592">Название раздела</p>
  </div>

  <!-- Title block -->
  <div class="sh__title-block sh__title-block--desktop" data-node-id="2390:14396">
    <h2 class="sh__heading--desktop" data-node-id="2390:14397">
      Основной заголовок секции
    </h2>
    <p class="sh__desc--desktop" data-node-id="2390:14398">
      Описание секции — дополнительный контекст, который помогает пользователю понять суть раздела. Один или два коротких предложения.
    </p>
  </div>
</div>


<!-- ══════════════════════════════════════════════════════════
     VARIANT 2 — Desktop / Center
     node 2390:14405
     ══════════════════════════════════════════════════════════ -->
<div
  class="sh sh--desktop-center"
  data-node-id="2390:14405"
  data-name="View=Desktop, Alignment=Center"
>
  <!-- BageSfera Desktop · node 4632:7857 -->
  <div class="sh-badge sh-badge--desktop" data-node-id="4632:7857">
    <p class="sh-badge__text" data-node-id="4546:48592">Название раздела</p>
  </div>

  <!-- Title block -->
  <div class="sh__title-block sh__title-block--desktop" data-node-id="2390:14408">
    <h2 class="sh__heading--desktop" data-node-id="2390:14409">
      Основной заголовок секции
    </h2>
    <p class="sh__desc--desktop" data-node-id="2390:14410">
      Описание секции — дополнительный контекст, который помогает пользователю понять суть раздела.
    </p>
  </div>
</div>


<!-- ══════════════════════════════════════════════════════════
     VARIANT 3 — Mobile / Left
     node 2390:14399
     ══════════════════════════════════════════════════════════ -->
<div
  class="sh sh--mobile-left"
  data-node-id="2390:14399"
  data-name="View=Mobile, Alignment=Left"
>
  <!-- BageSfera Mobile · node 4633:10386 -->
  <div class="sh-badge sh-badge--mobile" data-node-id="4633:10386">
    <p class="sh-badge__text" data-node-id="4633:10387">Название раздела</p>
  </div>

  <!-- Title block -->
  <div class="sh__title-block sh__title-block--mobile" data-node-id="2390:14402">
    <h2 class="sh__heading--mobile" data-node-id="2390:14403">
      Основной заголовок секции
    </h2>
    <p class="sh__desc--mobile" data-node-id="2390:14404">
      Описание секции — дополнительный контекст, который помогает пользователю понять суть раздела.
    </p>
  </div>
</div>


<!-- ══════════════════════════════════════════════════════════
     VARIANT 4 — Mobile / Center
     node 2390:14411
     ══════════════════════════════════════════════════════════ -->
<div
  class="sh sh--mobile-center"
  data-node-id="2390:14411"
  data-name="View=Mobile, Alignment=Center"
>
  <!-- BageSfera Mobile · node 4633:10386 -->
  <div class="sh-badge sh-badge--mobile" data-node-id="4633:10386">
    <p class="sh-badge__text" data-node-id="4633:10387">Название раздела</p>
  </div>

  <!-- Title block -->
  <div class="sh__title-block sh__title-block--mobile" data-node-id="2390:14414">
    <h2 class="sh__heading--mobile" data-node-id="2390:14415">
      Основной заголовок секции
    </h2>
    <p class="sh__desc--mobile" data-node-id="2390:14416">
      Описание секции — дополнительный контекст, который помогает пользователю понять суть раздела.
    </p>
  </div>
</div>
```

---

## Typography differences — Desktop vs Mobile

| Элемент | Desktop | Mobile | Δ |
|---------|---------|--------|---|
| Бейдж `font-size` | `14px` (sm) | `12px` (xs) | −2px |
| Бейдж `line-height` | `20px` | `16px` | −4px |
| Бейдж `padding-x` | `16px` | `12px` | −4px |
| Заголовок `font-size` | `36px` (4xl) | `24px` (2xl) | −12px |
| Заголовок `line-height` | `40px` | `32px` | −8px |
| Заголовок `letter-spacing` | **`0`** | `-0.2px` | ← разные! |
| Описание `font-size` | `16px` (md) | `14px` (sm) | −2px |
| Описание `line-height` | `24px` | `20px` | −4px |
| Gap (wrapper + title block) | `16px` | `12px` | −4px |

---

## Usage examples

### Без бейджа, без описания

```html
<!-- Desktop / Center — только заголовок -->
<div class="sh sh--desktop-center">
  <div class="sh__title-block sh__title-block--desktop">
    <h2 class="sh__heading--desktop">Нас часто спрашивают</h2>
  </div>
</div>
```

### Только заголовок + бейдж (без описания)

```html
<div class="sh sh--desktop-left">
  <div class="sh-badge sh-badge--desktop">
    <p class="sh-badge__text">Возможности</p>
  </div>
  <div class="sh__title-block sh__title-block--desktop">
    <h2 class="sh__heading--desktop">Всё для управления командой</h2>
  </div>
</div>
```

### Полный вариант — все три элемента

```html
<div class="sh sh--desktop-left">
  <div class="sh-badge sh-badge--desktop">
    <p class="sh-badge__text">Тарифы</p>
  </div>
  <div class="sh__title-block sh__title-block--desktop">
    <h2 class="sh__heading--desktop">Выберите подходящий план</h2>
    <p class="sh__desc--desktop">
      Гибкие тарифы для команд любого размера. Оплата только за сотрудников.
    </p>
  </div>
</div>
```

---

## Accessibility

- Заголовок секции — семантический `<h2>` (уровень в иерархии определяется контекстом страницы).
- Бейдж — декоративный элемент, не несёт интерактивности; при необходимости может быть скрыт через `aria-hidden="true"`.
- Цветовой контраст бейджа (`#7d4ccf` на `rgba(125,76,207,0.12)`) — проверяйте по WCAG AA для текста < 18px.

---

## Changelog

| Версия | Дата | Описание |
|--------|------|----------|
| 1.0.0 | 2026-06-05 | Первичная реализация: 4 варианта (Desktop Left/Center + Mobile Left/Center) |
