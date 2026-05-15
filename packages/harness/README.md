# @buffalo/harness

LLM harness — ядро системы. Содержит schemas, registry, prompts, skills, pipeline, validators, CLI.

## Текущий статус

**Этап 0 (skeleton):** структура папок + CLI заглушки + zod-схемы (BriefSchema, LandingSpec, IllustrationSpec).

## Использование

```bash
# через workspace
pnpm harness -- --help
pnpm harness -- generate landing --brief content/briefs/golden.json
pnpm harness -- validate <slug>
pnpm harness -- handoff <slug>

# или напрямую внутри пакета
pnpm --filter @buffalo/harness cli -- --help
```

## Структура src/

```
src/
├── index.ts              public exports
├── cli.ts                commander CLI
├── schemas/              zod output contracts (BriefSchema, LandingSpec, IllustrationSpec)
├── registry/             (этап 1) auto-extracted из Storybook stories
├── prompts/              (этап 2) system prompts + few-shot examples
├── providers/            (этап 2) AI SDK adapter (anthropic + openai)
├── pipeline/             (этап 2) generate → validate → repair loop
├── skills/               (этап 2-3) create_landing, generate_hero_svg, repair_spec
└── validators/           (этап 3-4) schema / brand / a11y / visual / ast
```
