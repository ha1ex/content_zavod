'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ButtonLink } from '../primitives/ButtonLink';
import { Inspect } from '../primitives/Inspect';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { MockVisual, type MockVariant } from './mocks/MockVisual';
import { FeatureTile, FeatureTilesStyle } from './mocks/FeatureTile';

export interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
  /** Опциональное компактное мок-превью доски внутри карточки. */
  mockVariant?: MockVariant;
  /**
   * Подпись плитки из галереи мини-мокапов фич (`FeatureMocksV01`), напр.
   * «Канбан-доски». Когда задана — вместо иконки рисуется интерфейсный
   * мини-мокап фичи. Неизвестная подпись — молча падаем обратно на иконку.
   * Приоритет ниже `mockVariant`.
   */
  featureTile?: string;
  /**
   * Растровая иллюстрация-скриншот вместо мока: путь из `public` и alt.
   * Высший приоритет — перекрывает `mockVariant` и `featureTile`.
   * Подложки под картинкой нет (правило DS «Иллюстрации без подложки»).
   */
  image?: { src: string; alt?: string };
  /**
   * Иллюстрация не над текстом, а сбоку: на десктопе текст слева, картинка
   * справа; на узких экранах картинка уходит под текст. Для широких карточек.
   */
  imageAside?: boolean;
  /**
   * Карточка занимает всю ширину ряда — уезжает под остальные отдельной строкой.
   * В треке на планшете и мобилке не влияет: там всё листается по одной.
   */
  wide?: boolean;
  /**
   * Карточка работает как CTA: под описанием встают кнопки. Нужно там, где
   * призыв к действию живёт внутри блока, а не отдельной секцией под ним.
   */
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string } | null;
}

export interface FeatureGridProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: FeatureItemProps[];
  columns?: 2 | 3 | 4;
  /**
   * На планшете и мобилке карточки листаются вбок стрелками вместо того,
   * чтобы вытягиваться в длинный столбец. Включается осознанно: нужно там,
   * где карточек много (6+), и мешает там, где их две-три.
   */
  slider?: boolean;
  /**
   * Убрать верхний отступ секции — когда блок сверху уже несёт свою
   * вертикальную шкалу и просвет складывается вдвое.
   */
  flushTop?: boolean;
}

/**
 * Дефис внутри латинского составного слова («on-premise») браузер считает
 * законным местом переноса и рвёт слово пополам. Склеиваем такие токены
 * в неразрывные — переносы остаются только по пробелам.
 */
function keepHyphenated(text: string) {
  return text.split(/(\s+)/).map((chunk, i) =>
    /\S-\S/.test(chunk) ? (
      <span key={i} className="whitespace-nowrap">
        {chunk}
      </span>
    ) : (
      chunk
    ),
  );
}

/** Кнопки внутри карточки-CTA. Отступ сверху — inner по шкале DS. */
function FeatureCtas({ item, idx }: { item: FeatureItemProps; idx: number }) {
  if (!item.primaryCta) return null;
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-8">
      <Inspect name={`features.items[${idx}].primaryCta`}>
        <ButtonLink size="lg" href={item.primaryCta.href}>
          {item.primaryCta.label}
        </ButtonLink>
      </Inspect>
      {item.secondaryCta && (
        <Inspect name={`features.items[${idx}].secondaryCta`}>
          <ButtonLink variant="outline" size="lg" href={item.secondaryCta.href}>
            {item.secondaryCta.label}
          </ButtonLink>
        </Inspect>
      )}
    </div>
  );
}

const colsClass: Record<NonNullable<FeatureGridProps['columns']>, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
};

/** Скрываем системный скроллбар у трека — листаем стрелками и свайпом. */
const TRACK_STYLE = `
.fg-track{scrollbar-width:none;-ms-overflow-style:none}
.fg-track::-webkit-scrollbar{display:none}
`;

