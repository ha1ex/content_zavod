---
slug: ds-grid
type: design-system
created: 2026-05-15
updated: 2026-05-15
sources:
  - design-system/kaiten-v01/tokens.json
related:
  - wiki/design-system/spacing.md
tags:
  - tokens
  - layout
stale: false
---

# Grid

## Tokens

<!-- gen:tokens -->
### Containers

| Key | Width |
|---|---|
| `kaiten` | 1216px |

### Desktop (1920px artboard)

- Container: **1216px** · 12 columns · column **72px** · gutter **32px** · outer margin **248px**

### Tablet (768px artboard)

- 6 columns · column **100px** · gutter **24px** · side margin **24px**

### Mobile (360px artboard)

- 4 columns · column **70px** · gutter **16px** · side margin **16px**
<!-- /gen:tokens -->

## Usage rules

**Desktop (artboard `1920px`).** 12-column centered grid внутри `1216px`-контейнера: column `72px`, gutter `32px`, outer margin `248px` с каждой стороны.

**Tablet (artboard `768px`).** 6-column stretch grid: column `100px`, gutter `24px`, side margin `24px`.

**Mobile (artboard `360px`).** 4-column stretch grid: column `70px`, gutter `16px`, side margin `16px`.

### Какие колонки занимать

- **Full-width section (CTA, footer):** 12 / 6 / 4 на desktop / tablet / mobile.
- **Hero content area:** 6–7 columns на desktop, full на mobile.
- **Hero media:** 4–5 columns на desktop, full ниже на mobile.
- **Feature card grid:** 3-column (cards span 4 / 6 / 12), 2-column (cards span 6 / 3 / 12), 4-column только при компактных карточках.
- **Pricing plans:** 2–4 plan-cards растягиваются на 6 / 4 / 3 columns соответственно.

## Anti-patterns

- ❌ Прыгающие брейкпойнты (например, ширина контента на tablet выходит за 6 колонок).
- ❌ Inline `style={{ width: '60%' }}` — используйте CSS Grid или Flex с column-based значениями.
