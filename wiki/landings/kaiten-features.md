---
slug: kaiten-features
type: landing
created: 2026-09-16
updated: 2026-09-21
status: draft
brief: content/briefs/kaiten-features.json
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
  - media_copy
  - media_copy
  - media_copy
  - media_copy
  - media_copy
  - media_copy
  - media_copy
  - media_copy
  - media_copy
  - media_copy
  - view_switcher
  - link_groups
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
- **slug:** `kaiten-features`
- **brief:** `content/briefs/kaiten-features-v2.json`
- **archetype:** `saas_landing`
- **goal:** `try_free` (brief.cta = "Попробовать бесплатно")
- **sections used:** `site_header, hero, media_copy, media_copy, media_copy, media_copy, media_copy, media_copy, media_copy, media_copy, media_copy, media_copy, view_switcher, link_groups, final_cta, kaiten_footer`
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

- **title:** "Единое рабочее пространство
для визуализации рабочих процессов"
- **subtitle:** "Гибкий рабочий инструмент, который подстраивается под ваш рабочий процесс.
Визуализация задач, проектов, команд и их связей на одном экране" _(139/200 chars)_
- **primaryCta:** "Попробовать бесплатно" → `/signup`
- **secondaryCta:** "Записаться на демо"
- **visual:** `product_screenshot` (assetId: `kaiten-workspace-board`)

### media_copy (MediaCopy)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### view_switcher (ViewSwitcher)


### link_groups (LinkGroups)


### final_cta (FinalCta)

- **title:** "Попробуйте Кайтен прямо сейчас"
- **primaryCta:** "Создать аккаунт" → `/signup`

### kaiten_footer (LandingFooterMock)
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
# Audience score — `kaiten-features`

- **Score:** 66.04 / 100 (threshold 70) — ❌ fail
- **Resolved segments:** IT
- **CTA types detected:** Trial, Demo
- **Generated:** 2026-09-21T08:41:51.779Z

## Breakdown

| ID | Subscore | Raw | Weight | Weighted | Detail |
|---|---|---|---|---|---|
| S1 | Story coverage | 40.09 | 0.4 | 16.04 | top-6 stories: compare(w=0.98, c=0.30), migrate-jira(w=0.95, c=0.30), fast-check(w=0.94, c=0.53), ux-check(w=0.71, c=0.53), sandbox(w=0.62, c=0.30), security(w=0.53, c=0.47) |
| S2 | Segment fit | 100 | 0.3 | 30 | mentioned=1/1 [IT] |
| S3 | Role addressability | 50 | 0.2 | 10 | PM=1.00, DM=0.00 |
| S4 | CTA alignment | 100 | 0.1 | 10 | cta-types=[Trial,Demo], match=1/1 |

## Story coverage (top-N)

| Story | Weight | Covered | Status |
|---|---|---|---|
| compare — Хочу сравнить с тем, что уже есть | 0.98 | 0.3 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| migrate-jira — Хочу понять, стоит ли переезжать с Jira | 0.95 | 0.3 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| fast-check — Хочу быстро проверить, подойдёт ли нам | 0.94 | 0.53 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| ux-check — Хочу проверить UX до решения | 0.71 | 0.53 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| sandbox — Хочу проверить, не сломаем ли мы всё | 0.62 | 0.3 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| security — Хочу понять ограничения и безопасность | 0.53 | 0.48 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |

## Issues

- **must-pass-failed** (`seo-mentions-priority`): seo.title + seo.description не упоминают ни одного резолвленного сегмента, ни ключевых слов из top-3 stories.
  - _suggestion:_ Добавь в SEO упоминание сегмента (например, IT) или ключевое слово (сравни).
- **score-below-threshold**: Audience-score 66.04 ниже порога 70.
  - _suggestion:_ Слабее всего S1 (Story coverage=40.09): top-6 stories: compare(w=0.98, c=0.30), migrate-jira(w=0.95, c=0.30), fast-check(w=0.94, c=0.53), ux-check(w=0.71, c=0.53), sandbox(w=0.62, c=0.30), security(w=0.53, c=0.47). Не покрыты stories: compare (Хочу сравнить с тем, что уже есть); migrate-jira (Хочу понять, стоит ли переезжать с Jira); fast-check (Хочу быстро проверить, подойдёт ли нам). Добавь соответствующие секции или ключевые слова.

<!-- /gen:audience-score -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

