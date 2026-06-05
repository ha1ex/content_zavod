# Secondary CTA

Компонент вторичного призыва к действию (CTA 2 Secondary). Карточка с закруглёнными углами, фоном `#efe9f9`, декоративным blur-эллипсом, текстовым блоком и скриншотом интерфейса. Три адаптивных состояния: Desktop — горизонтальная раскладка внутри карточки 1216×364px; Tablet — вертикальный стек 720px; Mobile — вертикальный стек 328px с центрованной кнопкой.

---

## Anatomy

### Desktop (`≥ 1280px`) · node `2716-41358`

```
┌──────────────────────────────────── 1216px ────────────────────────────────────┐
│  bg: #efe9f9  h: 364px  border-radius: 16px  overflow: hidden  p: 48px        │
│                                                                                │
│  [blur ellipse PNG — abs left 559px top 0.1px  657×578px  scaleY(-1) rot 180] │
│                                                                                │
│  ┌── left col 501px ──────────────────────────────┐  ┌── image abs ─────────┐ │
│  │  gap: 24px                                     │  │  left 625px  top 0   │ │
│  │                                                │  │  519×364px           │ │
│  │  Переезд из Zendesk —           (36px SemiBold)│  │  img: h 91.21%       │ │
│  │  быстро и без потерь                           │  │  left −16.25%        │ │
│  │                                                │  │  top 4.43%           │ │
│  │  Перенесите заявки…             (16px Regular) │  │  w 132.49%           │ │
│  │                                                │  └──────────────────────┘ │
│  │  [ Перенести все данные ]       (btn primary)  │                            │
│  └────────────────────────────────────────────────┘                            │
└────────────────────────────────────────────────────────────────────────────────┘
gap between left col and image container: 73px
```

### Tablet (`768px – 1279px`) · node `2716-41491`

```
┌──────────────── 720px ─────────────────┐
│  bg: #efe9f9  border-radius: 16px      │
│  pt: 48px  px: 48px  pb: 0            │
│  overflow: hidden                      │
│                                        │
│  [blur ellipse — abs left −1px top 288px  721×634px] │
│                                        │
│  Переезд из Zendesk —  (24px SemiBold) │
│  быстро и без потерь                   │
│                                        │
│  Перенесите заявки…    (14px Regular)  │
│                                        │
│  [ Перенести все данные ] (btn center) │
│                                        │
│  ┌── image block (aspect 519/212) ───┐ │
│  │  pb: 48px                         │ │
│  │  h 156.6%  left −16.25%           │ │
│  │  top −28.3%  w 132.49%            │ │
│  └───────────────────────────────────┘ │
└────────────────────────────────────────┘
```

### Mobile (`< 768px`) · node `2716-41460`

```
┌─────── 328px ────────┐
│  bg: #efe9f9          │
│  border-radius: 12px  │
│  pt: 24px  px: 0      │
│  overflow: hidden     │
│  gap: 32px            │
│                       │
│  [blur ellipse —      │
│   abs 50% top 167px   │
│   527×527px rot-135]  │
│                       │
│  px: 24px             │
│  Переезд из Zendesk — │  (20px SemiBold)
│  быстро и без потерь  │
│                       │
│  Перенесите заявки…   │  (14px Regular)
│                       │
│  [ Перенести все      │
│    данные ]           │  (btn px 16 py 10)
│                       │
│  ┌── image ─────────┐ │
│  │  aspect 224/91    │ │
│  │  px 16  pb 24     │ │
│  └───────────────────┘ │
└───────────────────────┘
```

---

## Figma

| Версия  | Node ID      | Ссылка |
|---------|--------------|--------|
| Desktop | `2716-41358` | [Открыть в Figma](https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=2716-41358) |
| Tablet  | `2716-41491` | [Открыть в Figma](https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=2716-41491) |
| Mobile  | `2716-41460` | [Открыть в Figma](https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=2716-41460) |

---

## Assets

