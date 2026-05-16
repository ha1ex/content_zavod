---
slug: product-launch
type: layout
created: 2026-05-16
updated: 2026-05-16
related:
  - wiki/layouts/index.md
tags:
  - layout
  - launch
  - awareness
  - announce
stale: false
---

# Layout — Product launch

## When to use

Анонс нового продукта / модуля / большой версии — когда у аудитории ещё нет
референса «что это такое».

Применим, когда:

- Полностью новая категория / suite, нет похожих лендингов в портфолио.
- Запуск приурочен к событию (релиз, новый модуль, ребрендинг линейки).
- Главная цель — побудить попробовать early-access / sign-up в waitlist /
  записаться на демо-сессию запуска.
- Аудитория не знает что это, поэтому первая половина страницы — нарратив
  «зачем», а не feature list.

**Не использовать** для зрелого продукта со сложившейся аудиторией (тогда —
`enterprise-modular-saas` или `single-module-deep-dive`).

## Audience & awareness

- **Awareness:** unaware → problem-aware (мы создаём awareness прямо на
  странице).
- **Persona:** early-adopter / innovator-сегмент — те, кто пробует новое
  быстрее основной массы.
- **Боль:** часто латентная — «не знал что эту работу можно делать
  по-другому».
- **Decision maker:** end-user (а не корпоративный закупщик — это
  awareness-stage).

## Section sequence (обязательный порядок)

| # | Section | Component | Mock-рекомендация | Опционально |
|---|---|---|---|---|
| 1 | Hero (announce) | `HeroSection` | `visualPosition: 'side'`, mock — главный визуал нового продукта (из домена) | — |
| 2 | Benefits strip — «что нового» в 3-5 словах | `BenefitsStrip` | — (короткие токены: «AI-аннотации», «реалтайм-граф», «one-click деплой») | обязателен |
| 3 | Story / hero followup — «зачем мы это сделали» | `MediaCopy` | `mediaVariant` из домена, длинный текст слева (history / problem story), визуал справа | обязателен |
| 4 | Bento / features overview | `BentoGrid` или `FeatureGrid` columns=3 | — (4-6 крупных «фишек» с иконками) | обязателен |
| 5 | Timeline / Roadmap — куда движемся | `TimelineRoadmap` или `ProcessSteps` | — (Q2 → Q3 → Q4 milestones, что уже есть / что скоро) | обязателен |
| 6 | TestimonialQuote — early-access feedback | `TestimonialQuote` или `SocialProof` | — (1-3 цитаты пилотных пользователей, ранние впечатления) | обязателен |
| 7 | Stats — early traction | `StatStrip` | — («N команд в early access», «N карточек создано», «время до aha = T минут») | обязателен |
| 8 | Promo — early-access invite | `PromoBanner` | — (`tone: 'violet'`, «Записаться в early access» / «Получить доступ первыми») | обязателен |
| 9 | FAQ — launch-specific | `FAQAccordion` | — (5-7: когда GA, цена, что в pilot vs GA, для кого, безопасность, миграция со старого) | обязателен |
| 10 | Final CTA | `FinalCta` | — (CTA, согласованный с goal — обычно waitlist / try) | обязателен |
| 11 | Footer | `LandingFooter` | — | обязателен |

**Что отсутствует осознанно:**
- ❌ Pricing — на launch-стадии цена либо беспрецедентна, либо в early
  access обсуждается индивидуально.
- ❌ ComparisonTable «vs других» — для new-category лендинга сравнения нет.

## Voice

- **Tone:** «новость, а не sales pitch». Можно эмоциональнее обычного.
- Hero — формулировка-открытие: «Представляем {Product}. Теперь {X}
  делается за {Y}, а не за {Z}».
- Subtitle — конкретное обещание изменения (что станет лучше).

## Anti-patterns

- ❌ Длинный feature list — на launch'е цепляет нарратив, не таблица фич.
- ❌ Enterprise-комплаенс блоки — это для зрелого продукта.
- ❌ Pricing с тарифами — рано.
- ❌ Mock со слишком зрелым UI («10 модулей, 50 кнопок») — early access
  должен выглядеть аккуратно и фокусно.

## Reference

- Внутренний эталон: пока не реализован.
- Внешний эталон: Linear «Launch Week», Vercel `vercel.com/launches`,
  Notion AI launch, Stripe Atlas launch.
