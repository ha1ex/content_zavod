---
slug: domain-mock-matrix
type: reference
created: 2026-05-16
updated: 2026-05-16
status: rule
sources:
  - packages/ui/src/landing/mocks/
  - packages/harness/src/schemas/landing-spec.ts
  - wiki/landings/kaiten-techsupport-reference.md
  - wiki/landings/crm-reference.md
related:
  - packages/harness/src/prompts/section-mock-skill.md
  - .claude/skills/buffalo-generate/SKILL.md
  - wiki/references/external-mock-references.md
tags:
  - mock
  - domain
  - rules
  - reference
stale: false
---

# Domain → Mock matrix (обязательное правило выбора mock'ов)

> **Правило одной строкой.** Mock-компонент должен принадлежать домену продукта.
> Совпадения по форме (board, chat, kpi, console) недостаточно. Для нового домена —
> создавай новый набор mock'ов, не подбирай «похожий» из чужого.

## Зачем это правило

Раньше при сборке лендингов для нового домена (CRM, HR, marketing) подбирались
«семантически близкие» mock'и из существующей библиотеки:

- `pm-board` (PM-доска со story points и спринтами) → выдавался за «воронку
  продаж CRM».
- `request-card` (карточка тикета поддержки с чек-листом и чатом) → выдавался
  за «карточку клиента CRM».
- `integrations-console` (лента событий 1С/GitLab/AmoCRM — Kaiten-домен) →
  выдавался за «омниканальный inbox CRM».
- `analytics-kpi` (загрузка PM-команд) → выдавался за «дашборд CRM-руководителя».

Получалось визуально неубедительно: лендинг продаёт CRM, а на иллюстрациях
видны PM-спринты и тикеты поддержки. Это домен-подмена, она не лечится сменой
русских текстов внутри mock'а — нужна другая визуальная структура (карточка
CRM-сделки отличается от карточки PM-задачи: компания vs эпик, сумма vs
story points, дата следующего шага vs sprint, статус «горячий лид» vs «in review»).

## Workflow при работе с новым лендингом

1. **Определи домен** по `brief.product` + `brief.market`.
2. **Проверь матрицу ниже** — есть ли набор mock'ов под этот домен?
   - Если **есть** — выбирай из этого набора, не из чужих. Проверь покрытие
     всех визуальных секций лендинга (Hero, MediaCopy×N, TabbedFeature,
     ScenarioWalkthrough). Если 1-2 секции непокрыты — создай недостающие.
   - Если **нет** — это сигнал «нужен новый набор mock'ов под новый домен».
     Не подбирай «похожие» из чужого домена. Останови spec, опиши кейс
     пользователю, реализуй 5-8 доменно-специфичных компонентов по
     [`section-mock-skill.md`](../../packages/harness/src/prompts/section-mock-skill.md),
     потом возвращайся к spec.
3. **Не оставляй `generic` / `default`** в Hero или MediaCopy. Эти варианты —
   аварийный fallback, не выбор. Если ставишь — обоснуй в комментарии (но
   лучше создай новый mock).
4. **После создания нового набора** — добавь строку в эту матрицу и заведи
   reference-документ `wiki/landings/<domain>-reference.md` по образцу
   существующих (`kaiten-techsupport-reference.md`, `crm-reference.md`).

## Покрытие по доменам

### Project Management (PM, спринты, эпики, story points)

Аудитория: команды разработки, PMO, тимлиды. Лексика: спринты, эпики, story
points, ревью, MR, deployment, дорожная карта.

| Mock | Variant slug | Что показывает |
|---|---|---|
| `PmBoardMock` | `pm-board` | Канбан PM-команды: Бэклог → В работе → Ревью → Готово, карточки с эпиками, story points, исполнителями |
| `KnowledgeBaseMock` | `kb-public` / `kb-internal` | Статья базы знаний или внутренний регламент |
| `AnalyticsKpiMock` | `analytics-kpi` | Дашборд руководителя: 2×2 KPI (спринт в срок, задач в работе, цикл story, риски) + загрузка команд |
| `IntegrationsConsoleMock` | `integrations-console` | Лента событий из 1С, AmoCRM, Telegram, GitLab |
| `ModulesMatrixMock` | `modules-matrix` | Bento-grid модулей платформы (PM, KB, поддержка, BPM, BI, AI) |

**Reference:** [`wiki/landings/kaiten-platform.md`](../landings/kaiten-platform.md).

### Service Desk / Поддержка

Аудитория: команды техподдержки, customer success, сервисные менеджеры.
Лексика: обращение, SLA, очередь, эскалация, чат с клиентом, FAQ.

