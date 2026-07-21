import { ButtonLink } from '../primitives/ButtonLink';
import { Inspect } from '../primitives/Inspect';
import { cn } from '../primitives/cn';

export interface CtaButtonsCtaProps {
  label: string;
  href: string;
}

export interface CtaButtonsProps {
  primaryCta: CtaButtonsCtaProps;
  secondaryCta?: CtaButtonsCtaProps | null;
}

/**
 * Одиночная (или пара) CTA-кнопка по центру между секциями — без карточки,
 * заголовка и фона. Для ТЗ, где между блоками стоит просто центрированная
 * кнопка «Попробовать бесплатно». Для баннера с заголовком/подложкой — CtaBanner.
 */
export function CtaButtons({ primaryCta, secondaryCta }: CtaButtonsProps) {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'flex justify-center px-4 py-10 md:px-6 xl:px-0 lg:py-12',
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Inspect name="cta_buttons.primaryCta">
          <ButtonLink size="lg" href={primaryCta.href}>
            {primaryCta.label}
          </ButtonLink>
        </Inspect>
        {secondaryCta && (
          <Inspect name="cta_buttons.secondaryCta">
            <ButtonLink variant="outline" size="lg" href={secondaryCta.href}>
              {secondaryCta.label}
            </ButtonLink>
          </Inspect>
        )}
      </div>
    </section>
  );
}