| Ключ | URL (Figma MCP) | Использование |
|------|-----------------|---------------|
| `imgImage1406-desktop` | `https://www.figma.com/api/mcp/asset/570ae553-e996-4f6a-b078-c57c46fdcf93` | Скриншот интерфейса, Desktop |
| `imgEllipse26-desktop` | `https://www.figma.com/api/mcp/asset/7ff3f4a2-fca5-49db-8d93-1a6ae3bbab21` | Декор. blur-эллипс, Desktop |
| `imgImage1406-tablet`  | `https://www.figma.com/api/mcp/asset/45b7a82a-09f0-4f95-97a0-e4b39bacf2da` | Скриншот интерфейса, Tablet |
| `imgEllipse26-tablet`  | `https://www.figma.com/api/mcp/asset/bb7cb731-aba0-4bf8-bc25-dd586c6027a4` | Декор. blur-эллипс, Tablet |
| `imgImage1440-mobile`  | `https://www.figma.com/api/mcp/asset/f684a702-572b-4fb5-96fd-aa200ba9befa` | Скриншот интерфейса, Mobile |
| `imgEllipse26-mobile`  | `https://www.figma.com/api/mcp/asset/045927db-ad9f-48ba-9a2f-e2fc06cdf3f0` | Декор. blur-эллипс, Mobile |

> ⚠️ Ссылки на ассеты действуют **7 дней** с даты генерации. После истечения замените на стабильные CDN-пути проекта.

---

## Tokens

| Token | Value | Использование |
|-------|-------|---------------|
| `--colors/kaiten/brand-12` | `#efe9f9` | Фон карточки |
| `--text/title-color` | `#2d2d2d` | Заголовок и тело текста |
| `--button/primary/background` | `#7d4ccf` | Фон кнопки |
| `--button/primary/text` | `#ffffff` | Текст кнопки |
| `--border-radius/rounded-2xl` | `16px` | Скругление карточки (Desktop/Tablet) |
| `--border-radius/rounded-xl` | `12px` | Скругление карточки (Mobile) |
| `--border-radius/rounded-lg` | `8px` | Скругление кнопки |
| `--spacing/3` | `12px` | Gap текстового блока (Mobile) |
| `--spacing/4` | `16px` | Gap текст↔кнопка; px кнопки Mobile |
| `--spacing/5` | `20px` | px кнопки Desktop/Tablet |
| `--spacing/6` | `24px` | Gap Left container; px Mobile текст |
| `--spacing/8` | `32px` | Gap внутри Mobile |
| `--spacing/12` | `48px` | p Desktop; pt/px Tablet |
| `--size/4xl` | `36px` | Заголовок Desktop |
| `--size/2xl` | `24px` | Заголовок Tablet |
| `--size/xl` | `20px` | Заголовок Mobile |
| `--size/md` | `16px` | Текст кнопки |
| `--size/sm` | `14px` | Тело текста Tablet/Mobile |
| `--line-height/4xl` | `40px` | LH заголовка Desktop |
| `--line-height/2xl` | `32px` | LH заголовка Tablet |
| `--line-height/xl` | `28px` | LH заголовка Mobile |
| `--line-height/md` | `24px` | LH кнопки; текст Desktop |
| `--line-height/sm` | `20px` | LH тела текста Tablet/Mobile |
| `--family/family` | `'Roboto'` | Шрифт |

---

## HTML + CSS

