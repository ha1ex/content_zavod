import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';
import { KaitenLogo } from '../KaitenLogo';

const LABEL_CLASS: Record<'violet' | 'blue' | 'green' | 'orange', string> = {
  violet: 'bg-(--color-action-primary-soft) text-(--color-text-accent)',
  blue: 'bg-(--color-blue-12) text-(--color-blue-100)',
  green: 'bg-(--color-green-12) text-green-700',
  orange: 'bg-(--color-orange-12) text-amber-800',
};

type Card = {
  title: string;
  label: string;
  tone: 'violet' | 'blue' | 'green' | 'orange';
  who: string;
  check?: string;
  done?: boolean;
};

const COLUMNS: { title: string; count: number; cards: Card[] }[] = [
  {
    title: 'Очередь',
    count: 3,
    cards: [
      { title: 'Свёрстать лендинг для рассылки', label: 'Дизайн', tone: 'violet', who: 'АК' },
      { title: 'Подключить продуктовую аналитику', label: 'Аналитика', tone: 'blue', who: 'ИЛ' },
      { title: 'Тексты для онбординг-писем', label: 'Контент', tone: 'green', who: 'МС' },
    ],
  },
  {
    title: 'В работе',
    count: 2,
    cards: [
      { title: 'Интеграция с CRM amoCRM', label: 'Backend', tone: 'orange', who: 'МС', check: '3/5' },
      { title: 'Сценарий онбординга клиентов', label: 'Product', tone: 'violet', who: 'АС', check: '2/4' },
    ],
  },
  {
    title: 'Готово',
    count: 2,
    cards: [
      { title: 'Релиз мобильного приложения', label: 'Mobile', tone: 'green', who: 'ДВ', done: true },
      { title: 'A/B-тест главной страницы', label: 'Аналитика', tone: 'blue', who: 'АК', done: true },
    ],
  },
];

const RAIL = ['LayoutGrid', 'Calendar', 'FileText', 'ChartBar', 'Users', 'Settings'];

function Avatar({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-(--color-action-primary-soft) text-[10px] font-semibold text-(--color-text-accent)">
      {children}
    </span>
  );
}

/** Фирменный знак Kaiten — настоящий брендовый ассет (сквиркл, не круг). */
function KaitenMark() {
  return (
    <span className="relative inline-flex h-5 w-5 items-center justify-center">
      <KaitenLogo markOnly className="h-full w-full" />
    </span>
  );
}

/** Канбан-доска Kaiten: топбар, сайдбар с иконками, три колонки с карточками. */
function KanbanBoard() {
  return (
    <div className="flex h-full flex-col bg-(--color-surface-page)">
      {/* top bar */}
      <div className="flex items-center gap-2 border-b border-(--color-border-default) px-4 py-2.5">
        <KaitenMark />
        <span className="text-[14px] font-semibold text-(--color-text-primary)">Разработка</span>
        <span className="text-[13px] text-(--color-text-secondary)">/ Спринт 24</span>
      </div>

      {/* body */}
      <div className="flex flex-1 overflow-hidden">
        {/* rail */}
        <div className="flex w-12 flex-col items-center gap-3 border-r border-(--color-border-default) bg-(--color-surface-section) py-3">
          {RAIL.map((n, i) => (
            <span
              key={n}
              className={cn(
                'inline-flex h-7 w-7 items-center justify-center rounded-lg',
                i === 0 ? 'bg-(--color-action-primary-soft) text-(--color-text-accent)' : 'text-(--color-text-secondary)',
              )}
            >
              <Icon name={n} className="h-4 w-4" strokeWidth={2} />
            </span>
          ))}
        </div>

        {/* columns (единая серая панель с вертикальными разделителями) */}
        <div className="flex flex-1 items-start gap-2 overflow-hidden bg-(--color-surface-section) p-2">
          {COLUMNS.flatMap((col, idx) => {
            const column = (
              <div key={col.title} className="flex flex-1 flex-col rounded-(--radius-lg) bg-(--color-surface-section) px-1.5">
                <div className="mb-2 flex items-center gap-1.5 px-1">
                  <span className="text-[12px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                    {col.title}
                  </span>
                  <span className="ml-auto inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-(--color-border-default) px-1 text-[11px] font-semibold text-(--color-text-secondary)">
                    {col.count}
                  </span>
                </div>
                <div className="space-y-2">
                  {col.cards.map((c, i) => (
                    <div key={i} className="space-y-2 rounded-(--radius-lg) border border-[#ededed] bg-(--color-surface-card) p-2.5">
                      <span className={cn('inline-flex h-4 items-center rounded-full px-1.5 text-[10px] font-medium', LABEL_CLASS[c.tone])}>
                        {c.label}
                      </span>
                      <div className="text-[13px] font-medium leading-snug text-(--color-text-primary)">{c.title}</div>
                      <div className="flex items-center justify-between">
                        <Avatar>{c.who}</Avatar>
                        {c.done ? (
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-green-700">
                            <Icon name="Check" className="h-3 w-3" strokeWidth={2.5} />
                            Готово
                          </span>
                        ) : c.check ? (
                          <span className="inline-flex items-center gap-1 text-[10.5px] text-(--color-text-secondary)">
                            <Icon name="SquareCheck" className="h-3 w-3" strokeWidth={2} />
                            {c.check}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10.5px] text-(--color-text-secondary)">
                            <Icon name="Calendar" className="h-3 w-3" strokeWidth={2} />
                            12 авг
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
            return idx === 0
              ? [column]
              : [<div key={`${col.title}-divider`} className="w-px self-stretch bg-(--color-border-default)" />, column];
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * Минимальный mock канбан-доски Kaiten — без рамки-безеля устройства и камеры.
 * Обрамление — штатное для моков MediaCopy (как ProductMock/PmBoard1Mock):
 * скруглённый экран доски, тонкий бордер и мягкая фиолетовая тень Violet-12.
 * Анимированный близнец — KanbanminimalAnimated.tsx (`kanban-minimal-animated`).
 */
export function KanbanMinimalMock() {
  return (
    <div
      aria-hidden
      className="relative h-[480px] w-[720px] overflow-hidden rounded-(--radius-3xl) border border-(--color-border-default) bg-(--color-surface-card) shadow-[0_30px_80px_-30px_rgba(125,76,207,0.30)]"
    >
      <KanbanBoard />
    </div>
  );
}
