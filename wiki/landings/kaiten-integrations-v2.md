---
slug: kaiten-integrations-v2
type: landing
created: 2026-09-22
updated: 2026-09-22
status: draft
brief: content/briefs/kaiten-integrations-v3.json
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
  - tabs_gallery
  - media_copy
  - media_copy
  - cta_banner
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
- **slug:** `kaiten-integrations-v2`
- **brief:** `content/briefs/kaiten-integrations-v3.json`
- **archetype:** `saas_landing`
- **goal:** `try_free` (brief.cta = "Попробовать Кайтен бесплатно")
- **sections used:** `site_header, hero, tabs_gallery, media_copy, media_copy, cta_banner, final_cta, kaiten_footer`
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

- **title:** "Свяжите Кайтен с сервисами,
которыми команда уже пользуется"
- **subtitle:** "Заявка с сайта или письмо сами станут карточкой, а уведомление о задаче придет в мессенджер.
Если готового решения не хватит — соберите свое через API, вебхуки или дополнения" _(174/200 chars)_
- **primaryCta:** "Попробовать Кайтен бесплатно" → `https://kaiten.ru/signup`
- **visual:** `illustration` (assetId: `kaiten-integrations-hub`)

### tabs_gallery (TabsGallery)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### cta_banner (CtaBanner)


### final_cta (FinalCta)

- **title:** "Попробуйте Кайтен прямо сейчас"
- **primaryCta:** "Зарегистрироваться" → `https://kaiten.ru/signup`

### kaiten_footer (LandingFooterMock)
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
# Audience score — `kaiten-integrations-v2`

- **Score:** 69.12 / 100 (threshold 70) — ❌ fail
- **Resolved segments:** IT
- **CTA types detected:** Trial, Unknown
- **Generated:** 2026-09-22T13:06:57.703Z

## Breakdown

| ID | Subscore | Raw | Weight | Weighted | Detail |
|---|---|---|---|---|---|
| S1 | Story coverage | 43.63 | 0.4 | 17.45 | top-6 stories: compare(w=0.98, c=0.30), migrate-jira(w=0.95, c=0.30), fast-check(w=0.94, c=1.00), ux-check(w=0.71, c=0.30), sandbox(w=0.62, c=0.53), security(w=0.53, c=0.00) |
| S2 | Segment fit | 100 | 0.3 | 30 | mentioned=1/1 [IT] |
| S3 | Role addressability | 58.33 | 0.2 | 11.67 | PM=0.67, DM=0.50 |
| S4 | CTA alignment | 100 | 0.1 | 10 | cta-types=[Trial,Unknown], match=1/1 |

## Story coverage (top-N)

| Story | Weight | Covered | Status |
|---|---|---|---|
| compare — Хочу сравнить с тем, что уже есть | 0.98 | 0.3 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| migrate-jira — Хочу понять, стоит ли переезжать с Jira | 0.95 | 0.3 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| fast-check — Хочу быстро проверить, подойдёт ли нам | 0.94 | 1 | ✅ covered |
| ux-check — Хочу проверить UX до решения | 0.71 | 0.3 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| sandbox — Хочу проверить, не сломаем ли мы всё | 0.62 | 0.53 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| security — Хочу понять ограничения и безопасность | 0.53 | 0 | ❌ not covered — добавь секцию/копи для "Хочу понять ограничения и безопасность" (keywords: безопасн, on-prem, on prem) |

## Issues

- **score-below-threshold**: Audience-score 69.12 ниже порога 70.
  - _suggestion:_ Слабее всего S1 (Story coverage=43.63): top-6 stories: compare(w=0.98, c=0.30), migrate-jira(w=0.95, c=0.30), fast-check(w=0.94, c=1.00), ux-check(w=0.71, c=0.30), sandbox(w=0.62, c=0.53), security(w=0.53, c=0.00). Не покрыты stories: compare (Хочу сравнить с тем, что уже есть); migrate-jira (Хочу понять, стоит ли переезжать с Jira); ux-check (Хочу проверить UX до решения). Добавь соответствующие секции или ключевые слова.

<!-- /gen:audience-score -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

