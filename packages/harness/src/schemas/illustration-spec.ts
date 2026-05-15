import { z } from 'zod';

/**
 * IllustrationSpec — композиция SVG hero-сцены.
 * LLM на этапе 3 получает skill-инструкцию из .context/attachments/pasted_text_2026-05-15_15-34-57.txt
 * и обязан вернуть TSX-компонент, удовлетворяющий чек-листу (см. AST-валидатор).
 */

const DeviceSchema = z.object({
  type: z.enum(['laptop', 'phone', 'tablet']),
  uiHint: z
    .string()
    .max(500)
    .describe('Что нарисовать внутри экрана: dashboard / chart / form / table / etc.'),
  position: z
    .object({
      x: z.number(),
      y: z.number(),
      scale: z.number().min(0.3).max(2).default(1),
    })
    .default({ x: 0, y: 0, scale: 1 }),
});

const DecorationSchema = z.object({
  type: z.enum(['plant', 'blob', 'sparkle', 'logo']),
  position: z.object({ x: z.number(), y: z.number() }),
});

export const IllustrationSpecSchema = z.object({
  id: z.string(),
  scene: z.enum(['device_showcase', 'isometric_dashboard', 'metaphor', 'data_viz']),
  palette: z.object({
    accent: z
      .string()
      .regex(/^#[0-9a-fA-F]{6}$/)
      .describe('Главный brand-цвет HEX'),
    glowDark: z
      .string()
      .regex(/^#[0-9a-fA-F]{6}$/)
      .default('#10B981'),
    glowLight: z
      .string()
      .regex(/^#[0-9a-fA-F]{6}$/)
      .default('#FED7AA'),
  }),
  devices: z.array(DeviceSchema).max(4).default([]),
  decorations: z.array(DecorationSchema).max(6).default([]),
  glow: z.object({
    enabled: z.boolean().default(true),
    centerX: z.number().default(1500),
    centerY: z.number().default(380),
    radius: z.number().default(580),
  }),
  viewBox: z
    .object({
      x: z.number().default(0),
      y: z.number().default(-220),
      width: z.number().default(2150),
      height: z.number().default(1420),
    })
    .default({ x: 0, y: -220, width: 2150, height: 1420 }),
});

export type IllustrationSpec = z.infer<typeof IllustrationSpecSchema>;
