import { z } from 'zod';

/**
 * LandingSpec — строгий output контракт LLM-генерации.
 *
 * Sections — discriminated union по полю `component`. Каждый компонент имеет
 * жёсткие props через zod, чтобы validator ловил расхождения и repair-loop мог
 * исправлять только проблемные секции.
 */

export const CtaSchema = z.object({
  label: z.string().min(1).max(40),
  href: z.string().min(1),
});
export type Cta = z.infer<typeof CtaSchema>;

export const AssetRefSchema = z.object({
  type: z.enum(['product_screenshot', 'illustration', 'logo_cloud', 'photo']),
  assetId: z.string(),
  src: z.string().optional(),
  alt: z.string().optional(),
  variant: z
    .enum([
      'support-board',
      'pm-board',
      'mcp-agent-board',
      'mcp-agent-board-animated',
      'analytics-kpi',
      'integrations-console',
      'modules-matrix',
      'sales-funnel',
      'crm-client-card',
      'omnichannel-inbox',
      'call-overlay',
      'booking-calendar',
      'crm-analytics',
      'doc-template',
      'mobile-crm',
      'hiring-pipeline',
      'candidate-card',
      'onboarding-checklist',
      'org-chart',
      'performance-review',
      'campaign-dashboard',
      'email-sequence',
      'ab-test-results',
      'audience-segments',
      'process-flowchart',
      'approval-chain',
      'sla-tracker',
      'ledger-view',
      'invoice-status',
      'reconciliation-matrix',
      'order-queue',
      'inventory-grid',
      'marketplace-connector',
      'docs-tree',
      'permissions-panel',
      'share-link-card',
      'doc-editor-rich',
      'template-gallery',
      'mobile-doc-reader',
      'production-board',
      'order-flow',
      'production-gantt',
      'production-task-card',
      'production-departments',
      'vks-artifact-flow',
      'meeting-room',
      'meet-list',
      'pm-board-1',
      'kanban-minimal',
      'portfolio-board',
      'approval-board',
      'reports-charts',
      'finance-kb-docs',
      'retail-task-card',
      'retail-project',
      'retail-portfolio-animated',
      'retail-mobile',
      'gantt-chart',
      'cli-terminal-hero',
      'cli-terminal-hero-animated',
      'cli-terminal-final-animated',
      'cli-markdown-export',
      'cli-snapshot-metrics',
      'cli-batch-stats',
      'cli-install',
      'hero-screen-interface',
      'generic',
    ])
    .optional(),
  /**
   * Опциональная ссылка на уникальную SVG-иллюстрацию (генерируется в P8
   * illustration allocation). Когда задана — рендерер использует её вместо
   * variant из enum. См. wiki/pipeline/phase-gates.md (P8).
   */
  illustrationId: z.string().optional(),
});
export type AssetRef = z.infer<typeof AssetRefSchema>;

/* ─── HeroScreenInterface board (для visual.variant='hero-screen-interface') ─ */
const HeroBoardCardSchema = z.object({
  /** Текст карточки — переписывается под логику ТЗ. */
  title: z.string().min(1).max(80),
  tags: z
    .array(
      z.object({
        label: z.string().max(24),
        variant: z.enum(['prod', 'cx', 'big', 'urg', 'ok', 'blue', 'jud']).optional(),
      }),
    )
    .max(3)
    .optional(),
  checklist: z
    .object({ label: z.string().max(24), done: z.number(), total: z.number() })
    .optional(),
  /** Цвета аватаров-исполнителей (hex). Декоративны. */
  assignees: z.array(z.string()).max(4).optional(),
  extraAssignee: z.string().max(8).optional(),
  due: z.string().max(16).optional(),
});
const HeroBoardSchema = z.object({
  boardTitle: z.string().min(1).max(40),
  columns: z
    .array(
      z.object({
        label: z.string().max(24),
        count: z.number().optional(),
        done: z.boolean().optional(),
      }),
    )
    .min(2)
    .max(4),
  lanes: z
    .array(
      z.object({
        name: z.string().max(24),
        count: z.number().optional(),
        columns: z.array(z.array(HeroBoardCardSchema)),
      }),
    )
    .min(1)
    .max(3),
  animate: z.boolean().optional(),
  animatedCard: z
    .object({ card: HeroBoardCardSchema, fromColumn: z.number().optional() })
    .optional(),
});

