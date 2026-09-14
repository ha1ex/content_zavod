'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '../primitives/Icon';
import { Inspect } from '../primitives/Inspect';
import { cn } from '../primitives/cn';

export type PartnerAccent = 'violet' | 'blue' | 'green' | 'orange' | 'purple';

export interface PartnerTypeProps {
  /** Идентификатор типа — им партнёр ссылается на тип. */
  id: string;
  /** Название типа в фильтре и на бейдже карточки. */
  label: string;
  /** Пояснение под фильтром — что этот партнёр делает для клиента. */
  description?: string;
  /** Цвет бейджа. По умолчанию violet. */
  accent?: PartnerAccent;
  icon?: string;
}

export interface PartnerRegionProps {
  id: string;
  label: string;
}

export interface PartnerItemProps {
  id: string;
  /** Публичное (брендовое) название партнёра. */
  name: string;
  /** Монограмма для плашки, пока нет логотипа. Не задана — считается из name. */
  initials?: string;
  /** Логотип партнёра, когда ассет готов. */
  logoSrc?: string;
  logoAlt?: string;
  /**
   * 'light' — у партнёра только светлая версия логотипа (сайт с тёмной шапкой).
   * Такой логотип кладётся на тёмную плашку, а не перекрашивается: чужой
   * товарный знак менять нельзя. 'dark' (по умолчанию) — логотип для белого фона.
   */
  logoTone?: 'light' | 'dark';
  /** Цвет плашки под светлым логотипом. По умолчанию нейтральный тёмный DS. */
  logoBg?: string;
  /** id типа партнёрства из `types`. */
  type: string;
  /** id региона из `regions`. */
  region?: string;
  /** Город/страна строкой — показывается в мете карточки. */
  location?: string;
  /** Что партнёр делает — 2–4 коротких тега. */
  services?: string[];
  /** Год начала партнёрства. */
  since?: string;
  /** Сайт партнёра, если согласован. Нет ссылки — карточка не кликается. */
  href?: string;
}

export interface PartnerDirectoryProps {
  eyebrow?: string;
  title: string;
  description?: string;
  types: PartnerTypeProps[];
  regions?: PartnerRegionProps[];
  partners: PartnerItemProps[];
  allTypesLabel?: string;
  allRegionsLabel?: string;
  searchPlaceholder?: string;
  emptyLabel?: string;
  /** Сноска под сеткой (условия попадания в каталог, дата обновления). */
  note?: string;
  /** Ссылка-действие в подвале каждой карточки (общая для всех). */
  contactCta?: { label: string; href: string };
}

const ACCENT_BADGE: Record<PartnerAccent, string> = {
  violet: 'bg-(--color-violet-12) text-(--color-violet-100)',
  blue: 'bg-(--color-blue-12) text-(--color-blue-100)',
  green: 'bg-(--color-green-12) text-(--color-green-100)',
  orange: 'bg-(--color-orange-12) text-(--color-orange-100)',
  purple: 'bg-(--color-purple-12) text-(--color-purple-100)',
};

const ACCENT_MONOGRAM: Record<PartnerAccent, string> = {
  violet: 'bg-(--color-violet-12) text-(--color-violet-100)',
  blue: 'bg-(--color-blue-12) text-(--color-blue-100)',
  green: 'bg-(--color-green-12) text-(--color-green-100)',
  orange: 'bg-(--color-orange-12) text-(--color-orange-100)',
  purple: 'bg-(--color-purple-12) text-(--color-purple-100)',
};

