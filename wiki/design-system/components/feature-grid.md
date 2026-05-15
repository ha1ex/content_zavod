---
slug: ds-component-feature-grid
type: design-system
created: 2026-05-15
updated: 2026-05-15
sources:
  - packages/harness/src/registry/index.ts
  - packages/harness/src/schemas/landing-spec.ts
related:
  - wiki/design-system/typography.md
  - wiki/design-system/grid.md
tags:
  - component
  - section
  - features
stale: false
---

# FeatureGrid

Сетка карточек «иконка + заголовок + описание». 2–8 items, 2/3/4 columns.

## Структура

- **eyebrow** (опц., ≤80)
- **title** (4..80)
- **description** (опц., ≤200)
- **items** (2..8) — каждый: `{ icon: string, title: 2..60, description: 10..200 }`
- **columns** — `2 | 3 | 4`, default `3`.

## Layout

- **3-column (default).** Items занимают 4/6/12 columns на desktop/tablet/mobile.
- **2-column.** Items занимают 6/3/12 columns. Для пар (например, before/after).
- **4-column.** Items занимают 3/3/6 columns. Только при коротких карточках — иначе перегружено.

## Typography

- Section title: `text-3xl` / `text-4xl`, SemiBold.
- Section description: `text-lg`, Regular, `neutral.600`.
- Item title: `text-xl`, SemiBold.
- Item description: `text-md`, Regular.

## Usage rules

- Все item.title уникальны внутри секции (`titles_unique_per_section` constraint).
- Иконка — обязательна (`feature-icon` validator: непустая строка).
- Каждый item — **outcome / capability**, не feature-list.

## Anti-patterns

- ❌ 1 item — это не grid, переделайте в `HeroSection` visual или вынесите как text-block.
- ❌ Длинные descriptions (>200) — это уже case study, не feature.
- ❌ Generic-иконки типа «check-mark» без значения. Каждая иконка должна обозначать категорию.
