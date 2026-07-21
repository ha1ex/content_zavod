import { z } from 'zod';

/**
 * BriefSchema — нормализованный вход от пользователя.
 * Цель: превратить размытую просьбу «сделай нам лендинг» в управляемые данные.
 * Этап 0: skeleton. На этапе 1 расширим примерами и few-shot контекстом.
 */
export const BriefSchema = z.object({
  product: z.string().min(2).describe('Короткое описание продукта'),
  audience: z.array(z.string()).min(1).describe('Целевая аудитория (роли/сегменты)'),
  market: z.string().describe('Рынок / сегмент (B2B SaaS, B2C, Enterprise...)'),
  primaryGoal: z
    .enum(['book_demo', 'signup', 'waitlist', 'contact_sales', 'try_free', 'download'])
    .describe('Главная конверсионная цель'),
  mainPain: z.string().describe('Главная боль аудитории, которую решает продукт'),
  mainPromise: z.string().describe('Главное обещание продукта'),
  proofPoints: z.array(z.string()).default([]).describe('Доказательства/факты для trust'),
  tone: z.string().default('clear, professional, non-hype').describe('Tone of voice'),
  cta: z.string().describe('Основной CTA-текст (label кнопки)'),
  pageArchetype: z
    .enum(['saas', 'waitlist', 'enterprise', 'event'])
    .default('saas')
    .describe(
      'Тип лендинга — выбирается из доступных archetype. `event` — лендинг ' +
        'мероприятия (вебинар, конференция, митап): целевое действие — заполнить ' +
        'форму регистрации, а не перейти по кнопке. См. wiki/archetypes/event_landing.md.',
    ),
  pageLayout: z
    .enum([
      'enterprise-modular-saas',
      'single-module-deep-dive',
      'compliance-first-enterprise',
      'comparison-vs-competitor',
      'story-led-unaware',
      'depersonalized-product-tour',
      'crm-product-tour',
      'migration-from-competitor',
      'product-launch',
      'case-study-deep-dive',
      'event-webinar',
    ])
    .optional()
    .describe(
      'Выбранный layout из wiki/layouts/ — определяет порядок секций и per-slot mock-рекомендации. ' +
        'Если не указан, prepare попробует подобрать по эвристике (pageArchetype + audience), но это fallback. ' +
        'Для pageArchetype:"event" — layout "event-webinar". ' +
        'Лучшая практика: явно выбрать в брифе после прочтения wiki/layouts/index.md.',
    ),
  sectionOrder: z
    .array(z.string())
    .optional()
    .describe(
      'Кастомный порядок блоков (brief-флоу). Список КЛЮЧЕЙ секций сверху вниз. Ключ секции = её ' +
        '`id` (hero, features, faq, final_cta…); для повторяющихся блоков (несколько MediaCopy) — ' +
        '`id:discriminator`, где discriminator = props.mediaVariant/variant (например ' +
        '`media_copy:cli-markdown-export`) или порядковый индекс. Когда задан: `agent apply` ' +
        'ПЕРЕСТАВЛЯЕТ секции лендинга по этому порядку, а `layout-conformance` ПРОПУСКАЕТСЯ ' +
        '(порядок оператора — истина). Hero принудительно ставится первым в теле; шапка/подвал ' +
        'добавляются автоматически (правило factory-chrome). Незнакомые ключи и не перечисленные ' +
        'секции — предупреждение (не перечисленные добавляются в конце). ' +
        'Оператор может править ТОЛЬКО это поле в основном брифе после первой генерации — гейт ' +
        'briefs-immutable делает исключение для sectionOrder. Правило: `operator-section-order`.',
    ),
  event: z
    .object({
      date: z.string().describe('Дата мероприятия, например «30 июля»'),
      time: z.string().optional().describe('Время начала + часовой пояс, например «16:00 МСК»'),
      format: z.string().optional().describe('Формат: «онлайн» / «офлайн» / «гибрид»'),
      eyebrow: z
        .string()
        .optional()
        .describe(
          'Надзаголовок hero целиком, например «Бесплатный вебинар · 30 июля · онлайн». ' +
            'Если не задан — собирается из date/format.',
        ),
      speaker: z
        .object({
          name: z.string().describe('Имя ведущего'),
          role: z.string().optional().describe('Роль/должность, например «Продукт-менеджер Kaiten»'),
          bio: z
            .string()
            .optional()
            .describe('Био/экспертиза — ТОЛЬКО подтверждённые факты, без выдуманных цифр про живого человека'),
          photoSrc: z.string().optional().describe('Путь к фото ведущего'),
        })
        .optional()
        .describe('Ведущий мероприятия — блок SpeakerCard'),
      program: z
        .array(z.object({ title: z.string(), description: z.string().optional() }))
        .optional()
        .describe('Программа/агенда — пункты для TimelineRoadmap (numbered)'),
      registration: z
        .object({
          action: z.string().optional().describe('Endpoint формы (submit URL). Уточнять у команды'),
          dataConsentHref: z.string().optional().describe('Ссылка на согласие 152-ФЗ'),
          anchorTop: z.string().default('registration-top').describe('Якорь формы в hero'),
          anchorFinal: z.string().default('registration').describe('Якорь финальной формы'),
        })
        .optional()
        .describe('Параметры формы регистрации'),
    })
    .optional()
    .describe(
      'Данные мероприятия для pageArchetype:"event". Несёт ПОДТВЕРЖДЁННЫЕ факты ' +
        '(дата/время/формат, ведущий, программа, endpoint формы), которые нельзя безопасно ' +
        'выдумать. Что неизвестно — оставить пустым и уточнить у команды. ' +
        'См. wiki/archetypes/event_landing.md и wiki/layouts/event-webinar.md.',
    ),
  resolvedSegments: z
    .array(z.string())
    .optional()
    .describe(
      'Резолвленные id сегментов из wiki/audiences/kaiten-scoring.json (опционально). ' +
        'Заполняется host-LLM после audience-research, когда lexical-match по audience/market не сработал.',
    ),
  landingMode: z
    .enum(['brief', 'custom'])
    .default('brief')
    .optional()
    .describe(
      'Режим лендинга (выбирается ДО брифа). ' +
        '"brief" — стандартная цепочка: layout из wiki/layouts, фазы P0..P8, пайплайн может адаптировать структуру и добавлять секции под layout. ' +
        '"custom" — «1-в-1 по ТЗ»: pageLayout игнорируется (в т.ч. enterprise-modular-saas), layout-conformance ВЫКЛючен, структура и контент строго из ТЗ; лишние блоки (Pricing/FAQ/Promo и пр.) НЕ добавляются, если их нет в ТЗ.',
    ),
});

export type Brief = z.infer<typeof BriefSchema>;
