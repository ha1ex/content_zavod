import { ButtonLink } from '../primitives/ButtonLink';
import { Icon } from '../primitives/Icon';
import { Inspect } from '../primitives/Inspect';
import { LinkedText, type TextLink } from '../primitives/LinkedText';
import { cn } from '../primitives/cn';
import { GradientPanel } from './GradientPanel';
import { FeatureTile, hasFeatureTile } from './mocks/FeatureTile';
import { MockVisual, type MockVariant } from './mocks/MockVisual';
import CTAproduct from './mocks/CTAproduct';

/** Исходный размер плитки галереи и её увеличение в баннере. */
const TILE_W = 240;
const TILE_H = 176;
const TILE_SCALE = 1.5;

/** Иллюстрация платформы Kaiten по умолчанию для `variant: 'product'`. */
const CTA_PRODUCT_IMAGE = '/brand/cta-product.png';

export interface CtaBannerCtaProps {
  label: string;
  href: string;
}

export interface CtaBannerProps {
  title: string;
  description?: string;
  /** Кусок описания фирменной фиолетовой ссылкой: `text` ищется в описании. */
  descriptionLink?: TextLink | TextLink[];
  primaryCta: CtaBannerCtaProps;
  secondaryCta?: CtaBannerCtaProps | null;
  /**
   * Градиентный вид — подложка `GradientPanel` (та же, что у финального CTA и
   * блока спикера): светло-лиловая заливка + размытый засвет. Opt-in: без него
   * остаётся прежний плоский soft-фон, чтобы не менять старые лендинги.
   */
  gradient?: boolean;
  /**
   * Подпись плитки из галереи мини-мокапов фич (`FeatureMocksV01`) — визуал
   * у правого края баннера. Когда задана, кнопка уходит под текст влево,
   * а справа встаёт интерфейсная плитка.
   */
  featureTile?: string;
  /**
   * Интерфейсный мок домена справа от текста (кнопки при этом уходят под текст).
   * В отличие от `featureTile` берётся не из галереи мини-мокапов фич, а из
   * реестра моков `MockVisual` — тот же набор, что у Hero и MediaCopy.
   */
  mediaVariant?: MockVariant;
  /**
   * Кнопки под текстом, а не справа от него. Opt-in: без него остаётся прежняя
   * раскладка «текст слева, кнопки справа» — чтобы не менять старые лендинги.
   * Нужен, когда описание длинное и колонка кнопок сжимает текст.
   */
  ctaBelow?: boolean;
  /**
   * 'product' — блок `CTAproduct`: текст и кнопка слева, иллюстрация платформы
   * справа, собственный градиент лаванда → голубой. Подложку блок несёт сам,
   * поэтому `gradient` с ним не нужен. Opt-in, старые лендинги не трогаем.
   */
  variant?: 'default' | 'product';
  /** Иллюстрация справа для `variant: 'product'`. По умолчанию — платформа Kaiten. */
  visualSrc?: string;
  /** Alt для `visualSrc`. */
  visualAlt?: string;
  /** Увеличенный нижний отступ секции: 96px вместо 48px. */
  spaceBottom?: boolean;
  /**
   * Вариант «пара карточек»: вместо одного широкого баннера секция рисует
   * 2–3 равные карточки в строку — иконка, заголовок, описание и текстовая
   * ссылка. Когда задан, `title`/`primaryCta` секции не используются.
   */
  cards?: CtaBannerCardProps[];
}

export interface CtaBannerCardProps {
  /** Имя иконки lucide в kebab-case, напр. «zap», «layout-grid». */
  icon?: string;
  title: string;
  description?: string;
  cta: CtaBannerCtaProps;
  /** Заливка карточки: 'violet' (дефолт) или нейтральная 'gray'. */
  tone?: 'violet' | 'gray';
}

/**
 * Вариант секции «пара карточек»: равные блоки в строку с иконкой, заголовком,
 * описанием и текстовой ссылкой. Карточки тянутся на одну высоту, ссылка
 * прижата к низу, поэтому разная длина описаний не ломает ряд.
 */
