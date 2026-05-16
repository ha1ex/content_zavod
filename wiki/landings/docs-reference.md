---
slug: docs-reference
type: landing
created: 2026-05-16
updated: 2026-05-16
status: reference
sources:
  - content/landings/knowledge-base.json
  - packages/ui/src/landing/mocks/DocsTreeMock.tsx
  - packages/ui/src/landing/mocks/DocEditorRichMock.tsx
  - packages/ui/src/landing/mocks/PermissionsPanelMock.tsx
  - packages/ui/src/landing/mocks/ShareLinkCardMock.tsx
  - packages/ui/src/landing/mocks/TemplateGalleryMock.tsx
  - packages/ui/src/landing/mocks/MobileDocReaderMock.tsx
  - packages/ui/src/landing/mocks/KnowledgeBaseMock.tsx
  - wiki/layouts/depersonalized-product-tour.md
related:
  - wiki/references/domain-mock-matrix.md
  - wiki/landings/crm-reference.md
  - packages/harness/src/prompts/section-mock-skill.md
tags:
  - reference
  - landing
  - mock-ui
  - docs
  - knowledge-base
stale: false
---

# Документы и база знаний — internal reference (docs-домен mock'ов)

> **Что это.** Эталонный набор mock'ов для домена «Документы и база знаний»
> (обезличенные продукты типа Notion / Confluence / Yonote / Teamly). Используется
> как:
>
> 1. Проверочный референс для новых docs-лендингов — соответствие реализованных
>    mock'ов нашему дизайн-токен набору и domain-fit правилу.
> 2. Образец того, как создавать набор mock'ов для нового домена (6 компонентов
>    под основные сценарии работы с документами и базой знаний + 2 переиспользованных
>    KB-mock'а).
>
> **Reference-лендинг live:** `http://localhost:3000/landings/knowledge-base`
> (после `pnpm dev`).
>
> **Spec:** [`content/landings/knowledge-base.json`](../../content/landings/knowledge-base.json).
>
> **Layout:** [`wiki/layouts/depersonalized-product-tour.md`](../layouts/depersonalized-product-tour.md).

## Что отличает docs-домен от других доменов визуально

| Аспект | docs (`docs-tree`) | pm (`pm-board`) | support (`support-board`) | crm (`sales-funnel`) |
|---|---|---|---|---|
| Главный сценарий | «найти и прочитать актуальный документ» | «провести задачу через спринт» | «закрыть обращение клиента» | «довести лид до оплаты» |
| Главный визуал | дерево разделов + открытый документ | канбан со спринтами | очередь обращений и чат | воронка сделок |
| Единица контента | документ, инструкция, регламент | задача, эпик, story | тикет, обращение | сделка, лид, контакт |
| Лексика | разделы, страницы, доступы, шаблоны, комментарии | спринт, эпик, story points, ревью | SLA, очередь, эскалация, чат | стадия, сумма, конверсия, источник лида |
| Метрика успеха | актуальность знаний, скорость поиска, ширина покрытия | спринт в срок, цикл story, нагрузка команды | время реакции, SLA, удовлетворённость | выручка, конверсия, CPL |

Эти отличия не покрываются props'ами — это разные визуальные структуры. Поэтому
для docs-домена нужен отдельный `DocsTreeMock`, а не `KnowledgeBaseMock` (последний
показывает **одну** карточку статьи в media-слоте, но не даёт ощущения **структуры
всей базы знаний**, которая обязательна для hero и обзорных секций).

## Состав mock'ов в docs-наборе

| # | Mock | Variant slug | Что иллюстрирует | Используется в секциях |
|---|---|---|---|---|
| 1 | `DocsTreeMock` | `docs-tree` | Дерево разделов + открытый документ с чек-листом и метаданными | Hero (`visual.variant`), MediaCopy «Структура знаний» |
| 2 | `DocEditorRichMock` | `doc-editor-rich` | Редактор: H1, текст, чек-лист, таблица, цитата, блок кода + оглавление | MediaCopy «Редактор», Hero (для editor-focused лендингов) |
| 3 | `PermissionsPanelMock` | `permissions-panel` | Окно настройки доступа: роли, группы, публичная ссылка | MediaCopy «Гибкие доступы», Scenario step «Открывает документ команде» |
| 4 | `ShareLinkCardMock` | `share-link-card` | Карточка публичной ссылки: тумблер доступа, URL, ограничения, автообновление | MediaCopy «Публичные ссылки», Scenario step «Отправляет клиенту» |
| 5 | `TemplateGalleryMock` | `template-gallery` | Сетка шаблонов: регламент, протокол, ТЗ, OKR, онбординг, FAQ | MediaCopy «Шаблоны», TabbedFeature «Готовый старт» |
| 6 | `MobileDocReaderMock` | `mobile-doc-reader` | Силуэт телефона: заголовок документа, чек-лист, нижняя навигация | MediaCopy «Любое устройство», Scenario step «Открывает с телефона» |
| 7 | `KnowledgeBaseMock` | `kb-public` | Опубликованная статья базы знаний для клиентов | MediaCopy «База знаний для клиентов» |
| 8 | `KnowledgeBaseMock` | `kb-internal` | Внутренний регламент для сотрудников | MediaCopy «База знаний для команды» |

