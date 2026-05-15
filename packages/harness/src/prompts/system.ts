import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { describeRegistry } from '../registry/index.js';
import { findRepoRoot, loadDesignSystem } from '../wiki/load-design-system.js';
import { selectContext } from '../wiki/select-context.js';
import type { Brief } from '../schemas/brief.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface BuildSystemPromptResult {
  system: string;
  sources: string[];
  archetype?: string;
  tokenEstimate?: number;
}

export interface BuildSystemPromptOptions {
  /**
   * Если передан — собираем контекст селективно по archetype/audience/goal.
   * Если не передан — fallback на полный wiki/design-system/*.md (М2-режим).
   */
  brief?: Brief;
  /** Force `--all`: грузим весь DS даже при наличии brief (для отладки и сравнения). */
  fullContext?: boolean;
}

/**
 * Собирает system prompt для LLM-генерации LandingSpec.
 *
 * Режимы:
 *   1. **Selective (M4a, default при brief).** Грузит только relevant pages из wiki/
 *      по archetype/audience/components. Экономия ~50-70% токенов.
 *   2. **Full (M2 fallback).** Грузит все wiki/design-system/*.md, без archetype-фильтра.
 *      Используется когда brief не передан или fullContext=true.
 *   3. **Legacy fallback.** Если wiki/design-system/ пуст — читает старый
 *      packages/harness/src/prompts/design-system-kaiten.md.
 *
 * Возвращает { system, sources, archetype?, tokenEstimate? } — sources используется
 * для `meta.sources` в LandingSpec и filing back (M4b).
 */
export async function buildLandingSystemPrompt(
  options: BuildSystemPromptOptions = {},
): Promise<BuildSystemPromptResult> {
  const repoRoot = await findRepoRoot(__dirname);

  let dsBody = '';
  let dsSources: string[] = [];
  let archetype: string | undefined;
  let tokenEstimate: number | undefined;

  if (options.brief && !options.fullContext) {
    // M4a: селективный контекст
    const selected = await selectContext(repoRoot, options.brief);
    dsBody = selected.body;
    dsSources = selected.sources;
    archetype = selected.archetype;
    tokenEstimate = selected.tokenEstimate;
  }

  if (!dsBody.trim()) {
    // M2 fallback: полный wiki/design-system/*.md
    const loaded = await loadDesignSystem(repoRoot);
    dsBody = loaded.body;
    dsSources = loaded.sources;
  }

  if (!dsBody.trim()) {
    // Legacy fallback на pre-M2 монолит
    const fallbackPath = resolve(__dirname, 'design-system-kaiten.md');
    const fallback = await readFile(fallbackPath, 'utf-8').catch(() => '');
    if (fallback) {
      dsBody = fallback;
      dsSources = ['packages/harness/src/prompts/design-system-kaiten.md (legacy fallback)'];
    } else {
      dsBody = '(design system not loaded)';
      dsSources = [];
    }
  }

  const system = `You are a senior product copywriter and UI architect operating inside a controlled harness for generating SaaS landing pages.

Your job is NOT to invent layouts or copy from scratch — you ASSEMBLE a landing page from a fixed set of allowed components, using the user's brief, and you OUTPUT a strictly structured JSON LandingSpec that downstream tools will render deterministically.

## Operator rules

- Never invent components that are not in the registry below.
- Never invent props that are not declared for a component.
- Never return prose, explanations, markdown or commentary — only the JSON object that matches the LandingSpec schema.
- Honor all length and structural constraints (title <= 80 chars, subtitle 10..200, etc.).
- One primary CTA per page that matches the brief's goal.
- Hero section must be the first section.
- Match the brand voice from \`wiki/design-system/voice.md\` (see below). Banned hype words are listed there — never use them.

## Component registry (allowed components only)

\`\`\`json
${describeRegistry()}
\`\`\`

## Kaiten V01 design system + archetype rules

${dsBody}

## Output

Return ONE JSON object that strictly matches the LandingSpec schema provided by the runtime. No text before or after.`;

  return { system, sources: dsSources, archetype, tokenEstimate };
}

export function buildBriefPrompt(briefJson: string): string {
  return `Brief from product team:

\`\`\`json
${briefJson}
\`\`\`

Generate the LandingSpec now.`;
}
