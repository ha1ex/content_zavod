---
slug: ds-component-hero
type: design-system
created: 2026-05-15
updated: 2026-05-15
sources:
  - packages/harness/src/registry/index.ts
  - packages/harness/src/schemas/landing-spec.ts
related:
  - wiki/design-system/typography.md
  - wiki/design-system/spacing.md
  - wiki/design-system/voice.md
tags:
  - component
  - section
  - hero
stale: false
---

# HeroSection

Главный блок лендинга. Всегда первая секция.

## Структура

- **eyebrow** (опц., ≤80) — категория продукта или anchor («Для маркетинга», «B2B SaaS»).
- **title** (4..80) — главное обещание. Strong, конкретное.
- **subtitle** (10..200) — раскрытие обещания на 1–2 предложения.
- **primaryCta** `{ label: <=40, href }` — единственный fill CTA.
- **secondaryCta** (опц.) — outline CTA. Например, «Посмотреть демо» при primary = «Получить демо».
- **visual** (опц.) — `product_screenshot` | `illustration` | `logo_cloud` | `photo`.

## Layout

- **Desktop:** content слева (6–7 columns), visual справа (4–5 columns). Hero content → media gap — `12/48` или `16/64`.
- **Tablet/Mobile:** content stack, visual ниже (full-width).

## Typography

- **Title:** `text-5xl` или `text-6xl` (SemiBold) на desktop, `text-3xl` на mobile.
- **Subtitle:** `text-lg` или `text-xl`, Regular, `neutral.700`.
- **Eyebrow:** `text-sm`, Medium, `accent.violet-100` или `neutral.600`.

## CTA hierarchy

- **PrimaryCta** = fill variant, matches `brief.primaryGoal`.
- **SecondaryCta** (если есть) = outline, низ интенсивности, без emoji.

## Usage rules

- ОДИН hero на лендинг (`one_hero_per_landing` constraint в registry).
- Title должен **быть обещанием**, не описанием функции. «Превратите бриф в лендинг за минуту» > «AI-генератор лендингов».
- Subtitle развивает obещание конкретикой. «Получите Kaiten-совместимый TSX, прошедший бренд- и accessibility-чеки — без дизайнера и фронтенда».

## Anti-patterns

- ❌ Hero без primaryCta (`must_have_primary_cta` constraint).
- ❌ Длинный subtitle (>180 символов) — на mobile уходит в третью строку.
- ❌ Использовать banned слова из `wiki/design-system/voice.md` в title/subtitle.
- ❌ Hero как «приветствие» без обещания: «Добро пожаловать!».
