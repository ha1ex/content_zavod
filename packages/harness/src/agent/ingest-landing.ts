import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { z } from 'zod';
import { BriefSchema, type Brief } from '../schemas/brief';
import { LandingSpecSchema, type LandingSpec } from '../schemas/landing-spec';
import {
  validateLandingBrand,
  validateLandingBusiness,
  type LandingBrandError,
  type LandingBusinessError,
} from '../validators/index';
import { renderLandingToTSX } from '../render/index';
import { buildLandingSystemPromptWithMeta } from '../prompts/system';
import { appendLog, fileLandingToWiki } from '../wiki/index';

export type IngestStage = 'read' | 'parse' | 'validate' | 'render' | 'file-back' | 'done';

export interface IngestLandingError {
  kind: 'parse' | 'brand' | 'business';
  message: string;
  path?: string;
  code?: string;
}

export interface IngestLandingOptions {
  root: string;
  slug: string;
  briefPath?: string;
  /** Don't write TSX even if spec is valid. */
  noRender?: boolean;
  /** When validator returns issues, don't write spec/TSX. */
  strict?: boolean;
  /** Skip wiki filing back + log entry. */
  noFileBack?: boolean;
  /** Generator label (for spec.meta) — defaults to "host-agent". */
  generator?: string;
}

export interface IngestLandingResult {
  ok: boolean;
  slug: string;
  specPath: string;
  specPathRel: string;
  tsxPath?: string;
  tsxPathRel?: string;
  wikiPath?: string;
  wikiPathRel?: string;
  errors: IngestLandingError[];
  warnings: string[];
  sectionsCount: number;
  archetype?: string;
  sources: string[];
  previewUrl: string;
}

