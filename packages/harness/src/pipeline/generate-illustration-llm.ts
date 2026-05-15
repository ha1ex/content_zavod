import { generateText } from 'ai';
import type { IllustrationSpec } from '../schemas/illustration-spec';
import { getModel, hasLLMCredentials, resolveProvider } from '../providers/index';
import {
  buildIllustrationSystemPrompt,
  buildIllustrationUserPrompt,
} from '../prompts/system';
import {
  validateIllustrationTSX,
  type IllustrationValidationError,
} from '../validators/illustration-ast';
import { runWithRepair, type RepairResult } from './repair';

/**
 * Этап 3: LLM-генерация TSX SVG-иллюстрации по IllustrationSpec.
 *
 * В отличие от LandingSpec (structured JSON через generateObject), здесь модель
 * пишет TSX-код. Контракт — пройти AST-валидатор; repair-loop этапа 4 будет
 * скармливать ошибки валидатора обратно в модель.
 */
export interface IllustrationLLMOptions {
  timeoutMs?: number;
  maxRetries?: number;
}

const FENCE_RE = /^```(?:tsx|typescript|ts|jsx|javascript|js)?\n?|\n?```\s*$/gi;

/** Срезает markdown-обёртку ```tsx … ``` если модель её всё-таки добавила. */
export function stripCodeFences(raw: string): string {
  let text = raw.trim();
  if (text.startsWith('```')) {
    text = text.replace(FENCE_RE, '').trim();
  }
  return text;
}

export async function generateIllustrationTSXWithLLM(
  spec: IllustrationSpec,
  options: IllustrationLLMOptions & { feedback?: string } = {},
): Promise<string> {
  if (!hasLLMCredentials()) {
    throw new Error(
      `No LLM credentials for provider "${resolveProvider()}". ` +
        `Запусти \`vercel env pull\` для OIDC-токена (Gateway), ` +
        `либо заполни .env.local по .env.example. Или используй --no-llm.`,
    );
  }

  const system = await buildIllustrationSystemPrompt();
  const userBlock = buildIllustrationUserPrompt(spec);
  const prompt = options.feedback
    ? `${userBlock}\n\n## Previous attempt AST validator errors\n${options.feedback}\n\nFix ONLY these issues; keep composition, palette и devices. Re-emit полный TSX-файл.`
    : userBlock;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 120_000);

  try {
    const result = await generateText({
      model: getModel(),
      system,
      prompt,
      maxRetries: options.maxRetries ?? 2,
      abortSignal: controller.signal,
    });
    return stripCodeFences(result.text);
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Этап 4: LLM-генерация TSX-иллюстрации с repair-loop'ом.
 *
 * AST-валидатор возвращает structured errors[{rule,message,loc}] — раннер
 * собирает их в фидбек, модель чинит только конкретные нарушения.
 */
export async function generateIllustrationTSXWithRepair(
  spec: IllustrationSpec,
  options: IllustrationLLMOptions & {
    maxAttempts?: number;
    log?: (line: string) => void;
  } = {},
): Promise<RepairResult<string, IllustrationValidationError>> {
  return runWithRepair<string, IllustrationValidationError>({
    maxAttempts: options.maxAttempts,
    log: options.log,
    generate: (attempt, feedback) =>
      generateIllustrationTSXWithLLM(spec, {
        timeoutMs: options.timeoutMs,
        maxRetries: options.maxRetries,
        feedback,
      }),
    validate: (tsx) => validateIllustrationTSX(tsx),
    buildRepairMessage: (errors) =>
      errors
        .map((e) => `- [${e.rule}]${e.loc ? ` (line ${e.loc.line})` : ''} ${e.message}`)
        .join('\n'),
  });
}
