# wiki/AGENTS.md

Конвенции LLM-maintained wiki для athens-harness. Паттерн взят из [LLM Wiki by Andrej Karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).

**Что это.** `wiki/` — накопительный markdown-слой со знаниями о домене (аудитории, паттерны копирайта, лессоны от прошлых генераций, документация дизайн-системы) и хроникой операций harness'а. В отличие от:

- `content/briefs/` — raw input (immutable).
- `content/landings/` — generated specs (regeneratable артефакты).
- `packages/harness/src/skills/` — встроенные методички уровня кода (загружаются в системный промпт).
- `design-system/kaiten-v01/` — source of truth дизайн-системы (HTML/PDF/PNG от дизайн-команды).
- `.claude/skills/` — Claude Code skills (workflow-обёртки).

…wiki — это **место, где знания накапливаются со временем** (lessons, filed-back landings, audience profiles) и где автогенерируется derived-контент из source of truth (tokens.json → wiki/design-system/*.md).

## Файловые конвенции

Каждая страница (кроме `index.md`, `log.md`) ДОЛЖНА содержать YAML front-matter:

```yaml
---
slug: <kebab-case-id>
type: audience | pattern | landing | design-system | archetype | meta
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: [path/relative/to/repo, ...]    # входящие источники
related: [path/relative/to/repo, ...]    # связанные страницы
tags: [...]                              # опц.
stale: false | YYYY-MM-DD                # выставляет lint при необходимости
---
```

## Naming

- `audiences/<role-or-segment>.md` — например, `audiences/pm-saas.md`
- `patterns/<category>/<id>.md` — например, `patterns/headlines/promise-time.md`
- `landings/<slug>.md` — совпадает с `content/landings/<slug>.json`
- `archetypes/<archetype>.md` — `saas_landing.md`, `waitlist_landing.md`, ...
- `design-system/<topic>.md` — `colors.md`, `typography.md`, ...
- `design-system/components/<component>.md` — usage rules компонентов

## Immutable

НЕ редактировать руками:

- `wiki/index.md` — автогенерируется командой `harness wiki index` (M3).
- `wiki/log.md` — append-only; никогда не правьте прошлые записи.
- Блоки `<!-- gen:tokens -->` внутри `wiki/design-system/*.md` — автогенерируются из `design-system/kaiten-v01/tokens.json` (M2).
- Блоки `<!-- gen:landing-summary -->` внутри `wiki/landings/<slug>.md` — пишутся `fileLandingToWiki` (M4b).

## Editable

Правится руками или через LLM:

- `wiki/lessons.md` — append/refine; используется repair-loop'ом (M4c).
- Usage-секции в `wiki/design-system/*.md` (вне `<!-- gen:* -->` блоков).
- `wiki/patterns/**` — create + refine.
- `wiki/audiences/<slug>.md` — создаётся `harness ingest brief`, дополняется руками.
- `## Reviewer notes` секция в `wiki/landings/<slug>.md` — заполняется через `harness ingest feedback`.

## Workflow (после реализации M2-M4)

1. **Новый бриф:** `harness ingest brief <path>` → создаёт/обновляет `wiki/audiences/*.md`, пишет в `log.md`.
2. **Генерация:** `harness generate landing --brief <path> --slug <slug>` → пишет `content/landings/<slug>.json` + `generated/landings/<slug>/page.tsx` + `wiki/landings/<slug>.md` (status=draft) + entry в `log.md`.
3. **Approve:** через `/approve/[slug]` или CLI → обновляет `wiki/landings/<slug>.md` (status=approved, visual baseline ref) + log.
4. **Handoff:** `harness handoff <slug>` → обновляет landing-страницу (status=shipped, zip ref) + log.
5. **Feedback:** `harness ingest feedback <slug> "<note>"` → добавляет в `## Reviewer notes`, предлагает обновить `wiki/lessons.md`.
6. **Health check:** `harness lint` (или CI workflow `wiki-freshness.yml`) — проверки drift'а.

## Lint-правила

`harness lint` проверяет:

- **tokens-drift** — `packages/ui/src/tokens.css` соответствует тому, что было бы сгенерировано из `design-system/kaiten-v01/tokens.json`.
- **wiki-drift** — `<!-- gen:tokens -->` блоки в `wiki/design-system/*.md` синхронны с `tokens.json`.
- **schema-vs-registry** — каждая запись в `REGISTRY` имеет соответствующую секцию в `LandingSpecSchema`.
- **orphan-pages** — страница не упомянута в `index.md` и не имеет входящих cross-refs.
- **stale-claims** — front-matter `updated:` старше 90 дней — warning, старше 180 — error.
- **cross-ref-validity** — все `sources:`, `related:` указывают на существующие пути.
- **forbidden-words** — `wiki/landings/*.md` не содержит слов из `wiki/design-system/voice.md` denylist.
- **index-sync** — `wiki/index.md` содержит все существующие страницы.
- **broken-skill-refs** — ссылки на `.claude/skills/`, `packages/harness/src/skills/`, `design-system/kaiten-v01/` валидны.

## Что НЕ класть в wiki

- Конкретный контент бренда — это в `content/briefs/*.json`.
- TypeScript-код / схемы — это в `packages/harness/src/{schemas,pipeline,validators}/`.
- Конфиги моделей / провайдеров — в `packages/harness/src/providers/`.
- Встроенные методички системного промпта — в `packages/harness/src/skills/` (они грузятся через `readFile` в `buildLandingSystemPrompt`).
- Source of truth дизайн-системы — в `design-system/kaiten-v01/`.
- Эфемерные TODO — в `.context/`.
