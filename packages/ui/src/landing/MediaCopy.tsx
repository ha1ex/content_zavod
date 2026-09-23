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
  /** Заголовок пункта жирной строкой над текстом. Opt-in. */
  title?: string;
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
  /**
   * Метка-нумератор из accentWord («Шаг 1») встаёт отдельной строкой над
   * заголовком, а не в начале первой строки. Opt-in, старые лендинги не трогаем.
   */
  accentBreak?: boolean;
  /**
   * Без боковых полей вокруг мока (там, где мок их задаёт, — канбан-доски):
   * 0 вместо 32px, мок на всю колонку. Opt-in, старые лендинги не трогаем.
   */
  mediaTight?: boolean;
  /** Серая тень у мока вместо фиолетовой (канбан-доски). Opt-in, старые лендинги не трогаем. */
  mediaGrayShadow?: boolean;
  /** Серая обводка 1px у картинки mediaSrc. Opt-in. */
  mediaBorder?: boolean;
  /** Картинка mediaSrc без скругления углов (у картинки свои углы). Opt-in. */
  mediaNoRound?: boolean;
  /** Белая рамка 6px вокруг картинки mediaSrc, как у планшета. Opt-in. */
  mediaFrameWhite?: boolean;
  /**
   * Резиновый мок растягивается на всю колонку: без обёртки MockFit, которая
   * сжимает его до ширины содержимого. Только для моков без фиксированной
   * ширины. Opt-in, старые лендинги не трогаем.
   */
  mediaFill?: boolean;
  /** Скругление окна мока 12 / 16px (мобилка-планшет / десктоп) при любом масштабе. Opt-in. */
  mediaRound?: boolean;
  /** Заголовок и описание по центру над обеими колонками, а не в текстовой. Opt-in. */
  headerCenter?: boolean;
  /**
   * На десктопе колонка с моком шире текстовой — 7 к 5 вместо 1 к 1.
   * Для широких интерфейсов (несколько досок). Opt-in, старые лендинги не трогаем.
   */
  mediaWide?: boolean;
  /**
   * Промежуток между текстом и моком на десктопе. 'default' — 64px (колонки по 576px),
   * 'narrow' — 32px (колонки по 592px, мок шире). Opt-in, старые лендинги не трогаем.
   */
  mediaGap?: 'default' | 'narrow';
  description?: string;
  /**
   * Фирменная фиолетовая ссылка внутри описания: `text` ищется
   * в тексте описания и оборачивается в `<a href>`. Opt-in.
   */
  descriptionLink?: { text: string; href: string };
  checklist?: MediaCopyCheckItemProps[];
  /** Пункты чек-листа в одну строку (с переносом, если не помещаются). Opt-in. */
  checklistInline?: boolean;
  /** Иконки чек-листа без круглой подложки — просто фиолетовая иконка 20px. Opt-in. */
  checklistPlain?: boolean;
  /** Шаг между пунктами чек-листа 24px вместо 12. Opt-in. */
  checklistLoose?: boolean;
  /** Иконка чек-листа крупнее (20px) на квадратной плашке 40px со скруглением, как в FeatureGrid. Opt-in. */
  checklistIconTile?: boolean;
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
  titleSize?: 'default' | 'small' | 'xsmall';
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
  /** Большой нижний отступ секции: 64 мобилка / 96 планшет / 128 десктоп. Opt-in. */
  spaceBottomLarge?: boolean;
  /**
   * Нижний отступ секции 32/48px вместо 64/96px. Для текстовых шапок
   * раздела, которые должны стоять ближе к своим подсекциям. Opt-in.
   */
  tightBottom?: boolean;
  /** Убрать нижний отступ секции на всех ширинах. Opt-in. */
  flushBottom?: boolean;
  /** Убрать нижний отступ секции только на мобилке. Opt-in. */
  flushBottomMobile?: boolean;
  /** Верхний отступ 64 / 96 / 128px (мобилка / планшет / десктоп). Opt-in. */
  spaceTopLarge?: boolean;
  /** С spaceTopLarge: 128px только с 1280px, до этого 96. Opt-in */
  spaceTopLargeXl?: boolean;
  /** Заголовок default на планшете 30px вместо 36px. Opt-in. */
  titleSmallTablet?: boolean;
  /** Отступ под центрированной шапкой на планшете 32px вместо 48px. Opt-in */
  headerGapTablet32?: boolean;
  /** Нижний отступ на мобилке 64px. Opt-in */
  spaceBottomMobile64?: boolean;
  /** На планшете (768–1279px) колонка мока шире текстовой: 52 / 48, с 1024px мок не шире 512px. Opt-in */
  mediaWideTablet?: boolean;
  /** Зазор текст–мок на планшете (768–1023px) 32 вместо 40. Opt-in */
  gapTablet32?: boolean;
  /** Мок на десктопе уже колонки на 16px (576 вместо 592). Opt-in. */
  mediaNarrow?: boolean;
  /** Мок еще уже: 544px вместо 576 (вместе с mediaNarrow). Opt-in. */
  mediaNarrowMore?: boolean;
  /** Мок не шире 664px на десктопе (имя историческое) (обычно вместе с mediaWide). Opt-in. */
  mediaMax640?: boolean;
  /** Отступ текстовой колонки слева 32px на десктопе (когда мок слева). Opt-in. */
  copyIndent?: boolean;
  /** Чек-лист на мобилке в две колонки, если по ширине помещается (от ~600px). Opt-in. */
  checklistColsMobile?: boolean;
  /** Верхний отступ на мобилке 64px. Opt-in. */
  spaceTopMobile64?: boolean;
  /** Дополнительный мок во всю ширину контейнера под сеткой текст + медиа. Opt-in. */
  mediaBelowVariant?: MockVariant;
  /** Показать mediaBelowVariant перед основной сеткой (сразу под заголовком). Opt-in. */
  mediaBelowFirst?: boolean;
  /** mediaBelowVariant резиновый (своя адаптивная сетка) — рендерить без MockFit. Opt-in. */
  mediaBelowFluid?: boolean;
  /** Текстовая колонка уже на десктопе — 520px. Opt-in. */
  copyNarrow?: boolean;
  /** Зазор между текстом и моком на мобилке — 24px вместо 40px. Opt-in. */
  gapTightMobile?: boolean;
  /** Мок по центру колонки на мобилке, когда он уже контейнера. Opt-in. */
  mediaCenterMobile?: boolean;
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
  accentBreak,
  mediaTight,
  mediaGrayShadow,
  mediaBorder,
  mediaNoRound,
  mediaFrameWhite,
  mediaFill,
  mediaRound,
  headerCenter,
  mediaWide,
  mediaGap = 'default',
  description,
  descriptionLink,
  checklist,
  checklistInline = false,
  checklistPlain = false,
  checklistLoose = false,
  checklistIconTile = false,
  mediaPosition = 'right',
  mediaPlaceholder = 'product UI',
  align = 'left',
  titleSize = 'default',
  flushTop = false,
  spaceTop = false,
  spaceBottom = false,
  spaceBottomLarge = false,
  tightBottom = false,
  flushBottom = false,
  flushBottomMobile = false,
  spaceTopLarge = false,
  spaceTopLargeXl = false,
  titleSmallTablet = false,
  headerGapTablet32 = false,
  spaceBottomMobile64 = false,
  mediaWideTablet = false,
  gapTablet32 = false,
  mediaNarrow = false,
  mediaNarrowMore = false,
  mediaMax640 = false,
  copyIndent = false,
  checklistColsMobile = false,
  spaceTopMobile64 = false,
  mediaBelowVariant,
  mediaBelowFirst = false,
  mediaBelowFluid = false,
  copyNarrow = false,
  gapTightMobile = false,
  mediaCenterMobile = false,
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
  // Шапка вынесена наверх, визуала и текста нет — пустое тело не рендерим.
  const bodyEmpty = hideMedia && headerCenter && !eyebrow && !checklist?.length && !primaryCta && !secondaryCta;
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

  // Заголовок и описание: в текстовой колонке или (headerCenter) по центру над сеткой.
  const headingEl = (
    <>
      <h2
        data-comp="media_copy.title"
        className={cn(
          'font-semibold leading-tight',
          titleSize === 'xsmall'
            ? 'text-lg md:text-2xl'
            : titleSize === 'small'
              ? 'text-lg md:text-2xl lg:text-3xl'
              : titleSmallTablet
                ? 'text-2xl md:text-3xl lg:text-4xl'
                : 'text-xl md:text-2xl',
          // перенос строки из спека (\n) — только там, где он явно задан
          // только на десктопе: на планшете и мобилке строка переносится сама
          title.includes('\n') && 'lg:whitespace-pre-line',
        )}
      >
        {/*
          Акцент в начале заголовка — это метка-нумератор («Шаг 1»), а не
          выделенное слово внутри фразы: отбиваем его от остального текста,
          чтобы номер читался отдельным элементом. Нумератор всегда с цифрой —
          обычная фраза в начале («API и вебхуки») идёт в строку без отбивки.
        */}
        {accentWord && title.startsWith(accentWord) && /\d/.test(accentWord) ? (
          <>
            <span className={cn('text-(--color-text-accent)', accentBreak ? 'mb-1 block' : 'mr-2')}>
              {accentWord}
            </span>
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
    </>
  );

  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 py-12 pt-16 md:px-6 md:py-16 xl:px-0 lg:py-24',
        // Модификаторы отступов — opt-in: базовый ритм секции задаёт шкала DS.
        spaceBottom && 'pb-12 md:pb-16 lg:pb-24',
        spaceBottomLarge && 'pb-16 md:pb-24 lg:pb-32',
        // Половинный нижний отступ на мобилке — идёт после spaceBottom.
        tightBottomMobile && 'pb-6',
        tightBottom && 'pb-8 md:pb-12 lg:pb-12',
        flushBottom && 'pb-0 md:pb-0 lg:pb-0',
        flushBottomMobile && 'pb-0 md:pb-16 lg:pb-24',
        spaceTop && 'pt-12 md:pt-24 lg:pt-24',
        flushTop && 'pt-0 md:pt-0 lg:pt-0',
        spaceTopLarge && (spaceTopLargeXl ? 'pt-16 md:pt-24 xl:pt-32' : 'pt-16 md:pt-24 lg:pt-32'),
        spaceTopMobile64 && 'max-md:pt-16',
        spaceBottomMobile64 && 'max-md:pb-16',
        // Идёт после flushTop: на мобилке отступ нужен даже у секции без него.
        spaceTopMobile && 'pt-8',
      )}
    >
      {headerCenter && (
        <div className={cn('mb-8 max-w-2xl md:mx-auto md:mb-12 md:max-w-4xl md:text-center lg:max-w-6xl', headerGapTablet32 && 'md:mb-8 lg:mb-12')}>{headingEl}</div>
      )}
      {mediaBelowVariant && mediaBelowFirst && (
        <div className={cn('w-full', !bodyEmpty && 'mb-12 md:mb-16 lg:mb-24')}>
          {mediaBelowFluid ? (
              <MockVisual variant={mediaBelowVariant} />
            ) : (
              <MockFit round>
                <MockVisual variant={mediaBelowVariant} />
              </MockFit>
            )}
        </div>
      )}
      <div
        className={cn(
          bodyEmpty && 'hidden',
          hideMedia
            ? cn(
                'max-w-2xl',
                // Центрированной шапке даём больше ширины: в 672px заголовок
                // раздела ломался на три строки.
                align === 'center' && 'md:mx-auto md:max-w-4xl md:text-center lg:max-w-6xl',
              )
            : isStacked
              ? 'flex flex-col gap-10'
              : cn(
                  'grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center',
                  gapTightMobile && 'gap-6 md:gap-10',
                  gapTablet32 && 'md:gap-8',
                  mediaGap === 'narrow' ? 'lg:gap-8' : 'lg:gap-16',
                ),
          !hideMedia && mediaPosition === 'left' && 'md:[&>div:first-child]:order-2',
          // колонки идут в визуальном порядке: при моке слева широкая первая
          !hideMedia && !isStacked && mediaWide &&
            (mediaPosition === 'left' ? 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]' : 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]'),
          !hideMedia && !isStacked && mediaWideTablet &&
            (mediaPosition === 'left' ? 'md:max-xl:!grid-cols-[minmax(0,52fr)_minmax(0,48fr)]' : 'md:max-xl:!grid-cols-[minmax(0,48fr)_minmax(0,52fr)]'),
        )}
      >
        {/*
          В раскладке 'below' текстовый блок центрируется от планшета и шире —
          так он совпадает по ритму с центрированными заголовками LogoMarquee
          и FinalCta. На мобилке остаётся выключка влево: центр на узкой колонке
          рвёт чтение длинного подзаголовка.
        */}
        <div className={cn(isStacked && 'max-w-3xl md:mx-auto md:text-center lg:max-w-6xl', copyNarrow && !isStacked && 'lg:max-w-[520px]', copyIndent && (mediaPosition === 'left' ? 'lg:pl-8' : 'lg:pr-8'))}>
          {eyebrow && (
            <p
              data-comp="media_copy.eyebrow"
              className="mb-3 text-sm font-medium uppercase text-(--color-text-accent)"
            >
              {eyebrow}
            </p>
          )}
          {!headerCenter && headingEl}

          {checklist && checklist.length > 0 && (
            <ul className={checklistInline ? 'mt-6 flex flex-wrap gap-x-8 gap-y-3' : checklistLoose ? cn(!headerCenter && 'mt-6', 'space-y-6', checklistColsMobile && 'max-md:grid max-md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] max-md:gap-x-8 max-md:gap-y-6 max-md:space-y-0') : 'mt-6 space-y-3'}>
              {checklist.map((item, i) => (
                <Inspect
                  as="li"
                  key={i}
                  name={`media_copy.checklist[${i}]`}
                  className={cn('flex', checklistIconTile ? 'items-center gap-4' : 'items-start gap-3')}
                >
                  <span
                    className={cn(
                      'inline-flex shrink-0 items-center justify-center',
                      checklistIconTile ? 'h-10 w-10 rounded-(--radius-xl)' : 'mt-0.5 h-6 w-6 rounded-full',
                      checklistPlain ? 'text-(--color-text-accent)' : 'bg-(--color-action-primary-soft) text-(--color-text-accent)',
                    )}
                  >
                    <Icon name={item.icon ?? 'Check'} className={checklistPlain || checklistIconTile ? 'h-5 w-5' : 'h-3.5 w-3.5'} strokeWidth={checklistPlain || checklistIconTile ? 2 : 2.5} />
                  </span>
                  <span
                    data-comp={`media_copy.checklist[${i}].text`}
                    className="text-base leading-relaxed text-(--color-text-primary)"
                  >
                    {item.title ? (
                      <>
                        <b className="block font-semibold">{item.title}</b>
                        <span className="text-(--color-text-secondary)">{item.text}</span>
                      </>
                    ) : (
                      item.text
                    )}
                  </span>
                </Inspect>
              ))}
            </ul>
          )}

          {!ctaBelow && cta}
        </div>

        {!hideMedia && (
          <Inspect
            as="div"
            name="media_copy.media"
            className={cn(
              isStacked && (mediaMax640 ? 'mx-auto w-full max-w-[880px]' : 'w-full'),
              mediaCenterMobile && 'max-md:[&_[data-mockfit=inner]]:mx-auto',
              // мок уже колонки на 16px: прижимаем к тому краю, где стоит колонка
              mediaNarrow && (mediaPosition === 'left' ? 'lg:max-w-[576px]' : 'lg:ml-auto lg:max-w-[576px]'),
              mediaNarrowMore && 'lg:max-w-[544px]',
              mediaWideTablet && (mediaPosition === 'left' ? 'lg:max-xl:!max-w-[512px]' : 'lg:max-xl:ml-auto lg:max-xl:w-full lg:max-xl:!max-w-[512px]'),
              mediaMax640 && (mediaPosition === 'left' ? 'lg:max-w-[664px]' : 'lg:ml-auto lg:max-w-[664px]'),
            )}
          >
            <MediaCopyVisual
              variant={mediaVariant}
              placeholder={mediaPlaceholder}
              src={mediaSrc}
              alt={mediaAlt}
              tight={mediaTight}
              grayShadow={mediaGrayShadow}
              border={mediaBorder}
              noRound={mediaNoRound}
              frameWhite={mediaFrameWhite}
              fill={mediaFill}
              round={mediaRound}
            />
          </Inspect>
        )}
      </div>

      {/* Кнопка под обеими колонками: призыв ко всей секции, а не к тексту. */}
      {mediaBelowVariant && !mediaBelowFirst && (
        <div className="mt-12 w-full md:mt-16 lg:mt-24">
          {mediaBelowFluid ? (
              <MockVisual variant={mediaBelowVariant} />
            ) : (
              <MockFit round>
                <MockVisual variant={mediaBelowVariant} />
              </MockFit>
            )}
        </div>
      )}

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
  tight,
  grayShadow,
  border,
  noRound,
  frameWhite,
  fill,
  round,
}: {
  variant: MediaCopyVariant;
  placeholder: string;
  src?: string;
  alt?: string;
  tight?: boolean;
  grayShadow?: boolean;
  border?: boolean;
  noRound?: boolean;
  frameWhite?: boolean;
  fill?: boolean;
  round?: boolean;
}) {
  // Растровая картинка выигрывает у mock-компонента: её задают явно под блок.
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        className={cn('block h-auto w-full', !noRound && 'rounded-(--radius-xl) lg:rounded-(--radius-2xl)', grayShadow && 'shadow-[0_0_40px_rgba(45,45,45,0.12)]', border && 'border border-(--color-border-default)', frameWhite && 'border-[6px] border-white bg-white')}
      />
    );
  }
  if (variant === 'default') return <ProductMock label={placeholder} />;
  if (fill) {
    return (
      <div className="w-full">
        <MockVisual variant={variant} tight={tight} grayShadow={grayShadow} />
      </div>
    );
  }
  const rendered = (
    <MockFit round={round}>
      <MockVisual variant={variant} tight={tight} grayShadow={grayShadow} />
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
