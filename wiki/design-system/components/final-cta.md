---
slug: ds-component-final-cta
type: design-system
created: 2026-05-15
updated: 2026-05-15
sources:
  - packages/harness/src/registry/index.ts
related:
  - wiki/design-system/components/button.md
  - wiki/design-system/voice.md
tags:
  - component
  - section
  - cta
stale: false
---

# FinalCta

Финальный CTA-блок перед footer'ом.

## Структура

- **title** (4..80)
- **description** (опц., ≤200)
- **primaryCta** `{ label, href }`
- **secondaryCta** (опц.)

## Usage rules

- `final_cta_matches_page_goal` constraint: primaryCta должен соответствовать `brief.primaryGoal` (если goal=`book_demo` — CTA про демо; если `signup` — про регистрацию).
- Один FinalCta на лендинг.
- Title повторяет / усиливает hero promise, не дублирует слово в слово.
- Background — `surface-section` (`neutral.100`) или soft-violet (`accent.violet-12`).

## Anti-patterns

- ❌ Два FinalCta подряд.
- ❌ Title типа «Готовы начать?» — это generic, ничего не обещает.
- ❌ Несоответствие brief.primaryGoal (constraint fail).
