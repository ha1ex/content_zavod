import { ALL_DOCS } from './index';

/**
 * Белый список путей для просмотрщика /pipeline/source/<путь>.
 * Собирается из самого контента справочника: открыть можно только те файлы
 * и каталоги, на которые справочник явно ссылается (links, artifacts,
 * rules.source, phases.sources). Пути с плейсхолдером <slug> не кликабельны.
 */

/** Расширения, которые просмотрщик умеет показывать. */
export const VIEWABLE_EXTENSIONS = [
  '.md',
  '.ts',
  '.tsx',
  '.mjs',
  '.json',
  '.css',
  '.yml',
  '.yaml',
] as const;

function collectAllowlist(): { files: Set<string>; dirs: string[] } {
  const files = new Set<string>();
  const dirs: string[] = [];
  const add = (p?: string) => {
    if (!p || p.includes('<')) return;
    if (p.endsWith('/')) {
      dirs.push(p);
    } else {
      files.add(p);
    }
  };
  for (const doc of ALL_DOCS) {
    doc.links?.forEach((l) => add(l.path));
    doc.artifacts?.forEach((a) => add(a.path));
    doc.rules?.forEach((r) => add(r.source));
    doc.phases?.forEach((phase) => phase.sources?.forEach((s) => add(s.path)));
  }
  return { files, dirs };
}

const ALLOWLIST = collectAllowlist();

export function hasViewableExtension(relPath: string): boolean {
  return VIEWABLE_EXTENSIONS.some((ext) => relPath.endsWith(ext));
}

/** Сегмент пути безопасен: без '..', '/', пустоты и управляющих символов. */
export function isSafePathSegment(segment: string): boolean {
  return /^[a-zA-Z0-9._@-]+$/.test(segment) && segment !== '.' && segment !== '..';
}

function isSafeRelPath(relPath: string): boolean {
  if (!relPath || relPath.startsWith('/')) return false;
  return relPath.split('/').every(isSafePathSegment);
}

/** Каталог из белого списка (без завершающего '/'). */
export function isViewableDir(relPath: string): boolean {
  return isSafeRelPath(relPath) && ALLOWLIST.dirs.includes(`${relPath}/`);
}

/**
 * Файл можно открыть в просмотрщике: путь безопасен, расширение поддержано
 * и путь либо явно указан в контенте, либо лежит внутри каталога из списка.
 */
export function isViewableFile(relPath: string): boolean {
  if (!isSafeRelPath(relPath) || !hasViewableExtension(relPath)) return false;
  if (ALLOWLIST.files.has(relPath)) return true;
  return ALLOWLIST.dirs.some((dir) => relPath.startsWith(dir));
}

/** Что-либо открываемое: файл или каталог. */
export function isViewablePath(relPath: string): boolean {
  const clean = relPath.endsWith('/') ? relPath.slice(0, -1) : relPath;
  return isViewableFile(clean) || isViewableDir(clean);
}
