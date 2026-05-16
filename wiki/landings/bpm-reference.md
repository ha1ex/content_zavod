---
slug: bpm-reference
type: landing
created: 2026-05-16
updated: 2026-05-16
status: reference
sources:
  - packages/ui/src/landing/mocks/ProcessFlowchartMock.tsx
  - packages/ui/src/landing/mocks/ApprovalChainMock.tsx
  - packages/ui/src/landing/mocks/SlaTrackerMock.tsx
related:
  - wiki/references/domain-mock-matrix.md
  - wiki/landings/crm-reference.md
tags:
  - reference
  - landing
  - mock-ui
  - bpm
  - workflow
stale: false
---

# BPM — internal reference

> Набор mock'ов для BPM / workflow automation / процессного управления.
> 3 компонента покрывают Hero + Tab + MediaCopy + Scenario.
>
> **Layout:** рекомендуется `enterprise-modular-saas` или
> `compliance-first-enterprise`.

## Что отличает BPM-домен от PM/Support визуально

| Аспект | PM (`pm-board`) | Support (`support-board`) | BPM (`process-flowchart`) |
|---|---|---|---|
| Главный артефакт | Канбан задач | Канбан тикетов | Схема процесса |
| Единица ценности | Story points | Время ответа (SLA) | Дни/часы выполнения шага vs SLA |
| Лексика | «Эпик · Спринт 12 · 8 sp» | «#4521 · SLA 87% · Очередь» | «Шаг 3 · Тендер · Закупки · SLA 3 дня · просрочка 1 день» |
| Карточка | Задача исполнителя | Обращение клиента | Шаг с ответственным и SLA |

## Состав mock'ов

| # | Mock | Variant slug | Используется в секциях |
|---|---|---|---|
| 1 | `ProcessFlowchartMock` | `process-flowchart` | Hero, MediaCopy «Конструктор процессов», Tab «BPMN» |
| 2 | `ApprovalChainMock` | `approval-chain` | MediaCopy «Согласования», Scenario «Эскалация» |
| 3 | `SlaTrackerMock` | `sla-tracker` | MediaCopy «SLA-аналитика», Tab «Мониторинг» |

## Чек-лист domain-fit для BPM-лендинга

- [ ] Hero — `process-flowchart` со схемой шагов, не `pm-board` (kanban
      задач) и не `support-board` (тикеты).
- [ ] Согласования — `approval-chain` с подписантами и эскалацией, не
      `request-card` (тикет с одним чатом).
- [ ] SLA — `sla-tracker` с цвет-кодом зон (зелёный/оранжевый/красный), не
      `analytics-kpi` (там агрегированные KPI команд).
- [ ] Нет «спринт / эпик / story points» — это PM-лексика.
- [ ] Нет «лид / сделка / выручка» — это CRM-лексика.
- [ ] Есть «процесс / шаг / SLA / эскалация / просрочка / узкое место /
      BPMN / согласование» — BPM-словарь.
- [ ] Цвет-код красный обязателен для просрочки.

## Связанные документы

- [`wiki/references/domain-mock-matrix.md`](../references/domain-mock-matrix.md)
- [`wiki/landings/crm-reference.md`](./crm-reference.md) — образец структуры
- [`packages/harness/src/prompts/section-mock-skill.md`](../../packages/harness/src/prompts/section-mock-skill.md)