| Mock | Variant slug | Что показывает |
|---|---|---|
| `SupportBoardMock` | `support-board` | Канбан-доска заявок поддержки: Очередь → В работе → Готовлю ответ → Готово |
| `RequestCardMock` | `request-card` | Карточка заявки с чатом клиент/агент и чек-листом действий |
| `KnowledgeBaseMock` | `kb-public` | Статья базы знаний для клиентов |
| `KnowledgeBaseMock` | `kb-internal` | Внутренний регламент для агентов |

**Reference:** [`wiki/landings/kaiten-techsupport-reference.md`](../landings/kaiten-techsupport-reference.md).

### CRM / Продажи

Аудитория: владельцы SMB, руководители отделов продаж, маркетологи, сервисные
менеджеры. Лексика: лид, сделка, воронка, конверсия, CPL, выручка, карточка
клиента, омниканальность.

| Mock | Variant slug | Что показывает |
|---|---|---|
| `SalesFunnelMock` | `sales-funnel` | Воронка сделок: Новый лид → Квалификация → Договор → Оплата, карточки с компанией, суммой в рублях, контактом, датой следующего шага |
| `CrmClientCardMock` | `crm-client-card` | Карточка клиента с табами (Профиль / Сделки / История / Документы / Задачи), активной сделкой, таймлайном событий |
| `OmnichannelInboxMock` | `omnichannel-inbox` | Единый inbox обращений: звонок, Telegram, чат сайта, почта, WhatsApp с цвет-кодом канала |
| `CallOverlayMock` | `call-overlay` | Окно входящего звонка поверх карточки клиента: таймер, скрипт продаж, заметка после разговора |
| `CrmAnalyticsMock` | `crm-analytics` | Дашборд CRM: выручка, конверсия в оплату, стоимость лида, длина сделки, воронка по стадиям, источники лидов |
| `DocTemplateMock` | `doc-template` | Счёт с автоподстановкой полей клиента и статусом Сформирован → Отправлен → Просмотрен → Оплачен |
| `BookingCalendarMock` | `booking-calendar` | Онлайн-запись: сетка специалисты × часы, выбранный слот, подтверждение брони |
| `MobileCrmMock` | `mobile-crm` | Мобильное приложение CRM: пропущенный звонок, KPI дня, активные сделки, нижняя таб-навигация, FAB |

**Reference:** [`wiki/landings/crm-reference.md`](../landings/crm-reference.md).

### Домены, которые ждут своего набора mock'ов

При первом лендинге в каждом из этих доменов — создавать набор mock'ов
**перед написанием spec**, потом заводить reference-файл. Никаких подмен.

#### HR / Recruiting / People Operations

Аудитория: HR BP, рекрутёры, head of people. Лексика: кандидат, вакансия,
оффер, онбординг, перформанс-ревью, 1-on-1.

Нужные mock'и:
- `HiringPipelineMock` (`hiring-pipeline`) — канбан найма: Заявка → Скрининг →
  Интервью → Тестовое → Оффер → Принят, в карточке кандидат с фото, грейдом,
  ожидаемой ЗП, текущим этапом и интервьюером.
- `CandidateCardMock` (`candidate-card`) — карточка кандидата с табами
  (Профиль / Резюме / Интервью / Тестовое / Оффер), оценками интервьюеров.
- `OnboardingChecklistMock` (`onboarding-checklist`) — чек-лист онбординга
  по дням первой недели, с владельцами задач и статусами.
- `OrgChartMock` (`org-chart`) — фрагмент оргструктуры с открытыми вакансиями.
- `PerformanceReviewMock` (`performance-review`) — карточка ревью с целями,
  оценками peers и manager, обратной связью.

#### Marketing Automation

Аудитория: маркетологи, head of growth, продактовые маркетологи. Лексика:
кампания, A/B-тест, конверсия, LTV/CAC, email-цепочка, сегмент аудитории.

Нужные mock'и:
- `CampaignDashboardMock` (`campaign-dashboard`) — дашборд кампании с CTR,
  CPC, конверсией по каналам, графиком расходов.
- `EmailSequenceMock` (`email-sequence`) — flow email-цепочки с триггерами,
  задержками, ветвлениями open/click.
- `AbTestResultsMock` (`ab-test-results`) — результаты A/B: вариант A vs B,
  стат-значимость, lift по метрике.
- `AudienceSegmentsMock` (`audience-segments`) — список сегментов с правилами
  включения и размером каждого.

