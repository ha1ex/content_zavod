'use client';

import { useState } from 'react';
import { Icon } from '../primitives/Icon';
import { APP_ICONS } from './HeroScreenApp';
import { cn } from '../primitives/cn';
import { AccentText } from '../primitives/AccentText';
import { MockVisual, type MockVariant } from './mocks';

export interface ViewSwitcherItem {
  id: string;
  label: string;
  icon?: string;
  mockVariant: MockVariant;
  /** Скриншот вида вместо мока: путь из public и alt. Перекрывает mockVariant. */
  image?: { src: string; alt?: string };
}

export interface ViewSwitcherProps {
  eyebrow?: string;
  title: string;
  /** Кусок заголовка фирменным фиолетовым. */
  accentWord?: string;
  description?: string;
  items: ViewSwitcherItem[];
  /** Подложка под моком: 'soft' (дефолт) — лиловая заливка; 'gradient' — градиент лаванда → голубой, как в CTA-блоках. */
  background?: 'soft' | 'gradient';
  /** Убрать нижний отступ секции на всех ширинах. Opt-in. */
  flushBottom?: boolean;
  /** Верхний отступ секции 128px на всех ширинах. Opt-in. */
  spaceTopTablet?: boolean;
  /** Верхний отступ секции: 96px на планшете, 128px на десктопе. Opt-in. */
  spaceTopDesktop?: boolean;
}

/** Значки, у которых рисунок занимает весь viewBox: их ставим на 2px мельче. */
const BULKY_ICONS = new Set(['kaiten:grid', 'kaiten:calendarO']);

/** Иконка таба: `kaiten:<имя>` — заливной значок продукта, иначе имя из Lucide. */
function TabIcon({ name }: { name: string }) {
  if (name.startsWith('kaiten:')) {
    const d = (APP_ICONS as Record<string, string>)[name.slice(7)];
    if (!d) return null;
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn(BULKY_ICONS.has(name) ? 'h-3.5 w-3.5' : 'h-4 w-4')}>
        <path d={d} />
      </svg>
    );
  }
  return <Icon name={name} className="h-4 w-4" strokeWidth={2} />;
}

/**
 * ViewSwitcher — центрированный заголовок, под ним переключатель-пилюли и
 * крупный мок выбранного пункта на лиловой подложке. Для блоков, где пункты —
 * это короткие подписи без пояснений (виды пространства: доски, списки,
 * таблицы…), и текст рядом с моком не нужен. Если у пунктов есть заголовок и
 * описание — это TabbedFeatureSection.
 */
export function ViewSwitcher({ eyebrow, title, accentWord, description, items, background = 'soft', flushBottom = false, spaceTopTablet = false, spaceTopDesktop = false }: ViewSwitcherProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten) px-4 py-12 pt-16 md:px-6 md:py-16 xl:px-0 lg:py-24',
        flushBottom && 'pb-0 md:pb-0 lg:pb-0',
        spaceTopTablet && 'pt-32 md:pt-32 lg:pt-32',
        spaceTopDesktop && 'md:pt-24 lg:pt-32',
      )}
    >
      <div className="mx-auto mb-6 max-w-6xl text-left md:mb-8 md:text-center">
        {eyebrow && (
          <p data-comp="view_switcher.eyebrow" className="mb-3 text-sm font-medium uppercase text-(--color-text-accent)">
            {eyebrow}
          </p>
        )}
        <h2 data-comp="view_switcher.title" className="text-2xl font-semibold leading-tight md:whitespace-pre-line md:text-3xl lg:text-4xl">
          <AccentText text={title} accentWord={accentWord} />
        </h2>
        {description && (
          <p data-comp="view_switcher.description" className="mx-auto mt-4 max-w-2xl text-base text-(--color-text-primary) md:text-lg">
            {description}
          </p>
        )}
      </div>

      {/* мобилка: табы в одну строку с листанием вбок; с планшета — по центру с переносом */}
      <div className="mb-8 flex md:justify-center">
        <div
          role="tablist"
          className="inline-flex max-w-full flex-nowrap gap-1 overflow-x-auto rounded-(--radius-lg) bg-(--color-surface-section) p-1 [scrollbar-width:none] md:flex-wrap md:justify-center md:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {items.map((it, idx) => {
            const active = it.id === activeId;
            return (
              <button
                key={it.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveId(it.id)}
                data-comp={`view_switcher.items[${idx}].label`}
                className={cn(
                  'inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-(--radius-md) px-4 py-2 text-sm font-medium transition',
                  active
                    ? 'bg-(--color-action-primary) text-white shadow-sm'
                    : 'text-(--color-text-secondary) hover:bg-(--color-surface-page) hover:text-(--color-text-accent)',
                )}
              >
                {it.icon && <TabIcon name={it.icon} />}
                {it.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={cn(
          'rounded-[12px] px-4 py-6 md:rounded-(--radius-2xl) md:px-10 md:py-10 lg:px-16 lg:py-14',
          background === 'gradient'
            ? 'bg-[linear-gradient(180deg,#ece0ff,#cdecff)] lg:bg-[linear-gradient(90deg,#ece0ff,#cdecff)]'
            : 'bg-(--color-violet-12)',
        )}
      >
        {/* все моки в одной grid-ячейке: высота равна самому высокому, блок не прыгает */}
        {/* minmax(0,1fr): иначе колонка растягивается под 760px мока и он вылезает за экран */}
        <div className="mx-auto grid max-w-[760px] grid-cols-[minmax(0,1fr)] [overflow:clip] [overflow-clip-margin:16px]">
          {items.map((it, idx) => (
            <div
              key={it.id}
              aria-hidden={it.id !== activeId}
              data-comp={`view_switcher.items[${idx}].mockVariant`}
              className={cn('[grid-area:1/1]', it.id !== activeId && 'invisible')}
            >
              {it.image ? (
                <img src={it.image.src} alt={it.image.alt ?? ''} loading="lazy" className="block h-auto w-full rounded-(--radius-lg) md:rounded-(--radius-xl)" />
              ) : (
                <MockVisual variant={it.mockVariant} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
