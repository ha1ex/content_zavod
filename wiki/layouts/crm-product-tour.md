---
slug: crm-product-tour
type: layout
created: 2026-05-16
updated: 2026-05-16
related:
  - wiki/layouts/index.md
  - wiki/layouts/depersonalized-product-tour.md
  - packages/harness/src/prompts/section-mock-skill.md
tags:
  - layout
  - crm
  - smb
  - product-tour
  - tabbed
  - scenario
stale: false
---

# Layout — CRM product tour (interactive, не-MediaCopy ритм)

## When to use

Обезличенный CRM (или CRM-подобный multi-feature SaaS для SMB), у которого
нужно показать 8+ функциональных тем в один экран и при этом **не повторить
типовой MediaCopy×N простыни**, который мы получили в layouts
`enterprise-modular-saas` и `depersonalized-product-tour`.

Главное отличие от `depersonalized-product-tour`: вместо 5-7 одинаковых
MediaCopy секций — три новых интерактивных типа секций:

- **TabbedFeatureSection** — табы по ролям/сегментам (Продажи / Сервис /
  Маркетинг) с разными mock'ами под каждым табом. Заменяет 3 MediaCopy одним
  блоком с переключением.
- **ScenarioWalkthroughSection** — «День менеджера продаж»: 4-5 шагов с
  alternating mock layouts. Заменяет 3-4 MediaCopy одним нарративным блоком.
- **IndustryPickerSection** — отрасли с раскрытием сценария справа. Заменяет
  вторую FeatureGrid из 12 однострочников.

**Не использовать** для именованного продукта с reference base — там нужен
`enterprise-modular-saas`. Для глубокого нырка в один модуль —
`single-module-deep-dive`. Если хочется классический длинный MediaCopy-tour
(как обзорный лендинг без интерактива) — `depersonalized-product-tour`.

## Audience & awareness

- **Awareness:** problem-aware → solution-aware. Аудитория знает, что у неё
  «теряются заявки», «нет единой базы клиентов», «менеджеры забывают
  перезвонить», но ещё не выбрала конкретный CRM и плохо понимает что такое
  «CRM-маркетинг» или «сквозная аналитика».
- **Persona:** владелец SMB (10–200 сотрудников), руководитель отдела продаж
  / коммерческий директор, маркетолог, операционный директор. Один человек
  читает лендинг для нескольких ролей одновременно (например, владелец
  думает про продажи + маркетинг + сервис).
- **Боль:** заявки теряются между мессенджерами и таблицами; нет единой базы;
  менеджеры забывают перезвонить; руководитель не видит картину продаж и
  эффективность рекламы.
- **Желание:** одна система, в которой собраны клиенты, сделки, задачи,
  коммуникации, документы и аналитика — без долгого внедрения, с разными
  ракурсами под роль читающего.

## Section sequence (обязательный порядок)

| # | Section | Component | Mock-рекомендация | Опционально |
|---|---|---|---|---|
| 1 | Hero | `HeroSection` | `visual.variant: 'sales-funnel'` — воронка сделок CRM с компаниями/суммами/датами | — |
| 2 | Benefits strip | `BenefitsStrip` | — (4 коротких маркера: единая база, автоматизация, аналитика, быстрый старт) | обязателен |
| 3 | Tabs by role | `TabbedFeatureSection` | tabs: Продажи (`sales-funnel` или `crm-client-card`) / Сервис (`omnichannel-inbox`) / Маркетинг (`crm-analytics`) — у каждого таба свой mock | обязателен |
| 4 | CTA banner | `CtaBanner` | — (после tabs — естественное место конверсии) | обязателен |
| 5 | Day-in-the-life | `ScenarioWalkthroughSection` | 4-5 шагов с разными mock'ами в alternating layout (`omnichannel-inbox` → `call-overlay` → `crm-client-card` → `doc-template` → `crm-analytics`) | обязателен |
| 6 | Automation + AI | `MediaCopy` | `mediaVariant: 'sales-funnel'` (роботы воронки) — единственный MediaCopy на лендинге, чтобы не сваливаться в классический ритм | обязателен |
| 7 | Mobile | `MediaCopy` | `mediaVariant: 'mobile-crm'` — мобильный экран, контрастирует с десктоп-mock'ами выше | опционально |
| 8 | Booking (для сервисных) | `MediaCopy` | `mediaVariant: 'booking-calendar'` — онлайн-запись с календарём | опционально |
| 9 | Features grid | `FeatureGrid` | — (8 карточек: база, воронка, каналы, автоматизация, маркетинг, документы, аналитика, интеграции) | обязателен |
| 10 | Industries picker | `IndustryPickerSection` | — 6-8 отраслей с раскрытием сценария справа | обязателен |
| 11 | Process | `ProcessSteps` | — (6 шагов внедрения) | обязателен |
| 12 | Stats / promo | `StatStrip` или `PromoBanner` | — обезличенный trust («8 каналов», «10 минут на старт», «без разработчиков») | опционально |
| 13 | FAQ | `FAQAccordion` | — (8–10 вопросов с развёрнутыми ответами) | обязателен |
| 14 | Final CTA | `FinalCta` | — | обязателен |
| 15 | Footer | `LandingFooter` | — (4 колонки, обезличенный brandName) | обязателен |

