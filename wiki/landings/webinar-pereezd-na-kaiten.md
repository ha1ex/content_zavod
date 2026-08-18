---
slug: webinar-pereezd-na-kaiten
type: landing
created: 2026-08-18
updated: 2026-08-18
status: draft
brief: content/briefs/webinar-pereezd-na-kaiten.json
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
  - media_copy
  - features
  - timeline_roadmap
  - media_copy
  - speaker
  - stats
  - registration_cta
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
- **slug:** `webinar-pereezd-na-kaiten`
- **brief:** `content/briefs/webinar-pereezd-na-kaiten.json`
- **archetype:** `event_landing`
- **goal:** `waitlist` (brief.cta = "Зарегистрироваться")
- **sections used:** `site_header, hero, media_copy, features, timeline_roadmap, media_copy, speaker, stats, registration_cta, kaiten_footer`
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

- **title:** "Переезд на Кайтен: как уйти с Jira, Trello и Notion, ничего не потеряв"
- **subtitle:** "Онлайн-вебинар для тех, кто решил сменить трекер задач, но боится потерять данные, связи задач и время команды" _(110/200 chars)_
- **primaryCta:** "Зарегистрироваться" → `#registration`

### media_copy (MediaCopy)


### features (FeatureGrid)

- **title:** "Кому подойдёт"
- **columns:** 3 · **items:** 3
  1. `Building2` · "Руководителям" — 81 chars
  2. `Server` · "ИТ-директорам" — 54 chars
  3. `Users` · "Командам" — 68 chars

### timeline_roadmap (TimelineRoadmap)


### media_copy (MediaCopy)


### speaker (SpeakerCard)


### stats (StatStrip)


### registration_cta (RegistrationCta)


### kaiten_footer (LandingFooterMock)
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
# Audience score — `webinar-pereezd-na-kaiten`

- **Score:** 62.51 / 100 (threshold 70) — ❌ fail
- **Resolved segments:** IT
- **CTA types detected:** Trial
- **Generated:** 2026-08-18T10:25:58.648Z

## Breakdown

| ID | Subscore | Raw | Weight | Weighted | Detail |
|---|---|---|---|---|---|
| S1 | Story coverage | 47.95 | 0.4 | 19.18 | top-6 stories: compare(w=0.98, c=0.65), migrate-jira(w=0.95, c=1.00), fast-check(w=0.94, c=0.30), ux-check(w=0.71, c=0.30), sandbox(w=0.62, c=0.30), security(w=0.53, c=0.00) |
| S2 | Segment fit | 100 | 0.3 | 30 | mentioned=1/1 [IT] |
| S3 | Role addressability | 16.67 | 0.2 | 3.33 | PM=0.33, DM=0.00 |
| S4 | CTA alignment | 100 | 0.1 | 10 | cta-types=[Trial], match=1/1 |

## Story coverage (top-N)

| Story | Weight | Covered | Status |
|---|---|---|---|
| compare — Хочу сравнить с тем, что уже есть | 0.98 | 0.65 | ✅ covered |
| migrate-jira — Хочу понять, стоит ли переезжать с Jira | 0.95 | 1 | ✅ covered |
| fast-check — Хочу быстро проверить, подойдёт ли нам | 0.94 | 0.3 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| ux-check — Хочу проверить UX до решения | 0.71 | 0.3 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| sandbox — Хочу проверить, не сломаем ли мы всё | 0.62 | 0.3 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| security — Хочу понять ограничения и безопасность | 0.53 | 0 | ❌ not covered — добавь секцию/копи для "Хочу понять ограничения и безопасность" (keywords: безопасн, on-prem, on prem) |

## Issues

- **score-below-threshold**: Audience-score 62.51 ниже порога 70.
  - _suggestion:_ Слабее всего S3 (Role addressability=16.67): PM=0.33, DM=0.00. Не покрыты stories: fast-check (Хочу быстро проверить, подойдёт ли нам); ux-check (Хочу проверить UX до решения); sandbox (Хочу проверить, не сломаем ли мы всё). Добавь соответствующие секции или ключевые слова.

<!-- /gen:audience-score -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

