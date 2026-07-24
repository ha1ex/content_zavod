import type { ReactNode } from 'react';
import { cn } from '../primitives/cn';

// Юридические ссылки Кайтен — ЕДИНЫЙ источник для всех форм контент-завода.
const PRIVACY_HREF = 'https://kaiten.ru/privacy';
const PD_CONSENT_HREF = 'https://hq.kaiten.ru/p/d/463915dd-3644-44a0-969a-a80209ca2d08';
const NEWSLETTER_HREF = 'https://hq.kaiten.ru/p/d/d238e01f-788c-44dd-8620-4272c6578d6f';

/**
 * FormConsent — стандартный блок согласий для ЛЮБОЙ формы контент-завода
 * (регистрация, waitlist и т.п.), в обоих флоу. Два чекбокса:
 *   1) обязательный — Политика конфиденциальности + согласие на обработку ПД (152-ФЗ);
 *   2) опциональный — согласие на рассылку Кайтен.
 * Ссылки — фиксированные юридические URL Кайтен (единый источник, не из спека).
 * Правило: `form-consent-standard`.
 *
 * `idPrefix` — префикс id чекбоксов (обычно anchorId формы): форма может
 * рендериться дважды на странице, поэтому id обязаны различаться.
 */
export function FormConsent({ idPrefix }: { idPrefix: string }) {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <Consent
        id={`${idPrefix}-consent`}
        name="consent_personal_data"
        required
        label={
          <>
            Я&nbsp;согласен с{' '}
            <ConsentLink href={PRIVACY_HREF}>Политикой конфиденциальности</ConsentLink> и&nbsp;даю{' '}
            <ConsentLink href={PD_CONSENT_HREF}>
              согласие на&nbsp;обработку персональных данных
            </ConsentLink>
          </>
        }
      />
      <Consent
        id={`${idPrefix}-newsletter`}
        name="consent_newsletter"
        label={
          <>
            Я&nbsp;согласен{' '}
            <ConsentLink href={NEWSLETTER_HREF}>получать рассылку от&nbsp;Кайтен</ConsentLink>{' '}
            (обновления продукта и&nbsp;полезные материалы)
          </>
        }
      />
    </div>
  );
}

export function ConsentLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-(--color-action-primary) underline decoration-(--color-action-primary)/40 underline-offset-2 hover:decoration-(--color-action-primary)"
    >
      {children}
    </a>
  );
}

function Consent({
  id,
  name,
  label,
  required = false,
}: {
  id: string;
  name: string;
  label: ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5">
      <input
        id={id}
        name={name}
        type="checkbox"
        required={required}
        className={cn(
          'mt-0.5 h-4 w-4 shrink-0 rounded-(--radius-sm) border border-(--color-border-default)',
          'accent-(--color-action-primary)',
        )}
      />
      <span className="text-[13px] leading-snug text-(--color-text-secondary)">{label}</span>
    </label>
  );
}
