---
slug: kaiten-mcp
type: landing
created: 2026-07-02
updated: 2026-07-02
status: draft
brief: content/briefs/kaiten-mcp.json
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
  - wiki/layouts/product-launch.md
  - wiki/layouts/index.md
  - wiki/layouts/single-module-deep-dive.md
sections:
  - site_header
  - hero
  - benefits_strip
  - logo_cloud
  - media_copy
  - media_copy
  - media_copy
  - metrics_split
  - process
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
- **slug:** `kaiten-mcp`
- **brief:** `content/briefs/kaiten-mcp.json`
- **archetype:** `saas_landing`
- **goal:** `try_free` (brief.cta = "Попробовать")
- **sections used:** `site_header, hero, benefits_strip, logo_cloud, media_copy, media_copy, media_copy, metrics_split, process, features, faq, final_cta, kaiten_footer`
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
- `wiki/layouts/single-module-deep-dive.md`
- `wiki/layouts/index.md`
<!-- /gen:spec-meta -->

## Sections

<!-- gen:sections-summary -->
### site_header (SiteHeader)


### hero (HeroSection)

- **title:** "Весь Kaiten — теперь через ИИ-ассистента"
- **subtitle:** "От карточки до аналитики — 120+ операций голосом. Подключите Claude, Cursor или другой инструмент к Kaiten по стандарту Model Context Protocol: ассистент читает и меняет данные прямо из диалога." _(194/200 chars)_
- **primaryCta:** "Попробовать бесплатно" → `/signup`
- **secondaryCta:** "Как подключить"
- **visual:** `product_screenshot` (assetId: `kaiten-mcp-agent-board`)

### benefits_strip (BenefitsStrip)


### logo_cloud (LogoCloud)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### metrics_split (MetricsSplit)


### process (ProcessSteps)


### features (FeatureGrid)

- **title:** "120+ операций в 10 областях"
- **columns:** 4 · **items:** 8
  1. `square-check-big` · "Карточки и задачи" — 77 chars
  2. `users` · "Совместная работа" — 64 chars
  3. `list-checks` · "Планирование и время" — 61 chars
  4. `link` · "Связи и блокировки" — 65 chars
  5. `layout-grid` · "Доски и структура" — 64 chars
  6. `sliders-horizontal` · "Настраиваемые поля" — 69 chars
  7. `book-open` · "База знаний" — 70 chars
  8. `bar-chart-3` · "Аналитика и отчёты" — 71 chars

### faq (FAQAccordion)

- **title:** "Вопросы о MCP-сервере"
- **items:** 6 Q&A
  1. "Что ассистент умеет через MCP-сервер?" — answer 180/600 chars
  2. "С какими ИИ-инструментами работает MCP-сервер?" — answer 127/600 chars
  3. "Мы работаем в Jira — можно перейти?" — answer 127/600 chars
  4. "Насколько это безопасно?" — answer 194/600 chars
  5. "Как подключить MCP-сервер?" — answer 118/600 chars
  6. "Работает ли на локальной версии?" — answer 52/600 chars

### final_cta (FinalCta)

- **title:** "От карточки до аналитики — в одном диалоге"
- **primaryCta:** "Попробовать бесплатно" → `/signup`

### kaiten_footer (LandingFooterMock)
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
# Audience score — `kaiten-mcp`

- **Score:** 88.34 / 100 (threshold 70) — ✅ pass
- **Resolved segments:** IT
- **CTA types detected:** Trial, Unknown
- **Generated:** 2026-07-02T13:42:31.410Z

## Breakdown

| ID | Subscore | Raw | Weight | Weighted | Detail |
|---|---|---|---|---|---|
| S1 | Story coverage | 79.17 | 0.4 | 31.67 | top-6 stories: compare(w=0.98, c=1.00), migrate-jira(w=0.95, c=1.00), fast-check(w=0.94, c=1.00), ux-check(w=0.71, c=0.30), sandbox(w=0.62, c=0.77), security(w=0.53, c=0.35) |
| S2 | Segment fit | 100 | 0.3 | 30 | mentioned=1/1 [IT] |
| S3 | Role addressability | 83.33 | 0.2 | 16.67 | PM=0.67, DM=1.00 |
| S4 | CTA alignment | 100 | 0.1 | 10 | cta-types=[Trial,Unknown], match=1/1 |

## Story coverage (top-N)

| Story | Weight | Covered | Status |
|---|---|---|---|
| compare — Хочу сравнить с тем, что уже есть | 0.98 | 1 | ✅ covered |
| migrate-jira — Хочу понять, стоит ли переезжать с Jira | 0.95 | 1 | ✅ covered |
| fast-check — Хочу быстро проверить, подойдёт ли нам | 0.94 | 1 | ✅ covered |
| ux-check — Хочу проверить UX до решения | 0.71 | 0.3 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| sandbox — Хочу проверить, не сломаем ли мы всё | 0.62 | 0.77 | ✅ covered |
| security — Хочу понять ограничения и безопасность | 0.53 | 0.35 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |

## Issues

_None — все правила пройдены._

<!-- /gen:audience-score -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

