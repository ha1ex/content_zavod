import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { z } from 'zod';
import { BriefSchema } from '@buffalo/harness/schemas';
import { getModel, hasLLMCredentials, describeActiveProvider } from '@buffalo/harness/providers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const SYSTEM_PROMPT = `Ты — ассистент маркетингового харнесса Buffalo. Из произвольного текста (брифа, концепции, описания продукта) извлеки структурированный Brief в формате BriefSchema.

ПРАВИЛА:
- product: краткое описание (одна фраза) что это за продукт. Без hype.
- audience: массив РОЛЕЙ (не "все"). Конкретные сегменты: "менеджеры продаж", "тимлиды разработки".
- market: тип рынка. Обычно "B2B SaaS", "B2C", "Enterprise".
- primaryGoal: одно из: book_demo / signup / try_free / waitlist / contact_sales / download.
- mainPain: главная боль клиента (что сейчас плохо).
- mainPromise: что продукт даёт. Без hype-слов.
- proofPoints: 3+ конкретных факта (цифры, сертификаты, кейсы). Если в тексте мало — выдели что есть.
- tone: оставь "clear, professional, non-hype" если не явно указан другой.
- cta: текст основной кнопки, согласованный с primaryGoal. Например: "Получить демо" / "Попробовать бесплатно".
- pageArchetype: "saas" (по умолчанию) / "waitlist" / "enterprise".
- pageLayout: один из 10 вариантов layout, выбери подходящий по смыслу: enterprise-modular-saas / single-module-deep-dive / compliance-first-enterprise / comparison-vs-competitor / story-led-unaware / depersonalized-product-tour / crm-product-tour / migration-from-competitor / product-launch / case-study-deep-dive. Если не уверен — оставь null.

Извлекай ТОЛЬКО на основе текста. Не выдумывай факты которых нет. Если поле невозможно определить — выбирай реалистичный default.`;

const InputSchema = z.object({
  text: z.string().min(20).max(50000),
  filename: z.string().optional(),
});

function heuristicBrief(text: string): z.infer<typeof BriefSchema> {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const product = lines[0]?.slice(0, 200) ?? 'Продукт';
  const mainPain = lines.slice(1, 4).join(' ').slice(0, 400) || 'Опишите боль клиента';
  const mainPromise = lines.slice(4, 7).join(' ').slice(0, 400) || 'Опишите обещание';

  return {
    product,
    audience: ['роль 1', 'роль 2'],
    market: 'B2B SaaS',
    primaryGoal: 'book_demo',
    mainPain,
    mainPromise,
    proofPoints: [],
    tone: 'clear, professional, non-hype',
    cta: 'Получить демо',
    pageArchetype: 'saas',
  };
}

export async function POST(req: Request): Promise<Response> {
  const contentType = req.headers.get('content-type') ?? '';

  let text: string;
  let filename: string | undefined;

  try {
    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      const file = form.get('file');
      if (!(file instanceof File)) {
        return NextResponse.json({ error: 'no file in form' }, { status: 400 });
      }
      filename = file.name;
      const buffer = Buffer.from(await file.arrayBuffer());
      const lower = file.name.toLowerCase();

      if (lower.endsWith('.docx')) {
        const mammoth = await import('mammoth');
        const result = await mammoth.extractRawText({ buffer });
        text = result.value;
      } else if (lower.endsWith('.json')) {
        const raw = buffer.toString('utf-8');
        const parsed = BriefSchema.safeParse(JSON.parse(raw));
        if (parsed.success) {
          return NextResponse.json({
            brief: parsed.data,
            source: 'direct-json',
            filename,
          });
        }
        text = raw;
      } else {
        text = buffer.toString('utf-8');
      }
    } else {
      const body = await req.json();
      const parsed = InputSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: 'invalid body', issues: parsed.error.flatten() },
          { status: 400 },
        );
      }
      text = parsed.data.text;
      filename = parsed.data.filename;
    }
  } catch (err) {
    return NextResponse.json(
      { error: 'failed to read input', detail: (err as Error).message },
      { status: 400 },
    );
  }

  if (text.trim().length < 20) {
    return NextResponse.json(
      { error: 'text слишком короткий (< 20 символов после очистки)' },
      { status: 400 },
    );
  }

  if (!hasLLMCredentials()) {
    return NextResponse.json({
      brief: heuristicBrief(text),
      source: 'heuristic',
      filename,
      warning:
        'Нет API-ключа (ANTHROPIC_API_KEY / OPENAI_API_KEY / AI_GATEWAY_API_KEY). Используется эвристика — поля заполнены минимально, отредактируйте вручную.',
    });
  }

  try {
    const result = await generateObject({
      model: getModel(),
      schema: BriefSchema,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Извлеки Brief из следующего текста${
            filename ? ` (исходный файл: ${filename})` : ''
          }:\n\n${text}`,
        },
      ],
    });
    return NextResponse.json({
      brief: result.object,
      source: 'llm',
      provider: describeActiveProvider(),
      filename,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: 'LLM extract failed, fallback to heuristic',
        detail: (err as Error).message,
        brief: heuristicBrief(text),
        source: 'heuristic-fallback',
        filename,
      },
      { status: 200 },
    );
  }
}
