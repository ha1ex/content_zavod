'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_GROUPS } from '../_content';

function NavLinks() {
  const pathname = usePathname();

  const itemClass = (active: boolean) =>
    [
      'flex items-baseline gap-2 rounded-(--radius-lg) px-3 py-2 text-sm transition',
      active
        ? 'bg-(--color-action-primary-soft) font-medium text-(--color-text-accent)'
        : 'text-(--color-text-primary) hover:bg-(--color-surface-section)',
    ].join(' ');

  return (
    <nav aria-label="Разделы справочника">
      <Link href="/pipeline" className={itemClass(pathname === '/pipeline')}>
        <span className="w-6 shrink-0 text-center text-xs text-(--color-text-secondary)" aria-hidden>
          ◎
        </span>
        <span>Обзор конвейера</span>
      </Link>

      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="mb-1 mt-5 px-3 text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
            {group.label}
          </p>
          {group.items.map((doc) => (
            <Link
              key={doc.slug}
              href={`/pipeline/${doc.slug}`}
              className={itemClass(pathname === `/pipeline/${doc.slug}`)}
            >
              <span
                className="w-6 shrink-0 text-center text-xs tabular-nums text-(--color-text-secondary)"
                aria-hidden
              >
                {doc.num ?? '·'}
              </span>
              <span>{doc.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}

/**
 * Левая навигация раздела /pipeline.
 * Desktop — sticky-колонка; узкие экраны — нативный <details> без JS-состояния.
 */
export function PipelineNav() {
  return (
    <aside className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:self-start lg:overflow-y-auto">
      <details className="rounded-(--radius-2xl) border border-(--color-border-default) bg-(--color-surface-page) lg:hidden">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
          Навигация по разделу
        </summary>
        <div className="border-t border-(--color-border-default) p-3">
          <NavLinks />
        </div>
      </details>

      <div className="hidden rounded-(--radius-2xl) border border-(--color-border-default) bg-(--color-surface-page) p-3 lg:block">
        <NavLinks />
      </div>
    </aside>
  );
}
