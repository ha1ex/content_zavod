---
slug: crm-reference
type: landing
created: 2026-05-16
updated: 2026-05-16
status: reference
sources:
  - content/landings/crm.json
  - packages/ui/src/landing/mocks/SalesFunnelMock.tsx
  - packages/ui/src/landing/mocks/CrmClientCardMock.tsx
  - packages/ui/src/landing/mocks/OmnichannelInboxMock.tsx
  - packages/ui/src/landing/mocks/CallOverlayMock.tsx
  - packages/ui/src/landing/mocks/CrmAnalyticsMock.tsx
  - packages/ui/src/landing/mocks/DocTemplateMock.tsx
  - packages/ui/src/landing/mocks/MobileCrmMock.tsx
  - packages/ui/src/landing/mocks/BookingCalendarMock.tsx
  - wiki/layouts/crm-product-tour.md
related:
  - wiki/references/domain-mock-matrix.md
  - wiki/landings/kaiten-techsupport-reference.md
  - packages/harness/src/prompts/section-mock-skill.md
tags:
  - reference
  - landing
  - mock-ui
  - crm
  - sales
stale: false
---

# CRM — internal reference (CRM-домен mock'ов)

> **Что это.** Эталонный набор mock'ов для CRM-домена (продажи, клиентский
> сервис, маркетинг, мобильное). Используется как:
>
> 1. Проверочный референс для новых CRM-лендингов — соответствие реализованных
>    mock'ов нашему дизайн-токен набору и domain-fit правилу.
> 2. Образец того, как создавать набор mock'ов для нового домена (8 компонентов
>    под основные сценарии CRM покрывают Hero + интерактивные секции +
>    оставшиеся MediaCopy). Аналогичный объём ожидается для HR, Marketing,
>    BPM, Finance.
>
> **Reference-лендинг live:** `http://localhost:3000/landings/crm` (после `pnpm dev`).
>
> **Spec:** [`content/landings/crm.json`](../../content/landings/crm.json).
>
> **Layout:** [`wiki/layouts/crm-product-tour.md`](../layouts/crm-product-tour.md).

## Что отличает CRM-домен от PM-домена визуально

| Аспект | PM (`pm-board`) | CRM (`sales-funnel`) |
|---|---|---|
| Колонки канбана | Бэклог → В работе → Ревью → Готово | Лид → Квалификация → Договор → Оплата |
| Что в карточке | Эпик, тип (Story / Bug), story points, исполнитель, спринт | Компания, сумма в рублях, контакт-лицо, дата следующего шага |
| Маркер «горячее» | «☝️» (можно перетащить) | Бейдж «Горячий» оранжевый |
| Единица ценности | Story points (8 sp), спринт-цикл | Рубли (1 250 000 ₽), CPL, конверсия |
| Лексика window-chrome | «Проект · Платформа Q2 · Спринт 12 · 46/60 sp» | «Воронка · Продажи Q2 · 44 сделки · 19,4 млн ₽ в работе» |

Эти отличия не покрываются props'ами — это разные визуальные структуры. Поэтому
для CRM нужен отдельный `SalesFunnelMock`, а не `PmBoardMock<variant="crm">`.

## Состав mock'ов в CRM-наборе

| # | Mock | Variant slug | Что иллюстрирует | Используется в секциях |
|---|---|---|---|---|
| 1 | `SalesFunnelMock` | `sales-funnel` | Воронка сделок CRM с компаниями, суммами, контактами | Hero (`visual.variant`), MediaCopy Automation+AI |
| 2 | `CrmClientCardMock` | `crm-client-card` | Карточка клиента с табами, активной сделкой, таймлайном событий | TabbedFeature «Отдел продаж», Scenario step «Обновляет карточку» |
| 3 | `OmnichannelInboxMock` | `omnichannel-inbox` | Единый inbox с цвет-кодом канала | TabbedFeature «Клиентский сервис», Scenario step «Открывает inbox» |
| 4 | `CallOverlayMock` | `call-overlay` | Окно звонка поверх карточки клиента, скрипт продаж | Scenario step «Принимает звонок» |
| 5 | `BookingCalendarMock` | `booking-calendar` | Онлайн-запись: сетка специалистов × часы | MediaCopy «Онлайн-запись» |
| 6 | `CrmAnalyticsMock` | `crm-analytics` | Дашборд CRM: выручка, конверсия, CPL, воронка, источники | TabbedFeature «Маркетинг», Scenario step «Смотрит итоги» |
| 7 | `DocTemplateMock` | `doc-template` | Счёт с автоподстановкой полей и статусом подписания | Scenario step «Формирует счёт» |
| 8 | `MobileCrmMock` | `mobile-crm` | Мобильное приложение: KPI дня, сделки, нижняя таб-навигация | MediaCopy «Мобильное приложение» |

