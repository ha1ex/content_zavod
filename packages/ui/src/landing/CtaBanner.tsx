import { ButtonLink } from '../primitives/ButtonLink';
import { Icon } from '../primitives/Icon';
import { Inspect } from '../primitives/Inspect';
import { cn } from '../primitives/cn';
import { GradientPanel } from './GradientPanel';
import { FeatureTile, hasFeatureTile } from './mocks/FeatureTile';

/** Исходный размер плитки галереи и её увеличение в баннере. */
const TILE_W = 240;
const TILE_H = 176;
const TILE_SCALE = 1.5;

export interface CtaBannerCtaProps {
  label: string;
  href: string;
}

export interface CtaBannerProps {
  title: string;
  description?: string;
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
  primaryCta,
  secondaryCta,
  gradient,
  featureTile,
  cards,
}: CtaBannerProps) {
  // Пара карточек — самостоятельная раскладка, широкий баннер в ней не участвует.
  if (cards && cards.length > 0) return <CtaBannerCards cards={cards} />;

  // Плитка рисуется только если такая подпись есть в галерее — иначе баннер
  // молча остаётся в прежней раскладке «текст слева, кнопки справа».
  const withTile = Boolean(featureTile && hasFeatureTile(featureTile));
  const copy = (
    <div className={cn(withTile ? 'max-w-xl' : 'max-w-2xl')}>
      <h3 data-comp="cta_banner.title" className="text-2xl font-semibold leading-tight md:text-3xl">
        {title}
      </h3>
      {description && (
        <p
          data-comp="cta_banner.description"
          className="mt-3 text-base leading-relaxed text-(--color-text-primary)"
        >
          {description}
        </p>
      )}
    </div>
  );

  const buttons = (
    <div className={cn('flex flex-col gap-3 sm:flex-row', withTile && 'mt-6')}>
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
  const inner = withTile ? (
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
        'px-4 py-10 md:px-6 xl:px-0 lg:py-12',
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
