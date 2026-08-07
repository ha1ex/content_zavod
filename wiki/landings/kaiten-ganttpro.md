---
slug: kaiten-ganttpro
type: landing
created: 2026-07-30
updated: 2026-08-07
status: draft
brief: content/briefs/kaiten-ganttpro.json
archetype: saas_landing
goal: try_free
sources:
  - wiki/brand/redpolitika.md
  - wiki/references/kaiten-product-facts.md
  - wiki/references/anglicism-dictionary.md
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
  - packages/harness/src/prompts/section-mock-skill.md
  - wiki/layouts/index.md
sections:
  - site_header
  - hero
  - accordion_feature
  - cta_buttons
  - comparison_table
  - cta_banner
  - tabbed_feature
  - features
  - cta_buttons
  - final_cta
  - faq
  - legal_note
  - kaiten_footer
generator: host-agent
durationMs: 0
tokenEstimate: 48142
tags:
  - landing
  - saas_landing
stale: false
---
# Landing summary

<!-- gen:spec-meta -->
- **slug:** `kaiten-ganttpro`
- **brief:** `content/briefs/kaiten-ganttpro.json`
- **archetype:** `saas_landing`
- **goal:** `try_free` (brief.cta = "Попробовать бесплатно")
- **sections used:** `site_header, hero, accordion_feature, cta_buttons, comparison_table, cta_banner, tabbed_feature, features, cta_buttons, final_cta, faq, legal_note, kaiten_footer`
- **token estimate:** `48142`
- **generation duration:** `0ms`
- **generator:** `host-agent`

**Sources (использованы в системном промпте):**
- `wiki/brand/redpolitika.md`
- `wiki/references/kaiten-product-facts.md`
- `wiki/references/anglicism-dictionary.md`
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
- `packages/harness/src/prompts/section-mock-skill.md`
- `wiki/layouts/index.md`
<!-- /gen:spec-meta -->

## Sections

<!-- gen:sections-summary -->
### site_header (SiteHeader)


### hero (HeroSection)

- **title:** "Кайтен — альтернатива GanttPRO"
- **subtitle:** "Все, что есть в GanttPRO для планирования проектов — плюс канбан-доски, документы, Agile-инструменты и полноценное мобильное приложение" _(135/200 chars)_
- **primaryCta:** "Попробовать бесплатно" → `/signup`
- **visual:** `product_screenshot` (assetId: `kaiten-ganttpro-board`)

### accordion_feature (AccordionFeatureSection)


### cta_buttons (CtaButtons)


### comparison_table (ComparisonTable)


### cta_banner (CtaBanner)


### tabbed_feature (TabbedFeatureSection)


### features (FeatureGrid)

- **title:** "Одна платформа для всей компании"
- **columns:** 2 · **items:** 4
  1. `square-kanban` · "Скрам и канбан" — 185 chars
  2. `users` · "CRM" — 144 chars
  3. `book-open` · "Документы и база знаний" — 190 chars
  4. `life-buoy` · "Служба поддержки" — 176 chars

### cta_buttons (CtaButtons)


### final_cta (FinalCta)

- **title:** "Попробуйте Kaiten бесплатно"
- **primaryCta:** "Попробовать бесплатно" → `/signup`

### faq (FAQAccordion)

- **title:** "Ответы на частые вопросы"
- **items:** 4 Q&A
  1. "Какие тарифы есть в Кайтен и можно ли использовать инструмент бесплатно?" — answer 373/600 chars
  2. "Как работает пробный период?" — answer 354/600 chars
  3. "Как перенести проект из GanttPRO в Кайтен?" — answer 278/600 chars
  4. "Как начать пользоваться Кайтен?" — answer 315/600 chars

### legal_note (LegalNote)


### kaiten_footer (LandingFooterMock)
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
# Audience score — `kaiten-ganttpro`

- **Score:** 76.33 / 100 (threshold 70) — ✅ pass
- **Resolved segments:** IT
- **CTA types detected:** Trial
- **Generated:** 2026-08-07T14:45:00.409Z

## Breakdown

| ID | Subscore | Raw | Weight | Weighted | Detail |
|---|---|---|---|---|---|
| S1 | Story coverage | 65.82 | 0.4 | 26.33 | top-6 stories: compare(w=0.98, c=0.82), migrate-jira(w=0.95, c=0.77), fast-check(w=0.94, c=0.77), ux-check(w=0.71, c=0.53), sandbox(w=0.62, c=0.77), security(w=0.53, c=0.00) |
| S2 | Segment fit | 100 | 0.3 | 30 | mentioned=1/1 [IT] |
| S3 | Role addressability | 50 | 0.2 | 10 | PM=1.00, DM=0.00 |
| S4 | CTA alignment | 100 | 0.1 | 10 | cta-types=[Trial], match=1/1 |

## Story coverage (top-N)

| Story | Weight | Covered | Status |
|---|---|---|---|
| compare — Хочу сравнить с тем, что уже есть | 0.98 | 0.83 | ✅ covered |
| migrate-jira — Хочу понять, стоит ли переезжать с Jira | 0.95 | 0.77 | ✅ covered |
| fast-check — Хочу быстро проверить, подойдёт ли нам | 0.94 | 0.77 | ✅ covered |
| ux-check — Хочу проверить UX до решения | 0.71 | 0.53 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| sandbox — Хочу проверить, не сломаем ли мы всё | 0.62 | 0.77 | ✅ covered |
| security — Хочу понять ограничения и безопасность | 0.53 | 0 | ❌ not covered — добавь секцию/копи для "Хочу понять ограничения и безопасность" (keywords: безопасн, on-prem, on prem) |

## Issues

_None — все правила пройдены._

<!-- /gen:audience-score -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

