import { AccentText } from '../primitives/AccentText';
import { ButtonLink } from '../primitives/ButtonLink';
import { Icon } from '../primitives/Icon';
import { Inspect } from '../primitives/Inspect';
import { LinkedText } from '../primitives/LinkedText';
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
  /**
   * Фирменная фиолетовая ссылка внутри описания: `text` ищется
   * в тексте описания и оборачивается в `<a href>`. Opt-in.
   */
  descriptionLink?: { text: string; href: string };
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
  /**
   * Верхний отступ секции 96px на планшете и десктопе вместо базовых
   * 48/64/96. Opt-in: нужен, когда секция открывает новый смысловой блок
   * и должна сильнее отбиваться от предыдущего.
   */
  spaceTop?: boolean;
  /**
   * Нижний отступ секции 48/64/96 по брейкпоинтам — фиксирует базовый ритм
   * там, где секция не должна съезжать вслед за соседями. Opt-in.
   */
  spaceBottom?: boolean;
  /**
   * Нижний отступ секции 32/48px вместо 64/96px. Для текстовых шапок
   * раздела, которые должны стоять ближе к своим подсекциям. Opt-in.
   */
  tightBottom?: boolean;
  /**
   * На мобилке кнопки по центру колонки и по ширине контента, а не во всю
   * ширину. С планшета — обычный ряд слева. Opt-in.
   */
  ctaCenterMobile?: boolean;
  /** Верхний отступ секции на мобилке — 32px. Opt-in. */
  spaceTopMobile?: boolean;
  /**
   * Кнопка стоит под обеими колонками и по центру, а не в текстовой колонке.
   * Так она читается как призыв ко всей секции. Opt-in.
   */
  ctaBelow?: boolean;
  /** Нижний отступ секции на мобилке — 24px вместо 48px. Opt-in. */
  tightBottomMobile?: boolean;
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
  descriptionLink,
  checklist,
  mediaPosition = 'right',
  mediaPlaceholder = 'product UI',
  align = 'left',
  titleSize = 'default',
  flushTop = false,
  spaceTop = false,
  spaceBottom = false,
  tightBottom = false,
  ctaCenterMobile = false,
  spaceTopMobile = false,
  ctaBelow = false,
  tightBottomMobile = false,
  mediaVariant = 'default',
  mediaSrc,
  mediaAlt,
  primaryCta,
  secondaryCta,
}: MediaCopyProps) {
  const hideMedia = mediaVariant === 'none' && !mediaSrc;
  const isStacked = mediaPosition === 'below';
  const cta =
    primaryCta || secondaryCta ? (
              <div
                className={cn(
                  'mt-8 flex flex-col gap-3 sm:flex-row',
                // Под сеткой отступ задаёт обёртка, свой сверху не нужен.
                ctaBelow && 'mt-0',
                  ctaCenterMobile && 'items-center sm:items-start',
                )}
              >
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
    ) : null;

  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 py-12 md:px-6 md:py-16 xl:px-0 lg:py-24',
        // Модификаторы отступов — opt-in: базовый ритм секции задаёт шкала DS.
        spaceBottom && 'pb-12 md:pb-16 lg:pb-24',
        // Половинный нижний отступ на мобилке — идёт после spaceBottom.
        tightBottomMobile && 'pb-6',
        tightBottom && 'pb-8 md:pb-12 lg:pb-12',
        spaceTop && 'pt-12 md:pt-24 lg:pt-24',
        flushTop && 'pt-0 md:pt-0 lg:pt-0',
        // Идёт после flushTop: на мобилке отступ нужен даже у секции без него.
        spaceTopMobile && 'pt-8',
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
          {/*
            Разметка описания в спеке: пустая строка (\n\n) — новый абзац
            с отступом, одиночный \n — перенос строки внутри абзаца.
          */}
          {description && (
            <div
              data-comp="media_copy.description"
              className="mt-4 space-y-5 text-base leading-relaxed text-(--color-text-primary)"
            >
              {description.split(/\n{2,}/).map((paragraph, i) => (
                <p key={i}>
                  {paragraph.split('\n').map((line, j) => (
                    <span key={j}>
                      {/* Ручной перенос — типографика широких экранов: на узких
                          он рвёт строку не там, поэтому только от lg. */}
                      {j > 0 && <br className="hidden lg:inline" />}
                      <LinkedText text={line} link={descriptionLink} />
                    </span>
                  ))}
                </p>
              ))}
            </div>
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

          {!ctaBelow && cta}
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

      {/* Кнопка под обеими колонками: призыв ко всей секции, а не к тексту. */}
      {ctaBelow && cta && (
        // Отступ сверху: 24 мобилка / 40 планшет / 48 десктоп.
        <div className="mt-6 flex justify-center md:mt-10 lg:mt-12">{cta}</div>
      )}
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
