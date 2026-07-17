---
slug: kaiten-cli
type: landing
created: 2026-07-17
updated: 2026-07-18
status: draft
brief: content/briefs/kaiten-cli.json
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
  - logo_cloud
  - media_copy
  - media_copy
  - media_copy
  - comparison_table
  - media_copy
  - metrics_split
  - process
  - features
  - faq
  - final_cta
  - kaiten_footer
generator: host-agent
durationMs: 0
tokenEstimate: 46438
tags:
  - landing
  - saas_landing
stale: false
---
# Landing summary

<!-- gen:spec-meta -->
- **slug:** `kaiten-cli`
- **brief:** `content/briefs/kaiten-cli.json`
- **archetype:** `saas_landing`
- **goal:** `download` (brief.cta = "Установить")
- **sections used:** `site_header, hero, benefits_strip, logo_cloud, media_copy, media_copy, media_copy, comparison_table, media_copy, metrics_split, process, features, faq, final_cta, kaiten_footer`
- **token estimate:** `46438`
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

- **title:** "Kaiten CLI Community Edition — карточки и документы из терминала"
- **subtitle:** "Kaiten CLI выполняет привычные действия с досками, карточками и документами прямо в командной строке. Одни и те же команды запускает человек, скрипт или ИИ-агент." _(162/200 chars)_
- **primaryCta:** "Установить" → `https://github.com/ViktorOgnev/kaiten-cli`
- **secondaryCta:** "Справочник команд"
- **visual:** `product_screenshot` (assetId: `kaiten-cli-terminal-hero`)

### benefits_strip (BenefitsStrip)


### logo_cloud (LogoCloud)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### comparison_table (ComparisonTable)


### media_copy (MediaCopy)


### metrics_split (MetricsSplit)


### process (ProcessSteps)


### features (FeatureGrid)

- **title:** "Что умеет"
- **columns:** 4 · **items:** 8
  1. `LayoutGrid` · "Команды по сущностям" — 94 chars
  2. `FolderTree` · "Документы и каталоги" — 93 chars
  3. `Clock` · "Учёт времени" — 52 chars
  4. `FileDown` · "Экспорт в Markdown" — 58 chars
  5. `Search` · "Поиск возможностей" — 81 chars
  6. `Plug` · "Псевдонимы MCP" — 67 chars
  7. `Database` · "Кэш чтения" — 87 chars
  8. `ShieldCheck` · "Аккуратный клиент" — 84 chars

### faq (FAQAccordion)

- **title:** "Что обычно спрашивают"
- **items:** 8 Q&A
  1. "Это официальный инструмент Kaiten?" — answer 263/600 chars
  2. "Нужен ли kaiten-mcp, чтобы CLI работал?" — answer 186/600 chars
  3. "Где хранится токен доступа?" — answer 109/600 chars
  4. "Что лежит в локальном снимке и кто его видит?" — answer 275/600 chars
  5. "Что нужно для работы?" — answer 94/600 chars
  6. "Как обновиться?" — answer 185/600 chars
  7. "А если команда переезжает с Jira?" — answer 213/600 chars
  8. "Нужно ли учить все команды?" — answer 158/600 chars

### final_cta (FinalCta)

- **title:** "Поставьте и прочитайте первую карточку"
- **primaryCta:** "Установить" → `https://github.com/ViktorOgnev/kaiten-cli`

### kaiten_footer (LandingFooterMock)
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
# Audience score — `kaiten-cli`

- **Score:** 74.67 / 100 (threshold 70) — ✅ pass
- **Resolved segments:** IT
- **CTA types detected:** Unknown
- **Generated:** 2026-07-17T19:41:15.477Z

## Breakdown

| ID | Subscore | Raw | Weight | Weighted | Detail |
|---|---|---|---|---|---|
| S1 | Story coverage | 70 | 0.4 | 28 | top-6 stories: compare(w=0.98, c=0.70), migrate-jira(w=0.95, c=0.70), fast-check(w=0.94, c=0.70), ux-check(w=0.71, c=0.70), sandbox(w=0.62, c=0.70), security(w=0.53, c=0.70) |
| S2 | Segment fit | 100 | 0.3 | 30 | mentioned=1/1 [IT] |
| S3 | Role addressability | 83.33 | 0.2 | 16.67 | PM=0.67, DM=1.00 |
| S4 | CTA alignment | 0 | 0.1 | 0 | cta-types=[Unknown], match=0/1 |

## Story coverage (top-N)

| Story | Weight | Covered | Status |
|---|---|---|---|
| compare — Хочу сравнить с тем, что уже есть | 0.98 | 0.7 | ✅ covered |
| migrate-jira — Хочу понять, стоит ли переезжать с Jira | 0.95 | 0.7 | ✅ covered |
| fast-check — Хочу быстро проверить, подойдёт ли нам | 0.94 | 0.7 | ✅ covered |
| ux-check — Хочу проверить UX до решения | 0.71 | 0.7 | ✅ covered |
| sandbox — Хочу проверить, не сломаем ли мы всё | 0.62 | 0.7 | ✅ covered |
| security — Хочу понять ограничения и безопасность | 0.53 | 0.7 | ✅ covered |

## Issues

_None — все правила пройдены._

<!-- /gen:audience-score -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