export function FeatureGrid({
  eyebrow,
  title,
  description,
  items,
  columns = 3,
  slider = false,
  flushTop = false,
}: FeatureGridProps) {
  // На планшете и мобилке карточки не помещаются в ряд — трек листается
  // свайпом и стрелками под ним. На десктопе это обычная сетка.
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const [idx, setIdx] = useState(0);
  const [total, setTotal] = useState(items.length);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 1);
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.getBoundingClientRect().width + 16 : 1;
    // Знаменатель — сколько всего карточек, а не сколько «страниц» прокрутки:
    // «1 / 6» читается как позиция в списке, а не как номер экрана.
    setTotal(Math.max(1, el.children.length));
    setIdx(Math.round(el.scrollLeft / step));
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    el?.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el?.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync, items.length]);

  const go = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.getBoundingClientRect().width + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 md:px-6 xl:px-0',
        !flushTop && 'pt-12 md:pt-16 lg:pt-24',
      )}
    >
      {/* На планшете шапке даём ту же ширину, что на десктопе: с 2xl заголовок
          ломался на две строки уже там, где помещается в одну. */}
      <div className="mb-6 max-w-2xl text-left md:mx-auto md:mb-8 md:max-w-4xl md:text-center lg:mb-12 lg:max-w-6xl">
        {eyebrow && (
          <p
            data-comp="features.eyebrow"
            className="mb-3 text-sm font-medium uppercase text-(--color-text-accent)"
          >
            {eyebrow}
          </p>
        )}
        <h2
          data-comp="features.title"
          className="text-3xl font-semibold leading-tight md:text-4xl"
        >
          {title}
        </h2>
        {description && (
          <p
            data-comp="features.description"
            className="mt-4 text-lg text-(--color-text-primary)"
          >
            {description}
          </p>
        )}
      </div>

      {items.some((item) => item.featureTile) && <FeatureTilesStyle />}

      <style dangerouslySetInnerHTML={{ __html: TRACK_STYLE }} />

      <div
        ref={trackRef}
        className={cn(
          slider
            ? cn(
                'fg-track',
                // мобилка/планшет — горизонтальный трек со снапом
                'flex snap-x snap-mandatory gap-4 overflow-x-auto md:gap-6',
                // десктоп — обычная сетка
                'lg:grid lg:gap-6 lg:overflow-visible xl:gap-8',
              )
            : 'grid grid-cols-1 gap-4 md:gap-6 xl:gap-8',
          colsClass[columns],
        )}
      >
        {items.map((item, i) => (
          <Inspect
            as="div"
            key={i}
            name={`features.items[${i}]`}
            className={cn(
              // Внутренние отступы по шкале DS: 24 / 32 / 48.
              'rounded-(--radius-xl) bg-(--color-surface-section) p-6 md:p-8 lg:rounded-(--radius-2xl)',
              // в треке карточка держит свою ширину и цепляется снапом
              // Ширина карточки — доля трека, чтобы в окно попадало целое число
              // карточек: на мобилке одна, на планшете две. Фиксированная ширина
              // резала следующую карточку краем.
              // На мобилке ширина фиксированная — 318, как у карточки отзыва;
              // на узких экранах ужимается до ширины трека.
              slider && 'w-[318px] max-w-full shrink-0 snap-start md:w-[calc(50%-12px)] lg:w-auto lg:shrink',
              // широкая карточка занимает весь ряд — уходит отдельной строкой вниз
              item.wide && 'md:w-full lg:col-span-full',
              // текст и картинка бок о бок
              item.imageAside && (item.image || item.featureTile) && 'lg:flex lg:items-center lg:gap-8',
            )}
          >
            {item.imageAside && (item.image || item.featureTile) ? (
              // Иллюстрация сбоку: порядок в разметке — текст, потом картинка,
              // поэтому на узких экранах она сама уходит вниз.
              <>
                <div className="lg:order-1 lg:min-w-0 lg:flex-1">
                  <h3 data-comp={`features.items[${i}].title`} className="text-lg font-semibold leading-snug">
                    {keepHyphenated(item.title)}
                  </h3>
                  <p data-comp={`features.items[${i}].description`} className="mt-2 text-base leading-relaxed text-(--color-text-primary)">
                    {item.description}
                  </p>
                  <FeatureCtas item={item} idx={i} />
                </div>
                {/* Размер как у плиток галереи фич — 240px, чтобы иллюстрации
                    в разных карточках читались в одном масштабе. */}
                {/* Пока картинка под текстом (до lg) — по центру карточки;
                    сбоку от текста центрировать нечего. */}
                <div className="mt-6 mx-auto w-[240px] max-w-full shrink-0 overflow-hidden rounded-(--radius-xl) lg:order-2 lg:mx-0 lg:mt-0">
                  {item.image ? (
                    <img src={item.image.src} alt={item.image.alt ?? ''} loading="lazy" className="block h-auto w-full" />
                  ) : (
                    <FeatureTile caption={item.featureTile!} withStyle={false} />
                  )}
                </div>
              </>
            ) : item.image ? (
              // Скриншот продукта: лежит на фоне карточки, без подложки и рамки.
              <div className="mb-6 w-full overflow-hidden rounded-(--radius-xl) lg:mb-8">
                <img
                  src={item.image.src}
                  alt={item.image.alt ?? ''}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              </div>
            ) : item.mockVariant ? (
              <div className="mb-6 lg:mb-8">
                <MockVisual variant={item.mockVariant} />
              </div>
            ) : item.featureTile ? (
              // Подложки под иллюстрацией нет: мок лежит прямо на фоне карточки.
              // Правило DS «Иллюстрации без подложки».
              <div
                aria-hidden
                className={cn(
                  'mb-6 flex w-full items-center justify-center lg:mb-8',
                )}
              >
                <FeatureTile caption={item.featureTile} withStyle={false} />
              </div>
            ) : (
              <div
                className={cn(
                  'mb-6 inline-flex h-11 w-11 items-center justify-center lg:mb-8',
                  'rounded-(--radius-xl) bg-(--color-action-primary-soft) text-(--color-text-accent)',
                )}
              >
                <Icon name={item.icon} className="h-5 w-5" />
              </div>
            )}
            {!(item.imageAside && (item.image || item.featureTile)) && (
              <>
                <h3
                  data-comp={`features.items[${i}].title`}
                  className="text-lg font-semibold leading-snug"
                >
                  {keepHyphenated(item.title)}
                </h3>
                <p
                  data-comp={`features.items[${i}].description`}
                  className="mt-2 text-base leading-relaxed text-(--color-text-primary)"
                >
                  {item.description}
                </p>
                <FeatureCtas item={item} idx={i} />
              </>
            )}
          </Inspect>
        ))}
      </div>

      {/* Стрелки листания — только там, где карточки не помещаются в ряд
          (планшет и мобилка). Вертикальный отступ — inner по шкале DS. */}
      {slider && scrollable && (
        <div
          className="my-6 flex items-center justify-center gap-3.5 md:my-8 lg:hidden"
          role="group"
          aria-label="Листать карточки"
        >
          <button
            type="button"
            aria-label="Предыдущая карточка"
            disabled={atStart}
            onClick={() => go(-1)}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full border transition',
              'border-(--color-border-default) bg-(--color-surface-card) text-(--color-text-accent)',
              // Ховер как у остальных контурных кнопок DS.
              'enabled:hover:border-(--color-action-primary)/48 enabled:hover:bg-(--color-action-primary-soft)',
              'disabled:text-(--color-border-default)',
            )}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <span className="min-w-[52px] text-center text-base text-(--color-text-secondary)">
            <b className="font-medium text-(--color-text-primary)">{Math.min(idx + 1, total)}</b> / {total}
          </span>
          <button
            type="button"
            aria-label="Следующая карточка"
            disabled={atEnd}
            onClick={() => go(1)}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full border transition',
              'border-(--color-border-default) bg-(--color-surface-card) text-(--color-text-accent)',
              // Ховер как у остальных контурных кнопок DS.
              'enabled:hover:border-(--color-action-primary)/48 enabled:hover:bg-(--color-action-primary-soft)',
              'disabled:text-(--color-border-default)',
            )}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      )}
    </section>
  );
}
