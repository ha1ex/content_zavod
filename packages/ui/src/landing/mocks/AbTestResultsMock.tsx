import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface Variant {
  label: string;
  text: string;
  impressions: string;
  clicks: string;
  conversionRate: string;
  conversionPercent: number;
  winner?: boolean;
}

const VARIANTS: Variant[] = [
  { label: 'Variant A', text: 'Попробовать бесплатно', impressions: '28 540', clicks: '1 720', conversionRate: '6,0%', conversionPercent: 60 },
  { label: 'Variant B', text: 'Начать за 1 минуту', impressions: '28 480', clicks: '2 392', conversionRate: '8,4%', conversionPercent: 84, winner: true },
];

/**
 * Mock результатов A/B-теста: 2 варианта Hero CTA с метриками, победитель
 * Variant B. Marketing-домен.
 */
export function AbTestResultsMock() {
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
          <span className="font-medium text-(--color-text-primary)">Тест · Hero CTA</span>
          <span>14 дней</span>
          <span>57 020 показов</span>
        </div>
      </div>
      <div className="grid gap-3 p-4 md:gap-4 md:p-5">
        <div className="grid gap-3 md:grid-cols-2">
          {VARIANTS.map((v) => (
            <div key={v.label} className={cn('rounded-(--radius-xl) border p-4', v.winner ? 'border-(--color-action-primary)/40 bg-(--color-action-primary-soft)/30 shadow-sm' : 'border-(--color-border-default) bg-(--color-surface-page)')}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">{v.label}</span>
                {v.winner && (
                  <span className="inline-flex h-5 items-center gap-1 rounded-full bg-(--color-action-primary) px-2 text-[10px] font-medium text-white">
                    <Icon name="Trophy" className="h-3 w-3" strokeWidth={2.5} />
                    Победил
                  </span>
                )}
              </div>
              <div className="mt-2 rounded-(--radius-lg) border border-(--color-border-default) bg-white px-3 py-2 text-[12px] font-semibold text-(--color-text-primary)">
                {v.text}
              </div>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div>
                  <dt className="text-[9px] uppercase tracking-wide text-(--color-text-secondary)">Показы</dt>
                  <dd className="mt-0.5 text-[11px] font-semibold tabular-nums text-(--color-text-primary)">{v.impressions}</dd>
                </div>
                <div>
                  <dt className="text-[9px] uppercase tracking-wide text-(--color-text-secondary)">Клики</dt>
                  <dd className="mt-0.5 text-[11px] font-semibold tabular-nums text-(--color-text-primary)">{v.clicks}</dd>
                </div>
                <div>
                  <dt className="text-[9px] uppercase tracking-wide text-(--color-text-secondary)">CR</dt>
                  <dd className={cn('mt-0.5 text-[11px] font-semibold tabular-nums', v.winner ? 'text-(--color-text-accent)' : 'text-(--color-text-primary)')}>{v.conversionRate}</dd>
                </div>
              </dl>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-(--color-neutral-200)">
                <div className={cn('h-full rounded-full', v.winner ? 'bg-(--color-action-primary)' : 'bg-(--color-neutral-200)')} style={{ width: `${v.conversionPercent}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-(--radius-xl) border border-green-200 bg-(--color-green-12) p-3">
          <div className="flex items-start gap-2">
            <Icon name="CheckCircle2" className="mt-0.5 h-4 w-4 shrink-0 text-green-700" strokeWidth={2.5} />
            <div>
              <div className="text-[11.5px] font-semibold text-green-700">Победил Variant B (lift +40%)</div>
              <div className="mt-0.5 text-[10.5px] text-green-700/80">p-value 0,012 · стат. значимо · уверенность 99% · можно катить</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
