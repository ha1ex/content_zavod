import { cn } from '../primitives/cn';
import { FormConsent } from './FormConsent';

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
  /**
   * Ссылка на регистрацию через Telegram-бота (deep-link `https://t.me/<bot>?start=…`).
   * Верстальщик подменит на реальный бот. `undefined` → кнопка не рендерится.
   */
  telegramHref?: string;
  /**
   * Ссылка на регистрацию через бота в MAX. `undefined` → кнопка не рендерится.
   */
  maxHref?: string;
  /** @deprecated Ссылки согласий теперь фиксированы в компоненте (юр-ссылки Кайтен). Поле оставлено для совместимости со спеком. */
  dataConsentHref?: string;
}

/**
 * Форма регистрации на вебинар. Поля и логика по ТЗ: имя и email обязательные,
 * телефон опциональный (чтобы не отпугнуть на входе), согласие на обработку
 * данных по 152-ФЗ обязательно. Поле «Компания / роль» из ТЗ убрано по решению
 * команды (18.07.2026) — квалификация лида по компании больше не собирается.
 * Все проверки браузерные, JS не нужен: обработчик настраивает верстальщик
 * через `action`.
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
  telegramHref,
  maxHref,
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
        <p className={cn('text-base text-(--color-text-primary)', title ? 'mt-2' : '')}>
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
      </div>

      <FormConsent idPrefix={anchorId ?? 'reg'} />

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

      {(telegramHref || maxHref) && (
        <>
          <div className="mt-5 flex items-center gap-3 text-xs text-(--color-text-secondary)">
            <span aria-hidden className="h-px flex-1 bg-(--color-border-default)" />
            или в один клик через мессенджер
            <span aria-hidden className="h-px flex-1 bg-(--color-border-default)" />
          </div>

          <div
            className={cn(
              'mt-4 grid gap-3',
              telegramHref && maxHref ? 'grid-cols-2' : 'grid-cols-1',
            )}
          >
            {telegramHref && (
              <a href={telegramHref} className={cn(MESSENGER_BTN)}>
                <TelegramIcon />
                Telegram
              </a>
            )}
            {maxHref && (
              <a href={maxHref} className={cn(MESSENGER_BTN)}>
                <MaxIcon />
                MAX
              </a>
            )}
          </div>
        </>
      )}

      {note && (
        <p className="mt-4 text-center text-sm text-(--color-text-secondary)">{note}</p>
      )}
    </form>
  );
}

/** Общий стиль кнопки-мессенджера: аутлайн-кнопка в тон DS, фирменный знак — цветом. */
const MESSENGER_BTN = cn(
  'inline-flex h-11 items-center justify-center gap-2 rounded-(--radius-lg)',
  'border border-(--color-border-default) bg-(--color-surface-page)',
  'text-sm font-medium text-(--color-text-primary) transition',
  'hover:border-(--color-action-primary) hover:bg-(--color-action-primary)/5',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-action-primary)/30',
);

/** Фирменный самолётик Telegram (бренд-синий #229ED9). */
function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="#229ED9" aria-hidden>
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );
}

/** Знак MAX — у мессенджера нет открытого SVG-лого, поэтому нейтральный «пузырь» в акценте DS. */
function MaxIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="var(--color-action-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
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
