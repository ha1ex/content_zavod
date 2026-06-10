/**
 * Типы контента справочника «Как устроен конвейер» (/pipeline).
 * Контент статичный, на русском, для сотрудников маркетинга.
 */

export type RuleSeverity = 'hard' | 'soft';

export interface StageRule {
  /** Формулировка правила/гейта простым языком. */
  text: string;
  /** hard — блокирует конвейер до исправления, soft — предупреждение. */
  severity: RuleSeverity;
  /** Путь к файлу-источнику в репозитории. */
  source?: string;
}

export interface StageStep {
  title: string;
  detail?: string;
}

export interface StageCommand {
  cmd: string;
  note?: string;
}

export interface RepoLink {
  path: string;
  note?: string;
}

/** Фаза поэтапного конвейера (P0–P8). */
export interface PhaseDoc {
  id: string;
  title: string;
  summary: string;
  gate?: string;
}

export interface PipelineDoc {
  /** stage — этап конвейера, knowledge — сквозной раздел (канон, валидаторы, wiki). */
  kind: 'stage' | 'knowledge';
  /** Сегмент URL: /pipeline/<slug>. */
  slug: string;
  /** Отображаемый номер этапа: '1', '2', '3a'… У knowledge-разделов отсутствует. */
  num?: string;
  /** Ветка развилки auto-routing — для схемы на обзорной странице. */
  branch?: 'legacy' | 'phased';
  title: string;
  /** Одна строка для левой навигации и карточек обзора. */
  short: string;
  /** Абзацы раздела «Назначение». */
  purpose: string[];
  inputs?: string[];
  outputs?: string[];
  /** Упорядоченные шаги «Как работает». */
  how?: StageStep[];
  rules?: StageRule[];
  commands?: StageCommand[];
  artifacts?: RepoLink[];
  links?: RepoLink[];
  /** Только для поэтапного конвейера. */
  phases?: PhaseDoc[];
}
