---
slug: ds-component-badge
type: design-system
created: 2026-06-03
updated: 2026-06-03
sources:
  - figma: https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=4633-10385
  - design-system/kaiten-v01/tokens.json
related:
  - wiki/design-system/colors.md
  - wiki/design-system/typography.md
  - wiki/design-system/radius.md
tags:
  - component
  - badge
  - pill
  - label
stale: false
---

# Badge

Короткая pill-метка для статуса, категории, тега или небольшого акцента внутри landing-блока. Badge не должен конкурировать с CTA: это вспомогательный маркер, который помогает быстро считать контекст.

## Структура

- **label** (1..40) - короткий текст без точки в конце.
- **icon** (опц.) - маленькая иконка слева, если она добавляет смысл: статус, интеграция, тип объекта.
- **variant** - `neutral | violet | soft-violet | success | info | warning | danger`.
- **size** - `sm | md`, default `md`.

## Variants

- **Neutral.** Белый или `neutral.100` фон, `neutral.300` border, текст `neutral.700`. Для категорий и спокойных меток.
- **Violet.** `violet-100` фон, белый текст. Только для сильного акцента или active status.
- **Soft violet.** `violet-12` фон, текст `violet-100`. Default для eyebrow-like меток в секциях.
- **Success / info / warning / danger.** Используйте семантические accent-пары: `green`, `blue`, `orange`, `red`. Только когда статус действительно несет значение.

## Layout

- Badge всегда inline-flex, не растягивается на всю ширину.
- Radius - `radius/full`.
- Внутренний gap между icon и label - `spacing/1` (`4px`) для `sm`, `spacing/1_5` (`6px`) для `md`.
- `sm`: height `24px`, padding `4px 8px`, label `text-xs`, icon `12..14px`.
- `md`: height `28..32px`, padding `6px 10px` или `6px 12px`, label `text-sm`, icon `14..16px`.

## Typography

- Label: `text-xs` или `text-sm`, Medium.
- Letter spacing - `0`.
- Текст не переносится внутри badge; если label длиннее 40 символов, перепишите label.

## Usage rules

- Badge ставится над заголовком секции, внутри карточки рядом с названием или в строке метаданных.
- В одном плотном блоке используйте 1-3 badge. Больше - это уже фильтры или список тегов.
- Для eyebrow в section heading чаще выбирайте `soft-violet`, а не filled violet.
- Семантические цвета используйте только для реальных статусов, не для декоративной раскраски.
- На темном или цветном фоне проверяйте контраст и используйте белый фон badge, если soft-вариант теряется.

## Anti-patterns

- Длинный badge вместо подзаголовка или CTA.
- Filled violet badge рядом с primary fill-кнопкой без причины.
- Смешивать все accent-цвета в одном блоке ради визуального разнообразия.
- Использовать badge как интерактивную кнопку без hover/focus/pressed states.
