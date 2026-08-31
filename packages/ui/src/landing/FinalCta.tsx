import { ButtonLink } from '../primitives/ButtonLink';
import { Inspect } from '../primitives/Inspect';
import { cn } from '../primitives/cn';
import { CTAsecondaryMock, type CTAButton } from './mocks/CTAsecondaryMock';
import { MockVisual, type MockVariant } from './mocks';
import CTAdark from './mocks/CTAdark';
import CTAproduct from './mocks/CTAproduct';

/** Иллюстрация платформы Kaiten по умолчанию для variant='product'. */
const CTA_PRODUCT_IMAGE = '/brand/cta-product.png';

export interface FinalCtaProps {
  title: string;
  description?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string } | null;
  /**
   * 'solid' (по умолчанию) — прежняя сплошная фиолетовая заливка (старые лендинги).
   * 'gradient' — градиентный блок `CTAsecondaryMock` (ритейл и последующие лендинги).
   * 'dark' — тёмный CTA-блок `CTAdark` (текст + терминал), для лендингов про терминал/CLI.
   * 'product' — блок `CTAproduct`: текст слева, иллюстрация платформы справа,
   *   градиент лаванда → голубой (эталон — «Переходите из Trello за пару кликов»).
   */
  variant?: 'solid' | 'gradient' | 'dark' | 'product';
  /** Интерфейс справа (только для variant='gradient') под тематику лендинга. */
  visualVariant?: MockVariant;
  /**
   * Иллюстрация справа для variant='product'. Не задана — общая картинка
   * платформы Kaiten (`/brand/cta-product.png`).
   */
  visualSrc?: string;
  /** Alt для `visualSrc`. */
  visualAlt?: string;
}

/**
 * FinalCta — финальный призыв к действию.
 *  - `variant='solid'` (дефолт): сплошная заливка — как было, для старых лендингов;
 *  - `variant='gradient'`: градиентный блок `CTAsecondaryMock` с интерфейсом справа
 *    (opt-in для ритейла и новых лендингов). Правило: `finalcta-gradient`.
 */
export function FinalCta({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = 'solid',
  visualVariant,
  visualSrc,
  visualAlt,
}: FinalCtaProps) {
  if (variant === 'product') {
    return (
      <section
        className={cn(
          'mx-auto w-full max-w-(--container-kaiten)',
          'px-4 py-8 md:px-6 md:py-12 xl:px-0 lg:py-16',
          // Сверху отступа нет — блок примыкает к предыдущей секции.
          'pt-0 md:pt-0 lg:pt-0',
          // Отбивка от подвала: 48 на мобилке, 64 на планшете, 96 на десктопе.
          'pb-12 md:pb-16 lg:pb-24',
        )}
      >
        <CTAproduct
          title={title}
          text={description ?? ''}
          buttonLabel={primaryCta.label}
          buttonHref={primaryCta.href}
          image={{
            src: visualSrc ?? CTA_PRODUCT_IMAGE,
            alt: visualAlt ?? 'Интерфейс Kaiten: задачи, загрузка команды, аналитика и Гант-план',
          }}
        />
      </section>
    );
  }

  if (variant === 'dark') {
    return (
      <section
        className={cn('mx-auto w-full max-w-(--container-kaiten)', 'px-4 py-16 md:px-6 md:py-24 xl:px-0 lg:py-32')}
      >
        <CTAdark
          title={title}
          text={description ?? ''}
          buttonLabel={primaryCta.label}
          buttonHref={primaryCta.href}
          terminalTitle="bash — кайтен@ваш-сервер"
          lines={[
            [{ text: '$ ', kind: 'prompt' }, { text: 'uv tool install git+https://github.com/ViktorOgnev/kaiten-cli.git' }],
            [{ text: 'Resolved 1 package · Installed kaiten-cli', kind: 'key' }],
            [{ text: '$ ', kind: 'prompt' }, { text: 'kaiten cards create --title "Починить flaky-тесты в CI"' }],
            [{ text: '$ ', kind: 'prompt' }, { text: 'kaiten cards update --card-id 482 --column "Готово"' }],
            [{ text: '✓ карточка #482 закрыта', kind: 'ok' }],
            [{ text: 'stats · ', kind: 'key' }, { text: 'http_request_count: 1' }],
          ]}
          showCursor
        />
      </section>
    );
  }

  if (variant === 'gradient') {
    const buttons: CTAButton[] = [
      { label: primaryCta.label, href: primaryCta.href, variant: 'fill' },
      ...(secondaryCta
        ? [{ label: secondaryCta.label, href: secondaryCta.href, variant: 'outline' as const }]
        : []),
    ];
    return (
      <CTAsecondaryMock
        title={title}
        subtitle={description}
        buttons={buttons}
        visual={visualVariant ? <MockVisual variant={visualVariant} /> : undefined}
      />
    );
  }

  return (
    <section
      className={cn('mx-auto w-full max-w-(--container-kaiten)', 'px-4 py-16 md:px-6 md:py-24 xl:px-0 lg:py-32')}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-(--radius-3xl)',
          'px-8 py-12 md:px-16 md:py-16 lg:px-20 lg:py-20',
          'bg-(--color-action-primary) text-(--color-text-inverse)',
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-(--color-text-inverse) opacity-10 blur-3xl"
        />
        <h2
          data-comp="final_cta.title"
          className="max-w-2xl text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl"
        >
          {title}
        </h2>
        {description && (
          <p
            data-comp="final_cta.description"
            className="mt-4 max-w-xl text-lg text-(--color-text-inverse)/80"
          >
            {description}
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Inspect name="final_cta.primaryCta">
            <ButtonLink
              href={primaryCta.href}
              size="lg"
              className="bg-(--color-text-inverse) text-(--color-action-primary) hover:bg-(--color-text-inverse)/90"
            >
              {primaryCta.label}
            </ButtonLink>
          </Inspect>
          {secondaryCta && (
            <Inspect name="final_cta.secondaryCta">
              <ButtonLink
                href={secondaryCta.href}
                size="lg"
                variant="outline"
                className="border-(--color-text-inverse)/40 bg-transparent text-(--color-text-inverse) hover:bg-(--color-text-inverse)/10 hover:text-(--color-text-inverse) hover:border-(--color-text-inverse)/60"
              >
                {secondaryCta.label}
              </ButtonLink>
            </Inspect>
          )}
        </div>
      </div>
    </section>
  );
}