/* ─── Форма регистрации (слот hero + секция RegistrationCta) ───────── */
const RegistrationFormSlotSchema = z.object({
  /** Якорь формы — на него ведут промежуточные кнопки «Занять место». */
  anchorId: z.string().max(40).optional(),
  /** Endpoint отправки. Заглушка `#`; реальный подставляет верстальщик. */
  action: z.string().optional(),
  /** Ссылка на согласие на обработку персональных данных (152-ФЗ). */
  dataConsentHref: z.string().optional(),
  /** Мягкая строка под кнопкой. */
  note: z.string().max(200).optional(),
});

/* ─── Спикер (строка в hero + блок SpeakerCard) ────────────────────── */
const SpeakerSchema = z.object({
  name: z.string().min(2).max(80),
  role: z.string().min(2).max(120),
  photoSrc: z.string().optional(),
  photoAlt: z.string().max(160).optional(),
  /** Заглушка, пока фото не передано. */
  initials: z.string().max(4).optional(),
});

/* ─── HeroSection ─────────────────────────────────────────────────── */
const HeroSectionSchema = z.object({
  id: z.literal('hero'),
  component: z.literal('HeroSection'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(120),
    accentWord: z.string().max(40).optional(),
    /** Плашка вокруг accentWord. По умолчанию true; false — просто фиолетовый текст. */
    accentPill: z.boolean().optional(),
    subtitle: z.string().min(10).max(280),
    primaryCta: CtaSchema,
    secondaryCta: CtaSchema.nullable().optional(),
    visual: AssetRefSchema.nullable().optional(),
    visualPosition: z.enum(['side', 'below']).optional(),
    /**
     * Данные доски для visual.variant='hero-screen-interface' (анимированный
     * первый экран HeroScreenInterface). Тексты карточек — под логику ТЗ.
     * Если не задано — используется доменный дефолт. Правило: `comparison-hero-screen`.
     */
    board: HeroBoardSchema.optional(),
    /** Короткие буллеты под подзаголовком («что заберёте»). Только layout 'side'. */
    bullets: z.array(z.string().min(2).max(160)).max(4).optional(),
    /**
     * Карточка формы регистрации в правой колонке вместо `visual` — для лендингов,
     * где целевое действие это заполнить форму, а не перейти по кнопке. Подпись
     * кнопки берётся из `primaryCta.label`, дублирующие CTA не рендерятся.
     *
     * Работает ТОЛЬКО при `visualPosition: 'side'` (дефолт). Раскладка `'below'` и
     * вариант `visual.variant: 'hero-screen-interface'` форму игнорируют — она
     * молча не отрендерится, а вместо неё останутся кнопки CTA.
     */
    form: RegistrationFormSlotSchema.optional(),
    /** Строка ведущего/спикера под текстом первого экрана. */
    speaker: SpeakerSchema.optional(),
    /** Компактный первый экран: уменьшенные вертикальные отступы (по шкале DS, с дыханием под хедером). */
    flush: z.boolean().optional(),
  }),
});

/* ─── FeatureGrid ─────────────────────────────────────────────────── */
const FeatureGridSchema = z.object({
  id: z.literal('features'),
  component: z.literal('FeatureGrid'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(80),
    description: z.string().max(200).optional(),
    items: z
      .array(
        z.object({
          icon: z.string().describe('lucide-icon name'),
          title: z.string().min(2).max(60),
          description: z.string().min(10).max(200),
          mockVariant: z
            .string()
            .optional()
            .describe('опциональное компактное мок-превью внутри карточки'),
        }),
      )
      .min(2)
      .max(8),
    columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
  }),
});

/* ─── PricingPlans ────────────────────────────────────────────────── */
const PricingPlansSchema = z.object({
  id: z.literal('pricing'),
  component: z.literal('PricingPlans'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(80),
    description: z.string().max(200).optional(),
    plans: z
      .array(
        z.object({
          name: z.string().min(2).max(40),
          price: z.string().min(1).max(20),
          pricePeriod: z.string().max(20).optional(),
          description: z.string().max(120).optional(),
          features: z.array(z.string().min(2).max(100)).min(1).max(10),
          cta: CtaSchema,
          highlighted: z.boolean().default(false),
        }),
      )
      .min(2)
      .max(4),
  }),
});

