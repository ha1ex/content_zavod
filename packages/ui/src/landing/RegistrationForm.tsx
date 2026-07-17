import type { ReactNode } from 'react';
import { cn } from '../primitives/cn';

export interface RegistrationFormProps {
  /** Заголовок карточки. Опционален: в первом экране форма идёт без своего заголовка. */
  title?: string;
  description?: string;
  submitLabel: string;
  /** Мягкая строка под кнопкой (напр. обещание сопровождения после вебинара). */
  note?: string;
  /**
   * Якорь формы — на него ведут кнопки «Занять место». Он же префикс `id` полей,
   * поэтому на странице с двумя формами якоря ОБЯЗАНЫ различаться: иначе `id`
   * полей совпадут и `<label>` второй формы будет фокусировать поле первой.
   */
  anchorId?: string;
  /**
   * Куда форма POST-ится. Верстальщик подменит на реальный endpoint.
   * По умолчанию `#` — заглушка.
   */
  action?: string;
  /** Ссылка на согласие на обработку персональных данных (152-ФЗ). */
  dataConsentHref?: string;
}

/**
 * Форма регистрации на вебинар. Поля и логика — по ТЗ: имя и email обязательные,
 * телефон и компания/роль опциональные (чтобы не отпугнуть на входе), согласие на
 * обработку данных по 152-ФЗ обязательно. Все проверки — браузерные, JS не нужен:
 * обработчик настраивает верстальщик через `action`.
 *
 * Карточка используется дважды — в правой колонке первого экрана и в финальном
 * блоке, — поэтому у неё нет собственной секционной обёртки и отступов.
 */
export function RegistrationForm({
  title,
  description,
  submitLabel,
  note,
  anchorId,
  action = '#',
  dataConsentHref = '/privacy',
}: RegistrationFormProps) {
  // Префикс id полей — от якоря: форма рендерится дважды (первый экран и финал),
  // и с общим префиксом id полей дублировались бы на одной странице.
  const fid = (name: string) => `${anchorId ?? 'reg'}-${name}`;

  return (
    <form
      id={anchorId}
      action={action}
      method="post"
      className={cn(
        'w-full scroll-mt-24 rounded-(--radius-xl) lg:rounded-(--radius-2xl)',
        'border border-(--color-border-default) bg-(--color-surface-card) p-6 md:p-8',
        'text-(--color-text-primary) shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]',
      )}
    >
      {title && <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>}
      {description && (
        <p className={cn('text-base text-(--color-text-secondary)', title ? 'mt-2' : '')}>
          {description}
        </p>
      )}

      <div className={cn('flex flex-col gap-4', title || description ? 'mt-6' : '')}>
        <Field id={fid('name')} name="name" type="text" label="Имя" required autoComplete="name" />
        <Field
          id={fid('email')}
          name="email"
          type="email"
          label="Email"
          required
          placeholder="name@company.ru"
          autoComplete="email"
        />
        <Field
          id={fid('phone')}
          name="phone"
          type="tel"
          label="Телефон"
          placeholder="+7 999 000-00-00"
          autoComplete="tel"
        />
        <Field id={fid('company')} name="company" type="text" label="Компания / роль" />
      </div>

      <div className="mt-5">
        <Consent
          id={fid('consent')}
          name="consent_personal_data"
          label={
            <>
              Я даю{' '}
              <ConsentLink href={dataConsentHref}>
                согласие на&nbsp;обработку персональных данных
              </ConsentLink>
            </>
          }
        />
      </div>

      <button
        type="submit"
        className={cn(
          'mt-6 inline-flex h-12 w-full items-center justify-center rounded-(--radius-lg)',
          'bg-(--color-action-primary) text-base font-semibold text-(--color-text-inverse)',
          'transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-(--color-action-primary) focus-visible:ring-offset-2',
        )}
      >
        {submitLabel}
      </button>

      {note && (
        <p className="mt-4 text-center text-sm text-(--color-text-secondary)">{note}</p>
      )}
    </form>
  );
}

interface FieldProps {
  id: string;
  name: string;
  type: 'text' | 'email' | 'tel';
  label: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}

function Field({ id, name, type, label, required, placeholder, autoComplete }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-(--color-text-primary)">
        {label}
        {required && (
          <span aria-hidden className="ml-0.5 text-(--color-action-primary)">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn(
          'h-11 w-full rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-page)',
          'px-3.5 text-base text-(--color-text-primary) placeholder:text-(--color-text-secondary)',
          'transition focus:border-(--color-action-primary) focus:outline-none focus:ring-2',
          'focus:ring-(--color-action-primary)/30',
        )}
      />
    </div>
  );
}

function ConsentLink({ href, children }: { href: string; children: ReactNode }) {
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

function Consent({ id, name, label }: { id: string; name: string; label: ReactNode }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5">
      <input
        id={id}
        name={name}
        type="checkbox"
        required
        className={cn(
          'mt-0.5 h-4 w-4 shrink-0 rounded-(--radius-sm) border border-(--color-border-default)',
          'accent-(--color-action-primary)',
        )}
      />
      <span className="text-[13px] leading-snug text-(--color-text-secondary)">{label}</span>
    </label>
  );
}
