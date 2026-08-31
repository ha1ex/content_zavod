import { AccentText } from '../primitives/AccentText';
import { ButtonLink } from '../primitives/ButtonLink';
import { Icon } from '../primitives/Icon';
import { Inspect } from '../primitives/Inspect';
import { MockFit } from '../primitives/MockFit';
import { cn } from '../primitives/cn';
import { MockVisual, type MockVariant } from './mocks';

export interface MediaCopyCheckItemProps {
  icon?: string;
  text: string;
}

export interface MediaCopyCtaProps {
  label: string;
  href: string;
}

/** 'none' — текстовый режим без визуала (одна колонка). */
export type MediaCopyVariant = 'default' | 'none' | MockVariant;

export interface MediaCopyProps {
  eyebrow?: string;
  title: string;
  /** Кусок заголовка фирменным фиолетовым, напр. «Шаг 1.». */
  accentWord?: string;
  description?: string;
  checklist?: MediaCopyCheckItemProps[];
  /**
   * 'left' / 'right' — две колонки (текст и визуал рядом).
   * 'below' — одна колонка: заголовок с подзаголовком сверху, визуал под ними
   * во всю ширину контейнера. Для широких визуалов (карта платформы, схемы),
   * которые в половине колонки нечитаемы.
   */
  mediaPosition?: 'left' | 'right' | 'below';
  mediaPlaceholder?: string;
  /**
   * 'left' (дефолт) — текст по левому краю.
   * 'center' — на планшете и десктопе блок центрируется. Для текстовых шапок
   * разделов (`mediaVariant: 'none'`), которые открывают группу секций.
   */
  align?: 'left' | 'center';
  /**
   * 'default' — H2 уровня раздела. 'small' — уменьшенный заголовок для секций,
   * подчинённых общей шапке раздела (напр. «Шаг 1» и «Шаг 2» под одним
   * заголовком), чтобы иерархия читалась.
   */
  titleSize?: 'default' | 'small';
  /**
   * Убрать верхний отступ секции. Нужно, когда блок идёт сразу под текстовой
   * шапкой раздела: иначе складываются нижний отступ шапки и верхний этого
   * блока, и между ними зияет двойной интервал.
   */
  flushTop?: boolean;
  mediaVariant?: MediaCopyVariant;
  /**
   * Растровая картинка вместо mock-компонента (напр. /brand/platform.png).
   * Когда задана — рендерится `<img>` во всю ширину слота, `mediaVariant`
   * игнорируется.
   */
  mediaSrc?: string;
  /** Alt для `mediaSrc`. */
  mediaAlt?: string;
  primaryCta?: MediaCopyCtaProps;
  secondaryCta?: MediaCopyCtaProps | null;
  /**
   * Reference to an auto-generated unique SVG illustration (P8 phase).
   * Currently passed through but not rendered (M4 full integration upcoming).
   */
  customIllustrationId?: string;
}

/**
 * MediaCopy — флагманский Kaiten-блок: текст с чек-листом + большой mock
 * продуктового UI. Используется 3-5 раз на странице (knowledge-base, docs,
 * home). Mock-plaholder — это window-chrome с условной фейковой UI.
 */