/* ─── FAQAccordion ────────────────────────────────────────────────── */
const FAQAccordionSchema = z.object({
  id: z.literal('faq'),
  component: z.literal('FAQAccordion'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(80),
    description: z.string().max(200).optional(),
    items: z
      .array(
        z.object({
          question: z.string().min(4).max(140),
          answer: z.string().min(10).max(600),
        }),
      )
      .min(2)
      .max(12),
  }),
});

/* ─── FinalCta (единый вид — градиентный CTAsecondaryMock) ─────────── */
const FinalCtaSchema = z.object({
  id: z.literal('final_cta'),
  component: z.literal('FinalCta'),
  props: z.object({
    title: z.string().min(4).max(120),
    description: z.string().max(280).optional(),
    primaryCta: CtaSchema,
    secondaryCta: CtaSchema.nullable().optional(),
    variant: z
      .enum(['solid', 'gradient'])
      .optional()
      .describe("'solid' (дефолт) — сплошная заливка (старые лендинги); 'gradient' — блок CTAsecondaryMock (ритейл и новые)"),
    visualVariant: z
      .string()
      .optional()
      .describe('интерфейс справа для variant=gradient под тематику лендинга (напр. retail-portfolio-animated, pm-board-1)'),
  }),
});

/* ─── SocialProof (cases) ─────────────────────────────────────────── */
const SocialProofSchema = z.object({
  id: z.literal('social_proof'),
  component: z.literal('SocialProof'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(80).optional(),
    description: z.string().max(200).optional(),
    cases: z
      .array(
        z.object({
          brand: z.string().min(1).max(60),
          brandInitial: z.string().max(4).optional(),
          quote: z.string().min(10).max(400),
          metric: z.string().max(120).optional(),
          href: z.string().optional(),
        }),
      )
      .min(2)
      .max(6),
  }),
});

/* ─── ReviewSlider (слайдер клиентских отзывов) ───────────────────── */
const ReviewSliderSchema = z.object({
  id: z.literal('reviews'),
  component: z.literal('ReviewSlider'),
  props: z.object({
    title: z.string().max(120).optional(),
    subtitle: z.string().max(280).optional(),
    reviews: z
      .array(
        z.object({
          logo: z.string().max(60).optional(),
          quote: z.string().min(10).max(600),
          name: z.string().min(2).max(80),
          role: z.string().min(2).max(120),
          avatar: z.string().optional(),
          avatarInitial: z.string().max(4).optional(),
          avatarBg: z.string().max(30).optional(),
          caseUrl: z.string().optional(),
          caseLabel: z.string().max(40).optional(),
        }),
      )
      .min(1)
      .max(12),
  }),
});

/* ─── ProcessSteps ────────────────────────────────────────────────── */
const ProcessStepsSchema = z.object({
  id: z.literal('process'),
  component: z.literal('ProcessSteps'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(80),
    description: z.string().max(200).optional(),
    steps: z
      .array(
        z.object({
          icon: z.string().optional().describe('lucide-icon name'),
          title: z.string().min(2).max(80),
          description: z.string().min(10).max(280),
        }),
      )
      .min(2)
      .max(6),
  }),
});

/* ─── CtaBanner (inline) ──────────────────────────────────────────── */
const CtaBannerSchema = z.object({
  id: z.literal('cta_banner'),
  component: z.literal('CtaBanner'),
  props: z.object({
    title: z.string().min(4).max(120),
    description: z.string().max(280).optional(),
    primaryCta: CtaSchema,
    secondaryCta: CtaSchema.nullable().optional(),
    /** Градиентный вид (подложка GradientPanel). Opt-in, старые лендинги без него. */
    gradient: z.boolean().optional(),
  }),
});

/* ─── CtaButtons (одиночная/парная кнопка по центру, без карточки) ──── */
const CtaButtonsSchema = z.object({
  id: z.literal('cta_buttons'),
  component: z.literal('CtaButtons'),
  props: z.object({
    primaryCta: CtaSchema,
    secondaryCta: CtaSchema.nullable().optional(),
  }),
});

