---
slug: kaiten-cli-release
type: landing
created: 2026-07-21
updated: 2026-07-23
status: draft
brief: content/briefs/kaiten-cli-release.json
archetype: saas_landing
goal: download
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
  - wiki/layouts/single-module-deep-dive.md
  - wiki/layouts/index.md
sections:
  - site_header
  - hero
  - benefits_strip
  - media_copy
  - comparison_table
  - features
  - features
  - process
  - features
  - media_copy
  - metrics_split
  - tabbed_feature
  - media_copy
  - features
  - legal_note
  - final_cta
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
- **slug:** `kaiten-cli-release`
- **brief:** `content/briefs/kaiten-cli-release.json`
- **archetype:** `saas_landing`
- **goal:** `download` (brief.cta = "Установить")
- **sections used:** `site_header, hero, benefits_strip, media_copy, comparison_table, features, features, process, features, media_copy, metrics_split, tabbed_feature, media_copy, features, legal_note, final_cta, kaiten_footer`
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
- `wiki/layouts/single-module-deep-dive.md`
- `wiki/layouts/index.md`
<!-- /gen:spec-meta -->

## Sections

<!-- gen:sections-summary -->
### site_header (SiteHeader)


### hero (HeroSection)

- **title:** "Kaiten CLI — Издание сообщества"
- **subtitle:** "Управляйте карточками, досками и аналитикой Kaiten прямо из терминала. Одни и те же команды запускают человек, скрипт и AI‑агент." _(129/200 chars)_
- **primaryCta:** "Установить" → `https://github.com/ViktorOgnev/kaiten-cli`
- **secondaryCta:** "Открыть на GitHub"
- **visual:** `product_screenshot` (assetId: `kaiten-cli-release-hero`)

### benefits_strip (BenefitsStrip)


### media_copy (MediaCopy)


### comparison_table (ComparisonTable)


### features (FeatureGrid)

- **title:** "Ключевые возможности"
- **columns:** 3 · **items:** 6
  1. `LayoutGrid` · "Карточки и задачи" — 74 chars
  2. `Users` · "Совместная работа" — 71 chars
  3. `ListChecks` · "Планирование" — 68 chars
  4. `GitBranch` · "Связи и блокировки" — 66 chars
  5. `FileText` · "Документы и база знаний" — 67 chars
  6. `BarChart3` · "Аналитика" — 68 chars

### features (FeatureGrid)

- **title:** "Работает самостоятельно"
- **columns:** 3 · **items:** 3
  1. `Unplug` · "Не зависит от MCP" — 56 chars
  2. `Layers` · "Тот же доменный слой" — 50 chars
  3. `Users` · "Человек, скрипт или агент" — 60 chars

### process (ProcessSteps)


### features (FeatureGrid)

- **title:** "Кому и зачем"
- **columns:** 3 · **items:** 5
  1. `Terminal` · "Человек в терминале" — 56 chars
  2. `GitBranch` · "Автоматизация и CI" — 44 chars
  3. `Bot` · "LLM-агент" — 66 chars
  4. `Plug` · "Интегратор" — 52 chars
  5. `Briefcase` · "Проджект в агентстве" — 101 chars

### media_copy (MediaCopy)


### metrics_split (MetricsSplit)


### tabbed_feature (TabbedFeatureSection)


### media_copy (MediaCopy)


### features (FeatureGrid)

- **title:** "Когда CLI, когда MCP"
- **columns:** 2 · **items:** 2
  1. `Terminal` · "Kaiten CLI" — 99 chars
  2. `Cloud` · "Kaiten MCP" — 106 chars

### legal_note (LegalNote)


### final_cta (FinalCta)

- **title:** "Поставьте за минуту"
- **primaryCta:** "Установить" → `https://github.com/ViktorOgnev/kaiten-cli`

### kaiten_footer (LandingFooterMock)
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
# Audience score — `kaiten-cli-release`

- **Score:** 54.79 / 100 (threshold 70) — ❌ fail
- **Resolved segments:** IT
- **CTA types detected:** Unknown
- **Generated:** 2026-07-23T14:27:01.825Z

## Breakdown

| ID | Subscore | Raw | Weight | Weighted | Detail |
|---|---|---|---|---|---|
| S1 | Story coverage | 20.3 | 0.4 | 8.12 | top-6 stories: compare(w=0.98, c=0.17), migrate-jira(w=0.95, c=0.00), fast-check(w=0.94, c=0.47), ux-check(w=0.71, c=0.23), sandbox(w=0.62, c=0.00), security(w=0.53, c=0.35) |
| S2 | Segment fit | 100 | 0.3 | 30 | mentioned=1/1 [IT] |
| S3 | Role addressability | 83.33 | 0.2 | 16.67 | PM=0.67, DM=1.00 |
| S4 | CTA alignment | 0 | 0.1 | 0 | cta-types=[Unknown], match=0/1 |

## Story coverage (top-N)

| Story | Weight | Covered | Status |
|---|---|---|---|
| compare — Хочу сравнить с тем, что уже есть | 0.98 | 0.18 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| migrate-jira — Хочу понять, стоит ли переезжать с Jira | 0.95 | 0 | ❌ not covered — добавь секцию/копи для "Хочу понять, стоит ли переезжать с Jira" (keywords: jira, миграц, переезд) |
| fast-check — Хочу быстро проверить, подойдёт ли нам | 0.94 | 0.47 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| ux-check — Хочу проверить UX до решения | 0.71 | 0.23 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| sandbox — Хочу проверить, не сломаем ли мы всё | 0.62 | 0 | ❌ not covered — добавь секцию/копи для "Хочу проверить, не сломаем ли мы всё" (keywords: sandbox, песочниц, тест) |
| security — Хочу понять ограничения и безопасность | 0.53 | 0.35 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |

## Issues

- **must-pass-failed** (`it-needs-compare-or-trial`): IT-сегмент в брифе, но нет ни покрытия story "compare/migrate-jira", ни Trial-CTA в hero.
  - _suggestion:_ Добавь либо сравнительный блок (Kaiten vs Jira/Trello/YouTrack), либо переведи hero.primaryCta на «Попробовать бесплатно».
- **score-below-threshold**: Audience-score 54.79 ниже порога 70.
  - _suggestion:_ Слабее всего S4 (CTA alignment=0): cta-types=[Unknown], match=0/1. Не покрыты stories: compare (Хочу сравнить с тем, что уже есть); migrate-jira (Хочу понять, стоит ли переезжать с Jira); fast-check (Хочу быстро проверить, подойдёт ли нам). Добавь соответствующие секции или ключевые слова.

<!-- /gen:audience-score -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

