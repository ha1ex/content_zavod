/**
 * Селективная сборка контекста для system-prompt.
 *
 * Вместо загрузки всех wiki/design-system/*.md (15 файлов, ~1500 строк) —
 * выбираем только релевантные по архетипу/aудитории/целям из brief.
 *
 * Ожидаемая экономия: ~50-70% токенов для не-saas archetype'ов.
 *
 * Также грузит:
 *   - wiki/archetypes/<archetype>.md (правила структуры лендинга)
 *   - wiki/audiences/<matched>.md (если в brief.audience есть совпадения)
 *   - packages/harness/src/skills/conversion-landing.md (если файл существует —
 *     появится после merge ветки ha1ex/landing-skill); селекция секций — на будущее.
 */

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { Brief } from '../schemas/brief';

export interface SelectedContext {
  body: string;
  sources: string[];
  archetype: 'saas_landing' | 'waitlist_landing' | 'enterprise_landing' | 'event_landing';
  tokenEstimate: number;
}

// Базовый DS (всегда грузим)
const BASE_DS = ['voice.md', 'colors.md', 'typography.md', 'spacing.md'];

// Components по archetype: какие из wiki/design-system/components/* грузить.
const COMPONENTS_BY_ARCHETYPE: Record<string, string[]> = {
  saas_landing: ['hero.md', 'feature-grid.md', 'pricing.md', 'faq.md', 'accordion.md', 'final-cta.md', 'footer.md', 'button.md'],
  waitlist_landing: ['hero.md', 'feature-grid.md', 'faq.md', 'accordion.md', 'final-cta.md', 'footer.md', 'button.md'],
  enterprise_landing: ['hero.md', 'feature-grid.md', 'pricing.md', 'faq.md', 'accordion.md', 'final-cta.md', 'footer.md', 'button.md'],
  // Лендинг мероприятия: без прайсинга — целевое действие это форма регистрации.
  event_landing: ['hero.md', 'feature-grid.md', 'faq.md', 'accordion.md', 'final-cta.md', 'footer.md', 'button.md'],
};

// Дополнительные DS-разделы по archetype.
const EXTRA_DS_BY_ARCHETYPE: Record<string, string[]> = {
  saas_landing: ['radius.md', 'motion.md', 'grid.md'],
  waitlist_landing: ['radius.md'],
  enterprise_landing: ['radius.md', 'motion.md', 'grid.md'],
  event_landing: ['radius.md', 'motion.md', 'grid.md'],
};

export async function selectContext(repoRoot: string, brief: Brief): Promise<SelectedContext> {
  const archetype = archetypeFromBrief(brief);
  const sections: { rel: string; content: string }[] = [];
  const sources: string[] = [];

  // 1. Базовый DS
  for (const f of BASE_DS) {
    const c = await readWikiPage(repoRoot, `design-system/${f}`);
    if (c) {
      sections.push({ rel: `wiki/design-system/${f}`, content: c });
      sources.push(`wiki/design-system/${f}`);
    }
  }

  // 2. Extra DS по archetype
  for (const f of EXTRA_DS_BY_ARCHETYPE[archetype] ?? []) {
    const c = await readWikiPage(repoRoot, `design-system/${f}`);
    if (c) {
      sections.push({ rel: `wiki/design-system/${f}`, content: c });
      sources.push(`wiki/design-system/${f}`);
    }
  }

  // 3. Components по archetype
  for (const f of COMPONENTS_BY_ARCHETYPE[archetype] ?? []) {
    const c = await readWikiPage(repoRoot, `design-system/components/${f}`);
    if (c) {
      sections.push({ rel: `wiki/design-system/components/${f}`, content: c });
      sources.push(`wiki/design-system/components/${f}`);
    }
  }

  // 4. Archetype description
  const archetypeFile = `archetypes/${archetype}.md`;
  const archetypeContent = await readWikiPage(repoRoot, archetypeFile);
  if (archetypeContent) {
    sections.push({ rel: `wiki/${archetypeFile}`, content: archetypeContent });
    sources.push(`wiki/${archetypeFile}`);
  }

  // 5. Audience profiles (если совпадение)
  for (const audienceRole of brief.audience) {
    const slug = audienceToSlug(audienceRole);
    const c = await readWikiPage(repoRoot, `audiences/${slug}.md`);
    if (c) {
      sections.push({ rel: `wiki/audiences/${slug}.md`, content: c });
      sources.push(`wiki/audiences/${slug}.md`);
    }
  }

  // 6. Conversion-landing skill (после merge ha1ex/landing-skill).
  // Сейчас файл может не существовать — пытаемся и пропускаем при FileNotFound.
  const skillPath = resolve(repoRoot, 'packages', 'harness', 'src', 'skills', 'conversion-landing.md');
  const skillContent = await readFile(skillPath, 'utf-8').catch(() => null);
  if (skillContent) {
    sections.push({ rel: 'packages/harness/src/skills/conversion-landing.md', content: stripFrontmatter(skillContent) });
    sources.push('packages/harness/src/skills/conversion-landing.md');
  }

  const body = sections.map((s) => `<!-- source: ${s.rel} -->\n${stripFrontmatter(s.content).trim()}`).join('\n\n---\n\n');

  // Грубая оценка токенов: ~4 char/token для смешанного RU/EN markdown.
  const tokenEstimate = Math.ceil(body.length / 4);

  return { body, sources, archetype, tokenEstimate };
}

async function readWikiPage(repoRoot: string, relPath: string): Promise<string | null> {
  return readFile(resolve(repoRoot, 'wiki', relPath), 'utf-8').catch(() => null);
}

function archetypeFromBrief(
  brief: Brief,
): 'saas_landing' | 'waitlist_landing' | 'enterprise_landing' | 'event_landing' {
  if (brief.pageArchetype === 'waitlist') return 'waitlist_landing';
  if (brief.pageArchetype === 'enterprise') return 'enterprise_landing';
  if (brief.pageArchetype === 'event') return 'event_landing';
  return 'saas_landing';
}

function audienceToSlug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
}

function stripFrontmatter(content: string): string {
  const lines = content.split(/\r?\n/);
  if (lines[0] !== '---') return content;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') return lines.slice(i + 1).join('\n');
  }
  return content;
}