function CtaBannerCards({ cards }: { cards: CtaBannerCardProps[] }) {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 pb-0 pt-16 md:px-6 xl:px-0 lg:pb-0 lg:pt-24',
      )}
    >
      <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
        {cards.map((c, i) => (
          <Inspect
            as="div"
            key={c.title}
            name={`cta_banner.cards[${i}]`}
            className={cn(
              'flex flex-col rounded-(--radius-2xl) p-6 md:p-8',
              c.tone === 'gray'
                ? 'bg-(--color-surface-section)'
                : 'bg-(--color-action-primary-soft)',
            )}
          >
            {c.icon && (
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-(--radius-lg) bg-(--color-surface-card) text-(--color-text-accent)">
                <Icon name={c.icon} className="h-6 w-6" strokeWidth={2} />
              </span>
            )}
            <h3
              data-comp={`cta_banner.cards[${i}].title`}
              className="text-xl font-semibold leading-tight text-(--color-text-primary)"
            >
              {c.title}
            </h3>
            {c.description && (
              <p
                data-comp={`cta_banner.cards[${i}].description`}
                className="mt-3 text-base leading-relaxed text-(--color-text-primary)"
              >
                {c.description}
              </p>
            )}
            <div className="mt-auto pt-6">
              <Inspect name={`cta_banner.cards[${i}].cta`}>
                <ButtonLink
                  size="lg"
                  variant={c.tone === 'gray' ? 'outline' : undefined}
                  href={c.cta.href}
                  className="whitespace-nowrap"
                >
                  {c.cta.label}
                </ButtonLink>
              </Inspect>
            </div>
          </Inspect>
        ))}
      </div>
    </section>
  );
}
/**
 * Inline CTA banner для размещения между секциями (вроде «Документы Кайтен
 * — бесплатно и без ограничений»). Слабый фиолетовый фон, скруглённая
 * карточка с CTA справа. С `gradient` — на подложке `GradientPanel`.
 */
