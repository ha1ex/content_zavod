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
### Neutral scale

| Token | Value | CSS var |
|---|---|---|
| `neutral.100` | `#f5f5f5` | `--color-neutral-100` |
| `neutral.200` | `#eeeeee` | `--color-neutral-200` |
| `neutral.300` | `#e0e0e0` | `--color-neutral-300` |
| `neutral.400` | `#bdbdbd` | `--color-neutral-400` |
| `neutral.500` | `#9e9e9e` | `--color-neutral-500` |
| `neutral.600` | `#757575` | `--color-neutral-600` |
| `neutral.700` | `#616161` | `--color-neutral-700` |
| `neutral.800` | `#424242` | `--color-neutral-800` |
| `neutral.900` | `#2d2d2d` | `--color-neutral-900` |
| `neutral.950` | `#121212` | `--color-neutral-950` |
| `neutral.000` | `#ffffff` | `--color-neutral-000` |
| `neutral.050` | `#fafafa` | `--color-neutral-050` |

### Accent colors

| Token | Value | CSS var |
|---|---|---|
| `accent.violet-100` | `#7d4ccf` | `--color-violet-100` |
| `accent.violet-12` | `#efe9f9` | `--color-violet-12` |
| `accent.purple-100` | `#ab47bd` | `--color-purple-100` |
| `accent.purple-12` | `#f4e8f7` | `--color-purple-12` |
| `accent.blue-100` | `#2196f3` | `--color-blue-100` |
| `accent.blue-12` | `#e4f2fd` | `--color-blue-12` |
| `accent.green-100` | `#4caf51` | `--color-green-100` |
| `accent.green-12` | `#e9f5ea` | `--color-green-12` |
| `accent.lime-100` | `#a5ca00` | `--color-lime-100` |
| `accent.lime-12` | `#f4f8e0` | `--color-lime-12` |
| `accent.orange-100` | `#ffa100` | `--color-orange-100` |
| `accent.orange-12` | `#fff3e0` | `--color-orange-12` |
| `accent.red-100` | `#f44336` | `--color-red-100` |
| `accent.red-12` | `#fde8e6` | `--color-red-12` |

### Semantic aliases

| Token | Resolves to | CSS var |
|---|---|---|
| `semantic.text-primary` | `#2d2d2d` ({neutral.900}) | `--color-text-primary` |
| `semantic.text-secondary` | `#757575` ({neutral.600}) | `--color-text-secondary` |
| `semantic.text-inverse` | `#ffffff` ({neutral.000}) | `--color-text-inverse` |
| `semantic.text-accent` | `#7d4ccf` ({accent.violet-100}) | `--color-text-accent` |
| `semantic.surface-page` | `#ffffff` ({neutral.000}) | `--color-surface-page` |
| `semantic.surface-section` | `#f5f5f5` ({neutral.100}) | `--color-surface-section` |
| `semantic.surface-card` | `#ffffff` ({neutral.000}) | `--color-surface-card` |
| `semantic.border-default` | `#e0e0e0` ({neutral.300}) | `--color-border-default` |
| `semantic.action-primary` | `#7d4ccf` ({accent.violet-100}) | `--color-action-primary` |
| `semantic.action-primary-hover` | `#6f43b8` (#6f43b8) | `--color-action-primary-hover` |
| `semantic.action-primary-soft` | `#efe9f9` ({accent.violet-12}) | `--color-action-primary-soft` |
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
