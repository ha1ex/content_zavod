'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../primitives/Icon';
import { cn } from '../primitives/cn';

/** Один блок в окне «Спасибо» — мессенджер или календарь. */
export interface RegistrationSuccessBlock {
  title: string;
  text: string;
  /** Первичная кнопка блока (напр. «Подписаться» → Telegram-бот). */
  buttonLabel?: string;
  buttonHref?: string;
  /** Пара ссылок (напр. Яндекс/Google Календарь). */
  links?: { label: string; href: string }[];
}

/** Контент окна успешной регистрации (порт модалки апрельской конференции). */
export interface RegistrationSuccess {
  title: string;
  caption?: string;
  sub?: string;
  blocks?: RegistrationSuccessBlock[];
}

/**
 * Клиентская обёртка вокруг формы регистрации: перехватывает отправку,
 * при заданном `action` тихо шлёт данные (fire-and-forget) и показывает
 * всплывающее окно «Спасибо за регистрацию» с переходом в мессенджер —
 * как на апрельской конференции. Подключается только когда в спеке задан
 * блок `success`, поэтому формы без него работают по-старому (нативный POST).
 */
export function RegistrationSuccessBoundary({
  success,
  action,
  children,
}: {
  success: RegistrationSuccess;
  action?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      e.preventDefault();
      const form = (e.target as HTMLElement).closest('form') as HTMLFormElement | null;
      if (form && action && action !== '#') {
        try {
          void fetch(action, { method: 'POST', body: new FormData(form) }).catch(() => {});
        } catch {
          /* верстальщик подставит боевой обработчик — окно всё равно покажем */
        }
      }
      setOpen(true);
    },
    [action],
  );

  return (
    <div onSubmit={onSubmit} style={{ display: 'contents' }}>
      {children}
      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <SuccessModal success={success} onClose={() => setOpen(false)} />,
          document.body,
        )}
    </div>
  );
}

function SuccessModal({ success, onClose }: { success: RegistrationSuccess; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={success.title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        className={cn(
          'relative z-[1] w-full max-w-lg overflow-hidden rounded-(--radius-2xl)',
          'border border-(--color-border-default) bg-(--color-surface-card) p-6 md:p-8',
          'text-(--color-text-primary) shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]',
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-(--radius-full) text-(--color-text-secondary) transition hover:bg-(--color-action-primary-soft) hover:text-(--color-text-primary)"
        >
          <Icon name="X" className="h-5 w-5" strokeWidth={2} />
        </button>

        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-(--radius-full) bg-[color-mix(in_srgb,#22c55e_18%,transparent)] text-[#22c55e]">
            <Icon name="Check" className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <h3 className="text-xl font-semibold md:text-2xl">{success.title}</h3>
        </div>

        {success.caption && (
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-(--color-text-accent)">
            {success.caption}
          </p>
        )}
        {success.sub && (
          <p className="mt-2 text-base leading-relaxed text-(--color-text-secondary)">
            {success.sub}
          </p>
        )}

        {success.blocks && success.blocks.length > 0 && (
          <div className="mt-6 flex flex-col gap-3">
            {success.blocks.map((b, i) => (
              <div
                key={i}
                className="rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-section) p-4 md:p-5"
              >
                <p className="text-base font-semibold text-(--color-text-primary)">{b.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-(--color-text-secondary)">{b.text}</p>
                {b.buttonHref && b.buttonLabel && (
                  <a
                    href={b.buttonHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex h-10 items-center justify-center rounded-(--radius-lg) bg-(--color-action-primary) px-5 text-sm font-semibold text-(--color-text-inverse) transition hover:opacity-90"
                  >
                    {b.buttonLabel}
                  </a>
                )}
                {b.links && b.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {b.links.map((l, j) => (
                      <a
                        key={j}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center justify-center rounded-(--radius-lg) border border-(--color-border-default) px-4 text-sm font-medium text-(--color-text-primary) transition hover:border-[color-mix(in_srgb,var(--color-action-primary)_45%,transparent)]"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
