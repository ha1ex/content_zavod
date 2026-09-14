---
slug: partners
type: landing
created: 2026-09-02
updated: 2026-09-02
status: draft
brief: content/briefs/partners.json
archetype: saas_landing
goal: contact_sales
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
  - stats
  - partner_directory
  - process
  - faq
  - registration_cta
  - kaiten_footer
generator: host-agent
durationMs: 0
tokenEstimate: 47380
tags:
  - landing
  - saas_landing
stale: false
---
# Landing summary

<!-- gen:spec-meta -->
- **slug:** `partners`
- **brief:** `content/briefs/partners.json`
- **archetype:** `saas_landing`
- **goal:** `contact_sales` (brief.cta = "Выбрать партнёра")
- **sections used:** `site_header, hero, stats, partner_directory, process, faq, registration_cta, kaiten_footer`
- **token estimate:** `47380`
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

- **title:** "Партнёры Кайтена: у кого купить лицензии и кто поможет внедрить"
- **subtitle:** "23 компании в России и Казахстане работают с Кайтеном официально: продают лицензии, настраивают процессы под ваш бизнес и сопровождают команду после запуска" _(156/200 chars)_
- **primaryCta:** "Выбрать партнёра" → `#partner_directory`
- **secondaryCta:** "Стать партнёром"

### stats (StatStrip)


### partner_directory (PartnerDirectory)


### process (ProcessSteps)


### faq (FAQAccordion)

- **title:** "Вопросы о работе с партнёрами"
- **items:** 5 Q&A
  1. "Чем реселлер отличается от интегратора" — answer 260/600 chars
  2. "С кем я заключаю договор" — answer 166/600 chars
  3. "Сколько стоит Кайтен через партнёра" — answer 138/600 chars
  4. "Моего города нет в каталоге" — answer 174/600 chars
  5. "Как попасть в каталог" — answer 107/600 chars

### registration_cta (RegistrationCta)


### kaiten_footer (LandingFooterMock)
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
# Audience score — `partners`

- **Score:** 35.98 / 100 (threshold 70) — ❌ fail
- **Resolved segments:** IT
- **CTA types detected:** Partner
- **Generated:** 2026-09-02T09:52:38.082Z

## Breakdown

| ID | Subscore | Raw | Weight | Weighted | Detail |
|---|---|---|---|---|---|
| S1 | Story coverage | 6.64 | 0.4 | 2.65 | top-6 stories: compare(w=0.98, c=0.00), migrate-jira(w=0.95, c=0.23), fast-check(w=0.94, c=0.00), ux-check(w=0.71, c=0.00), sandbox(w=0.62, c=0.00), security(w=0.53, c=0.17) |
| S2 | Segment fit | 100 | 0.3 | 30 | mentioned=1/1 [IT] |
| S3 | Role addressability | 16.67 | 0.2 | 3.33 | PM=0.33, DM=0.00 |
| S4 | CTA alignment | 0 | 0.1 | 0 | cta-types=[Partner], match=0/1 |

## Story coverage (top-N)

| Story | Weight | Covered | Status |
|---|---|---|---|
| compare — Хочу сравнить с тем, что уже есть | 0.98 | 0 | ❌ not covered — добавь секцию/копи для "Хочу сравнить с тем, что уже есть" (keywords: сравни, сравнен,  vs ) |
| migrate-jira — Хочу понять, стоит ли переезжать с Jira | 0.95 | 0.23 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |
| fast-check — Хочу быстро проверить, подойдёт ли нам | 0.94 | 0 | ❌ not covered — добавь секцию/копи для "Хочу быстро проверить, подойдёт ли нам" (keywords: шаблон, пример, кейс) |
| ux-check — Хочу проверить UX до решения | 0.71 | 0 | ❌ not covered — добавь секцию/копи для "Хочу проверить UX до решения" (keywords: ux, интерфейс, интуитив) |
| sandbox — Хочу проверить, не сломаем ли мы всё | 0.62 | 0 | ❌ not covered — добавь секцию/копи для "Хочу проверить, не сломаем ли мы всё" (keywords: sandbox, песочниц, тест) |
| security — Хочу понять ограничения и безопасность | 0.53 | 0.18 | 🟡 partial — добавь ключевые слова или CTA story в копирайт |

## Issues

- **must-pass-failed** (`it-needs-compare-or-trial`): IT-сегмент в брифе, но нет ни покрытия story "compare/migrate-jira", ни Trial-CTA в hero.
  - _suggestion:_ Добавь либо сравнительный блок (Kaiten vs Jira/Trello/YouTrack), либо переведи hero.primaryCta на «Попробовать бесплатно».
- **score-below-threshold**: Audience-score 35.98 ниже порога 70.
  - _suggestion:_ Слабее всего S4 (CTA alignment=0): cta-types=[Partner], match=0/1. Не покрыты stories: compare (Хочу сравнить с тем, что уже есть); migrate-jira (Хочу понять, стоит ли переезжать с Jira); fast-check (Хочу быстро проверить, подойдёт ли нам). Добавь соответствующие секции или ключевые слова.

<!-- /gen:audience-score -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

