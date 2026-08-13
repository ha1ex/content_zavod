import { cn } from '../primitives/cn';
import { KaitenLogo } from './KaitenLogo';

export interface EventHeaderNavItem {
  label: string;
  href: string;
}

export interface EventHeaderProps {
  /** Пункты навигации (якоря на секции страницы). */
  nav?: EventHeaderNavItem[];
  /** Кнопка-CTA справа. */
  cta?: { label: string; href: string };
  /** Тон логотипа: 'light' (белый, для тёмной схемы) — дефолт, 'dark'. */
  logoTone?: 'light' | 'dark';
  /** Ссылка на логотипе. */
  logoHref?: string;
}

/**
 * EventHeader — минимальная шапка лендинга мероприятия (по образцу
 * kaiten-conf-ai): логотип слева, короткая навигация по секциям, кнопка-CTA
 * справа. Заменяет общую kaiten.ru-шапку (SiteHeader) на страницах событий —
 * подключается при `meta.chrome.header === false` (опт-аут из factory-chrome).
 * Липкая и стеклянная в тёмной схеме — через правила theme-dark.css (`header`).
 */
export function EventHeader({
  nav = [],
  cta,
  logoTone = 'light',
  logoHref = 'https://kaiten.ru',
}: EventHeaderProps) {
  return (
    <header className="relative isolate">
      <div className="border-b border-(--color-border-default) bg-(--color-surface-page)">
        <div className="mx-auto flex w-full max-w-(--container-kaiten) items-center gap-6 px-4 py-3.5 md:px-6 xl:px-0">
          <a href={logoHref} className="flex shrink-0 items-center" aria-label="Kaiten">
            <KaitenLogo tone={logoTone} className="h-8 w-auto" />
          </a>

          {nav.length > 0 && (
            <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-(--color-text-primary) transition-colors hover:text-(--color-text-accent)"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          {cta && (
            <a
              href={cta.href}
              className={cn(
                'ml-auto inline-flex items-center rounded-(--radius-lg) lg:ml-0',
                'bg-(--color-action-primary) px-4 py-2 text-sm font-semibold text-white',
                'transition hover:opacity-90',
              )}
            >
              {cta.label}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
