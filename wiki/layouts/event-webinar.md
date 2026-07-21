---
slug: event-webinar
type: layout
created: 2026-07-21
updated: 2026-07-21
related:
  - wiki/layouts/index.md
  - wiki/archetypes/event_landing.md
  - packages/harness/src/schemas/brief.ts
  - content/landings/webinar-vnedrenie-kaiten.json
tags:
  - layout
  - event
  - webinar
  - registration
stale: false
---

# Layout — Event / Webinar

## When to use

Лендинг мероприятия: **вебинар, конференция, митап, воркшоп**. Единственный
layout, где целевое действие — **заполнить форму регистрации**, а не перейти по
кнопке в продукт. Всё на странице подчинено явке на событие в конкретную дату.

Применим, когда:

- `brief.pageArchetype: "event"` (→ `pageType: "event_landing"`).
- `brief.primaryGoal: "waitlist"` (отдельного `register` в enum нет).
- Есть дата/формат, ведущий и программа (данные — в `brief.event`).

**Не использовать** для pre-launch продукта без даты и ведущего (тогда —
`product-launch` или `waitlist_landing`): там собирают почту «позвать позже», а
здесь человек регистрируется на событие в конкретный день.

## Audience & awareness

- **Awareness:** problem-aware → solution-aware (человек знает проблему, пришёл
  за тем, «как её решают вживую»).
- **Persona:** ЛПР/пользователь целевой функции (для Kaiten-вебинаров —
  руководители и команды, внедряющие таск-трекер).
- **Decision maker:** сам участник (регистрируется за себя).

## Section sequence (обязательный порядок)

Chrome (`SiteHeader` / `LandingFooterMock`) добавляется автоматически (`agent
apply`) — в spec его не пишем. План начинается с Hero и заканчивается финальной
формой.

| # | Section | Component | Mock-рекомендация | Опционально |
|---|---|---|---|---|
| 1 | Hero (регистрация) | `HeroSection` | Форма справа (`props.form`), НЕ продуктовый визуал. `props.speaker` (строка ведущего), `props.bullets` («что заберёте»), `props.flush: true`, `props.accentPill: false`. Надзаголовок — дата+формат. Mock НЕ ставится | — |
| 2 | Боль аудитории | `PainBubbles` | `animate: true`, 6 цитат-«пузырей» из `brief.mainPain` + материалов | — |
| 3 | Оффер / что настроим | `MediaCopy` | `mediaVariant` из домена (напр. `kanban-minimal`, `pm-board`) | опционально |
| 4 | Программа | `TimelineRoadmap` | `numbered: true`, пункты из `brief.event.program` | — |
| 5 | Промежуточный CTA | `CtaBanner` | `gradient: true` (подложка `GradientPanel`) — вторая точка конверсии | опционально |
| 6 | Соц-док / результаты | `StatStrip` | 3 цифры/кейса (из `brief.proofPoints`) | опционально |
| 7 | Ведущий | `SpeakerCard` | На `GradientPanel` (фото + bio из `brief.event.speaker`) | — |
| 8 | Финальная регистрация | `RegistrationCta` | Форма справа на `GradientPanel` | — |

**Три точки конверсии:** форма в hero (якорь `registration-top`) → `CtaBanner`
`gradient` после программы → форма в финале (якорь `registration`). Отдельной
кнопки в hero НЕТ — submit формы и есть целевое действие, его подпись = `brief.cta`
(идёт в `HeroSection.props.primaryCta.label`).

## Обязательные правила компонентов (event-specific)

- **Форма — целевое действие.** `RegistrationForm`: имя\*, email\*, телефон,
  чекбокс 152-ФЗ. Поле «Компания / роль» — опционально (на эталоне убрано).
  Endpoint и согласие — из `brief.event.registration`.
- **Якоря обязаны различаться:** `registration-top` (hero) и `registration`
  (финал). `anchorId` — это ещё и префикс `id` полей формы; при одинаковых якорях
  `id` полей совпадут и `<label>` второй формы сфокусирует поле первой. Слово
  «hero» в `anchorId` ловит валидатор языка как англицизм (§10) — не использовать.
- **Спикер — всегда `SpeakerCard` на `GradientPanel`** (правило
  `speaker-gradient-card`).
- **Финальный CTA — всегда градиентный** `RegistrationCta` (форма справа на
  `GradientPanel`, правило `custom-final-cta-gradient`); промежуточный —
  `CtaBanner` с `gradient: true` на той же подложке.
- **`accentPill: false`** в hero — акцентное слово фиолетовым текстом без плашки.
- **Программа — `TimelineRoadmap` с `numbered: true`** (номерные кружки на кромке
  контента).
- **Bio ведущего — только подтверждённые факты** (`brief.event.speaker.bio`).
  Выдуманные цифры про живого человека запрещены — что неизвестно, в
  `needs_confirmation`.

## Voice

- **Tone:** приглашение на живой разбор, без хайпа. «Покажем вживую, как …».
- Hero H1 — обещание результата встречи; надзаголовок — «Бесплатный вебинар ·
  {дата} · {формат}».
- Боли — цитатами от первого лица («Купили, а пользоваться так и не начали»).

## Anti-patterns

- ❌ **Pricing** — мероприятие бесплатное/оплачивается отдельно; тарифов на
  странице нет.
- ❌ **Trial-кнопка «Попробовать бесплатно» в hero** — целевое действие это
  форма, а не переход в продукт (иначе рушится смысл event-лендинга; audience-гейт
  `it-needs-compare-or-trial` для `event_landing` отключён именно поэтому).
- ❌ **Продуктовый визуал вместо формы в hero** — справа всегда форма.
- ❌ Одинаковые `anchorId` у двух форм (дубли `id` полей).
- ❌ Выдуманная экспертиза/цифры ведущего.

## Reference

- Внутренний эталон: `content/landings/webinar-vnedrenie-kaiten.json`
  («Внедрение Кайтена без стресса для команды», 30 июля, ведущий Давид Гаранян).
- Архетип: `wiki/archetypes/event_landing.md`.
