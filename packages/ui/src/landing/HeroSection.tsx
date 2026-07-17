import { ButtonLink } from '../primitives/ButtonLink';
import { Inspect } from '../primitives/Inspect';
import { cn } from '../primitives/cn';
import { MockVisual, type MockVariant } from './mocks';
import {
  HeroScreenInterface,
  type HsiColumnHeader,
  type HsiLane,
  type HsiAnimatedCard,
} from './HeroScreenInterface';
import { RegistrationForm } from './RegistrationForm';

/**
 * Доменная доска-заглушка для hero-варианта `hero-screen-interface`
 * (анимированный первый экран `HeroScreenInterface`). Тема — управление
 * задачами и проектами продуктовой/разработческой команды.
 */
const HSI_BOARD_COLUMNS: HsiColumnHeader[] = [
  { label: 'Очередь', count: 3 },
  { label: 'В работе', count: 4 },
  { label: 'Готово', count: 5, done: true },
];

const HSI_BOARD_LANES: HsiLane[] = [
  {
    name: 'Продукт',
    count: 6,
    columns: [
      [{ title: 'Импорт задач из ClickUp', tags: [{ label: 'Миграция', variant: 'blue' }], assignees: ['#e57373'], due: '12 июн' }],
      [{ title: 'Настроить дорожки и WIP-лимиты', tags: [{ label: 'Процесс', variant: 'jud' }], checklist: { label: 'Чек-лист', done: 2, total: 4 }, assignees: ['#64b5f6', '#81c784'] }],
      [{ title: 'Релиз мобильного приложения', tags: [{ label: 'Готово', variant: 'ok' }], assignees: ['#9575cd'], due: '3 июн' }],
    ],
  },
  {
    name: 'Разработка',
    count: 4,
    columns: [
      [{ title: 'API вебхуки для GitLab', tags: [{ label: 'Разработка', variant: 'prod' }], assignees: ['#4db6ac'] }],
      [{ title: 'Скрам-доска спринта', tags: [{ label: 'В работе', variant: 'urg' }], assignees: ['#ff8a65'] }],
      [{ title: 'Обновить базу знаний', tags: [{ label: 'Готово', variant: 'ok' }], assignees: ['#a1887f'] }],
    ],
  },
];

const HSI_BOARD_ANIMATED: HsiAnimatedCard = {
  card: { title: 'Согласовать переезд команды', tags: [{ label: 'Миграция', variant: 'blue' }], assignees: ['#e57373'] },
  fromColumn: 0,
};

export interface CtaProps {
  label: string;
  href: string;
}

export interface AssetRefProps {
  type: 'product_screenshot' | 'illustration' | 'logo_cloud' | 'photo';
  assetId?: string;
  src?: string;
  alt?: string;
  /** Built-in detailed mocks (see ./mocks). When set, ignores src. */
  variant?: MockVariant | 'generic' | 'hero-screen-interface';
  /**
   * Reference to an auto-generated unique SVG illustration (P8 phase).
   * When set, renderer uses it instead of variant. Currently passed through
   * but not rendered (M4 full integration upcoming).
   */
  illustrationId?: string;
}

export interface HeroSectionProps {
  eyebrow?: string;
  title: string;
  /**
   * Optional accent word/phrase that will be visually highlighted inside the title
   * (Kaiten signature — фиолетовая pill вокруг ключевого слова).
   */
  accentWord?: string;
  subtitle: string;
  primaryCta: CtaProps;
  secondaryCta?: CtaProps | null;
  visual?: AssetRefProps | null;
  /**
   * 'side' (default) — mock справа, layout 50/50
   * 'below' — большой mock под текстом, контент по центру (Kaiten home pattern)
   */
  visualPosition?: 'side' | 'below';
  /**
   * Данные доски для visual.variant='hero-screen-interface' (тексты карточек
   * под логику ТЗ). Если не задано — доменный дефолт HSI_BOARD_*.
   */
  board?: {
    boardTitle: string;
    columns: HsiColumnHeader[];
    lanes: HsiLane[];
    animate?: boolean;
    animatedCard?: HsiAnimatedCard;
  };
  /**
   * Короткие буллеты под подзаголовком («что заберёте» на лендинге вебинара).
   * Рендерятся только в layout 'side'.
   */
  bullets?: string[];
  /**
   * Карточка формы регистрации в правой колонке — вместо `visual`. Когда задана,
   * кнопки CTA не рендерятся: submit формы и есть целевое действие, а его подпись
   * берётся из `primaryCta.label`. Для лендингов, у которых цель — регистрация.
   *
   * Только для `visualPosition: 'side'`. Раскладка `'below'` и вариант
   * `hero-screen-interface` рендерят свой первый экран и форму не показывают.
   */
  form?: HeroFormProps;
  /** Строка ведущего под формой/текстом: фото или инициалы, имя, роль. */
  speaker?: HeroSpeakerProps;
}

