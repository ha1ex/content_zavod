---
slug: ds-component-faq
type: design-system
created: 2026-05-15
updated: 2026-05-15
sources:
  - packages/harness/src/registry/index.ts
related:
  - wiki/design-system/components/accordion.md
tags:
  - component
  - section
  - faq
stale: false
---

# FAQAccordion

Accordion FAQ. 2–12 пар «вопрос / ответ».

## Структура

- **eyebrow** (опц.)
- **title** (4..80)
- **description** (опц., ≤200)
- **items** (2..12) — `{ question: 4..140, answer: 10..600 }`

## Usage rules

- Вопросы уникальны в секции (`questions_unique` constraint).
- Question формулируется **от лица читателя**: «Сколько занимает интеграция?», а не «Что такое onboarding-process?».
- Answer: краткий, прямой, без marketing-language. Если ответ длиннее 600 символов — это статья, а не FAQ.

## Контент-рекомендации

- **Покрывайте топ-возражения.** Цена, длительность интеграции, on-prem vs cloud, кто владеет данными.
- **Не отвечайте на маркетинговые вопросы.** «Почему вы лучшие?» — это не FAQ, это hero-копи.

## Anti-patterns

- ❌ FAQ из 1–2 пар — не нужна секция, перенесите в hero/feature.
- ❌ Вопрос на двух языках в одной паре.
- ❌ Использовать FAQ как продажный канал («Можете доказать, что у вас лучшая поддержка? Да, у нас 24/7!»).
