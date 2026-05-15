/**
 * Wiki log — append-only хроника операций harness.
 *
 * Формат записи:
 *   ## [YYYY-MM-DD HH:MM] <op> | <slug> | <status> | <note>
 */

import { appendFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export type LogOp =
  | 'generate'
  | 'repair'
  | 'ingest'
  | 'approve'
  | 'handoff'
  | 'lint'
  | 'wiki-sync'
  | 'wiki-init'
  | 'wiki-index';

export interface LogEntry {
  op: LogOp;
  slug?: string;
  status: 'ok' | 'fail' | 'warn';
  note?: string;
  meta?: Record<string, string | number | boolean>;
}

export function formatLogEntry(entry: LogEntry, when: Date = new Date()): string {
  const ts = formatTimestamp(when);
  const slug = entry.slug ?? '—';
  const meta = entry.meta
    ? ' ' +
      Object.entries(entry.meta)
        .map(([k, v]) => `${k}=${v}`)
        .join(' ')
    : '';
  const note = entry.note ? entry.note + meta : meta.trim() || '';
  return `## [${ts}] ${entry.op} | ${slug} | ${entry.status} | ${note}`.trim();
}

export async function appendLog(repoRoot: string, entry: LogEntry, when: Date = new Date()): Promise<void> {
  const path = resolve(repoRoot, 'wiki', 'log.md');
  const line = formatLogEntry(entry, when);
  await appendFile(path, '\n' + line + '\n', 'utf-8');
}

export interface LogReadOptions {
  tail?: number;
  filter?: LogOp;
}

export async function readLog(repoRoot: string, options: LogReadOptions = {}): Promise<string[]> {
  const path = resolve(repoRoot, 'wiki', 'log.md');
  const raw = await readFile(path, 'utf-8').catch(() => '');
  const entries = raw
    .split(/\r?\n/)
    .filter((l) => l.startsWith('## ['));
  let filtered = entries;
  if (options.filter) {
    filtered = filtered.filter((l) => l.includes(`] ${options.filter} |`));
  }
  if (options.tail && options.tail > 0) {
    filtered = filtered.slice(-options.tail);
  }
  return filtered;
}

function formatTimestamp(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
