import { cn } from '../../primitives/cn';

interface PersonRow {
  name: string;
  initials: string;
  color: string;
  /** часы по дням; отрицательное значение — перегрузка */
  hours: (number | string)[];
  over?: number[];
}

const DAYS = ['16', '17', '18', '19', '20', '21', '22', '23'];
const WEEKEND = [2, 3];

const PEOPLE: PersonRow[] = [
  { name: 'Анна Морозова', initials: 'АМ', color: 'bg-(--color-action-primary)', hours: [6, 8, 0, 0, 4, '12,5', 6, 5], over: [5] },
  { name: 'Артем Куликов', initials: 'АК', color: 'bg-(--color-green-100)', hours: [4, 4, 0, 0, 8, 8, '4,5', '4,5'] },
  { name: 'Екатерина Громова', initials: 'ЕГ', color: 'bg-(--color-orange-100)', hours: [8, 6, 0, 0, 6, 3, 9, 8], over: [6] },
  { name: 'Павел Соколов', initials: 'ПС', color: 'bg-(--color-blue-100)', hours: [0, 4, 0, 0, 8, 8, 6, 4] },
  { name: 'Ирина Лебедева', initials: 'ИЛ', color: 'bg-(--color-violet-100)', hours: [6, 6, 0, 0, 8, 4, 8, 6] },
  { name: 'Денис Воронов', initials: 'ДВ', color: 'bg-(--color-green-100)', hours: [8, 8, 0, 0, '4,5', 6, 10, 5], over: [6] },
];

/**
 * Window: «Ресурсное планирование» Kaiten — загрузка команды по часам.
 * Строки участников, дни недели, ячейки с часами: зеленые — в норме,
 * красные — перегрузка, серые — выходной. Переключатель Часы/Карточки.
 */
export function WindowResourceMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'overflow-hidden rounded-(--radius-3xl) border border-(--color-border-default)',
        'bg-(--color-surface-card) p-5 md:p-6',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.25)]',
      )}
    >
      {/* header */}
      <div className="flex items-center gap-4">
        <h3 className="text-base font-semibold text-(--color-text-primary)">Загрузка команды</h3>
        <span className="ml-auto flex items-center gap-3.5 text-[13px] text-(--color-text-secondary)">
          <span className="inline-flex items-center gap-1.5 font-medium text-(--color-text-primary)">
            <span className="relative inline-block aspect-square h-4 w-4 shrink-0 rounded-full border-2 border-(--color-action-primary) after:absolute after:inset-[2.5px] after:rounded-full after:bg-(--color-action-primary) after:content-['']" />
            Часы
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block aspect-square h-4 w-4 shrink-0 rounded-full border-2 border-(--color-neutral-400)" />
            Карточки
          </span>
        </span>
      </div>

      {/* grid */}
      <div className="mt-3.5">
        <div className="flex items-center border-b border-(--color-neutral-200) pb-1.5">
          <span className="w-40 shrink-0 text-xs font-semibold text-(--color-text-primary)">июль 2026</span>
          {DAYS.map((d) => (
            <span key={d} className="flex-1 text-center text-[11px] text-(--color-text-secondary)">{d}</span>
          ))}
        </div>
        {PEOPLE.map((p, pi) => (
          <div
            key={p.name}
            className={cn('flex items-center gap-0 py-1.5', pi < PEOPLE.length - 1 && 'border-b border-(--color-neutral-200)')}
          >
            <span className="flex w-40 shrink-0 items-center gap-2">
              <span className={cn('flex h-6.5 w-6.5 items-center justify-center rounded-full text-[10px] font-semibold text-white', p.color)}>
                {p.initials}
              </span>
              <span className="truncate text-[13px] text-(--color-text-primary)">{p.name}</span>
            </span>
            {p.hours.map((h, i) => {
              const zero = h === 0;
              const weekend = WEEKEND.includes(i);
              const over = p.over?.includes(i);
              return (
                <span key={i} className="flex flex-1 justify-center px-0.5">
                  <span
                    className={cn(
                      'flex h-7 w-full max-w-11 items-center justify-center rounded-(--radius-md) text-xs',
                      weekend && 'bg-(--color-neutral-100) text-(--color-neutral-500)',
                      !weekend && over && 'bg-(--color-red-12) font-semibold text-(--color-red-100)',
                      !weekend && !over && !zero && 'bg-(--color-green-12) font-medium text-[#2e7d32]',
                      !weekend && !over && zero && 'bg-(--color-neutral-100) text-(--color-neutral-500)',
                    )}
                  >
                    {h}
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* legend */}
      <div className="mt-3 flex items-center gap-4.5 text-xs text-(--color-text-secondary)">
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-(--color-green-12)" />Загрузка в норме</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-(--color-red-12)" />Перегрузка</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-(--color-neutral-100)" />Выходной</span>
      </div>
    </div>
  );
}
