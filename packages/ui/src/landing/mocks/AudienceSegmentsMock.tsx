import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface Segment {
  name: string;
  rule: string;
  size: string;
  trend: string;
  positive: boolean;
  highlight?: boolean;
}

const SEGMENTS: Segment[] = [
  { name: 'Free trial users', rule: 'Зарегистрировались < 14 дней', size: '12 450', trend: '+340 за неделю', positive: true },
  { name: 'Power users', rule: '20+ сессий за месяц, ≥3 модуля', size: '3 280', trend: '+86 за неделю', positive: true, highlight: true },
  { name: 'Churned', rule: 'Не открывал ≥30 дней, был активен', size: '1 840', trend: '−12 за неделю', positive: false },
  { name: 'New signups Q2', rule: 'Создан после 1 мая 2026', size: '5 100', trend: '+512 за неделю', positive: true },
];

/**
 * Mock списка сегментов аудитории: правило формирования + размер + рост.
 * Marketing-домен.
 */
export function AudienceSegmentsMock() {
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
          <span className="font-medium text-(--color-text-primary)">Сегменты · Активные</span>
          <span>8 шт</span>
          <span>22 670 пользователей всего</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">Список · Аналитика</span>
        </div>
      </div>
      <div className="p-4 md:p-5">
        <div className="space-y-2">
          {SEGMENTS.map((s) => (
            <div key={s.name} className={cn('flex items-start gap-3 rounded-(--radius-xl) border p-3', s.highlight ? 'border-(--color-action-primary)/40 bg-(--color-action-primary-soft)/30 shadow-sm' : 'border-(--color-border-default) bg-(--color-surface-page)')}>
              <span className={cn('inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-(--radius-xl)', s.highlight ? 'bg-(--color-action-primary) text-white' : 'bg-(--color-action-primary-soft) text-(--color-text-accent)')}>
                <Icon name="Users" className="h-4 w-4" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className={cn('truncate text-[12px] font-semibold', s.highlight ? 'text-(--color-text-accent)' : 'text-(--color-text-primary)')}>{s.name}</span>
                  <span className="shrink-0 text-[14px] font-semibold tabular-nums text-(--color-text-primary)">{s.size}</span>
                </div>
                <div className="mt-0.5 truncate text-[10.5px] text-(--color-text-secondary)">{s.rule}</div>
                <div className={cn('mt-1 inline-flex items-center gap-1 text-[10px] font-medium', s.positive ? 'text-green-700' : 'text-red-700')}>
                  <Icon name={s.positive ? 'TrendingUp' : 'TrendingDown'} className="h-3 w-3" strokeWidth={2.5} />
                  {s.trend}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
