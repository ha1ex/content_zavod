---
slug: kaiten-automation
type: landing
created: 2026-08-12
updated: 2026-08-25
status: draft
brief: content/briefs/kaiten-automation.json
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
  - features
  - media_copy
  - media_copy
  - media_copy
  - cta_buttons
  - tabbed_feature
  - cta_banner
  - cta_banner
  - logo_marquee
  - media_copy
  - final_cta
  - kaiten_footer
generator: host-agent
durationMs: 0
tokenEstimate: 48147
tags:
  - landing
  - saas_landing
stale: false
---
# Landing summary

<!-- gen:spec-meta -->
- **slug:** `kaiten-automation`
- **brief:** `content/briefs/kaiten-automation.json`
- **archetype:** `saas_landing`
- **goal:** `try_free` (brief.cta = "Попробовать бесплатно")
- **sections used:** `site_header, hero, reviews, features, media_copy, media_copy, media_copy, cta_buttons, tabbed_feature, cta_banner, cta_banner, logo_marquee, media_copy, final_cta, kaiten_footer`
- **token estimate:** `48147`
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

- **title:** "Избавьтесь от рутины и сократите количество ручной работы"
- **subtitle:** "Настройте правило один раз — Кайтен сам назначит ответственных, переместит карточки, напомнит о задаче, добавит чек-лист и не только" _(132/200 chars)_
- **primaryCta:** "Попробовать бесплатно" → `https://kaiten.ru/signup`
- **visual:** `product_screenshot` (assetId: `kaiten-automation-video`)

### reviews (ReviewSlider)


### features (FeatureGrid)

- **title:** "Кайтен берет рутину на себя"
- **columns:** 3 · **items:** 3
  1. `UserPlus` · "Назначает ответственных" — 67 chars
  2. `ListChecks` · "Добавляет чек-листы и поля" — 81 chars
  3. `AlarmClock` · "Следит за сроками" — 72 chars

### media_copy (MediaCopy)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### cta_buttons (CtaButtons)


### tabbed_feature (TabbedFeatureSection)


### cta_banner (CtaBanner)


### cta_banner (CtaBanner)


### logo_marquee (LogoMarquee)


### media_copy (MediaCopy)


### final_cta (FinalCta)

- **title:** "Переводите все процессы в Кайтен"
- **primaryCta:** "Попробовать бесплатно" → `https://kaiten.ru/signup`

### kaiten_footer (LandingFooterMock)
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
# Audience score — `kaiten-automation`

- **Score:** 66.73 / 100 (threshold 70) — ❌ fail
- **Resolved segments:** IT
- **CTA types detected:** Trial, Unknown
- **Generated:** 2026-08-25T09:22:30.966Z

## Breakdown

| ID | Subscore | Raw | Weight | Weighted | Detail |
|---|---|---|---|---|---|
| S1 | Story coverage | 46.01 | 0.4 | 18.4 | top-6 stories: compare(w=0.98, c=0.30), migrate-jira(w=0.95, c=0.30), fast-check(w=0.94, c=1.00), ux-check(w=0.71, c=0.53), sandbox(w=0.62, c=0.30), security(w=0.53, c=0.17) |
| S2 | Segment fit | 100 | 0.3 | 30 | mentioned=1/1 [IT] |
| S3 | Role addressability | 41.67 | 0.2 | 8.33 | PM=0.33, DM=0.50 |
| S4 | CTA alignment | 100 | 0.1 | 10 | cta-types=[Trial,Unknown], match=1/1 |

## Story coverage (top-N)

| Story | Weight | Covered | Status |
|---|---|---|---|
| compare — Хочу сравнить с тем, что уже есть | 0.98 | 0.3 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| migrate-jira — Хочу понять, стоит ли переезжать с Jira | 0.95 | 0.3 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| fast-check — Хочу быстро проверить, подойдёт ли нам | 0.94 | 1 | ✅ covered |
| ux-check — Хочу проверить UX до решения | 0.71 | 0.53 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| sandbox — Хочу проверить, не сломаем ли мы всё | 0.62 | 0.3 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| security — Хочу понять ограничения и безопасность | 0.53 | 0.18 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |

## Issues

- **score-below-threshold**: Audience-score 66.73 ниже порога 70.
  - _suggestion:_ Слабее всего S3 (Role addressability=41.67): PM=0.33, DM=0.50. Не покрыты stories: compare (Хочу сравнить с тем, что уже есть); migrate-jira (Хочу понять, стоит ли переезжать с Jira); ux-check (Хочу проверить UX до решения). Добавь соответствующие секции или ключевые слова.

<!-- /gen:audience-score -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

