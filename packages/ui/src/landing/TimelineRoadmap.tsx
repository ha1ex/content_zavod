import { Inspect } from '../primitives/Inspect';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';

export interface TimelineMilestoneProps {
  /** Период вехи («Q1 2026», «2 недели»). Не нужен, когда timeline нумерованный. */
  period?: string;
  title: string;
  description?: string;
  status?: 'done' | 'in-progress' | 'planned';
  bullets?: string[];
}

export interface TimelineRoadmapProps {
  eyebrow?: string;
  title: string;
  description?: string;
  milestones: TimelineMilestoneProps[];
  orientation?: 'horizontal' | 'vertical';
  /**
   * Нумерованный вертикальный timeline: маркер несёт порядковый номер вехи
   * вместо статусной точки. Для программ и планов, где важен порядок пунктов,
   * а не даты. Только для orientation='vertical'.
   */
  numbered?: boolean;
}

/**
 * Timeline / roadmap для migration-from-competitor (план миграции),
 * product-launch (что дальше), case-study-deep-dive (implementation timeline).
 *
 * Horizontal — компактный для overview. Vertical — детальный с описаниями.
 */
export function TimelineRoadmap({
  eyebrow,
  title,
  description,
  milestones,
  orientation = 'vertical',
  numbered = false,
}: TimelineRoadmapProps) {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 py-16 md:px-6 xl:px-0 lg:py-20',
      )}
    >
      <div className="mb-10 max-w-2xl">
        {eyebrow && (
          <p
            data-comp="timeline_roadmap.eyebrow"
            className="mb-3 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)"
          >
            {eyebrow}
          </p>
        )}
        <h2
          data-comp="timeline_roadmap.title"
          className="text-3xl font-semibold leading-tight md:text-4xl"
        >
          {title}
        </h2>
        {description && (
          <p
            data-comp="timeline_roadmap.description"
            className="mt-4 text-lg text-(--color-text-primary)"
          >
            {description}
          </p>
        )}
      </div>

      {orientation === 'horizontal' ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m, i) => (
            <Inspect
              as="div"
              key={i}
              name={`timeline_roadmap.milestones[${i}]`}
              className={cn(
                'rounded-(--radius-2xl) border border-(--color-border-default)',
                'bg-(--color-surface-card) p-6',
              )}
            >
              <StatusBadge status={m.status} />
              {m.period && (
                <p
                  data-comp={`timeline_roadmap.milestones[${i}].period`}
                  className="mt-3 text-xs font-medium uppercase tracking-wide text-(--color-text-secondary)"
                >
                  {m.period}
                </p>
              )}
              <h3
                data-comp={`timeline_roadmap.milestones[${i}].title`}
                className="mt-2 text-lg font-semibold text-(--color-text-primary)"
              >
                {m.title}
              </h3>
              {m.description && (
                <p
                  data-comp={`timeline_roadmap.milestones[${i}].description`}
                  className="mt-2 text-sm text-(--color-text-primary)"
                >
                  {m.description}
                </p>
              )}
            </Inspect>
          ))}
        </div>
      ) : (
        <ol className="relative ml-4 space-y-8 border-l border-(--color-border-default) pl-8 md:space-y-10">
          {milestones.map((m, i) => (
            <Inspect
              as="li"
              key={i}
              name={`timeline_roadmap.milestones[${i}]`}
              className="relative"
            >
              {numbered ? (
                <span
                  aria-hidden
                  className={cn(
                    'absolute -left-[48px] top-0 flex h-8 w-8 items-center justify-center rounded-full',
                    'bg-(--color-action-primary) text-sm font-semibold text-(--color-text-inverse)',
                  )}
                >
                  {i + 1}
                </span>
              ) : (
                <span
                  aria-hidden
                  className={cn(
                    'absolute -left-[37px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border',
                    m.status === 'done'
                      ? 'border-(--color-action-primary) bg-(--color-action-primary) text-white'
                      : m.status === 'in-progress'
                        ? 'border-(--color-action-primary) bg-(--color-surface-card)'
                        : 'border-(--color-border-default) bg-(--color-surface-card)',
                  )}
                >
                  {m.status === 'done' && <Icon name="Check" className="h-3 w-3" />}
                </span>
              )}
              {(m.period || m.status) && (
                <div className="flex flex-wrap items-baseline gap-2">
                  {m.period && (
                    <p
                      data-comp={`timeline_roadmap.milestones[${i}].period`}
                      className="text-xs font-medium uppercase tracking-wide text-(--color-text-secondary)"
                    >
                      {m.period}
                    </p>
                  )}
                  <StatusBadge status={m.status} />
                </div>
              )}
              <h3
                data-comp={`timeline_roadmap.milestones[${i}].title`}
                className="mt-1 text-xl font-semibold text-(--color-text-primary)"
              >
                {m.title}
              </h3>
              {m.description && (
                <p
                  data-comp={`timeline_roadmap.milestones[${i}].description`}
                  className="mt-2 text-base text-(--color-text-primary)"
                >
                  {m.description}
                </p>
              )}
              {m.bullets && m.bullets.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {m.bullets.map((b, j) => (
                    <Inspect
                      as="li"
                      key={j}
                      name={`timeline_roadmap.milestones[${i}].bullets[${j}]`}
                      className="flex items-start gap-2 text-sm text-(--color-text-primary)"
                    >
                      <Icon
                        name="ChevronRight"
                        className="mt-0.5 h-4 w-4 shrink-0 text-(--color-action-primary)"
                      />
                      <span>{b}</span>
                    </Inspect>
                  ))}
                </ul>
              )}
            </Inspect>
          ))}
        </ol>
      )}
    </section>
  );
}

function StatusBadge({ status }: { status?: TimelineMilestoneProps['status'] }) {
  if (!status) return null;
  const label =
    status === 'done' ? 'Готово' : status === 'in-progress' ? 'В работе' : 'Запланировано';
  const className =
    status === 'done'
      ? 'bg-(--color-green-100) text-green-700'
      : status === 'in-progress'
        ? 'bg-(--color-action-primary-soft) text-(--color-text-accent)'
        : 'bg-(--color-neutral-200) text-(--color-text-secondary)';
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide',
        className,
      )}
    >
      {label}
    </span>
  );
}
