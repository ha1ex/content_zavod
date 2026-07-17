---
slug: cli-community-edition-reference
type: landing-reference
created: 2026-07-17
updated: 2026-07-17
related:
  - wiki/references/domain-mock-matrix.md
  - packages/harness/src/prompts/section-mock-skill.md
  - content/briefs/kaiten-cli.json
tags:
  - domain
  - cli
  - devtools
  - reference
stale: false
---

# Reference — домен Kaiten CLI / Community Edition

Эталон визуального набора для лендингов про **инструменты командной строки**
поверх Kaiten. Первый лендинг домена — `kaiten-cli` (по README репозитория
[ViktorOgnev/kaiten-cli](https://github.com/ViktorOgnev/kaiten-cli)).

## Чем домен отличается

Домен визуально уникален: продукт — не канбан-доска, а **терминал**. Поэтому
весь набор — окна командной строки и файлы кода, а не борды с карточками.
Переиспользовать сюда `pm-board`, `production-board` и подобные **нельзя**:
доска вместо терминала не отражает продукт (блокер ревью). И наоборот —
терминальные моки не ставим на обычные продуктовые лендинги Kaiten.

## Аудитория

- Инженер и тимлид команды разработки, которые живут в терминале.
- Инженер автоматизации / DevOps, собирающий интеграции с Kaiten.
- Аналитик, считающий канбан-метрики по данным Kaiten.
- Инженер, подключающий ИИ-агентов к Kaiten.

Решение о применении принимает сам пользователь; согласование нужно только на
выдачу токена доступа. Целевое действие — **установка из репозитория**
(`primaryGoal: download`), а не тестовый период.

## Визуальный язык

- **Раскладка окна:** светлый window-chrome в палитре V01 (три точки + заголовок
  `kaiten — …`) поверх тёмного тела кода на нейтральном DS-токене
  `--color-neutral-950`. Моноширинный шрифт (`font-mono`), плотная типографика
  `text-[11.5px]…text-[13px]`.
- **Синтаксис — на DS-акцентах, без raw-hex:** приглашение `$` и пути/строки —
  `--color-green-100`; числа/идентификаторы — `--color-blue-100`; ключи JSON —
  `--color-violet-100`; флаги и служебное — нейтральные `--color-neutral-400/500`;
  команда — `--color-neutral-000`. Галочка успеха — `--color-green-100`.
- **Одна ось цвета на мок:** в снимках и batch зелёный кодирует «локально / меньше
  обращений к API», а не смешивается с приоритетами/типами.
- **Общие части** вынесены в `CliTerminalHeroMock` и переиспользуются
  (`TerminalChrome`, `Prompt`, `Flag`, `Path`, `OkLine`, `CheckGlyph`).

## Набор моков

| Mock | Variant | Секции | Что показывает |
|---|---|---|---|
| `CliTerminalHeroMock` | `cli-terminal-hero` | hero, media | `cards get --markdown` → файл .md, затем `--json cards get` → JSON, строка stats `http_request_count: 1`. Сигнатурный первый экран |
| `CliMarkdownExportMock` | `cli-markdown-export` | media | Терминал `documents get --markdown` + готовый .md-файл (заголовок, чек-лист, ссылка на вложение в формате API Kaiten) |
| `CliSnapshotMetricsMock` | `cli-snapshot-metrics` | media, tab | `snapshot build --preset analytics` + `query metrics throughput` → таблица по доскам, бейдж «без обращений к API» |
| `CliBatchStatsMock` | `cli-batch-stats` | media, tab | `batch-get` по списку карточек + stats; сравнение «по одной — 3 обращения» vs «batch-get — 1 обращение» |
| `CliInstallMock` | `cli-install` | hero, media | `uv tool install …/kaiten-cli.git` → «установлено», `kaiten --version` → `0.1.27`. Для градиентного финального CTA и шага установки |

## Layout

`single-module-deep-dive` (один инструмент с прозрачным сценарием). Отличия от
базовой структуры зафиксированы в `content/briefs/kaiten-cli.tz.md`:

- блок доверия — **проверяемые факты инструмента** (356 инструментов / 31 модуль /
  0 обращений к API у `query`), а не кейсы клиентов: кейсов и отзывов по CLI нет;
- отдельный блок **статуса проекта** (Community Edition, без коммерческого SLA
  Kaiten) стоит до кнопки установки — умалчивать нельзя;
- блоки переноса данных и шаблонов не нужны.

## Что держать в голове

- Kaiten CLI Community Edition — публичный проект сообщества (поддерживает Виктор
  Огнев), коммерческого SLA Kaiten на него нет. Не выдаём за штатную фичу.
- Имена и команды не переводим: Kaiten, GitHub, SQLite, Markdown, JSON, Bash,
  Zsh, MCP, Python, uv, pipx, флаги и команды CLI. Канбан/скрам — кириллицей.
- Числа (356 / 31 / версия) взяты из README на дату сборки и меняются с
  выпусками — держать дату актуальности рядом.
