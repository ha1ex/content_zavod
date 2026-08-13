import { Icon } from '../primitives/Icon';
import { cn } from '../primitives/cn';
import { FormConsent } from './FormConsent';
import { FormMessengers } from './FormMessengers';
import { NonNativeSelect } from './NonNativeSelect';

export interface RegistrationFormProps {
  title?: string;
  description?: string;
  submitLabel: string;
  note?: string;
  anchorId?: string;
  action?: string;
  telegramHref?: string;
  maxHref?: string;
  newsletterRequired?: boolean;
  /** @deprecated ссылки согласий фиксированы в компоненте. */
  dataConsentHref?: string;
  /**
   * 'default' — имя/email/телефон (эталон вебинара). 'conference' — форма 1-в-1
   * с конференции kaiten-conf-ai: белые поля с иконками, «Имя» на всю ширину,
   * «Телефон» + «E-mail» в строку, селект «Являюсь действующим клиентом Кайтена».
   */
  variant?: 'default' | 'conference';
}

/**
 * Форма регистрации на событие. Поля браузерно-валидируемые (JS не нужен —
 * обработчик настраивает верстальщик через `action`). Карточка используется
 * дважды (первый экран и финал), поэтому без своей секционной обёртки.
 */
export function RegistrationForm({
  title,
  description,
  submitLabel,
  note,
  anchorId,
  action = '#',
  telegramHref,
  maxHref,
  newsletterRequired,
  variant = 'default',
}: RegistrationFormProps) {
  const fid = (name: string) => `${anchorId ?? 'reg'}-${name}`;
  const isConf = variant === 'conference';

  return (
    <form
      id={anchorId}
      action={action}
      method="post"
      className={cn(
        'w-full scroll-mt-24',
        !isConf &&
          'rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-card) p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] md:p-8 lg:rounded-(--radius-2xl)',
        'text-(--color-text-primary)',
      )}
    >
      {title && <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>}
      {description && (
        <p className={cn('text-base text-(--color-text-primary)', title ? 'mt-2' : '')}>
          {description}
        </p>
      )}

      {isConf ? (
        <div className={cn('flex flex-col gap-4', title || description ? 'mt-6' : '')}>
          <Field
            id={fid('name')}
            name="name"
            type="text"
            label="Имя"
            placeholder="Имя"
            labelHidden
            required
            autoComplete="name"
            icon="User"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              id={fid('phone')}
              name="phone"
              type="tel"
              label="Телефон"
              placeholder="Телефон"
              labelHidden
              autoComplete="tel"
              icon="Phone"
            />
            <Field
              id={fid('email')}
              name="email"
              type="email"
              label="E-mail"
              placeholder="E-mail"
              labelHidden
              required
              autoComplete="email"
              icon="Mail"
            />
          </div>
          <NonNativeSelect
            id={fid('is_client')}
            name="is_client"
            icon="Globe"
            placeholder="Являюсь действующим клиентом Кайтена"
            options={[
              { value: 'yes', label: 'Да' },
              { value: 'no', label: 'Ещё нет' },
            ]}
          />
        </div>
      ) : (
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
        </div>
      )}

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

      <FormConsent idPrefix={anchorId ?? 'reg'} newsletterRequired={newsletterRequired} />

      <FormMessengers telegramHref={telegramHref} maxHref={maxHref} />

      {note && <p className="mt-4 text-center text-sm text-(--color-text-secondary)">{note}</p>}
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
  /** lucide-иконка слева внутри поля (вариант 'conference'). Только для белых полей → серая. */
  icon?: string;
  /** Скрыть подпись визуально (остаётся для скринридеров) — placeholder-only, как на апрельской форме. */
  labelHidden?: boolean;
}

function Field({
  id,
  name,
  type,
  label,
  required,
  placeholder,
  autoComplete,
  icon,
  labelHidden,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={cn('text-sm font-medium text-(--color-text-primary)', labelHidden && 'sr-only')}
      >
        {label}
        {required && !labelHidden && (
          <span aria-hidden className="ml-0.5 text-(--color-action-primary)">
            *
          </span>
        )}
      </label>
      <div className="relative">
        {icon && (
          <Icon
            name={icon}
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b8b9a]"
            strokeWidth={2}
          />
        )}
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cn(
            'h-11 w-full rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-page)',
            'text-base text-(--color-text-primary) placeholder:text-(--color-text-secondary)',
            icon ? 'pl-10 pr-3.5' : 'px-3.5',
            'transition focus:border-(--color-action-primary) focus:outline-none focus:ring-2',
            'focus:ring-(--color-action-primary)/30',
          )}
        />
      </div>
    </div>
  );
}

