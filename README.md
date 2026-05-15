# Buffalo — фабрика лендингов на LLM

> Превращаем маркетинговый бриф в готовый Kaiten-лендинг за минуту, а не за неделю.

Buffalo — это управляемый контур вокруг LLM (Claude / GPT), который генерирует SaaS-лендинги **строго на наших компонентах**, в нашем стиле, с автоматической проверкой бренда, доступности и бизнес-правил. На выходе — обычный TSX, который ревью и мержится как любой PR.

---

## Зачем это маркетингу

**Проблема.** Каждый новый лендинг отнимает у фронтенд-команды дни. Часто получается не в фирменном стиле и собирается «из чего попало», а не из дизайн-системы.

**Что даёт Buffalo:**

- 🟢 **Бриф → лендинг за ~1 минуту.** Заполнили JSON (или форму) — получили работающую страницу в превью.
- 🟢 **Только наши компоненты.** LLM физически не может вставить «левый» блок — registry компонентов жёстко ограничен.
- 🟢 **Авто-проверки.** Бренд, accessibility, бизнес-правила проверяются на каждом шаге. Если что-то не так — пайплайн сам чинит и пробует снова (repair loop).
- 🟢 **Готово к проду.** Выход — TSX-файл, который проходит обычный PR-флоу, типизацию и визуальные тесты.

---

## Как это работает (пайплайн)

```
  ┌────────┐    ┌─────────┐    ┌──────────────────┐    ┌─────────────┐
  │ Brief  │ →  │ Context │ →  │ Allowed          │ →  │ LandingSpec │
  │ (JSON) │    │ (бренд, │    │ components       │    │ (zod-схема) │
  └────────┘    │ DS, KB) │    │ (registry)       │    └──────┬──────┘
                └─────────┘    └──────────────────┘           │
                                                              ▼
  ┌──────────┐    ┌───────────┐    ┌────────────┐    ┌────────────────┐
  │ Handoff  │ ←  │ Preview   │ ←  │ Validators │ ←  │ TSX render     │
  │ (.zip,   │    │ (Next.js  │    │ + repair   │    │ (из компонент) │
  │  PR)     │    │  на :3000)│    │ loop       │    │                │
  └──────────┘    └───────────┘    └────────────┘    └────────────────┘
```

**Что происходит на каждом шаге:**

| Шаг | Что делает | Где живёт |
|-----|------------|-----------|
| **Brief** | Маркетинг описывает продукт, аудиторию, цель (`book_demo`/`signup`/…), tone, CTA | `content/briefs/<slug>.json` |
| **Context** | Подмешиваем дизайн-систему Kaiten + **skills-плейбуки** (см. раздел ниже) | `design-system/`, `packages/harness/src/skills/` |
| **Allowed components** | LLM видит только разрешённые блоки из нашего registry | `packages/harness/src/registry/` |
| **LandingSpec** | Структурированный JSON-план лендинга (zod-схема, строго типизирован) | `packages/harness/src/schemas/` |
| **TSX render** | Из спека собирается React-страница, иллюстрации генерируются отдельным шагом | `packages/harness/src/render/` |
| **Validators** | AST-проверки, бренд-чеки, доступность; при провале — repair loop (до 3 итераций) | `packages/harness/src/validators/` |
| **Preview** | Готовый лендинг открывается на `localhost:3000/p/<slug>` | `apps/web/` |
| **Handoff** | `.zip` с TSX + спек + manifest для передачи фронту/в PR | `out/landing-<slug>.zip` |

---

## Skills — плейбуки внутри LLM

Чтобы LLM не «галлюцинировал» и собирал лендинги по нашим правилам, рядом с ним лежит набор **skills** — markdown-документов с методологией. Skill подмешивается в system prompt на шаге **Context** и одновременно служит документом-памяткой для маркетинга и агентов, которые правят `LandingSpec` руками.

**Это первая версия — skills будут постоянно дорабатываться.** Маркетинг может и должен править эти файлы: меняются правила копи, появляется новый page type, обновился чек-лист аудита — всё это редактируется напрямую в markdown без правок кода.

### Текущие skills

