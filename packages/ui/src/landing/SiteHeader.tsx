import { Icon } from '../primitives/Icon';
import { cn } from '../primitives/cn';
import { KaitenLogo } from './KaitenLogo';

/**
 * SiteHeader — шапка в стиле kaiten.ru: лого «Кайтен», пункты меню,
 * «Войти» / «Регистрация». Пункты — простые ссылки на реальный kaiten.ru
 * (без раскрывающихся мега-меню). Промо-бара над шапкой нет.
 * Контент захардкожен под бренд (one-to-one с сайтом).
 */

const NAV: { label: string; href: string; caret?: boolean }[] = [
  { label: 'Продукт', href: 'https://kaiten.ru/product', caret: true },
  { label: 'Решения', href: 'https://kaiten.ru/teams', caret: true },
  { label: 'Услуги', href: 'https://kaiten.ru/implementation', caret: true },
  { label: 'На сервер', href: 'https://kaiten.ru/onpremise' },
  { label: 'ИИ', href: 'https://kaiten.ru/ai' },
  { label: 'Тарифы', href: 'https://kaiten.ru/tariffs' },
  { label: 'Кейсы', href: 'https://kaiten.ru/blog/tag/case/' },
  { label: 'Блог', href: 'https://kaiten.ru/blog/' },
];

const LOGIN = 'https://passport.kaiten.ru/';
const SIGNUP = 'https://passport.kaiten.ru/ru/registration';

export interface SiteHeaderProps {
  /**
   * Тон wordmark в логотипе: 'dark' — чёрный (светлая страница, дефолт),
   * 'light' — белый (тёмная схема). Проставляется рендером из spec.theme.
   */
  logoTone?: 'light' | 'dark';
}

export function SiteHeader({ logoTone = 'dark' }: SiteHeaderProps = {}) {
  return (
    <header className="relative isolate">
      {/* main nav */}
      <div className="border-b border-(--color-border-default) bg-(--color-surface-page)">
        <div className="mx-auto flex w-full max-w-(--container-kaiten) items-center gap-6 px-4 py-3.5 md:px-6 xl:px-0">
          {/* logo */}
          <a href="https://kaiten.ru" className="flex shrink-0 items-center" aria-label="Kaiten">
            <KaitenLogo tone={logoTone} className="h-8 w-auto" />
          </a>

          {/* nav links */}
          <nav className="hidden flex-1 items-center justify-center gap-5 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="inline-flex items-center gap-1 text-sm font-medium text-(--color-text-primary) transition-colors hover:text-(--color-text-accent)"
              >
                {item.label}
                {item.caret && (
                  <Icon name="ChevronDown" className="h-3.5 w-3.5 text-(--color-text-secondary)" strokeWidth={2} />
                )}
              </a>
            ))}
          </nav>

          {/* actions */}
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <a
              href="https://kaiten.ru"
              aria-label="Язык"
              className="hidden h-9 w-9 items-center justify-center rounded-(--radius-lg) border border-(--color-border-default) text-(--color-text-secondary) hover:text-(--color-text-primary) sm:inline-flex"
            >
              <Icon name="Globe" className="h-4 w-4" strokeWidth={2} />
            </a>
            <a
              href={LOGIN}
              className="inline-flex items-center rounded-(--radius-lg) px-4 py-2 text-sm font-medium text-(--color-text-primary) hover:text-(--color-text-accent)"
            >
              Войти
            </a>
            <a
              href={SIGNUP}
              className="inline-flex items-center rounded-(--radius-lg) bg-(--color-action-primary) px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Регистрация
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
