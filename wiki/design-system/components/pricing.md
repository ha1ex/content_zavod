---
slug: ds-component-pricing
type: design-system
created: 2026-05-15
updated: 2026-05-15
sources:
  - packages/harness/src/registry/index.ts
  - packages/harness/src/schemas/landing-spec.ts
related:
  - wiki/design-system/typography.md
  - wiki/design-system/components/button.md
tags:
  - component
  - section
  - pricing
stale: false
---

# PricingPlans

2–4 тарифа с фичами и CTA. Один план может быть `highlighted: true`.

## Структура

- **eyebrow** (опц.)
- **title** (4..80)
- **description** (опц., ≤200)
- **plans** (2..4) — `{ name: 2..40, price: 1..20, pricePeriod?: <=20, description?: <=120, features: 1..10 strings, cta, highlighted? }`

## Layout

- **3-plan grid (default).** Cards 4/4/4 на desktop, full-width stack на mobile.
- **2-plan.** Cards 6/6, центрированы.
- **4-plan.** Cards 3/3/3/3. Используйте только если действительно 4 тарифа.

## Usage rules

- At most one `highlighted: true` (`at_most_one_highlighted` constraint).
- Highlighted card — soft-violet bg (`accent.violet-12`), border `accent.violet-100`.
- Each plan has CTA (`each_plan_has_cta` constraint). CTA href может вести на signup с pre-selected plan.
- `price` — display string, не number. Поддержите «Бесплатно», «По запросу», «$0/мес», «1 990 ₽/мес».
- `features` — outcomes/inclusions, не tech-specs.

## Anti-patterns

- ❌ Все 4 плана highlighted. Подсветка теряет смысл.
- ❌ Plan без CTA (`each_plan_has_cta` constraint fail).
- ❌ Скрытые фичи в коде («connect with us to see»). Если фича есть — упомяните.
