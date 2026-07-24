import { cn } from '../primitives/cn';
import { GradientPanel } from './GradientPanel';
import { RegistrationForm } from './RegistrationForm';

export interface RegistrationCtaProps {
  eyebrow?: string;
  title: string;
  description?: string;
  submitLabel: string;
  /** Мягкая строка под кнопкой — работает на обе аудитории. */
  note?: string;
  anchorId?: string;
  action?: string;
  dataConsentHref?: string;
  telegramHref?: string;
  maxHref?: string;
}

/**
 * Финальный блок регистрации: заголовок слева, повтор формы справа. Композиция
 * повторяет первый экран — так закрывается визуальная рамка страницы (ТЗ, блок 7).
 *
 * Подложка — общая `GradientPanel` (порт эталонного `CTAsecondaryMock`).
 *
 * Цветной блок, поэтому по дизайн-системе отбивается увеличенным вертикальным
 * отступом сверху и снизу: 64 / 96 / 128.
 */
export function RegistrationCta({
  eyebrow,
  title,
  description,
  submitLabel,
  note,
  anchorId = 'registration',
  action,
  dataConsentHref,
  telegramHref,
  maxHref,
}: RegistrationCtaProps) {
  return (
    <section className="px-4 py-16 md:px-6 xl:px-0 md:py-24 lg:py-32">
      <GradientPanel
        className={cn(
          'mx-auto w-full max-w-(--container-kaiten)',
          'px-6 py-12 md:px-12 md:py-16 lg:px-12 lg:pt-16 lg:pb-12',
        )}
      >
        <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-[1fr_minmax(0,420px)]">
          <div>
            {eyebrow && (
              <p className="text-sm font-medium text-(--color-text-secondary)">{eyebrow}</p>
            )}
            <h2
              className={cn(
                'text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl',
                eyebrow ? 'mt-3' : '',
              )}
            >
              {title}
            </h2>
            {description && (
              <p className="mt-4 max-w-xl text-lg text-(--color-text-primary)">{description}</p>
            )}
          </div>

          <RegistrationForm
            submitLabel={submitLabel}
            note={note}
            anchorId={anchorId}
            action={action}
            dataConsentHref={dataConsentHref}
            telegramHref={telegramHref}
            maxHref={maxHref}
          />
        </div>
      </GradientPanel>
    </section>
  );
}
