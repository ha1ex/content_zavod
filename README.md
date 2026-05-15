# Buffalo — LLM Harness для генерации SaaS-лендингов

Управляемый контур вокруг LLM: `brief → context → allowed components → LandingSpec → TSX render → validators → repair loop → preview → handoff-пакет`.

## Стек

- **Next.js 16** (App Router) — preview лендингов
- **Storybook 9** — registry компонентов + visual workshop
- **TailGrids v3** — базовый набор landing-блоков (купленный)
- **Vercel AI SDK** — провайдер-агностичный LLM-слой (Claude + GPT)
- **zod** — output contracts (LandingSpec, IllustrationSpec, BriefSchema)
- **Playwright** — visual regression
- **pnpm workspaces** — монорепо

## Структура

```
apps/web/              Next.js preview + API routes (generate, validate, handoff)
packages/harness/      ядро: schemas, registry, prompts, skills, pipeline, CLI
packages/ui/           компоненты-обёртки + Storybook (landing, primitives, illustrations)
packages/config/       shared eslint/tsconfig/tailwind
content/landings/      сохранённые LandingSpec (input)
generated/landings/    output build step (TSX + spec + manifest)
design-system/kaiten-v01/  источник истины дизайн-системы (HTML/PDF/PNG)
.context/attachments/      рабочие материалы и черновики (gitignored)
```

## Команды

```bash
pnpm install                   # один раз
pnpm dev                       # Next.js preview на :3000
pnpm storybook                 # Storybook на :6006
pnpm harness -- --help         # CLI
pnpm harness -- generate landing --brief examples/golden-brief.json
pnpm harness -- validate <slug>
pnpm harness -- handoff <slug> # → out/landing-<slug>.zip
```

## Куда что класть

- **API ключи** → `.env.local` (из `.env.example`)
- **Дизайн-система** → `design-system/kaiten-v01/` (источник истины — см. README внутри)
- **Brief** → `content/briefs/<name>.json` или через UI

## План реализации

Подробный план — `/Users/halex/.claude/plans/system-instruction-you-are-working-memoized-neumann.md`.
Прогресс по этапам — через `TaskList` в Conductor.