**Покрытие.** 6 уникальных компонентов + 2 KB-варианта покрывают:
- 1 Hero
- 5–6 MediaCopy с чередующимися mock'ами
- 1 TabbedFeatureSection (если есть)
- 2–3 шага в ScenarioWalkthroughSection (если есть)

Этого достаточно для лендинга с ~14 секциями без повторов mock'ов подряд.

## Как использовать этот набор для нового docs-подобного лендинга

1. Открой [`wiki/references/domain-mock-matrix.md`](../references/domain-mock-matrix.md) —
   убедись, что новый продукт попадает в docs-домен (есть документы, страницы,
   разделы, права доступа, шаблоны, поиск, публикация). Если продукт ближе к
   корпоративному порталу или интранету с новостями и опросами — стоит создать
   отдельный домен `intranet`, а не пытаться растянуть docs.
2. Если попадает — переиспользуй mock'и из этого набора. Если в лендинге есть
   новый сценарий, которого нет в наборе (например, «версии и сравнение версий
   документа»), создай новый mock в `packages/ui/src/landing/mocks/`
   (например, `DocVersionsCompareMock`) по
   [`section-mock-skill.md`](../../packages/harness/src/prompts/section-mock-skill.md),
   добавь slug в enum, расширь матрицу выше.
3. Не миксуй с PM/CRM/Support mock'ами — даже если лендинг упоминает «работу
   команды над документами», для команд используется текст + иконки в
   `FeatureGrid`, а не `PmBoardMock` («это про задачи, не про документы»).

## Чек-лист domain-fit для docs-лендинга

Перед сдачей docs-лендинга:

- [ ] Hero использует `docs-tree` или `doc-editor-rich`, не `pm-board` / `support-board` /
      `kb-public` (KB-карточка слишком плоская для hero).
- [ ] Дерево/иерархия — `DocsTreeMock`, не `OrgChartMock` (HR-домен) и не
      `ProcessFlowchartMock` (BPM-домен).
- [ ] Доступы — `PermissionsPanelMock`, не `ApprovalChainMock` (BPM-домен,
      про многошаговое согласование, не про права).
- [ ] Шаблоны документов — `TemplateGalleryMock`, не `DocTemplateMock`
      (последний — про счёт/договор CRM-домена с автоподстановкой полей клиента).
- [ ] Мобильный экран — `MobileDocReaderMock`, не `MobileCrmMock` (CRM-домен
      с пропущенными звонками, KPI дня, активными сделками).
- [ ] В карточках mock'ов нет слов «спринт», «эпик», «story points», «лид»,
      «сделка», «выручка», «SLA», «тикет» — это PM / CRM / Support лексика.
- [ ] Нет упоминаний имён конкурирующих продуктов: «Notion», «Confluence»,
      «Google Docs», «Microsoft Office», «Yonote» и т. п. Только обобщённые
      формулировки: «зарубежные wiki-сервисы», «облачные документы»,
      «офисные форматы».
- [ ] Нет чужих логотипов в карточках или social-proof (по запрету brief).

## Anti-patterns специфичные для docs-домена

- **Hero только с `KnowledgeBaseMock`.** Слишком плоско — одна карточка не
  передаёт идею структурированной базы. Используй `DocsTreeMock`
  (дерево + открытый документ) или `DocEditorRichMock` (редактор с блоками).
- **Mock-аналог Notion / Linear / Confluence один-в-один.** Скриншот-копия
  чужого UI — нарушение запрета brief и риск товарного знака. Mock должен
  быть нейтральным: монохромный header, нейтральные иконки, без узнаваемых
  логотипов или цвет-схем.
- **Демонстрация «всех функций сразу» в одном hero mock'е.** Документ + дерево +
  комментарии + публичная ссылка в одной картинке — каша. Дай каждому
  ключевому свойству свой MediaCopy с отдельным mock'ом.
- **Реальные имена сотрудников / реальные компании в карточках.** Используй
  собирательные имена («Анна Петрова», «Илья Климов») и собирательные
  компании («ГК Энергомост» — пусть это работает в любом B2B-контексте).
- **`generic` mock в Hero или MediaCopy.** Для docs-лендинга это особенно
  заметно — продукт про **визуальную структуру**, и пустой placeholder
  сразу читается как «продукт не готов».

## Связанные документы

- [`wiki/references/domain-mock-matrix.md`](../references/domain-mock-matrix.md)
  — общая матрица доменов и mock'ов.
- [`wiki/landings/crm-reference.md`](./crm-reference.md) — reference для
  CRM-домена (образец для этого файла).
- [`wiki/layouts/depersonalized-product-tour.md`](../layouts/depersonalized-product-tour.md)
  — layout с обезличенными product tour'ами, подходит docs-домену.
- [`packages/harness/src/prompts/section-mock-skill.md`](../../packages/harness/src/prompts/section-mock-skill.md)
  — правила композиции mock-компонентов.
