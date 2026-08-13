import { Icon } from '../primitives/Icon';
import { Inspect } from '../primitives/Inspect';
import { cn } from '../primitives/cn';
import { TrackVisual } from './TrackVisual';

export interface SpeakerItemProps {
  /** Имя спикера. Пока не подтверждён — «Спикер уточняется». */
  name: string;
  /** Роль / компания спикера (1–2 строки). */
  role?: string;
  /** Название доклада. */
  talkTitle?: string;
  /** Тайминг и длительность, напр. «16:00 / 30 мин». */
  time?: string;
  /** Короткая метка темы/трека, напр. «ИИ vs консалтинг». */
  tag?: string;
  /** Квадратный портрет (готовится заранее). Нет ассета → заглушка. */
  photoSrc?: string;
  photoAlt?: string;
  /** Инициалы для заглушки, когда фото ещё нет. */
  initials?: string;
}

export interface SpeakerGridProps {
  eyebrow?: string;
  /** Акцентный бейдж трека (напр. «Ускорение») — залитая пилюля в цвете трека. */
  badge?: string;
  /**
   * Визуал трека (концепт «Разгон ↔ Фокус»): 'acceleration' — простреливающие
   * штрихи, 'efficiency' — схождение линий в одну. Слово трека берётся из badge.
   * Если задан — рендерится вместо пилюли-бейджа.
   */
  visual?: 'acceleration' | 'efficiency';
  title: string;
  description?: string;
  /** Число колонок сетки. По умолчанию 2 — крупные карточки докладов. */
  columns?: 2 | 3;
  /** Цвет трека: 'violet' (дефолт) или 'cyan' — переопределяет акцент секции. */
  accent?: 'violet' | 'cyan';
  /** Кнопка под сеткой (напр. «Стать экспертом»). */
  cta?: { label: string; href: string };
  speakers: SpeakerItemProps[];
}

/**
 * Локальное переопределение акцентных токенов под цвет трека — включая
 * градиент заголовков (--h2-from/mid/to), чтобы h2 секции был в цвете трека.
 */
export function trackAccentStyle(accent?: 'violet' | 'cyan'): React.CSSProperties | undefined {
  if (accent === 'cyan') {
    return {
      ['--color-text-accent']: '#6fe5ff',
      ['--color-action-primary']: '#22b8d6',
      ['--color-action-primary-soft']: 'rgba(111,229,255,0.16)',
      ['--h2-from']: '#22b8d6',
      ['--h2-mid']: '#40d4ea',
      ['--h2-to']: '#8bf1ff',
    } as React.CSSProperties;
  }
  if (accent === 'violet') {
    return {
      ['--color-text-accent']: '#b79cf2',
      ['--color-action-primary']: '#8b5cf0',
      ['--color-action-primary-soft']: 'rgba(139,92,240,0.18)',
      ['--h2-from']: '#7c5cf0',
      ['--h2-mid']: '#9b7cf2',
      ['--h2-to']: '#c4b0ff',
    } as React.CSSProperties;
  }
  return undefined;
}

/**
 * SpeakerGrid — сетка карточек докладов (по умолчанию 2 колонки). Каждая
 * карточка: КВАДРАТНЫЙ портрет слева + плашки (тайминг / тема), название
 * доклада, имя спикера и его роль справа — как на карточках программы
 * прошлой конференции. Фото готовим заранее через `photoSrc`; пока ассета
 * нет — квадратная заглушка (инициалы или иконка). Всё на семантических
 * токенах — работает и в тёмной схеме лендинга.
 */
