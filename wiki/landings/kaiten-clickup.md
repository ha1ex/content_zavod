---
slug: kaiten-clickup
type: landing
created: 2026-07-15
updated: 2026-07-15
status: draft
brief: content/briefs/kaiten-clickup.json
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
  - features
  - cta_banner
  - comparison_table
  - media_copy
  - features
  - faq
  - final_cta
  - kaiten_footer
generator: host-agent
durationMs: 0
tokenEstimate: 46401
tags:
  - landing
  - saas_landing
stale: false
---
# Landing summary

<!-- gen:spec-meta -->
- **slug:** `kaiten-clickup`
- **brief:** `content/briefs/kaiten-clickup.json`
- **archetype:** `saas_landing`
- **goal:** `try_free` (brief.cta = "Попробовать бесплатно")
- **sections used:** `site_header, hero, features, cta_banner, comparison_table, media_copy, features, faq, final_cta, kaiten_footer`
- **token estimate:** `46401`
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

- **title:** "Кайтен — российская альтернатива ClickUp"
- **subtitle:** "Широкий набор инструментов для управления задачами и проектами — без риска ограничений доступа" _(94/200 chars)_
- **primaryCta:** "Попробовать бесплатно" → `/signup`
- **visual:** `product_screenshot` (assetId: `kaiten-clickup-board`)

### features (FeatureGrid)

- **title:** "Работайте с задачами так, как привыкли"
- **columns:** 2 · **items:** 4
  1. `square-kanban` · "Привычная канбан-доска" — 137 chars
  2. `layout-list` · "Разное отображение задач" — 126 chars
  3. `book-open` · "Документы и база знаний" — 102 chars
  4. `zap` · "Автоматизации без программирования" — 133 chars

### cta_banner (CtaBanner)


### comparison_table (ComparisonTable)


### media_copy (MediaCopy)


### features (FeatureGrid)

- **title:** "Кайтен — одна платформа для всей компании"
- **columns:** 2 · **items:** 4
  1. `square-kanban` · "Продвинутый канбан" — 122 chars
  2. `life-buoy` · "Служба поддержки" — 131 chars
  3. `users` · "CRM" — 115 chars
  4. `timer` · "Учёт времени" — 118 chars

### faq (FAQAccordion)

- **title:** "Ответы на частые вопросы"
- **items:** 5 Q&A
  1. "Какие тарифы можно попробовать?" — answer 105/600 chars
  2. "Как работает пробный период?" — answer 183/600 chars
  3. "Как начать пользоваться Кайтеном?" — answer 141/600 chars
  4. "Можно ли перенести данные из ClickUp в Кайтен?" — answer 168/600 chars
  5. "Можно ли установить Кайтен на собственный сервер?" — answer 103/600 chars

### final_cta (FinalCta)

- **title:** "Попробуйте Kaiten бесплатно"
- **primaryCta:** "Попробовать бесплатно" → `/signup`

### kaiten_footer (LandingFooterMock)
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
# Audience score — `kaiten-clickup`

- **Score:** 77.75 / 100 (threshold 70) — ✅ pass
- **Resolved segments:** IT
- **CTA types detected:** Trial
- **Generated:** 2026-07-15T18:08:25.611Z

## Breakdown

| ID | Subscore | Raw | Weight | Weighted | Detail |
|---|---|---|---|---|---|
| S1 | Story coverage | 69.38 | 0.4 | 27.75 | top-6 stories: compare(w=0.98, c=0.82), migrate-jira(w=0.95, c=1.00), fast-check(w=0.94, c=0.77), ux-check(w=0.71, c=0.53), sandbox(w=0.62, c=0.53), security(w=0.53, c=0.17) |
| S2 | Segment fit | 100 | 0.3 | 30 | mentioned=1/1 [IT] |
| S3 | Role addressability | 50 | 0.2 | 10 | PM=1.00, DM=0.00 |
| S4 | CTA alignment | 100 | 0.1 | 10 | cta-types=[Trial], match=1/1 |

## Story coverage (top-N)

| Story | Weight | Covered | Status |
|---|---|---|---|
| compare — Хочу сравнить с тем, что уже есть | 0.98 | 0.83 | ✅ covered |
| migrate-jira — Хочу понять, стоит ли переезжать с Jira | 0.95 | 1 | ✅ covered |
| fast-check — Хочу быстро проверить, подойдёт ли нам | 0.94 | 0.77 | ✅ covered |
| ux-check — Хочу проверить UX до решения | 0.71 | 0.53 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| sandbox — Хочу проверить, не сломаем ли мы всё | 0.62 | 0.53 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| security — Хочу понять ограничения и безопасность | 0.53 | 0.18 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |

## Issues

_None — все правила пройдены._

<!-- /gen:audience-score -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

