import { Inspect } from '../primitives/Inspect';
import { cn } from '../primitives/cn';

export interface LogoCloudItemProps {
  brand: string;
  brandInitial?: string;
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
        'px-4 py-12 md:px-6 xl:px-0 md:py-16',
      )}
    >
      {(eyebrow || title || description) && (
        <div className="mb-8 max-w-2xl">
          {eyebrow && (
            <p
              data-comp="logo_cloud.eyebrow"
              className="mb-3 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)"
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
              className="mt-3 text-base text-(--color-text-secondary)"
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
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
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
      </div>
    </section>
  );
}