export function SpeakerGrid({
  eyebrow,
  badge,
  visual,
  title,
  description,
  columns = 2,
  accent,
  cta,
  speakers,
}: SpeakerGridProps) {
  return (
    <section className="px-4 py-12 md:px-6 xl:px-0 md:py-16 lg:py-20" style={trackAccentStyle(accent)}>
      <div className="mx-auto flex w-full max-w-(--container-kaiten) flex-col gap-8 md:gap-10 lg:gap-12">
        {(eyebrow || badge || title || description) && (
          <div className="flex flex-col gap-3">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                {eyebrow}
              </p>
            )}
            {visual ? (
              <TrackVisual variant={visual} label={badge} />
            ) : (
              badge && (
                <span className="inline-flex w-fit items-center rounded-(--radius-full) bg-(--color-action-primary) px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-(--color-text-inverse)">
                  {badge}
                </span>
              )
            )}
            {title && (
              <h2 className="text-3xl font-semibold text-(--color-text-primary) md:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-2xl text-lg text-(--color-text-secondary)">{description}</p>
            )}
          </div>
        )}

        <div
          className={cn(
            'grid grid-cols-1 gap-6 md:gap-8',
            columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2',
          )}
        >
          {speakers.map((s, i) => (
            <Inspect as="article" key={i} name={`speaker_grid.speakers[${i}]`}>
              <div
                className={cn(
                  'group flex h-full flex-col gap-5 sm:flex-row sm:items-start sm:gap-6',
                  'rounded-(--radius-2xl) border border-(--color-border-default)',
                  'bg-(--color-surface-section) p-5 md:p-6',
                  'transition duration-500 ease-out hover:-translate-y-0.5',
                  'hover:border-[color-mix(in_srgb,var(--color-action-primary)_45%,transparent)]',
                  'hover:shadow-[0_6px_24px_color-mix(in_srgb,var(--color-action-primary)_16%,transparent)]',
                )}
              >
                <Portrait src={s.photoSrc} alt={s.photoAlt} name={s.name} initials={s.initials} />
                <div className="flex min-w-0 flex-1 flex-col">
                  {(s.time || s.tag) && (
                    <div className="flex flex-wrap items-center gap-2">
                      {s.time && (
                        <span className="inline-flex items-center rounded-(--radius-full) border border-(--color-border-default) px-3 py-1 text-sm font-medium text-(--color-text-primary)">
                          {s.time}
                        </span>
                      )}
                      {s.tag && (
                        <span className="inline-flex items-center rounded-(--radius-full) bg-(--color-action-primary-soft) px-3 py-1 text-sm font-medium text-(--color-text-accent)">
                          {s.tag}
                        </span>
                      )}
                    </div>
                  )}
                  {s.talkTitle && (
                    <p
                      data-comp={`speaker_grid.speakers[${i}].talkTitle`}
                      className={cn(
                        'text-lg font-semibold leading-snug text-(--color-text-primary) md:text-xl',
                        (s.time || s.tag) && 'mt-4',
                      )}
                    >
                      {s.talkTitle}
                    </p>
                  )}
                  <div className={cn('flex flex-col gap-1', (s.talkTitle || s.time || s.tag) && 'mt-4')}>
                    <p
                      data-comp={`speaker_grid.speakers[${i}].name`}
                      className="text-base font-semibold text-(--color-text-primary)"
                    >
                      {s.name}
                    </p>
                    {s.role && (
                      <p
                        data-comp={`speaker_grid.speakers[${i}].role`}
                        className="text-sm leading-relaxed text-(--color-text-secondary)"
                      >
                        {s.role}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Inspect>
          ))}
        </div>

        {cta && (
          <div className="flex justify-center">
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-(--radius-lg) bg-[#8b5cf0] px-6 py-3 text-base font-semibold text-white transition hover:opacity-90"
            >
              {cta.label}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/** Квадратный портрет спикера. Нет фото — заглушка с инициалами или иконкой. */
function Portrait({
  src,
  alt,
  name,
  initials,
}: {
  src?: string;
  alt?: string;
  name: string;
  initials?: string;
}) {
  return (
    <div
      className={cn(
        'aspect-square w-full shrink-0 overflow-hidden sm:w-36 md:w-44',
        'flex items-center justify-center rounded-(--radius-xl)',
        'bg-(--color-action-primary-soft) text-(--color-text-accent)',
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? name}
          className="h-full w-full object-cover object-top grayscale transition duration-700 ease-out group-hover:grayscale-0"
        />
      ) : initials ? (
        <span aria-hidden className="text-3xl font-semibold md:text-4xl">
          {initials}
        </span>
      ) : (
        <Icon name="UserRound" className="h-10 w-10 md:h-12 md:w-12" strokeWidth={1.5} />
      )}
    </div>
  );
}
