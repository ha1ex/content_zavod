---
slug: kaiten-task-tracker
type: landing
created: 2026-07-31
updated: 2026-08-07
status: draft
brief: content/briefs/kaiten-task-tracker.json
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
  - feature_rows
  - cta_buttons
  - features
  - cta_product
  - features
  - cta_buttons
  - logo_marquee
  - final_cta
  - faq
generator: host-agent
durationMs: 0
tokenEstimate: 48139
tags:
  - landing
  - saas_landing
stale: false
---
# Landing summary

<!-- gen:spec-meta -->
- **slug:** `kaiten-task-tracker`
- **brief:** `content/briefs/kaiten-task-tracker.json`
- **archetype:** `saas_landing`
- **goal:** `try_free` (brief.cta = "Попробовать бесплатно")
- **sections used:** `site_header, hero, reviews, feature_rows, cta_buttons, features, cta_product, features, cta_buttons, logo_marquee, final_cta, faq`
- **token estimate:** `48139`
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

- **title:** "Кайтен — таск-трекер и планировщик задач для команды и бизнеса"
- **subtitle:** "Ставьте задачи, назначайте ответственных и контролируйте сроки — без потерь в чатах и Excel. Канбан, Гант, Скрам и учет времени в одном сервисе" _(143/200 chars)_
- **primaryCta:** "Попробовать бесплатно" → `/signup`
- **secondaryCta:** "Записаться на демо"
- **visual:** `product_screenshot` (assetId: `kaiten-task-board`)

### reviews (ReviewSlider)


### feature_rows (FeatureRows)


### cta_buttons (CtaButtons)


### features (FeatureGrid)

- **title:** "Почему компании доверяют Кайтен"
- **columns:** 2 · **items:** 2
  1. `shield-check` · "Российский сервис с защитой данных" — 102 chars
  2. `server` · "Серверная версия (on-premise)" — 105 chars

### cta_product (CtaProduct)


### features (FeatureGrid)

- **title:** "Кайтен — единая среда для всей компании"
- **columns:** 3 · **items:** 6
  1. `square-check-big` · "Задачи" — 177 chars
  2. `file-text` · "Документы" — 151 chars
  3. `folder-kanban` · "Проекты" — 152 chars
  4. `inbox` · "Заявки" — 146 chars
  5. `handshake` · "Продажи" — 150 chars
  6. `message-circle` · "Коммуникации" — 142 chars

### cta_buttons (CtaButtons)


### logo_marquee (LogoMarquee)


### final_cta (FinalCta)

- **title:** "Порядок в задачах — с первого дня в Кайтен"
- **primaryCta:** "Попробовать бесплатно" → `/signup`

### faq (FAQAccordion)

- **title:** "Вопросы и ответы"
- **items:** 4 Q&A
  1. "Можно ли использовать Кайтен бесплатно?" — answer 303/600 chars
  2. "Какие методологии поддерживает Кайтен?" — answer 196/600 chars
  3. "Нужен ли ИТ-отдел для внедрения?" — answer 102/600 chars
  4. "Как перенести данные из другого сервиса?" — answer 310/600 chars
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
# Audience score — `kaiten-task-tracker`

- **Score:** 88.43 / 100 (threshold 70) — ✅ pass
- **Resolved segments:** IT, Торговля, Производство, Строительство
- **CTA types detected:** Trial, Demo
- **Generated:** 2026-08-07T12:32:27.960Z

## Breakdown

| ID | Subscore | Raw | Weight | Weighted | Detail |
|---|---|---|---|---|---|
| S1 | Story coverage | 83.57 | 0.4 | 33.43 | top-6 stories: compare(w=0.98, c=0.47), migrate-jira(w=0.95, c=1.00), fast-check(w=0.94, c=1.00), demo(w=0.87, c=1.00), load-team(w=0.74, c=0.77), ux-check(w=0.71, c=0.77) |
| S2 | Segment fit | 100 | 0.3 | 30 | mentioned=4/4 [IT, Торговля, Производство, Строительство] |
| S3 | Role addressability | 75 | 0.2 | 15 | PM=1.00, DM=0.50 |
| S4 | CTA alignment | 100 | 0.1 | 10 | cta-types=[Trial,Demo], match=4/4 |

## Story coverage (top-N)

| Story | Weight | Covered | Status |
|---|---|---|---|
| compare — Хочу сравнить с тем, что уже есть | 0.98 | 0.48 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| migrate-jira — Хочу понять, стоит ли переезжать с Jira | 0.95 | 1 | ✅ covered |
| fast-check — Хочу быстро проверить, подойдёт ли нам | 0.94 | 1 | ✅ covered |
| demo — Хочу увидеть, как это работает на практике | 0.87 | 1 | ✅ covered |
| load-team — Хочу проверить загрузку команды | 0.74 | 0.77 | ✅ covered |
| ux-check — Хочу проверить UX до решения | 0.71 | 0.77 | ✅ covered |

## Issues

_None — все правила пройдены._

<!-- /gen:audience-score -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

