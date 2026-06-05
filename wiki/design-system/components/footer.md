# Footer

Компонент подвала сайта. Адаптивный: десктопная версия — горизонтальная раскладка в контейнере 1216px, мобильная — вертикальный стек на всю ширину экрана с боковыми отступами 16px.

---

## Anatomy

### Desktop (`≥ 1280px`) · node `7142:13339`

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  pt: 64px                                                                           │
│  ┌──────────────────────────────────────────────────────── container 1216px ──────┐ │
│  │  [Компания]  [Ресурсы]  [Возможности]  │  [Каналы в соцсетях] [Новые статьи]  │ │
│  │  Тарифы      База знаний Партнёрская   │  [Подписаться на рассылку — карточка] │ │
│  │  Контакты    Кейсы       Реферальная   │                                        │ │
│  │  ...         Блог        ...           │                                        │ │
│  │                                        │                                        │ │
│  │  [Сравнили Кайтен с другими сервисами] │                                        │ │
│  │  Trello Jira Asana Weeek ...           │                                        │ │
│  ├────────────────────────────── divider ────────────────────────────────────────┤ │
│  │  [Официальный статус IT-разработчика]  │  [ООО «Кайтен Софтвер»] ИНН КПП Адрес│ │
│  ├────────────────────────────── divider ────────────────────────────────────────┤ │
│  │  [LOGO]  ☎ +7(499)490-64-99  ✉ sales@kaiten.ru  │ Участник [Sk Сколково]  VK RuTube habr │
│  │  Политика конфиденциальности · Лицензионный договор · Пользовательское соглашение · ... │
│  └────────────────────────────────────────────────────────────────────────────────┘ │
│  pb: 24px                                                                           │
└─────────────────────────────────────────────────────────────────────────────────────┘
background: linear-gradient(90deg, #2d2d2d, #2d2d2d)
```

### Mobile (`< 1280px`) · node `7146:4343`

```
┌──────────────────────── 360px ──────────────────────┐
│  pt: 48px  px: 16px                                 │
│  [Компания]        [Ресурсы]                        │
│  [Сравнили Кайтен с…]  [Возможности]               │
│  [Каналы в соцсетях — карточка]                     │
│  [Новые статьи — карточка]                          │
│  [Подписаться на рассылку — карточка]               │
│  [Официальный статус ИТ-разработчика]               │
│  [ООО «Кайтен Софтвер»]                             │
│  ─────────────── divider ──────────────             │
│  Участник [Sk Сколково]                             │
│  [LOGO]  ☎ +7(495)…  ✉ sales@…  [VK][RuTube][habr] │
│  ─────────────── divider ──────────────             │
│  Политика конфиденциальности                        │
│  Лицензионный договор                               │
│  …                                                  │
│  pb: 24px                                           │
└─────────────────────────────────────────────────────┘
```

---

## Figma

| Версия  | Node ID       | Ссылка                                                                                           |
|---------|---------------|---------------------------------------------------------------------------------------------------|
| Desktop | `7142-13339`  | [Открыть в Figma](https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=7142-13339) |
| Mobile  | `7146-4343`   | [Открыть в Figma](https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=7146-4343)  |

---

## Sub-components

| Компонент           | Node ID      | Описание                                           |
|---------------------|--------------|----------------------------------------------------|
| `Footerblocs`       | `52820:*`    | Карточка «Каналы в соцсетях» / «Новые статьи»      |
| `Iconsfooter`       | `2967:7759`  | Иконка-пилюля: Telegram / Max / News               |
| `Checkbox`          | `2967:7556`  | Чекбокс sm, состояния: Default / Checked           |
| `LogoKaiten`        | `2780:38464` | SVG-логотип Kaiten (белый)                         |

---

## Tokens

| Token                                        | Value                        | Использование                              |
|----------------------------------------------|------------------------------|--------------------------------------------|
| `--colors/kaiten/kmonocolors/k000`           | `#ffffff`                    | Основной текст на тёмном фоне              |
| `--colors/kaiten/kmonocolors/k400`           | `#bdbdbd`                    | Вторичный/подсказочный текст               |
| `--colors/kaiten/kmonocolors/k800`           | `#424242`                    | Фон карточек в футере                      |
| `--colors/kaiten/brand-100k`                 | `#7d4ccf`                    | Акцентный цвет (заголовок рассылки)        |
| `--colors/kaiten/brand-48k`                  | `rgba(125,76,207,0.48)`      | Фон иконок соцсетей                        |
| `--colors/neutral/400`                       | `#a3a3a3`                    | Нейтральный текст (сравнения)              |
| `--button/primary/background`                | `#7d4ccf`                    | Кнопка «Подписаться»                       |
| `--button/primary/text`                      | `#ffffff`                    | Текст кнопки «Подписаться»                 |
| `--input/background`                         | `#ffffff`                    | Фон поля e-mail                            |
| `--input/placeholder-text-color`             | `#9ca3af`                    | Плейсхолдер поля e-mail                    |
| `--border/tertiary`                          | `#d1d5db`                    | Рамка поля / чекбокса                      |
| `--checkbox/background`                      | `#ffffff`                    | Фон чекбокса (unchecked)                   |
| `--checkbox/checked-background`              | `#7d4ccf`                    | Фон чекбокса (checked)                     |
| `--checkbox/checked-border-color`            | `#7d4ccf`                    | Рамка чекбокса (checked)                   |
| `--border-radius/rounded-lg`                 | `8px`                        | Скругление карточек, кнопок, иконок        |
| `--border-radius/rounded-2xl`                | `16px`                       | Скругление блоков                          |
| `--spacing/3`                                | `12px`                       | Gap в списках ссылок                       |
| `--spacing/4`                                | `16px`                       | Padding карточек, gap разделов             |
| `--spacing/5`                                | `20px`                       | Gap иконок соцсетей (desktop)              |
| `--spacing/6`                                | `24px`                       | Gap блоков, pb mobile                      |
| `--spacing/8`                                | `32px`                       | Gap колонок desktop                        |
| `--spacing/10`                               | `40px`                       | Gap логотипа и контактов                   |
| `--spacing/12`                               | `48px`                       | pt mobile                                  |
| `--spacing/16`                               | `64px`                       | pt desktop                                 |
| `--size/xs`                                  | `12px`                       | Текст чекбоксов                            |
| `--size/sm`                                  | `14px`                       | Вторичный текст                            |
| `--size/md`                                  | `16px`                       | Основной текст / заголовки колонок         |
| `--line-height/xs`                           | `16px`                       |                                            |
| `--line-height/sm`                           | `20px`                       |                                            |
| `--line-height/md`                           | `24px`                       |                                            |
| `--family/family`                            | `'Roboto'`                   | Шрифт                                      |

---

## HTML + CSS

```html
<!-- ============================================================
     FOOTER COMPONENT
     Desktop: max-width 1216px container, pt 64px pb 24px
     Mobile:  full-width px 16px, pt 48px pb 24px
     Background: #2d2d2d (linear-gradient)
     ============================================================ -->

<style>
  /* ── Design Tokens ─────────────────────────────────────────── */
  :root {
    /* Colors */
    --k000:              #ffffff;
    --k400:              #bdbdbd;
    --k800:              #424242;
    --brand-100k:        #7d4ccf;
    --brand-48k:         rgba(125, 76, 207, 0.48);
    --neutral-400:       #a3a3a3;
    --grey-900:          #2d2d2d;
    --subscribe-card-bg: #efe9f9;

    /* Buttons / inputs */
    --btn-primary-bg:    #7d4ccf;
    --btn-primary-text:  #ffffff;
    --input-bg:          #ffffff;
    --input-placeholder: #9ca3af;
    --border-tertiary:   #d1d5db;

    /* Checkbox */
    --cb-bg:             #ffffff;
    --cb-checked-bg:     #7d4ccf;
    --cb-checked-border: #7d4ccf;

    /* Radius */
    --radius-lg:         8px;
    --radius-2xl:        16px;

    /* Spacing */
    --sp-0:  0px;
    --sp-1:  4px;
    --sp-2:  8px;
    --sp-3:  12px;
    --sp-4:  16px;
    --sp-5:  20px;
    --sp-6:  24px;
    --sp-8:  32px;
    --sp-10: 40px;
    --sp-12: 48px;
    --sp-16: 64px;

    /* Typography */
    --font:    'Roboto', sans-serif;
    --fw-reg:  400;
    --fw-med:  500;
    --fw-semi: 600;
    --fs-xs:   12px;
    --fs-sm:   14px;
    --fs-md:   16px;
    --lh-xs:   16px;
    --lh-sm:   20px;
    --lh-md:   24px;
    --ls:      -0.2px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Footer wrapper ────────────────────────────────────────── */
  .footer {
    background: linear-gradient(90deg, var(--grey-900) 0%, var(--grey-900) 100%);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: var(--sp-16);
    padding-bottom: var(--sp-6);
    font-family: var(--font);
    color: var(--k000);
    letter-spacing: var(--ls);
  }

  /* ── Container ─────────────────────────────────────────────── */
  .footer__container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    width: 100%;
    max-width: 1216px;
    padding: 0 var(--sp-4);
  }

  /* ── Top row: links + cards ────────────────────────────────── */
  .footer__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
  }

  /* ── Left block (columns + comparisons) ───────────────────── */
  .footer__left {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: flex-start;
    width: 592px;
    flex-shrink: 0;
    align-self: stretch;
  }

  .footer__columns {
    display: flex;
    gap: var(--sp-8);
    align-items: flex-start;
    flex: 1 0 0;
    min-height: 1px;
    width: 100%;
  }

  /* single column */
  .footer__col {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    flex-shrink: 0;
  }
  .footer__col--company  { width: 176px; }
  .footer__col--resources{ width: 144px; }
  .footer__col--features { width: 176px; }

  .footer__col-title {
    font-size: var(--fs-md);
    font-weight: var(--fw-semi);
    line-height: var(--lh-md);
    color: var(--k000);
    white-space: nowrap;
    font-variation-settings: "wdth" 100;
  }

  .footer__col-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  .footer__col-links a,
  .footer__col-links span {
    font-size: var(--fs-sm);
    font-weight: var(--fw-reg);
    line-height: var(--lh-sm);
    color: var(--neutral-400);
    text-decoration: none;
    font-variation-settings: "wdth" 100;
  }
  .footer__col-links--gap14 { gap: 14px; }

  /* comparisons */
  .footer__compare {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    width: 100%;
    white-space: nowrap;
  }
  .footer__compare-title {
    font-size: var(--fs-md);
    font-weight: var(--fw-semi);
    line-height: var(--lh-md);
    color: var(--k000);
    font-variation-settings: "wdth" 100;
  }
  .footer__compare-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: flex-start;
  }
  .footer__compare-tags span {
    font-size: var(--fs-sm);
    font-weight: var(--fw-reg);
    line-height: var(--lh-sm);
    color: var(--k400);
    font-variation-settings: "wdth" 100;
  }

  /* ── Right block (cards) ───────────────────────────────────── */
  .footer__right {
    display: flex;
    gap: 32px;
    align-items: flex-start;
    width: 592px;
    flex-shrink: 0;
  }

  .footer__cards-col {
    display: flex;
    flex: 1 0 0;
    flex-direction: column;
    gap: 32px;
    align-items: flex-start;
    min-width: 0;
    align-self: stretch;
  }

  /* ── Card base ─────────────────────────────────────────────── */
  .footer__card {
    background: var(--k800);
    border-radius: var(--radius-2xl);
    padding: var(--sp-4);
    width: 100%;
    flex-shrink: 0;
  }
  .footer__card--socials {
    height: 162px;
  }
  .footer__card--news {
    flex: 1 0 0;
    min-height: 0;
  }

  .footer__card-title {
    font-size: var(--fs-md);
    font-weight: var(--fw-semi);
    line-height: var(--lh-md);
    color: var(--k000);
    margin-bottom: 10px;
    font-variation-settings: "wdth" 100;
  }
  .footer__card-subtitle {
    font-size: var(--fs-sm);
    font-weight: var(--fw-reg);
    line-height: var(--lh-sm);
    color: var(--k400);
    margin-bottom: 20px;
    font-variation-settings: "wdth" 100;
  }

  /* social row */
  .footer__socials-row {
    display: flex;
    gap: var(--sp-5);
    align-items: flex-start;
    width: 100%;
  }
  .footer__social-item {
    display: flex;
    flex: 1 0 0;
    gap: var(--sp-3);
    align-items: center;
    min-width: 0;
    text-decoration: none;
  }
  .footer__social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--brand-48k);
    border-radius: var(--radius-lg);
    padding: 7px;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    overflow: hidden;
  }
  .footer__social-icon img { display: block; width: 100%; height: 100%; }
  .footer__social-name {
    font-size: var(--fs-sm);
    font-weight: var(--fw-med);
    line-height: var(--lh-sm);
    color: var(--k000);
    overflow: hidden;
    text-overflow: ellipsis;
    font-variation-settings: "wdth" 100;
  }

  /* news items */
  .footer__news-list {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
  }
  .footer__news-item {
    display: flex;
    gap: var(--sp-3);
    align-items: center;
    width: 100%;
  }
  .footer__news-text {
    font-size: var(--fs-sm);
    font-weight: var(--fw-reg);
    line-height: var(--lh-sm);
    color: var(--k400);
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1 0 0;
    min-width: 0;
    font-variation-settings: "wdth" 100;
  }

  /* ── Subscribe card ────────────────────────────────────────── */
  .footer__subscribe {
    flex: 1 0 0;
    min-width: 0;
    border-radius: var(--radius-2xl);
    overflow: hidden;
    position: relative;
  }
  .footer__subscribe-inner {
    background: var(--subscribe-card-bg);
    border-radius: var(--radius-2xl);
    padding: var(--sp-4);
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  /* decorative blur ellipse */
  .footer__subscribe-inner::before {
    content: "";
    position: absolute;
    width: 381px;
    height: 712px;
    background: radial-gradient(circle, rgba(125,76,207,0.35) 0%, transparent 70%);
    right: -200px;
    top: -180px;
    pointer-events: none;
    border-radius: 50%;
  }

  .footer__subscribe-content {
    display: flex;
    flex-direction: column;
    gap: var(--sp-6);
    align-items: flex-start;
    width: 100%;
    position: relative;
  }
  .footer__subscribe-head {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    width: 100%;
  }
  .footer__subscribe-title {
    font-size: var(--fs-md);
    font-weight: var(--fw-semi);
    line-height: var(--lh-md);
    color: var(--brand-100k);
    font-variation-settings: "wdth" 100;
  }
  .footer__subscribe-desc {
    font-size: var(--fs-sm);
    font-weight: var(--fw-reg);
    line-height: var(--lh-sm);
    color: var(--grey-900);
    font-variation-settings: "wdth" 100;
  }
  .footer__subscribe-form {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
    align-items: flex-start;
    width: 100%;
  }
  .footer__input {
    background: var(--input-bg);
    border: 1px solid var(--border-tertiary);
    border-radius: var(--radius-lg);
    height: 44px;
    width: 100%;
    padding: var(--sp-2) var(--radius-2xl); /* token --border-radius/rounded-2xl = 16px */
    font-family: var(--font);
    font-size: var(--fs-sm);
    font-weight: var(--fw-reg);
    line-height: var(--lh-sm);
    color: var(--grey-900);
    outline: none;
    font-variation-settings: "wdth" 100;
  }
  .footer__input::placeholder { color: var(--input-placeholder); }

  .footer__btn-subscribe {
    background: var(--btn-primary-bg);
    border: none;
    border-radius: var(--radius-lg);
    width: 100%;
    padding: 10px var(--sp-4);
    font-family: var(--font);
    font-size: var(--fs-md);
    font-weight: var(--fw-med);
    line-height: var(--lh-md);
    color: var(--btn-primary-text);
    cursor: pointer;
    letter-spacing: var(--ls);
    font-variation-settings: "wdth" 100;
  }

  /* checkboxes */
  .footer__subscribe-checks {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    width: 100%;
  }
  .footer__check-row {
    display: flex;
    gap: var(--sp-2);
    align-items: flex-start;
    width: 100%;
  }
  .footer__checkbox {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1px solid var(--border-tertiary);
    background: var(--cb-bg);
    flex-shrink: 0;
    position: relative;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
  }
  .footer__checkbox:checked {
    background: var(--cb-checked-bg);
    border-color: var(--cb-checked-border);
  }
  .footer__checkbox:checked::after {
    content: "";
    position: absolute;
    inset: calc(12.5% - 0.75px);
    background: url("https://www.figma.com/api/mcp/asset/08be4a78-76ed-44ea-ad1f-5c7c84c0782f") center / contain no-repeat;
  }
  .footer__check-label {
    flex: 1 0 0;
    min-width: 0;
    font-size: var(--fs-xs);
    font-weight: var(--fw-reg);
    line-height: var(--lh-xs);
    color: var(--grey-900);
    font-variation-settings: "wdth" 100;
  }
  .footer__check-label a { color: var(--brand-100k); text-decoration: none; }

  /* ── Divider ───────────────────────────────────────────────── */
  .footer__divider {
    width: 100%;
    height: 1px;
    background: rgba(255,255,255,0.12);
    flex-shrink: 0;
  }

  /* ── IT status section ─────────────────────────────────────── */
  .footer__status-row {
    display: flex;
    gap: var(--sp-8);
    align-items: flex-start;
    width: 100%;
  }
  .footer__status-left  { width: 592px; flex-shrink: 0; }
  .footer__status-right { flex: 1 0 0; min-width: 0; }

  .footer__section-title {
    font-size: var(--fs-md);
    font-weight: var(--fw-semi);
    line-height: var(--lh-md);
    color: var(--k000);
    margin-bottom: 16px;
    font-variation-settings: "wdth" 100;
  }
  .footer__section-text {
    font-size: var(--fs-sm);
    font-weight: var(--fw-reg);
    line-height: var(--lh-sm);
    color: var(--k400);
    margin-bottom: 14px;
    font-variation-settings: "wdth" 100;
  }
  .footer__section-text strong { color: var(--k000); font-weight: var(--fw-med); }
  .footer__more-link {
    font-size: var(--fs-sm);
    font-weight: var(--fw-med);
    line-height: var(--lh-sm);
    color: var(--k000);
    text-decoration: none;
    font-variation-settings: "wdth" 100;
  }

  .footer__legal-cols {
    display: flex;
    gap: var(--sp-8);
    align-items: flex-start;
  }
  .footer__legal-col {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
    flex-shrink: 0;
  }
  .footer__legal-col--address { flex: 1 0 0; min-width: 0; }
  .footer__legal-label {
    font-size: var(--fs-sm);
    font-weight: var(--fw-med);
    line-height: var(--lh-sm);
    color: var(--k000);
    font-variation-settings: "wdth" 100;
  }
  .footer__legal-value {
    font-size: var(--fs-sm);
    font-weight: var(--fw-reg);
    line-height: var(--lh-sm);
    color: var(--k400);
    font-variation-settings: "wdth" 100;
  }

  /* ── Bottom bar ────────────────────────────────────────────── */
  .footer__bottom {
    display: flex;
    flex-direction: column;
    gap: var(--sp-5);
    align-items: flex-start;
    width: 100%;
  }
  .footer__bottom-row {
    display: flex;
    flex: 1 0 0;
    gap: 80px;
    align-items: center;
    min-width: 0;
    width: 100%;
  }
  .footer__logo-contacts {
    display: flex;
    gap: var(--sp-8);
    align-items: center;
    width: 587px;
    flex-shrink: 0;
  }
  .footer__logo { flex-shrink: 0; width: 176px; }
  .footer__logo img { display: block; height: 44px; width: auto; }

  .footer__contacts {
    display: flex;
    gap: var(--sp-8);
    align-items: center;
    height: 100%;
  }
  .footer__contact-item {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    text-decoration: none;
  }
  .footer__contact-item img { width: 24px; height: 24px; display: block; }
  .footer__contact-text {
    font-size: var(--fs-md);
    font-weight: var(--fw-med);
    line-height: var(--lh-md);
    color: var(--k000);
    white-space: nowrap;
    font-variation-settings: "wdth" 100;
  }

  /* Skolkovo */
  .footer__skolkovo {
    display: flex;
    flex: 1 0 0;
    align-items: center;
    justify-content: center;
    min-width: 0;
  }
  .footer__skolkovo-inner {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-shrink: 0;
  }
  .footer__skolkovo-label {
    font-size: var(--fs-md);
    font-weight: var(--fw-semi);
    line-height: var(--lh-md);
    color: var(--k000);
    width: 76px;
    font-variation-settings: "wdth" 100;
  }
  .footer__skolkovo-logo { height: 32px; display: block; }

  /* social icons (bottom) */
  .footer__social-icons {
    display: flex;
    gap: var(--sp-4);
    align-items: center;
    flex-shrink: 0;
  }
  .footer__social-icons img { display: block; }

  /* legal links row */
  .footer__legal-links {
    display: flex;
    flex-wrap: wrap;
    gap-y: 16px;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
  }
  .footer__legal-links a,
  .footer__legal-links span {
    font-size: var(--fs-sm);
    font-weight: var(--fw-reg);
    line-height: var(--lh-sm);
    color: var(--k400);
    text-decoration: none;
    white-space: nowrap;
    font-variation-settings: "wdth" 100;
  }

  /* ── Responsive ────────────────────────────────────────────── */
  @media (max-width: 1279px) {
    .footer {
      padding-top: var(--sp-12);
      padding-left: var(--sp-4);
      padding-right: var(--sp-4);
      align-items: flex-start;
    }
    .footer__container {
      max-width: 100%;
      padding: 0;
    }
    .footer__top           { flex-direction: column; gap: var(--sp-6); }
    .footer__left          { width: 100%; }
    .footer__columns       { flex-wrap: wrap; }
    .footer__col--company  { width: calc(50% - 12px); }
    .footer__col--resources{ width: calc(50% - 12px); }
    .footer__col--features { width: calc(50% - 12px); }
    .footer__right         { flex-direction: column; width: 100%; gap: var(--sp-6); }
    .footer__cards-col     { width: 100%; }
    .footer__subscribe     { width: 100%; }
    .footer__status-row    { flex-direction: column; gap: var(--sp-6); }
    .footer__status-left   { width: 100%; }
    .footer__bottom-row    { flex-direction: column; gap: var(--sp-6); align-items: flex-start; }
    .footer__logo-contacts { flex-direction: column; width: 100%; gap: var(--sp-4); }
    .footer__contacts      { flex-direction: column; align-items: flex-start; gap: var(--sp-4); }
    .footer__skolkovo      { justify-content: flex-start; }
    .footer__legal-links   { flex-direction: column; gap: 12px; }
    .footer__compare       { white-space: normal; }
  }
</style>

<!-- ══════════════════════════════════════════════════════════════
     FOOTER
     ══════════════════════════════════════════════════════════════ -->
<footer class="footer" data-node-id="7142:13339" aria-label="Подвал сайта">
  <div class="footer__container" data-node-id="7142:13112">

    <!-- ── TOP: links + cards ──────────────────────────────── -->
    <div class="footer__top" data-node-id="7142:13113">

      <!-- Left: nav columns + comparisons -->
      <div class="footer__left" data-node-id="7142:13114">
        <div class="footer__columns" data-node-id="7142:13115">

          <!-- Компания -->
          <div class="footer__col footer__col--company" data-node-id="7142:13116">
            <span class="footer__col-title" data-node-id="7142:13118">Компания</span>
            <nav class="footer__col-links" data-node-id="7142:13119" aria-label="Компания">
              <a href="/pricing"      data-node-id="7142:13120">Тарифы</a>
              <a href="/contacts"     data-node-id="7142:13121">Контакты</a>
              <a href="/certificates" data-node-id="7142:13124">Сертификаты</a>
              <a href="/presentation" data-node-id="7142:13125">Скачать презентацию</a>
            </nav>
          </div>

          <!-- Ресурсы -->
          <div class="footer__col footer__col--resources" data-node-id="7142:13126">
            <span class="footer__col-title" data-node-id="7142:13129">Ресурсы</span>
            <nav class="footer__col-links" data-node-id="7142:13130" aria-label="Ресурсы">
              <a href="/knowledge-base" data-node-id="7142:13131">База знаний</a>
              <a href="/cases"          data-node-id="7142:13132">Кейсы</a>
              <a href="/blog"           data-node-id="7142:13133">Блог</a>
              <a href="/api"            data-node-id="7142:13134">API</a>
              <a href="/community"      data-node-id="7142:13135">Комьюнити</a>
            </nav>
          </div>

          <!-- Возможности -->
          <div class="footer__col footer__col--features" data-node-id="7142:13136">
            <span class="footer__col-title" data-node-id="7142:13137">Возможности</span>
            <nav class="footer__col-links footer__col-links--gap14" data-node-id="7142:13138" aria-label="Возможности">
              <a href="/partners"    data-node-id="7142:13139">Партнерская программа</a>
              <a href="/referral"    data-node-id="7142:13140">Реферальная программа</a>
              <a href="/addons"      data-node-id="7142:13142">Дополнения</a>
              <a href="/on-premise"  data-node-id="7142:13143">On-premise</a>
              <a href="/onboarding"  data-node-id="7142:13144">Внедрение</a>
              <a href="/ai"          data-node-id="7142:13145">Кайтен AI</a>
            </nav>
          </div>

        </div>

        <!-- Сравнения -->
        <div class="footer__compare" data-node-id="7142:13146">
          <span class="footer__compare-title" data-node-id="7142:13147">Сравнили Кайтен с другими сервисами</span>
          <div class="footer__compare-tags" data-node-id="7142:13148">
            <span data-node-id="7142:13149">Trello</span>
            <span data-node-id="7142:13150">Jira</span>
            <span data-node-id="7142:13151">Asana</span>
            <span data-node-id="7142:13152">Weeek</span>
            <span data-node-id="7142:13153">Wrike</span>
            <span data-node-id="7142:13154">ClickUp</span>
            <span data-node-id="7142:13155">EvaTeam</span>
            <span data-node-id="7142:13156">MS Project</span>
            <span data-node-id="7142:13157">Notion</span>
            <span data-node-id="7142:13158">Confluence</span>
            <span data-node-id="7142:13159">GanttPRO</span>
            <span data-node-id="7142:13160">Google Docs</span>
            <span data-node-id="7142:13161">Redmine</span>
            <span data-node-id="7142:13162">Youtrack</span>
            <span data-node-id="7142:13163">Zendesk</span>
            <span data-node-id="7142:13164">Okdesk</span>
            <span data-node-id="7142:13165">Юздеск</span>
          </div>
        </div>
      </div><!-- /footer__left -->

      <!-- Right: social + news + subscribe cards -->
      <div class="footer__right" data-node-id="7142:13166">

        <!-- col: socials + news -->
        <div class="footer__cards-col" data-node-id="7142:13167">

          <!-- Каналы в соцсетях -->
          <div class="footer__card footer__card--socials" data-node-id="7142:13168">
            <p class="footer__card-title" data-node-id="I7142:13168;52820:109163">Каналы в соцсетях</p>
            <p class="footer__card-subtitle" data-node-id="I7142:13168;53013:10691">
              Фичи, новости и статьи<br>про эффективное управление
            </p>
            <div class="footer__socials-row" data-node-id="I7142:13168;53013:10654">
              <!-- Telegram -->
              <a class="footer__social-item" href="https://t.me/kaiten_ru" target="_blank" rel="noopener" data-node-id="I7142:13168;52820:109164">
                <span class="footer__social-icon" data-node-id="I7142:13168;52820:109164">
                  <img src="https://www.figma.com/api/mcp/asset/2ec3d06f-fbf3-4ea3-930f-0c157801d023" alt="Telegram" width="17" height="14" />
                </span>
                <span class="footer__social-name" data-node-id="I7142:13168;52820:109167">Telegram</span>
              </a>
              <!-- Max -->
              <a class="footer__social-item" href="https://max.ru/join/9LU5tCHKFsa7cWfd4vnn4EDgfz2UqM7bu1290gom7C0" target="_blank" rel="noopener" data-node-id="I7142:13168;52820:109168">
                <span class="footer__social-icon" data-node-id="I7142:13168;52820:109168">
                  <img src="https://www.figma.com/api/mcp/asset/93428d41-874f-4b75-bd10-de5afafb6a46" alt="Max" width="18" height="18" />
                </span>
                <span class="footer__social-name" data-node-id="I7142:13168;52820:109171">Max</span>
              </a>
            </div>
          </div>

          <!-- Новые статьи -->
          <div class="footer__card footer__card--news" data-node-id="7142:13169">
            <p class="footer__card-title" data-node-id="I7142:13170;52820:109149">Новые статьи</p>
            <div class="footer__news-list" data-node-id="I7142:13170;52820:109148">
              <a class="footer__news-item" href="/blog/multitasking" data-node-id="I7142:13170;52820:109150">
                <span class="footer__social-icon" aria-hidden="true">
                  <img src="https://www.figma.com/api/mcp/asset/ce30a566-b76c-4b23-a1a9-58a2271c1ed8" alt="" width="24" height="24" />
                </span>
                <span class="footer__news-text" data-node-id="I7142:13170;52820:109153">Каждый второй сотрудник устает от многозадачности: что показало</span>
              </a>
              <a class="footer__news-item" href="/blog/knowledge" data-node-id="I7142:13170;52820:109154">
                <span class="footer__social-icon" aria-hidden="true">
                  <img src="https://www.figma.com/api/mcp/asset/ce30a566-b76c-4b23-a1a9-58a2271c1ed8" alt="" width="24" height="24" />
                </span>
                <span class="footer__news-text" data-node-id="I7142:13170;52820:109157">Как сохранить знания команды на пути от гипотезы к разработке: полезные практики</span>
              </a>
            </div>
          </div>

        </div><!-- /footer__cards-col -->

        <!-- Subscribe card -->
        <div class="footer__subscribe" data-node-id="7142:13171">
          <div class="footer__subscribe-inner" data-node-id="I7142:13171;52716:2923">
            <div class="footer__subscribe-content" data-node-id="I7142:13171;52716:2924">
              <div class="footer__subscribe-head" data-node-id="I7142:13171;52716:2925">
                <div data-node-id="I7142:13171;52716:2926">
                  <p class="footer__subscribe-title" data-node-id="I7142:13171;52716:2927">Подписаться на рассылку</p>
                  <p class="footer__subscribe-desc" data-node-id="I7142:13171;52716:2928">Получайте кейсы пользователей, статьи и обновления.</p>
                </div>
                <div class="footer__subscribe-form" data-node-id="I7142:13171;52716:2929">
                  <input
                    class="footer__input"
                    type="email"
                    placeholder="Ваш e-mail"
                    aria-label="Ваш e-mail"
                    data-node-id="I7142:13171;52716:2930"
                  />
                  <button class="footer__btn-subscribe" type="button" data-node-id="I7142:13171;52716:2935">
                    Подписаться
                  </button>
                </div>
              </div>
              <div class="footer__subscribe-checks" data-node-id="I7142:13171;52716:2936">
                <label class="footer__check-row" data-node-id="I7142:13171;52716:2938">
                  <input class="footer__checkbox" type="checkbox" checked aria-label="Согласие с политикой конфиденциальности" />
                  <span class="footer__check-label" data-node-id="I7142:13171;52716:2940">
                    Я согласен с <a href="/privacy">Политикой конфиденциальности</a> и даю
                    <a href="/personal-data"> согласие на обработку персональных данных</a>
                  </span>
                </label>
                <label class="footer__check-row" data-node-id="I7142:13171;52716:2941">
                  <input class="footer__checkbox" type="checkbox" aria-label="Согласие на рассылку" />
                  <span class="footer__check-label" data-node-id="I7142:13171;52716:2943">
                    Я согласен <a href="/newsletter">получать рассылку</a>
                    от Кайтен (обновления продукта и полезные материалы)
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div><!-- /footer__subscribe -->

      </div><!-- /footer__right -->
    </div><!-- /footer__top -->

    <!-- ── DIVIDER ──────────────────────────────────────────── -->
    <div class="footer__divider" data-node-id="7142:13172" role="separator"></div>

    <!-- ── IT STATUS ROW ────────────────────────────────────── -->
    <div class="footer__status-row" data-node-id="7142:13173">

      <div class="footer__status-left" data-node-id="7142:13174">
        <div data-node-id="7142:13175">
          <p class="footer__section-title" data-node-id="7142:13176">Официальный статус российского ИТ-разработчика</p>
          <p class="footer__section-text" data-node-id="7142:13178">
            Кайтен внесен в реестр отечественного ПО <strong>№14347</strong>,<br>
            а компания аккредитована как IT-организация
          </p>
          <a class="footer__more-link" href="/status" data-node-id="7142:13181">Подробнее &nbsp;⟶</a>
        </div>
      </div>

      <div class="footer__status-right" data-node-id="7142:13182">
        <p class="footer__section-title" data-node-id="7142:13185">Общество с ограниченной ответственностью «Кайтен Софтвер»</p>
        <div class="footer__legal-cols" data-node-id="7142:13186">
          <div class="footer__legal-col" data-node-id="7142:13187">
            <span class="footer__legal-label" data-node-id="7142:13189">ИНН</span>
            <span class="footer__legal-value" data-node-id="7142:13190">7714426252</span>
          </div>
          <div class="footer__legal-col" data-node-id="7142:13191">
            <span class="footer__legal-label" data-node-id="7142:13193">КПП</span>
            <span class="footer__legal-value" data-node-id="7142:13194">771401001</span>
          </div>
          <div class="footer__legal-col footer__legal-col--address" data-node-id="7142:13199">
            <span class="footer__legal-label" data-node-id="7142:13201">Юридический адрес</span>
            <span class="footer__legal-value" data-node-id="7142:13202">
              125252, г. Москва, проезд Берёзовой рощи,<br>дом 12, этаж 2, комната 55
            </span>
          </div>
        </div>
      </div>

    </div><!-- /footer__status-row -->

    <!-- ── DIVIDER ──────────────────────────────────────────── -->
    <div class="footer__divider" data-node-id="7142:13203" role="separator"></div>

    <!-- ── BOTTOM ────────────────────────────────────────────── -->
    <div class="footer__bottom" data-node-id="7142:13204">
      <div class="footer__bottom-row" data-node-id="7142:13206">

        <!-- Logo + contacts -->
        <div class="footer__logo-contacts" data-node-id="7142:13207">
          <div class="footer__logo" data-node-id="7142:13208">
            <a href="/" aria-label="Kaiten — на главную">
              <img
                src="https://www.figma.com/api/mcp/asset/3c4371fc-2b65-4b66-93ff-69ba3bbd7cda"
                alt="Kaiten"
                data-node-id="2780:38464"
              />
            </a>
          </div>
          <div class="footer__contacts" data-node-id="7142:13210">
            <a class="footer__contact-item" href="tel:+74994906499" data-node-id="7142:13211">
              <img src="https://www.figma.com/api/mcp/asset/d3dc37a0-f7dc-4b28-80d1-231864bd6d11" alt="" aria-hidden="true" data-node-id="7142:13212" />
              <span class="footer__contact-text" data-node-id="7142:13215">+7 (499) 490-64-99</span>
            </a>
            <a class="footer__contact-item" href="mailto:sales@kaiten.ru" data-node-id="7142:13216">
              <img src="https://www.figma.com/api/mcp/asset/8ab0a194-7fe6-4eeb-8060-e063bcee4b1b" alt="" aria-hidden="true" data-node-id="7142:13217" />
              <span class="footer__contact-text" data-node-id="7142:13220">sales@kaiten.ru</span>
            </a>
          </div>
        </div>

        <!-- Skolkovo badge -->
        <div class="footer__skolkovo" data-node-id="7142:13221">
          <div class="footer__skolkovo-inner" data-node-id="7142:13222">
            <span class="footer__skolkovo-label" data-node-id="7142:13223">Участник</span>
            <img
              class="footer__skolkovo-logo"
              src="https://www.figma.com/api/mcp/asset/5e1c6aa4-eb7f-46d3-91c1-ea6ac75912e2"
              alt="Сколково"
              data-node-id="7142:13227"
            />
          </div>
        </div>

        <!-- Social icons: VK, RuTube, habr -->
        <div class="footer__social-icons" data-node-id="7142:13228">
          <a href="https://vk.com/kaiten" target="_blank" rel="noopener" aria-label="ВКонтакте" data-node-id="7142:13229">
            <img src="https://www.figma.com/api/mcp/asset/cd58cf55-1b1c-4207-9ff7-237ca6fde5bd" alt="VK" width="24" height="24" />
          </a>
          <a href="https://rutube.ru/channel/kaiten" target="_blank" rel="noopener" aria-label="RuTube" data-node-id="7142:13230">
            <img src="https://www.figma.com/api/mcp/asset/cc56ffae-ce0e-4d86-9918-a52ccd6664aa" alt="RuTube" width="24" height="24" />
          </a>
          <a href="https://habr.com/ru/company/kaiten" target="_blank" rel="noopener" aria-label="Habr" data-node-id="7142:13231">
            <img src="https://www.figma.com/api/mcp/asset/06b3d288-f839-4f19-8b35-c20dacca99a3" alt="habr" width="40" height="14" />
          </a>
        </div>

      </div><!-- /footer__bottom-row -->

      <!-- Legal links -->
      <div class="footer__legal-links" data-node-id="7142:13234">
        <a href="/privacy"          data-node-id="7142:13236">Политика конфиденциальности</a>
        <a href="/license"          data-node-id="7142:13238">Лицензионный договор</a>
        <a href="/terms"            data-node-id="7142:13239">Пользовательское соглашение</a>
        <a href="/payment"          data-node-id="7142:13240">Оплата банковскими картами</a>
        <a href="/support"          data-node-id="7142:13241">Техническая поддержка</a>
      </div>

    </div><!-- /footer__bottom -->

  </div><!-- /footer__container -->
</footer>
```

---

## States

| Состояние     | Описание                                                               |
|---------------|------------------------------------------------------------------------|
| **Default**   | Тёмный фон `#2d2d2d`, вся информация видна                            |
| **Hover links**| Рекомендуется `opacity: 0.75` или `color: var(--k000)` для ссылок    |
| **Checkbox unchecked** | Белый фон, рамка `#d1d5db`                                   |
| **Checkbox checked**   | Фон `#7d4ccf`, рамка `#7d4ccf`, иконка галочки               |
| **Mobile**    | Стек, все колонки переходят в вертикальный список                      |

---

## Accessibility

- `<footer>` с `aria-label="Подвал сайта"`.
- Навигационные группы ссылок обёрнуты в `<nav>` с `aria-label`.
- Иконки соцсетей: `aria-hidden="true"` у декоративных, `aria-label` у ссылок.
- `<input type="email">` с `aria-label`.
- Чекбоксы обёрнуты в `<label>` для кликабельной области.
- `role="separator"` у разделителей.

---

## Changelog

| Версия | Дата       | Описание                              |
|--------|------------|---------------------------------------|
| 1.0.0  | 2026-06-05 | Первичная реализация Desktop + Mobile |
