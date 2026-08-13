import { Inspect } from '../primitives/Inspect';
import { cn } from '../primitives/cn';

export interface LogoCloudItemProps {
  brand: string;
  brandInitial?: string;
  /** URL логотипа. Если задан — рендерим картинку на светлой плитке (читается на тёмном фоне). */
  logoSrc?: string;
  /** Ссылка на сайт партнёра (открывается в новой вкладке). */
  href?: string;
}

export interface LogoCloudProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: LogoCloudItemProps[];
}

/**
 * Узкая полоса логотипов клиентов для trust signal (enterprise-modular-saas,
 * compliance-first, migration-from-competitor). Используются инициалы как
 * stand-in для логотипов — без хранения внешних SVG.
 */
export function LogoCloud({ eyebrow, title, description, items }: LogoCloudProps) {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 py-12 md:px-6 md:py-16 xl:px-0 lg:py-24',
      )}
    >
      {(eyebrow || title || description) && (
        <div className="mb-6 max-w-2xl text-left md:mx-auto md:mb-8 md:text-center lg:mb-12 lg:max-w-4xl">
          {eyebrow && (
            <p
              data-comp="logo_cloud.eyebrow"
              className="mb-3 text-sm font-medium uppercase text-(--color-text-accent)"
            >
              {eyebrow}
            </p>
          )}
          {title && (
            <h2
              data-comp="logo_cloud.title"
              className="text-2xl font-semibold leading-tight md:text-3xl"
            >
              {title}
            </h2>
          )}
          {description && (
            <p
              data-comp="logo_cloud.description"
              className="mt-3 text-base text-(--color-text-primary)"
            >
              {description}
            </p>
          )}
        </div>
      )}

      <div
        className={cn(
          'rounded-(--radius-2xl) border border-(--color-border-default)',
          'bg-(--color-surface-card) px-6 py-8',
        )}
      >
        {items.some((it) => it.logoSrc) ? (
          // Логотипы — flex-wrap строка: все выровнены по ВЫСОТЕ, ширина
          // натуральная (без искажений), как на исходном лендинге конференции.
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-7 md:gap-x-12 lg:gap-x-14">
            {items.map((item, i) => (
              <LogoTile key={i} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {items.map((item, i) => (
              <Inspect
                as="div"
                key={i}
                name={`logo_cloud.items[${i}]`}
                className="flex items-center justify-center gap-3 opacity-70 transition hover:opacity-100"
              >
                <span
                  aria-hidden
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-(--radius-lg)',
                    'border border-(--color-border-default) bg-(--color-surface-page)',
                    'text-sm font-semibold text-(--color-text-primary)',
                  )}
                >
                  {item.brandInitial ?? item.brand.charAt(0).toUpperCase()}
                </span>
                <span
                  data-comp={`logo_cloud.items[${i}].brand`}
                  className="text-sm font-medium text-(--color-text-secondary)"
                >
                  {item.brand}
                </span>
              </Inspect>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Плитка логотипа партнёра: картинка БЕЗ подложки — логотипы уже сделаны под
 * тёмный фон (светлые/контурные), как на исходном лендинге конференции.
 */
function LogoTile({ item, index }: { item: LogoCloudItemProps; index: number }) {
  const logo = (
    <img
      src={item.logoSrc}
      alt={item.brand}
      className="h-7 w-auto object-contain md:h-8"
    />
  );
  return (
    <Inspect
      as="div"
      name={`logo_cloud.items[${index}]`}
      className="flex items-center opacity-80 transition hover:opacity-100"
    >
      {item.href ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.brand}
          className="flex items-center"
        >
          {logo}
        </a>
      ) : (
        logo
      )}
    </Inspect>
  );
}
