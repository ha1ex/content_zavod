import { cn } from '../primitives/cn';
import { GradientPanel } from './GradientPanel';
import { RegistrationForm } from './RegistrationForm';
import { RegistrationSuccessBoundary, type RegistrationSuccess } from './RegistrationSuccessModal';

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
  newsletterRequired?: boolean;
  /** Вариант формы: 'default', 'conference' (поля с иконками + вопрос про клиента) или 'partner' (заявка в партнёрскую программу). */
  variant?: 'default' | 'conference' | 'partner';
  /** Опции селекта «Что интересует» — только для варианта 'partner'. */
  partnerOptions?: { value: string; label: string }[];
  /** Акцентное продолжение заголовка (градиентом на новой строке) — для conference. */
  accentWord?: string;
  /**
   * Окно «Спасибо за регистрацию» после отправки — с переходом в мессенджер
   * (как на апрельской конференции). Задано → форма показывает попап; нет —
   * обычный нативный POST.
   */
  success?: RegistrationSuccess;
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
  newsletterRequired,
  variant,
  partnerOptions,
  accentWord,
  success,
}: RegistrationCtaProps) {
  const isConf = variant === 'conference';
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
            {eyebrow &&
              (isConf ? (
                <span className="inline-flex items-center rounded-(--radius-full) bg-(--color-action-primary-soft) px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-(--color-text-accent)">
                  {eyebrow}
                </span>
              ) : (
                <p className="text-sm font-medium text-(--color-text-secondary)">{eyebrow}</p>
              ))}
            <h2
              className={cn(
                'text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl',
                eyebrow ? 'mt-4' : '',
                isConf && 'reg-heading',
              )}
            >
              {title}
              {isConf && accentWord && (
                <>
                  <br />
                  <span className="reg-accent">{accentWord}</span>
                </>
              )}
            </h2>
            {description && (
              <p className="mt-4 max-w-xl text-lg text-(--color-text-primary)">{description}</p>
            )}
          </div>

          {success ? (
            <RegistrationSuccessBoundary success={success} action={action}>
              <RegistrationForm
                submitLabel={submitLabel}
                note={note}
                anchorId={anchorId}
                action={action}
                dataConsentHref={dataConsentHref}
                telegramHref={telegramHref}
                maxHref={maxHref}
                newsletterRequired={newsletterRequired}
                variant={variant}
                partnerOptions={partnerOptions}
              />
            </RegistrationSuccessBoundary>
          ) : (
            <RegistrationForm
              submitLabel={submitLabel}
              note={note}
              anchorId={anchorId}
              action={action}
              dataConsentHref={dataConsentHref}
              telegramHref={telegramHref}
              maxHref={maxHref}
              newsletterRequired={newsletterRequired}
              variant={variant}
              partnerOptions={partnerOptions}
            />
          )}
        </div>
      </GradientPanel>
    </section>
  );
}
