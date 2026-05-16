import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface Signer {
  initials: string;
  name: string;
  role: string;
  status: 'done' | 'current' | 'pending' | 'overdue';
  meta: string;
  lifted?: boolean;
}

const SIGNERS: Signer[] = [
  { initials: 'АС', name: 'Анна Соколова', role: 'Юрист', status: 'done', meta: 'Согласовано · 14 мая 10:30' },
  { initials: 'ДО', name: 'Дмитрий Орлов', role: 'Финансы · CFO', status: 'done', meta: 'Согласовано · 15 мая 14:15' },
  { initials: 'ИЛ', name: 'Игорь Лебедев', role: 'CEO', status: 'overdue', meta: 'Ожидает 3 дня · просрочка 1 день', lifted: true },
  { initials: 'БХ', name: 'Бухгалтерия', role: 'Главбух · после CEO', status: 'pending', meta: 'В очереди' },
];

const STATUS_ICON: Record<Signer['status'], { icon: string; tone: string }> = {
  done: { icon: 'CheckCircle2', tone: 'bg-(--color-green-100) text-white' },
  current: { icon: 'Loader', tone: 'bg-(--color-action-primary) text-white' },
  overdue: { icon: 'AlertTriangle', tone: 'bg-(--color-red-100) text-white' },
  pending: { icon: 'Clock', tone: 'bg-(--color-neutral-200) text-(--color-text-secondary)' },
};

const STATUS_LABEL: Record<Signer['status'], string> = {
  done: 'Согласовано',
  current: 'В работе',
  overdue: 'Просрочка',
  pending: 'Ожидает',
};

const STATUS_BADGE_CLASS: Record<Signer['status'], string> = {
  done: 'bg-(--color-green-12) text-green-700',
  current: 'bg-(--color-action-primary-soft) text-(--color-text-accent)',
  overdue: 'bg-(--color-red-12) text-red-700',
  pending: 'bg-(--color-neutral-200) text-(--color-text-secondary)',
};

/**
 * Mock цепочки согласований BPM-домена: 4 подписанта, статусы, времена
 * ожидания. Один lifted (текущий, просрочен).
 */
export function ApprovalChainMock() {
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
          <span className="font-medium text-(--color-text-primary)">Договор №2026/156 · 3 200 000 ₽</span>
          <span>Запущено 14 мая</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-red-12) px-1.5 py-0.5 text-red-700">Просрочка 1 день · 3/4</span>
        </div>
      </div>
      <div className="p-4 md:p-5">
        <ol className="space-y-3">
          {SIGNERS.map((s, i) => (
            <li key={s.name} className="relative flex items-start gap-3">
              {i < SIGNERS.length - 1 && (
                <span aria-hidden className="absolute left-[18px] top-[34px] h-[calc(100%+12px)] w-px bg-(--color-border-default)" />
              )}
              <span className={cn('relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full', STATUS_ICON[s.status].tone)}>
                <Icon name={STATUS_ICON[s.status].icon} className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <div className={cn('flex-1 rounded-(--radius-xl) border p-3', s.lifted ? 'border-(--color-red-100)/40 bg-(--color-red-12)/30 shadow-sm translate-y-[-2px]' : 'border-(--color-border-default) bg-(--color-surface-page)')}>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--color-action-primary-soft) text-[10px] font-semibold text-(--color-text-accent)">{s.initials}</span>
                      <span className="text-[12px] font-semibold text-(--color-text-primary)">{s.name}</span>
                    </div>
                    <div className="mt-0.5 text-[10.5px] text-(--color-text-secondary)">{s.role}</div>
                  </div>
                  <span className={cn('shrink-0 inline-flex h-5 items-center rounded-full px-2 text-[10px] font-medium', STATUS_BADGE_CLASS[s.status])}>{STATUS_LABEL[s.status]}</span>
                </div>
                <div className="mt-2 text-[10.5px] text-(--color-text-secondary)">{s.meta}</div>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-3 flex items-center justify-between rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-page) p-2.5">
          <div className="text-[10.5px] text-(--color-text-secondary)">На этапе 3/4 · просрочено на 1 день</div>
          <span className="inline-flex h-5 items-center gap-1 rounded-full bg-(--color-orange-100)/20 px-2 text-[10px] font-medium text-amber-800">
            <Icon name="ArrowUpRight" className="h-3 w-3" strokeWidth={2.5} />
            Эскалировать
          </span>
        </div>
      </div>
    </div>
  );
}
