import { z } from 'zod';

/**
 * LandingSpec — строгий output контракт LLM-генерации.
 * Этап 0: skeleton с минимумом секций (hero + один секционный блок).
 * На этапе 1 наполним реальными компонентами из registry (TailGrids + custom).
 */

export const CtaSchema = z.object({
  label: z.string().min(1).max(40),
  href: z.string().min(1),
});
export type Cta = z.infer<typeof CtaSchema>;

export const AssetRefSchema = z.object({
  type: z.enum(['product_screenshot', 'illustration', 'logo_cloud', 'photo']),
  assetId: z.string(),
});
export type AssetRef = z.infer<typeof AssetRefSchema>;

const HeroSectionSchema = z.object({
  id: z.literal('hero'),
  component: z.literal('HeroSection'),
  props: z.object({
    eyebrow: z.string().max(80).optional(),
    title: z.string().min(4).max(80),
    subtitle: z.string().min(10).max(200),
    primaryCta: CtaSchema,
    secondaryCta: CtaSchema.nullable().optional(),
    visual: AssetRefSchema.nullable().optional(),
  }),
});

const FeatureGridSchema = z.object({
  id: z.literal('features'),
  component: z.literal('FeatureGrid'),
  props: z.object({
    title: z.string().min(4).max(80),
    description: z.string().max(200).optional(),
    items: z
      .array(
        z.object({
          icon: z.string().describe('lucide-icon name'),
          title: z.string().min(2).max(60),
          description: z.string().min(10).max(200),
        }),
      )
      .min(2)
      .max(8),
  }),
});

const FinalCtaSchema = z.object({
  id: z.literal('final_cta'),
  component: z.literal('FinalCta'),
  props: z.object({
    title: z.string().min(4).max(80),
    description: z.string().max(200).optional(),
    primaryCta: CtaSchema,
  }),
});

// discriminated union — нам важно знать какой компонент за какой section'ом
export const SectionSchema = z.discriminatedUnion('component', [
  HeroSectionSchema,
  FeatureGridSchema,
  FinalCtaSchema,
]);
export type Section = z.infer<typeof SectionSchema>;

export const LandingSpecSchema = z.object({
  pageType: z.literal('saas_landing').or(z.literal('waitlist_landing')).or(z.literal('enterprise_landing')),
  goal: z.string(),
  sections: z.array(SectionSchema).min(1),
  seo: z.object({
    title: z.string().min(4).max(70),
    description: z.string().min(10).max(160),
  }),
  illustrationSpecs: z.array(z.string()).default([]).describe('ID связанных IllustrationSpec'),
});

export type LandingSpec = z.infer<typeof LandingSpecSchema>;
