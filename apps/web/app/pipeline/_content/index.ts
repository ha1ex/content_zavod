import type { PipelineDoc } from './types';
import { STAGES } from './stages';
import { KNOWLEDGE } from './knowledge';

export type {
  PipelineDoc,
  PhaseDoc,
  RepoLink,
  RuleSeverity,
  StageCommand,
  StageRule,
  StageStep,
} from './types';
export { STAGES } from './stages';
export { KNOWLEDGE } from './knowledge';

export const ALL_DOCS: PipelineDoc[] = [...STAGES, ...KNOWLEDGE];

export function getDoc(slug: string): PipelineDoc | undefined {
  return ALL_DOCS.find((doc) => doc.slug === slug);
}

/** Группы левой навигации: порядок групп и пунктов = порядок отображения. */
export const NAV_GROUPS: { label: string; items: PipelineDoc[] }[] = [
  { label: 'Этапы конвейера', items: STAGES },
  { label: 'Правила и база знаний', items: KNOWLEDGE },
];
