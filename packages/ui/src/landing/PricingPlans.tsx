import { ButtonLink } from '../primitives/ButtonLink.js';
import { cn } from '../primitives/cn.js';

export interface PricingPlanProps {
  name: string;
  price: string;
  pricePeriod?: string;
  description?: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
}

export interface PricingPlansProps {
  eyebrow?: string;
  title: string;
  description?: string;
  plans: PricingPlanProps[];
}

export function PricingPlans({ eyebrow, title, description, plans }: PricingPlansProps) {
  return (
    <section
      className={cn(
        'bg-(--color-surface-section)',
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 py-16 md:px-6 lg:py-24',
      )}
    >
      <div className="mb-12 max-w-2xl">
        {eyebrow && (
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
        {description && (
          <p className="mt-4 text-lg text-(--color-text-secondary)">{description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={cn(
              'flex flex-col rounded-(--radius-3xl) p-8',
              plan.highlighted
                ? 'bg-(--color-action-primary) text-(--color-text-inverse) ring-2 ring-(--color-action-primary)'
                : 'border border-(--color-border-default) bg-(--color-surface-card)',
            )}
          >
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            {plan.description && (
              <p
                className={cn(
                  'mt-2 text-sm',
                  plan.highlighted
                    ? 'text-(--color-text-inverse)/80'
                    : 'text-(--color-text-secondary)',
                )}
              >
                {plan.description}
              </p>
            )}
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-semibold">{plan.price}</span>
              {plan.pricePeriod && (
                <span
                  className={cn(
                    'text-sm',
                    plan.highlighted
                      ? 'text-(--color-text-inverse)/70'
                      : 'text-(--color-text-secondary)',
                  )}
                >
                  /{plan.pricePeriod}
                </span>
              )}
            </div>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2 text-sm">
                  <span
                    aria-hidden
                    className={cn(
                      plan.highlighted ? 'text-(--color-text-inverse)' : 'text-(--color-text-accent)',
                    )}
                  >
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <ButtonLink
                href={plan.cta.href}
                variant={plan.highlighted ? 'outline' : 'fill'}
                size="lg"
                fullWidth
                className={
                  plan.highlighted
                    ? 'bg-(--color-text-inverse) text-(--color-action-primary) hover:bg-(--color-text-inverse)/90 border-transparent'
                    : ''
                }
              >
                {plan.cta.label}
              </ButtonLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
