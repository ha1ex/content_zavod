import { generateObject } from 'ai';
import type { Brief } from '../schemas/brief.js';
import { LandingSpecSchema, type LandingSpec } from '../schemas/landing-spec.js';
import { getModel, hasLLMCredentials, resolveProvider } from '../providers/index.js';
import { buildBriefPrompt, buildLandingSystemPrompt } from '../prompts/system.js';

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

export interface LLMGenerationResult {
  spec: LandingSpec;
  sources: string[];
}

export async function generateLandingSpecWithLLM(
  brief: Brief,
  options: LLMGenerationOptions = {},
): Promise<LandingSpec> {
  const { spec } = await generateLandingSpecWithLLMResult(brief, options);
  return spec;
}

/**
 * Расширенная версия `generateLandingSpecWithLLM`, возвращает `{ spec, sources }`.
 * `sources` — список wiki-страниц, которые попали в системный промпт (для `meta.sources` и filing back).
 */
export async function generateLandingSpecWithLLMResult(
  brief: Brief,
  options: LLMGenerationOptions = {},
): Promise<LLMGenerationResult> {
  if (!hasLLMCredentials()) {
    throw new Error(
      `No LLM credentials for provider "${resolveProvider()}". ` +
        `Set ANTHROPIC_API_KEY или OPENAI_API_KEY в .env.local, либо используйте ` +
        `--no-llm для детерминированного fallback.`,
    );
  }

  const { system, sources, archetype, tokenEstimate } = await buildLandingSystemPrompt({ brief });
  const prompt = buildBriefPrompt(JSON.stringify(brief, null, 2));
  void archetype;
  void tokenEstimate;

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
    return { spec: result.object, sources };
  } finally {
    clearTimeout(timeout);
  }
}
