---
slug: ds-spacing
type: design-system
created: 2026-05-15
updated: 2026-05-15
sources:
  - design-system/kaiten-v01/tokens.json
related:
  - wiki/design-system/grid.md
tags:
  - tokens
  - spacing
stale: false
---

# Spacing

4px-based scale. Источник — `design-system/kaiten-v01/tokens.json`.

## Tokens

<!-- gen:tokens -->
_Блок генерируется при первом запуске `harness wiki sync`._
<!-- /gen:tokens -->

Читайте `12/48` как `token / pixels` (то есть `spacing-12 = 48px`).

## Usage rules

### Desktop

| Контекст | Spacing |
|---|---|
| Header height | `80px` |
| Header / menu rhythm | `12 / 48` |
| Text stack gap (заголовок → описание) | `4 / 16` |
| Text → CTA gap | `6 / 24` |
| Hero content → media | `12 / 48` или `16 / 64` (по визуальному весу) |
| Grid / card gap | `32px` |
| Section vertical spacing | `20 / 80` или `24 / 96` |
| Close elements в группе | `3 / 12` |

### Tablet / Mobile

| Контекст | Tablet | Mobile |
|---|---|---|
| Header height | `72px` | `72px` |
| Side padding | `24px` | `16px` |
| Compact internal gap | `3 / 12` | `3 / 12` |
| Medium internal gap | `4 / 16` | `4 / 16` |
| Text → action gap | `6 / 24` | `6 / 24` |
| Larger block gap | `8 / 32` | `8 / 32` |
| Section spacing | `9 / 36` или `12 / 48` | `9 / 36` |
| Grid step | `24px` | `16px` |

## Anti-patterns

- ❌ Свободные значения (например, `padding: 22px`). Только из shкалы.
- ❌ Нестандартные секционные паддинги (>96px). Если нужно больше воздуха — это сигнал переосмыслить иерархию.
