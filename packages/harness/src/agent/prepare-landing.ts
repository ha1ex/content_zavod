import { readFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { z } from 'zod';
import { BriefSchema, type Brief } from '../schemas/brief';
import { LandingSpecSchema } from '../schemas/landing-spec';
import {
  buildBriefPrompt,
  buildLandingSystemPromptWithMeta,
} from '../prompts/system';

export interface PrepareLandingArtifact {
  kind: 'landing';
  slug: string;
  brief: Brief;
  system: string;
  user: string;
  schema: unknown;
  outputPath: string;
  outputPathRel: string;
  nextCommand: string;
  sources: string[];
  archetype?: string;
  tokenEstimate?: number;
  instructions: string;
}

const INSTRUCTIONS = [
  'You are the host LLM. Read `system` and `user` below.',
  'Produce ONE JSON object that satisfies `schema` (LandingSpec).',
  'Write that JSON (no markdown fences, no commentary) to the file at `outputPath`.',
  'Then run `nextCommand` — it validates the spec and renders TSX. If it returns errors,',
  'patch the JSON in place and re-run `nextCommand` until it passes (repair loop).',
].join(' ');

export async function prepareLanding(opts: {
  root: string;
  briefPath: string;
  slug: string;
}): Promise<PrepareLandingArtifact> {
  const briefAbs = resolve(opts.root, opts.briefPath);
  const briefRaw = await readFile(briefAbs, 'utf-8');
  const brief = BriefSchema.parse(JSON.parse(briefRaw));

  const meta = await buildLandingSystemPromptWithMeta({ brief });

  const schema = z.toJSONSchema(LandingSpecSchema, { reused: 'inline' });

  const user = buildBriefPrompt(JSON.stringify(brief, null, 2));

  const outputPathAbs = resolve(opts.root, 'content', 'landings', `${opts.slug}.json`);
  const outputPathRel = relative(opts.root, outputPathAbs);

  return {
    kind: 'landing',
    slug: opts.slug,
    brief,
    system: meta.system,
    user,
    schema,
    outputPath: outputPathAbs,
    outputPathRel,
    nextCommand: `pnpm -w run harness agent apply landing --slug ${opts.slug} --brief ${opts.briefPath}`,
    sources: meta.sources,
    archetype: meta.archetype,
    tokenEstimate: meta.tokenEstimate,
    instructions: INSTRUCTIONS,
  };
}

export function renderPrepareAsMarkdown(a: PrepareLandingArtifact): string {
  const fence = '```';
  return `# Buffalo agent prompt — landing/${a.slug}

> **Host-agent mode** — нет API-ключей, всё генерирует LLM хоста (Claude Code, Codex, ChatGPT-with-files, …).

## How to use

1. Прочитай разделы **System prompt** и **User prompt** ниже.
2. Сгенерируй ОДИН JSON-объект, который удовлетворяет **Schema (LandingSpec)**.
3. Запиши JSON (без markdown-обрамлений) в файл:
   \`${a.outputPathRel}\`
4. Запусти: \`${a.nextCommand}\`
5. Если ingest вернёт ошибки — поправь JSON на месте и снова запусти команду из шага 4 (repair-loop).

**Output schema id:** \`LandingSpec\`
**Archetype:** \`${a.archetype ?? '(unknown)'}\`
**Token estimate (system):** ${a.tokenEstimate ?? '?'}

---

## System prompt

${fence}
${a.system}
${fence}

## User prompt

${fence}
${a.user}
${fence}

## Brief (source, ${relativeOrAbsolute(a)})

${fence}json
${JSON.stringify(a.brief, null, 2)}
${fence}

## Schema (LandingSpec — JSON Schema)

${fence}json
${JSON.stringify(a.schema, null, 2)}
${fence}

## Sources (wiki pages that shaped this prompt)

${a.sources.map((s) => `- \`${s}\``).join('\n') || '_(none)_'}
`;
}

function relativeOrAbsolute(a: PrepareLandingArtifact): string {
  return a.outputPathRel || a.outputPath;
}