| Skill | Поверхность | Статус | Что внутри |
|-------|-------------|--------|------------|
| [`conversion-landing.md`](packages/harness/src/skills/conversion-landing.md) | лендинги | ✅ active | 8 типов SaaS-страниц, awareness levels (по Шугерману), правила hero / секций / копи / CTA / social proof, визуальная сетка, **100-балльный audit-чек-лист** |
| [`content-marketing.md`](packages/harness/src/skills/content-marketing.md) | статьи | ⏳ planned | Playbook блог-поверхности: позиционирование, 5 направлений, пайплайн статьи, промпты для агентов |

### Как маркетингу работать со skills

| Хочу… | Что делать |
|-------|-----------|
| **Поменять правило копи** (например, запретить новое hype-слово) | Открыть `conversion-landing.md`, найти раздел про копирайтинг → дописать правило. Перегенерировать любой лендинг — правило применится |
| **Добавить новый page type** (например, отдельный шаблон под integration-страницы) | Дописать раздел в `conversion-landing.md` § «Page types» + добавить примеры hero/секций |
| **Ужесточить аудит-чек-лист** | Открыть § 17 (audit scorecard) → поднять веса или добавить пункты |
| **Завести skill для новой поверхности** (email-цепочки, ads-copy, blog) | Создать новый файл `packages/harness/src/skills/<name>.md` по тому же шаблону + frontmatter (`name`, `description`) |

### Что НЕ кладём в skills

- **Контент конкретного бренда** → `content/briefs/<slug>.json`.
- **TypeScript / схемы** → `packages/harness/src/schemas/`, `pipeline/`, `validators/`.
- **Конфиги моделей / провайдеров** → `packages/harness/src/providers/`.
- **Черновики и идеи** → `.context/` (gitignored).

> Подробнее про устройство папки и связь skill ↔ schema → `packages/harness/src/skills/README.md`.

---

## Быстрый старт (agent-mode, без API-ключей)

> Идея: Buffalo сам не вызывает внешнюю LLM. Он готовит prompt + JSON schema, а **хост-агент (Claude Code, Codex, ChatGPT с file access) сам и есть LLM**. Поэтому никаких `.env.local` и API-ключей не нужно.

**Один раз:**

```bash
pnpm install
```

**1. Создать бриф** — скопируй `content/briefs/buffalo.json` и поправь поля под продукт:

```json
{
  "product": "...",
  "audience": ["..."],
  "market": "B2B SaaS",
  "primaryGoal": "book_demo",
  "mainPain": "...",
  "mainPromise": "...",
  "proofPoints": ["...", "...", "..."],
  "tone": "clear, practical, confident, no hype",
  "cta": "Получить демо",
  "pageArchetype": "saas"
}
```

**2. Подготовить prompt для агента (LLM-вызова нет):**

```bash
pnpm -w run harness agent prepare landing \
  --brief content/briefs/<slug>.json \
  --slug <slug> \
  --out .context/agent/<slug>.prompt.md
```

В `.context/agent/<slug>.prompt.md` лежит system prompt, user prompt, JSON Schema (LandingSpec), brief и точный путь, куда писать spec.

**3. Сгенерировать spec через хост-агента.** Открой Claude Code (или Codex) в репозитории и скажи:

> «Сгенерируй лендинг по `content/briefs/<slug>.json`, slug `<slug>`».

Skill `buffalo-generate` (`.claude/skills/buffalo-generate/`) триггерится автоматически и проводит весь пайплайн. Агент сам прочитает prompt, напишет `content/landings/<slug>.json` и запустит apply.

Если хочешь руками — прочитай `<slug>.prompt.md`, сгенерируй JSON по схеме, положи в `content/landings/<slug>.json`.

**4. Прогнать валидаторы + отрендерить TSX:**

```bash
pnpm -w run harness agent apply landing \
  --slug <slug> \
  --brief content/briefs/<slug>.json
```

CLI:

- парсит spec через zod;
- прогоняет brand-voice + business-правила;
- рендерит TSX в `generated/landings/<slug>/page.tsx`;
- пишет meta + filing back в `wiki/landings/<slug>.md`.

