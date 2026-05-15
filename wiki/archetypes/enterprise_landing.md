---
slug: archetype-enterprise-landing
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
  - enterprise
  - landing
stale: false
---

# Enterprise landing — archetype

`pageType: enterprise_landing` в LandingSpec. B2B продажа в крупные компании.

## Целевые goals

`book_demo`, `contact_sales`.

## Обязательные секции (порядок)

1. **HeroSection** — обещание для enterprise audience (security, scale, compliance, ROI). Primary CTA = «Поговорить с продажами».
2. **FeatureGrid** — capabilities группированы по enterprise concerns: security, integrations, SLAs, support.
3. **(опц.) Дополнительный FeatureGrid** — case-studies / customer logos в виде feature-grid с logo как icon.
4. **PricingPlans** — обычно **Enterprise** и **Custom** (2 plan-cards), с «Связаться» CTA.
5. **FAQAccordion** — enterprise-specific: SOC 2, GDPR, on-prem, SSO, data residency, contract terms.
6. **FinalCta** — «Запросите демо» / «Свяжитесь с продажами».
7. **LandingFooter** — расширенный (4–5 columns) с compliance / security links.

## Когда **не** включать секцию

- **PricingPlans:** если цены полностью «по запросу» — лучше отдельный pricing-page с формой.

## Длина

- Total sections: **5–8**.
- Total prose tokens: ~2500–4500.

## Tone tweaks

- **Конкретные цифры, не abstractions.** «99.99% uptime SLA», «<500ms p99 latency», «ISO 27001 certified».
- **Proof points обязательны** (`proofPoints` из brief).
- **Logo cloud** — отдельная sub-секция или `visual: logo_cloud` в hero.

## Anti-patterns

- ❌ Generic copy («Перейдите на enterprise-уровень»). Должны быть конкретные enterprise pain-points.
- ❌ Self-service signup CTA на enterprise lp — это сбивает audience.
- ❌ FAQ без security-вопросов — это первое, что enterprise team спросит.
