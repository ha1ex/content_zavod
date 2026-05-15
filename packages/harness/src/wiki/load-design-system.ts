/**
 * Загрузка design-system контента из wiki/design-system/*.md для подмешивания в system prompt.
 *
 * На текущем этапе (M2) грузим ВСЕ страницы (без селективности). Селективная сборка по
 * archetype/audience/components — в M4a (см. select-context.ts).
 */

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const DS_PAGES = [
  'colors.md',
  'typography.md',
  'spacing.md',
  'radius.md',
  'grid.md',
  'motion.md',
  'voice.md',
  'components/button.md',
  'components/accordion.md',
  'components/hero.md',
  'components/feature-grid.md',
  'components/pricing.md',
  'components/faq.md',
  'components/final-cta.md',
  'components/footer.md',
];

export interface LoadedDesignSystem {
  body: string;
  sources: string[];
}

/**
 * Читает все wiki/design-system/*.md и склеивает их в один markdown-блок
 * с заголовками-разделителями для LLM.
 *
 * Возвращает body для встраивания + список путей-источников для traceability.
 */
export async function loadDesignSystem(repoRoot: string): Promise<LoadedDesignSystem> {
  const sources: string[] = [];
  const sections: string[] = [];

  for (const rel of DS_PAGES) {
    const path = resolve(repoRoot, 'wiki', 'design-system', rel);
    const content = await readFile(path, 'utf-8').catch(() => null);
    if (!content) continue;
    sources.push(`wiki/design-system/${rel}`);
    sections.push(stripFrontmatter(content).trim());
  }

  return { body: sections.join('\n\n---\n\n'), sources };
}

function stripFrontmatter(content: string): string {
  const lines = content.split(/\r?\n/);
  if (lines[0] !== '---') return content;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') return lines.slice(i + 1).join('\n');
  }
  return content;
}

/**
 * Найти корень репо по pnpm-workspace.yaml (поднимаемся вверх).
 */
export async function findRepoRoot(start: string): Promise<string> {
  let dir = start;
  for (let i = 0; i < 10; i++) {
    try {
      await readFile(resolve(dir, 'pnpm-workspace.yaml'));
      return dir;
    } catch {}
    const parent = resolve(dir, '..');
    if (parent === dir) break;
    dir = parent;
  }
  return start;
}