**Покрытие.** 8 mock'ов покрыли:
- 1 Hero
- 3 таба в TabbedFeatureSection
- 5 шагов в ScenarioWalkthroughSection
- 3 MediaCopy (Automation+AI, Mobile, Booking)

Итого 12 точек использования mock'ов в одном лендинге, без коллизий смежных
mediaVariant и без `generic`/`default`.

## Как использовать этот набор для нового CRM-подобного лендинга

1. Открой [`wiki/references/domain-mock-matrix.md`](../references/domain-mock-matrix.md) —
   убедись, что новый продукт попадает в CRM-домен (есть воронка сделок,
   карточка клиента, омниканальные обращения, аналитика выручки).
2. Если попадает — переиспользуй mock'и из этого набора. Если в лендинге есть
   новый сценарий, которого нет в наборе (например, «лояльность и бонусы»),
   создай новый mock в `packages/ui/src/landing/mocks/` (например,
   `LoyaltyProgramMock`) по [`section-mock-skill.md`](../../packages/harness/src/prompts/section-mock-skill.md),
   добавь slug в enum, расширь матрицу выше.
3. Если продукт похож на CRM, но имеет существенный второй домен (например,
   CRM + HR для рекрутинговых агентств), не миксуй mock'и — выбери основной
   домен по hero-сообщению, второй домен покажи через `FeatureGrid`
   карточками без mock'ов.

## Как использовать этот набор как шаблон для нового домена

Когда заходишь в новый домен (HR, Marketing, BPM, Finance, e-commerce):

1. Прочитай [`wiki/references/domain-mock-matrix.md`](../references/domain-mock-matrix.md),
   секция «Домены, которые ждут своего набора mock'ов» — там перечислены
   нужные компоненты для каждого домена.
2. Создай **7-8 mock'ов** под основные сценарии домена по образцу CRM-набора:
   - 1 Hero-mock (главное визуальное обещание).
   - 3-4 mock'а для разных ролей/функций (как у нас Sales/Service/Marketing
     в CRM).
   - 1-2 mock'а для сценариев «day-in-the-life» (звонок, документ, моб.
     приложение).
   - 1 mock для аналитики/дашборда.
3. Каждый mock делай по [`section-mock-skill.md`](../../packages/harness/src/prompts/section-mock-skill.md):
   токены, lucide, реалистичные данные из домена, типографика small-density.
4. Заведи `wiki/landings/<domain>-reference.md` по образцу этого файла.
5. Обнови `wiki/references/domain-mock-matrix.md` — переведи строку из
   «нужны новые» в реализованную.

## Чек-лист domain-fit для CRM-лендинга

Перед сдачей CRM-лендинга:

- [ ] Hero использует `sales-funnel`, не `pm-board`.
- [ ] Карточка клиента — `crm-client-card`, не `request-card` (тикет
      поддержки) и не `crm-client-card` с PM-лексикой («эпик» / «sprint»).
- [ ] Дашборд — `crm-analytics` (выручка/конверсия/CPL), не `analytics-kpi`
      (загрузка PM-команд).
- [ ] Каналы — `omnichannel-inbox` (звонок/Telegram/чат/почта), не
      `integrations-console` (1С/GitLab — это Kaiten-домен).
- [ ] Документы — `doc-template` (счёт с подстановкой), не `kb-public` /
      `kb-internal` (статья базы знаний).
- [ ] В карточках mock'ов нет слов «спринт», «эпик», «story points»,
      «MR merged», «pull request» — это PM-лексика, не CRM.
- [ ] Денежные значения в рублях, не «sp» или абстрактные числа.

## Связанные документы

- [`wiki/references/domain-mock-matrix.md`](../references/domain-mock-matrix.md)
  — общая матрица доменов и mock'ов.
- [`wiki/landings/kaiten-techsupport-reference.md`](./kaiten-techsupport-reference.md)
  — reference для Support-домена.
- [`wiki/landings/kaiten-platform.md`](./kaiten-platform.md) — reference для
  PM-домена.
- [`wiki/layouts/crm-product-tour.md`](../layouts/crm-product-tour.md) —
  layout с интерактивными секциями (TabbedFeature / Scenario / IndustryPicker),
  собранный под CRM-домен.
- [`packages/harness/src/prompts/section-mock-skill.md`](../../packages/harness/src/prompts/section-mock-skill.md)
  — правила композиции mock-компонентов.
