import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface Kpi {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
}

interface Channel {
  name: string;
  share: number;
  amount: string;
  efficiency: string;
  tone: 'violet' | 'blue' | 'green' | 'orange';
}

const KPIS: Kpi[] = [
  { label: 'CTR', value: '4,2%', delta: '+12%', positive: true },
  { label: 'CPL', value: '840 ₽', delta: '-18%', positive: true },
  { label: 'Конверсия в покупку', value: '3,1%', delta: '+6%', positive: true },
  { label: 'Расход', value: '1,2 / 1,5 млн ₽', delta: '80% бюджета', positive: true },
];

const CHANNELS: Channel[] = [
  { name: 'Telegram Ads', share: 42, amount: '504 000 ₽', efficiency: 'CPL 720 ₽', tone: 'violet' },
  { name: 'Яндекс.Директ', share: 28, amount: '336 000 ₽', efficiency: 'CPL 920 ₽', tone: 'blue' },
  { name: 'Email · база', share: 18, amount: '216 000 ₽', efficiency: 'CPL 640 ₽', tone: 'green' },
  { name: 'VK Ads', share: 12, amount: '144 000 ₽', efficiency: 'CPL 1 180 ₽', tone: 'orange' },
];

const TONE_CLASS: Record<Channel['tone'], string> = {
  violet: 'bg-(--color-action-primary)',
  blue: 'bg-(--color-blue-100)',
  green: 'bg-(--color-green-100)',
  orange: 'bg-(--color-orange-100)',
};

/**
 * Mock дашборда маркетинговой кампании: 2×2 KPI + 4 канала с распределением
 * бюджета. Marketing-домен.
 */
export function CampaignDashboardMock() {
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
          <span className="font-medium text-(--color-text-primary)">Кампания · Чёрная пятница 2026</span>
          <span>12 дней</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">4 канала · 1 240 лидов</span>
        </div>
      </div>
      <div className="grid gap-3 p-4 md:gap-4 md:p-5">
        <div className="grid grid-cols-2 gap-2.5 md:gap-3">
          {KPIS.map((k) => (
            <div key={k.label} className="rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-page) p-3">
              <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">{k.label}</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-(--color-text-primary) tabular-nums">{k.value}</span>
                <span className={cn('inline-flex items-center gap-0.5 text-[11px] font-medium', k.positive ? 'text-green-700' : 'text-red-700')}>
                  <Icon name={k.positive ? 'TrendingUp' : 'TrendingDown'} className="h-3 w-3" strokeWidth={2.5} />
                  {k.delta}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-page) p-3">
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wide text-(--color-text-secondary)">
            <span>Распределение по каналам</span>
            <span>1,2 млн ₽</span>
          </div>
          <div className="space-y-2">
            {CHANNELS.map((c) => (
              <div key={c.name} className="space-y-1">
                <div className="flex items-baseline justify-between text-[11px]">
                  <span className="font-medium text-(--color-text-primary)">{c.name}</span>
                  <span className="text-[10px] text-(--color-text-secondary)">{c.amount} · {c.efficiency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-(--color-neutral-200)">
                    <div className={cn('h-full rounded-full', TONE_CLASS[c.tone])} style={{ width: `${c.share}%` }} />
                  </div>
                  <span className="shrink-0 text-[10px] tabular-nums text-(--color-text-secondary)">{c.share}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
