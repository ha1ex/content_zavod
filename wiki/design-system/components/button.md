---
slug: ds-component-button
type: design-system
created: 2026-05-15
updated: 2026-05-15
sources:
  - design-system/kaiten-v01/tokens.json
related:
  - wiki/design-system/colors.md
  - wiki/design-system/radius.md
tags:
  - component
  - button
stale: false
---

# Button

## Tokens

<!-- gen:tokens -->
_Блок генерируется при первом запуске `harness wiki sync`._
<!-- /gen:tokens -->

## Variants

- **Fill** (`button-fill-*`) — primary conversion actions, active icon actions, hero primary CTA, final CTA.
- **Outline** (`button-outline-*`) — secondary actions, header secondary CTAs, previous controls, neutral utility actions, icon-only phone/menu actions on white.

## States

| Variant | State | Background | Border | Text/Icon |
|---|---|---|---|---|
| Fill | default | `#7d4ccf` | — | `#ffffff` |
| Fill | hover | `#6f43b8` | — | `#ffffff` |
| Fill | focus | `#7d4ccf` + `--button-focus-brand` ring | — | `#ffffff` |
| Fill | disabled | `#f5f5f5` | — | `#9e9e9e` (no hover) |
| Outline | default | `#ffffff` | `#e0e0e0` | `#7d4ccf` |
| Outline | hover | `#efe9f9` | `rgba(125,76,207,.48)` | `#6f43b8` |
| Outline | focus | `#ffffff` + `--button-focus-default` ring | `#e0e0e0` | `#7d4ccf` |
| Outline | disabled | `#ffffff` | `#e0e0e0` | `#e0e0e0` (no hover) |

## Sizes

Из `tokens.json` (`button.sizes`). Все размеры имеют icon-only вариант с padding по высоте.

## Usage rules

- **Один primary fill на блок.** В hero — один `fill`, секондари (если есть) — `outline`. То же — в final CTA.
- **Letter spacing `-0.2px`** — задаётся в shared button styles.
- **Radius — `8px`** для всех size'ов.
- **No layout shift между states.** Hover не меняет padding / size.

## Anti-patterns

- ❌ Два fill CTA в hero. Это убивает hierarchy.
- ❌ Outline-кнопка как primary CTA на белом фоне с violet текстом — недостаточно contrast в первом виде.
- ❌ Анимировать `background-color` на disabled.