export async function ingestLanding(opts: IngestLandingOptions): Promise<IngestLandingResult> {
  const specAbs = resolve(opts.root, 'content', 'landings', `${opts.slug}.json`);
  const specRel = relative(opts.root, specAbs);
  const errors: IngestLandingError[] = [];
  const warnings: string[] = [];

  let raw: string;
  try {
    raw = await readFile(specAbs, 'utf-8');
  } catch (err) {
    errors.push({
      kind: 'parse',
      message: `spec file not found at ${specRel}. Запиши сгенерированный JSON туда и снова запусти ingest.`,
      path: specRel,
    });
    return {
      ok: false,
      slug: opts.slug,
      specPath: specAbs,
      specPathRel: specRel,
      errors,
      warnings,
      sectionsCount: 0,
      sources: [],
      previewUrl: previewUrlFor(opts.slug),
    };
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw);
  } catch (err) {
    errors.push({
      kind: 'parse',
      message: `spec не валидный JSON: ${(err as Error).message}`,
      path: specRel,
    });
    return {
      ok: false,
      slug: opts.slug,
      specPath: specAbs,
      specPathRel: specRel,
      errors,
      warnings,
      sectionsCount: 0,
      sources: [],
      previewUrl: previewUrlFor(opts.slug),
    };
  }

  const parseResult = LandingSpecSchema.safeParse(parsedJson);
  if (!parseResult.success) {
    for (const issue of parseResult.error.issues) {
      errors.push({
        kind: 'parse',
        message: issue.message,
        path: issue.path.length ? issue.path.join('.') : undefined,
        code: issue.code,
      });
    }
    return {
      ok: false,
      slug: opts.slug,
      specPath: specAbs,
      specPathRel: specRel,
      errors,
      warnings,
      sectionsCount: 0,
      sources: [],
      previewUrl: previewUrlFor(opts.slug),
    };
  }

  const spec: LandingSpec = parseResult.data;

  let brief: Brief | undefined;
  if (opts.briefPath) {
    const briefAbs = resolve(opts.root, opts.briefPath);
    try {
      const briefRaw = await readFile(briefAbs, 'utf-8');
      brief = BriefSchema.parse(JSON.parse(briefRaw));
    } catch (err) {
      warnings.push(
        `не удалось прочитать brief по пути ${opts.briefPath}: ${(err as Error).message}. ` +
          'business-валидатор будет пропущен (нужен brief для проверки CTA alignment).',
      );
    }
  } else {
    warnings.push(
      'brief не передан — business-validator проверит только структурные правила без cta-alignment.',
    );
  }

  const brand = validateLandingBrand(spec);
  if (!brand.ok) {
    for (const e of brand.errors) errors.push(landingBrandToIngestError(e));
  }

  if (brief) {
    const biz = validateLandingBusiness(spec, brief);
    if (!biz.ok) {
      for (const e of biz.errors) errors.push(landingBusinessToIngestError(e));
    }
  }

  const hasErrors = errors.length > 0;

  if (hasErrors && opts.strict) {
    return {
      ok: false,
      slug: opts.slug,
      specPath: specAbs,
      specPathRel: specRel,
      errors,
      warnings,
      sectionsCount: spec.sections.length,
      sources: [],
      previewUrl: previewUrlFor(opts.slug),
    };
  }

  // Meta enrichment via buildLandingSystemPromptWithMeta (selective context).
  let sources: string[] = [];
  let archetype: string = spec.pageType;
  let tokenEstimate: number | undefined;
  if (brief) {
    try {
      const meta = await buildLandingSystemPromptWithMeta({ brief });
      sources = meta.sources;
      if (meta.archetype) archetype = meta.archetype;
      tokenEstimate = meta.tokenEstimate;
    } catch (err) {
      warnings.push(`meta enrichment failed: ${(err as Error).message}`);
    }
  }

  spec.meta = {
    sources,
    generatedAt: new Date().toISOString(),
    generator: opts.generator ?? 'host-agent',
    archetype,
    tokenEstimate,
  };

  // Persist spec (possibly с пересохранёнными meta).
  await writeFile(specAbs, JSON.stringify(spec, null, 2) + '\n', 'utf-8');

  let tsxPath: string | undefined;
  let tsxPathRel: string | undefined;
  if (!opts.noRender) {
    const tsx = renderLandingToTSX(spec, opts.slug);
    tsxPath = resolve(opts.root, 'generated', 'landings', opts.slug, 'page.tsx');
    tsxPathRel = relative(opts.root, tsxPath);
    await mkdir(dirname(tsxPath), { recursive: true });
    await writeFile(tsxPath, tsx, 'utf-8');
  }

  let wikiPath: string | undefined;
  let wikiPathRel: string | undefined;
  if (!opts.noFileBack && brief && opts.briefPath) {
    try {
      wikiPath = await fileLandingToWiki(opts.root, {
        slug: opts.slug,
        brief,
        briefPath: opts.briefPath,
        spec,
        sources,
        archetype,
        durationMs: 0,
        generator: spec.meta?.generator ?? 'host-agent',
        tokenEstimate,
      });
      wikiPathRel = relative(opts.root, wikiPath);
    } catch (err) {
      warnings.push(`filing back failed: ${(err as Error).message}`);
    }
  }

  await appendLog(opts.root, {
    op: 'generate',
    slug: opts.slug,
    status: hasErrors ? 'fail' : 'ok',
    note: `agent-ingest archetype=${archetype} sections=${spec.sections.length} errors=${errors.length}`,
  }).catch(() => {});

  return {
    ok: !hasErrors,
    slug: opts.slug,
    specPath: specAbs,
    specPathRel: specRel,
    tsxPath,
    tsxPathRel,
    wikiPath,
    wikiPathRel,
    errors,
    warnings,
    sectionsCount: spec.sections.length,
    archetype,
    sources,
    previewUrl: previewUrlFor(opts.slug),
  };
}

function previewUrlFor(slug: string): string {
  return `http://localhost:3000/landings/${slug}`;
}

function landingBrandToIngestError(e: LandingBrandError): IngestLandingError {
  return {
    kind: 'brand',
    message: `${e.message} (evidence: "${e.evidence}")`,
    path: e.field,
    code: e.rule,
  };
}

function landingBusinessToIngestError(e: LandingBusinessError): IngestLandingError {
  return {
    kind: 'business',
    message: e.message,
    path: e.where,
    code: e.rule,
  };
}
