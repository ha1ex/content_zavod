---
slug: webinar-proektnoe-upravlenie
type: landing
created: 2026-07-21
updated: 2026-07-21
status: draft
brief: content/briefs/webinar-proektnoe-upravlenie.json
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
  - pain_bubbles
  - media_copy
  - media_copy
  - timeline_roadmap
  - cta_banner
  - speaker
  - registration_cta
  - kaiten_footer
generator: host-agent
durationMs: 0
tokenEstimate: 47834
tags:
  - landing
  - event_landing
stale: false
---
# Landing summary

<!-- gen:spec-meta -->
- **slug:** `webinar-proektnoe-upravlenie`
- **brief:** `content/briefs/webinar-proektnoe-upravlenie.json`
- **archetype:** `event_landing`
- **goal:** `waitlist` (brief.cta = "Занять место")
- **sections used:** `site_header, hero, pain_bubbles, media_copy, media_copy, timeline_roadmap, cta_banner, speaker, registration_cta, kaiten_footer`
- **token estimate:** `47834`
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

- **title:** "Проектное управление в Кайтене — от сроков до гибкости команды"
- **subtitle:** "как выстроить управление проектами с нуля — план по классике, работа команды по‑гибкому" _(87/200 chars)_
- **primaryCta:** "Занять место" → `#registration`

### pain_bubbles (PainBubbles)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### timeline_roadmap (TimelineRoadmap)


### cta_banner (CtaBanner)


### speaker (SpeakerCard)


### registration_cta (RegistrationCta)


### kaiten_footer (LandingFooterMock)
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
# Audience score — `webinar-proektnoe-upravlenie`

- **Score:** 40.71 / 100 (threshold 70) — ❌ fail
- **Resolved segments:** IT
- **CTA types detected:** Register
- **Generated:** 2026-07-21T10:21:58.611Z

## Breakdown

| ID | Subscore | Raw | Weight | Weighted | Detail |
|---|---|---|---|---|---|
| S1 | Story coverage | 10.09 | 0.4 | 4.04 | top-6 stories: compare(w=0.98, c=0.00), migrate-jira(w=0.95, c=0.00), fast-check(w=0.94, c=0.23), ux-check(w=0.71, c=0.23), sandbox(w=0.62, c=0.00), security(w=0.53, c=0.17) |
| S2 | Segment fit | 100 | 0.3 | 30 | mentioned=1/1 [IT] |
| S3 | Role addressability | 33.33 | 0.2 | 6.67 | PM=0.67, DM=0.00 |
| S4 | CTA alignment | 0 | 0.1 | 0 | cta-types=[Register], match=0/1 |

## Story coverage (top-N)

| Story | Weight | Covered | Status |
|---|---|---|---|
| compare — Хочу сравнить с тем, что уже есть | 0.98 | 0 | ❌ not covered — добавь секцию/копи для "Хочу сравнить с тем, что уже есть" (keywords: сравни, сравнен,  vs ) |
| migrate-jira — Хочу понять, стоит ли переезжать с Jira | 0.95 | 0 | ❌ not covered — добавь секцию/копи для "Хочу понять, стоит ли переезжать с Jira" (keywords: jira, миграц, переезд) |
| fast-check — Хочу быстро проверить, подойдёт ли нам | 0.94 | 0.23 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| ux-check — Хочу проверить UX до решения | 0.71 | 0.23 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| sandbox — Хочу проверить, не сломаем ли мы всё | 0.62 | 0 | ❌ not covered — добавь секцию/копи для "Хочу проверить, не сломаем ли мы всё" (keywords: sandbox, песочниц, тест) |
| security — Хочу понять ограничения и безопасность | 0.53 | 0.18 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |

## Issues

- **score-below-threshold**: Audience-score 40.71 ниже порога 70.
  - _suggestion:_ Слабее всего S4 (CTA alignment=0): cta-types=[Register], match=0/1. Не покрыты stories: compare (Хочу сравнить с тем, что уже есть); migrate-jira (Хочу понять, стоит ли переезжать с Jira); fast-check (Хочу быстро проверить, подойдёт ли нам). Добавь соответствующие секции или ключевые слова.

<!-- /gen:audience-score -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

