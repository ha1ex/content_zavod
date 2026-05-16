---
slug: crm
type: landing
created: 2026-05-16
updated: 2026-05-16
status: draft
brief: content/briefs/crm.json
archetype: saas_landing
goal: try_free
sources:
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
  - wiki/layouts/depersonalized-product-tour.md
  - wiki/layouts/index.md
  - wiki/layouts/crm-product-tour.md
sections:
  - hero
  - benefits_strip
  - tabbed_feature
  - cta_banner
  - scenario_walkthrough
  - media_copy
  - media_copy
  - media_copy
  - features
  - industry_picker
  - process
  - stats
  - faq
  - final_cta
  - footer
generator: host-agent
durationMs: 0
tokenEstimate: 15165
tags:
  - landing
  - saas_landing
stale: false
---
# Landing summary

<!-- gen:spec-meta -->
- **slug:** `crm`
- **brief:** `content/briefs/crm.json`
- **archetype:** `saas_landing`
- **goal:** `try_free` (brief.cta = "Попробовать бесплатно")
- **sections used:** `hero, benefits_strip, tabbed_feature, cta_banner, scenario_walkthrough, media_copy, media_copy, media_copy, features, industry_picker, process, stats, faq, final_cta, footer`
- **token estimate:** `15165`
- **generation duration:** `0ms`
- **generator:** `host-agent`

**Sources (использованы в системном промпте):**
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
- `wiki/layouts/crm-product-tour.md`
- `wiki/layouts/index.md`
<!-- /gen:spec-meta -->

## Sections

<!-- gen:sections-summary -->
### hero (HeroSection)

- **title:** "Воронка продаж, клиенты и коммуникации в одной системе"
- **subtitle:** "Ведите сделки от первого обращения до повторной продажи, собирайте обращения из всех каналов и контролируйте работу менеджеров на каждом этапе." _(143/200 chars)_
- **primaryCta:** "Попробовать бесплатно" → `/signup`
- **secondaryCta:** "Получить демо"
- **visual:** `product_screenshot` (assetId: `crm-sales-funnel`)

### benefits_strip (BenefitsStrip)


### tabbed_feature (TabbedFeatureSection)


### cta_banner (CtaBanner)


### scenario_walkthrough (ScenarioWalkthroughSection)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### media_copy (MediaCopy)


### features (FeatureGrid)

- **title:** "Набор инструментов для управления продажами и клиентами"
- **columns:** 4 · **items:** 8
  1. `Users` · "Клиентская база" — 64 chars
  2. `GitBranch` · "Воронка продаж" — 70 chars
  3. `MessageSquare` · "Каналы коммуникаций" — 61 chars
  4. `Zap` · "Автоматизация" — 62 chars
  5. `Mail` · "Маркетинг" — 56 chars
  6. `FileText` · "Документы" — 61 chars
  7. `BarChart3` · "Аналитика" — 53 chars
  8. `Plug` · "Интеграции" — 66 chars

### industry_picker (IndustryPickerSection)


### process (ProcessSteps)


### stats (StatStrip)


### faq (FAQAccordion)

- **title:** "Частые вопросы о CRM"
- **items:** 10 Q&A
  1. "Что такое CRM?" — answer 211/600 chars
  2. "Зачем бизнесу CRM?" — answer 176/600 chars
  3. "Можно ли перенести текущую клиентскую базу?" — answer 166/600 chars
  4. "Можно ли подключить телефонию?" — answer 178/600 chars
  5. "Можно ли работать с клиентами из мессенджеров и социальных сетей?" — answer 148/600 chars
  6. "Подходит ли CRM для малого бизнеса?" — answer 145/600 chars
  7. "Можно ли настроить CRM под свой процесс продаж?" — answer 129/600 chars
  8. "Есть ли мобильная версия?" — answer 134/600 chars
  9. "Что даёт аналитика в CRM?" — answer 164/600 chars
  10. "Можно ли автоматизировать рутинные действия?" — answer 148/600 chars

### final_cta (FinalCta)

- **title:** "Начните управлять продажами в CRM"
- **primaryCta:** "Попробовать бесплатно" → `/signup`

### footer (LandingFooter)

- **brand:** "CRM-платформа"
- **columns:** 4
<!-- /gen:sections-summary -->

## Audience score

<!-- gen:audience-score -->
_(автогенерируется audience-score gate'ом при agent apply)_
<!-- /gen:audience-score -->

## Lessons (LLM-extract)

_(extract предлагается через `harness ingest feedback`; правится руками)_

## Reviewer notes

_(заполняется через `harness ingest feedback <slug> "<note>"`)_

## History