export interface HeroFormProps {
  anchorId?: string;
  action?: string;
  dataConsentHref?: string;
  note?: string;
}

export interface HeroSpeakerProps {
  name: string;
  role: string;
  photoSrc?: string;
  photoAlt?: string;
  initials?: string;
}

/**
 * Kaiten V01 hero с двумя вариантами layout:
 * - side: текст слева, продуктовый mock справа (B2B 50/50)
 * - below: контент по центру, mock огромный под ним (как на kaiten.ru)
 *
 * Title поддерживает accentWord — кусочек заголовка оборачивается в pill
 * с фиолетовым подсветом (Kaiten signature).
 */
export function HeroSection({
  eyebrow,
  title,
  accentWord,
  subtitle,
  primaryCta,
  secondaryCta,
  visual,
  visualPosition = 'side',
  board,
  bullets,
  form,
  speaker,
}: HeroSectionProps) {
  // Вариант `hero-screen-interface` — весь первый экран рендерит эталонный
  // `HeroScreenInterface` (анимированная канбан-доска). Копирайт берём из
  // props, доску — из props.board (тексты под ТЗ) или доменный дефолт
  // HSI_BOARD_*. Правило: `comparison-hero-screen`.
  if (visual?.variant === 'hero-screen-interface') {
    return (
      <HeroScreenInterface
        eyebrow={eyebrow}
        heading={title}
        subheading={subtitle}
        primaryCta={{ label: primaryCta.label, href: primaryCta.href }}
        secondaryCta={secondaryCta ? { label: secondaryCta.label, href: secondaryCta.href } : undefined}
        boardTitle={board?.boardTitle ?? 'Портфель задач'}
        columns={board?.columns ?? HSI_BOARD_COLUMNS}
        lanes={board?.lanes ?? HSI_BOARD_LANES}
        animate={board?.animate ?? true}
        animatedCard={board?.animatedCard ?? HSI_BOARD_ANIMATED}
        ariaLabel="Первый экран Kaiten"
      />
    );
  }

  const renderedTitle = accentWord ? highlightAccent(title, accentWord) : title;
  const isBelow = visualPosition === 'below';

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden',
        'bg-(--color-surface-page) text-(--color-text-primary)',
      )}
    >
      {/*
        Full-bleed decorative gradient — must span the entire positioned ancestor.
        Никаких `max-w-*` / `mx-auto` на background-слое: на широких мониторах
        (>1440px) такой слой обрезается полосами по бокам. Капать ширину можно
        только у контентного контейнера ниже.
      */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 -top-32 -z-10 h-[720px]',
          'bg-[radial-gradient(60%_60%_at_70%_0%,rgba(125,76,207,0.22)_0%,rgba(125,76,207,0)_60%),radial-gradient(40%_40%_at_15%_30%,rgba(33,150,243,0.10)_0%,rgba(33,150,243,0)_60%)]',
        )}
      />

      <div
        className={cn(
          'mx-auto w-full max-w-(--container-kaiten)',
          'px-4 pt-14 pb-12 md:px-6 lg:pt-20',
          isBelow ? 'lg:pb-12' : 'lg:pb-20',
        )}
      >
        {isBelow ? (
          <div className="flex flex-col items-center gap-12">
            <div className="max-w-3xl text-center">
              {eyebrow && (
                <Inspect name="hero.eyebrow">
                  <EyebrowPill>{eyebrow}</EyebrowPill>
                </Inspect>
              )}
              <h1
                data-comp="hero.title"
                className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl"
              >
                {renderedTitle}
              </h1>
              <p
                data-comp="hero.subtitle"
                className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-(--color-text-secondary) sm:text-xl"
              >
                {subtitle}
              </p>
              <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
                <Inspect name="hero.primaryCta">
                  <ButtonLink size="lg" href={primaryCta.href}>
                    {primaryCta.label}
                  </ButtonLink>
                </Inspect>
                {secondaryCta && (
                  <Inspect name="hero.secondaryCta">
                    <ButtonLink variant="outline" size="lg" href={secondaryCta.href}>
                      {secondaryCta.label}
                    </ButtonLink>
                  </Inspect>
                )}
              </div>
            </div>
            {visual && (
              <div data-comp="hero.visual" className="w-full">
                <HeroVisual src={visual.src} alt={visual.alt} variant={visual.variant} large />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-12 xl:flex-row xl:items-center xl:gap-16">
            <div className="xl:max-w-2xl">
              {eyebrow && (
                <Inspect name="hero.eyebrow">
                  <EyebrowPill>{eyebrow}</EyebrowPill>
                </Inspect>
              )}
              <h1
                data-comp="hero.title"
                className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl"
              >
                {renderedTitle}
              </h1>
              <p
                data-comp="hero.subtitle"
                className="mt-6 max-w-xl text-lg leading-relaxed text-(--color-text-secondary) sm:text-xl"
              >
                {subtitle}
              </p>
              {bullets && bullets.length > 0 && (
                <ul data-comp="hero.bullets" className="mt-8 flex max-w-xl flex-col gap-3">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckMark />
                      <span className="text-base leading-relaxed text-(--color-text-secondary) sm:text-lg">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {/* Форма сама несёт целевое действие — дублирующая кнопка не нужна. */}
              {!form && (
                <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                  <Inspect name="hero.primaryCta">
                    <ButtonLink size="lg" href={primaryCta.href}>
                      {primaryCta.label}
                    </ButtonLink>
                  </Inspect>
                  {secondaryCta && (
                    <Inspect name="hero.secondaryCta">
                      <ButtonLink variant="outline" size="lg" href={secondaryCta.href}>
                        {secondaryCta.label}
                      </ButtonLink>
                    </Inspect>
                  )}
                </div>
              )}
              {speaker && <SpeakerLine {...speaker} />}
            </div>
            {form ? (
              <div data-comp="hero.form" className="w-full xl:max-w-[420px] xl:flex-1">
                <RegistrationForm
                  submitLabel={primaryCta.label}
                  anchorId={form.anchorId}
                  action={form.action}
                  dataConsentHref={form.dataConsentHref}
                  note={form.note}
                />
              </div>
            ) : (
              visual && (
                <div data-comp="hero.visual" className="xl:flex-1">
                  <HeroVisual src={visual.src} alt={visual.alt} variant={visual.variant} />
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── private ─── */

function CheckMark() {
  return (
    <span
      aria-hidden
      className={cn(
        'mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
        'bg-(--color-action-primary-soft) text-(--color-text-accent)',
      )}
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function SpeakerLine({ name, role, photoSrc, photoAlt, initials }: HeroSpeakerProps) {
  return (
    <div data-comp="hero.speaker" className="mt-8 flex items-center gap-3">
      {/* Фиолетовая заливка — и под фото: портрет вырезан с прозрачным фоном,
          поэтому круг служит ему фоном (как в блоке SpeakerCard). */}
      <span
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full',
          'bg-(--color-action-primary) text-sm font-semibold text-(--color-text-inverse)',
        )}
      >
        {photoSrc ? (
          <img
            src={photoSrc}
            alt={photoAlt ?? name}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <span aria-hidden>{initials ?? name.slice(0, 1)}</span>
        )}
      </span>
      <span className="text-base text-(--color-text-secondary)">
        <span className="font-medium text-(--color-text-primary)">{name}</span>
        {', '}
        {role}
      </span>
    </div>
  );
}

function EyebrowPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'mb-5 inline-flex items-center rounded-full px-3 py-1',
        'border border-(--color-action-primary)/20',
        'bg-(--color-action-primary-soft) text-sm font-medium text-(--color-text-accent)',
      )}
    >
      {children}
    </span>
  );
}

/**
 * Splits the title around accentWord (case-insensitive, first match) and wraps
 * the match in a styled pill. If no match is found, returns title unchanged.
 *
 * Пробелы внутри accentWord сопоставляются с любым пробелом заголовка: по
 * дизайн-системе в заголовке стоят неразрывные пробелы (висячие предлоги), и
 * иначе подсветка молча пропадала бы из-за несовпадения обычного пробела с nbsp.
 */
function highlightAccent(title: string, accent: string): React.ReactNode {
  const pattern = accent
    .trim()
    .split(/\s+/)
    .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('\\s+');
  const found = new RegExp(pattern, 'i').exec(title);
  if (!found) return title;
  const idx = found.index;
  const before = title.slice(0, idx);
  const match = found[0];
  const after = title.slice(idx + match.length);
  return (
    <>
      {before}
      <span
        className={cn(
          'inline-block rounded-(--radius-2xl) bg-(--color-action-primary-soft)',
          'px-3 pb-1 text-(--color-text-accent)',
        )}
      >
        {match}
      </span>
      {after}
    </>
  );
}

interface HeroVisualProps {
  src?: string;
  alt?: string;
  variant?: AssetRefProps['variant'];
  large?: boolean;
}

function HeroVisual({ src, alt, variant, large = false }: HeroVisualProps) {
  // 'hero-screen-interface' обрабатывается в HeroSection (ранний возврат) и сюда
  // не доходит; исключаем его из union перед вызовом MockVisual.
  if (variant && variant !== 'generic' && variant !== 'hero-screen-interface') {
    const rendered = <MockVisual variant={variant} />;
    if (rendered) return rendered;
  }
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ''}
        className="block w-full rounded-(--radius-3xl) shadow-xl"
      />
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.30)]',
      )}
    >
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
        <span className="ml-4 h-4 w-40 rounded-md bg-(--color-neutral-200)" />
      </div>

      {/* board */}
      <div
        className={cn(
          'grid gap-3',
          large ? 'grid-cols-4 p-6 md:p-8' : 'grid-cols-3 p-5',
        )}
      >
        {(large
          ? ['Очередь', 'В работе', 'Готовлю ответ', 'Готово']
          : ['Очередь', 'В работе', 'Готово']
        ).map((col, ci, arr) => (
          <div key={col} className="space-y-3">
            <div className="flex items-center justify-between text-xs font-medium text-(--color-text-secondary)">
              <span>{col}</span>
              <span className="rounded-full bg-(--color-neutral-200) px-2 py-0.5">
                {arr.length - ci}
              </span>
            </div>
            {Array.from({ length: arr.length - ci }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-page) shadow-sm',
                  large ? 'p-4' : 'p-3',
                )}
              >
                <div
                  className={cn(
                    'mb-2 h-2 w-12 rounded-full',
                    ci === 0 && i === 0
                      ? 'bg-(--color-action-primary)'
                      : ci === 1
                        ? 'bg-(--color-orange-100)'
                        : ci === 2
                          ? 'bg-(--color-blue-100)'
                          : 'bg-(--color-green-100)',
                  )}
                />
                <div className="space-y-1.5">
                  <div className="h-2 w-full rounded-full bg-(--color-neutral-200)" />
                  <div className="h-2 w-3/4 rounded-full bg-(--color-neutral-200)" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="h-5 w-12 rounded-full bg-(--color-action-primary-soft)" />
                  <div className="h-5 w-5 rounded-full bg-(--color-neutral-300)" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
