---
slug: ds-spacing
type: design-system
created: 2026-05-15
updated: 2026-05-15
sources:
  - design-system/kaiten-v01/tokens.json
related:
  - wiki/design-system/grid.md
tags:
  - tokens
  - spacing
stale: false
---

# Spacing

4px-based scale. Источник — `design-system/kaiten-v01/tokens.json`.

## Tokens

<!-- gen:tokens -->
| Token | Px | CSS var |
|---|---|---|
| `spacing.0` | 0px | `--spacing-0` |
| `spacing.1` | 4px | `--spacing-1` |
| `spacing.2` | 8px | `--spacing-2` |
| `spacing.3` | 12px | `--spacing-3` |
| `spacing.4` | 16px | `--spacing-4` |
| `spacing.5` | 20px | `--spacing-5` |
| `spacing.6` | 24px | `--spacing-6` |
| `spacing.7` | 28px | `--spacing-7` |
| `spacing.8` | 32px | `--spacing-8` |
| `spacing.9` | 36px | `--spacing-9` |
| `spacing.10` | 40px | `--spacing-10` |
| `spacing.11` | 44px | `--spacing-11` |
| `spacing.12` | 48px | `--spacing-12` |
| `spacing.14` | 56px | `--spacing-14` |
| `spacing.16` | 64px | `--spacing-16` |
| `spacing.20` | 80px | `--spacing-20` |
| `spacing.24` | 96px | `--spacing-24` |
| `spacing.0_5` | 2px | `--spacing-0_5` |
| `spacing.1_5` | 6px | `--spacing-1_5` |
| `spacing.2_5` | 10px | `--spacing-2_5` |
| `spacing.3_5` | 14px | `--spacing-3_5` |
<!-- /gen:tokens -->

Читайте `12/48` как `token / pixels` (то есть `spacing-12 = 48px`).

## Usage rules

### Desktop

| Контекст | Spacing |
|---|---|
| Header height | `80px` |
| Header / menu rhythm | `12 / 48` |
| Text stack gap (заголовок → описание) | `4 / 16` |
| Text → CTA gap | `6 / 24` |
| Hero content → media | `12 / 48` или `16 / 64` (по визуальному весу) |
| Grid / card gap | `32px` |
| Section vertical spacing | `20 / 80` или `24 / 96` |
| Close elements в группе | `3 / 12` |

### Tablet / Mobile

| Контекст | Tablet | Mobile |
|---|---|---|
| Header height | `72px` | `72px` |
| Side padding | `24px` | `16px` |
| Compact internal gap | `3 / 12` | `3 / 12` |
| Medium internal gap | `4 / 16` | `4 / 16` |
| Text → action gap | `6 / 24` | `6 / 24` |
| Larger block gap | `8 / 32` | `8 / 32` |
| Section spacing | `9 / 36` или `12 / 48` | `9 / 36` |
| Grid step | `24px` | `16px` |

### Горизонтальный side padding — только планшет/мобиль, на десктопе `0`

Side padding (`24px` tablet / `16px` mobile) применяется **только** когда контент шире окна — на планшете и мобиле. **На десктопе бокового padding нет:** как только окно достигает ширины контейнера (1216px), поля по бокам создаёт центрирование (`mx-auto` → auto-`margin`, `outer margin 248px` на артборде 1920 — см. `grid.md`), а не `padding`. Внутренний `px` на десктопе только сузил бы контент внутри 1216px.

Образец контейнера: `mx-auto w-full max-w-(--container-kaiten) px-4 md:px-6 xl:px-0` — `xl:px-0` сбрасывает padding на `≥1280px`. Без `xl:px-0` (только `px-4 md:px-6`) 24px «протекает» на десктоп поверх центрирования — это баг, а не правило. Исключение — внутренний padding вложенных карточек/панелей (`GradientPanel` и т.п.): он не боковой отступ страницы, его не трогаем.

## Anti-patterns

- ❌ Свободные значения (например, `padding: 22px`). Только из shкалы.
- ❌ Нестандартные секционные паддинги (>96px). Если нужно больше воздуха — это сигнал переосмыслить иерархию.
- ❌ `px-4 md:px-6` без `xl:px-0` — 24px бокового padding протекает на десктоп поверх центрирования и сужает контент внутри 1216px.
