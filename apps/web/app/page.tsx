import Link from 'next/link';
import type { ReactNode } from 'react';
import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { listDecks } from './presentations/decks';
import { SectionTabs } from '../components/SectionTabs';

const dateFmt = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });

async function publishedAt(file: string): Promise<string | null> {
  try {
    return dateFmt.format((await stat(file)).mtime);
  } catch {
    return null;
  }
}

export const dynamic = 'force-dynamic';

/** Склонение числительных: 21 слайд, 24 слайда, 42 слайда, 9 слайдов. */
function plural(n: number, one: string, few: string, many: string): string {
  const d = n % 10;
  const dd = n % 100;
  if (d === 1 && dd !== 11) return one;
  if (d >= 2 && d <= 4 && (dd < 12 || dd > 14)) return few;
  return many;
}

function TabIcon({ name }: { name: 'landing' | 'deck' }) {
  const paths: Record<string, ReactNode> = {
    landing: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c2.4 2.6 3.6 5.6 3.6 9S14.4 18.4 12 21c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3Z" />
      </>
    ),
    deck: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M12 16v4M8 20h8" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      {paths[name]}
    </svg>
  );
}
function ActionIcon({ name }: { name: 'preview' | 'edit' | 'approve' | 'handoff' }) {
  const paths: Record<string, ReactNode> = {
    preview: (
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    ),
    edit: (
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" />
    ),
    approve: <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z" />,
    handoff: <path d="M19 9h-4V3H9v6H5l7 7 7-7ZM5 18v2h14v-2H5Z" />,
  };
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="shrink-0"
    >
      {paths[name]}
    </svg>
  );
}

async function listLandings(): Promise<string[]> {
  const dir = resolve(process.cwd(), '..', '..', 'content', 'landings');
  try {
    const files = await readdir(dir);
    return files
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''))
      .sort();
  } catch {
    return [];
  }
}

async function listDesignLandings(): Promise<{ slug: string; title: string | null; date: string | null }[]> {
  const dir = resolve(process.cwd(), 'public', 'design');
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    const slugs = entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort();
    return Promise.all(
      slugs.map(async (slug) => {
        const title = await readFile(resolve(dir, slug, 'title.txt'), 'utf8')
          .then((t) => t.trim() || null)
          .catch(() => null);
        return { slug, title, date: await publishedAt(resolve(dir, slug, 'index.html')) };
      }),
    );
  } catch {
    return [];
  }
}

