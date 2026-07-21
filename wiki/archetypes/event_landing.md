---
slug: archetype-event-landing
type: archetype
created: 2026-07-17
updated: 2026-07-21
sources:
  - packages/harness/src/schemas/landing-spec.ts
  - packages/harness/src/schemas/brief.ts
  - content/landings/webinar-vnedrenie-kaiten.json
related:
  - wiki/layouts/event-webinar.md
  - wiki/design-system/components/hero.md
  - wiki/design-system/components/final-cta.md
  - wiki/design-system/components/footer.md
  - wiki/design-system/components/button.md
tags:
  - archetype
  - event
  - webinar
  - landing
stale: false
---

# Event landing — archetype

`pageType: event_landing` в LandingSpec, `brief.pageArchetype: "event"`.

Лендинг мероприятия: вебинар, конференция, митап, воркшоп. Отличается от остальных архетипов одним: **целевое действие — заполнить форму регистрации, а не перейти по кнопке в продукт.** Всё остальное на странице подчинено этому.

Первый в заводе — `webinar-vnedrenie-kaiten` («Внедрение Кайтена без стресса для команды», 30 июля, ведущий Давид Гаранян).

## Целевые goals

`waitlist` (регистрация на мероприятие), `signup`.

В enum `brief.primaryGoal` отдельного `register` нет — регистрация на мероприятие ложится на `waitlist`.

## Чем отличается от waitlist_landing

`waitlist_landing` — про доступ к продукту (pre-launch, closed beta): собирают почту, чтобы позвать позже. `event_landing` — про явку на событие в конкретную дату: есть дата и формат, есть ведущий, есть программа, а после регистрации человек ждёт письмо-напоминание, а не инвайт в продукт.

## Обязательные секции (порядок)

1. **HeroSection** с формой — надзаголовок с датой и форматом («Бесплатный вебинар · 30 июля · онлайн»), H1, подзаголовок, буллеты «что заберёте», строка ведущего. Форма — в правой колонке (`props.form`), вместо продуктового визуала. Кнопок CTA в hero при этом НЕТ: submit формы и есть целевое действие, а его подпись берётся из `primaryCta.label`. Правило: `event-landing-type`.
2. **Блоки содержания** — боль аудитории, оффер, программа. Состав диктует ТЗ.
3. **SpeakerCard** — блок ведущего. Правило: `speaker-gradient-card`.
4. **RegistrationCta** — финальный блок с повтором формы. Правило: `custom-final-cta-gradient`.
5. **LandingFooterMock**.

## Три точки конверсии

Три точки конверсии: форма в первом экране, кнопка-якорь после программы (`CtaBanner` с `gradient: true` — на той же градиентной подложке, что финал и спикер), форма в финале. Отдельной кнопки в первом экране нет — там сразу форма.

Якоря обязаны различаться (`registration-top` в первом экране, `registration` в финале): `anchorId` — это ещё и префикс `id` полей формы, поэтому при одинаковых якорях `id` полей совпадут и `<label>` второй формы будет фокусировать поле первой. Слово «hero» в `anchorId` ловит валидатор языка как англицизм (§10).

## Компоненты

| Слот | Компонент |
|---|---|
| Форма | `RegistrationForm` — имя\*, email\*, телефон, чекбокс 152-ФЗ (поле «Компания / роль» опционально — на эталоне убрано по решению команды) |
| Финальный CTA | `RegistrationCta` (форма справа на `GradientPanel`) |
| Промежуточный CTA | `CtaBanner` с `gradient: true` (та же подложка `GradientPanel`) |
| Ведущий | `SpeakerCard` на `GradientPanel` |
| Программа | `TimelineRoadmap` с `numbered: true` |
| Боль аудитории | `PainBubbles` (`animate: true`) |

## Чего на лендинге мероприятия НЕТ

**Прайсинг.** Мероприятие бесплатное или оплачивается отдельно — тарифы продукта на этой странице не к месту.

