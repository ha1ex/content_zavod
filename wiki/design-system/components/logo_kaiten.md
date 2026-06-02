---
slug: ds-component-logo-kaiten
type: design-system
created: 2026-06-03
updated: 2026-06-03
sources:
  - figma: https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=2780-38461
  - design-system/kaiten-v01/tokens.json
related:
  - wiki/design-system/colors.md
  - wiki/design-system/typography.md
  - wiki/design-system/radius.md
tags:
  - component
  - logo
  - brand
  - identity
stale: false
---

# LogoKaiten

Брендовый логотип Kaiten: знак + wordmark или отдельный знак. Используется в header, footer, brand blocks, login/empty states и материалах, где нужно быстро закрепить принадлежность интерфейса к продукту.

## Структура

- **mark** - квадратный знак `104x104` с rounded corners.
- **wordmark** - текстовая часть на русском или английском.
- **language** - `Rus | Eng`.
- **tone** - `Dark | White`.
- **view** - `Color`.

## Figma variants

- **Property 1=Dark, Language=Eng, View=Color** - полный логотип `349x104`, wordmark dark.
- **Property 1=White, Language=Eng, View=Color** - полный логотип `349x104`, wordmark white.
- **Property 1=Znak, Language=-, View=Color** - только знак `104x104`.
- **Property 1=Dark, Language=Rus, View=Color** - полный логотип `349x104`, wordmark dark.
- **Property 1=White, Language=Rus, View=Color** - полный логотип `349x104`, wordmark white.

## Geometry

- Component set frame: `389x800`, padding `20px`, vertical gap `60px`, dashed violet outline in Figma only.
- Full logo frame: `349x104`.
- Mark-only frame: `104x104`.
- Wordmark vector height: `104px`.
- English wordmark right inset: `6.32%` in the Figma export.
- Russian wordmark spans full `349px` width.

## Colors

- Dark wordmark: `#212121` for English, `#000000` in the Russian Figma vector. In product UI prefer `neutral.900` / `#212121` unless exact brand export is required.
- White wordmark: `#ffffff`.
- Mark colors are fixed brand colors and should not be token-remapped.
- Use white wordmark only on dark, violet, image, or high-contrast backgrounds.

## Usage rules

- Header default: full logo, dark wordmark, Russian language for Russian-language pages.
- Mobile header may use full logo if space allows; otherwise use mark-only.
- Footer can use full logo or text brand lockup, but do not mix two different logo treatments in one footer.
- Use mark-only for favicon-like placements, compact cards, app badges, avatars, or square brand slots.
- Keep logo as a single SVG/vector asset. Do not rebuild wordmark with live text unless the implementation intentionally needs responsive text rendering.
- Preserve aspect ratio: full logo `349:104`, mark-only `1:1`.

## Accessibility

- Linked logo must have an accessible label: `Кайтен` or `Kaiten`.
- If full logo contains both SVG mark and visible wordmark, expose one accessible name only.
- Decorative repeated logos in logo clouds should be hidden from screen readers unless they identify a customer/company list.

## Anti-patterns

- Stretching the full logo to fit a fixed-width slot.
- Recoloring the mark to match section accents.
- Using white wordmark on light gray or white backgrounds.
- Placing the logo inside a decorative card when it is already inside header/footer structure.
- Replacing the brand mark with a generic icon.
