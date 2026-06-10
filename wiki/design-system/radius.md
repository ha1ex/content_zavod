---
slug: ds-radius
type: design-system
created: 2026-05-15
updated: 2026-05-15
sources:
  - design-system/kaiten-v01/tokens.json
related:
  - wiki/design-system/components/button.md
tags:
  - tokens
  - radius
stale: false
---

# Radius

## Tokens

<!-- gen:tokens -->
| Token | Value | CSS var |
|---|---|---|
| `radius.none` | 0px | `--radius-none` |
| `radius.sm` | 2px | `--radius-sm` |
| `radius.base` | 4px | `--radius-base` |
| `radius.md` | 6px | `--radius-md` |
| `radius.lg` | 8px | `--radius-lg` |
| `radius.xl` | 12px | `--radius-xl` |
| `radius.2xl` | 16px | `--radius-2xl` |
| `radius.3xl` | 24px | `--radius-3xl` |
| `radius.4xl` | 32px | `--radius-4xl` |
| `radius.full` | 9999px (full) | `--radius-full` |
<!-- /gen:tokens -->

## Usage rules

- `lg` / `xl` (8–12px) — buttons, accordion rows, input fields, dropdown items.
- `2xl` / `3xl` (16–24px) — карточки, hero-media, large content blocks.
- `full` (9999px) — pills, badges, round buttons, avatars.
- `none` / `sm` — для табличных границ и системных секций.

## Anti-patterns

- ❌ Кастомные радиусы (например, `border-radius: 10px`). Только из шкалы.
- ❌ Использовать `full` для прямоугольных карточек — растянутая капсула выглядит «дешёвым».
