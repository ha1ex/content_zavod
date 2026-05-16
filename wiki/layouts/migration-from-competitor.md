---
slug: migration-from-competitor
type: layout
created: 2026-05-16
updated: 2026-05-16
related:
  - wiki/layouts/index.md
  - wiki/layouts/comparison-vs-competitor.md
tags:
  - layout
  - migration
  - planning
stale: false
---

# Layout — Migration from competitor

## When to use

Лендинг про **процесс перехода** с конкретного конкурента, а не про сравнение.
В отличие от `comparison-vs-competitor` (где Hero «vs {Brand}» и фокус на
дельте фич), здесь Hero «План миграции с {Brand} за N дней» и фокус на
понятном workflow перехода.

Применим, когда:

- Аудитория уже приняла решение мигрировать (или сильно склоняется).
- Главная боль — «не знаю как это сделать без даунтайма / потерь данных».
- Лендинг ведёт в quote / migration-discovery call, не в подписку.
- Триггер — известный кризис у конкурента (уход вендора, банкротство, цена
  в валюте).

**Не использовать**, если аудитория ещё сравнивает альтернативы (тогда —
`comparison-vs-competitor`).

## Audience & awareness

- **Awareness:** most-aware (понимает свою боль, конкурента, ищет how-to).
- **Persona:** ИТ-директор, тимлид, операционный директор, ответственный за
  миграционный проект (есть бюджет и срок).
- **Решение:** покупка миграции «под ключ» либо self-service миграция с
  бесплатной поддержкой.
- **Decision maker:** ИТ-директор / CTO / COO.

## Section sequence (обязательный порядок)

| # | Section | Component | Mock-рекомендация | Опционально |
|---|---|---|---|---|
| 1 | Hero | `HeroSection` | `visualPosition: 'below'`, mock не критичен (можно `pm-board` / `crm-analytics` по домену) — упор на текст «План миграции с {Brand} за {N} дней» | — |
| 2 | Stats (proof of migration scale) | `StatStrip` | — (4 цифры: «{X} компаний мигрировали», «средний срок {N} дней», «потеря данных = 0», «downtime = 0») | обязателен |
| 3 | Timeline / Process — фазы миграции | `ProcessSteps` или `TimelineRoadmap` | — (5-6 фаз: discovery → mapping → pilot → bulk migration → cutover → hypercare) | обязателен |
| 4 | MediaCopy — что переедет автоматически | `MediaCopy` | `mediaVariant` из домена (`pm-board` / `sales-funnel` / `support-board`), `mediaPosition: 'right'`, чек-лист «история тикетов / поля / пользователи / интеграции» | обязателен |
| 5 | MediaCopy — что нужно ручной настройки | `MediaCopy` | `mediaVariant: 'kb-internal'`, `mediaPosition: 'left'` (видеть «гайды для команды» в КБ) | обязателен |
| 6 | Social proof — кейсы миграции с {Brand} | `SocialProof` | — (3 кейса с явными «мигрировали из X», метрика «N карточек», «N пользователей», «время T дней») | обязателен |
| 7 | FAQ — про процесс миграции | `FAQAccordion` | — (6-8 вопросов: что с историей, что с правами доступа, downtime, rollback, обучение команды, стоимость, гарантия SLA) | обязателен |
| 8 | Promo — migration discovery offer | `PromoBanner` | — (`tone: 'violet'`, «Бесплатная discovery-сессия + аудит вашей инсталляции {Brand}») | обязателен |
| 9 | Final CTA | `FinalCta` | — («Запросить план миграции» — не demo, не trial) | обязателен |
| 10 | Footer | `LandingFooter` | — | обязателен |

**Отличия от `comparison-vs-competitor`:**
- Hero про процесс, не про сравнение фич.
- Нет FeatureGrid «vs» — миграция уже принята.
- Process / Timeline — главная секция (а не пункт 7-й).
- CTA — discovery, не demo.

## Voice

- **Tone:** «уверенный эксперт миграций, без агрессии к конкуренту».
- Hero — конкретная цифра (дней миграции, объём перенесённых данных).
- Никаких «X плох, мы хороши». Только «X уходит / дорожает / меняется — у
  нас понятный план как перейти без потерь».

## Anti-patterns

- ❌ Длинный список фич — это не vs-страница, это how-to migrate.
- ❌ Demo / trial CTA — кто хочет мигрировать, тот хочет план и оценку
  стоимости, не аккаунт.
- ❌ Pricing — на migration-лендинге цена обсуждается на discovery, не
  таблицей.
- ❌ Mock «наш UI с подписью “лучше чем у X”» — здесь не сравниваем, а
  показываем плавный переход.

## Reference

- Внутренний эталон: пока не реализован.
- Внешний эталон: HubSpot migration guides, Atlassian migration calculator,
  Stripe payment processor migration.
