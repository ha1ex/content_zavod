import type { Brief } from '../schemas/brief';
import type { LandingSpec } from '../schemas/landing-spec';
import {
  type Domain,
  getDomainEntry,
  resolveDomainFromBrief,
} from '../registry/domain-visual';

/**
 * Illustration allocation (P8 фаза, M4 MVP).
 *
 * Назначение: для секций, где не подходит ни один существующий mock-вариант
 * из домена, инициировать генерацию уникальной SVG-иллюстрации.
 *
 * MVP сейчас:
 *   - анализирует spec, для каждой визуальной секции определяет decision
 *     (reuse-mock, generate-svg, no-op);
 *   - записывает decisions в spec.meta.illustrationAllocations;
 *   - НЕ генерирует SVG автоматически — оставляет TODO + suggestion для
 *     host-agent (через svg-illustration-skill.md).
 *
 * Полная реализация (после M3 stabilize):
 *   - вызывать generateIllustrationTSXWithRepair для секций с decision=generate-svg;
 *   - хранить fingerprint в global-illustration-usage.ts для cross-landing
 *     diversity;
 *   - расширить rendering под customIllustrationId.
 */

export type AllocationDecisionKind = 'reuse-mock' | 'generate-svg' | 'no-op';

export interface AllocationDecision {
  sectionIdx: number;
  sectionId: string;
  intent: string;
  decision: AllocationDecisionKind;
  variant?: string;
  illustrationId?: string;
  /** Human-readable обоснование. */
  rationale: string;
}

export interface AllocateIllustrationsResult {
  domain: Domain;
  decisions: AllocationDecision[];
  suggestions: string[];
}

export interface AllocateIllustrationsOptions {
  /** Если задан — переопределяет domain резолв из brief. */
  overrideDomain?: Domain;
}

/**
 * Определяет для каждой визуальной секции, нужно ли:
 *   - reuse-mock (есть подходящий mock в домене — текущий выбор),
 *   - generate-svg (mock не подходит или явно customIllustrationId уже стоит),
 *   - no-op (секция без визуального слота, либо visual=null).
 */
export function allocateIllustrations(
  spec: LandingSpec,
  brief: Brief,
  options: AllocateIllustrationsOptions = {},
): AllocateIllustrationsResult {
  const domain = options.overrideDomain ?? resolveDomainFromBrief(brief);
  const entry = getDomainEntry(domain);
  const allowedVariants = new Set(entry?.mocks.map((m) => m.variant) ?? []);
  const decisions: AllocationDecision[] = [];
  const suggestions: string[] = [];

  spec.sections.forEach((section, idx) => {
    if (section.component === 'HeroSection') {
      const v = section.props.visual?.variant;
      const customId = section.props.visual?.illustrationId;
      if (customId) {
        decisions.push({
          sectionIdx: idx,
          sectionId: section.id,
          intent: 'hero-illustration',
          decision: 'generate-svg',
          illustrationId: customId,
          rationale: 'customIllustrationId уже задан — рендерер использует SVG.',
        });
      } else if (v && v !== 'generic' && allowedVariants.has(v)) {
        decisions.push({
          sectionIdx: idx,
          sectionId: section.id,
          intent: 'hero-mock',
          decision: 'reuse-mock',
          variant: v,
          rationale: `mock '${v}' подходит для домена '${domain}'.`,
        });
      } else if (v === 'generic' || !v) {
        decisions.push({
          sectionIdx: idx,
          sectionId: section.id,
          intent: 'hero-fallback',
          decision: 'no-op',
          rationale: 'Hero без визуала или generic — нужен фокусный mock либо SVG.',
        });
        suggestions.push(
          `[P8] sections[${idx}] Hero без domain-specific mock'а. ` +
            `Рекомендация: выбери variant из домена '${domain}' (${entry?.mocks.map((m) => m.variant).join(', ') ?? 'нет mocks'}) ` +
            'либо сгенерируй уникальную SVG по packages/harness/src/prompts/svg-illustration-skill.md.',
        );
      }
      return;
    }
    if (section.component === 'MediaCopy') {
      const v = section.props.mediaVariant;
      const customId = section.props.customIllustrationId;
      if (customId) {
        decisions.push({
          sectionIdx: idx,
          sectionId: section.id,
          intent: 'media-illustration',
          decision: 'generate-svg',
          illustrationId: customId,
          rationale: 'customIllustrationId уже задан.',
        });
      } else if (v && v !== 'default' && allowedVariants.has(v)) {
        decisions.push({
          sectionIdx: idx,
          sectionId: section.id,
          intent: 'media-mock',
          decision: 'reuse-mock',
          variant: v,
          rationale: `mock '${v}' подходит для домена '${domain}'.`,
        });
      } else {
        decisions.push({
          sectionIdx: idx,
          sectionId: section.id,
          intent: 'media-fallback',
          decision: 'no-op',
          rationale: 'MediaCopy без domain-mock\'а — нужен conscious выбор.',
        });
        suggestions.push(
          `[P8] sections[${idx}] MediaCopy без domain-specific mock'а. ` +
            `Подбери mediaVariant из домена '${domain}' либо задай customIllustrationId.`,
        );
      }
    }
  });

  return {
    domain,
    decisions,
    suggestions,
  };
}

/**
 * Записывает решения allocation в spec.meta.illustrationAllocations.
 * Возвращает обновлённый spec (immutable не-обязательно — apply мутирует
 * spec до сохранения).
 */
export function applyAllocationsToSpec(
  spec: LandingSpec,
  result: AllocateIllustrationsResult,
): LandingSpec {
  spec.meta = {
    ...(spec.meta ?? {}),
    sources: spec.meta?.sources ?? [],
    illustrationAllocations: result.decisions.map((d) => ({
      sectionIdx: d.sectionIdx,
      sectionId: d.sectionId,
      intent: d.intent,
      decision: d.decision,
      variant: d.variant,
      illustrationId: d.illustrationId,
    })),
    domain: result.domain,
  };
  return spec;
}