export function CtaBanner({
  title,
  description,
  descriptionLink,
  primaryCta,
  secondaryCta,
  gradient,
  featureTile,
  mediaVariant,
  ctaBelow,
  variant,
  visualSrc,
  visualAlt,
  spaceBottom,
  cards,
}: CtaBannerProps) {
  // Пара карточек — самостоятельная раскладка, широкий баннер в ней не участвует.
  if (cards && cards.length > 0) return <CtaBannerCards cards={cards} />;

  // Product-вариант: блок CTAproduct со своим градиентом и картинкой справа.
  if (variant === 'product') {
    return (
      <section
        className={cn(
          'mx-auto w-full max-w-(--container-kaiten)',
          'px-4 pt-10 md:px-6 xl:px-0',
          // Нижний отступ по брейкпоинтам: 48 мобилка / 64 планшет / 96 десктоп.
          // Снизу: 48 мобилка / 64 планшет / 96 десктоп.
          spaceBottom ? 'pb-12 md:pb-16 lg:pb-24 lg:pt-12' : 'pb-10 lg:py-12',
        )}
      >
        <CTAproduct
          title={title}
          text={description}
          buttonLabel={primaryCta.label}
          buttonHref={primaryCta.href}
          image={{ src: visualSrc ?? CTA_PRODUCT_IMAGE, alt: visualAlt ?? '' }}
        />
      </section>
    );
  }

  // Плитка рисуется только если такая подпись есть в галерее — иначе баннер
  // молча остаётся в прежней раскладке «текст слева, кнопки справа».
  const withTile = Boolean(featureTile && hasFeatureTile(featureTile));
  const withMock = Boolean(mediaVariant);
  const copy = (
    <div
      className={cn(
        withTile || withMock ? 'max-w-xl' : ctaBelow ? 'max-w-3xl' : 'max-w-2xl',
        // На планшете колонка одна: узкий блок текста центрируем целиком,
        // иначе выровненный по центру текст всё равно жался бы влево.
        withMock && 'md:mx-auto md:max-w-2xl lg:mx-0 lg:max-w-xl',
      )}
    >
      <h3 data-comp="cta_banner.title" className="text-2xl font-semibold leading-tight md:text-3xl">
        {title}
      </h3>
      {description && (
        <p
          data-comp="cta_banner.description"
          className="mt-3 text-base leading-relaxed text-(--color-text-primary)"
        >
          <LinkedText text={description} link={descriptionLink} />
        </p>
      )}
    </div>
  );

  const buttons = (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row',
        // В варианте с моком кнопки на мобилке по ширине контента
        // и по центру колонки; с планшета — обычный ряд слева.
        withMock &&
          // Подписи держим в одну строку: в узкой колонке десктопа они рвались.
          'items-center justify-center sm:items-start lg:justify-start [&_a]:whitespace-nowrap',
        (withTile || withMock || ctaBelow) && 'mt-6',
      )}
    >
      <Inspect name="cta_banner.primaryCta">
        <ButtonLink size="lg" href={primaryCta.href}>
          {primaryCta.label}
        </ButtonLink>
      </Inspect>
      {secondaryCta && (
        <Inspect name="cta_banner.secondaryCta">
          <ButtonLink variant="outline" size="lg" href={secondaryCta.href}>
            {secondaryCta.label}
          </ButtonLink>
        </Inspect>
      )}
    </div>
  );

  // С плиткой: слева текст и кнопка под ним, справа визуал.
  // Без плитки: прежняя раскладка — текст слева, кнопки справа.
  const inner = withMock ? (
    // С интерфейсным моком: слева текст и кнопки под ним, справа мок домена.
    <div className="flex flex-col gap-10 px-6 py-8 pb-6 md:px-12 md:py-10 lg:flex-row lg:gap-8 lg:items-center lg:justify-between lg:px-14 lg:py-12">
      {/* На планшете колонка одна и текст стоит по центру; с десктопа — влево. */}
      <div className="md:text-center lg:max-w-xl lg:text-left">
        {copy}
        {buttons}
      </div>
      <div aria-hidden className="w-full min-w-0 md:mx-auto md:max-w-md lg:mx-0">
        <MockVisual variant={mediaVariant as MockVariant} />
      </div>
    </div>
  ) : withTile ? (
    <div className={cn('flex flex-col gap-8', 'px-6 py-8 md:px-10 md:py-10 lg:flex-row lg:items-center lg:justify-between')}>
      <div>
        {copy}
        {buttons}
      </div>
      {/*
        Плитка галереи фиксирована по размеру (240×176). Увеличиваем её
        трансформом, а обёртке задаём итоговые размеры — иначе масштаб не
        участвует в потоке и баннер посчитает высоту по исходной плитке.
      */}
      <div
        aria-hidden
        className="shrink-0 self-center lg:mr-16 lg:self-auto"
        style={{ width: TILE_W * TILE_SCALE, height: TILE_H * TILE_SCALE }}
      >
        <div style={{ transform: `scale(${TILE_SCALE})`, transformOrigin: 'top left' }}>
          <FeatureTile caption={featureTile as string} />
        </div>
      </div>
    </div>
  ) : ctaBelow ? (
    // Кнопки под текстом: описание занимает всю ширину баннера и не сжимается
    // колонкой кнопок справа.
    <div className="px-6 py-8 md:px-10 md:py-10">
      {copy}
      {buttons}
    </div>
  ) : (
    <div className={cn('flex flex-col gap-6', 'px-6 py-8 md:px-10 md:py-10 lg:flex-row lg:items-center lg:justify-between')}>
      {copy}
      {buttons}
    </div>
  );

  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 py-10 md:px-6 xl:px-0',
        spaceBottom ? 'lg:pb-24 lg:pt-12' : 'lg:py-12',
      )}
    >
      {gradient ? (
        <GradientPanel>{inner}</GradientPanel>
      ) : (
        <div
          className={cn(
            'rounded-(--radius-3xl) border border-(--color-action-primary)/20',
            'bg-(--color-action-primary-soft)',
          )}
        >
          {inner}
        </div>
      )}
    </section>
  );
}
