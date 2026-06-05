# Final CTA

Компонент финального призыва к действию (Call-to-Action). Три адаптивных состояния: Desktop — горизонтальная раскладка текст + скриншот, Tablet — вертикальный стек с крупным изображением снизу, Mobile — полная вертикаль с кнопкой на всю ширину.

---

## Anatomy

### Desktop (`≥ 1280px`) · node `2861-20576`

```
┌──────────────────────────────────────────────────────── 1920px ──────────────────────────────────────────────────────┐
│  bg: #efe9f9  h: 449px  overflow: hidden                                                                              │
│                                                                                                                       │
│  ┌──── blur ellipse (gradient: #e298ff → #6fe5ff, blur 200px) ─────────────────┐                                     │
│  │  positioned: left 880px, top 96px, 786×744px                                │                                     │
│  └─────────────────────────────────────────────────────────────────────────────┘                                     │
│                                                                                                                       │
│  ┌──── content row (gap 32px) ─────────────────────────────────────────────────────────┐                             │
│  │  ┌── left col 592px ──────────────────────────────────────────────┐                 │                             │
│  │  │  py: 96px                                                       │                 │                             │
│  │  │  Попробуйте Кайтен бесплатно          (36px SemiBold)           │                 │                             │
│  │  │  • Российский сервис без риска…       (16px Regular, list)      │                 │                             │
│  │  │  • Оплата только за сотрудников…                                │                 │                             │
│  │  │  • Простая настройка досок…                                     │                 │                             │
│  │  │  [ Попробовать бесплатно ]            (btn primary)             │                 │                             │
│  │  └─────────────────────────────────────────────────────────────────┘                 │                             │
│  │  ┌── right col 591px, h 449px, pt 48px, overflow hidden ──────────┐                 │                             │
│  │  │  [screenshot image 592×401px]                                   │                 │                             │
│  │  │  [shadow rectangle mix-blend-multiply]                          │                 │                             │
│  │  └─────────────────────────────────────────────────────────────────┘                 │                             │
│  └───────────────────────────────────────────────────────────────────────────────────────┘                             │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Tablet (`768px – 1279px`) · node `2716-41341`

```
┌──────────── 768px ────────────┐
│  bg: #efe9f9  h: 599px        │
│  p: 48px  overflow: hidden    │
│                               │
│  [blur ellipse, centered]     │
│                               │
│  Попробуйте Кайтен бесплатно  │  (24px SemiBold)
│  Фиксируйте решения…          │  (16px Regular)
│  [ Перенести все данные ]      │  (btn primary)
│                               │
│  [screenshot 471×358px        │
│   absolute left 148px top 288px] │
└───────────────────────────────┘
```

### Mobile (`< 768px`) · node `2716-41340`

```
┌─── 360px ───┐
│  bg: #efe9f9 │
│  px:16 py:48 │
│  h: 550px    │
│  overflow:   │
│   hidden     │
│              │
│  [ellipse]   │
│              │
│  Попробуйте  │  (24px SemiBold)
│  Кайтен      │
│  бесплатно   │
│              │
│  Фиксируйте… │  (14px Regular)
│              │
│  [Попробовать│
│   бесплатно] │  (btn full-width)
│              │
│  [screenshot │
│   full-width]│
│  [shadow rect│
│   mix-blend] │
└──────────────┘
```

---

## Figma

| Версия  | Node ID       | Ссылка                                                                                              |
|---------|---------------|------------------------------------------------------------------------------------------------------|
| Desktop | `2861-20576`  | [Открыть в Figma](https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=2861-20576) |
| Tablet  | `2716-41341`  | [Открыть в Figma](https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=2716-41341) |
| Mobile  | `2716-41340`  | [Открыть в Figma](https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=2716-41340) |

---

## Assets

| Ключ                   | URL (Figma MCP)                                                                         | Использование                    |
|------------------------|-----------------------------------------------------------------------------------------|----------------------------------|
| `imgImage1460-desktop` | `https://www.figma.com/api/mcp/asset/ab4cfac8-480e-4fcb-91d4-a6acef0d88d0`             | Скриншот интерфейса, Desktop     |
| `imgRectangle1-desktop`| `https://www.figma.com/api/mcp/asset/95ff9b54-6550-4caa-a36e-91e258c2fbf8`             | Тень под скриншотом, Desktop     |
| `imgImage1461-tablet`  | `https://www.figma.com/api/mcp/asset/0069129e-0bae-42fd-bafe-5f42b00f409a`             | Скриншот интерфейса, Tablet      |
| `imgEllipse26-tablet`  | `https://www.figma.com/api/mcp/asset/dad062cd-b480-4d61-8a57-aa463bddf46b`             | Декор. blur-эллипс, Tablet       |
| `imgImage1460-mobile`  | `https://www.figma.com/api/mcp/asset/9db04ea7-157e-4dde-9caa-c279f3da337f`             | Скриншот интерфейса, Mobile      |
| `imgRectangle1-mobile` | `https://www.figma.com/api/mcp/asset/96e7b294-691e-4e7f-b39f-c8494edff599`             | Тень под скриншотом, Mobile      |
| `imgEllipse26-mobile`  | `https://www.figma.com/api/mcp/asset/8a81a1a1-362d-4977-8140-569f5baa8fd3`             | Декор. blur-эллипс, Mobile       |

