import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  hasViewableExtension,
  isSafePathSegment,
  isViewableDir,
  isViewableFile,
} from '../../_content/file-allowlist';
import { MarkdownView } from '../../_components/MarkdownView';

/** Просмотрщик читает файлы репозитория на каждый запрос. */
export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 512 * 1024; // 512 KB — защитный потолок просмотрщика

interface PageProps {
  params: Promise<{ path: string[] }>;
}

function repoRoot(): string {
  return resolve(process.cwd(), '..', '..');
}

export async function generateMetadata({ params }: PageProps) {
  const { path } = await params;
  const name = path[path.length - 1] ?? 'файл';
  return { title: `${name} · Материалы конвейера` };
}

export default async function SourceViewerPage({ params }: PageProps) {
  const { path } = await params;

  // Защита от path traversal: только безопасные сегменты + белый список.
  if (!Array.isArray(path) || path.length === 0 || !path.every(isSafePathSegment)) notFound();
  const relPath = path.join('/');
  const isDir = isViewableDir(relPath);
  if (!isDir && !isViewableFile(relPath)) notFound();

  const root = repoRoot();
  const absPath = resolve(root, relPath);
  if (!absPath.startsWith(root + sep)) notFound();

  let entries: { name: string; isDir: boolean }[] | null = null;
  let content: string | null = null;
  let truncated = false;

  try {
    if (isDir) {
      try {
        const dirents = await readdir(absPath, { withFileTypes: true });
        entries = dirents
          .filter((d) => !d.name.startsWith('.'))
          .filter((d) => d.isDirectory() || hasViewableExtension(d.name))
          .map((d) => ({ name: d.name, isDir: d.isDirectory() }))
          .sort((a, b) => Number(b.isDir) - Number(a.isDir) || a.name.localeCompare(b.name, 'ru'));
      } catch {
        // Каталог из белого списка ещё не создан (например, content/approvals/
        // появляется после первого согласования) — показываем пустой листинг.
        entries = [];
      }
    } else {
      const info = await stat(absPath);
      if (!info.isFile()) notFound();
      content = await readFile(absPath, 'utf-8');
      if (content.length > MAX_FILE_SIZE) {
        content = content.slice(0, MAX_FILE_SIZE);
        truncated = true;
      }
    }
  } catch {
    notFound();
  }

  const isMarkdown = relPath.endsWith('.md');

  return (
    <article className="space-y-4">
      <header className="rounded-(--radius-2xl) border border-(--color-border-default) bg-(--color-surface-page) p-5">
        <p className="text-xs uppercase tracking-wide text-(--color-text-secondary)">
          {isDir ? 'Каталог материалов' : 'Материал конвейера · только чтение'}
        </p>
        <h1 className="mt-1 break-all font-mono text-lg font-semibold">{relPath}</h1>
        <p className="mt-2 text-xs text-(--color-text-secondary)">
          Файл из репозитория завода — то, на что опирается конвейер. Вернуться:{' '}
          <Link href="/pipeline" className="text-(--color-text-accent) hover:underline">
            обзор конвейера
          </Link>{' '}
          или кнопка «назад» в браузере.
        </p>
      </header>

      {entries && (
        <section className="rounded-(--radius-2xl) border border-(--color-border-default) bg-(--color-surface-page) p-6">
          <ul className="space-y-1.5">
            {entries.length === 0 && (
              <li className="text-sm text-(--color-text-secondary)">
                Каталог пока пуст — материалы появятся по мере работы конвейера.
              </li>
            )}
            {entries.map((entry) => (
              <li key={entry.name}>
                <Link
                  href={`/pipeline/source/${relPath}/${entry.name}`}
                  className="inline-flex items-baseline gap-2 text-sm text-(--color-text-primary) hover:text-(--color-text-accent) hover:underline"
                >
                  <span aria-hidden className="text-xs text-(--color-text-secondary)">
                    {entry.isDir ? '▸' : '·'}
                  </span>
                  <code className="font-mono text-[13px]">
                    {entry.name}
                    {entry.isDir ? '/' : ''}
                  </code>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {content !== null && (
        <section className="rounded-(--radius-2xl) border border-(--color-border-default) bg-(--color-surface-page) p-6">
          {isMarkdown ? (
            <MarkdownView source={content} />
          ) : (
            <pre className="overflow-x-auto rounded-(--radius-lg) bg-(--color-surface-section) p-4 font-mono text-xs leading-relaxed">
              <code>{content}</code>
            </pre>
          )}
          {truncated && (
            <p className="mt-3 text-xs text-(--color-text-secondary)">
              Файл показан не целиком (обрезан до 512 КБ).
            </p>
          )}
        </section>
      )}
    </article>
  );
}
