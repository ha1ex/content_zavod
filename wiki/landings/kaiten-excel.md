---
slug: kaiten-excel
type: landing
created: 2026-09-18
updated: 2026-09-23
status: draft
brief: content/briefs/kaiten-excel.json
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
  - reviews
  - media_copy
  - media_copy
  - cta_buttons
  - media_copy
  - media_copy
  - media_copy
  - media_copy
  - media_copy
  - media_copy
  - cta_buttons
  - cta_banner
  - media_copy
  - final_cta
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
- **slug:** `kaiten-excel`
- **brief:** `content/briefs/kaiten-excel.json`
- **archetype:** `saas_landing`
- **goal:** `try_free` (brief.cta = "Попробовать Кайтен бесплатно")
- **sections used:** `site_header, hero, features, reviews, media_copy, media_copy, cta_buttons, media_copy, media_copy, media_copy, media_copy, media_copy, media_copy, cta_buttons, cta_banner, media_copy, final_cta, kaiten_footer`
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

- **title:** "Замените Excel и разрозненные сервисы на Кайтен"
- **subtitle:** "Соберите задачи, сроки, документы и обсуждения в одном месте. Следите за работой команды
без ручного обновления таблиц, переписок и лишних созвонов" _(147/200 chars)_
- **primaryCta:** "Попробовать Кайтен бесплатно" → `https://kaiten.ru/signup`
- **visual:** `product_screenshot` (assetId: `kaiten-excel-tablet-pair`)

### features (FeatureGrid)

- **title:** "Импорт из Excel, быстрый старт
и 14 дней бесплатно"
- **columns:** 3 · **items:** 3
  1. `FileSpreadsheet` · "Импорт из Excel" — 30 chars
  2. `Rocket` · "Быстрый старт" — 29 chars
  3. `CalendarCheck` · "14 дней бесплатно" — 34 chars

### reviews (ReviewSlider)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### cta_buttons (CtaButtons)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### cta_buttons (CtaButtons)


### cta_banner (CtaBanner)


### media_copy (MediaCopy)


### final_cta (FinalCta)

- **title:** "Перенесите работу из таблиц в Кайтен"
- **primaryCta:** "Попробовать бесплатно на 14 дней" → `https://kaiten.ru/signup`

### kaiten_footer (LandingFooterMock)
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
# Audience score — `kaiten-excel`

- **Score:** 74.55 / 100 (threshold 70) — ✅ pass
- **Resolved segments:** IT
- **CTA types detected:** Trial
- **Generated:** 2026-09-23T06:51:58.290Z

## Breakdown

| ID | Subscore | Raw | Weight | Weighted | Detail |
|---|---|---|---|---|---|
| S1 | Story coverage | 48.87 | 0.4 | 19.55 | top-6 stories: compare(w=0.98, c=0.47), migrate-jira(w=0.95, c=0.53), fast-check(w=0.94, c=1.00), ux-check(w=0.71, c=0.30), sandbox(w=0.62, c=0.30), security(w=0.53, c=0.00) |
| S2 | Segment fit | 100 | 0.3 | 30 | mentioned=1/1 [IT] |
| S3 | Role addressability | 75 | 0.2 | 15 | PM=1.00, DM=0.50 |
| S4 | CTA alignment | 100 | 0.1 | 10 | cta-types=[Trial], match=1/1 |

## Story coverage (top-N)

| Story | Weight | Covered | Status |
|---|---|---|---|
| compare — Хочу сравнить с тем, что уже есть | 0.98 | 0.48 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| migrate-jira — Хочу понять, стоит ли переезжать с Jira | 0.95 | 0.53 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| fast-check — Хочу быстро проверить, подойдёт ли нам | 0.94 | 1 | ✅ covered |
| ux-check — Хочу проверить UX до решения | 0.71 | 0.3 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| sandbox — Хочу проверить, не сломаем ли мы всё | 0.62 | 0.3 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| security — Хочу понять ограничения и безопасность | 0.53 | 0 | ❌ not covered — добавь секцию/копи для "Хочу понять ограничения и безопасность" (keywords: безопасн, on-prem, on prem) |

## Issues

_None — все правила пройдены._

<!-- /gen:audience-score -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