/* ─── MediaCopy (alternating text+screenshot) ─────────────────────── */
const MediaCopySchema = z.object({
  id: z.literal('media_copy'),
  component: z.literal('MediaCopy'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(120),
    description: z.string().max(400).optional(),
    checklist: z
      .array(
        z.object({
          icon: z.string().optional(),
          text: z.string().min(2).max(180),
        }),
      )
      .max(8)
      .optional(),
    mediaPosition: z.enum(['left', 'right']).optional(),
    mediaPlaceholder: z.string().max(80).optional(),
    mediaVariant: z
      .enum([
        'default',
        'support-board',
        'request-card',
        'kb-public',
        'kb-internal',
        'pm-board',
        'mcp-agent-board',
        'mcp-agent-board-animated',
        'analytics-kpi',
        'integrations-console',
        'modules-matrix',
        'sales-funnel',
        'crm-client-card',
        'omnichannel-inbox',
        'call-overlay',
        'booking-calendar',
        'crm-analytics',
        'doc-template',
        'mobile-crm',
        'hiring-pipeline',
        'candidate-card',
        'onboarding-checklist',
        'org-chart',
        'performance-review',
        'campaign-dashboard',
        'email-sequence',
        'ab-test-results',
        'audience-segments',
        'process-flowchart',
        'approval-chain',
        'sla-tracker',
        'ledger-view',
        'invoice-status',
        'reconciliation-matrix',
        'order-queue',
        'inventory-grid',
        'marketplace-connector',
        'docs-tree',
        'permissions-panel',
        'share-link-card',
        'doc-editor-rich',
        'template-gallery',
        'mobile-doc-reader',
        'production-board',
        'order-flow',
        'production-gantt',
        'production-task-card',
        'production-departments',
        'vks-artifact-flow',
        'meeting-room',
        'meet-list',
        'pm-board-1',
        'kanban-minimal',
        'portfolio-board',
        'approval-board',
      'reports-charts',
      'finance-kb-docs',
      'retail-task-card',
      'retail-project',
      'retail-portfolio-animated',
      'retail-mobile',
      'gantt-chart',
      'cli-terminal-hero',
      'cli-terminal-hero-animated',
      'cli-terminal-final-animated',
      'cli-markdown-export',
      'cli-snapshot-metrics',
      'cli-batch-stats',
      'cli-install',
      ])
      .optional(),
    /**
     * Опциональная ссылка на уникальную SVG-иллюстрацию (генерируется в P8).
     * Когда задана — рендерер использует её вместо mediaVariant.
     */
    customIllustrationId: z.string().optional(),
    primaryCta: CtaSchema.optional(),
    secondaryCta: CtaSchema.nullable().optional(),
  }),
});

/* ─── BenefitsStrip (thin marketing strip under hero) ─────────────── */
const BenefitsStripSchema = z.object({
  id: z.literal('benefits_strip'),
  component: z.literal('BenefitsStrip'),
  props: z.object({
    items: z.array(z.string().min(2).max(60)).min(2).max(6),
  }),
});

/* ─── MetricsSplit (text + 2x2 metrics + optional bullets) ────────── */
const MetricsSplitSchema = z.object({
  id: z.literal('metrics_split'),
  component: z.literal('MetricsSplit'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(120),
    description: z.string().max(300).optional(),
    metrics: z
      .array(
        z.object({
          value: z.string().min(1).max(20),
          label: z.string().min(2).max(80),
          trend: z.enum(['up', 'down', 'flat']).optional(),
        }),
      )
      .min(2)
      .max(6),
    bullets: z
      .array(
        z.object({
          title: z.string().min(2).max(80),
          description: z.string().min(10).max(200),
        }),
      )
      .max(6)
      .optional(),
  }),
});

/* ─── StatStrip ───────────────────────────────────────────────────── */
const StatStripSchema = z.object({
  id: z.literal('stats'),
  component: z.literal('StatStrip'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(120).optional(),
    description: z.string().max(300).optional(),
    stats: z
      .array(
        z.object({
          value: z.string().min(1).max(20),
          label: z.string().min(2).max(80),
          description: z.string().max(160).optional(),
        }),
      )
      .min(2)
      .max(5),
  }),
});

