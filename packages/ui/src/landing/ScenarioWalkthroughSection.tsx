import { Icon } from '../primitives/Icon';
import { Inspect } from '../primitives/Inspect';
import { cn } from '../primitives/cn';
import { MockVisual, type MockVariant } from './mocks';

export interface ScenarioStepProps {
  time: string;
  title: string;
  description: string;
  icon?: string;
  mockVariant: MockVariant;
}

export interface ScenarioWalkthroughSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  protagonist?: string;
  steps: ScenarioStepProps[];
}

/**
 * ScenarioWalkthroughSection — нарративная секция «День из жизни» (например,
 * «День менеджера продаж»). Вертикальный таймлайн, на каждом шаге чередуются
 * стороны mock и текста. У каждого шага — время суток, заголовок действия,
 * описание и mock интерфейса в этот момент. Дает живое представление о
 * продукте без сухого MediaCopy×N.
 */
export function ScenarioWalkthroughSection({
  eyebrow,
  title,
  description,
  protagonist,
  steps,
}: ScenarioWalkthroughSectionProps) {
  return (
    <section
      className={cn(
        'relative',
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 py-16 md:px-6 lg:py-24',
      )}
    >
      <div className="mb-14 max-w-3xl">
        {eyebrow && (
          <p
            data-comp="scenario_walkthrough.eyebrow"
            className="mb-3 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)"
          >
            {eyebrow}
          </p>
        )}
        <h2
          data-comp="scenario_walkthrough.title"
          className="text-3xl font-semibold leading-tight md:text-4xl"
        >
          {title}
        </h2>
        {description && (
          <p
            data-comp="scenario_walkthrough.description"
            className="mt-4 text-lg leading-relaxed text-(--color-text-secondary)"
          >
            {description}
          </p>
        )}
        {protagonist && (
          <div
            className={cn(
              'mt-5 inline-flex items-center gap-2 rounded-full',
              'border border-(--color-border-default) bg-(--color-surface-section) px-3 py-1.5',
              'text-sm text-(--color-text-secondary)',
            )}
          >
            <Icon name="UserRound" className="h-4 w-4 text-(--color-text-accent)" strokeWidth={2} />
            <span data-comp="scenario_walkthrough.protagonist">{protagonist}</span>
          </div>
        )}
      </div>

      <ol className="relative space-y-14">
        {/* spine — only on lg+ */}
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute left-1/2 top-2 hidden h-[calc(100%-1rem)] w-px -translate-x-1/2 lg:block',
            'bg-gradient-to-b from-(--color-action-primary)/40 via-(--color-border-default) to-transparent',
          )}
        />
        {steps.map((s, i) => {
          const reverse = i % 2 === 1;
          return (
            <Inspect
              as="li"
              key={i}
              name={`scenario_walkthrough.steps[${i}]`}
              className={cn(
                'relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-16',
              )}
            >
              {/* timeline dot */}
              <span
                aria-hidden
                className={cn(
                  'absolute left-1/2 top-0 hidden h-10 w-10 -translate-x-1/2 items-center justify-center',
                  'rounded-full border border-(--color-action-primary)/30 bg-(--color-surface-page) text-(--color-text-accent) shadow-sm lg:inline-flex',
                )}
              >
                <span className="text-xs font-semibold tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              </span>

              <div className={cn(reverse ? 'lg:order-2 lg:pl-10' : 'lg:pr-10')}>
                <div
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border border-(--color-border-default)',
                    'bg-(--color-surface-page) px-3 py-1.5 text-xs font-medium text-(--color-text-secondary)',
                  )}
                >
                  {s.icon && <Icon name={s.icon} className="h-3.5 w-3.5 text-(--color-text-accent)" strokeWidth={2} />}
                  <span data-comp={`scenario_walkthrough.steps[${i}].time`}>{s.time}</span>
                </div>
                <h3
                  data-comp={`scenario_walkthrough.steps[${i}].title`}
                  className="mt-4 text-2xl font-semibold leading-tight md:text-3xl"
                >
                  {s.title}
                </h3>
                <p
                  data-comp={`scenario_walkthrough.steps[${i}].description`}
                  className="mt-3 text-base leading-relaxed text-(--color-text-secondary) md:text-lg"
                >
                  {s.description}
                </p>
              </div>
              <Inspect
                as="div"
                name={`scenario_walkthrough.steps[${i}].mockVariant`}
                className={cn(reverse ? 'lg:order-1 lg:pr-10' : 'lg:pl-10')}
              >
                <MockVisual variant={s.mockVariant} />
              </Inspect>
            </Inspect>
          );
        })}
      </ol>
    </section>
  );
}
