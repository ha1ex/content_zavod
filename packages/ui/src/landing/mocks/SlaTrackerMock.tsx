import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface Process {
  name: string;
  avg: string;
  sla: string;
  inSla: number;
  overdue: number;
}

const PROCESSES: Process[] = [
  { name: 'Согласование закупки', avg: '4,2 д', sla: '5 д', inSla: 87, overdue: 13 },
  { name: 'Приём заявки клиента', avg: '8 мин', sla: '15 мин', inSla: 96, overdue: 4 },
  { name: 'Расчёт зарплаты', avg: '2,1 д', sla: '3 д', inSla: 92, overdue: 8 },
  { name: 'Закрытие тикета L1', avg: '46 мин', sla: '60 мин', inSla: 78, overdue: 22 },
  { name: 'Релиз hot-fix', avg: '6,5 ч', sla: '4 ч', inSla: 64, overdue: 36 },
  { name: 'Подготовка отчёта МСФО', avg: '11 д', sla: '10 д', inSla: 71, overdue: 29 },
];

function zoneClass(inSla: number) {
  if (inSla >= 95) return 'bg-(--color-green-12) text-green-700';
  if (inSla >= 80) return 'bg-(--color-orange-12) text-amber-800';
  return 'bg-(--color-red-12) text-red-700';
}

/**
 * Mock SLA-трекера BPM-домена: 6 процессов с временем выполнения vs SLA,
 * цвет-кодом зон (зелёный/оранжевый/красный).
 */
export function SlaTrackerMock() {
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
          <span className="font-medium text-(--color-text-primary)">SLA · Процессы Q2</span>
          <span>24 типа · 1 245 запусков</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">Экспорт</span>
        </div>
      </div>
      <div className="p-4 md:p-5">
        <div className="mb-3 grid grid-cols-2 gap-2.5">
          <div className="rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-page) p-3">
            <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">Средн. в SLA</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums text-(--color-text-primary)">81,3%</div>
          </div>
          <div className="rounded-(--radius-lg) border border-(--color-red-100)/30 bg-(--color-red-12)/30 p-3">
            <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">В красной зоне</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-semibold tabular-nums text-red-700">2</span>
              <span className="text-[11px] text-red-700">процесса</span>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-(--radius-xl) border border-(--color-border-default)">
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="border-b border-(--color-border-default) bg-(--color-surface-section) text-[9px] uppercase tracking-wide text-(--color-text-secondary)">
                <th className="px-3 py-2">Процесс</th>
                <th className="px-3 py-2">Среднее</th>
                <th className="px-3 py-2">SLA</th>
                <th className="px-3 py-2">% в SLA</th>
                <th className="px-3 py-2 bg-(--color-action-primary-soft)/30 text-(--color-text-accent)">
                  <span className="inline-flex items-center gap-1">
                    Просрочка
                    <Icon name="ArrowDown" className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {PROCESSES.map((p, i) => (
                <tr key={p.name} className={cn(i !== PROCESSES.length - 1 && 'border-b border-(--color-border-default)')}>
                  <td className="px-3 py-2 font-medium text-(--color-text-primary)">{p.name}</td>
                  <td className="px-3 py-2 tabular-nums text-(--color-text-primary)">{p.avg}</td>
                  <td className="px-3 py-2 tabular-nums text-(--color-text-secondary)">{p.sla}</td>
                  <td className="px-3 py-2">
                    <span className={cn('inline-flex h-5 items-center rounded-full px-2 text-[10px] font-medium', zoneClass(p.inSla))}>{p.inSla}%</span>
                  </td>
                  <td className={cn('px-3 py-2 font-semibold tabular-nums bg-(--color-action-primary-soft)/15', p.overdue >= 25 ? 'text-red-700' : p.overdue >= 15 ? 'text-amber-800' : 'text-(--color-text-primary)')}>
                    {p.overdue}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
