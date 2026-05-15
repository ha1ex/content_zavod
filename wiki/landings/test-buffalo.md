---
slug: test-buffalo
type: landing
created: 2026-05-15
updated: 2026-05-15
status: draft
brief: content/briefs/buffalo.json
archetype: saas_landing
goal: book_demo
sources:
  - wiki/design-system/voice.md
  - wiki/design-system/colors.md
  - wiki/design-system/typography.md
  - wiki/design-system/spacing.md
  - wiki/design-system/radius.md
  - wiki/design-system/motion.md
  - wiki/design-system/grid.md
  - wiki/design-system/components/hero.md
  - wiki/design-system/components/feature-grid.md
  - wiki/design-system/components/pricing.md
  - wiki/design-system/components/faq.md
  - wiki/design-system/components/accordion.md
  - wiki/design-system/components/final-cta.md
  - wiki/design-system/components/footer.md
  - wiki/design-system/components/button.md
  - wiki/archetypes/saas_landing.md
  - packages/harness/src/skills/conversion-landing.md
sections:
  - hero
  - features
  - pricing
  - faq
  - final_cta
  - footer
generator: host-agent
durationMs: 0
tokenEstimate: 15165
tags:
  - landing
  - saas_landing
stale: false
---
# Landing summary

<!-- gen:spec-meta -->
- **slug:** `test-buffalo`
- **brief:** `content/briefs/buffalo.json`
- **archetype:** `saas_landing`
- **goal:** `book_demo` (brief.cta = "Получить демо")
- **sections used:** `hero, features, pricing, faq, final_cta, footer`
- **token estimate:** `15165`
- **generation duration:** `0ms`
- **generator:** `host-agent`

**Sources (использованы в системном промпте):**
- `wiki/design-system/voice.md`
- `wiki/design-system/colors.md`
- `wiki/design-system/typography.md`
- `wiki/design-system/spacing.md`
- `wiki/design-system/radius.md`
- `wiki/design-system/motion.md`
- `wiki/design-system/grid.md`
- `wiki/design-system/components/hero.md`
- `wiki/design-system/components/feature-grid.md`
- `wiki/design-system/components/pricing.md`
- `wiki/design-system/components/faq.md`
- `wiki/design-system/components/accordion.md`
- `wiki/design-system/components/final-cta.md`
- `wiki/design-system/components/footer.md`
- `wiki/design-system/components/button.md`
- `wiki/archetypes/saas_landing.md`
- `packages/harness/src/skills/conversion-landing.md`
<!-- /gen:spec-meta -->

## Sections

<!-- gen:sections-summary -->
### hero (HeroSection)

- **title:** "Лендинг по брифу за минуту, а не за неделю"
- **subtitle:** "Маркетинг описывает продукт в JSON — Buffalo собирает TSX-страницу на ваших компонентах, прогоняет валидаторы и отдаёт готовый PR." _(130/200 chars)_
- **primaryCta:** "Получить демо" → `/demo`
- **secondaryCta:** "Как это работает"
- **visual:** `product_screenshot` (assetId: `buffalo-hero`)

### features (FeatureGrid)

- **title:** "Контролируемый контур вокруг LLM"
- **columns:** 3 · **items:** 6
  1. `FileText` · "Бриф → JSON" — 96 chars
  2. `Layers` · "Только ваши компоненты" — 87 chars
  3. `ShieldCheck` · "Валидаторы на каждом шаге" — 87 chars
  4. `FileCode` · "TSX, который ревью как PR" — 86 chars
  5. `Workflow` · "Storybook и preview" — 77 chars
  6. `Package` · "Handoff одной командой" — 73 chars

### pricing (PricingPlans)

- **title:** "Старт с пилота, рост по мере нужды"
- **plans:** 3
  1. **Pilot** — 0 ₽// месяц (4 features)
  2. **Team** ⭐ — ₽ по запросу// месяц (5 features)
  3. **Enterprise** — Договор (5 features)

### faq (FAQAccordion)

- **title:** "Что обычно спрашивают"
- **items:** 5 Q&A
  1. "Мы получим обычный код или закрытую платформу?" — answer 163/600 chars
  2. "Что мешает модели вставить лишний блок или придумать новый?" — answer 156/600 chars
  3. "Как поддерживается фирменный стиль и тон?" — answer 146/600 chars
  4. "Подходит ли это команде без LLM-инфраструктуры?" — answer 167/600 chars
  5. "Что если результат нужно подправить вручную?" — answer 148/600 chars

### final_cta (FinalCta)

- **title:** "Соберите первый лендинг сегодня"
- **primaryCta:** "Получить демо" → `/demo`

### footer (LandingFooter)

- **brand:** "Buffalo"
- **columns:** 3
<!-- /gen:sections-summary -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

