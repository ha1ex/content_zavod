import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

/**
 * BoardSignalsMock (`board-signals`) — доска Кайтена с подписанными сигналами.
 *
 * Блок «Сразу видно, что требует внимания»: просроченный срок, блокировка и
 * срочная задача подсвечены прямо на карточках, снизу — легенда, которая
 * называет каждый сигнал. Одна ось цвета — степень внимания к задаче.
 */

type Signal = 'late' | 'blocked' | 'urgent';

type Card = {
  title: string;
  who: string;
  meta: string;
  signal?: Signal;
};

const SIGNAL_CLASS: Record<Signal, string> = {
  late: 'bg-(--color-red-12) text-red-700',
  blocked: 'bg-(--color-orange-12) text-amber-800',
  urgent: 'bg-(--color-action-primary-soft) text-(--color-text-accent)',
};

const SIGNAL_BORDER: Record<Signal, string> = {
  late: 'border-(--color-red-100)/50',
  blocked: 'border-(--color-orange-100)/60',
  urgent: 'border-(--color-action-primary)/45',
};

const SIGNAL_LABEL: Record<Signal, string> = {
  late: 'Просрочено на 3 дня',
  blocked: 'Ждет ответ подрядчика',
  urgent: 'Срочно',
};

const SIGNAL_ICON: Record<Signal, string> = {
  late: 'CircleAlert',
  blocked: 'Ban',
  urgent: 'Flame',
};

const COLUMNS: { title: string; count: number; cards: Card[] }[] = [
  {
    title: 'Очередь',
    count: 4,
    cards: [
      {
        title: 'Рассылка по клиентам из сегмента B',
        who: 'МС',
        meta: '9 сен',
      },
      {
        title: 'Заменить баннер на главной к акции',
        who: 'АК',
        meta: 'сегодня',
        signal: 'urgent',
      },
    ],
  },
  {
    title: 'В работе',
    count: 3,
    cards: [
      {
        title: 'Собрать отчет по продажам за август',
        who: 'ИЛ',
        meta: 'срок 2 сен',
        signal: 'late',
      },
      {
        title: 'Договор с подрядчиком по монтажу',
        who: 'ПТ',
        meta: 'срок 8 сен',
        signal: 'blocked',
      },
    ],
  },
  {
    title: 'Готово',
    count: 5,
    cards: [
      { title: 'Тексты для страницы каталога', who: 'МС', meta: 'закрыто вчера' },
      { title: 'Проверить остатки на складе', who: 'ДВ', meta: 'закрыто 1 сен' },
    ],
  },
];

const LEGEND: { signal: Signal; text: string }[] = [
  { signal: 'late', text: 'Срок прошел' },
  { signal: 'blocked', text: 'Задача заблокирована' },
  { signal: 'urgent', text: 'Срочная задача' },
];

function Avatar({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-(--color-action-primary-soft) text-[9px] font-semibold text-(--color-text-accent)">
      {children}
    </span>
  );
}

export function BoardSignalsMock() {
  return (
    <div
      aria-hidden
      className="relative h-[480px] w-[720px] overflow-hidden rounded-(--radius-3xl) border border-(--color-border-default) bg-(--color-surface-card) shadow-[0_0_40px_rgba(45,45,45,0.12)]"
    >
      {/* топбар */}
      <div className="flex items-center gap-2 border-b border-(--color-border-default) px-4 py-2.5">
        <span className="text-[13px] font-semibold text-(--color-text-primary)">
          Отдел маркетинга
        </span>
        <span className="text-[12px] text-(--color-text-secondary)">/ Доска</span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-(--color-red-12) px-2 py-1 text-[10px] font-medium text-red-700">
          <Icon name="CircleAlert" className="h-3 w-3" strokeWidth={2} />
          Требуют внимания: 3
        </span>
      </div>

      {/* колонки */}
      <div className="flex items-start gap-2 bg-(--color-surface-section) p-3">
        {COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-1 flex-col px-1">
            <div className="mb-2 flex items-center gap-1.5 px-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                {col.title}
              </span>
              <span className="ml-auto inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-(--color-border-default) px-1 text-[10px] font-semibold text-(--color-text-secondary)">
                {col.count}
              </span>
            </div>
            <div className="space-y-2">
              {col.cards.map((c) => (
                <div
                  key={c.title}
                  className={cn(
                    'space-y-2 rounded-(--radius-lg) border bg-(--color-surface-card) p-2.5',
                    c.signal
                      ? cn(SIGNAL_BORDER[c.signal], 'shadow-sm')
                      : 'border-(--color-border-default) opacity-70',
                  )}
                >
                  {c.signal ? (
                    <span
                      className={cn(
                        'inline-flex h-4 items-center gap-1 rounded-full px-1.5 text-[9px] font-medium',
                        SIGNAL_CLASS[c.signal],
                      )}
                    >
                      <Icon name={SIGNAL_ICON[c.signal]} className="h-2.5 w-2.5" strokeWidth={2.5} />
                      {SIGNAL_LABEL[c.signal]}
                    </span>
                  ) : null}
                  <div className="text-[11.5px] font-medium leading-snug text-(--color-text-primary)">
                    {c.title}
                  </div>
                  <div className="flex items-center justify-between">
                    <Avatar>{c.who}</Avatar>
                    <span className="text-[10px] text-(--color-text-secondary)">{c.meta}</span>
                  </div>
                </div>
              ))}
              {/* обрезанный кадр: в колонке есть еще карточки */}
              <div className="h-8 rounded-(--radius-lg) border border-dashed border-(--color-border-default)" />
            </div>
          </div>
        ))}
      </div>

      {/* легенда сигналов */}
      <div className="absolute inset-x-0 bottom-0 border-t border-(--color-border-default) bg-(--color-surface-card) px-4 py-3">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
          Сигналы на доске
        </div>
        <div className="flex items-center gap-2">
          {LEGEND.map((l) => (
            <div
              key={l.signal}
              className="flex flex-1 items-center gap-2 rounded-(--radius-lg) border border-(--color-border-default) px-2.5 py-2"
            >
              <span
                className={cn(
                  'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md',
                  SIGNAL_CLASS[l.signal],
                )}
              >
                <Icon name={SIGNAL_ICON[l.signal]} className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <span className="text-[10.5px] font-medium text-(--color-text-primary)">{l.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
