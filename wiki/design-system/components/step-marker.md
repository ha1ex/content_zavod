---
slug: ds-component-step-marker
type: design-system
created: 2026-06-03
updated: 2026-06-03
sources:
  - figma: https://www.figma.com/design/6M8lLx2PgVTxwXMeRiOVH4/Landing-DS?node-id=4676-8688
  - design-system/kaiten-v01/tokens.json
related:
  - wiki/design-system/colors.md
  - wiki/design-system/typography.md
  - wiki/design-system/radius.md
tags:
  - component
  - step
  - marker
  - checkbox
  - progress
stale: false
---

# StepMarker

Круглый маркер шага: номер, check-state или компактный checkbox-like indicator. Используется в process-блоках, списках преимуществ, onboarding-сценариях и карточках с последовательностью действий.

## Структура

- **value** - число `1..99` или icon `check`.
- **state** - `default | active | complete | muted | disabled`.
- **size** - `sm | md | lg`, default `md`.
- **label** (опц.) - внешний текст рядом с маркером; не входит внутрь круга.

## Variants

- **Number.** Внутри круга отображается число шага. Для последовательностей, где порядок важен.
- **Check.** Внутри круга отображается check icon. Для completed state или benefit-list.
- **Empty / muted.** Пустой круг или приглушенный номер. Для будущих шагов.
- **Active.** Violet fill или violet border, чтобы показать текущий шаг.

## States

| State | Background | Border | Content |
|---|---|---|---|
| default | `neutral.000` | `neutral.300` | `neutral.700` |
| active | `violet-100` | `violet-100` | `neutral.000` |
| complete | `violet-100` или `green-100` | same as background | `neutral.000` check |
| muted | `neutral.100` | `neutral.300` | `neutral.500` |
| disabled | `neutral.100` | `neutral.200` | `neutral.400` |

## Layout

- Shape - circle, `radius/full`.
- Marker не сжимается: `flex: 0 0 auto`.
- `sm`: `24px`, label `text-xs`, icon `12px`.
- `md`: `32px`, label `text-sm`, icon `16px`.
- `lg`: `40px`, label `text-md`, icon `20px`.
- Если marker стоит рядом с текстом, gap до текстового блока - `spacing/3` (`12px`) или `spacing/4` (`16px`) для крупных карточек.

## Typography

- Число внутри круга - Medium или SemiBold.
- Для `sm` не используйте двухзначные числа: они становятся тесными. Переключайтесь на `md`.
- Check icon должен быть оптически центрирован, stroke `2px`.

## Usage rules

- Number variant используйте только там, где есть настоящая последовательность.
- Check variant подходит для подтвержденных преимуществ, выполненных шагов и коротких списков.
- В одном process-блоке не смешивайте number и check без смыслового перехода: например, pending steps = number, completed steps = check.
- Marker не должен быть единственным носителем смысла. Рядом всегда нужен текст, кроме декоративных counters в очень плотном UI.
- Для горизонтальных timelines сохраняйте одинаковый размер marker на всех шагах.

## Anti-patterns

- Использовать StepMarker как самостоятельную кнопку без интерактивных states.
- Ставить длинный текст внутрь круга.
- Делать разные размеры marker внутри одной последовательности.
- Использовать semantic green для каждого check в маркетинговом списке, если это не completion/status.
