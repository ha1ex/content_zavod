---
slug: ds-component-content-block
type: design-system
created: 2026-06-03
updated: 2026-06-03
sources:
  - figma: https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=4255-64374
  - design-system/kaiten-v01/tokens.json
related:
  - wiki/design-system/components/badge.md
  - wiki/design-system/components/button.md
  - wiki/design-system/components/step-marker.md
  - wiki/design-system/grid.md
  - wiki/design-system/spacing.md
tags:
  - component
  - block
  - content
  - section
stale: false
---

# ContentBlock

Переиспользуемый landing-блок для компактной смысловой группы: badge или step marker, заголовок, описание, опциональный CTA и визуальный/иконный акцент. Подходит для преимуществ, этапов процесса, карточек возможностей и explainers внутри секции.

## Структура

- **badge** (опц.) - короткая категория или статус, см. `Badge`.
- **marker** (опц.) - номер или check, см. `StepMarker`.
- **title** (4..80) - основной тезис блока.
- **description** (10..220, опц.) - пояснение на 1-2 предложения.
- **media** (опц.) - иконка, UI-fragment, screenshot или небольшая иллюстрация.
- **cta** (опц.) - secondary action или text link; primary CTA допускается только в hero/final-like блоках.

## Variants

- **Text only.** Title + description, без рамки и без media. Для плотных секций.
- **With badge.** Badge над title, когда нужен контекст: роль, категория, статус.
- **With marker.** Marker слева или сверху, когда блок является шагом процесса.
- **Card.** Белая поверхность, subtle border/shadow, внутренние отступы. Для повторяемой сетки.
- **Media block.** Текст + визуальный фрагмент. На desktop допускается двухколоночная композиция, на mobile - stack.

## Layout

- Используйте `grid.container.kaiten` (`1216px`) и существующие responsive grids.
- Внутренний padding card-варианта: `24..32px` desktop, `16..24px` mobile.
- Gap между badge/marker и title: `spacing/3` (`12px`) или `spacing/4` (`16px`).
- Gap title -> description: `spacing/2..3` (`8..12px`).
- Gap text -> CTA/media: `spacing/6..8` (`24..32px`).
- Radius card-варианта - `radius/2xl` или `radius/3xl`; для малых cards не превышайте `radius/2xl`.
- Border - `neutral.200` или `neutral.300`, фон - `neutral.000`; section background может быть `neutral.100`.

## Typography

- Title: `text-xl` или `text-2xl`, SemiBold.
- Description: `text-md`, Regular, `neutral.600`.
- Badge label: `text-xs` или `text-sm`, Medium.
- Не используйте hero-scale typography внутри ContentBlock.

## Responsive

- Desktop: блок может занимать 4, 6, 8 или 12 grid columns в зависимости от роли.
- Tablet: сохраняйте читаемую ширину текста; media не должен сжимать title до коротких рваных строк.
- Mobile: stack в одну колонку, side padding `16px`, media идет после текста, если не является главным объектом блока.

## Usage rules

- Один ContentBlock должен выражать один outcome или один шаг, не список несвязанных возможностей.
- Если блоки повторяются в grid, сохраняйте одинаковую структуру и одинаковые размеры markers/badges.
- CTA внутри card-варианта должен быть вторичным; primary CTA оставляйте уровню секции.
- Media должен объяснять продукт или состояние, а не быть декоративным заполнителем.
- Для process-сценариев используйте `StepMarker`; для категорий и статусов - `Badge`.

## Anti-patterns

- Вкладывать card в card: ContentBlock не должен становиться плавающей карточкой внутри другой карточки.
- Ставить одновременно badge, marker, крупную иконку и CTA, если это не нужно для смысла.
- Делать все блоки violet-accent: акцент должен показывать активность или важность.
- Растягивать description на несколько абзацев. Если текста много, это отдельная секция или case block.
