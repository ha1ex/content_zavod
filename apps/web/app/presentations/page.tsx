import Link from 'next/link';
import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

export const dynamic = 'force-dynamic';

const dateFmt = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });

const DECKS_DIR = resolve(
  process.cwd(),
  '..',
  '..',
  'design-system',
  'presentation-v02',
  'examples',
);

type Deck = {
  slug: string;
  title: string | null;
  slides: number;
  theme: string;
  date: string | null;
  content: boolean;
};

/**
 * Дек — это HTML-файл, поэтому метаданные берём из него самого: заголовок, тему,
 * число слайдов. Отдельного kind `deck` в харнессе пока нет (см. wiki/presentations/index.md),
 * реестра с этими полями не существует.
 */
async function readDeck(file: string, slug: string, hasContent: boolean): Promise<Deck> {
  const html = await readFile(file, 'utf8');
  const title = /<title>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? null;
  const theme = /<html[^>]*data-theme="([a-z-]+)"/i.exec(html)?.[1] ?? 'light';
  return {
    slug,
    title: title ? title.replace(/&nbsp;/g, ' ').trim() : null,
    slides: (html.match(/<section[^>]*class="[^"]*\bslide\b/g) ?? []).length,
    theme,
    date: await stat(file)
      .then((s) => dateFmt.format(s.mtime))
      .catch(() => null),
    content: hasContent,
  };
}

async function listDecks(): Promise<Deck[]> {
  try {
    const files = await readdir(DECKS_DIR);
    return await Promise.all(
      files
        .filter((f) => f.endsWith('.html'))
        .sort()
        .map((f) => {
          const slug = f.replace(/\.html$/, '');
          return readDeck(resolve(DECKS_DIR, f), slug, files.includes(`${slug}.content.md`));
        }),
    );
  } catch {
    return [];
  }
}

/** «21 слайд», «42 слайда», «25 слайдов» — счётчик стоит рядом с названием дека,
 *  и рассогласование в числе там читается как опечатка. */
function slidesLabel(n: number): string {
  const two = n % 100;
  const one = n % 10;
  if (two >= 11 && two <= 14) return `${n} слайдов`;
  if (one === 1) return `${n} слайд`;
  if (one >= 2 && one <= 4) return `${n} слайда`;
  return `${n} слайдов`;
}

const THEME_LABEL: Record<string, string> = {
  light: 'Light',
  dark: 'Dark',
  comparison: 'Сравнение',
};

function PreviewIcon() {
  return (
    <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

function TextIcon() {
  return (
    <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm2 16H8v-2h8v2Zm0-4H8v-2h8v2Zm-3-5V3.5L18.5 9H13Z" />
    </svg>
  );
}

export default async function PresentationsPage() {
  const decks = await listDecks();
  const slides = decks.reduce((sum, deck) => sum + deck.slides, 0);

  return (
    <main className="mx-auto max-w-6xl px-3 py-12 sm:px-6">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-wide text-(--color-text-secondary)">
          <Link href="/" className="hover:text-(--color-text-primary)">
            Контент-завод Кайтен
          </Link>
          {' · '}
          Презентации
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Презентации Кайтена</h1>
        <p className="mt-2 max-w-3xl text-base text-(--color-text-secondary)">
          Деки на шаблоне V02: слайд 1920×1080, Roboto, десять раскладок. Собираются руками из{' '}
          <code>templates.html</code>, живут в <code>design-system/presentation-v02/examples/</code>.
          В превью <code>Ctrl+P</code> даёт PDF — одна страница на слайд.
        </p>
      </header>

      <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <a
          href="/presentations/view/templates.html"
          target="_blank"
          rel="noreferrer"
          className="group rounded-(--radius-xl) lg:rounded-(--radius-2xl) border border-(--color-action-primary)/30 bg-(--color-action-primary-soft) p-6 transition hover:border-(--color-action-primary)"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-(--color-text-accent)">Раскладки шаблона</h2>
              <p className="mt-1 text-sm text-(--color-text-primary)">
                Все раскладки подряд: обложка, текст и визуал, четыре фрейма, чек-лист и цифры,
                таблица сравнения, процессные ленты, контактный.
              </p>
            </div>
            <span aria-hidden className="text-2xl text-(--color-text-accent)">
              →
            </span>
          </div>
        </a>

        <div className="rounded-(--radius-xl) lg:rounded-(--radius-2xl) border border-(--color-border-default) bg-(--color-surface-page) p-6">
          <h2 className="text-lg font-semibold">Как собрать дек</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm text-(--color-text-secondary)">
            <li>
              Скопировать <code>templates.html</code> под своим именем в <code>examples/</code>.
            </li>
            <li>
              Оставить нужные <code>section.slide</code>, заменить рыбу на текст.
            </li>
            <li>
              Свериться с <code>wiki/presentations/rules.md</code>: акцент, цвет, один тезис на
              слайд.
            </li>
          </ol>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between pr-4 sm:pr-5">
          <h2 className="text-xl font-medium">Существующие деки</h2>
          <span className="text-xs text-(--color-text-primary)">
            {decks.length} шт. · {slidesLabel(slides)}
          </span>
        </div>

        {decks.length === 0 ? (
          <p className="text-sm text-(--color-text-secondary)">
            Пока нет. Первый дек — копия <code>design-system/presentation-v02/templates.html</code>.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-2">
            {decks.map((deck) => (
              <li
                key={deck.slug}
                className="flex flex-col gap-2 rounded-(--radius-lg) border border-transparent bg-(--color-surface-page) px-3 py-3 transition-colors hover:border-(--color-border-default) sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-4"
              >
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-sm font-medium">{deck.slug}</span>
                  {deck.title && (
                    <span
                      className="text-xs text-(--color-text-secondary) lg:truncate"
                      title={deck.title}
                    >
                      {deck.title}
                    </span>
                  )}
                </span>
                <div className="flex items-center justify-end gap-x-4 text-xs sm:grid sm:shrink-0 sm:grid-cols-[80px_78px_70px_70px_54px] sm:justify-normal sm:gap-x-2.5 lg:gap-x-3.5">
                  <span className="text-(--color-neutral-500)" title="Дата последней правки">
                    {deck.date}
                  </span>
                  <span className="text-(--color-neutral-500)">{slidesLabel(deck.slides)}</span>
                  <a
                    href={`/presentations/view/examples/${deck.slug}.html`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 justify-self-start text-(--color-neutral-500) transition-colors hover:text-(--color-text-primary)"
                  >
                    <PreviewIcon />
                    <span className="hidden sm:inline">preview</span>
                  </a>
                  {deck.content ? (
                    <a
                      href={`/presentations/view/examples/${deck.slug}.content.md`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 justify-self-start text-(--color-neutral-500) transition-colors hover:text-(--color-text-primary)"
                      title="Текст дека отдельным файлом"
                    >
                      <TextIcon />
                      <span className="hidden sm:inline">текст</span>
                    </a>
                  ) : (
                    <span className="hidden sm:block" />
                  )}
                  <span className="hidden justify-self-end rounded-full bg-(--color-action-primary-soft) px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-(--color-text-accent) sm:inline-block">
                    {THEME_LABEL[deck.theme] ?? deck.theme}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="mt-12 border-t border-(--color-border-default) pt-6 text-xs text-(--color-text-secondary)">
        <p>
          Раскладки и когда какую брать — <code>wiki/presentations/index.md</code> · правила цвета
          и текста — <code>wiki/presentations/rules.md</code> · дизайн-система —{' '}
          <code>design-system/presentation-v02/</code>.
        </p>
      </footer>
    </main>
  );
}