async function specTitle(slug: string): Promise<string | null> {
  const file = resolve(process.cwd(), '..', '..', 'content', 'landings', `${slug}.json`);
  try {
    const spec = JSON.parse(await readFile(file, 'utf8')) as {
      sections?: { props?: { title?: unknown } }[];
    };
    for (const section of spec.sections ?? []) {
      const title = section?.props?.title;
      if (typeof title === 'string' && title.trim()) return title.trim();
    }
    return null;
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const landings = await listLandings();
  const designLandings = await listDesignLandings();
  const specDir = resolve(process.cwd(), '..', '..', 'content', 'landings');
  const specLandings = await Promise.all(
    landings.map(async (slug) => ({
      slug,
      title: await specTitle(slug),
      date: await publishedAt(resolve(specDir, `${slug}.json`)),
    })),
  );
  const allLandings = [
    ...designLandings.map(({ slug, title, date }) => ({ slug, title, date, design: true })),
    ...specLandings.map(({ slug, title, date }) => ({ slug, title, date, design: false })),
  ].sort((a, b) => a.slug.localeCompare(b.slug));

  const GROUPS = ['Кайтен для отраслей', 'Сравнение Кайтен с продуктом', 'Продукт и фичи', 'Вебинары', 'Тестовые'] as const;
  const groupOf = (slug: string): (typeof GROUPS)[number] => {
    if (/^kaiten-vs-/.test(slug) || ['kaiten-clickup', 'kaiten-wrike', 'kaiten-trello', 'kaiten-asana', 'kaiten-weeek', 'kaiten-evateam', 'kaiten-youtrack'].includes(slug)) {
      return 'Сравнение Кайтен с продуктом';
    }
    if (/^kaiten-dlya-/.test(slug) || ['kaiten-finance', 'kaiten-manufacturing', 'kaiten-retail'].includes(slug)) {
      return 'Кайтен для отраслей';
    }
    if (/^webinar-/.test(slug)) return 'Вебинары';
    if (/^(test-|sample-)/.test(slug) || ['test-kaiten', 'sample-kaiten'].includes(slug)) return 'Тестовые';
    return 'Продукт и фичи';
  };
  const grouped = GROUPS.map((group) => ({
    group,
    items: allLandings.filter(({ slug }) => groupOf(slug) === group),
  })).filter(({ items }) => items.length > 0);

  const decks = (await listDecks()).map((deck) => ({
    ...deck,
    date: deck.mtime ? dateFmt.format(deck.mtime) : null,
  }));
  const DECK_GROUPS = ['Продукт и обзор', 'Отраслевые', 'События', 'Внутренние'] as const;
  const deckGroupOf = (slug: string): (typeof DECK_GROUPS)[number] => {
    if (/^kaiten-conf-/.test(slug)) return 'События';
    if (/^kaiten-(dlya-|retail|finance|manufacturing)/.test(slug)) return 'Отраслевые';
    if (slug === 'kaiten-content-factory') return 'Внутренние';
    return 'Продукт и обзор';
  };
  const groupedDecks = DECK_GROUPS.map((group) => ({
    group,
    items: decks.filter(({ slug }) => deckGroupOf(slug) === group),
  })).filter(({ items }) => items.length > 0);

  const landingsPanel =
    allLandings.length === 0 ? (
      <p className="text-sm text-(--color-text-secondary)">
        Пока нет. Начните с <Link href="/new" className="underline">/new</Link>.
      </p>
    ) : (
      grouped.map(({ group, items }) => (
      <details key={group} open className="group mb-4 rounded-(--radius-xl) lg:rounded-(--radius-2xl) bg-(--color-surface-section) px-2 py-4 sm:p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            <svg
              aria-hidden
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="-rotate-90 text-(--color-text-secondary) transition-transform group-open:rotate-0"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              {group}
            </h3>
          </span>
          <span className="text-xs text-(--color-text-primary)">{items.length} шт.</span>
        </summary>
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:mt-5">
        {items.map(({ slug, title, date, design }) => (
          <li
            key={`${design ? 'design' : 'spec'}-${slug}`}
            className="flex flex-col gap-2 rounded-(--radius-lg) border border-transparent bg-(--color-surface-page) px-3 py-3 transition-colors hover:border-(--color-border-default) sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-4"
          >
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="flex min-w-0 items-center justify-between gap-2">
                <span className="truncate text-sm font-medium">{slug}</span>
                {design && (
                  <span className="shrink-0 rounded-full bg-(--color-action-primary-soft) px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-(--color-text-accent) sm:hidden">
                    Design
                  </span>
                )}
              </span>
              {title && (
                <span className="text-xs text-(--color-text-secondary) lg:truncate" title={title}>
                  {title}
                </span>
              )}
            </span>
            <div className="flex items-center justify-end gap-x-4 text-xs sm:grid sm:shrink-0 sm:grid-cols-[80px_64px_64px_64px_54px] sm:justify-normal sm:gap-x-2.5 lg:grid-cols-[84px_70px_70px_70px_58px] lg:gap-x-3.5">
              <span
                className="text-(--color-neutral-500)"
                title="Дата публикации"
              >
                {date}
              </span>
              {design ? (
                <a
                  href={`/design/${slug}/index.html`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 justify-self-start text-(--color-neutral-500) transition-colors hover:text-(--color-text-primary)"
                >
                  <ActionIcon name="preview" />
                  <span className="hidden sm:inline">preview</span>
                </a>
              ) : (
                <Link
                  href={`/landings/${slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 justify-self-start text-(--color-neutral-500) transition-colors hover:text-(--color-text-primary)"
                >
                  <ActionIcon name="preview" />
                  <span className="hidden sm:inline">preview</span>
                </Link>
              )}
              {design ? (
                <>
                  <span className="hidden sm:block" />
                  <span className="hidden sm:block" />
                </>
              ) : (
                <>
                  <Link
                    href={`/approve/${slug}`}
                    className="inline-flex items-center gap-1.5 justify-self-start text-(--color-neutral-500) transition-colors hover:text-(--color-text-primary)"
                  >
                    <ActionIcon name="approve" />
                    <span className="hidden sm:inline">approve</span>
                  </Link>
                  <a
                    href={`/api/handoff/${slug}`}
                    download={`landing-${slug}.zip`}
                    className="inline-flex items-center gap-1.5 justify-self-start text-(--color-neutral-500) transition-colors hover:text-(--color-text-primary)"
                    title="Скачать ZIP-архив для вёрстки"
                  >
                    <ActionIcon name="handoff" />
                    <span className="hidden sm:inline">ZIP для верстки</span>
                  </a>
                </>
              )}
              {design ? (
                <span className="hidden justify-self-end rounded-full bg-(--color-action-primary-soft) px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-(--color-text-accent) sm:inline-block">
                  Design
                </span>
              ) : (
                <span className="hidden sm:block" />
              )}
            </div>
          </li>
        ))}
        </ul>
      </details>
      ))
    );
  const decksPanel =
    decks.length === 0 ? (
      <p className="text-sm text-(--color-text-secondary)">
        Пока нет. Деки лежат в <code>design-system/presentation-v02/examples/</code>.
      </p>
    ) : (
      groupedDecks.map(({ group, items }) => (
      <details key={group} open className="group mb-4 rounded-(--radius-xl) lg:rounded-(--radius-2xl) bg-(--color-surface-section) px-2 py-4 sm:p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            <svg
              aria-hidden
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="-rotate-90 text-(--color-text-secondary) transition-transform group-open:rotate-0"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
            <h3 className="text-sm font-semibold uppercase tracking-wide">{group}</h3>
          </span>
          <span className="text-xs text-(--color-text-primary)">{items.length} шт.</span>
        </summary>
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:mt-5">
        {items.map(({ slug, title, date, slides, pdf, script }) => (
          <li
            key={slug}
            className="flex flex-col gap-2 rounded-(--radius-lg) border border-transparent bg-(--color-surface-page) px-3 py-3 transition-colors hover:border-(--color-border-default) sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-4"
          >
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate text-sm font-medium">{slug}</span>
              <span className="text-xs text-(--color-text-secondary) lg:truncate" title={title ?? undefined}>
                {title ? `${title} · ` : ''}
                {slides} {plural(slides, 'слайд', 'слайда', 'слайдов')}
              </span>
            </span>
            <div className="flex items-center justify-end gap-x-4 text-xs sm:grid sm:shrink-0 sm:grid-cols-[80px_64px_74px_54px] sm:justify-normal sm:gap-x-2.5 lg:grid-cols-[84px_70px_80px_58px] lg:gap-x-3.5">
              <span className="text-(--color-neutral-500)" title="Дата изменения">
                {date}
              </span>
              <a
                href={`/presentations/examples/${slug}.html`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 justify-self-start text-(--color-neutral-500) transition-colors hover:text-(--color-text-primary)"
              >
                <ActionIcon name="preview" />
                <span className="hidden sm:inline">preview</span>
              </a>
              {script ? (
                <a
                  href={`/presentations/examples/${slug}.content.md`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 justify-self-start text-(--color-neutral-500) transition-colors hover:text-(--color-text-primary)"
                  title="Текстовый сценарий дека"
                >
                  <ActionIcon name="edit" />
                  <span className="hidden sm:inline">сценарий</span>
                </a>
              ) : (
                <span className="hidden sm:block" />
              )}
              {pdf ? (
                <a
                  href={`/presentations/examples/${slug}.pdf`}
                  target="_blank"
                  rel="noreferrer"
                  className="justify-self-end rounded-full bg-(--color-action-primary-soft) px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-(--color-text-accent)"
                  title="Экспорт в PDF"
                >
                  PDF
                </a>
              ) : (
                <span className="hidden sm:block" />
              )}
            </div>
          </li>
        ))}
        </ul>
      </details>
      ))
    );

  return (
    <main className="mx-auto max-w-6xl px-3 py-12 sm:px-6">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-wide text-(--color-text-secondary)">Контент-завод Кайтен</p>
        <h1 className="text-3xl font-semibold tracking-tight">LLM harness для лендингов</h1>
        <p className="mt-2 text-base text-(--color-text-secondary)">
          Маркетинг создаёт brief → harness собирает Kaiten-стайл лендинг → команда фронта мержит TSX.
        </p>
      </header>

      <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/new"
          className="group rounded-(--radius-xl) lg:rounded-(--radius-2xl) border border-(--color-border-default) bg-(--color-surface-section) p-6 transition hover:border-(--color-action-primary)"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-(--color-text-accent)">
                Как создать лендинг
              </h2>
              <p className="mt-1 text-sm text-(--color-text-primary)">
                Открой claude / codex в терминале → кинь ТЗ → попроси
                сгенерить. Инструкция и шаблоны промптов.
              </p>
            </div>
            <span aria-hidden className="text-2xl text-(--color-text-accent)">
              →
            </span>
          </div>
        </Link>

        <Link
          href="/catalog"
          className="group rounded-(--radius-xl) lg:rounded-(--radius-2xl) border border-(--color-border-default) bg-(--color-surface-page) p-6 transition hover:border-(--color-action-primary)/50"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Каталог блоков</h2>
              <p className="mt-1 text-sm text-(--color-text-secondary) transition-colors group-hover:text-(--color-text-primary)">
                22 секции + 39 моков с живыми примерами. Всё прямо в браузере, без запуска
                Storybook.
              </p>
            </div>
            <span aria-hidden className="text-2xl">
              →
            </span>
          </div>
        </Link>

        <Link
          href="/pipeline"
          className="group rounded-(--radius-xl) lg:rounded-(--radius-2xl) border border-(--color-border-default) bg-(--color-surface-page) p-6 transition hover:border-(--color-action-primary)/50"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Как устроен конвейер</h2>
              <p className="mt-1 text-sm text-(--color-text-secondary) transition-colors group-hover:text-(--color-text-primary)">
                Справочник по всем этапам: что на входе и выходе, правила и гейты, команды.
              </p>
            </div>
            <span aria-hidden className="text-2xl">
              →
            </span>
          </div>
        </Link>
      </section>

      <SectionTabs
        tabs={[
          {
            id: 'landings',
            label: 'Лендинги',
            count: allLandings.length,
            icon: <TabIcon name="landing" />,
            content: landingsPanel,
          },
          {
            id: 'decks',
            label: 'Презентации',
            count: decks.length,
            icon: <TabIcon name="deck" />,
            content: decksPanel,
          },
        ]}
      />

      <footer className="mt-12 border-t border-(--color-border-default) pt-6 text-xs text-(--color-text-secondary)">
        <p>
          Документация для маркетинга — <code>wiki/marketing/getting-started.md</code> · Полная
          техническая — <code>README.md</code>.
        </p>
      </footer>
    </main>
  );
}
