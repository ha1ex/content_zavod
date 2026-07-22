---
slug: kaiten-wrike
type: landing
created: 2026-07-21
updated: 2026-07-22
status: draft
brief: content/briefs/kaiten-wrike.json
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
  - reviews
  - accordion_feature
  - cta_buttons
  - comparison_table
  - media_copy
  - features
  - final_cta
  - faq
  - legal_note
  - kaiten_footer
generator: host-agent
durationMs: 0
tokenEstimate: 47185
tags:
  - landing
  - saas_landing
stale: false
---
# Landing summary

<!-- gen:spec-meta -->
- **slug:** `kaiten-wrike`
- **brief:** `content/briefs/kaiten-wrike.json`
- **archetype:** `saas_landing`
- **goal:** `try_free` (brief.cta = "Попробовать бесплатно")
- **sections used:** `site_header, hero, reviews, accordion_feature, cta_buttons, comparison_table, media_copy, features, final_cta, faq, legal_note, kaiten_footer`
- **token estimate:** `47185`
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

- **title:** "Кайтен — российская альтернатива Wrike"
- **subtitle:** "Российский сервис для команд, которым важны кастомные процессы — без зависимости от решений зарубежной компании и риска потерять доступ к данным" _(144/200 chars)_
- **primaryCta:** "Попробовать бесплатно" → `/signup`
- **visual:** `product_screenshot` (assetId: `kaiten-wrike-board`)

### reviews (ReviewSlider)


### accordion_feature (AccordionFeatureSection)


### cta_buttons (CtaButtons)


### comparison_table (ComparisonTable)


### media_copy (MediaCopy)


### features (FeatureGrid)

- **title:** "Кайтен — одна платформа для всей компании"
- **columns:** 2 · **items:** 4
  1. `square-kanban` · "Скрам и Agile-аналитика" — 174 chars
  2. `users` · "CRM" — 169 chars
  3. `life-buoy` · "Служба поддержки" — 162 chars
  4. `book-open` · "Бесплатный редактор документов" — 170 chars

### final_cta (FinalCta)

- **title:** "Попробуйте Kaiten бесплатно"
- **primaryCta:** "Попробовать бесплатно" → `/signup`

### faq (FAQAccordion)

- **title:** "Ответы на частые вопросы"
- **items:** 6 Q&A
  1. "Чем Кайтен отличается от Wrike?" — answer 321/600 chars
  2. "Можно ли перенести данные из Wrike в Кайтен?" — answer 90/600 chars
  3. "Какие тарифы Кайтен попробовать?" — answer 127/600 chars
  4. "Как работает пробный период?" — answer 198/600 chars
  5. "Как начать пользоваться Кайтен?" — answer 141/600 chars
  6. "Можно ли установить Кайтен на собственный сервер?" — answer 103/600 chars

### legal_note (LegalNote)


### kaiten_footer (LandingFooterMock)
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
# Audience score — `kaiten-wrike`

- **Score:** 83.29 / 100 (threshold 70) — ✅ pass
- **Resolved segments:** IT
- **CTA types detected:** Trial, Demo
- **Generated:** 2026-07-22T05:27:58.410Z

## Breakdown

| ID | Subscore | Raw | Weight | Weighted | Detail |
|---|---|---|---|---|---|
| S1 | Story coverage | 70.72 | 0.4 | 28.29 | top-6 stories: compare(w=0.98, c=0.82), migrate-jira(w=0.95, c=0.77), fast-check(w=0.94, c=1.00), ux-check(w=0.71, c=0.53), sandbox(w=0.62, c=0.53), security(w=0.53, c=0.30) |
| S2 | Segment fit | 100 | 0.3 | 30 | mentioned=1/1 [IT] |
| S3 | Role addressability | 75 | 0.2 | 15 | PM=1.00, DM=0.50 |
| S4 | CTA alignment | 100 | 0.1 | 10 | cta-types=[Trial,Demo], match=1/1 |

## Story coverage (top-N)

| Story | Weight | Covered | Status |
|---|---|---|---|
| compare — Хочу сравнить с тем, что уже есть | 0.98 | 0.83 | ✅ covered |
| migrate-jira — Хочу понять, стоит ли переезжать с Jira | 0.95 | 0.77 | ✅ covered |
| fast-check — Хочу быстро проверить, подойдёт ли нам | 0.94 | 1 | ✅ covered |
| ux-check — Хочу проверить UX до решения | 0.71 | 0.53 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| sandbox — Хочу проверить, не сломаем ли мы всё | 0.62 | 0.53 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| security — Хочу понять ограничения и безопасность | 0.53 | 0.3 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |

## Issues

_None — все правила пройдены._

<!-- /gen:audience-score -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

