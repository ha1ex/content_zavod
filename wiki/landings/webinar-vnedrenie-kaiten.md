---
slug: webinar-vnedrenie-kaiten
type: landing
created: 2026-07-17
updated: 2026-07-18
status: draft
brief: content/briefs/webinar-vnedrenie-kaiten.json
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
  - wiki/design-system/components/hero.md
  - wiki/design-system/components/feature-grid.md
  - wiki/design-system/components/faq.md
  - wiki/design-system/components/accordion.md
  - wiki/design-system/components/final-cta.md
  - wiki/design-system/components/footer.md
  - wiki/design-system/components/button.md
  - wiki/archetypes/waitlist_landing.md
  - packages/harness/src/skills/conversion-landing.md
  - packages/harness/src/prompts/section-mock-skill.md
  - wiki/layouts/index.md
  - wiki/design-system/motion.md
  - wiki/design-system/grid.md
  - wiki/archetypes/event_landing.md
sections:
  - site_header
  - hero
  - pain_bubbles
  - media_copy
  - timeline_roadmap
  - cta_banner
  - stats
  - speaker
  - registration_cta
  - kaiten_footer
generator: host-agent
durationMs: 0
tokenEstimate: 46813
tags:
  - landing
  - waitlist_landing
stale: false
---
# Landing summary

<!-- gen:spec-meta -->
- **slug:** `webinar-vnedrenie-kaiten`
- **brief:** `content/briefs/webinar-vnedrenie-kaiten.json`
- **archetype:** `event_landing`
- **goal:** `waitlist` (brief.cta = "Занять место")
- **sections used:** `site_header, hero, pain_bubbles, media_copy, timeline_roadmap, cta_banner, stats, speaker, registration_cta, kaiten_footer`
- **token estimate:** `46813`
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

- **title:** "Внедрение Кайтена без стресса для команды"
- **subtitle:** "как переехать на новую систему, чтобы никто не сбежал обратно в чаты и таблицы" _(78/200 chars)_
- **primaryCta:** "Занять место" → `#registration`

### pain_bubbles (PainBubbles)


### media_copy (MediaCopy)


### timeline_roadmap (TimelineRoadmap)


### cta_banner (CtaBanner)


### stats (StatStrip)


### speaker (SpeakerCard)


### registration_cta (RegistrationCta)


### kaiten_footer (LandingFooterMock)
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
# Audience score — `webinar-vnedrenie-kaiten`

- **Score:** 46.3 / 100 (threshold 70) — ❌ fail
- **Resolved segments:** IT
- **CTA types detected:** Unknown
- **Generated:** 2026-07-18T07:41:15.686Z

## Breakdown

| ID | Subscore | Raw | Weight | Weighted | Detail |
|---|---|---|---|---|---|
| S1 | Story coverage | 28.25 | 0.4 | 11.3 | top-6 stories: compare(w=0.98, c=0.35), migrate-jira(w=0.95, c=0.47), fast-check(w=0.94, c=0.23), ux-check(w=0.71, c=0.47), sandbox(w=0.62, c=0.00), security(w=0.53, c=0.00) |
| S2 | Segment fit | 100 | 0.3 | 30 | mentioned=1/1 [IT] |
| S3 | Role addressability | 25 | 0.2 | 5 | PM=0.00, DM=0.50 |
| S4 | CTA alignment | 0 | 0.1 | 0 | cta-types=[Unknown], match=0/1 |

## Story coverage (top-N)

| Story | Weight | Covered | Status |
|---|---|---|---|
| compare — Хочу сравнить с тем, что уже есть | 0.98 | 0.35 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| migrate-jira — Хочу понять, стоит ли переезжать с Jira | 0.95 | 0.47 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| fast-check — Хочу быстро проверить, подойдёт ли нам | 0.94 | 0.23 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| ux-check — Хочу проверить UX до решения | 0.71 | 0.47 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| sandbox — Хочу проверить, не сломаем ли мы всё | 0.62 | 0 | ❌ not covered — добавь секцию/копи для "Хочу проверить, не сломаем ли мы всё" (keywords: sandbox, песочниц, тест) |
| security — Хочу понять ограничения и безопасность | 0.53 | 0 | ❌ not covered — добавь секцию/копи для "Хочу понять ограничения и безопасность" (keywords: безопасн, on-prem, on prem) |

## Issues

- **must-pass-failed** (`it-needs-compare-or-trial`): IT-сегмент в брифе, но нет ни покрытия story "compare/migrate-jira", ни Trial-CTA в hero.
  - _suggestion:_ Добавь либо сравнительный блок (Kaiten vs Jira/Trello/YouTrack), либо переведи hero.primaryCta на «Попробовать бесплатно».
- **score-below-threshold**: Audience-score 46.3 ниже порога 70.
  - _suggestion:_ Слабее всего S4 (CTA alignment=0): cta-types=[Unknown], match=0/1. Не покрыты stories: compare (Хочу сравнить с тем, что уже есть); migrate-jira (Хочу понять, стоит ли переезжать с Jira); fast-check (Хочу быстро проверить, подойдёт ли нам). Добавь соответствующие секции или ключевые слова.

<!-- /gen:audience-score -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

