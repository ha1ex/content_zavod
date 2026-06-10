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
### Durations

| Token | Value | CSS var |
|---|---|---|
| `fast` | `120ms` | `--duration-fast` |
| `base` | `180ms` | `--duration-base` |
| `slow` | `240ms` | `--duration-slow` |

### Easings

| Token | Value | CSS var |
|---|---|---|
| `ui` | `cubic-bezier(0.2, 0, 0.2, 1)` | `--ease-ui` |
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