Жёсткого запрета в коде нет: `SectionSchema` разрешает `PricingPlans` в любом спеке, а `COMPONENTS_BY_ARCHETYPE` в `select-context.ts` управляет лишь тем, какие страницы дизайн-системы подмешиваются в системный промпт (у `event_landing` `pricing.md` не грузится — модель просто не получает инструкцию по прайсингу). Так что это соглашение архетипа, а не гейт.

## Генерация по брифу (brief-флоу)

Важное: **фазовый брифовый пайплайн (P0..P8) архетипный md в промпты НЕ подмешивает** — структуру задаёт **layout** (P2), а не архетип (архетипный текст читает только single-shot путь). Поэтому стандарт мероприятия закодирован отдельным layout `wiki/layouts/event-webinar.md` — с обязательной таблицей секций, которую парсит `landing-layout-conformance`.

- Intake ставит `brief.pageArchetype: "event"` + `brief.pageLayout: "event-webinar"` + `brief.primaryGoal: "waitlist"`.
- Специфика мероприятия (дата/время/формат, ведущий, программа, endpoint формы) живёт в блоке **`brief.event`** (`schemas/brief.ts`) — в остальном бриф её не несёт. Что неизвестно — оставить пустым и уточнить у команды; выдуманные факты про живого ведущего запрещены.
- P2 выбирает `event-webinar`, P4 строит скелет по его таблице, P6 наполняет копию из `brief` + `brief.event`.

## Audience-score (исправлено 21.07.2026)

Раньше `landing-audience` не знал про мероприятия: must-pass правило `it-needs-compare-or-trial` требует Trial-кнопку в hero, которой у event-архетипа нет by design (там форма) — и в brief-флоу это роняло лендинг (в custom было advisory).

Починено в `landing-audience.ts`:
- добавлена CtaType-категория **`Register`** (регистрация на мероприятие); `classifyCta` ставит её ПЕРВОЙ и узко по event-фразам (`занять место|участвовать|на вебинар/конференц/митап`, href `webinar|#registration|registration-top`) — чтобы не перехватить «Записаться на демо» (Demo) и продуктовый signup (Trial);
- правило `it-needs-compare-or-trial` теперь пропускает `event_landing`: `if (resolved.includes('IT') && spec.pageType !== 'event_landing')`.

Сдвиг баллов существующим лендингам — нулевой: Register-regex по факту ловит только вебинар (проверено сканом hero-CTA всех лендингов), а pageType-guard затрагивает только event-лендинги.

**Ещё 3 правки, вскрытые прогоном синтетического брифа через P0..P8 (21.07.2026):**

1. `AudienceIntentCtaTypeSchema` (`schemas/audience-intent-plan.ts`) не имел `Register` — P1 не мог выставить `preferredCtaTypes` для мероприятия. Добавлено.
2. `section-plan-mock-choice.ts` требовал `mockVariant` у любого `HeroSection` — но event-hero несёт форму, а не мок. Теперь пропускает hero с `ctaType: 'Register'`.
3. **Главное:** даже со снятым must-pass общий audience-score всё равно ниже порога (S4 CTA-alignment=0, т.к. IT ждёт Trial/Demo, а не Register; product-stories compare/migrate не покрыты) — и в brief-флоу это уходило в hard errors. Сделано справочным для `event_landing` в `ingest-landing.ts` (тот же приём, что `audience-score-advisory-in-custom`): скоринг заточен под продуктовые лендинги, у мероприятия конверсия иная, поэтому балл занижен by design и лендинг на доработку не возвращается.

**Прогон подтвердил end-to-end:** бриф с `pageArchetype:event`/`pageLayout:event-webinar`/`event`-блоком принят → routing pm/phased → P0 layout=event-webinar → P1 (Register) → P2 layout прошёл `validateLayoutAwarenessFit` → P3 coverage → P4 event-скелет (hero-форма без мока) прошёл семантические валидаторы; `it-needs-compare-or-trial` на IT-сегменте не сработал.

## Что уточнять у команды

Точное время начала и часовой пояс (в ТЗ часто только дата), endpoint формы, UTM-разметка и событие регистрации в аналитике, экран-спасибо + добавление в календарь + письмо-напоминание (это отдельная страница и почтовая механика, за рамками лендинга), фото и текст экспертизы ведущего.