> ⚠️ Ссылки на ассеты действуют **7 дней** с даты генерации. После истечения замените на стабильные CDN-пути проекта.

---

## Tokens

| Token                                   | Value      | Использование                        |
|-----------------------------------------|------------|---------------------------------------|
| `--button/primary-outline/hover-background` | `#efe9f9` | Фон секции (Desktop)                |
| `--colors/kaiten/brand-12`              | `#efe9f9`  | Фон секции (Tablet / Mobile)         |
| `--text/title-color`                    | `#2d2d2d`  | Заголовок                            |
| `--text/text-color`                     | `#2d2d2d`  | Список / абзац                       |
| `--button/primary/background`           | `#7d4ccf`  | Фон кнопки CTA                       |
| `--button/primary/text`                 | `#ffffff`  | Текст кнопки CTA                     |
| `--border-radius/rounded-lg`            | `8px`      | Скругление кнопки                    |
| `--spacing/3`                           | `12px`     | py кнопки (Desktop/Tablet)           |
| `--spacing/4`                           | `16px`     | Gap заголовок↔список; px Mobile      |
| `--spacing/5`                           | `20px`     | px кнопки (Desktop/Tablet)           |
| `--spacing/6`                           | `24px`     | Gap секции Tablet                    |
| `--spacing/8`                           | `32px`     | Gap контентных колонок Desktop       |
| `--spacing/12`                          | `48px`     | pt изображения Desktop; p Tablet/Mobile |
| `--spacing/16`                          | `64px`     | pb Tablet                            |
| `--spacing/24`                          | `96px`     | py левой колонки Desktop             |
| `--size/5xl`                            | `36px`     | Заголовок Desktop                    |
| `--size/2xl` / `--size/4xl`             | `24px`     | Заголовок Tablet / Mobile            |
| `--size/md`                             | `16px`     | Основной текст                       |
| `--size/sm`                             | `14px`     | Текст Mobile                         |
| `--line-height/5xl`                     | `40px`     | LH заголовка Desktop                 |
| `--line-height/2xl` / `--line-height/4xl` | `32px`   | LH заголовка Tablet / Mobile         |
| `--line-height/md`                      | `24px`     | LH основного текста                  |
| `--family/family`                       | `'Roboto'` | Шрифт                                |

---

## HTML + CSS

