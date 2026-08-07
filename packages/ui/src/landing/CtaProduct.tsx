import CTAproduct from './mocks/CTAproduct';
import { Inspect } from '../primitives/Inspect';
import { cn } from '../primitives/cn';

export interface CtaProductProps {
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string } | null;
  /** Не задана — эталонный скриншот продукта из мока `CTAproduct`. */
  image?: { src: string; alt?: string };
}

/**
 * Секция-обёртка над моком `CTAproduct` — цветной CTA-блок с иллюстрацией
 * продукта справа. Вертикальные отступы по шкале DS для цветных CTA:
 * 128 / 96 / 64.
 */
export function CtaProduct({
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
}: CtaProductProps) {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        // Сверху половина шкалы: над блоком уже стоит сетка фич со своим
        // нижним отступом, полные 128 складывались в провал.
        'px-4 pt-8 pb-16 md:px-6 md:pt-12 md:pb-24 xl:px-0 lg:pt-16 lg:pb-32',
      )}
    >
      <Inspect name="cta_product">
        <CTAproduct
          title={title}
          text={description}
          buttonLabel={primaryCta.label}
          buttonHref={primaryCta.href}
          secondaryButton={secondaryCta}
          image={image ? { src: image.src, alt: image.alt ?? '' } : undefined}
        />
      </Inspect>
    </section>
  );
}
