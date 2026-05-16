import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface Step {
  day: string;
  subject: string;
  trigger: string;
  openRate: string;
  clickRate: string;
  active?: boolean;
}

const STEPS: Step[] = [
  { day: 'Day 0', subject: 'Welcome · добро пожаловать в Buffalo', trigger: 'Регистрация', openRate: '72%', clickRate: '38%' },
  { day: 'Day 1', subject: 'Setup tour · что попробовать первым', trigger: 'Welcome opened', openRate: '54%', clickRate: '26%' },
  { day: 'Day 3', subject: 'Tips · 5 неочевидных приёмов', trigger: 'Active 3+ дня', openRate: '47%', clickRate: '22%', active: true },
  { day: 'Day 7', subject: 'Case study · как Северный ветер вырос ×3', trigger: 'Active 7+ дней', openRate: '41%', clickRate: '18%' },
  { day: 'Day 14', subject: 'Upgrade offer · 20% на Pro до конца месяца', trigger: 'Если открывал tips', openRate: '38%', clickRate: '12%' },
];

/**
 * Mock email-цепочки: Day 0 → 1 → 3 → 7 → 14 с темами, триггерами и
 * метриками. Marketing-домен.
 */
export function EmailSequenceMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.30)]',
      )}
    >
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-yellow-300" />
        <span className="h-2 w-2 rounded-full bg-green-300" />
        <div className="ml-2 flex flex-wrap items-center gap-3 text-[11px] text-(--color-text-secondary)">
          <span className="font-medium text-(--color-text-primary)">Цепочка · Onboarding</span>
          <span>5 писем · 14 дней</span>
          <span>38% активных</span>
          <span>4,2% конверсия в Pro</span>
        </div>
      </div>
      <div className="p-4 md:p-5">
        <ol className="space-y-2">
          {STEPS.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-(--color-border-default) bg-(--color-surface-page) text-[10px] font-semibold text-(--color-text-primary)">{i + 1}</span>
              <div className={cn('flex-1 rounded-(--radius-xl) border p-3', s.active ? 'border-(--color-action-primary)/40 bg-(--color-action-primary-soft)/30 shadow-sm' : 'border-(--color-border-default) bg-(--color-surface-page)')}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">{s.day}</span>
                  <span className="text-[10px] text-(--color-text-secondary)">Trigger · {s.trigger}</span>
                </div>
                <div className="mt-1 flex items-start gap-2">
                  <Icon name="Mail" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-(--color-text-accent)" strokeWidth={2} />
                  <span className={cn('text-[11.5px] font-semibold leading-tight', s.active ? 'text-(--color-text-accent)' : 'text-(--color-text-primary)')}>{s.subject}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-(--color-text-secondary)">
                  <span><span className="font-semibold text-(--color-text-primary)">Open </span>{s.openRate}</span>
                  <span><span className="font-semibold text-(--color-text-primary)">Click </span>{s.clickRate}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
