import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

/** Сентябрь 2026 начинается со вторника: первая клетка пустая. */
const FIRST_OFFSET = 1;
const DAYS_IN_MONTH = 30;

/** Карточки, созданные по расписанию: день месяца → задачи. */
const EVENTS: Record<number, { title: string; tone: 'violet' | 'orange' | 'green' }[]> = {
  1: [{ title: 'Зарплата', tone: 'orange' }],
  3: [{ title: 'Отчет', tone: 'violet' }],
  7: [{ title: 'Отчет', tone: 'violet' }],
  10: [{ title: 'Отчет', tone: 'violet' }],
  14: [{ title: 'Отчет', tone: 'violet' }],
  15: [{ title: 'Сверка', tone: 'green' }],
  17: [{ title: 'Отчет', tone: 'violet' }],
  21: [{ title: 'Отчет', tone: 'violet' }],
  24: [{ title: 'Отчет', tone: 'violet' }],
  28: [{ title: 'Отчет', tone: 'violet' }],
};

const TONES = {
  violet: 'bg-(--color-action-primary-soft) text-(--color-text-accent)',
  orange: 'bg-(--color-orange-12) text-[#b87400]',
  green: 'bg-(--color-green-12) text-[#2e7d32]',
} as const;

/** Поле формы с подписью в вырезе рамки — как в конструкторе правил. */
function Field({
  label,
  value,
  select,
  muted,
  className,
}: {
  label?: string;
  value: string;
  select?: boolean;
  muted?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative rounded-(--radius-md) border border-(--color-border-default) bg-(--color-surface-card) px-2.5 py-2',
        className,
      )}
    >
      {label && (
        <span className="absolute -top-1.5 left-2 bg-(--color-surface-card) px-1 text-[9px] leading-none text-(--color-text-secondary)">
          {label}
        </span>
      )}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'flex-1 truncate text-[12px]',
            muted ? 'text-(--color-text-secondary)' : 'text-(--color-text-primary)',
          )}
        >
          {value}
        </span>
        {select && (
          <Icon name="ChevronDown" aria-hidden className="h-3 w-3 shrink-0 text-(--color-text-secondary)" strokeWidth={2} />
        )}
      </div>
    </div>
  );
}

function Calendar() {
  const cells = Array.from({ length: 35 }, (_, i) => {
    const day = i - FIRST_OFFSET + 1;
    return day >= 1 && day <= DAYS_IN_MONTH ? day : null;
  });
  return (
    <div
      className={cn(
        'w-[680px] overflow-hidden rounded-(--radius-2xl) bg-(--color-surface-card) p-5',
        'shadow-[0_0_40px_-12px_rgba(24,24,27,0.25)]',
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <Icon name="Calendar" aria-hidden className="h-5 w-5 text-(--color-text-accent)" strokeWidth={2} />
        <span className="text-[17px] font-semibold text-(--color-text-primary)">Сентябрь 2026</span>
        <span className="ml-auto text-[13px] text-(--color-text-secondary)">Маркетинг: текущие задачи</span>
      </div>
      <div className="grid grid-cols-7 border-l border-t border-(--color-border-default)">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="border-b border-r border-(--color-border-default) bg-(--color-surface-section) py-1.5 text-center text-[12px] text-(--color-text-secondary)"
          >
            {d}
          </div>
        ))}
        {cells.map((day, i) => (
          <div
            key={i}
            className={cn(
              'h-[84px] border-b border-r border-(--color-border-default) p-1.5',
              // выходные (Сб, Вс) — серой заливкой
              i % 7 >= 5 && 'bg-(--color-surface-section)',
            )}
          >
            {day && (
              <>
                <div className="text-[12px] text-(--color-text-secondary)">{day}</div>
                {EVENTS[day]?.map((e) => (
                  <div key={e.title} className={cn('mt-1 truncate rounded-[5px] px-1.5 py-0.5 text-[11px] font-medium', TONES[e.tone])}>
                    {e.title}
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScheduleModal() {
  return (
    <div
      className={cn(
        'w-[340px] rounded-(--radius-2xl) bg-(--color-surface-card) px-4 pb-4 pt-3.5',
        'shadow-[0_8px_32px_-12px_rgba(24,24,27,0.22)]',
      )}
    >
      <div className="mb-3.5 text-[15px] font-semibold text-(--color-text-primary)">Создание задания</div>

      <div className="space-y-3">
        <Field label="Название *" value="Еженедельный отчет" />
        <div className="grid grid-cols-2 gap-2">
          <Field label="Тип повторения *" value="Повторять" select />
          <Field label="Интервал *" value="Еженедельно" select />
        </div>

        <div>
          <div className="mb-1.5 text-[11px] text-(--color-text-secondary)">Выберите дни недели</div>
          <div className="flex gap-1">
            {WEEKDAYS.map((d, i) => (
              <span
                key={d}
                className={cn(
                  'flex-1 rounded-[4px] py-1 text-center text-[10px] font-semibold uppercase',
                  i === 0 || i === 3
                    ? 'bg-(--color-action-primary) text-white'
                    : 'bg-(--color-surface-section) text-(--color-text-secondary)',
                )}
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Field label="Время" value="12:20" />
          <Field label="Временная зона" value="Москва" select />
        </div>

        <div className="pt-0.5 text-[12px] font-medium text-(--color-text-primary)">Путь карточки</div>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Доска *" value="Маркетинг: текущие задачи" select />
          <Field label="Поместить *" value="В конец" select />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field value="Колонка" select muted />
          <Field value="Дорожка" select muted />
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <span className="inline-flex items-center rounded-(--radius-md) px-2.5 pb-[5px] pt-[7px] text-[10.5px] font-semibold uppercase leading-none text-(--color-text-primary)">
          Отмена
        </span>
        <span className="inline-flex items-center rounded-(--radius-md) border border-(--color-action-primary) px-2.5 pb-[5px] pt-[7px] text-[10.5px] font-semibold uppercase leading-none text-(--color-text-accent)">
          Создать
        </span>
      </div>
    </div>
  );
}

/**
 * Запланированные задания Кайтена: на заднем плане календарь месяца, где
 * карточки по расписанию уже стоят на своих датах (еженедельный отчет по
 * понедельникам и четвергам, выплата зарплаты 1-го числа), поверх — окно
 * «Создание задания»: название, тип повторения и интервал, дни недели, время,
 * доска и место карточки. Для блока про повторяющиеся задачи.
 */
export function WindowRecurringScheduleMock() {
  return (
    <div aria-hidden className="relative h-[580px] w-[800px]">
      <div className="absolute left-0 top-0">
        <Calendar />
      </div>
      <div className="absolute bottom-0 right-[20px]">
        <ScheduleModal />
      </div>
    </div>
  );
}