```html
<!-- ============================================================
     FINAL CTA COMPONENT
     Desktop  ≥ 1280px : horizontal layout, h 449px
     Tablet   768–1279px: vertical stack, h 599px
     Mobile   < 768px  : full-width vertical, h 550px
     Background: #efe9f9 (brand-12)
     ============================================================ -->

<style>
  /* ── Design Tokens ─────────────────────────────────────────── */
  :root {
    --cta-bg:              #efe9f9;
    --text-title:          #2d2d2d;
    --text-body:           #2d2d2d;
    --btn-primary-bg:      #7d4ccf;
    --btn-primary-text:    #ffffff;
    --radius-lg:           8px;
    --ls:                  -0.2px;
    --font:                'Roboto', sans-serif;
    --fw-reg:              400;
    --fw-med:              500;
    --fw-semi:             600;

    /* spacing */
    --sp-3:  12px;
    --sp-4:  16px;
    --sp-5:  20px;
    --sp-6:  24px;
    --sp-8:  32px;
    --sp-12: 48px;
    --sp-16: 64px;
    --sp-24: 96px;

    /* type scale */
    --fs-sm:  14px;  --lh-sm:  20px;
    --fs-md:  16px;  --lh-md:  24px;
    --fs-2xl: 24px;  --lh-2xl: 32px;
    --fs-5xl: 36px;  --lh-5xl: 40px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Section wrapper ───────────────────────────────────────── */
  .cta {
    background-color: var(--cta-bg);
    width: 100%;
    overflow: hidden;
    position: relative;
    font-family: var(--font);
    color: var(--text-title);
    letter-spacing: var(--ls);
  }

  /* ── Decorative blur ellipse (Desktop) ─────────────────────── */
  .cta__blur-desktop {
    position: absolute;
    width:  786px;
    height: 744px;
    left:   880px;
    top:    95.96px;
    border-radius: 10000px;
    background: linear-gradient(-89.9999984369432deg, rgb(226, 152, 255) 0%, rgb(111, 229, 255) 100%);
    filter: blur(200px);
    transform: scaleY(-1) rotate(180deg);
    pointer-events: none;
    z-index: 0;
  }

  /* ── Decorative blur ellipse (Tablet) ──────────────────────── */
  .cta__blur-tablet {
    position: absolute;
    width:  769px;
    height: 598px;
    left:   50%;
    top:    296px;
    transform: translateX(-50%) scaleY(-1) rotate(180deg);
    pointer-events: none;
    z-index: 0;
  }
  .cta__blur-tablet img {
    display: block;
    width:  100%;
    height: 100%;
  }

  /* ── Decorative blur ellipse (Mobile) ──────────────────────── */
  .cta__blur-mobile {
    position: absolute;
    width:  573.293px;
    height: 573.293px;
    left:   50%;
    top:    263.26px;
    transform: translateX(-50%) rotate(-135deg);
    pointer-events: none;
    z-index: 0;
  }
  .cta__blur-mobile img {
    display: block;
    width:  405.38px;
    height: 405.38px;
    margin: auto;
  }

  /* ══ DESKTOP ══════════════════════════════════════════════════ */
  .cta--desktop {
    height: 449px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: var(--sp-8);
  }

  .cta__content-row {
    display: flex;
    gap: var(--sp-8);
    align-items: flex-start;
    height: 449px;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
  }

  /* left text column */
  .cta__text-col {
    display: flex;
    flex-direction: column;
    gap: var(--sp-8);
    align-items: flex-start;
    padding: var(--sp-24) 0;
    width: 592px;
    flex-shrink: 0;
  }

  .cta__section-title {
    display: flex;
    flex-direction: column;
    gap: var(--sp-4);
    align-items: flex-start;
    width: 552px;
    flex-shrink: 0;
  }

  .cta__heading--5xl {
    font-size: var(--fs-5xl);
    font-weight: var(--fw-semi);
    line-height: var(--lh-5xl);
    color: var(--text-title);
    width: 100%;
    font-variation-settings: "wdth" 100;
  }

  .cta__heading--2xl {
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semi);
    line-height: var(--lh-2xl);
    letter-spacing: var(--ls);
    color: var(--text-title);
    width: 100%;
    font-variation-settings: "wdth" 100;
  }

  .cta__list {
    font-size: var(--fs-md);
    font-weight: var(--fw-reg);
    line-height: var(--lh-md);
    color: var(--text-body);
    list-style: disc;
    padding-left: 24px;
    width: 100%;
    font-variation-settings: "wdth" 100;
  }
  .cta__list li { margin-bottom: 0; }

  .cta__desc {
    font-size: var(--fs-md);
    font-weight: var(--fw-reg);
    line-height: var(--lh-md);
    color: var(--text-body);
    width: 100%;
    font-variation-settings: "wdth" 100;
  }
  .cta__desc--sm {
    font-size: var(--fs-sm);
    line-height: var(--lh-sm);
  }

  /* CTA button */
  .cta__btn {
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
    font-variation-settings: "wdth" 100;
  }
  .cta__btn--full {
    width: 100%;
    justify-content: center;
    padding: 10px var(--sp-4);
  }
  .cta__btn-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--sp-1, 4px);
  }

  /* right image column */
  .cta__img-col {
    display: flex;
    flex-direction: column;
    height: 449px;
    align-items: flex-start;
    overflow: hidden;
    padding-top: var(--sp-12);
    width: 591px;
    flex-shrink: 0;
    position: relative;
  }

  .cta__screenshot-wrap {
    display: inline-grid;
    place-items: start;
    position: relative;
    flex-shrink: 0;
  }

  .cta__screenshot {
    width: 592px;
    height: 401px;
    position: relative;
    overflow: hidden;
  }
  .cta__screenshot img {
    position: absolute;
    top: -0.04%;
    left: 0.08%;
    width: 100%;
    height: 107.07%;
    max-width: none;
    pointer-events: none;
    display: block;
  }

  .cta__shadow {
    position: absolute;
    top: 375.04px;
    left: 0;
    width: 592px;
    height: 26px;
    mix-blend-mode: multiply;
  }
  .cta__shadow img {
    position: absolute;
    inset: 0;
    max-width: none;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  /* ══ TABLET ═══════════════════════════════════════════════════ */
  .cta--tablet {
    height: 599px;
    display: flex;
    flex-direction: column;
    gap: var(--sp-12);
    align-items: flex-start;
    padding: var(--sp-12);
    padding-bottom: var(--sp-16);
  }

  .cta__left-container {
    display: flex;
    flex-direction: column;
    gap: var(--sp-6);
    align-items: flex-start;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .cta__text-tablet {
    display: flex;
    flex-direction: column;
    gap: var(--sp-4);
    align-items: flex-start;
    justify-content: center;
    width: 100%;
  }

  .cta__img-tablet {
    position: absolute;
    height: 359.673px;
    left: 148px;
    top: 288px;
    width: 471px;
    z-index: 1;
  }
  .cta__img-tablet-inner {
    position: absolute;
    height: 358px;
    left: 0;
    top: -47px;
    width: 471px;
  }
  .cta__img-tablet-inner img {
    position: absolute;
    inset: 0;
    max-width: none;
    object-fit: cover;
    pointer-events: none;
    width: 100%;
    height: 100%;
  }

  /* ══ MOBILE ═══════════════════════════════════════════════════ */
  .cta--mobile {
    height: 550px;
    display: flex;
    flex-direction: column;
    gap: 36px;
    align-items: flex-start;
    padding: var(--sp-12) 16px;
  }

  .cta__top-mobile {
    display: flex;
    flex-direction: column;
    gap: var(--sp-6);
    align-items: flex-start;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .cta__title-block-mobile {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
    align-items: flex-start;
    width: 328px;
  }

  .cta__screenshot-mobile {
    display: inline-grid;
    place-items: start;
    position: relative;
    width: 100%;
    flex-shrink: 0;
    z-index: 1;
  }
  .cta__screenshot-mobile-img {
    aspect-ratio: 2424 / 1758;
    width: 99.92%;
    position: relative;
  }
  .cta__screenshot-mobile-img img {
    position: absolute;
    inset: 0;
    max-width: none;
    object-fit: cover;
    pointer-events: none;
    width: 100%;
    height: 100%;
  }
  .cta__shadow-mobile {
    position: absolute;
    top: 207.8px;
    left: 0;
    width: 100%;
    height: 14.405px;
    mix-blend-mode: multiply;
  }
  .cta__shadow-mobile img {
    position: absolute;
    inset: 0;
    max-width: none;
    object-fit: cover;
    pointer-events: none;
    width: 100%;
    height: 100%;
  }

  /* ── Visibility by breakpoint ──────────────────────────────── */
  .cta--desktop { display: flex; }
  .cta--tablet  { display: none; }
  .cta--mobile  { display: none; }

  @media (max-width: 1279px) and (min-width: 768px) {
    .cta--desktop { display: none; }
    .cta--tablet  { display: flex; }
    .cta--mobile  { display: none; }
  }

  @media (max-width: 767px) {
    .cta--desktop { display: none; }
    .cta--tablet  { display: none; }
    .cta--mobile  { display: flex; }
  }
</style>


<!-- ══════════════════════════════════════════════════════════
     DESKTOP  ≥ 1280px
     ══════════════════════════════════════════════════════════ -->
<section
  class="cta cta--desktop"
  data-node-id="2861:20576"
  aria-label="Призыв к действию"
>
  <!-- Decorative blur gradient (Desktop) -->
  <div class="cta__blur-desktop" data-node-id="2861:20556" aria-hidden="true"></div>

  <!-- Content row -->
  <div class="cta__content-row" data-node-id="2861:20557">

    <!-- Left: text + CTA button -->
    <div class="cta__text-col" data-node-id="2861:20558">
      <div class="cta__section-title" data-node-id="2861:20559">
        <h2
          class="cta__heading--5xl"
          data-node-id="I2861:20559;7622:10248"
        >
          Попробуйте Кайтен бесплатно
        </h2>
        <ul
          class="cta__list"
          data-node-id="I2861:20559;7622:10249"
        >
          <li>Российский сервис без риска блокировки</li>
          <li>Оплата только за сотрудников — клиенты бесплатно</li>
          <li>Простая настройка досок и процессов без программистов</li>
        </ul>
      </div>

      <div data-node-id="2861:20560">
        <a
          class="cta__btn"
          href="https://passport.kaiten.ru/"
          target="_blank"
          rel="noopener"
          data-node-id="2861:20561"
        >
          <span class="cta__btn-inner" data-node-id="I2861:20561;7628:5862">
            Попробовать бесплатно
          </span>
        </a>
      </div>
    </div>

    <!-- Right: screenshot -->
    <div class="cta__img-col" data-node-id="2861:20562">
      <div class="cta__screenshot-wrap" data-node-id="2861:20563">
        <div class="cta__screenshot" data-node-id="2861:20565">
          <img
            src="https://www.figma.com/api/mcp/asset/ab4cfac8-480e-4fcb-91d4-a6acef0d88d0"
            alt="Интерфейс Кайтен — Kanban-доска"
          />
        </div>
        <div class="cta__shadow" data-node-id="2861:20566" aria-hidden="true">
          <img
            src="https://www.figma.com/api/mcp/asset/95ff9b54-6550-4caa-a36e-91e258c2fbf8"
            alt=""
          />
        </div>
      </div>
    </div>

  </div>
</section>


<!-- ══════════════════════════════════════════════════════════
     TABLET  768px – 1279px
     ══════════════════════════════════════════════════════════ -->
<section
  class="cta cta--tablet"
  data-node-id="2716:41341"
  aria-label="Призыв к действию"
>
  <!-- Decorative blur ellipse (Tablet) -->
  <div class="cta__blur-tablet" data-node-id="2716:41326" aria-hidden="true">
    <img
      src="https://www.figma.com/api/mcp/asset/dad062cd-b480-4d61-8a57-aa463bddf46b"
      alt=""
    />
  </div>

  <!-- Text + button -->
  <div class="cta__left-container" data-node-id="2716:41327">
    <div class="cta__text-tablet" data-node-id="2716:41328">
      <h2
        class="cta__heading--2xl"
        data-node-id="2716:41329"
      >
        Попробуйте Кайтен бесплатно
      </h2>
      <p
        class="cta__desc"
        data-node-id="2716:41330"
      >
        Фиксируйте решения, инструкции и опыт команды там же, где ведете проекты.
        Документы остаются актуальными, сотрудники быстрее находят ответы,
        а клиенты решают вопросы без обращения в поддержку.
      </p>
    </div>

    <div data-node-id="2716:41331">
      <a
        class="cta__btn"
        href="https://faq-ru.kaiten.site/b577083e-3d48-4760-80af-cfd687955c38"
        target="_blank"
        rel="noopener"
        data-node-id="2716:41332"
      >
        <span class="cta__btn-inner" data-node-id="I2716:41332;7628:5862">
          Перенести все данные
        </span>
      </a>
    </div>
  </div>

  <!-- Screenshot (Tablet — absolute positioned) -->
  <div class="cta__img-tablet" data-node-id="2716:41333">
    <div class="cta__img-tablet-inner" data-node-id="2716:41334">
      <img
        src="https://www.figma.com/api/mcp/asset/0069129e-0bae-42fd-bafe-5f42b00f409a"
        alt="Интерфейс Кайтен"
      />
    </div>
  </div>
</section>


<!-- ══════════════════════════════════════════════════════════
     MOBILE  < 768px
     ══════════════════════════════════════════════════════════ -->
<section
  class="cta cta--mobile"
  data-node-id="2716:41340"
  aria-label="Призыв к действию"
>
  <!-- Decorative blur ellipse (Mobile) -->
  <div class="cta__blur-mobile" data-node-id="2716:41292" aria-hidden="true">
    <img
      src="https://www.figma.com/api/mcp/asset/8a81a1a1-362d-4977-8140-569f5baa8fd3"
      alt=""
    />
  </div>

  <!-- Text + button -->
  <div class="cta__top-mobile" data-node-id="2716:41293">
    <div class="cta__title-block-mobile" data-node-id="2716:41294">
      <h2
        class="cta__heading--2xl"
        data-node-id="I2716:41294;7638:6924"
      >
        Попробуйте Кайтен бесплатно
      </h2>
      <p
        class="cta__desc cta__desc--sm"
        data-node-id="I2716:41294;7638:6925"
      >
        Фиксируйте решения, инструкции и опыт команды там же, где ведете проекты.
        Документы остаются актуальными, сотрудники быстрее находят ответы,
        а клиенты решают вопросы без обращения в поддержку.
      </p>
    </div>

    <div
      style="width: 100%;"
      data-node-id="2716:41295"
    >
      <a
        class="cta__btn cta__btn--full"
        href="https://passport.kaiten.ru/"
        target="_blank"
        rel="noopener"
        data-node-id="2716:41296"
      >
        <span class="cta__btn-inner" data-node-id="I2716:41296;7628:5907">
          Попробовать бесплатно
        </span>
      </a>
    </div>
  </div>

  <!-- Screenshot (Mobile) -->
  <div class="cta__screenshot-mobile" data-node-id="2716:41297">
    <div class="cta__screenshot-mobile-img" data-node-id="2716:41298">
      <img
        src="https://www.figma.com/api/mcp/asset/9db04ea7-157e-4dde-9caa-c279f3da337f"
        alt="Интерфейс Кайтен"
      />
    </div>
    <div class="cta__shadow-mobile" data-node-id="2716:41299" aria-hidden="true">
      <img
        src="https://www.figma.com/api/mcp/asset/96e7b294-691e-4e7f-b39f-c8494edff599"
        alt=""
      />
    </div>
  </div>
</section>
```