При ошибках — `--json` даёт structured output для repair-loop'a (агент правит spec в файле и снова запускает apply).

**5. Посмотреть в превью:**

```bash
pnpm dev
# → http://localhost:3000/landings/<slug>
```

**6. Передать фронту** — собрать handoff-пакет:

```bash
pnpm -w run harness handoff <slug>     # → out/landing-<slug>.zip
```

В архиве: TSX-файлы, исходный spec, manifest и инструкция для PR.

> **Старый flow `harness generate landing` с внешним API-ключом** остаётся доступным как fallback (если у команды есть Vercel AI Gateway / Anthropic / OpenAI ключ). Раскомментируй соответствующие переменные в `.env.example` и положи их в `.env.local`.

---

## Структура репозитория

```
apps/web/                       Next.js preview + API (generate, validate, handoff)
packages/harness/               Ядро: schemas, registry, prompts, skills, pipeline, CLI
packages/ui/                    React-обёртки + Storybook (landing, primitives, illustrations)
packages/config/                Shared eslint / tsconfig / tailwind
content/briefs/                 Брифы маркетинга (вход)
content/landings/               Сохранённые LandingSpec (вход для render)
content/illustrations/          Specs для генерации иллюстраций
generated/landings/             Output: TSX + spec + manifest
design-system/kaiten-v01/       Источник истины дизайн-системы (HTML / PDF / PNG)
.context/attachments/           Рабочие материалы и черновики (gitignored)
```

---

## Стек (для тех, кому интересно)

- **Next.js 16** (App Router) — preview лендингов
- **Storybook 9** — registry компонентов и визуальный workshop
- **TailGrids v3** — закупленный набор landing-блоков
- **Vercel AI SDK** — провайдер-агностичный LLM-слой (Claude + GPT через Gateway)
- **zod** — output contracts (LandingSpec, IllustrationSpec, BriefSchema)
- **Playwright** — visual regression
- **pnpm workspaces** — монорепо

---

## Все команды

```bash
# Установка
pnpm install
pnpm dev                                      # Next.js preview :3000
pnpm storybook                                # Storybook :6006

# Лендинги (agent-mode, без API-ключей — дефолт)
pnpm -w run harness agent prepare landing --brief content/briefs/<slug>.json --slug <slug>
# … хост-агент пишет content/landings/<slug>.json …
pnpm -w run harness agent apply   landing --slug <slug> --brief content/briefs/<slug>.json
pnpm -w run harness handoff       <slug>      # → out/landing-<slug>.zip

# Старый flow с внешним API-ключом (опционально)
pnpm -w run harness generate landing --brief content/briefs/<slug>.json --slug <slug>
pnpm -w run harness validate <slug>

# Иллюстрации (этап 3)
pnpm -w run harness generate illustration --spec content/illustrations/<file>.json
pnpm -w run harness generate illustration --spec ... --no-llm   # детерминированный stub
pnpm -w run harness generate illustration --spec ... --strict   # упасть при провале AST-валидатора
```

Выход иллюстраций → `packages/ui/src/illustrations/<PascalCaseId>.tsx` + story, экспорт прописывается автоматически.

---

### Validators + repair loop (этап 4)

Поверх обоих пайплайнов крутится repair-loop: после каждой LLM-попытки прогоняем валидаторы, при ошибках собираем структурированный фидбек и просим модель исправить только эти места.

- **landing** валидируется brand-voice денилистом (`hype-word` / `absolutist` / `empty-marketing`) и business-правилами (`hero-first`, `footer-last`, `single-hero`, `pricing-highlighted`, `href-shape`, `cta-aligned-with-brief`, …).
- **illustration** валидируется AST-чек-листом этапа 3.

Параметры CLI (общие для обоих `kind`):

```bash
pnpm -w run harness generate landing --brief content/briefs/buffalo.json \
  --max-repair-attempts 3                       # дефолт 2; включает первый и repair-попытки
pnpm -w run harness generate illustration --spec ... --strict   # упасть на финальных ошибках
```

### Visual regression + Approve UI (этап 5)

