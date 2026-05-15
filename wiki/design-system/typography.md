---
slug: ds-typography
type: design-system
created: 2026-05-15
updated: 2026-05-15
sources:
  - design-system/kaiten-v01/tokens.json
related:
  - wiki/design-system/spacing.md
  - wiki/design-system/voice.md
tags:
  - tokens
  - typography
stale: false
---

# Typography

Источник — `design-system/kaiten-v01/tokens.json`. Блок tokens автогенерируется.

## Tokens

<!-- gen:tokens -->
_Блок генерируется при первом запуске `harness wiki sync`._
<!-- /gen:tokens -->

## Usage rules

**Прагматичная иерархия:**

- **Desktop hero:** `text-5xl` или `text-6xl`, SemiBold, tight line-height. Для двухстрочных hero — `text-5xl` (`48/52`). Для одной мощной строки — `text-6xl` (`60/64`).
- **Mobile hero:** `text-3xl` (`30/36`), SemiBold.
- **Section headings:** `text-3xl` (`30/36`) для desktop, `text-2xl` (`24/32`) для mobile.
- **Subheadings внутри секций:** `text-xl` (`20/28`), SemiBold или Medium.
- **Body:** `text-md` (`16/24`) для длинных описаний, `text-lg` (`18/28`) для marketing-копи на hero.
- **UI labels, meta, captions:** `text-sm` (`14/20`) или `text-xs` (`12/16`).

**Weights:**

- **SemiBold** — заголовки, CTA labels, nav active states.
- **Medium** — навигация, имена компонентов, badges.
- **Regular** — body, описания, метаданные.

## Anti-patterns

- ❌ Использовать Bold/Black weights — их нет в DS.
- ❌ Inline `style={{ fontSize: '14px' }}` — используйте Tailwind-классы `text-sm` (генерируются из tokens).
- ❌ Заголовок длиннее 80 символов на hero (см. schemas/landing-spec.ts: `title <= 80`).
- ❌ Использовать `text-4xl` и больше для body — это для headings.
