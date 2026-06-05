# Navigation

Компонент навигации (шапка сайта). Адаптивный: десктопная версия показывает полное меню с кнопками действий, мобильная — логотип и кнопку-бургер.

---

## Anatomy

### Desktop (`≥ 1280px`)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [LOGO]   Продукт ∨   Решения ∨   Услуги ∨   On-premise   AI   Тарифы  Кейсы  Блог   │  [☎]  [Войти]  [Регистрация]  │
└─────────────────────────────────────────────────────────────────────────┘
height: 80px | max-width container: 1280px | px: 32px
```

### Mobile (`< 1280px`)

```
┌───────────────────────────┐
│  [LOGO]              [≡]  │
└───────────────────────────┘
height: 72px | px: 16px left / 12px right
```

---

## Figma

| Версия   | Node ID     | Ссылка                                                                                          |
|----------|-------------|--------------------------------------------------------------------------------------------------|
| Desktop  | `7098-8822` | [Открыть в Figma](https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=7098-8822) |
| Mobile   | `7098-9467` | [Открыть в Figma](https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=7098-9467) |

---

## Tokens

| Token                                    | Value     | Использование                        |
|------------------------------------------|-----------|---------------------------------------|
| `--background/white/primary`             | `#ffffff` | Фон навбара                           |
| `--text/title-color`                     | `#2d2d2d` | Цвет ссылок меню (default)            |
| `--text/brand-color`                     | `#7d4ccf` | Цвет активной ссылки / текст кнопок   |
| `--button/primary/background`            | `#7d4ccf` | Фон кнопки «Войти»                    |
| `--button/primary/text`                  | `#ffffff` | Текст кнопки «Войти»                  |
| `--button/primary-outline/background`    | `#ffffff` | Фон кнопки «Регистрация» / телефон    |
| `--button/disabled/outline/border`       | `#e0e0e0` | Рамка кнопок outline                  |
| `--mobile-nav-menu-button/background-color` | `#ffffff` | Фон кнопки-бургера                 |
| `--border-radius/rounded-lg`             | `8px`     | Скругление кнопок и ссылок            |
| `--spacing/0`                            | `0px`     |                                       |
| `--spacing/1`                            | `4px`     |                                       |
| `--spacing/1,5`                          | `6px`     | Gap иконка + текст в ссылке           |
| `--spacing/2`                            | `8px`     | Gap между кнопками                    |
| `--spacing/2,5`                          | `10px`    | Padding по вертикали кнопок           |
| `--spacing/3`                            | `12px`    | Padding right мобильного контейнера   |
| `--spacing/4`                            | `16px`    | Padding left контейнера / кнопки      |
| `--spacing/5`                            | `20px`    | Gap пунктов меню                      |
| `--spacing/8`                            | `32px`    | Padding x десктопного контейнера      |
| `--spacing/10`                           | `40px`    | Gap меню и блока кнопок               |
| `--size/md`                              | `16px`    | Размер шрифта                         |
| `--line-height/md`                       | `24px`    | Высота строки                         |
| `--family/family`                        | `Roboto`  | Шрифт                                 |

---

## HTML + CSS

Полностью самодостаточная реализация без фреймворков. Переменные CSS соответствуют токенам дизайн-системы.