/* ─── PromoBanner (full-bleed accent CTA) ─────────────────────────── */
const PromoBannerSchema = z.object({
  id: z.literal('promo_banner'),
  component: z.literal('PromoBanner'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(140),
    description: z.string().max(300).optional(),
    primaryCta: CtaSchema,
    secondaryCta: CtaSchema.nullable().optional(),
    tone: z.enum(['violet', 'soft']).optional(),
  }),
});

/* ─── ComparisonTable (vs-страницы, migration) ────────────────────── */
const ComparisonTableSchema = z.object({
  id: z.literal('comparison_table'),
  component: z.literal('ComparisonTable'),
  props: z
    .object({
      eyebrow: z.string().max(80).optional(),
      title: z.string().min(4).max(120),
      description: z.string().max(400).optional(),
      /** Название конкурента в шапке правой колонки (grouped-режим ComparisonTableMock) */
      competitor: z.string().min(1).max(60).optional(),
      /** Сноска: источник + дата актуальности (grouped-режим, обязательна по DS) */
      footnote: z.string().max(400).optional(),
      /**
       * Grouped-режим: разделы со строками для ComparisonTableMock (эталон Trello).
       * Раскрытие: десктоп — все, планшет/мобила — первый. a=Кайтен, b=конкурент.
       */
      sections: z
        .array(
          z.object({
            title: z.string().min(2).max(80),
            rows: z
              .array(
                z.object({
                  label: z.string().min(2).max(120),
                  a: z.boolean(),
                  b: z.boolean(),
                }),
              )
              .min(1)
              .max(30),
          }),
        )
        .min(1)
        .max(8)
        .optional(),
      /** Плоский режим (fallback): колонки продуктов */
      columns: z
        .array(
          z.object({
            name: z.string().min(1).max(60),
            badge: z.string().max(40).optional(),
            highlighted: z.boolean().default(false),
          }),
        )
        .min(2)
        .max(4)
        .optional(),
      rows: z
        .array(
          z.object({
            label: z.string().min(2).max(120),
            values: z.array(z.union([z.string().max(80), z.boolean()])).min(2).max(4),
          }),
        )
        .min(3)
        .max(20)
        .optional(),
    })
    .refine((p) => (p.sections && p.sections.length > 0) || (p.columns && p.rows), {
      message: 'ComparisonTable: нужны либо grouped sections, либо плоские columns+rows',
    }),
});

/* ─── TimelineRoadmap (migration plan, product launch, case study) ── */
const TimelineRoadmapSchema = z.object({
  id: z.literal('timeline_roadmap'),
  component: z.literal('TimelineRoadmap'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(120),
    description: z.string().max(400).optional(),
    milestones: z
      .array(
        z.object({
          /** Период вехи. Не нужен, когда timeline нумерованный. */
          period: z.string().min(1).max(40).optional(),
          title: z.string().min(2).max(120),
          description: z.string().max(280).optional(),
          status: z.enum(['done', 'in-progress', 'planned']).optional(),
          bullets: z.array(z.string().min(2).max(160)).max(6).optional(),
        }),
      )
      .min(2)
      .max(8),
    orientation: z.enum(['horizontal', 'vertical']).default('vertical'),
    /**
     * Нумерованный вертикальный timeline: маркер несёт порядковый номер вехи.
     * Для программ и планов, где важен порядок пунктов, а не даты.
     */
    numbered: z.boolean().optional(),
  }),
});

/* ─── BentoGrid (feature overview с visual hierarchy) ─────────────── */
const BentoGridSchema = z.object({
  id: z.literal('bento_grid'),
  component: z.literal('BentoGrid'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(120),
    description: z.string().max(400).optional(),
    cells: z
      .array(
        z.object({
          icon: z.string().describe('lucide-icon name').optional(),
          title: z.string().min(2).max(80),
          description: z.string().min(10).max(280),
          size: z.enum(['small', 'wide', 'tall', 'large']).default('small'),
          accent: z.boolean().default(false),
        }),
      )
      .min(3)
      .max(9),
  }),
});

