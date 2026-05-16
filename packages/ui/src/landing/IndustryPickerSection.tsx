'use client';

import { useState } from 'react';
import { Icon } from '../primitives/Icon';
import { cn } from '../primitives/cn';

export interface IndustryProps {
  id: string;
  icon: string;
  name: string;
  summary: string;
  scenario: string;
  keyFeatures: { icon?: string; text: string }[];
  metric?: { value: string; label: string };
}

export interface IndustryPickerSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  industries: IndustryProps[];
}

/**
 * IndustryPickerSection — список отраслей с раскрытием сценария справа.
 * Клик по индустрии — справа раскрывается её сценарий с метрикой и набором
 * ключевых функций. Заменяет вторую FeatureGrid (когда «карточки индустрий»
 * выглядят как очередная сетка из 12 одинаковых блоков).
 */
export function IndustryPickerSection({
  eyebrow,
  title,
  description,
  industries,
}: IndustryPickerSectionProps) {
  const [activeId, setActiveId] = useState(industries[0]?.id ?? '');
  const active = industries.find((i) => i.id === activeId) ?? industries[0];
  if (!active) return null;

  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 py-16 md:px-6 lg:py-24',
      )}
    >
      <div className="mb-10 max-w-2xl">
        {eyebrow && (
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
        {description && (
          <p className="mt-4 text-lg text-(--color-text-secondary)">{description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-10">
        {/* picker list */}
        <ul className="space-y-1.5" role="tablist">
          {industries.map((ind) => {
            const isActive = ind.id === activeId;
            return (
              <li key={ind.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(ind.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-(--radius-xl) border px-4 py-3 text-left transition',
                    isActive
                      ? 'border-(--color-action-primary)/40 bg-(--color-action-primary-soft) shadow-sm'
                      : 'border-(--color-border-default) bg-(--color-surface-card) hover:border-(--color-action-primary)/30 hover:bg-(--color-action-primary-soft)/40',
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-(--radius-lg)',
                      isActive
                        ? 'bg-(--color-action-primary) text-white'
                        : 'bg-(--color-action-primary-soft) text-(--color-text-accent)',
                    )}
                  >
                    <Icon name={ind.icon} className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div
                      className={cn(
                        'text-sm font-semibold',
                        isActive ? 'text-(--color-text-accent)' : 'text-(--color-text-primary)',
                      )}
                    >
                      {ind.name}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-(--color-text-secondary)">
                      {ind.summary}
                    </div>
                  </div>
                  <Icon
                    name="ChevronRight"
                    className={cn(
                      'h-4 w-4 shrink-0 transition',
                      isActive ? 'text-(--color-text-accent)' : 'text-(--color-text-secondary)',
                    )}
                    strokeWidth={2}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* scenario panel */}
        <div
          className={cn(
            'rounded-(--radius-3xl) border border-(--color-border-default) bg-(--color-surface-card)',
            'p-6 shadow-[0_30px_80px_-30px_rgba(125,76,207,0.20)] md:p-8',
          )}
        >
          <div className="flex flex-wrap items-start gap-4">
            <span
              className={cn(
                'inline-flex h-12 w-12 items-center justify-center rounded-(--radius-2xl)',
                'bg-(--color-action-primary-soft) text-(--color-text-accent)',
              )}
            >
              <Icon name={active.icon} className="h-6 w-6" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-2xl font-semibold leading-tight text-(--color-text-primary) md:text-3xl">
                {active.name}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-(--color-text-secondary)">
                {active.scenario}
              </p>
            </div>
            {active.metric && (
              <div className="rounded-(--radius-xl) bg-(--color-surface-section) px-3 py-2 text-right">
                <div className="text-xl font-bold text-(--color-text-accent)">
                  {active.metric.value}
                </div>
                <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">
                  {active.metric.label}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <div className="mb-3 text-xs font-medium uppercase tracking-wide text-(--color-text-secondary)">
              Что используют чаще всего
            </div>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {active.keyFeatures.map((f, i) => (
                <li
                  key={i}
                  className={cn(
                    'flex items-start gap-2.5 rounded-(--radius-lg) border border-(--color-border-default)',
                    'bg-(--color-surface-page) px-3 py-2',
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md',
                      'bg-(--color-action-primary-soft) text-(--color-text-accent)',
                    )}
                  >
                    <Icon name={f.icon ?? 'Check'} className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm leading-snug text-(--color-text-primary)">{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