```html
<!-- ============================================================
     NAVIGATION COMPONENT
     Desktop: 1280px container, height 80px
     Mobile:  full-width, height 72px
     ============================================================ -->

<style>
  /* ── Design Tokens ─────────────────────────────────── */
  :root {
    --background-white-primary:           #ffffff;
    --text-title-color:                   #2d2d2d;
    --text-brand-color:                   #7d4ccf;
    --button-primary-background:          #7d4ccf;
    --button-primary-text:                #ffffff;
    --button-primary-outline-background:  #ffffff;
    --button-disabled-outline-border:     #e0e0e0;
    --mobile-nav-button-bg:               #ffffff;
    --border-radius-lg:                   8px;

    --spacing-0:   0px;
    --spacing-1:   4px;
    --spacing-1-5: 6px;
    --spacing-2:   8px;
    --spacing-2-5: 10px;
    --spacing-3:   12px;
    --spacing-4:   16px;
    --spacing-5:   20px;
    --spacing-8:   32px;
    --spacing-10:  40px;

    --font-size-md:    16px;
    --line-height-md:  24px;
    --font-family:     'Roboto', sans-serif;
    --font-weight-medium: 500;
    --letter-spacing:  -0.2px;

    --shadow-xs: 0px 1px 2px rgba(16, 24, 40, 0.05);
  }

  /* ── Reset / Base ───────────────────────────────────── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Navbar wrapper ─────────────────────────────────── */
  .navbar {
    background-color: var(--background-white-primary);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Desktop */
  .navbar--desktop {
    height: 80px;
  }

  /* Mobile */
  .navbar--mobile {
    height: 72px;
    display: none;
  }

  /* ── Container ──────────────────────────────────────── */
  .navbar__container {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1280px;
    padding: var(--spacing-0) var(--spacing-8);
  }

  .navbar__container--mobile {
    padding: var(--spacing-0) var(--spacing-3) var(--spacing-0) var(--spacing-4);
    height: 44px;
  }

  /* ── Navbar content ─────────────────────────────────── */
  .navbar__content {
    display: flex;
    align-items: center;
    flex: 1 0 0;
    min-width: 0;
  }

  /* ── Menu with logo ─────────────────────────────────── */
  .navbar__menu-with-logo {
    display: flex;
    align-items: center;
    flex: 1 0 0;
    min-width: 0;
    gap: var(--spacing-4);
  }

  /* ── Logo ───────────────────────────────────────────── */
  .navbar__logo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    width: 148px;
  }

  .navbar__logo img {
    display: block;
    height: 44px;
    width: auto;
  }

  .navbar__logo--mobile img {
    height: 40px;
  }

  /* ── Nav Menu ───────────────────────────────────────── */
  .navbar__nav {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 0 0;
    min-width: 0;
    gap: var(--spacing-5);
  }

  /* ── Nav link ───────────────────────────────────────── */
  .navbar__link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-1-5);
    flex-shrink: 0;
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-xs);
    text-decoration: none;
    cursor: pointer;
  }

  .navbar__link-text {
    font-family:     var(--font-family);
    font-weight:     var(--font-weight-medium);
    font-size:       var(--font-size-md);
    line-height:     var(--line-height-md);
    letter-spacing:  var(--letter-spacing);
    color:           var(--text-title-color);
    white-space:     nowrap;
    font-variation-settings: "wdth" 100;
  }

  .navbar__link-text--active {
    color: var(--text-brand-color);
  }

  /* Arrow icon inside link */
  .navbar__link-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .navbar__link-icon img {
    display: block;
    width: 100%;
    height: 100%;
  }

  /* ── Actions block ──────────────────────────────────── */
  .navbar__actions {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: var(--spacing-10);
  }

  .navbar__action-group {
    display: flex;
    align-items: center;
    height: 100%;
    gap: var(--spacing-2);
  }

  /* ── Buttons ────────────────────────────────────────── */
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: var(--border-radius-lg);
    cursor: pointer;
    font-family:     var(--font-family);
    font-weight:     var(--font-weight-medium);
    font-size:       var(--font-size-md);
    line-height:     var(--line-height-md);
    letter-spacing:  var(--letter-spacing);
    white-space:     nowrap;
    font-variation-settings: "wdth" 100;
    border: none;
    text-decoration: none;
  }

  /* Icon-only button (phone) */
  .btn--icon {
    background-color: var(--button-primary-outline-background);
    border: 1px solid var(--button-disabled-outline-border);
    padding: var(--spacing-2-5);
    width: 44px;
    height: 44px;
    flex-shrink: 0;
  }

  .btn--icon img {
    display: block;
    width: 24px;
    height: 24px;
  }

  /* Primary filled — «Войти» */
  .btn--primary {
    background-color: var(--button-primary-background);
    color: var(--button-primary-text);
    padding: var(--spacing-2-5) var(--spacing-4);
    gap: var(--spacing-1);
  }

  /* Outline — «Регистрация» */
  .btn--outline {
    background-color: var(--button-primary-outline-background);
    border: 1px solid var(--button-disabled-outline-border);
    color: var(--text-brand-color);
    padding: var(--spacing-2-5) var(--spacing-4);
    gap: var(--spacing-1);
  }

  .btn__text-padding {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-0) var(--spacing-1);
  }

  /* ── Mobile hamburger ───────────────────────────────── */
  .navbar__burger {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--mobile-nav-button-bg);
    border-radius: var(--border-radius-lg);
    padding: var(--border-radius-lg); /* 8px — token --border-radius/rounded-lg */
    flex-shrink: 0;
    cursor: pointer;
    border: none;
  }

  .navbar__burger img {
    display: block;
    width: 24px;
    height: 24px;
  }

  /* ── Responsive ─────────────────────────────────────── */
  @media (max-width: 1279px) {
    .navbar--desktop { display: none; }
    .navbar--mobile  { display: flex; }
  }
</style>

<!-- ── Desktop Navbar ──────────────────────────────────────────── -->
<nav class="navbar navbar--desktop" data-node-id="7098:8822" aria-label="Main navigation">
  <div class="navbar__container">
    <div class="navbar__content">

      <!-- Logo + Menu -->
      <div class="navbar__menu-with-logo" data-node-id="7098:8724">

        <!-- Logo -->
        <div class="navbar__logo" data-node-id="7098:8725">
          <a href="/" aria-label="Kaiten — на главную">
            <img
              src="https://www.figma.com/api/mcp/asset/cd8dfa53-d74a-4201-914b-fe403f6a8035"
              alt="Kaiten"
              data-node-id="7098:8819"
            />
          </a>
        </div>

        <!-- Nav links -->
        <nav class="navbar__nav" data-node-id="7098:8727">

          <!-- Продукт -->
          <a class="navbar__link" href="#product" data-node-id="7098:8728">
            <span class="navbar__link-text">Продукт</span>
            <span class="navbar__link-icon" data-node-id="I7098:8728;7219:55770">
              <img src="https://www.figma.com/api/mcp/asset/08486369-a15d-4948-8efe-b69c3dc0ca7b" alt="" aria-hidden="true" />
            </span>
          </a>

          <!-- Решения (active) -->
          <a class="navbar__link" href="#solutions" data-node-id="7098:8729">
            <span class="navbar__link-text navbar__link-text--active">Решения</span>
            <span class="navbar__link-icon" data-node-id="I7098:8729;7220:985">
              <img src="https://www.figma.com/api/mcp/asset/93acfa06-82a3-4113-99ac-1a7c62919d09" alt="" aria-hidden="true" />
            </span>
          </a>

          <!-- Услуги -->
          <a class="navbar__link" href="#services" data-node-id="7098:8730">
            <span class="navbar__link-text">Услуги</span>
            <span class="navbar__link-icon" data-node-id="I7098:8730;7219:55770">
              <img src="https://www.figma.com/api/mcp/asset/08486369-a15d-4948-8efe-b69c3dc0ca7b" alt="" aria-hidden="true" />
            </span>
          </a>

          <!-- On-premise -->
          <a class="navbar__link" href="#on-premise" data-node-id="7098:8731">
            <span class="navbar__link-text">On-premise</span>
          </a>

          <!-- AI -->
          <div class="navbar__link" data-node-id="7098:8732">
            <a class="navbar__link" href="#ai" data-node-id="7098:8733" style="box-shadow:none;">
              <span class="navbar__link-text">AI</span>
            </a>
          </div>

          <!-- Тарифы -->
          <a class="navbar__link" href="#pricing" data-node-id="7098:8735">
            <span class="navbar__link-text">Тарифы</span>
          </a>

          <!-- Кейсы -->
          <a class="navbar__link" href="#cases" data-node-id="7098:8736">
            <span class="navbar__link-text">Кейсы</span>
          </a>

          <!-- Блог -->
          <a class="navbar__link" href="#blog" data-node-id="7098:8737">
            <span class="navbar__link-text">Блог</span>
          </a>

        </nav>
      </div>

      <!-- Action buttons -->
      <div class="navbar__actions" data-node-id="7098:8738">
        <div class="navbar__action-group" data-node-id="7098:8740">

          <!-- Phone icon button -->
          <button class="btn btn--icon" aria-label="Позвонить нам" data-node-id="7098:8741">
            <img
              src="https://www.figma.com/api/mcp/asset/523bb141-2fa2-45c2-a24c-5d0a17628b0d"
              alt=""
              aria-hidden="true"
            />
          </button>

          <!-- Войти -->
          <a class="btn btn--primary" href="/login" data-node-id="7098:8742">
            <span class="btn__text-padding">Войти</span>
          </a>

          <!-- Регистрация -->
          <a class="btn btn--outline" href="/register" data-node-id="7098:8743">
            <span class="btn__text-padding">Регистрация</span>
          </a>

        </div>
      </div>

    </div>
  </div>
</nav>

<!-- ── Mobile Navbar ───────────────────────────────────────────── -->
<nav class="navbar navbar--mobile" data-node-id="7098:9467" aria-label="Main navigation mobile">
  <div class="navbar__container navbar__container--mobile">
    <div class="navbar__content">

      <!-- Logo -->
      <div style="flex: 1 0 0; min-width: 0;" data-node-id="7098:9475">
        <a href="/" aria-label="Kaiten — на главную" data-node-id="7098:9472">
          <img
            src="https://www.figma.com/api/mcp/asset/7c367b48-dd1f-4780-a604-bcb102170333"
            alt="Kaiten"
            class="navbar__logo--mobile"
            style="height:40px; width:auto; display:block;"
          />
        </a>
      </div>

      <!-- Burger button -->
      <button
        class="navbar__burger"
        aria-label="Открыть меню"
        aria-expanded="false"
        aria-controls="mobile-menu"
        data-node-id="7098:9460"
      >
        <img
          src="https://www.figma.com/api/mcp/asset/b2f47be3-1d96-4ad5-95d7-89e87f3dc8ce"
          alt=""
          aria-hidden="true"
          data-node-id="I7098:9460;8804:8769"
        />
      </button>

    </div>
  </div>
</nav>
```

---

## States

| Состояние     | Описание                                                             |
|---------------|----------------------------------------------------------------------|
| **Default**   | Ссылки — `#2d2d2d`                                                   |
| **Active**    | Активная ссылка — `#7d4ccf` (brand color)                            |
| **Hover**     | Определяется проектом; рекомендуется `opacity: 0.8` или underline    |
| **Mobile**    | Показывается только логотип и кнопка-бургер (гамбургер)              |

---

## Accessibility

- Все интерактивные элементы имеют `aria-label` или видимый текст.
- Иконки помечены `aria-hidden="true"`.
- Кнопка-бургер использует `aria-expanded` и `aria-controls`.
- Навбары обёрнуты в семантический тег `<nav>` с `aria-label`.

---

## Changelog

| Версия | Дата       | Описание                              |
|--------|------------|---------------------------------------|
| 1.0.0  | 2026-06-05 | Первичная реализация Desktop + Mobile |
