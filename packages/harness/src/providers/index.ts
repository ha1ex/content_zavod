import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { gateway, type LanguageModel } from 'ai';

/**
 * Провайдер-агностичный слой над Vercel AI SDK 6.
 *
 * Стратегия (приоритет сверху вниз):
 *   1. Vercel AI Gateway (рекомендуется) — единая точка auth/billing/failover.
 *      Активируется автоматически если есть AI_GATEWAY_API_KEY или OIDC token
 *      (VERCEL_OIDC_TOKEN из `vercel env pull`). Модель: `<provider>/<id>`.
 *   2. Direct provider (anthropic / openai) — fallback по ANTHROPIC_API_KEY /
 *      OPENAI_API_KEY. Используется в local-dev без Vercel-связки.
 *
 * Env:
 *   AI_PROVIDER=anthropic | openai           (default: anthropic)
 *   AI_GATEWAY=on | off | auto               (default: auto = on если есть key/OIDC)
 *   ANTHROPIC_MODEL=claude-opus-4.7          (актуальный slug с точками)
 *   OPENAI_MODEL=gpt-5
 *
 * Model IDs верифицированы через https://ai-gateway.vercel.sh/v1/models.
 */

export type ProviderName = 'anthropic' | 'openai';

const DEFAULT_MODELS: Record<ProviderName, string> = {
  anthropic: 'claude-opus-4.7',
  openai: 'gpt-5',
};

export function resolveProvider(): ProviderName {
  const raw = process.env.AI_PROVIDER?.toLowerCase();
  if (raw === 'openai') return 'openai';
  return 'anthropic';
}

function modelIdFor(provider: ProviderName): string {
  if (provider === 'anthropic') {
    return process.env.ANTHROPIC_MODEL ?? DEFAULT_MODELS.anthropic;
  }
  return process.env.OPENAI_MODEL ?? DEFAULT_MODELS.openai;
}

function gatewayMode(): 'on' | 'off' | 'auto' {
  const v = process.env.AI_GATEWAY?.toLowerCase();
  if (v === 'on' || v === 'off') return v;
  return 'auto';
}

function gatewayAvailable(): boolean {
  return Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN);
}

export function useGateway(): boolean {
  const mode = gatewayMode();
  if (mode === 'off') return false;
  if (mode === 'on') return true;
  return gatewayAvailable();
}

export function hasLLMCredentials(provider: ProviderName = resolveProvider()): boolean {
  if (useGateway() && gatewayAvailable()) return true;
  if (provider === 'anthropic') return Boolean(process.env.ANTHROPIC_API_KEY);
  return Boolean(process.env.OPENAI_API_KEY);
}

export function getModel(provider: ProviderName = resolveProvider()): LanguageModel {
  const modelId = modelIdFor(provider);
  if (useGateway() && gatewayAvailable()) {
    return gateway(`${provider}/${modelId}`);
  }
  return provider === 'anthropic' ? anthropic(modelId) : openai(modelId);
}

export function describeActiveProvider(): string {
  const provider = resolveProvider();
  const modelId = modelIdFor(provider);
  const route = useGateway() && gatewayAvailable() ? 'gateway' : 'direct';
  const hasKey = hasLLMCredentials(provider);
  return `${route}:${provider}/${modelId} (${hasKey ? 'key configured' : 'NO KEY'})`;
}