/* ─── LogoCloud (trust signal) ────────────────────────────────────── */
const LogoCloudSchema = z.object({
  id: z.literal('logo_cloud'),
  component: z.literal('LogoCloud'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(120).optional(),
    description: z.string().max(280).optional(),
    items: z
      .array(
        z.object({
          brand: z.string().min(1).max(60),
          brandInitial: z.string().max(4).optional(),
        }),
      )
      .min(4)
      .max(20),
  }),
});

/* ─── TestimonialQuote (case-study deep-dive, story-led) ──────────── */
const TestimonialQuoteSchema = z.object({
  id: z.literal('testimonial_quote'),
  component: z.literal('TestimonialQuote'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    quote: z.string().min(20).max(600),
    authorName: z.string().min(2).max(80),
    authorRole: z.string().max(120).optional(),
    brandName: z.string().max(60).optional(),
    brandInitial: z.string().max(4).optional(),
    metric: z.string().max(120).optional(),
  }),
});

/* ─── Shared MockVariant enum (для секций с inline mock-визуалами) ── */
export const MockVariantSchema = z.enum([
  'support-board',
  'request-card',
  'kb-public',
  'kb-internal',
  'pm-board',
  'mcp-agent-board',
  'mcp-agent-board-animated',
  'analytics-kpi',
  'integrations-console',
  'modules-matrix',
  'sales-funnel',
  'crm-client-card',
  'omnichannel-inbox',
  'call-overlay',
  'booking-calendar',
  'crm-analytics',
  'doc-template',
  'mobile-crm',
  'hiring-pipeline',
  'candidate-card',
  'onboarding-checklist',
  'org-chart',
  'performance-review',
  'campaign-dashboard',
  'email-sequence',
  'ab-test-results',
  'audience-segments',
  'process-flowchart',
  'approval-chain',
  'sla-tracker',
  'ledger-view',
  'invoice-status',
  'reconciliation-matrix',
  'order-queue',
  'inventory-grid',
  'marketplace-connector',
  'docs-tree',
  'permissions-panel',
  'share-link-card',
  'doc-editor-rich',
  'template-gallery',
  'mobile-doc-reader',
  'production-board',
  'order-flow',
  'production-gantt',
  'production-task-card',
  'production-departments',
  'vks-artifact-flow',
  'meeting-room',
  'meet-list',
  'pm-board-1',
  'kanban-minimal',
  'portfolio-board',
  'approval-board',
'reports-charts',
'finance-kb-docs',
'mini-org-clients',
'mini-org-it',
'mini-org-legal',
'mini-org-ops',
'mini-org-management',
'mini-feat-gantt',
'mini-feat-reports',
'mini-feat-automation',
'mini-feat-ai',
'mini-feat-chat',
'mini-feat-mobile',
'retail-task-card',
'retail-project',
'retail-portfolio-animated',
'retail-mobile',
'retail-doc-instruction',
'retail-doc-standards',
'retail-doc-contracts',
'retail-report-stores',
'retail-report-bottlenecks',
'retail-report-ai',
'gantt-chart',
'cli-terminal-hero',
'cli-terminal-hero-animated',
'cli-terminal-final-animated',
'cli-markdown-export',
'cli-snapshot-metrics',
'cli-batch-stats',
'cli-install',
]);
export type MockVariant = z.infer<typeof MockVariantSchema>;

/* ─── TabbedFeatureSection ────────────────────────────────────────── */
const TabbedFeatureSectionSchema = z.object({
  id: z.literal('tabbed_feature'),
  component: z.literal('TabbedFeatureSection'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(120),
    description: z.string().max(280).optional(),
    tabs: z
      .array(
        z.object({
          id: z.string().min(1).max(40),
          label: z.string().min(2).max(40),
          icon: z.string().optional(),
          eyebrow: z.string().max(80).optional(),
          title: z.string().min(4).max(120),
          description: z.string().max(400).optional(),
          checklist: z
            .array(
              z.object({
                icon: z.string().optional(),
                text: z.string().min(2).max(180),
              }),
            )
            .max(6)
            .optional(),
          primaryCta: CtaSchema.optional(),
          mockVariant: MockVariantSchema,
        }),
      )
      .min(2)
      .max(5),
  }),
});

