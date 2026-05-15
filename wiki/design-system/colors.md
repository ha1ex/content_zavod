---
slug: ds-colors
type: design-system
created: 2026-05-15
updated: 2026-05-15
sources:
  - design-system/kaiten-v01/tokens.json
related:
  - wiki/design-system/typography.md
  - wiki/design-system/components/button.md
tags:
  - tokens
  - color
stale: false
---

# Colors

Источник значений — `design-system/kaiten-v01/tokens.json`. Блок ниже автогенерируется командой `pnpm harness -- wiki sync`. **Не редактируйте руками.** Usage rules в конце страницы — редактируются.

## Tokens

<!-- gen:tokens -->
_Блок генерируется при первом запуске `harness wiki sync`._
<!-- /gen:tokens -->

## Usage rules

**Primary interaction color — violet.** Используйте `accent.violet-100` (`#7d4ccf`) для:

- CTA-кнопок (`fill` variant)
- ссылок в тексте и навигации
- активных состояний (selected tab, focused input)
- иконок в активном состоянии
- открытых аккордеонов (border + title)
- carousel «next»-контрола (filled circular button)

**Neutral grays — для иерархии и UI-шасси.** Используйте `neutral.*` для:

- иерархии текста (`text-primary` для тела, `text-secondary` для метаданных)
- бордеров (`border-default = neutral.300`)
- фонов секций (`surface-section = neutral.100` для светло-серых разделителей)
- неактивных UI (disabled buttons, inactive tabs, dim icons)

**Soft tints (12-токены) — для подложек.** Используйте `*-12` варианты для:

- hover background у outline-кнопок (`violet-12`)
- soft action highlights
- декоративных бэкграундов карточек

**Семантические алиасы — это контракт.** Когда возможно, используйте `text-primary`, `surface-page`, `action-primary` вместо raw `neutral.900`, `neutral.000`, `violet.100`. При смене темы будущий dark mode перенастроит только алиасы.

## Anti-patterns

- ❌ Использовать accent (кроме violet) на CTA. Violet — единственный primary. Остальные accent — для иллюстраций, иконок-категорий, illustration-spec.
- ❌ Использовать neutral-950 (`#121212`) как text color. Body text — `neutral.900` (`#2d2d2d`).
- ❌ Hardcoded hex в TSX-компонентах. Только CSS-переменные.
