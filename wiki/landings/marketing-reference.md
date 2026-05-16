---
slug: marketing-reference
type: landing
created: 2026-05-16
updated: 2026-05-16
status: reference
sources:
  - packages/ui/src/landing/mocks/CampaignDashboardMock.tsx
  - packages/ui/src/landing/mocks/EmailSequenceMock.tsx
  - packages/ui/src/landing/mocks/AbTestResultsMock.tsx
  - packages/ui/src/landing/mocks/AudienceSegmentsMock.tsx
related:
  - wiki/references/domain-mock-matrix.md
  - wiki/landings/crm-reference.md
tags:
  - reference
  - landing
  - mock-ui
  - marketing
  - growth
stale: false
---

# Marketing — internal reference

> Набор mock'ов для marketing automation / growth / email-platform лендингов.
> 4 компонента покрывают Hero + 2-3 таба + 1-2 MediaCopy.
>
> **Layout:** рекомендуется `crm-product-tour` или `single-module-deep-dive`.

## Что отличает Marketing-домен от CRM/Support визуально

| Аспект | CRM (`sales-funnel`) | Support (`support-board`) | Marketing (`campaign-dashboard`) |
|---|---|---|---|
| Главный артефакт | Воронка сделок | Доска тикетов | Дашборд кампании |
| Метрика | CPL / выручка | SLA / время ответа | CTR / CPL кампании / конверсия |
| Время измерения | За квартал | В минутах SLA | За дни кампании |
| Лексика | «Сделка 1,2 млн ₽ · Анна Соколова» | «Не приходит код · SLA 87%» | «CTR 4,2% ↑12% · Telegram Ads 42% бюджета» |

## Состав mock'ов

| # | Mock | Variant slug | Используется в секциях |
|---|---|---|---|
| 1 | `CampaignDashboardMock` | `campaign-dashboard` | Hero, MediaCopy «Управление кампаниями», Tab «Аналитика» |
| 2 | `EmailSequenceMock` | `email-sequence` | TabbedFeature «Email», Scenario «Запускает цепочку» |
| 3 | `AbTestResultsMock` | `ab-test-results` | TabbedFeature «Эксперименты», Scenario «Анализирует тест» |
| 4 | `AudienceSegmentsMock` | `audience-segments` | MediaCopy «Сегментация», Tab «Аудитория» |

## Чек-лист domain-fit для Marketing-лендинга

- [ ] Hero — `campaign-dashboard`, не `analytics-kpi` (там PM-команды),
      не `sales-funnel` (это CRM-воронка), не `pm-board` (это спринты).
- [ ] Метрики — CTR / CPL / open rate / click rate / lift / p-value, а не
      story points / SLA-минуты / Pipeline-выручка.
- [ ] Цепочки — `email-sequence` с триггерами, не `process-flowchart` (это BPM)
      и не `pm-board` (это задачи).
- [ ] A/B-тесты — `ab-test-results` с stat-significance, не общая
      analytics-карточка.
- [ ] Сегменты — `audience-segments` с правилами формирования, не
      `modules-matrix` (там продуктовые модули).
- [ ] Нет CRM-лексики «сделка», «лид-карточка», «контактное лицо» — здесь
      работа с массой, а не с конкретным клиентом.

## Связанные документы

- [`wiki/references/domain-mock-matrix.md`](../references/domain-mock-matrix.md)
- [`wiki/landings/crm-reference.md`](./crm-reference.md) — образец структуры
- [`packages/harness/src/prompts/section-mock-skill.md`](../../packages/harness/src/prompts/section-mock-skill.md)