#### BPM / Workflow Automation

Аудитория: ops-директора, бизнес-аналитики. Лексика: процесс, шаг, согласование,
SLA, эскалация, BPMN, узкое место.

Нужные mock'и:
- `ProcessFlowchartMock` (`process-flowchart`) — визуальная схема процесса с
  шагами, ветвлениями и SLA на каждом шаге.
- `ApprovalChainMock` (`approval-chain`) — цепочка согласований с подписантами,
  статусом каждого, временем ожидания.
- `SlaTrackerMock` (`sla-tracker`) — таблица процессов с временем выполнения
  vs SLA, цвет-код красный/зелёный.

#### Finance / Accounting

Аудитория: главбух, CFO, финансовые контролёры. Лексика: проводка, счёт,
сверка, бюджет, P&L, дебиторка/кредиторка.

Нужные mock'и:
- `LedgerViewMock` (`ledger-view`) — фрагмент главной книги с проводками,
  дебет/кредит, балансом.
- `InvoiceStatusMock` (`invoice-status`) — список счетов с компанией, суммой,
  сроком оплаты, статусом просрочки.
- `ReconciliationMatrixMock` (`reconciliation-matrix`) — матрица сверки
  банк × ERP с расхождениями.

#### E-commerce / Retail operations

Аудитория: владельцы магазинов, retail-менеджеры. Лексика: SKU, заказ,
остаток, доставка, маркетплейс, повторная покупка.

Нужные mock'и:
- `OrderQueueMock` (`order-queue`) — лента заказов с маркетплейсов и сайта,
  статус сборки/доставки.
- `InventoryGridMock` (`inventory-grid`) — каталог товаров с остатками по
  складам, минимальным запасом.
- `MarketplaceConnectorMock` (`marketplace-connector`) — статус подключения к
  Wildberries / Ozon / Я.Маркет с числом активных карточек.

## Жёсткие правила (повторно — для системного prompt'а)

1. **Один лендинг = один домен.** Не миксуй mock'и из разных доменов «для
   разнообразия». Если на CRM-лендинге нужен PM-mock для секции про
   «командную работу над сделкой» — это сигнал, что либо секция не нужна,
   либо нужно создать `crm-team-collaboration` mock в CRM-домене.

2. **Hero — всегда из домена продукта.** Hero — главный визуальный сигнал
   «о чём этот лендинг». Подмена здесь самая дорогая. Если нет подходящего
   Hero-mock'а — создай **в первую очередь его**, остальное может подождать.

3. **`generic` / `default` запрещены вне нарративных layouts.** В layouts
   `enterprise-modular-saas`, `single-module-deep-dive`, `crm-product-tour`,
   `depersonalized-product-tour` — нельзя. Только в `story-led-unaware`
   допускается 1 `default` на лендинг с обоснованием.

4. **Domain-mismatched лексика в карточках mock'а — блокер review.** Если
   на CRM-лендинге в карточке `crm-client-card` слова «спринт», «эпик»,
   «story points», «pull request», «MR merged» — это значит, что mock
   был склонирован из PM-домена и забыли поменять контент. Так не должно
   быть.

5. **Layout-conformance валидатор + visual-diversity валидатор не ловят
   cross-domain reuse.** Они проверяют структуру и формальное разнообразие
   variants, но не семантический фит. Эта проверка — на агенте при выборе
   variants. Поэтому правило здесь, в матрице, — обязательно к чтению
   перед каждым новым лендингом.

## Связанные документы

- [`packages/harness/src/prompts/section-mock-skill.md`](../../packages/harness/src/prompts/section-mock-skill.md)
  — детальные правила композиции каждого mock-компонента (структура файла,
  токены, lucide-иконки, типографика).
- [`.claude/skills/buffalo-generate/SKILL.md`](../../.claude/skills/buffalo-generate/SKILL.md)
  — workflow генерации лендинга. Шаг 0.5 «Domain audit» обязателен.
- [`wiki/references/external-mock-references.md`](./external-mock-references.md)
  — внешние эталоны mock'ов (Linear, Notion, Vercel, Stripe, Intercom) для
  визуального вдохновения. Не путать с domain-fit: эталон даёт стиль, домен
  даёт содержание.
- Reference-лендинги по доменам:
  - PM — [`wiki/landings/kaiten-platform.md`](../landings/kaiten-platform.md).
  - Support — [`wiki/landings/kaiten-techsupport-reference.md`](../landings/kaiten-techsupport-reference.md).
  - CRM — [`wiki/landings/crm-reference.md`](../landings/crm-reference.md).