export function MediaCopy({
  eyebrow,
  title,
  accentWord,
  description,
  checklist,
  mediaPosition = 'right',
  mediaPlaceholder = 'product UI',
  align = 'left',
  titleSize = 'default',
  flushTop = false,
  mediaVariant = 'default',
  mediaSrc,
  mediaAlt,
  primaryCta,
  secondaryCta,
}: MediaCopyProps) {
  const hideMedia = mediaVariant === 'none' && !mediaSrc;
  const isStacked = mediaPosition === 'below';
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 py-12 md:px-6 md:py-16 xl:px-0 lg:py-24',
      )}
    >
      <div
        className={cn(
          hideMedia
            ? cn(
                'max-w-2xl',
                // Центрированной шапке даём больше ширины: в 672px заголовок
                // раздела ломался на три строки.
                align === 'center' && 'md:mx-auto md:max-w-4xl md:text-center lg:max-w-5xl',
              )
            : isStacked
              ? 'flex flex-col gap-10'
              : 'grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center lg:gap-16',
          !hideMedia && mediaPosition === 'left' && 'md:[&>div:first-child]:order-2',
        )}
      >
        {/*
          В раскладке 'below' текстовый блок центрируется от планшета и шире —
          так он совпадает по ритму с центрированными заголовками LogoMarquee
          и FinalCta. На мобилке остаётся выключка влево: центр на узкой колонке
          рвёт чтение длинного подзаголовка.
        */}
        <div className={cn(isStacked && 'max-w-3xl md:mx-auto md:text-center lg:max-w-6xl')}>
          {eyebrow && (
            <p
              data-comp="media_copy.eyebrow"
              className="mb-3 text-sm font-medium uppercase text-(--color-text-accent)"
            >
              {eyebrow}
            </p>
          )}
          <h2
            data-comp="media_copy.title"
            className={cn(
              'font-semibold leading-tight',
              titleSize === 'small' ? 'text-xl md:text-2xl lg:text-3xl' : 'text-2xl md:text-4xl',
            )}
          >
            {/*
              Акцент в начале заголовка — это метка-нумератор («Шаг 1»), а не
              выделенное слово внутри фразы: отбиваем его от остального текста,
              чтобы номер читался отдельным элементом.
            */}
            {accentWord && title.startsWith(accentWord) ? (
              <>
                <span className="mr-2 text-(--color-text-accent)">{accentWord}</span>
                {/* Пробел оставляем в тексте: без него заголовок копируется
                    и озвучивается как «Шаг 1Выбираете». Отбивку даёт mr-2. */}
                {title.slice(accentWord.length)}
              </>
            ) : (
              <AccentText text={title} accentWord={accentWord} />
            )}
          </h2>
          {description && (
            <p
              data-comp="media_copy.description"
              className="mt-4 text-lg leading-relaxed text-(--color-text-primary)"
            >
              {description}
            </p>
          )}

          {checklist && checklist.length > 0 && (
            <ul className="mt-6 space-y-3">
              {checklist.map((item, i) => (
                <Inspect
                  as="li"
                  key={i}
                  name={`media_copy.checklist[${i}]`}
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
                    data-comp={`media_copy.checklist[${i}].text`}
                    className="text-base leading-relaxed text-(--color-text-primary)"
                  >
                    {item.text}
                  </span>
                </Inspect>
              ))}
            </ul>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryCta && (
                <Inspect name="media_copy.primaryCta">
                  <ButtonLink size="lg" href={primaryCta.href}>
                    {primaryCta.label}
                  </ButtonLink>
                </Inspect>
              )}
              {secondaryCta && (
                <Inspect name="media_copy.secondaryCta">
                  <ButtonLink variant="outline" size="lg" href={secondaryCta.href}>
                    {secondaryCta.label}
                  </ButtonLink>
                </Inspect>
              )}
            </div>
          )}
        </div>

        {!hideMedia && (
          <Inspect as="div" name="media_copy.media" className={cn(isStacked && 'w-full')}>
            <MediaCopyVisual
              variant={mediaVariant}
              placeholder={mediaPlaceholder}
              src={mediaSrc}
              alt={mediaAlt}
            />
          </Inspect>
        )}
      </div>
    </section>
  );
}

function MediaCopyVisual({
  variant,
  placeholder,
  src,
  alt,
}: {
  variant: MediaCopyVariant;
  placeholder: string;
  src?: string;
  alt?: string;
}) {
  // Растровая картинка выигрывает у mock-компонента: её задают явно под блок.
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        className="block h-auto w-full rounded-(--radius-xl) lg:rounded-(--radius-2xl)"
      />
    );
  }
  if (variant === 'default') return <ProductMock label={placeholder} />;
  const rendered = (
    <MockFit>
      <MockVisual variant={variant} />
    </MockFit>
  );
  return rendered ?? <ProductMock label={placeholder} />;
}

interface ProductMockProps {
  label: string;
}

function ProductMock({ label }: ProductMockProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.25)]',
      )}
    >
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
        <span className="ml-4 truncate text-xs text-(--color-text-secondary)">{label}</span>
      </div>

      {/* faux app body */}
      <div className="grid grid-cols-[140px_1fr] gap-4 p-4 md:p-6">
        {/* sidebar */}
        <div className="space-y-2">
          <div className="h-3 w-3/4 rounded-full bg-(--color-action-primary-soft)" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-2.5 w-full rounded-full bg-(--color-neutral-200)" />
          ))}
        </div>

        {/* content */}
        <div className="space-y-3">
          <div className="h-4 w-1/2 rounded-full bg-(--color-neutral-200)" />
          <div className="space-y-2 rounded-(--radius-xl) border border-(--color-border-default) p-4">
            <div className="h-3 w-2/3 rounded-full bg-(--color-action-primary)" />
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded-full bg-(--color-neutral-200)" />
              <div className="h-2 w-5/6 rounded-full bg-(--color-neutral-200)" />
              <div className="h-2 w-3/4 rounded-full bg-(--color-neutral-200)" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-(--radius-xl) border border-(--color-border-default)',
                  'p-3 space-y-1.5',
                )}
              >
                <div
                  className={cn(
                    'h-2 w-2/3 rounded-full',
                    i === 0 ? 'bg-(--color-blue-100)' : 'bg-(--color-green-100)',
                  )}
                />
                <div className="h-2 w-full rounded-full bg-(--color-neutral-200)" />
                <div className="h-2 w-3/4 rounded-full bg-(--color-neutral-200)" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
