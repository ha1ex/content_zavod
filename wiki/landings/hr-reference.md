---
slug: hr-reference
type: landing
created: 2026-05-16
updated: 2026-05-16
status: reference
sources:
  - packages/ui/src/landing/mocks/HiringPipelineMock.tsx
  - packages/ui/src/landing/mocks/CandidateCardMock.tsx
  - packages/ui/src/landing/mocks/OnboardingChecklistMock.tsx
  - packages/ui/src/landing/mocks/OrgChartMock.tsx
  - packages/ui/src/landing/mocks/PerformanceReviewMock.tsx
related:
  - wiki/references/domain-mock-matrix.md
  - wiki/landings/crm-reference.md
tags:
  - reference
  - landing
  - mock-ui
  - hr
  - recruiting
  - people-ops
stale: false
---

# HR — internal reference (HR-домен mock'ов)

> **Что это.** Эталонный набор mock'ов для HR-домена (найм, онбординг,
> performance, оргструктура). Образец того, как создавать набор для
> смежных доменов (5 компонентов покрывают Hero + 2-3 таба + 1-2 MediaCopy +
> Scenario walkthrough).
>
> **Spec:** ещё не создан — добавь при первом HR-лендинге.
>
> **Layout:** рекомендуется `crm-product-tour` (TabbedFeature + Scenario)
> либо `enterprise-modular-saas` (модульная HR-платформа).

## Что отличает HR-домен от PM/CRM визуально

| Аспект | PM (`pm-board`) | CRM (`sales-funnel`) | HR (`hiring-pipeline`) |
|---|---|---|---|
| Колонки канбана | Бэклог → В работе → Ревью → Готово | Лид → Квалификация → Договор → Оплата | Заявка → Скрининг → Интервью → Тестовое → Оффер → Принят |
| Что в карточке | Эпик, тип, story points, исполнитель | Компания, сумма, контакт, дата след. шага | Кандидат с инициалами, грейд (Jr/Md/Sr), ожидаемая ЗП, интервьюер |
| Единица ценности | Story points, спринт-цикл | Рубли, CPL, конверсия | Кандидаты в день, time-to-offer, грейд |
| Лексика window-chrome | «Спринт 12 · 46/60 sp» | «Воронка · 44 сделки · 19,4 млн ₽» | «Найм · Backend · 42 кандидата · 8 в работе» |

## Состав mock'ов в HR-наборе

| # | Mock | Variant slug | Используется в секциях |
|---|---|---|---|
| 1 | `HiringPipelineMock` | `hiring-pipeline` | Hero, MediaCopy «Воронка найма», Tab «Рекрутинг» |
| 2 | `CandidateCardMock` | `candidate-card` | TabbedFeature «Карточка кандидата», Scenario «Открывает кандидата» |
| 3 | `OnboardingChecklistMock` | `onboarding-checklist` | TabbedFeature «Онбординг», MediaCopy «Первая неделя» |
| 4 | `OrgChartMock` | `org-chart` | MediaCopy «Прозрачная структура», Tab «People Ops» |
| 5 | `PerformanceReviewMock` | `performance-review` | Scenario «Закрывает полугодие», MediaCopy «Performance Review» |

## Чек-лист domain-fit для HR-лендинга

- [ ] Hero — `hiring-pipeline`, не `pm-board` и не `sales-funnel`.
- [ ] Карточка человека — `candidate-card` с грейдом и оценками, не
      `request-card` (это тикет поддержки) и не `crm-client-card` (там
      клиент B2B, а здесь — кандидат).
- [ ] Онбординг — `onboarding-checklist` с днями и владельцами, не
      `request-card` checklist.
- [ ] Оргструктура — `org-chart` с числом подчинённых и open vacancies, не
      `modules-matrix`.
- [ ] Performance — `performance-review` с целями и 360°, не `analytics-kpi`.
- [ ] В карточках нет «спринт», «эпик», «story points», «MR merged» — это
      PM-лексика.
- [ ] Нет «сделка», «КП», «счёт», «CPL» — это CRM-лексика.
- [ ] Денежные значения — ожидания по ЗП в рублях («320 000 ₽ · на руки»).

## Связанные документы

- [`wiki/references/domain-mock-matrix.md`](../references/domain-mock-matrix.md)
- [`wiki/landings/crm-reference.md`](./crm-reference.md) — образец структуры
- [`packages/harness/src/prompts/section-mock-skill.md`](../../packages/harness/src/prompts/section-mock-skill.md)
