/**
 * Генерация `<!-- gen:tokens -->` блоков в wiki/design-system/*.md.
 * Каждая страница получает свой срез значений в виде markdown-таблицы.
 */

import type { DesignTokens } from './tokens-types';
import { resolveColorRef } from './tokens-types';

export interface GenBlockSpec {
  page: string;
  tag: string;
  content: string;
}

export function buildGenBlocks(tokens: DesignTokens): GenBlockSpec[] {
  return [
    {
      page: 'colors.md',
      tag: 'tokens',
      content: buildColorsBlock(tokens),
    },
    {
      page: 'typography.md',
      tag: 'tokens',
      content: buildTypographyBlock(tokens),
    },
    {
      page: 'spacing.md',
      tag: 'tokens',
      content: buildSpacingBlock(tokens),
    },
    {
      page: 'radius.md',
      tag: 'tokens',
      content: buildRadiusBlock(tokens),
    },
    {
      page: 'grid.md',
      tag: 'tokens',
      content: buildGridBlock(tokens),
    },
    {
      page: 'motion.md',
      tag: 'tokens',
      content: buildMotionBlock(tokens),
    },
    {
      page: 'components/button.md',
      tag: 'tokens',
      content: buildButtonBlock(tokens),
    },
  ];
}

function buildColorsBlock(tokens: DesignTokens): string {
  const lines: string[] = ['### Neutral scale', '', '| Token | Value | CSS var |', '|---|---|---|'];
  for (const [k, v] of Object.entries(tokens.colors.neutral)) {
    lines.push(`| \`neutral.${k}\` | \`${v}\` | \`--color-neutral-${k}\` |`);
  }
  lines.push('', '### Accent colors', '', '| Token | Value | CSS var |', '|---|---|---|');
  for (const [k, v] of Object.entries(tokens.colors.accent)) {
    lines.push(`| \`accent.${k}\` | \`${v}\` | \`--color-${k}\` |`);
  }
  lines.push('', '### Semantic aliases', '', '| Token | Resolves to | CSS var |', '|---|---|---|');
  for (const [k, v] of Object.entries(tokens.colors.semantic)) {
    const resolved = resolveColorRef(v, tokens);
    lines.push(`| \`semantic.${k}\` | \`${resolved}\` (${v}) | \`--color-${k}\` |`);
  }
  return lines.join('\n');
}

function buildTypographyBlock(tokens: DesignTokens): string {
  const lines: string[] = [
    '### Font families',
    '',
    '| Family | Stack |',
    '|---|---|',
    ...Object.entries(tokens.typography.fontFamilies).map(([k, v]) => `| \`${k}\` | \`${v}\` |`),
    '',
    '### Type scale',
    '',
    '| Token | Size | Line height | CSS var |',
    '|---|---|---|---|',
    ...Object.entries(tokens.typography.scales).map(
      ([k, s]) => `| \`${k}\` | ${s.size}px | ${s.lineHeight}px | \`--text-${k}\` |`,
    ),
    '',
    `### Weights`,
    '',
    tokens.typography.weights.map((w) => `\`${w}\``).join(', '),
  ];
  return lines.join('\n');
}

function buildSpacingBlock(tokens: DesignTokens): string {
  const lines: string[] = [
    '| Token | Px | CSS var |',
    '|---|---|---|',
    ...Object.entries(tokens.spacing).map(
      ([k, v]) => `| \`spacing.${k}\` | ${v}px | \`--spacing-${k}\` |`,
    ),
  ];
  return lines.join('\n');
}

function buildRadiusBlock(tokens: DesignTokens): string {
  const lines: string[] = [
    '| Token | Value | CSS var |',
    '|---|---|---|',
    ...Object.entries(tokens.radius).map(
      ([k, v]) => `| \`radius.${k}\` | ${v === 9999 ? '9999px (full)' : `${v}px`} | \`--radius-${k}\` |`,
    ),
  ];
  return lines.join('\n');
}

function buildGridBlock(tokens: DesignTokens): string {
  const grid = tokens.grid;
  const lines: string[] = [
    '### Containers',
    '',
    '| Key | Width |',
    '|---|---|',
    ...Object.entries(grid.container).map(([k, v]) => `| \`${k}\` | ${v}px |`),
    '',
    '### Desktop (1920px artboard)',
    '',
    `- Container: **${grid.desktop.container}px** · ${grid.desktop.columns} columns · column **${grid.desktop.column}px** · gutter **${grid.desktop.gutter}px** · outer margin **${grid.desktop.outerMargin}px**`,
    '',
    '### Tablet (768px artboard)',
    '',
    `- ${grid.tablet.columns} columns · column **${grid.tablet.column}px** · gutter **${grid.tablet.gutter}px** · side margin **${grid.tablet.margin}px**`,
    '',
    '### Mobile (360px artboard)',
    '',
    `- ${grid.mobile.columns} columns · column **${grid.mobile.column}px** · gutter **${grid.mobile.gutter}px** · side margin **${grid.mobile.margin}px**`,
  ];
  return lines.join('\n');
}

function buildMotionBlock(tokens: DesignTokens): string {
  const lines: string[] = [
    '### Durations',
    '',
    '| Token | Value | CSS var |',
    '|---|---|---|',
    ...Object.entries(tokens.motion.duration).map(([k, v]) => `| \`${k}\` | \`${v}\` | \`--duration-${k}\` |`),
    '',
    '### Easings',
    '',
    '| Token | Value | CSS var |',
    '|---|---|---|',
    ...Object.entries(tokens.motion.ease).map(([k, v]) => `| \`${k}\` | \`${v}\` | \`--ease-${k}\` |`),
  ];
  return lines.join('\n');
}

function buildButtonBlock(tokens: DesignTokens): string {
  const b = tokens.button;
  const lines: string[] = [
    `### Base`,
    '',
    `- Radius: **${b.radius}px**`,
    `- Letter spacing: **${b.letterSpacing}**`,
    b.fontFamilyOverride ? `- Font family override: **${b.fontFamilyOverride}**` : '',
    b.fontWeight ? `- Font weight: **${b.fontWeight}**` : '',
    '',
    '### Sizes',
    '',
    '| Size | Height | Padding (y/x) | Icon gap | Icon size | Label scale |',
    '|---|---|---|---|---|---|',
    ...Object.entries(b.sizes).map(
      ([k, s]) =>
        `| \`${k}\` | ${s.height}px | ${s.paddingY}px / ${s.paddingX}px | ${s.iconGap}px | ${s.iconSize}px | \`text-${s.label}\` |`,
    ),
    '',
    '### Fill variant',
    '',
    '| Property | Value |',
    '|---|---|',
    ...Object.entries(b.fill).map(([k, v]) => `| \`${k}\` | \`${resolveColorRef(v, tokens)}\` |`),
    '',
    '### Outline variant',
    '',
    '| Property | Value |',
    '|---|---|',
    ...Object.entries(b.outline).map(([k, v]) => `| \`${k}\` | \`${resolveColorRef(v, tokens)}\` |`),
    '',
    '### Focus rings',
    '',
    '| Token | Value |',
    '|---|---|',
    ...Object.entries(b.focus).map(([k, v]) => `| \`${k}\` | \`${v}\` |`),
  ];
  return lines.filter((l) => l !== '').join('\n').replace(/\n+/g, (m) => (m.length > 2 ? '\n\n' : m));
}
