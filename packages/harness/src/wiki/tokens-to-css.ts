/**
 * Генерация packages/ui/src/tokens.css из design-system/kaiten-v01/tokens.json.
 * Output идемпотентен — повторный запуск даёт байт-идентичный результат.
 */

import type { DesignTokens } from './tokens-types';
import { resolveColorRef } from './tokens-types';

const HEADER = `/**
 * Kaiten V01 design system tokens
 *
 * AUTO-GENERATED — do not edit by hand.
 * Source: design-system/kaiten-v01/tokens.json
 * Regenerate: pnpm harness -- wiki sync
 *
 * Core style: calm B2B/SaaS interfaces, white/light-gray surfaces, real product
 * UI screenshots, restrained typography, violet (#7d4ccf) as single primary
 * interaction color. Product-led composition.
 */
`;

export function tokensToCss(tokens: DesignTokens): string {
  const sections: string[] = [];

  // Neutral scale
  const neutral = Object.entries(tokens.colors.neutral)
    .map(([k, v]) => `  --color-neutral-${k}: ${v};`)
    .join('\n');
  sections.push(`  /* ─── Neutral scale ───────────────────────────────────────────────── */\n${neutral}`);

  // Accent colors
  const accent = Object.entries(tokens.colors.accent)
    .map(([k, v]) => `  --color-${k}: ${v};`)
    .join('\n');
  sections.push(`  /* ─── Accent colors (100 = brand, 12 = soft tint) ─────────────────── */\n${accent}`);

  // Semantic aliases
  const semantic = Object.entries(tokens.colors.semantic)
    .map(([k, v]) => {
      const resolved = resolveCssRef(v, tokens);
      return `  --color-${k}: ${resolved};`;
    })
    .join('\n');
  sections.push(`  /* ─── Semantic aliases (используйте их в компонентах) ─────────────── */\n${semantic}`);

  // Typography
  const fontFamilies = Object.entries(tokens.typography.fontFamilies)
    .map(([k, v]) => `  --font-${k}: ${v};`)
    .join('\n');
  const scales = Object.entries(tokens.typography.scales)
    .flatMap(([k, s]) => [`  --text-${k}: ${s.size}px;`, `  --text-${k}--line-height: ${s.lineHeight}px;`])
    .join('\n');
  sections.push(`  /* ─── Typography ──────────────────────────────────────────────────── */\n${fontFamilies}\n\n${scales}`);

  // Spacing
  const spacing = Object.entries(tokens.spacing)
    .map(([k, v]) => `  --spacing-${k}: ${v}px;`)
    .join('\n');
  sections.push(`  /* ─── Spacing (4px scale) ─────────────────────────────────────────── */\n${spacing}`);

  // Radius
  const radius = Object.entries(tokens.radius)
    .map(([k, v]) => `  --radius-${k}: ${v}px;`)
    .join('\n');
  sections.push(`  /* ─── Radius ──────────────────────────────────────────────────────── */\n${radius}`);

  // Grid (только kaiten container в CSS, остальное — в wiki)
  const grid = Object.entries(tokens.grid.container)
    .map(([k, v]) => `  --container-${k}: ${v}px;`)
    .join('\n');
  sections.push(`  /* ─── Grid ────────────────────────────────────────────────────────── */\n${grid}`);

  // Motion
  const motionDur = Object.entries(tokens.motion.duration)
    .map(([k, v]) => `  --duration-${k}: ${v};`)
    .join('\n');
  const motionEase = Object.entries(tokens.motion.ease)
    .map(([k, v]) => `  --ease-${k}: ${v};`)
    .join('\n');
  sections.push(`  /* ─── Motion ──────────────────────────────────────────────────────── */\n${motionDur}\n${motionEase}`);

  // Button tokens
  const buttonLines: string[] = [`  --button-radius: ${tokens.button.radius}px;`];
  for (const [k, v] of Object.entries(tokens.button.fill)) {
    buttonLines.push(`  --button-fill-${camelToKebab(k)}: ${resolveCssRef(v, tokens)};`);
  }
  for (const [k, v] of Object.entries(tokens.button.outline)) {
    buttonLines.push(`  --button-outline-${camelToKebab(k)}: ${resolveCssRef(v, tokens)};`);
  }
  for (const [k, v] of Object.entries(tokens.button.focus)) {
    buttonLines.push(`  --button-focus-${camelToKebab(k)}: ${v};`);
  }
  sections.push(`  /* ─── Button tokens ───────────────────────────────────────────────── */\n${buttonLines.join('\n')}`);

  return `${HEADER}\n@theme {\n${sections.join('\n\n')}\n}\n`;
}

function resolveCssRef(value: string, tokens: DesignTokens): string {
  const match = value.match(/^\{([\w-]+)\.([\w-]+)\}$/);
  if (!match) return value;
  const [, group, key] = match;
  if (group === 'neutral') return `var(--color-neutral-${key})`;
  if (group === 'accent') return `var(--color-${key})`;
  if (group === 'semantic') return `var(--color-${key})`;
  return resolveColorRef(value, tokens);
}

function camelToKebab(s: string): string {
  return s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}
