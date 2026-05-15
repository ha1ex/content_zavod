export { parseFrontmatter, serializeFrontmatter, extractGenBlock, replaceGenBlock } from './frontmatter.js';
export type { FrontMatter, ParsedFile } from './frontmatter.js';
export { loadTokens } from './load-tokens.js';
export { tokensToCss } from './tokens-to-css.js';
export { buildGenBlocks } from './tokens-to-md.js';
export { wikiSync } from './sync.js';
export type { SyncResult } from './sync.js';
export type { DesignTokens, TypographyScale } from './tokens-types.js';
export { resolveColorRef } from './tokens-types.js';
export { findRepoRoot, loadDesignSystem } from './load-design-system.js';
export { appendLog, readLog, formatLogEntry } from './log.js';
export type { LogOp, LogEntry, LogReadOptions } from './log.js';
export { rebuildIndex } from './index-builder.js';
export type { IndexBuildResult } from './index-builder.js';
export { scaffoldWikiPage } from './scaffold.js';
export type { WikiPageType, ScaffoldResult } from './scaffold.js';
export { runLint } from './lint.js';
export type { LintScope, LintSeverity, LintIssue, LintResult } from './lint.js';
export { ingestBrief } from './ingest-brief.js';
export type { IngestBriefOptions, IngestBriefResult, AudienceClassification } from './ingest-brief.js';
export { selectContext } from './select-context.js';
export type { SelectedContext } from './select-context.js';
export {
  fileLandingToWiki,
  updateLandingStatus,
  appendReviewerNote,
} from './file-landing.js';
export type {
  FileLandingInput,
  UpdateStatusInput,
  AppendReviewerNoteInput,
  LandingStatus,
} from './file-landing.js';
export {
  loadLessons,
  parseLessons,
  findRelevantLessons,
  formatLessonsForRepair,
  appendLesson,
} from './lessons-loader.js';
export type { Lesson, FindRelevantLessonsInput, AppendLessonInput } from './lessons-loader.js';
export {
  buildLessonsHint,
  composeRepairMessage,
  suggestLessonFromIncident,
} from './repair-integration.js';
export type {
  RepairContext,
  ComposeRepairMessageInput,
  ProposedLessonFromIncident,
} from './repair-integration.js';