---

## States

| Состояние       | Описание                                                                    |
|-----------------|-----------------------------------------------------------------------------|
| **Default**     | Светло-фиолетовый фон `#efe9f9`, текст `#2d2d2d`, кнопка `#7d4ccf`        |
| **Btn hover**   | Рекомендуется `background: #6a3db8` (–10% яркости от `#7d4ccf`)           |
| **Btn focus**   | `outline: 2px solid #7d4ccf; outline-offset: 2px`                          |
| **Desktop**     | `≥ 1280px` — горизонтальная раскладка; декоративный blur-градиент справа   |
| **Tablet**      | `768–1279px` — вертикальный стек; изображение абсолютно по дну             |
| **Mobile**      | `< 768px` — полная вертикаль; кнопка full-width; blur-эллипс `rotate(-135deg)` |

---

## Breakpoints

| Имя      | Диапазон            | Узел Figma    |
|----------|---------------------|---------------|
| Desktop  | `≥ 1280px`          | `2861-20576`  |
| Tablet   | `768px – 1279px`    | `2716-41341`  |
| Mobile   | `< 768px`           | `2716-41340`  |

---

## Accessibility

- Секция обёрнута в `<section>` с `aria-label="Призыв к действию"`.
- Заголовок — семантический `<h2>`.
- Декоративные элементы (blur, shadow) — `aria-hidden="true"`.
- Кнопка-ссылка открывает новую вкладку: добавлен `rel="noopener"`.
- Список преимуществ — семантический `<ul><li>`.

---

## Changelog

| Версия | Дата       | Описание                                      |
|--------|------------|-----------------------------------------------|
| 1.0.0  | 2026-06-05 | Первичная реализация Desktop + Tablet + Mobile |