```html
<!-- ============================================================
     SECONDARY CTA COMPONENT  (CTA 2 Secondary)
     Desktop  ≥ 1280px : card 1216×364px, horizontal layout
     Tablet   768–1279px: card 720px, vertical stack
     Mobile   < 768px  : card 328px, vertical stack, centered btn
     Background card: #efe9f9 (brand-12)
     ============================================================ -->

<style>
  /* ── Design Tokens ─────────────────────────────────────────── */
  :root {
    --scta-bg:          #efe9f9;
    --text-title:       #2d2d2d;
    --btn-primary-bg:   #7d4ccf;
    --btn-primary-text: #ffffff;
    --radius-2xl:       16px;
    --radius-xl:        12px;
    --radius-lg:        8px;
    --ls:               -0.2px;
    --font:             'Roboto', sans-serif;
    --fw-reg:           400;
    --fw-med:           500;
    --fw-semi:          600;

    /* spacing */
    --sp-0:   0px;
    --sp-1:   4px;
    --sp-3:   12px;
    --sp-4:   16px;
    --sp-5:   20px;
    --sp-6:   24px;
    --sp-8:   32px;
    --sp-10:  10px;
    --sp-12:  48px;

    /* type scale */
    --fs-sm:  14px;  --lh-sm:  20px;
    --fs-md:  16px;  --lh-md:  24px;
    --fs-xl:  20px;  --lh-xl:  28px;
    --fs-2xl: 24px;  --lh-2xl: 32px;
    --fs-4xl: 36px;  --lh-4xl: 40px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ══ DESKTOP ══════════════════════════════════════════════════ */
  .scta--desktop {
    height: 364px;
    width: 1216px;
    position: relative;
    /* shown by default; hidden at smaller viewports */
    display: block;
  }

  /* Card container */
  .scta__card-desktop {
    position: absolute;
    inset: 0;
    background: var(--scta-bg);
    border-radius: var(--radius-2xl);
    overflow: hidden;
    display: flex;
    gap: 73px;
    align-items: center;
    padding: var(--sp-12);
  }

  /* Blur ellipse (Desktop) — PNG-based, absolute */
  .scta__ellipse-desktop {
    position: absolute;
    left: 559px;
    top: 0.1px;
    width: 657px;
    height: 578px;
    transform: scaleY(-1) rotate(180deg);
    pointer-events: none;
    z-index: 0;
  }
  .scta__ellipse-desktop img {
    position: absolute;
    /* inset: -43.25% -38.05% from Figma */
    top:    -43.25%;
    left:   -38.05%;
    bottom: -43.25%;
    right:  -38.05%;
    max-width: none;
    display: block;
  }

  /* Left text column */
  .scta__left {
    display: flex;
    flex-direction: column;
    gap: var(--sp-6);
    align-items: flex-start;
    width: 501px;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .scta__text-desktop {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    color: var(--text-title);
    word-break: break-word;
  }

  .scta__heading--4xl {
    font-family: var(--font);
    font-size: var(--fs-4xl);
    font-weight: var(--fw-semi);
    line-height: var(--lh-4xl);
    color: var(--text-title);
    /* letter-spacing: 0 per Figma Text 4xl/Semibold */
    min-width: 100%;
    font-variation-settings: "wdth" 100;
  }

  .scta__heading--2xl {
    font-family: var(--font);
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semi);
    line-height: var(--lh-2xl);
    letter-spacing: var(--ls);
    color: var(--text-title);
    width: 100%;
    font-variation-settings: "wdth" 100;
  }

  .scta__heading--xl {
    font-family: var(--font);
    font-size: var(--fs-xl);
    font-weight: var(--fw-semi);
    line-height: var(--lh-xl);
    letter-spacing: var(--ls);
    color: var(--text-title);
    flex: 1 0 0;
    min-width: 0;
    font-variation-settings: "wdth" 100;
  }

  .scta__desc--md {
    font-family: var(--font);
    font-size: var(--fs-md);
    font-weight: var(--fw-reg);
    line-height: var(--lh-md);
    letter-spacing: var(--ls);
    color: var(--text-title);
    width: 476px;
    white-space: pre-wrap;
    font-variation-settings: "wdth" 100;
  }

  .scta__desc--sm {
    font-family: var(--font);
    font-size: var(--fs-sm);
    font-weight: var(--fw-reg);
    line-height: var(--lh-sm);
    letter-spacing: var(--ls);
    color: var(--text-title);
    width: 100%;
    font-variation-settings: "wdth" 100;
  }

  /* CTA button — Desktop / Tablet */
  .scta__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--btn-primary-bg);
    color: var(--btn-primary-text);
    border: none;
    border-radius: var(--radius-lg);
    padding: var(--sp-3) var(--sp-5);
    font-family: var(--font);
    font-size: var(--fs-md);
    font-weight: var(--fw-med);
    line-height: var(--lh-md);
    letter-spacing: var(--ls);
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
    flex-shrink: 0;
    font-variation-settings: "wdth" 100;
  }

  /* CTA button — Mobile (px 16 py 10) */
  .scta__btn--mobile {
    padding: var(--sp-10) var(--sp-4);
  }

  .scta__btn-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--sp-1);
  }

  /* Image container — Desktop (absolute) */
  .scta__img-desktop {
    position: absolute;
    left: 625px;
    top: 0;
    width: 519px;
    height: 364px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 1;
  }

  .scta__img-desktop-inner {
    flex: 1 0 0;
    min-height: 0;
    position: relative;
    width: 100%;
  }

  .scta__img-desktop-inner img {
    position: absolute;
    height: 91.21%;
    left: -16.25%;
    max-width: none;
    top: 4.43%;
    width: 132.49%;
    display: block;
    pointer-events: none;
  }

  /* ══ TABLET ═══════════════════════════════════════════════════ */
  .scta--tablet {
    background: var(--scta-bg);
    border-radius: var(--radius-2xl);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: var(--sp-12);
    align-items: flex-start;
    padding-top: var(--sp-12);
    padding-left: var(--sp-12);
    padding-right: var(--sp-12);
    padding-bottom: 0;
    width: 720px;
    position: relative;
  }

  /* Blur ellipse (Tablet) */
  .scta__ellipse-tablet {
    position: absolute;
    left: -1px;
    top: 288px;
    width: 721px;
    height: 634px;
    transform: scaleY(-1) rotate(180deg);
    pointer-events: none;
    z-index: 0;
  }
  .scta__ellipse-tablet img {
    position: absolute;
    top:    -39.43%;
    left:   -34.67%;
    bottom: -39.43%;
    right:  -34.67%;
    max-width: none;
    display: block;
  }

  .scta__left-tablet {
    display: flex;
    flex-direction: column;
    gap: var(--sp-6);
    align-items: flex-start;
    width: 100%;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
  }

  .scta__text-tablet {
    display: flex;
    flex-direction: column;
    gap: var(--sp-4);
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    color: var(--text-title);
    word-break: break-word;
    letter-spacing: var(--ls);
  }

  /* Button wrapper — Tablet (centered) */
  .scta__btn-wrap-tablet {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    flex-shrink: 0;
  }

  /* Image — Tablet */
  .scta__img-tablet {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: var(--sp-12);
    width: 100%;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .scta__img-tablet-crop {
    /* aspect-ratio: 519/212 */
    aspect-ratio: 519 / 212;
    width: 100%;
    position: relative;
    flex-shrink: 0;
    overflow: hidden;
  }

  .scta__img-tablet-crop img {
    position: absolute;
    height: 156.6%;
    left: -16.25%;
    max-width: none;
    top: -28.3%;
    width: 132.49%;
    pointer-events: none;
    display: block;
  }

  /* ══ MOBILE ═══════════════════════════════════════════════════ */
  .scta--mobile {
    background: var(--scta-bg);
    border-radius: var(--radius-xl);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: var(--sp-8);
    align-items: flex-start;
    padding-top: var(--sp-6);
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
    width: 328px;
    position: relative;
  }

  /* Blur ellipse (Mobile) */
  .scta__ellipse-mobile {
    position: absolute;
    width: 527.284px;
    height: 527.284px;
    left: 50%;
    top: 167px;
    transform: translateX(-50%) rotate(-135deg);
    pointer-events: none;
    z-index: 0;
  }
  .scta__ellipse-mobile img {
    display: block;
    width: 372.846px;
    height: 372.846px;
    /* inset: -53.64% from Figma */
    position: absolute;
    top:    -53.64%;
    left:   -53.64%;
    bottom: -53.64%;
    right:  -53.64%;
    max-width: none;
  }

  .scta__content-mobile {
    display: flex;
    flex-direction: column;
    gap: var(--sp-8);
    align-items: flex-start;
    width: 100%;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
  }

  .scta__left-mobile {
    display: flex;
    flex-direction: column;
    gap: var(--sp-6);
    align-items: center;
    width: 100%;
    flex-shrink: 0;
  }

  .scta__text-mobile {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
    align-items: center;
    justify-content: center;
    padding: 0 var(--sp-6);
    width: 100%;
    flex-shrink: 0;
  }

  .scta__heading-row-mobile {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-shrink: 0;
  }

  /* Button wrapper — Mobile */
  .scta__btn-wrap-mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 var(--sp-6);
    width: 100%;
    flex-shrink: 0;
  }

  /* Image — Mobile */
  .scta__img-mobile {
    display: flex;
    flex-direction: column;
    gap: 0;
    align-items: flex-start;
    border-radius: var(--radius-2xl);
    width: 100%;
    flex-shrink: 0;
  }

  .scta__img-mobile-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: var(--sp-6);
    padding-left: var(--sp-4);
    padding-right: var(--sp-4);
    width: 328px;
    flex-shrink: 0;
  }

  .scta__img-mobile-crop {
    /* aspect-ratio: 224/91 */
    aspect-ratio: 224 / 91;
    width: 100%;
    position: relative;
    flex-shrink: 0;
    overflow: hidden;
  }

  .scta__img-mobile-crop img {
    position: absolute;
    height: 157.05%;
    left: -16.07%;
    max-width: none;
    top: -28.33%;
    width: 132.14%;
    pointer-events: none;
    display: block;
  }

  /* ── Breakpoint visibility ─────────────────────────────────── */
  .scta--desktop { display: block; }
  .scta--tablet  { display: none; }
  .scta--mobile  { display: none; }

  @media (max-width: 1279px) and (min-width: 768px) {
    .scta--desktop { display: none; }
    .scta--tablet  { display: flex; }
    .scta--mobile  { display: none; }
  }

  @media (max-width: 767px) {
    .scta--desktop { display: none; }
    .scta--tablet  { display: none; }
    .scta--mobile  { display: flex; }
  }
</style>


<!-- ══════════════════════════════════════════════════════════
     DESKTOP  ≥ 1280px
     ══════════════════════════════════════════════════════════ -->
<section
  class="scta--desktop"
  data-node-id="2716:41358"
  aria-label="Переезд из Zendesk"
>
  <!-- Card -->
  <div class="scta__card-desktop" data-node-id="2716:41343">

    <!-- Decorative blur ellipse -->
    <div class="scta__ellipse-desktop" data-node-id="2716:41344" aria-hidden="true">
      <img
        src="https://www.figma.com/api/mcp/asset/7ff3f4a2-fca5-49db-8d93-1a6ae3bbab21"
        alt=""
      />
    </div>

    <!-- Left: text + button -->
    <div class="scta__left" data-node-id="2716:41345">
      <div class="scta__text-desktop" data-node-id="2716:41346">
        <h2
          class="scta__heading--4xl"
          data-node-id="2716:41347"
        >
          Переезд из Zendesk — быстро и без потерь
        </h2>
        <p
          class="scta__desc--md"
          data-node-id="2716:41348"
        >
          Перенесите заявки, историю обращений и базу знаний<br>
          в Кайтен. Данные импортируются с сохранением структуры через CSV/XLS. Для текстов и регламентов поддержки<br>
          есть раздел «Документы»
        </p>
      </div>

      <div data-node-id="2716:41349">
        <a
          class="scta__btn"
          href="https://faq-ru.kaiten.site/b577083e-3d48-4760-80af-cfd687955c38"
          target="_blank"
          rel="noopener"
          data-node-id="2716:41350"
        >
          <span class="scta__btn-inner" data-node-id="I2716:41350;7628:5862">
            Перенести все данные
          </span>
        </a>
      </div>
    </div>

  </div><!-- /scta__card-desktop -->

  <!-- Image (absolute, overlaps card) -->
  <div class="scta__img-desktop" data-node-id="2716:41406">
    <div class="scta__img-desktop-inner" data-node-id="4415:19422">
      <div style="flex:1 0 0; min-height:0; position:relative; width:100%;" data-node-id="2716:41351">
        <img
          src="https://www.figma.com/api/mcp/asset/570ae553-e996-4f6a-b078-c57c46fdcf93"
          alt="Перенос задач из Zendesk в Кайтен"
        />
      </div>
    </div>
  </div>

</section>


<!-- ══════════════════════════════════════════════════════════
     TABLET  768px – 1279px
     ══════════════════════════════════════════════════════════ -->
<section
  class="scta--tablet"
  data-node-id="2716:41491"
  aria-label="Переезд из Zendesk"
>
  <!-- Decorative blur ellipse -->
  <div class="scta__ellipse-tablet" data-node-id="2716:41475" aria-hidden="true">
    <img
      src="https://www.figma.com/api/mcp/asset/bb7cb731-aba0-4bf8-bc25-dd586c6027a4"
      alt=""
    />
  </div>

  <!-- Left: text + button -->
  <div class="scta__left-tablet" data-node-id="2716:41476">
    <div class="scta__text-tablet" data-node-id="2716:41477">
      <h2
        class="scta__heading--2xl"
        data-node-id="2716:41478"
      >
        Переезд из Zendesk — быстро и без потерь
      </h2>
      <p
        class="scta__desc--sm"
        data-node-id="2716:41479"
      >
        Перенесите заявки, историю обращений и базу знаний в Кайтен.
        Данные импортируются с сохранением структуры через CSV/XLS.
        Для текстов и регламентов поддержки есть раздел «Документы»
      </p>
    </div>

    <!-- Button — centered on tablet -->
    <div class="scta__btn-wrap-tablet" data-node-id="2716:41490">
      <div data-node-id="2716:41480">
        <a
          class="scta__btn"
          href="https://faq-ru.kaiten.site/b577083e-3d48-4760-80af-cfd687955c38"
          target="_blank"
          rel="noopener"
          data-node-id="2716:41481"
        >
          <span class="scta__btn-inner" data-node-id="I2716:41481;7628:5862">
            Перенести все данные
          </span>
        </a>
      </div>
    </div>
  </div>

  <!-- Image block -->
  <div class="scta__img-tablet" data-node-id="2716:41492">
    <div class="scta__img-tablet-crop" data-node-id="2716:41482">
      <img
        src="https://www.figma.com/api/mcp/asset/45b7a82a-09f0-4f95-97a0-e4b39bacf2da"
        alt="Перенос задач из Zendesk в Кайтен"
      />
    </div>
  </div>

</section>


<!-- ══════════════════════════════════════════════════════════
     MOBILE  < 768px
     ══════════════════════════════════════════════════════════ -->
<section
  class="scta--mobile"
  data-node-id="2716:41460"
  aria-label="Переезд из Zendesk"
>
  <!-- Decorative blur ellipse -->
  <div class="scta__ellipse-mobile" data-node-id="2716:41442" aria-hidden="true">
    <img
      src="https://www.figma.com/api/mcp/asset/045927db-ad9f-48ba-9a2f-e2fc06cdf3f0"
      alt=""
    />
  </div>

  <!-- Content wrapper -->
  <div class="scta__content-mobile" data-node-id="2716:41493">

    <!-- Text + button -->
    <div class="scta__left-mobile" data-node-id="2716:41443">

      <div class="scta__text-mobile" data-node-id="2716:41444">
        <div class="scta__heading-row-mobile" data-node-id="2716:41445">
          <h2
            class="scta__heading--xl"
            data-node-id="2716:41446"
          >
            Переезд из Zendesk — быстро и без потерь
          </h2>
        </div>
        <p
          class="scta__desc--sm"
          data-node-id="2716:41447"
        >
          Перенесите заявки, историю обращений и базу знаний в Кайтен.
          Данные импортируются с сохранением структуры через CSV/XLS.
          Для текстов и регламентов поддержки есть раздел «Документы»
        </p>
      </div>

      <div class="scta__btn-wrap-mobile" data-node-id="2716:41448">
        <a
          class="scta__btn scta__btn--mobile"
          href="https://faq-ru.kaiten.site/b577083e-3d48-4760-80af-cfd687955c38"
          target="_blank"
          rel="noopener"
          data-node-id="2716:41449"
        >
          <span class="scta__btn-inner" data-node-id="I2716:41449;7628:5907">
            Перенести все данные
          </span>
        </a>
      </div>

    </div>

    <!-- Image block -->
    <div class="scta__img-mobile" data-node-id="2716:41450">
      <div class="scta__img-mobile-inner" data-node-id="2716:41453">
        <div class="scta__img-mobile-crop" data-node-id="2716:41454">
          <img
            src="https://www.figma.com/api/mcp/asset/f684a702-572b-4fb5-96fd-aa200ba9befa"
            alt="Перенос задач из Zendesk в Кайтен"
          />
        </div>
      </div>
    </div>

  </div><!-- /scta__content-mobile -->
</section>
```

