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
### Base
- Radius: **8px**
- Letter spacing: **-0.2px**
- Font family override: **Roboto**
- Font weight: **Medium**
### Sizes
| Size | Height | Padding (y/x) | Icon gap | Icon size | Label scale |
|---|---|---|---|---|---|
| `sm` | 40px | 10px / 14px | 6px | 20px | `text-sm` |
| `md` | 44px | 10px / 16px | 4px | 24px | `text-md` |
| `lg` | 48px | 12px / 20px | 4px | 24px | `text-md` |
### Fill variant
| Property | Value |
|---|---|
| `bg` | `#7d4ccf` |
| `bgHover` | `#6f43b8` |
| `bgDisabled` | `#f5f5f5` |
| `text` | `#ffffff` |
| `textDisabled` | `#9e9e9e` |
### Outline variant
| Property | Value |
|---|---|
| `bg` | `#ffffff` |
| `bgHover` | `#efe9f9` |
| `border` | `#e0e0e0` |
| `borderHover` | `rgba(125, 76, 207, 0.48)` |
| `text` | `#7d4ccf` |
| `textHover` | `#6f43b8` |
| `textDisabled` | `#e0e0e0` |
### Focus rings
| Token | Value |
|---|---|
| `brand` | `0 0 0 4px rgba(55, 88, 249, 0.2)` |
| `default` | `0 0 0 4px rgba(152, 162, 179, 0.14)` |
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