/* ─── AccordionFeatureSection ─────────────────────────────────────── */
const AccordionFeatureSectionSchema = z.object({
  id: z.literal('accordion_feature'),
  component: z.literal('AccordionFeatureSection'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(120),
    description: z.string().max(280).optional(),
    items: z
      .array(
        z.object({
          id: z.string().min(1).max(40),
          title: z.string().min(4).max(90),
          description: z.string().min(10).max(400),
          icon: z.string().optional(),
          mockVariant: MockVariantSchema,
        }),
      )
      .min(2)
      .max(5),
    primaryCta: CtaSchema.optional(),
    secondaryCta: CtaSchema.optional(),
    mediaPosition: z.enum(['left', 'right']).optional(),
  }),
});

/* ─── ScenarioWalkthroughSection ──────────────────────────────────── */
const ScenarioWalkthroughSectionSchema = z.object({
  id: z.literal('scenario_walkthrough'),
  component: z.literal('ScenarioWalkthroughSection'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(120),
    description: z.string().max(400).optional(),
    protagonist: z.string().max(80).optional(),
    steps: z
      .array(
        z.object({
          time: z.string().min(1).max(40),
          title: z.string().min(4).max(120),
          description: z.string().min(10).max(400),
          icon: z.string().optional(),
          mockVariant: MockVariantSchema,
        }),
      )
      .min(3)
      .max(6),
  }),
});

/* ─── IndustryPickerSection ───────────────────────────────────────── */
const IndustryPickerSectionSchema = z.object({
  id: z.literal('industry_picker'),
  component: z.literal('IndustryPickerSection'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(120),
    description: z.string().max(280).optional(),
    industries: z
      .array(
        z.object({
          id: z.string().min(1).max(40),
          icon: z.string().min(1).max(40),
          name: z.string().min(2).max(60),
          summary: z.string().min(4).max(160),
          scenario: z.string().min(10).max(400),
          keyFeatures: z
            .array(
              z.object({
                icon: z.string().optional(),
                text: z.string().min(2).max(120),
              }),
            )
            .min(2)
            .max(6),
          metric: z
            .object({
              value: z.string().min(1).max(20),
              label: z.string().min(2).max(60),
            })
            .optional(),
        }),
      )
      .min(3)
      .max(8),
  }),
});

/* ─── LandingFooter ───────────────────────────────────────────────── */
const LandingFooterSchema = z.object({
  id: z.literal('footer'),
  component: z.literal('LandingFooter'),
  props: z.object({
    brandName: z.string().min(1).max(60),
    brandTagline: z.string().max(200).optional(),
    columns: z
      .array(
        z.object({
          title: z.string().min(2).max(40),
          links: z
            .array(z.object({ label: z.string().min(1).max(40), href: z.string().min(1) }))
            .min(1)
            .max(8),
        }),
      )
      .min(1)
      .max(5),
    copyright: z.string().max(200).optional(),
  }),
});

const SiteHeaderSchema = z.object({
  id: z.literal('site_header'),
  component: z.literal('SiteHeader'),
  props: z.object({}).default({}),
});

const LandingFooterMockSchema = z.object({
  id: z.literal('kaiten_footer'),
  component: z.literal('LandingFooterMock'),
  props: z.object({}).default({}),
});

/* ─── LegalNote (мелкая юридическая сноска в конце страницы) ───────── */
const LegalNoteSchema = z.object({
  id: z.literal('legal_note'),
  component: z.literal('LegalNote'),
  props: z.object({
    text: z.string().min(10).max(600),
  }),
});

/* ─── PainBubbles (реплики клиентов облачками сообщений) ───────────── */
const PainBubblesSchema = z.object({
  id: z.literal('pain_bubbles'),
  component: z.literal('PainBubbles'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(2).max(80),
    description: z.string().max(200).optional(),
    items: z
      .array(z.object({ text: z.string().min(4).max(200) }))
      .min(3)
      .max(16),
    /**
     * Реплики проявляются по очереди, когда блок попадает в вид, — как приходящие
     * сообщения. Уважает prefers-reduced-motion.
     */
    animate: z.boolean().optional(),
  }),
});

