'use client';

import { useState } from 'react';
import { ButtonLink } from '../primitives/ButtonLink';
import { Icon } from '../primitives/Icon';
import { Inspect } from '../primitives/Inspect';
import { cn } from '../primitives/cn';
import { MockVisual, type MockVariant } from './mocks';

export interface TabbedFeatureTabProps {
  id: string;
  label: string;
  icon?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  checklist?: { icon?: string; text: string }[];
  primaryCta?: { label: string; href: string };
  mockVariant: MockVariant;
}

export interface TabbedFeatureSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  tabs: TabbedFeatureTabProps[];
}

/**
 * TabbedFeatureSection — секция с горизонтальными табами по ролям/сегментам
 * (например: Продажи / Сервис / Маркетинг). Под выбранным табом — пара
 * mock + текст с чек-листом. Решает проблему «однообразного MediaCopy×N»:
 * вместо вертикального простыни — одна секция, но с интерактивным
 * переключением между сценариями использования.
 */
export function TabbedFeatureSection({
  eyebrow,
  title,
  description,
  tabs,
}: TabbedFeatureSectionProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? '');
  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.id === activeId),
  );
  const active = tabs[activeIndex] ?? tabs[0];
  if (!active) return null;

  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 py-16 md:px-6 xl:px-0 lg:py-24',
      )}
    >
      <div className="mb-10 max-w-2xl">
        {eyebrow && (
          <p
            data-comp="tabbed_feature.eyebrow"
            className="mb-3 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)"
          >
            {eyebrow}
          </p>
        )}
        <h2
          data-comp="tabbed_feature.title"
          className="text-3xl font-semibold leading-tight md:text-4xl"
        >
          {title}
        </h2>
        {description && (
          <p
            data-comp="tabbed_feature.description"
            className="mt-4 text-lg text-(--color-text-primary)"
          >
            {description}
          </p>
        )}
      </div>

      {/* tab bar */}
      <div
        className={cn(
          'mb-8 inline-flex max-w-full flex-wrap gap-1 rounded-(--radius-2xl)',
          'border border-(--color-border-default) bg-(--color-surface-section) p-1',
        )}
        role="tablist"
      >
        {tabs.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === activeId}
            onClick={() => setActiveId(t.id)}
            data-comp={`tabbed_feature.tabs[${idx}].label`}
            className={cn(
              'inline-flex items-center gap-2 rounded-(--radius-xl) px-4 py-2 text-sm font-medium transition',
              t.id === activeId
                ? 'bg-(--color-surface-page) text-(--color-text-primary) shadow-sm'
                : 'text-(--color-text-secondary) hover:text-(--color-text-primary)',
            )}
          >
            {t.icon && <Icon name={t.icon} className="h-4 w-4" strokeWidth={2} />}
            {t.label}
          </button>
        ))}
      </div>

      {/* content panel */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="order-2 lg:order-1">
          {active.eyebrow && (
            <p
              data-comp={`tabbed_feature.tabs[${activeIndex}].eyebrow`}
              className="mb-3 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)"
            >
              {active.eyebrow}
            </p>
          )}
          <h3
            data-comp={`tabbed_feature.tabs[${activeIndex}].title`}
            className="text-2xl font-semibold leading-tight md:text-3xl"
          >
            {active.title}
          </h3>
          {active.description && (
            <p
              data-comp={`tabbed_feature.tabs[${activeIndex}].description`}
              className="mt-4 text-lg leading-relaxed text-(--color-text-primary)"
            >
              {active.description}
            </p>
          )}
          {active.checklist && active.checklist.length > 0 && (
            <ul className="mt-6 space-y-3">
              {active.checklist.map((item, i) => (
                <Inspect
                  as="li"
                  key={i}
                  name={`tabbed_feature.tabs[${activeIndex}].checklist[${i}]`}
                  className="flex items-start gap-3"
                >
                  <span
                    className={cn(
                      'mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                      'bg-(--color-action-primary-soft) text-(--color-text-accent)',
                    )}
                  >
                    <Icon name={item.icon ?? 'Check'} className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <span
                    data-comp={`tabbed_feature.tabs[${activeIndex}].checklist[${i}].text`}
                    className="text-base leading-relaxed text-(--color-text-primary)"
                  >
                    {item.text}
                  </span>
                </Inspect>
              ))}
            </ul>
          )}
          {active.primaryCta && (
            <div className="mt-8">
              <Inspect name={`tabbed_feature.tabs[${activeIndex}].primaryCta`}>
                <ButtonLink size="lg" href={active.primaryCta.href}>
                  {active.primaryCta.label}
                </ButtonLink>
              </Inspect>
            </div>
          )}
        </div>
        <Inspect
          as="div"
          name={`tabbed_feature.tabs[${activeIndex}].mockVariant`}
          className="order-1 lg:order-2"
        >
          <MockVisual variant={active.mockVariant} />
        </Inspect>
      </div>
    </section>
  );
}
