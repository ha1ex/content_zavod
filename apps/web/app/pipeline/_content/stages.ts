import type { PipelineDoc } from './types';

/**
 * Этапы конвейера по порядку прохождения.
 * Порядок массива = порядок в левой навигации и на схеме обзора.
 */
export const STAGES: PipelineDoc[] = [
  {
    kind: 'stage',
    slug: 'intake',
    num: '1',
    title: 'Фабрика ТЗ (intake)',
    short: 'Сырые материалы превращаются в техзадание и машинный бриф',
    purpose: [
      'Точка входа конвейера. Команда приносит «сырьё»: описание задачи, документы, ссылки, выгрузки. Фабрика ТЗ проводит исследование и собирает из этого два документа: человекочитаемое техзадание (ТЗ) для согласования и машинный бриф — структурированную карточку, по которой дальше работает генерация.',
      'Этап нужен, чтобы лендинг не собирался по размытой формулировке: до запуска генерации фиксируются аудитория, главная боль, обещание, доказательства и цель страницы.',
    ],
    inputs: [
      'Папка inputs/<slug>/ с материалами: документы, заметки, выгрузки',
      'Свободная заявка request.md — что за страница и зачем она нужна',
    ],
    outputs: [
      'ТЗ для людей: content/briefs/<slug>.tz.md',
      'Машинный бриф: content/briefs/<slug>.json',
    ],
    how: [
      {
        title: 'Подготовка задания',
        detail:
          'Команда agent intake собирает задание для ассистента: методология фабрики ТЗ плюс все материалы из inputs/<slug>/.',
      },
      {
        title: 'Исследование и черновик',
        detail:
          'Ассистент (claude / codex в терминале) изучает материалы и пишет черновик ТЗ и брифа в рабочую папку .context/intake/<slug>/.',
      },
      {
        title: 'Публикация с гейтом',
        detail:
          'Команда agent intake-apply проверяет качество брифа (блокирующий гейт) и публикует ТЗ и бриф в content/briefs/.',
      },
      {
        title: 'Ревью человеком',
        detail:
          'ТЗ открывается в браузере на /intake/<slug>: можно согласовать или запросить правки до запуска сборки.',
      },
    ],
    rules: [
      {
        text: 'Поля брифа содержательны, а не «вода» (field-too-thin)',
        severity: 'hard',
        source: 'packages/harness/src/validators/brief-quality.ts',
      },
      {
        text: 'В полях нет лозунгов и рекламных штампов (slogan-in-field)',
        severity: 'hard',
        source: 'packages/harness/src/validators/brief-quality.ts',
      },
      {
        text: 'Домен продукта распознаётся по брифу (domain-unresolvable)',
        severity: 'hard',
        source: 'packages/harness/src/validators/brief-quality.ts',
      },
      {
        text: 'Обещания подкреплены доказательствами — кейсы, цифры, факты (proof-missing)',
        severity: 'hard',
        source: 'packages/harness/src/validators/brief-quality.ts',
      },
      {
        text: 'Язык: англицизмы из словаря помечаются для замены',
        severity: 'soft',
        source: 'packages/harness/src/validators/landing-language.ts',
      },
    ],
    commands: [
      {
        cmd: 'pnpm -w run harness agent intake landing --slug <slug> --request inputs/<slug>/request.md --inputs inputs/<slug>',
        note: 'Подготовить задание для ассистента',
      },
      {
        cmd: 'pnpm -w run harness agent intake-apply landing --slug <slug>',
        note: 'Проверить и опубликовать ТЗ + бриф',
      },
    ],
    artifacts: [
      { path: 'content/briefs/<slug>.tz.md', note: 'ТЗ для согласования' },
      { path: 'content/briefs/<slug>.json', note: 'машинный бриф' },
      { path: 'content/approvals/<slug>.intake.json', note: 'статус согласования ТЗ' },
    ],
    links: [
      {
        path: 'packages/harness/src/prompts/content-factory-methodology.md',
        note: 'методология фабрики ТЗ',
      },
      { path: '.claude/skills/kaiten-intake/SKILL.md', note: 'скилл intake для ассистента' },
    ],
  },

  {
    kind: 'stage',
    slug: 'routing',
    num: '2',
    title: 'Маршрутизация (auto-routing)',
    short: 'Бриф автоматически направляется в быстрый или поэтапный конвейер',
    purpose: [
      'Перед генерацией бриф проходит детерминированную маршрутизацию — без LLM, по фиксированным правилам. Система решает, какой конвейер справится: быстрый one-shot (legacy) или поэтапный с проверками на каждом шаге (phased).',
      'Это защита от двух ошибок сразу: не тратить полный поэтапный прогон на простой бриф и не отдавать сложный бриф быстрому конвейеру, который соберёт его с потерей качества.',
    ],
    inputs: ['Опубликованный бриф content/briefs/<slug>.json'],
    outputs: [
      'Решение о маршруте: .context/pipeline/<slug>/route-decision.json',
      'Запуск выбранного конвейера (legacy / phased) или стоп с задачей на mock-и',
    ],
    how: [
      {
        title: 'Аудит домена',
        detail:
          'Продукт из брифа сопоставляется с реестром покрытых доменов (PM, Support, CRM, HR, Marketing, BPM, Finance, Ecommerce — 27 mock-компонентов). Неизвестный домен — стоп: сначала нужно создать mock-и этого домена.',
      },
      {
        title: 'Подсчёт сигналов сложности',
        detail:
          'Взвешенные сигналы: аудитория не размечена (0.30), не выбран макет страницы (0.25), бриф слишком короткий (0.20), сложная цель — waitlist / контакт с продажами / download (0.15), три и более персон (0.10), нет доказательств (0.10).',
      },
      {
        title: 'Решение',
        detail:
          'Сумма сигналов ≥ 0.5 → поэтапный конвейер (phased). Меньше 0.5 → быстрый (legacy). Неизвестный домен → manual-creation-required.',
      },
    ],
    rules: [
      {
        text: 'Неизвестный домен блокирует генерацию: сначала mock-и своего домена, переиспользовать чужие запрещено',
        severity: 'hard',
        source: 'packages/harness/src/pipeline/route-pipeline.ts',
      },
      {
        text: 'Маршрут можно зафиксировать вручную флагами --force-legacy / --force-phased',
        severity: 'soft',
        source: 'packages/harness/src/pipeline/route-pipeline.ts',
      },
      {
        text: 'Флаг --require-intake-approved не даёт собрать лендинг без согласованного ТЗ',
        severity: 'hard',
        source: 'packages/harness/src/cli.ts',
      },
    ],
    commands: [
      {
        cmd: 'pnpm -w run harness agent build landing --slug <slug> --brief content/briefs/<slug>.json',
        note: 'Рекомендуемый запуск: маршрутизация + сборка автоматически',
      },
      {
        cmd: 'pnpm -w run harness agent build landing --slug <slug> --brief content/briefs/<slug>.json --route-only',
        note: 'Только показать решение маршрутизатора, без сборки',
      },
    ],
    artifacts: [
      { path: '.context/pipeline/<slug>/route-decision.json', note: 'решение и сработавшие сигналы' },
    ],
    links: [
      { path: 'packages/harness/src/pipeline/route-pipeline.ts', note: 'правила маршрутизации' },
    ],
  },

  {
    kind: 'stage',
    slug: 'legacy',
    num: '3a',
    branch: 'legacy',
    title: 'Быстрый конвейер (legacy)',
    short: 'Один проход: ассистент пишет всю страницу сразу, затем пакет проверок',
    purpose: [
      'Маршрут для простых и хорошо описанных брифов. Ассистент получает один большой системный промпт — брендовый канон, реестр разрешённых компонентов, плейбук макета — и пишет спецификацию страницы целиком за один проход.',
      'Скорость достигается тем, что проверки выполняются после генерации: готовая спецификация прогоняется через пакет валидаторов, и при ошибках ассистент чинит их в repair-цикле (до 3 попыток).',
    ],
    inputs: [
      'Бриф content/briefs/<slug>.json',
      'Системный промпт: канон + реестр компонентов + плейбук макета',
    ],
    outputs: [
      'Спецификация страницы content/landings/<slug>.json',
      'Код страницы generated/landings/<slug>/page.tsx',
    ],
    how: [
      {
        title: 'prepare',
        detail: 'Команда agent prepare собирает системный промпт и схему ответа для ассистента.',
      },
      {
        title: 'Генерация спецификации',
        detail:
          'Ассистент пишет content/landings/<slug>.json — все секции, тексты и mock-и сразу.',
      },
      {
        title: 'apply: проверки + ремонт',
        detail:
          'Команда agent apply прогоняет пакет валидаторов; при ошибках ассистент получает конкретный список и чинит. Максимум 3 попытки.',
      },
      {
        title: 'Рендер',
        detail: 'Прошедшая проверки спецификация превращается в React-страницу (TSX).',
      },
    ],
    rules: [
      {
        text: 'Структура спецификации соответствует схеме: типы и длины полей',
        severity: 'hard',
        source: 'packages/harness/src/schemas/landing-spec.ts',
      },
      {
        text: 'Бренд-голос: без хайпа, абсолютизмов и штампов',
        severity: 'hard',
        source: 'packages/harness/src/validators/landing-brand.ts',
      },
      {
        text: 'Бизнес-правила: hero первой секцией, hero один, CTA согласован с целью страницы',
        severity: 'hard',
        source: 'packages/harness/src/validators/landing-business.ts',
      },
      {
        text: 'Язык: англицизмы из словаря §10 редполитики',
        severity: 'soft',
        source: 'packages/harness/src/validators/landing-language.ts',
      },
      {
        text: 'Визуальное разнообразие: вариант default не повторяется',
        severity: 'hard',
        source: 'packages/harness/src/validators/landing-visual-diversity.ts',
      },
      {
        text: 'Порядок секций соответствует плейбуку макета',
        severity: 'hard',
        source: 'packages/harness/src/validators/landing-layout-conformance.ts',
      },
      {
        text: 'Mock-и и иллюстрации только из домена продукта',
        severity: 'hard',
        source: 'packages/harness/src/validators/illustration-domain-match.ts',
      },
      {
        text: 'Соответствие аудитории ≥ 70%: покрытие историй и сегментов',
        severity: 'hard',
        source: 'packages/harness/src/validators/landing-audience.ts',
      },
      {
        text: 'Непохожесть на другие лендинги завода (cross-landing diversity)',
        severity: 'soft',
        source: 'packages/harness/src/validators/cross-landing-diversity.ts',
      },
    ],
    commands: [
      {
        cmd: 'pnpm -w run harness agent prepare landing --brief content/briefs/<slug>.json --slug <slug>',
        note: 'Собрать задание для ассистента',
      },
      {
        cmd: 'pnpm -w run harness agent apply landing --slug <slug> --brief content/briefs/<slug>.json',
        note: 'Проверить спецификацию и отрендерить страницу',
      },
    ],
    artifacts: [
      { path: 'content/landings/<slug>.json', note: 'спецификация страницы' },
      { path: 'generated/landings/<slug>/page.tsx', note: 'готовый код страницы' },
    ],
    links: [
      { path: 'packages/harness/src/agent/ingest-landing.ts', note: 'цепочка проверок apply' },
    ],
  },

  {
    kind: 'stage',
    slug: 'phased',
    num: '3b',
    branch: 'phased',
    title: 'Поэтапный конвейер (phased, P0–P8)',
    short: 'Девять фаз с проверкой после каждой — для сложных брифов',
    purpose: [
      'Маршрут для сложных брифов: размытая аудитория, несколько персон, нестандартная цель. Страница собирается за девять фаз — от нормализации брифа до иллюстраций, и после каждой фазы стоит свой гейт: дальше нельзя, пока фаза не пройдёт проверку.',
      'Каждая фаза при ошибке чинится отдельно (repair-цикл до 3 попыток), а готовые фазы при повторном запуске пропускаются — конвейер можно перезапускать с любого места без потери сделанного.',
    ],
    inputs: ['Бриф content/briefs/<slug>.json'],
    outputs: [
      'Артефакты фаз: .context/pipeline/<slug>/p0…p8-*.json',
      'Спецификация и код страницы — как в быстром конвейере',
    ],
    how: [
      {
        title: 'Фазы идут строго по порядку',
        detail: 'P0 → P8, каждая пишет свой артефакт в .context/pipeline/<slug>/.',
      },
      {
        title: 'Гейт после каждой фазы',
        detail:
          'Не прошла проверка — ассистент получает список ошибок и чинит только эту фазу (до 3 попыток).',
      },
      {
        title: 'Идемпотентность',
        detail:
          'Повторный запуск пропускает уже готовые фазы; run-phase перезапускает одну конкретную фазу.',
      },
    ],
    phases: [
      {
        id: 'P0',
        title: 'Нормализация брифа',
        summary: 'Бриф приводится к строгой схеме, определяется домен продукта.',
        gate: 'Схема брифа валидна',
      },
      {
        id: 'P1',
        title: 'Аудитория и намерения',
        summary:
          'Сегменты, уровень осведомлённости, истории пользователей, обязательные намерения (mustCoverIntents).',
        gate: 'Минимум один сегмент аудитории',
      },
      {
        id: 'P2',
        title: 'Выбор макета',
        summary: 'Макет страницы из 10 плейбуков + альтернативы.',
        gate: 'Макет существует и совместим с осведомлённостью аудитории',
      },
      {
        id: 'P3',
        title: 'Аудит библиотеки',
        summary: 'Проверка: хватает ли mock-компонентов домена для задуманной страницы.',
        gate: 'Нет дыр по домену',
      },
      {
        id: 'P4',
        title: 'Архитектура секций',
        summary: 'Структура страницы без текстов: какие секции, зачем, в каком порядке.',
        gate: '100% намерений покрыто; у каждого выбора mock-а есть обоснование',
      },
      {
        id: 'P5',
        title: 'Распределение mock-ов',
        summary: 'Каждому слоту страницы назначается конкретный вариант mock-а.',
        gate: 'Вариант разрешён для домена (semantic fit)',
      },
      {
        id: 'P6',
        title: 'Тексты',
        summary: 'Полная спецификация с текстами всех секций.',
        gate: 'Схема + бренд-голос + бизнес-правила',
      },
      {
        id: 'P7',
        title: 'SEO и CTA',
        summary: 'Шлифовка заголовков, мета-данных и призывов к действию.',
        gate: 'Соответствие аудитории ≥ 70%',
      },
      {
        id: 'P8',
        title: 'Иллюстрации',
        summary: 'Секциям без mock-ов назначаются SVG-иллюстрации.',
        gate: 'Схема иллюстраций валидна; AST-проверка SVG',
      },
    ],
    rules: [
      {
        text: 'Гейты всех фаз — блокирующие (полная таблица в wiki)',
        severity: 'hard',
        source: 'wiki/pipeline/phase-gates.md',
      },
      {
        text: 'Финальный аудит непохожести на другие лендинги',
        severity: 'soft',
        source: 'packages/harness/src/validators/cross-landing-diversity.ts',
      },
    ],
    commands: [
      {
        cmd: 'pnpm -w run harness agent run landing --slug <slug> --brief content/briefs/<slug>.json',
        note: 'Прогнать все фазы подряд',
      },
      {
        cmd: 'pnpm -w run harness agent run-phase landing P4 --slug <slug> --brief content/briefs/<slug>.json',
        note: 'Перезапустить одну конкретную фазу',
      },
    ],
    artifacts: [
      { path: '.context/pipeline/<slug>/', note: 'артефакты фаз и repair-отчёты' },
    ],
    links: [
      { path: 'packages/harness/src/pipeline/orchestrator.ts', note: 'оркестратор фаз' },
      { path: 'wiki/pipeline/phase-gates.md', note: 'таблица гейтов по фазам' },
    ],
  },

  {
    kind: 'stage',
    slug: 'illustrations',
    num: '4',
    title: 'Иллюстрации (SVG)',
    short: 'Секции без mock-ов получают уникальные SVG в стиле Kaiten',
    purpose: [
      'Не каждой секции подходит mock интерфейса. Для таких секций конвейер генерирует векторные SVG-иллюстрации по спецификации: светлая и тёмная версии, палитра бренда, реализм домена продукта.',
      'Каждая иллюстрация автоматически проверяется на уровне разметки (AST): корректный viewBox, без растровых вставок, с доступностью. Реестр анти-дубликации не даёт использовать одну и ту же иллюстрацию на разных лендингах.',
    ],
    inputs: [
      'Секции без mock-а из спецификации страницы',
      'IllustrationSpec — задание на иллюстрацию',
    ],
    outputs: [
      'SVG-иллюстрации для секций',
      'Записи в реестре content/illustrations/registry.json',
    ],
    how: [
      {
        title: 'Постановка задания',
        detail: 'Фаза P8 (или ручной запуск) собирает IllustrationSpec: сюжет, домен, палитра.',
      },
      {
        title: 'Генерация SVG',
        detail:
          'Ассистент рисует SVG по правилам skill-документа: light/dark, токены бренда, без растра.',
      },
      {
        title: 'Проверка и регистрация',
        detail:
          'AST-валидатор проверяет разметку; иллюстрация регистрируется в реестре анти-дубликации.',
      },
    ],
    rules: [
      {
        text: 'Разметка SVG: viewBox, без растровых изображений, доступность',
        severity: 'hard',
        source: 'packages/harness/src/validators/illustration-ast.ts',
      },
      {
        text: 'Палитра соответствует токенам бренда',
        severity: 'soft',
        source: 'packages/harness/src/validators/illustration-ast.ts',
      },
      {
        text: 'Иллюстрация из домена продукта, без переиспользования чужих доменов',
        severity: 'hard',
        source: 'packages/harness/src/validators/illustration-domain-match.ts',
      },
    ],
    commands: [
      {
        cmd: 'pnpm -w run harness generate illustration --spec content/illustrations/<file>.json',
        note: 'Сгенерировать иллюстрацию по спецификации',
      },
    ],
    artifacts: [
      { path: 'content/illustrations/registry.json', note: 'реестр против дублей' },
    ],
    links: [
      {
        path: 'packages/harness/src/prompts/svg-illustration-skill.md',
        note: 'правила SVG-иллюстраций',
      },
    ],
  },

  {
    kind: 'stage',
    slug: 'visual-review',
    num: '5',
    title: 'Визуальное ревью (Playwright)',
    short: 'Скриншоты страницы сравниваются с эталоном попиксельно',
    purpose: [
      'Правило завода: лендинг считается готовым только после визуальной проверки скриншотом, а не после «страница открылась без ошибок». Playwright открывает сгенерированную страницу, снимает скриншоты и сравнивает их с эталонными.',
      'Любое расхождение с эталоном — повод посмотреть глазами: либо это регрессия и её нужно чинить, либо изменение осознанное — и тогда эталон обновляется отдельной командой.',
    ],
    inputs: [
      'Сгенерированная страница generated/landings/<slug>/page.tsx',
      'Эталонные скриншоты (baseline)',
    ],
    outputs: ['Отчёт сравнения; diff-картинки при расхождениях'],
    how: [
      {
        title: 'Запуск страницы',
        detail: 'Тест поднимает dev-сервер и открывает лендинг в браузере.',
      },
      {
        title: 'Скриншоты и сравнение',
        detail: 'Снимки сравниваются с эталоном попиксельно с настроенным порогом чувствительности.',
      },
      {
        title: 'Обновление эталона',
        detail: 'Если изменение осознанное — эталон пересоздаётся командой test:visual:update.',
      },
    ],
    rules: [
      {
        text: 'Расхождение скриншота с эталоном — провал проверки',
        severity: 'hard',
        source: 'apps/web/tests/visual/landing.spec.ts',
      },
    ],
    commands: [
      { cmd: 'pnpm --filter @kaiten/web test:visual', note: 'Прогнать визуальные тесты' },
      { cmd: 'pnpm --filter @kaiten/web test:visual:update', note: 'Обновить эталонные скриншоты' },
    ],
    links: [{ path: 'apps/web/tests/visual/landing.spec.ts', note: 'визуальные тесты' }],
  },

  {
    kind: 'stage',
    slug: 'approval',
    num: '6',
    title: 'Согласование (approval)',
    short: 'Человек смотрит готовую страницу и ставит статус',
    purpose: [
      'Финальное решение остаётся за человеком. Готовый лендинг открывается на странице согласования: превью, комментарии и статус — approved или changes_requested.',
      'Согласование двухуровневое: отдельно согласуется ТЗ (на этапе фабрики ТЗ), отдельно — готовый лендинг. Статусы хранятся в репозитории рядом с контентом, история не теряется.',
    ],
    inputs: ['Готовая страница (превью /landings/<slug>)'],
    outputs: [
      'Статус лендинга: content/approvals/<slug>.json',
      'Статус ТЗ: content/approvals/<slug>.intake.json',
    ],
    how: [
      {
        title: 'Открыть страницу согласования',
        detail:
          'http://localhost:3000/approve/<slug> — превью страницы плюс форма: статус, имя ревьюера, комментарии.',
      },
      {
        title: 'Поставить статус',
        detail: 'approved / changes_requested / pending; комментарии сохраняются в файл статуса.',
      },
      {
        title: 'Гейты ниже по конвейеру',
        detail:
          'handoff с флагом --require-approved не соберёт пакет без approved; build с --require-intake-approved не стартует без согласованного ТЗ.',
      },
    ],
    rules: [
      {
        text: 'handoff --require-approved блокируется без статуса approved',
        severity: 'hard',
        source: 'packages/harness/src/approvals/index.ts',
      },
    ],
    commands: [
      { cmd: 'pnpm -w run harness approvals list', note: 'Список всех статусов' },
      { cmd: 'pnpm -w run harness approvals status <slug>', note: 'Статус конкретного лендинга' },
    ],
    artifacts: [{ path: 'content/approvals/', note: 'статусы согласований' }],
    links: [{ path: 'packages/harness/src/approvals/index.ts', note: 'хранение статусов' }],
  },

  {
    kind: 'stage',
    slug: 'handoff',
    num: '7',
    title: 'Передача в разработку (handoff)',
    short: 'Готовый лендинг пакуется в ZIP для команды фронтенда',
    purpose: [
      'Последний этап: согласованный лендинг упаковывается в самодостаточный архив — код страницы, используемые компоненты, дизайн-токены и документация. Разработчик получает один файл и не ходит по репозиторию завода.',
    ],
    inputs: [
      'Код страницы generated/landings/<slug>/page.tsx',
      'Статус согласования (для гейта --require-approved)',
    ],
    outputs: ['Архив out/landing-<slug>.zip'],
    how: [
      {
        title: 'Сборка пакета',
        detail: 'TSX страницы + компоненты + дизайн-токены + manifest собираются в ZIP.',
      },
      {
        title: 'Гейт согласования',
        detail: 'С флагом --require-approved пакет не соберётся без статуса approved.',
      },
      {
        title: 'Скачивание из браузера',
        detail: 'Кнопка «handoff ↓» на дашборде лендингов скачивает тот же архив.',
      },
    ],
    rules: [
      {
        text: 'С флагом --require-approved архив не собирается без согласования',
        severity: 'hard',
        source: 'packages/harness/src/handoff/',
      },
    ],
    commands: [
      { cmd: 'pnpm -w run harness handoff <slug>', note: 'Собрать архив' },
      {
        cmd: 'pnpm -w run harness handoff <slug> --require-approved',
        note: 'Собрать только если лендинг согласован',
      },
    ],
    artifacts: [{ path: 'out/landing-<slug>.zip', note: 'пакет для разработчика' }],
    links: [{ path: 'packages/harness/src/handoff/', note: 'сборщик пакета' }],
  },
];