/* ─── SpeakerCard (блок ведущего) ─────────────────────────────────── */
const SpeakerCardSchema = z.object({
  id: z.literal('speaker'),
  component: z.literal('SpeakerCard'),
  props: SpeakerSchema.extend({
    eyebrow: z.string().max(80).optional(),
    title: z.string().max(80).optional(),
    /** 1–2 строки экспертизы: сколько внедрений, чем полезен зрителю. */
    bio: z.string().max(400).optional(),
  }),
});

/* ─── RegistrationCta (финальный блок: заголовок + повтор формы) ───── */
const RegistrationCtaSchema = z.object({
  id: z.literal('registration_cta'),
  component: z.literal('RegistrationCta'),
  props: RegistrationFormSlotSchema.extend({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(120),
    description: z.string().max(280).optional(),
    /** Подпись кнопки отправки. */
    submitLabel: z.string().min(1).max(40),
  }),
});

/* ─── Section union ───────────────────────────────────────────────── */
export const SectionSchema = z.discriminatedUnion('component', [
  HeroSectionSchema,
  FeatureGridSchema,
  SocialProofSchema,
  ReviewSliderSchema,
  ProcessStepsSchema,
  CtaBannerSchema,
  CtaButtonsSchema,
  PricingPlansSchema,
  FAQAccordionSchema,
  FinalCtaSchema,
  LandingFooterSchema,
  MediaCopySchema,
  StatStripSchema,
  PromoBannerSchema,
  BenefitsStripSchema,
  MetricsSplitSchema,
  TabbedFeatureSectionSchema,
  AccordionFeatureSectionSchema,
  ScenarioWalkthroughSectionSchema,
  IndustryPickerSectionSchema,
  ComparisonTableSchema,
  TimelineRoadmapSchema,
  BentoGridSchema,
  LogoCloudSchema,
  TestimonialQuoteSchema,
  LegalNoteSchema,
  PainBubblesSchema,
  SpeakerCardSchema,
  RegistrationCtaSchema,
  SiteHeaderSchema,
  LandingFooterMockSchema,
]);
export type Section = z.infer<typeof SectionSchema>;

/* ─── LandingSpec ─────────────────────────────────────────────────── */
export const LandingSpecMetaSchema = z
  .object({
    sources: z.array(z.string()).default([]),
    generatedAt: z.string().optional(),
    generator: z.string().optional(),
    archetype: z.string().optional(),
    layout: z.string().optional().describe('Slug выбранного layout из wiki/layouts/'),
    tokenEstimate: z.number().optional(),
    promptVersion: z.string().optional(),
    domain: z
      .enum([
        'pm',
        'support',
        'crm',
        'hr',
        'marketing',
        'bpm',
        'finance',
        'ecommerce',
        'docs',
        'manufacturing',
        'cli-community-edition',
        'unknown',
      ])
      .optional()
      .describe(
        'Резолвленный домен продукта (из brief.product/market/audience). Используется ' +
          'illustration-domain-match валидатором для блокировки cross-domain reuse. ' +
          'Если не задан явно — резолвится из brief при ingest. См. wiki/references/domain-mock-matrix.md.',
      ),
    illustrationAllocations: z
      .array(
        z.object({
          sectionIdx: z.number().int().nonnegative(),
          sectionId: z.string(),
          intent: z.string(),
          decision: z.enum(['reuse-mock', 'generate-svg', 'no-op']),
          variant: z.string().optional(),
          illustrationId: z.string().optional(),
        }),
      )
      .optional()
      .describe(
        'Решения phase P8 illustration allocation. Заполняется orchestrator\'ом. ' +
          'Используется для трассировки: какая секция получила какой mock/SVG.',
      ),
  })
  .optional();
export type LandingSpecMeta = z.infer<typeof LandingSpecMetaSchema>;

export const LandingSpecSchema = z.object({
  pageType: z.enum(['saas_landing', 'waitlist_landing', 'enterprise_landing', 'event_landing']),
  goal: z.string(),
  sections: z.array(SectionSchema).min(1),
  seo: z.object({
    title: z.string().min(4).max(70),
    description: z.string().min(10).max(160),
  }),
  illustrationSpecs: z.array(z.string()).default([]).describe('ID связанных IllustrationSpec'),
  meta: LandingSpecMetaSchema,
});

export type LandingSpec = z.infer<typeof LandingSpecSchema>;
