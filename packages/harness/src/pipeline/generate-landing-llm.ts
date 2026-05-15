import { generateObject } from 'ai';
import type { Brief } from '../schemas/brief.js';
import { LandingSpecSchema, type LandingSpec } from '../schemas/landing-spec.js';
import { getModel, hasLLMCredentials, resolveProvider } from '../providers/index.js';
import { buildBriefPrompt, buildLandingSystemPrompt } from '../prompts/system.js';
import {
  validateLandingBrand,
  type LandingBrandError,
} from '../validators/landing-brand.js';
import {
  validateLandingBusiness,
  type LandingBusinessError,
} from '../validators/landing-business.js';
import { runWithRepair, type RepairResult } from './repair.js';

export type LandingValidationError =
  | ({ kind: 'brand' } & LandingBrandError)
  | ({ kind: 'business' } & LandingBusinessError);

/**
 * Этап 2: LLM-генерация LandingSpec по brief'у.
 *
 * AI SDK 6 generateObject({ schema }) → structured output, validated через zod.
 * Если zod parse не проходит — generateObject выбрасывает NoObjectGeneratedError,
 * который пайплайн ловит и передаёт в repair loop (этап 4).
 */
export interface LLMGenerationOptions {
  /** Hard timeout per attempt (ms). */
  timeoutMs?: number;
  /** Max retry attempts inside AI SDK. */
  maxRetries?: number;
}

export async function generateLandingSpecWithLLM(
  brief: Brief,
  options: LLMGenerationOptions & { feedback?: string } = {},
): Promise<LandingSpec> {
  if (!hasLLMCredentials()) {
    throw new Error(
      `No LLM credentials for provider "${resolveProvider()}". ` +
        `Запусти \`vercel env pull\` для OIDC-токена (Gateway), ` +
        `либо заполни .env.local по .env.example. Или используй --no-llm.`,
    );
  }

  const system = await buildLandingSystemPrompt();
  const briefBlock = buildBriefPrompt(JSON.stringify(brief, null, 2));
  const prompt = options.feedback
    ? `${briefBlock}\n\n## Previous attempt validation errors\n${options.feedback}\n\nFix ONLY these issues. Preserve copy и структуру там, где она прошла. Re-emit полный LandingSpec JSON.`
    : briefBlock;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 90_000);

  try {
    const result = await generateObject({
      model: getModel(),
      schema: LandingSpecSchema,
      system,
      prompt,
      maxRetries: options.maxRetries ?? 2,
      abortSignal: controller.signal,
    });
    return result.object;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Этап 4: LLM-генерация LandingSpec с repair-loop'ом.
 *
 * Каждый attempt:
 *   1. generateObject (zod валидация внутри AI SDK)
 *   2. brand validator (hype-слова, штампы)
 *   3. business validator (hero-first, footer-last, single-hero, href-shape, cta-aligned-with-brief)
 * Если что-то не ок — собираем структурированный feedback и идём на следующую попытку.
 */
export async function generateLandingSpecWithRepair(
  brief: Brief,
  options: LLMGenerationOptions & {
    maxAttempts?: number;
    log?: (line: string) => void;
  } = {},
): Promise<RepairResult<LandingSpec, LandingValidationError>> {
  return runWithRepair<LandingSpec, LandingValidationError>({
    maxAttempts: options.maxAttempts,
    log: options.log,
    generate: (attempt, feedback) =>
      generateLandingSpecWithLLM(brief, {
        timeoutMs: options.timeoutMs,
        maxRetries: options.maxRetries,
        feedback,
      }),
    validate: (spec) => {
      const brand = validateLandingBrand(spec);
      const biz = validateLandingBusiness(spec, brief);
      const errors: LandingValidationError[] = [
        ...brand.errors.map((e) => ({ kind: 'brand' as const, ...e })),
        ...biz.errors.map((e) => ({ kind: 'business' as const, ...e })),
      ];
      return { ok: errors.length === 0, errors };
    },
    buildRepairMessage: (errors) =>
      errors
        .map((e) => {
          if (e.kind === 'brand') {
            return `[brand:${e.rule}] ${e.field} — ${e.message} (текст: "${e.evidence}")`;
          }
          return `[business:${e.rule}] ${e.where ?? '*'} — ${e.message}`;
        })
        .join('\n'),
  });
}