**Жёсткое правило:** на лендинге максимум 3 MediaCopy секций (вместо 6-7 как в
`depersonalized-product-tour`). Основная нагрузка по «показать функционал» лежит
на `TabbedFeatureSection` + `ScenarioWalkthroughSection`.

**Альтернативы:**

- Если нет AI — Automation MediaCopy без AI; описание про роботов воронки.
- Если CRM не для услуг — секцию Booking опускаем.
- Если нужна более длинная нарративная история — заменить «Day-in-the-life»
  на сценарий «Запуск CRM с нуля» (тоже 4-5 шагов).

## Voice

- **Tone:** «практично, по делу, без хайпа». Никаких «революционный»,
  «единственный», «10x», «№1», «лучший» — все правила voice.md плюс ТЗ §8
  явно запрещает эти формулировки.
- Hero title — описательный (не слоган). Формула «{Глагол множ.} {объекты},
  {объекты} и {объекты}»: «CRM-система для управления продажами, клиентами
  и бизнес-процессами».
- Никаких брендов сторонних сервисов в копи (Bitrix, AmoCRM, Salesforce,
  Hubspot, Pipedrive, RetailCRM, Kaiten и т.д.) и никаких упоминаний реальных
  клиентов.
- В TabbedFeatureSection — табы называются ролями пользователя (Продажи,
  Сервис, Маркетинг), а не функциями продукта.
- В ScenarioWalkthroughSection — пишем как сценарий («09:30 · Анна открывает
  CRM и видит…»), а не как фичи («Утренний дайджест в CRM»).

## Mock-разнообразие (без коллизий)

Целевой набор mock'ов для этого layout (минимум):

- `sales-funnel` — Hero + Automation MediaCopy.
- `crm-client-card` — TabbedFeature (Продажи) + Scenario step 3.
- `omnichannel-inbox` — TabbedFeature (Сервис) + Scenario step 1.
- `call-overlay` — Scenario step 2.
- `doc-template` — Scenario step 4.
- `crm-analytics` — TabbedFeature (Маркетинг) + Scenario step 5.
- `mobile-crm` — Mobile MediaCopy.
- `booking-calendar` — Booking MediaCopy (опц.).

В TabbedFeature и Scenario повторение mock'ов между разными секциями допустимо
(они не считаются «коллизией» по diversity-валидатору, который смотрит только
на MediaCopy). Главное — внутри одного TabbedFeature избегать одинаковых
mockVariant у соседних табов.

## Anti-patterns

- ❌ Скатиться в MediaCopy×N (5+ MediaCopy подряд). Если хочется ещё одну
  MediaCopy — это сигнал, что её содержимое должно поехать в Tabbed или
  Scenario.
- ❌ Hero с `visual.variant: 'pm-board'` для CRM-продукта (PM-доска со
  спринтами — это другой домен). Используй `sales-funnel`.
- ❌ Reuse PM/Support mock'ов из чужого домена в CRM-лендинге (`pm-board`,
  `support-board`, `request-card`, `integrations-console` про 1С/GitLab,
  `analytics-kpi` про загрузку команд). Все они доменно про Kaiten-PM, не про CRM.
- ❌ `mediaVariant: 'default'` где угодно — это generic placeholder,
  валидатор завалит.
- ❌ Слишком короткий FAQ (2-3 вопроса). Для лендинга с длинным product tour
  нужен развёрнутый FAQ (8-10 пунктов).
- ❌ SocialProof с цитатами от брендов — обезличенный лендинг этого не
  допускает (как и `depersonalized-product-tour`).

## Reference

- Внешние эталоны композиции с табами и сценариями: HubSpot CRM (tabs по
  ролям), Pipedrive (sales funnel as hero), Monday CRM (industry picker),
  Salesforce Essentials (day-in-the-life pages, но избегаем брендинг).
- Внутренние эталоны mock'ов: `wiki/landings/kaiten-techsupport-reference.md`.
- Правила mock-компонентов: `packages/harness/src/prompts/section-mock-skill.md`.
