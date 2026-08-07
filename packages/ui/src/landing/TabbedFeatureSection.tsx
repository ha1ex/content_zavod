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
  /**
   * Хендофф-режим: рендерим переключаемые табы БЕЗ JS — на CSS-радио
   * (скрытые `<input type=radio>` + `<label>`-кнопки + `:checked ~`). В разметку
   * попадают моки всех вкладок, но виден только выбранный — верстальщик видит
   * настоящий таб-виджет. Обычный (React) режим остаётся дефолтом.
   */
  staticTabs?: boolean;
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
  staticTabs = false,
}: TabbedFeatureSectionProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? '');
  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.id === activeId),
  );
  const active = tabs[activeIndex] ?? tabs[0];
  if (!active) return null;

  // Хендофф-режим: переключаемые табы для статики. Обычные кнопки + панели с
  // data-атрибутами; переключение делает крошечный ванильный скрипт, который
  // static-handoff впрыскивает перед </body>. Активная вкладка — [data-active],
  // скрытые панели — inline display:none (панель 0 видна сразу, без вспышки).
  if (staticTabs) {
    const ns = `kt-${(tabs[0]?.id ?? 'x').replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const css =
      `.${ns} .ktl{display:inline-flex;align-items:center;gap:8px;cursor:pointer;border:0;` +
      `background:transparent;font-family:inherit;border-radius:var(--radius-xl);padding:8px 16px;` +
      `font-size:14px;font-weight:500;color:var(--color-text-secondary);` +
      `transition:background .15s ease,color .15s ease}\n` +
      `.${ns} .ktl:hover{color:var(--color-text-primary)}\n` +
      `.${ns} .ktl[data-active]{background:var(--color-surface-page);color:var(--color-text-primary);` +
      `box-shadow:0 1px 2px rgba(0,0,0,.05)}\n` +
      `.${ns} .ktp{display:grid}\n`;

    return (
      <section
        data-kt-tabs=""
        className={cn(
          ns,
          'mx-auto w-full max-w-(--container-kaiten)',
          'px-4 py-8 md:px-6 md:py-12 xl:px-0 lg:py-16',
        )}
      >
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <div className="mb-10 max-w-2xl">
          {eyebrow && (
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
          {description && (
            <p className="mt-4 text-lg text-(--color-text-primary)">{description}</p>
          )}
        </div>

        {/* панель кнопок-вкладок */}
        <div
          className={cn(
            'ktlbar mb-8 inline-flex max-w-full flex-wrap gap-1 rounded-(--radius-2xl)',
            'bg-(--color-surface-section) p-1',
          )}
          role="tablist"
        >
          {tabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              className="ktl"
              data-kt-tab={String(i)}
              {...(i === 0 ? { 'data-active': '' } : {})}
            >
              {t.icon && <Icon name={t.icon} className="h-4 w-4" strokeWidth={2} />}
              {t.label}
            </button>
          ))}
        </div>

        {/* панели контента: текст + мок; видна только активная (переключает скрипт) */}
        <div className="ktpanels">
          {tabs.map((t, i) => (
            <div
              key={t.id}
              data-kt-panel={String(i)}
              style={i === 0 ? undefined : { display: 'none' }}
              className="ktp grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16"
            >
              <div className="order-2 lg:order-1">
                {t.eyebrow && (
                  <p className="mb-3 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)">
                    {t.eyebrow}
                  </p>
                )}
                <h3 className="text-2xl font-semibold leading-tight md:text-3xl">{t.title}</h3>
                {t.description && (
                  <p className="mt-4 text-lg leading-relaxed text-(--color-text-primary)">
                    {t.description}
                  </p>
                )}
                {t.checklist && t.checklist.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {t.checklist.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className={cn(
                            'mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                            'bg-(--color-action-primary-soft) text-(--color-text-accent)',
                          )}
                        >
                          <Icon name={item.icon ?? 'Check'} className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </span>
                        <span className="text-base leading-relaxed text-(--color-text-primary)">
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {t.primaryCta && (
                  <div className="mt-8">
                    <ButtonLink size="lg" href={t.primaryCta.href}>
                      {t.primaryCta.label}
                    </ButtonLink>
                  </div>
                )}
              </div>
              <div className="order-1 lg:order-2">
                <MockVisual variant={t.mockVariant} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 py-12 md:px-6 md:py-16 xl:px-0 lg:py-24',
      )}
    >
      <div className="mb-6 max-w-2xl text-left md:mx-auto md:mb-8 md:text-center lg:mb-12 lg:max-w-4xl">
        {eyebrow && (
          <p
            data-comp="tabbed_feature.eyebrow"
            className="mb-3 text-sm font-medium uppercase text-(--color-text-accent)"
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
          'bg-(--color-surface-section) p-1',
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
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        {/* левая колонка: все вкладки стопкой в одной grid-ячейке — высота
            равна самой высокой, поэтому при переключении блок не прыгает */}
        <div className="order-2 grid lg:order-1">
          {tabs.map((t, idx) => {
            const isActive = t.id === activeId;
            return (
              <div
                key={t.id}
                aria-hidden={!isActive}
                className={cn('[grid-area:1/1]', !isActive && 'invisible')}
              >
                {t.eyebrow && (
                  <p
                    data-comp={`tabbed_feature.tabs[${idx}].eyebrow`}
                    className="mb-3 text-sm font-medium uppercase text-(--color-text-accent)"
                  >
                    {t.eyebrow}
                  </p>
                )}
                <h3
                  data-comp={`tabbed_feature.tabs[${idx}].title`}
                  className="text-2xl font-semibold leading-tight md:text-3xl"
                >
                  {t.title}
                </h3>
                {t.description && (
                  <p
                    data-comp={`tabbed_feature.tabs[${idx}].description`}
                    className="mt-4 text-lg leading-relaxed text-(--color-text-primary)"
                  >
                    {t.description}
                  </p>
                )}
                {t.checklist && t.checklist.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {t.checklist.map((item, i) => (
                      <Inspect
                        as="li"
                        key={i}
                        name={`tabbed_feature.tabs[${idx}].checklist[${i}]`}
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
                          data-comp={`tabbed_feature.tabs[${idx}].checklist[${i}].text`}
                          className="text-base leading-relaxed text-(--color-text-primary)"
                        >
                          {item.text}
                        </span>
                      </Inspect>
                    ))}
                  </ul>
                )}
                {t.primaryCta && (
                  <div className="mt-8">
                    <Inspect name={`tabbed_feature.tabs[${idx}].primaryCta`}>
                      <ButtonLink size="lg" href={t.primaryCta.href}>
                        {t.primaryCta.label}
                      </ButtonLink>
                    </Inspect>
                  </div>
                )}
              </div>
            );
          })}
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
