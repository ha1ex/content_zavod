---
slug: archetype-waitlist-landing
type: archetype
created: 2026-05-15
updated: 2026-05-15
sources:
  - packages/harness/src/schemas/landing-spec.ts
related:
  - wiki/design-system/components/hero.md
  - wiki/design-system/components/feature-grid.md
  - wiki/design-system/components/final-cta.md
  - wiki/design-system/components/footer.md
tags:
  - archetype
  - waitlist
  - landing
stale: false
---

# Waitlist landing — archetype

`pageType: waitlist_landing` в LandingSpec. Pre-launch / closed-beta.

## Целевые goals

`waitlist`, `signup`, `download` (для desktop apps).

## Обязательные секции (порядок)

1. **HeroSection** — promise + email-collection CTA.
2. **FeatureGrid** — 3–5 преимуществ. Можно опционально 2-col layout (before/after).
3. **(опц.) FAQAccordion** — 2–6 вопросов про доступ, дату релиза, ранний доступ vs final pricing.
4. **FinalCta** — secondary collection point с тем же CTA.
5. **LandingFooter** — обязательный (минималистичный — 1–2 column).

## Когда **не** включать секцию

- **PricingPlans:** НИКОГДА для waitlist. Если есть pricing — это уже SaaS landing.
- **FAQAccordion:** опционально, но обычно полезно для снятия страхов («Это бесплатно?», «Когда запуск?»).

## Длина

- Total sections: **3–5**.
- Total prose tokens: ~800–1500.

## Tone tweaks

- Создавайте **anticipation**, но без false urgency.
- Конкретика про timing — допустима («запуск в Q3 2026»), но без обещаний-капканов («ровно в марте»).

## Anti-patterns

- ❌ FOMO-копи («Осталось 47 мест!»). Это hype, нарушает voice.md.
- ❌ Pricing-секция (это уже не waitlist).
- ❌ «Подпишитесь на новости» как primaryCta — слабо. Должна быть конкретная ценность waitlist'а (ранний доступ, скидка, beta-приглашение).
