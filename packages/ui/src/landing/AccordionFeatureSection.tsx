'use client';

import { useState } from 'react';
import { ButtonLink } from '../primitives/ButtonLink';
import { Icon } from '../primitives/Icon';
import { Inspect } from '../primitives/Inspect';
import { cn } from '../primitives/cn';
import { MockVisual, type MockVariant } from './mocks';

export interface AccordionFeatureItemProps {
  id: string;
  title: string;
  description: string;
  icon?: string;
  mockVariant: MockVariant;
}

export interface AccordionFeatureSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: AccordionFeatureItemProps[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Сторона мока. По умолчанию 'right'. */
  mediaPosition?: 'left' | 'right';
}

/**
 * AccordionFeatureSection — секция «заголовок + аккордеон фич слева + синхронный
 * mock справа». Каждый пункт раскрывается (описание), а mock справа меняется под
 * активный пункт. Один пункт всегда раскрыт. Вертикальная альтернатива
 * TabbedFeatureSection: удобно, когда фич 3–5 и у каждой — свой интерфейсный mock
 * (статусы заказа, загрузка участков, отчёт и т.п.), но городить N×MediaCopy не хочется.
 */
export function AccordionFeatureSection({
  eyebrow,
  title,
  description,
  items,
  primaryCta,
  secondaryCta,
  mediaPosition = 'right',
}: AccordionFeatureSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex] ?? items[0];

  const media = (
    <div className="flex items-center justify-center overflow-hidden rounded-(--radius-3xl) bg-gradient-to-br from-(--color-action-primary-soft) to-(--color-surface-section) p-5 md:p-8">
      <MockVisual variant={active?.mockVariant} />
    </div>
  );

  const panel = (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = activeIndex === i;
        return (
          <Inspect
            as="div"
            key={item.id}
            name={`accordion_feature.items[${i}]`}
            className={cn(
              'overflow-hidden rounded-(--radius-xl) border transition-colors duration-(--duration-base) ease-(--ease-ui)',
              isOpen
                ? 'border-(--color-action-primary) bg-(--color-action-primary-soft)'
                : 'border-(--color-border-default) bg-(--color-surface-card)',
            )}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-expanded={isOpen}
              className={cn(
                'flex w-full items-center justify-between gap-3 px-5 py-4 text-left font-medium',
                isOpen ? 'text-(--color-text-accent)' : 'text-(--color-text-primary)',
              )}
            >
              <span className="flex items-center gap-2.5">
                {item.icon && <Icon name={item.icon} className="h-5 w-5 shrink-0" strokeWidth={2} />}
                <span data-comp={`accordion_feature.items[${i}].title`}>{item.title}</span>
              </span>
              <Icon
                name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                className="h-5 w-5 shrink-0 text-(--color-text-secondary)"
                strokeWidth={2}
              />
            </button>
            {isOpen && (
              <p
                data-comp={`accordion_feature.items[${i}].description`}
                className="px-5 pb-5 text-base leading-relaxed text-(--color-text-secondary)"
              >
                {item.description}
              </p>
            )}
          </Inspect>
        );
      })}
    </div>
  );

  return (
    <section className={cn('mx-auto w-full max-w-(--container-kaiten)', 'px-4 py-16 md:px-6 lg:py-24')}>
      <div className="mb-10 max-w-2xl">
        {eyebrow && (
          <p
            data-comp="accordion_feature.eyebrow"
            className="mb-3 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)"
          >
            {eyebrow}
          </p>
        )}
        <h2 data-comp="accordion_feature.title" className="text-3xl font-semibold leading-tight md:text-4xl">
          {title}
        </h2>
        {description && (
          <p data-comp="accordion_feature.description" className="mt-4 text-lg text-(--color-text-secondary)">
            {description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className={cn('min-w-0', mediaPosition === 'left' ? 'order-2 lg:order-2' : 'order-2 lg:order-1')}>{panel}</div>
        <div className={cn('min-w-0', mediaPosition === 'left' ? 'order-1 lg:order-1' : 'order-1 lg:order-2')}>{media}</div>
      </div>

      {(primaryCta || secondaryCta) && (
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {primaryCta && (
            <ButtonLink size="lg" href={primaryCta.href}>
              {primaryCta.label}
            </ButtonLink>
          )}
          {secondaryCta && (
            <ButtonLink variant="outline" size="lg" href={secondaryCta.href}>
              {secondaryCta.label}
            </ButtonLink>
          )}
        </div>
      )}
    </section>
  );
}
