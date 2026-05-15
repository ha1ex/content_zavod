---
slug: ds-component-accordion
type: design-system
created: 2026-05-15
updated: 2026-05-15
sources:
  - design-system/kaiten-v01/tokens.json
related:
  - wiki/design-system/colors.md
  - wiki/design-system/motion.md
tags:
  - component
  - accordion
  - faq
stale: false
---

# Accordion

Используется для FAQ-секций и slider-аккордеонов.

## States

- **Closed.** Белая строка, neutral text, плюс-икона справа.
- **Hover.** Title или border shift to violet.
- **Open.** White или soft-violet panel, violet border, violet title, минус- / chevron-up икона, тело ответа под заголовком.

## Motion

- Open/close — `duration-slow` (240ms) с `ease-ui`.
- Анимируйте `max-height` / `opacity`. Не используйте `display: none` (нет transition).

## Usage rules

- 2–12 пар Q&A в одной секции (см. `FAQSection` в `packages/harness/src/registry/index.ts`).
- Все ответы — `10..600` символов.
- Multi-open режим — допустим, но в default один открыт за раз.

## Anti-patterns

- ❌ Анимировать `height: auto` напрямую — используйте `max-height` с высоким верхним пределом или JS-based measurement.
- ❌ Длинные ответы (>600 символов) — это уже не FAQ, это статья. Дробите.
