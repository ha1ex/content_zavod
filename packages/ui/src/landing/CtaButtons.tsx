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
  /** Убрать верхний отступ секции — когда кнопки идут сразу за предыдущим блоком. */
  flushTop?: boolean;
  /**
   * Нижний отступ секции на десктопе — 96px вместо 48px. Opt-in: нужен,
   * когда после кнопки начинается новый смысловой блок.
   */
  spaceBottom?: boolean;
  /**
   * Компактные отступы секции: 24/48px на мобилке и 32/64px на планшете
   * вместо 40/40. Нужно, когда кнопка отделяет блоки и сверху уже есть воздух.
   * Opt-in.
   */
  tightSpacing?: boolean;
}

/**
 * Одиночная (или пара) CTA-кнопка по центру между секциями — без карточки,
 * заголовка и фона. Для ТЗ, где между блоками стоит просто центрированная
 * кнопка «Попробовать бесплатно». Для баннера с заголовком/подложкой — CtaBanner.
 */
export function CtaButtons({
  primaryCta,
  secondaryCta,
  flushTop,
  spaceBottom,
  tightSpacing,
}: CtaButtonsProps) {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'flex justify-center px-4 pt-6 md:px-6 md:pt-10 xl:px-0 lg:pt-12',
        tightSpacing && 'pt-6 pb-12 md:pt-8 md:pb-16',
        flushTop && 'pt-0 md:pt-0 lg:pt-0',
        spaceBottom && 'lg:pb-24',
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
