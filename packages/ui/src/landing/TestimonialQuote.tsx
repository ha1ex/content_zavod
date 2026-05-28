import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';

export interface TestimonialQuoteProps {
  eyebrow?: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  brandName?: string;
  brandInitial?: string;
  metric?: string;
}

/**
 * Крупное цитата-полотно одного спикера для case-study-deep-dive и
 * story-led-unaware layouts. В отличие от SocialProof (3 карточки),
 * это single hero-quote.
 */
export function TestimonialQuote({
  eyebrow,
  quote,
  authorName,
  authorRole,
  brandName,
  brandInitial,
  metric,
}: TestimonialQuoteProps) {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 py-16 md:px-6 lg:py-20',
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-(--radius-3xl) border border-(--color-border-default)',
          'bg-(--color-surface-card) px-6 py-12 md:px-12 md:py-16',
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-(--color-action-primary) opacity-15 blur-3xl"
        />

        <div className="relative max-w-3xl">
          {eyebrow && (
            <p
              data-comp="testimonial_quote.eyebrow"
              className="mb-4 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)"
            >
              {eyebrow}
            </p>
          )}

          <Icon
            name="Quote"
            className="mb-5 h-10 w-10 text-(--color-action-primary)"
            aria-hidden
          />

          <blockquote
            data-comp="testimonial_quote.quote"
            className="text-2xl font-medium leading-snug text-(--color-text-primary) md:text-3xl"
          >
            «{quote}»
          </blockquote>

          {metric && (
            <p
              data-comp="testimonial_quote.metric"
              className="mt-6 text-lg font-semibold text-(--color-text-accent)"
            >
              {metric}
            </p>
          )}

          <div className="mt-8 flex items-center gap-4">
            <span
              aria-hidden
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-(--radius-2xl)',
                'bg-(--color-action-primary-soft) text-lg font-semibold text-(--color-text-accent)',
              )}
            >
              {brandInitial ?? (brandName ?? authorName).charAt(0).toUpperCase()}
            </span>
            <div>
              <p
                data-comp="testimonial_quote.authorName"
                className="text-base font-semibold text-(--color-text-primary)"
              >
                {authorName}
              </p>
              {(authorRole || brandName) && (
                <p className="text-sm text-(--color-text-secondary)">
                  {authorRole && (
                    <span data-comp="testimonial_quote.authorRole">{authorRole}</span>
                  )}
                  {authorRole && brandName && ' · '}
                  {brandName && (
                    <span data-comp="testimonial_quote.brandName">{brandName}</span>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