/** «7 Красных Линий» → «7К», «Инфосистемы Джет» → «ИД». */
function monogram(name: string): string {
  const words = name
    .replace(/[«»"']/g, '')
    .split(/[\s-]+/)
    .filter(Boolean);
  return words
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

/** «23 партнёра» / «1 партнёр» / «5 партнёров». */
function plural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

const ALL = '__all__';

/**
 * PartnerDirectory — каталог партнёров: фильтры по типу партнёрства и региону,
 * поиск по названию и сетка карточек. Витрина для клиента («у кого купить и
 * кто внедрит»), а не рекрутинговый блок — заявка на партнёрство живёт
 * отдельной секцией ниже.
 *
 * Логотипов у партнёров может ещё не быть: карточка тогда показывает
 * монограмму в цвете типа партнёрства.
 */
export function PartnerDirectory({
  eyebrow,
  title,
  description,
  types,
  regions = [],
  partners,
  allTypesLabel = 'Все типы',
  allRegionsLabel = 'Все регионы',
  searchPlaceholder = 'Поиск по названию',
  emptyLabel = 'По этим условиям партнеров нет. Сбросьте фильтры или напишите нам — подберем вручную',
  note,
  contactCta,
}: PartnerDirectoryProps) {
  const [typeId, setTypeId] = useState<string>(ALL);
  const [regionId, setRegionId] = useState<string>(ALL);
  const [query, setQuery] = useState('');

  const typeById = useMemo(() => new Map(types.map((t) => [t.id, t])), [types]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return partners.filter((p) => {
      if (typeId !== ALL && p.type !== typeId) return false;
      if (regionId !== ALL && p.region !== regionId) return false;
      if (!q) return true;
      const haystack = [p.name, p.location, ...(p.services ?? [])].filter(Boolean).join(' ');
      return haystack.toLowerCase().includes(q);
    });
  }, [partners, typeId, regionId, query]);

  const activeType = typeId === ALL ? undefined : typeById.get(typeId);
  const isFiltered = typeId !== ALL || regionId !== ALL || query.trim() !== '';

  const reset = () => {
    setTypeId(ALL);
    setRegionId(ALL);
    setQuery('');
  };

  const chip = (isActive: boolean) =>
    cn(
      'inline-flex shrink-0 items-center gap-2 rounded-(--radius-full) border px-4 py-2 text-sm transition',
      'duration-(--duration-base) ease-(--ease-ui)',
      isActive
        ? 'border-(--color-action-primary) bg-(--color-action-primary) font-medium text-(--color-text-inverse)'
        : 'border-(--color-border-default) bg-(--color-surface-card) text-(--color-text-primary) hover:border-(--color-action-primary)/48 hover:bg-(--color-action-primary-soft)',
    );

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
            data-comp="partner_directory.eyebrow"
            className="mb-3 text-sm font-medium uppercase text-(--color-text-accent)"
          >
            {eyebrow}
          </p>
        )}
        <h2
          data-comp="partner_directory.title"
          className="text-3xl font-semibold leading-tight md:text-4xl"
        >
          {title}
        </h2>
        {description && (
          <p
            data-comp="partner_directory.description"
            className="mt-4 text-lg text-(--color-text-primary)"
          >
            {description}
          </p>
        )}
      </div>

      {/* фильтры */}
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0">
          <button type="button" className={chip(typeId === ALL)} onClick={() => setTypeId(ALL)}>
            {allTypesLabel}
            <span className="text-xs opacity-70">{partners.length}</span>
          </button>
          {types.map((t, idx) => {
            const count = partners.filter((p) => p.type === t.id).length;
            return (
              <Inspect as="span" key={t.id} name={`partner_directory.types[${idx}]`}>
                <button
                  type="button"
                  className={chip(typeId === t.id)}
                  onClick={() => setTypeId(t.id)}
                  aria-pressed={typeId === t.id}
                >
                  {t.icon && <Icon name={t.icon} className="h-4 w-4" strokeWidth={2} />}
                  {t.label}
                  <span className="text-xs opacity-70">{count}</span>
                </button>
              </Inspect>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
          {regions.length > 0 && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
              <button
                type="button"
                className={cn(
                  'shrink-0 rounded-(--radius-lg) px-3 py-1.5 text-sm transition',
                  regionId === ALL
                    ? 'bg-(--color-action-primary-soft) font-medium text-(--color-text-accent)'
                    : 'text-(--color-text-secondary) hover:text-(--color-text-primary)',
                )}
                onClick={() => setRegionId(ALL)}
              >
                {allRegionsLabel}
              </button>
              {regions.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className={cn(
                    'shrink-0 rounded-(--radius-lg) px-3 py-1.5 text-sm transition',
                    regionId === r.id
                      ? 'bg-(--color-action-primary-soft) font-medium text-(--color-text-accent)'
                      : 'text-(--color-text-secondary) hover:text-(--color-text-primary)',
                  )}
                  onClick={() => setRegionId(r.id)}
                  aria-pressed={regionId === r.id}
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}

          <label className="relative w-full md:w-72">
            <span className="sr-only">{searchPlaceholder}</span>
            <Icon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-text-secondary)"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className={cn(
                'w-full rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-card)',
                'py-2.5 pl-9 pr-3 text-sm text-(--color-text-primary)',
                'placeholder:text-(--color-text-secondary)',
                'focus:border-(--color-action-primary)/48 focus:outline-none',
                'focus:shadow-[0_0_0_4px_rgba(125,76,207,0.14)]',
              )}
            />
          </label>
        </div>

        {activeType?.description && (
          <p className="text-base text-(--color-text-primary) md:text-center">
            {activeType.description}
          </p>
        )}

        <p className="text-sm text-(--color-text-secondary) md:text-center">
          {visible.length}{' '}
          {plural(visible.length, 'партнер', 'партнера', 'партнеров')}
          {visible.length !== partners.length && ` из ${partners.length}`}
        </p>
      </div>

      {/* сетка карточек */}
      {visible.length > 0 ? (
        <ul className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-8">
          {visible.map((p, idx) => (
            <Inspect as="li" key={p.id} name={`partner_directory.partners[${idx}]`}>
              <PartnerCard
                partner={p}
                type={typeById.get(p.type)}
                index={idx}
                contactCta={contactCta}
              />
            </Inspect>
          ))}
        </ul>
      ) : (
        <div
          className={cn(
            'mt-6 flex flex-col items-center gap-4 rounded-(--radius-xl) border border-dashed',
            'border-(--color-border-default) px-6 py-12 text-center md:mt-8 lg:mt-12 lg:rounded-(--radius-2xl)',
          )}
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-(--radius-full) bg-(--color-action-primary-soft) text-(--color-text-accent)">
            <Icon name="search-x" className="h-5 w-5" />
          </span>
          <p className="max-w-md text-base text-(--color-text-primary)">{emptyLabel}</p>
          <button type="button" onClick={reset} className={cn(
              'inline-flex h-11 items-center justify-center rounded-(--radius-lg) border px-4',
              'border-(--color-border-default) bg-(--color-surface-card) text-base font-medium',
              'text-(--color-text-accent) transition duration-(--duration-base) ease-(--ease-ui)',
              'hover:border-(--color-action-primary)/48 hover:bg-(--color-action-primary-soft)',
            )}>
            Сбросить фильтры
          </button>
        </div>
      )}

      {isFiltered && visible.length > 0 && (
        <div className="mt-6 flex justify-center">
          <button type="button" onClick={reset} className={cn(
              'inline-flex h-11 items-center justify-center rounded-(--radius-lg) border px-4',
              'border-(--color-border-default) bg-(--color-surface-card) text-base font-medium',
              'text-(--color-text-accent) transition duration-(--duration-base) ease-(--ease-ui)',
              'hover:border-(--color-action-primary)/48 hover:bg-(--color-action-primary-soft)',
            )}>
            Сбросить фильтры
          </button>
        </div>
      )}

      {note && (
        <p className="mt-6 text-sm text-(--color-neutral-500) md:mt-8 md:text-center">{note}</p>
      )}
    </section>
  );
}

interface PartnerCardProps {
  partner: PartnerItemProps;
  type?: PartnerTypeProps;
  index: number;
  contactCta?: { label: string; href: string };
}

/**
 * Карточка партнёра. Логотип — лого-локап фиксированной высоты, выключенный
 * влево: горизонтальные вордмарки читаются целиком, квадратные знаки не
 * распирают строку. Ассета ещё нет или файл не загрузился (404 по `logoSrc`) —
 * карточка молча падает на монограмму в цвете типа партнёрства, поэтому
 * логотипы можно докладывать в `public/landings/partners/` по одному.
 */
function PartnerCard({ partner: p, type: t, index, contactCta }: PartnerCardProps) {
  // pending — ассет ещё грузится (или его нет), ok — логотип отрисовался,
  // failed — 404/битый файл. Пока не ok, в потоке лежит монограмма, а <img>
  // висит невидимым слоем: сломанной картинки с alt-текстом никто не увидит.
  const [logoState, setLogoState] = useState<'pending' | 'ok' | 'failed'>('pending');
  const logoRef = useRef<HTMLImageElement>(null);
  const accent: PartnerAccent = t?.accent ?? 'violet';
  const hasLogo = Boolean(p.logoSrc) && logoState !== 'failed';
  const isLightLogo = p.logoTone === 'light';

  // Картинка из кеша успевает загрузиться до гидрации — onLoad/onError тогда уже
  // не сработают, и карточка навсегда осталась бы с монограммой. Досматриваем
  // состояние по ref после монтирования.
  useEffect(() => {
    const img = logoRef.current;
    if (!img || !img.complete) return;
    setLogoState(img.naturalWidth > 0 ? 'ok' : 'failed');
  }, [p.logoSrc]);

  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-(--radius-xl) border border-(--color-border-default)',
        'bg-(--color-surface-card) p-5 transition md:p-6 lg:rounded-(--radius-2xl)',
        'duration-(--duration-base) ease-(--ease-ui)',
        'hover:border-(--color-action-primary)/48 hover:shadow-[0_0_24px_-12px_rgba(0,0,0,0.28)]',
      )}
    >
      <div
        className={cn(
          'relative flex h-11 items-center',
          isLightLogo && logoState === 'ok' && 'w-fit rounded-(--radius-lg) px-3',
        )}
        style={
          isLightLogo && logoState === 'ok'
            ? { backgroundColor: p.logoBg ?? 'var(--color-neutral-900)' }
            : undefined
        }
      >
        {hasLogo && (
          <img
            ref={logoRef}
            src={p.logoSrc}
            /* Название компании стоит рядом в заголовке — логотип декоративен. */
            alt={p.logoAlt ?? ''}
            onLoad={() => setLogoState('ok')}
            onError={() => setLogoState('failed')}
            className={cn(
              'w-auto max-w-[150px] object-contain object-left',
              isLightLogo ? 'max-h-7' : 'max-h-11',
              logoState !== 'ok' && 'invisible absolute left-0 top-0',
            )}
          />
        )}
        {logoState !== 'ok' && (
          <span
            aria-hidden
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-(--radius-lg)',
              'text-base font-semibold',
              ACCENT_MONOGRAM[accent],
            )}
          >
            {p.initials ?? monogram(p.name)}
          </span>
        )}
      </div>

      <h3
        data-comp={`partner_directory.partners[${index}].name`}
        className="mt-4 text-lg font-semibold leading-tight text-(--color-text-primary)"
      >
        {p.name}
      </h3>

      {t && (
        <span
          className={cn(
            'mt-2 inline-flex w-fit items-center gap-1.5 rounded-(--radius-full) px-2.5 py-1',
            'text-xs font-medium',
            ACCENT_BADGE[accent],
          )}
        >
          {t.icon && <Icon name={t.icon} className="h-3.5 w-3.5" strokeWidth={2} />}
          {t.label}
        </span>
      )}

      {(p.location || p.since) && (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-(--color-text-secondary)">
          {p.location && (
            <span className="inline-flex items-center gap-1.5">
              <Icon name="map-pin" className="h-4 w-4" />
              {p.location}
            </span>
          )}
          {p.since && (
            <span className="inline-flex items-center gap-1.5">
              <Icon name="calendar" className="h-4 w-4" />
              {p.since}
            </span>
          )}
        </div>
      )}

      {p.services && p.services.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {p.services.map((s) => (
            <li
              key={s}
              className={cn(
                'rounded-(--radius-full) border border-(--color-border-default)',
                'px-2.5 py-1 text-xs text-(--color-text-primary)',
              )}
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      {(p.href || contactCta) && (
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5">
          {contactCta && (
            <a
              href={contactCta.href}
              className={cn(
                'inline-flex items-center gap-1.5 text-sm font-medium',
                'text-(--color-text-accent) hover:text-(--color-action-primary-hover)',
              )}
            >
              {contactCta.label}
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
            </a>
          )}
          {p.href && (
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className={cn(
                'inline-flex items-center gap-1.5 text-sm',
                'text-(--color-text-secondary) hover:text-(--color-text-primary)',
              )}
            >
              Сайт партнера
              <Icon name="arrow-up-right" className="h-3.5 w-3.5" strokeWidth={2} />
            </a>
          )}
        </div>
      )}

    </article>
  );
}
