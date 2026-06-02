---
slug: ds-component-icon-box
type: design-system
created: 2026-06-03
updated: 2026-06-03
sources:
  - figma: Icon Box component set, pasted Figma CSS
  - design-system/kaiten-v01/tokens.json
related:
  - wiki/design-system/colors.md
  - wiki/design-system/radius.md
  - wiki/design-system/components/badge.md
tags:
  - component
  - icon
  - icon-box
  - plaque
stale: false
---

# IconBox

Плашка с иконкой для landing-блоков, карточек, списков преимуществ и компактных продуктовых пояснений. IconBox визуально выделяет смысловую категорию, но не является самостоятельной кнопкой.

## Структура

- **icon** - системная иконка внутри плашки.
- **size** - `64 | 56 | 48 | 36 | 24`.
- **color** - `Light | Accent`.
- **view** - `Color`.

## Figma variants

| Size | Color | Box | Padding | Icon | Radius | Background | Icon stroke |
|---|---|---:|---:|---:|---:|---|---|
| 64 | Light | `64x64` | `8px` | `32x32` | `12px` | `#EFE9F9` | `#7D4CCF`, `2.70899px` |
| 64 | Accent | `64x64` | `8px` | `32x32` | `12px` | `#7D4CCF` | `#FFFFFF`, `2.70899px` |
| 56 | Light | `56x56` | `7px` | `28x28` | `12px` | `#EFE9F9` | `#7D4CCF`, `2.37037px` |
| 56 | Accent | `56x56` | `7px` | `28x28` | `12px` | `#7D4CCF` | `#FFFFFF`, `2.37037px` |
| 48 | Light | `48x48` | `6px` | `24x24` | `10.2857px` | `#EFE9F9` | `#7D4CCF`, `2.03175px` |
| 48 | Accent | `48x48` | `6px` | `24x24` | `10.2857px` | `#7D4CCF` | `#FFFFFF`, `2.03175px` |
| 36 | Light | `36x36` | `4.5px` | `24x24` | `7.71428px` | `#EFE9F9` | `#7D4CCF`, `2.03175px` |
| 36 | Accent | `36x36` | `4.5px` | `24x24` | `7.71428px` | `#7D4CCF` | `#FFFFFF`, `2.03175px` |
| 24 | Light | `24x24` | `4.5px` | `24x24` | `7.71428px` | transparent | `#7D4CCF`, `2.03175px` |
| 24 | Accent | `24x24` | `4.5px` | `24x24` | `7.71428px` | transparent | `#FFFFFF`, `2.03175px` |

## Visual style

- Light background: `accent.violet-12` / `#EFE9F9`.
- Accent background: `accent.violet-100` / `#7D4CCF`.
- Light icon color: `accent.violet-100`.
- Accent icon color: `neutral.000`.
- Light shadow: `inset 0 0 3px rgba(0, 0, 0, 0.15)`.
- Accent shadow: `inset 0 0 4px rgba(0, 0, 0, 0.35)`.

## Usage rules

- Use `64` or `56` for hero-adjacent cards and large feature cards.
- Use `48` for regular feature grids and content cards.
- Use `36` for dense lists, small cards, and UI-like rows.
- Use `24` only as an inline icon treatment without filled plaque background.
- Light variant is the default for calm B2B sections.
- Accent variant is reserved for active, highlighted, or primary items inside a group.
- Keep the icon centered and use one icon style within one section.

## Anti-patterns

- Using IconBox as a clickable control without button semantics, hover, focus, and pressed states.
- Mixing multiple sizes in one repeated card grid.
- Putting long text inside the icon plaque.
- Recoloring the icon box with arbitrary accent colors outside the defined `Light` and `Accent` variants.
- Using the `24` transparent variant as a large card icon.
