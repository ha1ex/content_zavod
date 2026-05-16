import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

type Cell = 'free' | 'busy' | 'selected' | 'gap';

interface Specialist {
  name: string;
  role: string;
  initials: string;
  cells: Cell[];
}

const HOURS = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

const SPECIALISTS: Specialist[] = [
  { name: 'Анна Петрова', role: 'Косметолог', initials: 'АП', cells: ['busy', 'busy', 'gap', 'free', 'selected', 'free', 'busy'] },
  { name: 'Сергей Лебедев', role: 'Мастер', initials: 'СЛ', cells: ['free', 'busy', 'busy', 'gap', 'free', 'busy', 'free'] },
  { name: 'Мария Зайцева', role: 'Стилист', initials: 'МЗ', cells: ['busy', 'gap', 'free', 'busy', 'busy', 'free', 'free'] },
  { name: 'Игорь Громов', role: 'Тренер', initials: 'ИГ', cells: ['free', 'free', 'busy', 'busy', 'gap', 'free', 'busy'] },
];

const CELL_CLASS: Record<Cell, string> = {
  free: 'bg-(--color-green-12) text-green-700',
  busy: 'bg-(--color-neutral-200) text-(--color-text-secondary)',
  selected: 'bg-(--color-action-primary) text-white shadow-sm',
  gap: 'bg-transparent text-transparent',
};

/**
 * Mock онлайн-записи / бронирования: левая колонка — специалисты с фото-аватарами,
 * сетка ячеек по часам — занято / свободно / выбрано. Внизу — форма брони с
 * подтверждением. Тон: «клиент сам выбирает время, CRM подтверждает и напоминает».
 */
export function BookingCalendarMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.30)]',
      )}
    >
      {/* window chrome */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-yellow-300" />
        <span className="h-2 w-2 rounded-full bg-green-300" />
        <div className="ml-2 flex flex-wrap items-center gap-3 text-[11px] text-(--color-text-secondary)">
          <span className="font-medium text-(--color-text-primary)">Онлайн-запись · 18 мая, чт</span>
          <span>4 специалиста</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">
            Услуга · Окрашивание · 2 ч
          </span>
        </div>
      </div>

      <div className="p-4 md:p-5">
        {/* time header */}
        <div className="mb-2 grid grid-cols-[140px_repeat(7,minmax(0,1fr))] gap-1 text-[10px] text-(--color-text-secondary)">
          <div />
          {HOURS.map((h) => (
            <div key={h} className="text-center font-medium">
              {h}
            </div>
          ))}
        </div>

        {/* specialists grid */}
        <div className="space-y-1.5">
          {SPECIALISTS.map((s) => (
            <div
              key={s.name}
              className="grid grid-cols-[140px_repeat(7,minmax(0,1fr))] items-center gap-1"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-(--color-action-primary-soft) text-[10px] font-semibold text-(--color-text-accent)">
                  {s.initials}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[11px] font-semibold text-(--color-text-primary)">
                    {s.name}
                  </div>
                  <div className="truncate text-[9px] text-(--color-text-secondary)">{s.role}</div>
                </div>
              </div>
              {s.cells.map((c, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex h-6 items-center justify-center rounded-md text-[10px] font-medium',
                    CELL_CLASS[c],
                  )}
                >
                  {c === 'selected' && 'Вы'}
                  {c === 'free' && '·'}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* booking confirmation */}
        <div className="mt-4 rounded-(--radius-xl) border border-(--color-action-primary)/30 bg-(--color-action-primary-soft)/30 p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-(--color-text-primary)">
                Анна Петрова · 14:00 → 16:00
              </div>
              <div className="mt-0.5 text-[10px] text-(--color-text-secondary)">
                Окрашивание · 4 500 ₽ · подтверждение придёт в Telegram
              </div>
            </div>
            <span className="inline-flex h-7 items-center gap-1 rounded-full bg-(--color-action-primary) px-3 text-[11px] font-medium text-white">
              <Icon name="Calendar" className="h-3.5 w-3.5" strokeWidth={2.5} />
              Записаться
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