---

## Image positioning details

| Breakpoint | Свойство | Значение из Figma |
|------------|----------|-------------------|
| Desktop | `img height` | `91.21%` |
| Desktop | `img left` | `-16.25%` |
| Desktop | `img top` | `4.43%` |
| Desktop | `img width` | `132.49%` |
| Tablet | `img height` | `156.6%` |
| Tablet | `img left` | `-16.25%` |
| Tablet | `img top` | `-28.3%` |
| Tablet | `img width` | `132.49%` |
| Mobile | `img height` | `157.05%` |
| Mobile | `img left` | `-16.07%` |
| Mobile | `img top` | `-28.33%` |
| Mobile | `img width` | `132.14%` |

---

## States

| Состояние | Описание |
|-----------|----------|
| **Default** | Фон `#efe9f9`, заголовок и текст `#2d2d2d`, кнопка `#7d4ccf` |
| **Btn hover** | Рекомендуется `background: #6a3db8` (−10% яркости) |
| **Btn focus** | `outline: 2px solid #7d4ccf; outline-offset: 2px` |
| **Desktop** | `≥ 1280px` — горизонтальная карточка; изображение абсолютно поверх правой части |
| **Tablet** | `768–1279px` — вертикальный стек; кнопка по центру; изображение обрезается `aspect-ratio: 519/212` |
| **Mobile** | `< 768px` — карточка 328px `border-radius: 12px`; кнопка `px 16 py 10`; изображение `aspect-ratio: 224/91` |

---

## Breakpoints

| Имя | Диапазон | Узел Figma |
|-----|----------|------------|
| Desktop | `≥ 1280px` | `2716-41358` |
| Tablet | `768px – 1279px` | `2716-41491` |
| Mobile | `< 768px` | `2716-41460` |

---

## Accessibility

- Каждая секция — `<section>` с `aria-label`.
- Заголовок — семантический `<h2>`.
- Декоративные blur-эллипсы — `aria-hidden="true"`.
- Кнопки-ссылки открывают новую вкладку: `rel="noopener"`.
- Скриншоты имеют осмысленный `alt`.

---

## Changelog

| Версия | Дата | Описание |
|--------|------|----------|
| 1.0.0 | 2026-06-05 | Первичная реализация Desktop + Tablet + Mobile |
