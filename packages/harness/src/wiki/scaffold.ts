/**
 * harness wiki new <type> <slug> — создание новой wiki-страницы с правильным front-matter.
 *
 * Шаблоны для каждого type. Создаёт файл по конвенции из wiki/AGENTS.md:
 *   - audience: wiki/audiences/<slug>.md
 *   - pattern: wiki/patterns/<category>/<slug>.md (если slug содержит "/")
 *   - landing: wiki/landings/<slug>.md
 *   - archetype: wiki/archetypes/<slug>.md
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { serializeFrontmatter } from './frontmatter';

export type WikiPageType = 'audience' | 'pattern' | 'landing' | 'archetype';

const TEMPLATES: Record<WikiPageType, (slug: string, today: string) => { path: string; body: string }> = {
  audience: (slug, today) => ({
    path: `wiki/audiences/${slug}.md`,
    body: `# Audience: ${slug}

## Кто это

_(одна-две строки про роль/контекст)_

## Pains

-

## Jobs to be done

-

## Tone preferences

-

## Banned phrases

- (см. также \`wiki/design-system/voice.md\`)

## Связанные паттерны

- _(добавляются по мере филинга landings)_
`,
  }),
  pattern: (slug, today) => ({
    path: `wiki/patterns/${slug}.md`,
    body: `# Pattern: ${slug.split('/').pop()}

## Когда применять

_(в каком archetype/audience/goal)_

## Шаблон

_(сам шаблон копирайта или структуры)_

## Примеры landings, где использован

-

## Anti-patterns

-
`,
  }),
  landing: (slug, today) => ({
    path: `wiki/landings/${slug}.md`,
    body: `# Landing: ${slug}

## Sections

_(заполняется fileLandingToWiki после успешной генерации)_

## Lessons (LLM-extract)

_(автоматический extract; правится руками)_

## Reviewer notes

_(заполняется через \`harness ingest feedback ${slug} "<note>"\`)_
`,
  }),
  archetype: (slug, today) => ({
    path: `wiki/archetypes/${slug}.md`,
    body: `# Archetype: ${slug}

## Целевые goals

-

## Обязательные секции (порядок)

1. HeroSection
2. ...
N. LandingFooter

## Когда не включать секцию

-

## Длина

- Total sections: ?
- Total prose tokens: ?

## Anti-patterns

-
`,
  }),
};

const DEFAULT_FRONTMATTER = (type: WikiPageType, slug: string, today: string) => ({
  slug,
  type,
  created: today,
  updated: today,
  sources: [] as string[],
  related: [] as string[],
  tags: [type],
  stale: false,
});

export interface ScaffoldResult {
  path: string;
  created: boolean;
  alreadyExists: boolean;
}

export async function scaffoldWikiPage(
  repoRoot: string,
  type: WikiPageType,
  slug: string,
  today: string = formatToday(),
): Promise<ScaffoldResult> {
  const template = TEMPLATES[type];
  if (!template) throw new Error(`Unknown wiki page type: ${type}`);
  const { path: relPath, body } = template(slug, today);
  const absPath = resolve(repoRoot, relPath);

  const existing = await readFile(absPath, 'utf-8').catch(() => null);
  if (existing !== null) {
    return { path: absPath, created: false, alreadyExists: true };
  }

  await mkdir(dirname(absPath), { recursive: true });
  const fm = DEFAULT_FRONTMATTER(type, slug, today);
  const content = serializeFrontmatter(fm, body);
  await writeFile(absPath, content, 'utf-8');
  return { path: absPath, created: true, alreadyExists: false };
}

function formatToday(now: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}
