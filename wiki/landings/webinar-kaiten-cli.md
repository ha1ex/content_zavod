---
slug: webinar-kaiten-cli
type: landing
created: 2026-08-10
updated: 2026-08-10
status: draft
brief: content/briefs/webinar-kaiten-cli.json
archetype: event_landing
goal: waitlist
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
  - wiki/design-system/components/faq.md
  - wiki/design-system/components/accordion.md
  - wiki/design-system/components/final-cta.md
  - wiki/design-system/components/footer.md
  - wiki/design-system/components/button.md
  - wiki/archetypes/event_landing.md
  - packages/harness/src/skills/conversion-landing.md
  - packages/harness/src/prompts/section-mock-skill.md
  - wiki/layouts/index.md
sections:
  - site_header
  - hero
  - features
  - timeline_roadmap
  - tabbed_feature
  - speaker
  - media_copy
  - registration_cta
  - faq
  - final_cta
  - kaiten_footer
generator: host-agent
durationMs: 0
tokenEstimate: 48508
tags:
  - landing
  - event_landing
stale: false
---
# Landing summary

<!-- gen:spec-meta -->
- **slug:** `webinar-kaiten-cli`
- **brief:** `content/briefs/webinar-kaiten-cli.json`
- **archetype:** `event_landing`
- **goal:** `waitlist` (brief.cta = "Зарегистрироваться")
- **sections used:** `site_header, hero, features, timeline_roadmap, tabbed_feature, speaker, media_copy, registration_cta, faq, final_cta, kaiten_footer`
- **token estimate:** `48508`
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
- `wiki/design-system/components/faq.md`
- `wiki/design-system/components/accordion.md`
- `wiki/design-system/components/final-cta.md`
- `wiki/design-system/components/footer.md`
- `wiki/design-system/components/button.md`
- `wiki/archetypes/event_landing.md`
- `packages/harness/src/skills/conversion-landing.md`
- `packages/harness/src/prompts/section-mock-skill.md`
- `wiki/layouts/index.md`
<!-- /gen:spec-meta -->

## Sections

<!-- gen:sections-summary -->
### site_header (SiteHeader)


### hero (HeroSection)

- **title:** "Kaiten CLI: ставим за минуту и применяем в трёх сценариях"
- **subtitle:** "Виктор Огнев, лидер комьюнити Кайтена, покажет установку и разберёт три рабочих кейса. Всё вживую, в окне терминала." _(116/200 chars)_
- **primaryCta:** "Зарегистрироваться" → `#registration`
- **visual:** `product_screenshot` (assetId: `webinar-kaiten-cli-hero`)

### features (FeatureGrid)

- **title:** "Что вы увидите на экране"
- **columns:** 3 · **items:** 3
  1. `MousePointerClick` · "Работа без лишних кликов" — 80 chars
  2. `Repeat` · "Повторяемые операции" — 82 chars
  3. `HardDrive` · "Данные остаются у вас" — 70 chars

### timeline_roadmap (TimelineRoadmap)


### tabbed_feature (TabbedFeatureSection)


### speaker (SpeakerCard)


### media_copy (MediaCopy)


### registration_cta (RegistrationCta)


### faq (FAQAccordion)

- **title:** "Частые вопросы"
- **items:** 7 Q&A
  1. "Нужен опыт работы в терминале?" — answer 66/600 chars
  2. "Нужен платный тариф Кайтена?" — answer 39/600 chars
  3. "Что установить заранее?" — answer 54/600 chars
  4. "Будет запись?" — answer 75/600 chars
  5. "Работает ли CLI с версией на своём сервере?" — answer 56/600 chars
  6. "Чем CLI отличается от Kaiten MCP?" — answer 173/600 chars
  7. "Кто отвечает за поддержку проекта?" — answer 352/600 chars

### final_cta (FinalCta)

- **title:** "До эфира осталось немного"
- **primaryCta:** "Зарегистрироваться" → `#registration`

### kaiten_footer (LandingFooterMock)
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
# Audience score — `webinar-kaiten-cli`

- **Score:** 70.75 / 100 (threshold 70) — ✅ pass
- **Resolved segments:** IT
- **CTA types detected:** Trial, Unknown
- **Generated:** 2026-08-10T14:21:20.899Z

## Breakdown

| ID | Subscore | Raw | Weight | Weighted | Detail |
|---|---|---|---|---|---|
| S1 | Story coverage | 56.04 | 0.4 | 22.42 | top-6 stories: compare(w=0.98, c=0.65), migrate-jira(w=0.95, c=0.77), fast-check(w=0.94, c=0.77), ux-check(w=0.71, c=0.53), sandbox(w=0.62, c=0.30), security(w=0.53, c=0.00) |
| S2 | Segment fit | 100 | 0.3 | 30 | mentioned=1/1 [IT] |
| S3 | Role addressability | 41.67 | 0.2 | 8.33 | PM=0.33, DM=0.50 |
| S4 | CTA alignment | 100 | 0.1 | 10 | cta-types=[Trial,Unknown], match=1/1 |

## Story coverage (top-N)

| Story | Weight | Covered | Status |
|---|---|---|---|
| compare — Хочу сравнить с тем, что уже есть | 0.98 | 0.65 | ✅ covered |
| migrate-jira — Хочу понять, стоит ли переезжать с Jira | 0.95 | 0.77 | ✅ covered |
| fast-check — Хочу быстро проверить, подойдёт ли нам | 0.94 | 0.77 | ✅ covered |
| ux-check — Хочу проверить UX до решения | 0.71 | 0.53 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
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

