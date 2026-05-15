---
slug: archetype-saas-landing
type: archetype
created: 2026-05-15
updated: 2026-05-15
sources:
  - packages/harness/src/schemas/landing-spec.ts
related:
  - wiki/design-system/components/hero.md
  - wiki/design-system/components/feature-grid.md
  - wiki/design-system/components/pricing.md
  - wiki/design-system/components/faq.md
  - wiki/design-system/components/final-cta.md
  - wiki/design-system/components/footer.md
tags:
  - archetype
  - saas
  - landing
stale: false
---

# SaaS landing — archetype

`pageType: saas_landing` в LandingSpec. Самый частый тип для Buffalo.

## Целевые goals

`book_demo`, `signup`, `try_free`, `contact_sales` (реже).

## Обязательные секции (порядок)

1. **HeroSection** — главное обещание + primaryCta = brief.cta.
2. **FeatureGrid** — 3–6 outcomes / capabilities (не feature-list).
3. **(опц.) FeatureGrid #2** — для глубокого продукта; second pass с более конкретными use-case'ами.
4. **PricingPlans** (если есть тарифы) — 2–4 plans, один highlighted.
5. **FAQAccordion** — топ-возражения (цена, интеграция, безопасность, кому подходит).
6. **FinalCta** — повтор обещания + primaryCta (matches goal).
7. **LandingFooter** — обязательный.

## Когда **не** включать секцию

- **PricingPlans:** если goal=`contact_sales` (пускай менеджеры обсуждают цену) или продукт ещё в waitlist (тогда archetype = waitlist_landing).
- **FAQAccordion:** если у продукта < 2 непротиворечивых вопросов. Не наполняйте маркетинговыми вопросами.

## Длина

- Total sections: **4–7**.
- Total prose tokens: ~1500–3000.

## Audience patterns

Связанные `wiki/audiences/*.md` (если есть): pm-saas, marketing-lead, devops, founder-bootstrap.

## Anti-patterns

- ❌ Hero обещает X, FinalCta обещает Y. Должно быть согласовано.
- ❌ Цены без CTA на каждом плане.
- ❌ FAQ с 1 элементом — лучше убрать.
