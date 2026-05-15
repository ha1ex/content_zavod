---
slug: ds-motion
type: design-system
created: 2026-05-15
updated: 2026-05-15
sources:
  - design-system/kaiten-v01/tokens.json
related: []
tags:
  - tokens
  - motion
stale: false
---

# Motion

Restrained UI motion. Источник — `design-system/kaiten-v01/tokens.json`.

## Tokens

<!-- gen:tokens -->
_Блок генерируется при первом запуске `harness wiki sync`._
<!-- /gen:tokens -->

## Usage rules

- **`fast` (120ms)** — мгновенный feedback: hover-background, focus-ring fade-in, button-press feedback.
- **`base` (180ms)** — стандартные UI-транзишены: tab switching, dropdown open, modal fade.
- **`slow` (240ms)** — accordion open/close, carousel slide transitions.

**Easing — один.** `--ease-ui: cubic-bezier(.2, 0, .2, 1)` — единая кривая для всех UI-анимаций. Линейные easings — только для loading-spinner.

## Anti-patterns

- ❌ Анимации длиннее `400ms` — это уже не UI, а decorative animation.
- ❌ Bouncy / spring easings — Kaiten — calm B2B, не игровое приложение.
- ❌ Анимировать `width`/`height`/`top`/`left` — используйте `transform: scale/translate` и `opacity`.
