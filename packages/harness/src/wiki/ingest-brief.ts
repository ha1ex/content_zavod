/**
 * harness ingest brief <path> — обработка нового brief через LLM.
 *
 * Что делает:
 *   1. Читает brief.json и валидирует через BriefSchema.
 *   2. Если есть LLM-кредиталы — вызывает модель для классификации:
 *      - archetype (saas_landing | waitlist_landing | enterprise_landing | event_landing)
 *      - audience-роли (mapping на существующие или новые wiki/audiences/*)
 *      - анализ pain/promise/proof points в формате wiki-знаний.
 *   3. Если новая audience — создаёт wiki/audiences/<slug>.md.
 *   4. Пишет entry в wiki/log.md.
 *
 * Без LLM (--no-llm) — детерминированный fallback:
 *   - Создаёт scaffold аудитории по brief.audience[0] (slug = kebab из строки).
 *   - log entry с пометкой "no-llm".
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { generateObject } from 'ai';
import { z } from 'zod';
import type { Brief } from '../schemas/brief';
import { getModel, hasLLMCredentials } from '../providers/index';
import { serializeFrontmatter } from './frontmatter';
import { appendLog } from './log';

const AudienceClassificationSchema = z.object({
  audiences: z
    .array(
      z.object({
        slug: z
          .string()
          .min(2)
          .max(60)
          .describe('kebab-case audience slug (e.g. "pm-saas", "marketing-lead")'),
        role: z.string().min(2).max(100),
        pains: z.array(z.string()).min(1).max(6),
        jobs: z.array(z.string()).min(1).max(6),
        tonePreferences: z.array(z.string()).max(5),
      }),
    )
    .min(1)
    .max(3),
  archetypeHint: z.enum(['saas_landing', 'waitlist_landing', 'enterprise_landing', 'event_landing']),
  patternCandidates: z
    .array(z.string())
    .describe('Похожие паттерны из wiki/patterns/*, если применимо')
    .max(5),
});

export type AudienceClassification = z.infer<typeof AudienceClassificationSchema>;

export interface IngestBriefOptions {
  useLLM?: boolean;
}

export interface IngestBriefResult {
  archetypeHint: string;
  audiencesCreated: string[];
  audiencesUpdated: string[];
  patternCandidates: string[];
  llmUsed: boolean;
}

export async function ingestBrief(
  repoRoot: string,
  brief: Brief,
  briefPath: string,
  options: IngestBriefOptions = {},
): Promise<IngestBriefResult> {
  const wantLLM = options.useLLM !== false;
  const canLLM = hasLLMCredentials();
  const useLLM = wantLLM && canLLM;

  let classification: AudienceClassification;
  if (useLLM) {
    classification = await classifyBriefWithLLM(brief);
  } else {
    classification = fallbackClassification(brief);
  }

  const created: string[] = [];
  const updated: string[] = [];

  for (const aud of classification.audiences) {
    const path = resolve(repoRoot, 'wiki', 'audiences', `${aud.slug}.md`);
    const existing = await readFile(path, 'utf-8').catch(() => null);
    const today = formatToday();
    const body = renderAudienceBody(aud, brief, briefPath);
    if (existing === null) {
      const fm = {
        slug: aud.slug,
        type: 'audience',
        created: today,
        updated: today,
        sources: [briefPath],
        related: [`wiki/archetypes/${classification.archetypeHint}.md`],
        tags: ['audience', classification.archetypeHint],
        stale: false,
      };
      const content = serializeFrontmatter(fm, body);
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, content, 'utf-8');
      created.push(`wiki/audiences/${aud.slug}.md`);
    } else {
      updated.push(`wiki/audiences/${aud.slug}.md`);
    }
  }

  await appendLog(repoRoot, {
    op: 'ingest',
    slug: undefined,
    status: 'ok',
    note: `brief ${briefPath} → archetype=${classification.archetypeHint}; audiences: ${[...created, ...updated]
      .map((p) => p.replace('wiki/audiences/', '').replace('.md', ''))
      .join(', ')}${useLLM ? '' : ' (no-llm fallback)'}`,
  });

  return {
    archetypeHint: classification.archetypeHint,
    audiencesCreated: created,
    audiencesUpdated: updated,
    patternCandidates: classification.patternCandidates,
    llmUsed: useLLM,
  };
}

async function classifyBriefWithLLM(brief: Brief): Promise<AudienceClassification> {
  const system = `You are an analyst classifying SaaS landing briefs into reusable wiki knowledge.

Read the brief and:
1. Extract 1-3 distinct audience profiles (role, top pains, top jobs-to-be-done, tone preferences).
2. Pick the archetype hint: saas_landing | waitlist_landing | enterprise_landing | event_landing.
   event_landing — a landing for an event (webinar, conference, meetup): the target action is
   filling in a registration form, not clicking through to a product.
3. Suggest patterns from wiki/patterns/* that might be reusable (use kebab-case slugs).

Audience slugs: kebab-case, short, generic (e.g. "pm-saas", "marketing-lead", "founder-bootstrap").
Tone preferences: 2-4 keywords (e.g. "outcome-focused", "concrete-numbers", "no-jargon").

Output a JSON object matching the schema. No prose.`;

  const result = await generateObject({
    model: getModel(),
    schema: AudienceClassificationSchema,
    system,
    prompt: `Brief:\n\n\`\`\`json\n${JSON.stringify(brief, null, 2)}\n\`\`\`\n\nClassify now.`,
    maxRetries: 2,
  });
  return result.object;
}

function fallbackClassification(brief: Brief): AudienceClassification {
  const firstAudience = brief.audience[0] ?? 'general';
  const slug = toKebab(firstAudience);
  return {
    audiences: [
      {
        slug,
        role: firstAudience,
        pains: [brief.mainPain],
        jobs: [brief.primaryGoal],
        tonePreferences: brief.tone ? [brief.tone] : [],
      },
    ],
    archetypeHint: archetypeFromBrief(brief),
    patternCandidates: [],
  };
}

function renderAudienceBody(aud: AudienceClassification['audiences'][number], brief: Brief, briefPath: string): string {
  return `# Audience: ${aud.role}

## Кто это

${aud.role}. Извлечено из brief \`${briefPath}\`.

## Pains

${aud.pains.map((p) => `- ${p}`).join('\n')}

## Jobs to be done

${aud.jobs.map((j) => `- ${j}`).join('\n')}

## Tone preferences

${aud.tonePreferences.length ? aud.tonePreferences.map((t) => `- ${t}`).join('\n') : '- (см. \`wiki/design-system/voice.md\`)'}

## Промпт-маркер при генерации

Когда brief совпадает с этой audience, грузите эту страницу в контекст промпта (см. \`packages/harness/src/wiki/select-context.ts\` для селекции).

## История

- ${formatToday()} ingest из \`${briefPath}\` (primary goal: \`${brief.primaryGoal}\`).
`;
}

function archetypeFromBrief(
  brief: Brief,
): 'saas_landing' | 'waitlist_landing' | 'enterprise_landing' | 'event_landing' {
  if (brief.pageArchetype === 'waitlist') return 'waitlist_landing';
  if (brief.pageArchetype === 'enterprise') return 'enterprise_landing';
  if (brief.pageArchetype === 'event') return 'event_landing';
  return 'saas_landing';
}

function toKebab(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
}

function formatToday(now: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}
