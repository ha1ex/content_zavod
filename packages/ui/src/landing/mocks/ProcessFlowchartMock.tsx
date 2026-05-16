import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface Step {
  num: number;
  title: string;
  owner: string;
  sla: string;
  status: 'done' | 'current' | 'bottleneck' | 'pending';
}

const STEPS: Step[] = [
  { num: 1, title: 'Заявка инициатора', owner: 'Сотрудник', sla: '0,5 дня', status: 'done' },
  { num: 2, title: 'Согласование бюджета', owner: 'CFO', sla: '1 день', status: 'done' },
  { num: 3, title: 'Тендер', owner: 'Закупки', sla: '3 дня', status: 'current' },
  { num: 4, title: 'Договор', owner: 'Юристы', sla: '2 дня', status: 'pending' },
  { num: 5, title: 'Подпись CEO', owner: 'CEO', sla: '1 день', status: 'bottleneck' },
  { num: 6, title: 'Оплата', owner: 'Бухгалтерия', sla: '0,5 дня', status: 'pending' },
];

const STATUS_CLASS: Record<Step['status'], { box: string; icon: string }> = {
  done: { box: 'border-(--color-green-100)/40 bg-(--color-green-12)/40', icon: 'bg-(--color-green-100) text-white' },
  current: { box: 'border-(--color-action-primary)/40 bg-(--color-action-primary-soft)/40 shadow-sm', icon: 'bg-(--color-action-primary) text-white' },
  bottleneck: { box: 'border-(--color-red-100)/40 bg-(--color-red-12)/40', icon: 'bg-(--color-red-100) text-white' },
  pending: { box: 'border-(--color-border-default) bg-(--color-surface-page)', icon: 'bg-(--color-neutral-200) text-(--color-text-secondary)' },
};

const STATUS_LABEL: Record<Step['status'], string> = {
  done: 'Готово',
  current: 'Сейчас',
  bottleneck: 'Узкое место',
  pending: 'Ожидает',
};

/**
 * Mock схемы бизнес-процесса BPM-домена: 6 шагов согласования закупки,
 * ответственные, SLA, статусы (done / current / bottleneck / pending).
 */
export function ProcessFlowchartMock() {
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
          <span className="font-medium text-(--color-text-primary)">Процесс · Согласование закупки v3.2</span>
          <span>14 шагов</span>
          <span>среднее время 4,2 дня</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">BPMN · Запуски · Метрики</span>
        </div>
      </div>
      <div className="p-4 md:p-5">
        <div className="grid gap-2 md:grid-cols-6">
          {STEPS.map((s) => (
            <div key={s.num} className={cn('rounded-(--radius-xl) border p-2.5', STATUS_CLASS[s.status].box)}>
              <div className="flex items-center gap-2">
                <span className={cn('inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold', STATUS_CLASS[s.status].icon)}>{s.num}</span>
                <span className="text-[9px] uppercase tracking-wide text-(--color-text-secondary)">{STATUS_LABEL[s.status]}</span>
              </div>
              <div className="mt-1.5 text-[11.5px] font-semibold leading-tight text-(--color-text-primary)">{s.title}</div>
              <div className="mt-1 truncate text-[10px] text-(--color-text-secondary)">{s.owner}</div>
              <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-(--color-text-primary)">
                <Icon name="Clock" className="h-3 w-3 text-(--color-text-accent)" strokeWidth={2} />
                SLA {s.sla}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <div className="rounded-(--radius-lg) border border-dashed border-(--color-border-default) bg-(--color-surface-page) p-2.5 text-[11px] text-(--color-text-primary)">
            <span className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">Ветвление</span>
            <div className="mt-0.5">Если &gt; 500 000 ₽ → согласование CEO</div>
          </div>
          <div className="rounded-(--radius-lg) border border-dashed border-(--color-border-default) bg-(--color-surface-page) p-2.5 text-[11px] text-(--color-text-primary)">
            <span className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">Иначе</span>
            <div className="mt-0.5">Сразу к закупкам, без CEO</div>
          </div>
        </div>
      </div>
    </div>
  );
}
