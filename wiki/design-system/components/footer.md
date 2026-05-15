---
slug: ds-component-footer
type: design-system
created: 2026-05-15
updated: 2026-05-15
sources:
  - packages/harness/src/registry/index.ts
related:
  - wiki/design-system/grid.md
tags:
  - component
  - section
  - footer
stale: false
---

# LandingFooter

Подвал лендинга. Всегда последняя секция (`always_last_section` constraint).

## Структура

- **brandName** (1..60)
- **brandTagline** (опц., ≤200)
- **columns** (1..5) — `{ title: 2..40, links: 1..8 × {label, href} }`
- **copyright** (опц., ≤200)

## Layout

- Brand-блок слева (logo + tagline), columns справа в grid.
- На mobile columns стэкаются.

## Usage rules

- Columns: типовые группы — `Продукт`, `Компания`, `Документация`, `Юридическое`, `Контакты`.
- Каждая column ≤ 8 ссылок. Если больше — это уже sitemap, не footer.
- `copyright` — текущий год + бренд. Например: «© 2026 Kaiten».

## Anti-patterns

- ❌ Дубликат primary nav в footer (повторение). Footer — это secondary navigation.
- ❌ Социальные иконки без `links` (отсутствие href = битая ссылка).
- ❌ Огромный footer на 8 columns — лендинг это не маркетинговый сайт.