Playwright смотрит на сгенерированные лендинги в зафиксированном viewport (1440×900, desktop-chromium) и сравнивает с baseline'ами в `apps/web/tests/visual/__snapshots__/`.

```bash
pnpm --filter @buffalo/web test:visual            # прогон против baseline
pnpm --filter @buffalo/web test:visual:update     # перебить baseline после намеренных правок
```

Approve-флоу для PM: `/approve/<slug>` показывает превью в iframe + форму со статусом (`pending` / `changes_requested` / `approved` / `rejected`), reviewer'ом и комментариями. Состояние пишется в `content/approvals/<slug>.json` через `POST /api/approve/<slug>`.

CLI команды по approvals:

```bash
pnpm -w run harness approvals list                # все approval'ы со статусами
pnpm -w run harness approvals status <slug>       # JSON одной записи
pnpm -w run harness approvals check <slug...>     # CI: exit≠0 если хоть один не approved
```

### Claude Code skills (этап 7)

Два project-level skill'а в `.claude/skills/` оборачивают всю фабрику:

- **`buffalo-generate`** — Claude автоматически проводит E2E пайплайн (бриф → spec → TSX → иллюстрации → preview → handoff) когда видит запрос «сгенерируй лендинг», «buffalo generate», «harness landing».
- **`buffalo-review`** — Claude проходит QA по готовому лендингу (валидаторы, visual regression, страница /approve) когда просят «проверь лендинг», «buffalo review», «что не так с [slug]».

Skills декларативно ссылаются на CLI и валидаторы — никакого магического кода вне харнесса.

### Handoff ZIP (этап 6)

`harness handoff <slug>` собирает self-contained пакет, который можно уронить в чужой Next.js + Tailwind v4 проект:

```bash
pnpm -w run harness handoff <slug>                            # → out/landing-<slug>.zip
pnpm -w run harness handoff <slug> --require-approved         # gate: блокируем если approval != approved
pnpm -w run harness handoff <slug> -o /path/to/landing.zip    # custom output
```

Содержимое zip'а: `page.tsx` (с переписанными импортами на `./components`), `components/` (только использованные), `primitives/` (Button, ButtonLink, cn), `illustrations/` (SVG из spec.illustrationSpecs), `tokens.css`, `styles.css`, `spec.json`, опц. `approval.json`, `README.md` и `package.json` snippet с минимумом deps.

## Куда что класть

| Что | Куда |
|-----|------|
| API ключи (LLM) | `.env.local` (шаблон в `.env.example`) |
| Дизайн-система | `design-system/kaiten-v01/` (источник истины — см. README внутри) |
| Новый бриф | `content/briefs/<slug>.json` или через UI |
| Новый компонент | `packages/ui/src/landing/` + регистрация в registry |
| Новый skill / промпт | `packages/harness/src/skills/<name>.md` |

---

## Правило обновления README

**README — это лицо проекта для команды маркетинга.** Любое изменение, которое затрагивает то, что описано выше, обязано обновить README **в том же PR**.

Когда README **обязательно** трогать:

- Поменялся CLI (флаги, имена команд, новые подкоманды).
- Поменялась структура каталогов (`apps/`, `packages/`, `content/`, `design-system/`, `generated/`).
- Поменялись схемы (`LandingSpec`, `IllustrationSpec`, `BriefSchema`) — поля брифа в примере.
- Добавились / удалились env-переменные (`.env.example`).
- Поменялись шаги пайплайна или появилась новая стадия.
- Добавился новый skill или изменилось поведение существующего.

Это закреплено технически:

- **PR-шаблон** (`.github/pull_request_template.md`) содержит чек-лист «README обновлён?».
- **CI-проверка** `.github/workflows/readme-freshness.yml` — если PR трогает чувствительные пути (CLI / schemas / pipeline / structure / `.env.example`), но README не обновлён, бот оставляет комментарий и помечает проверку warning.

Не обходить эту проверку без явного «README не нужно» в описании PR.

---

## План реализации

Подробный план этапов — `/Users/halex/.claude/plans/system-instruction-you-are-working-memoized-neumann.md`.
Прогресс по этапам — через `TaskList` в Conductor.
