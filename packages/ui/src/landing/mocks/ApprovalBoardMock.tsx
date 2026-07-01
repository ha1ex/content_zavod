import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

/**
 * Mock доски Kaiten «Согласование платежей и договоров» для финансового блока.
 * Колонки Новый запрос → На проверке → На согласовании → Согласовано и два
 * свимлейна «Платежи» / «Договоры» с карточками (оплата аренды, аванс по
 * договору, NDA, доп. соглашение) — визуал для секции «статусы согласований
 * в реальном времени». Данные захардкожены (ТЗ «Кайтен для финансов и банков»).
 */

const ACCENT: Record<string, string> = {
  green: 'bg-(--color-green-100)',
  red: 'bg-(--color-red-100)',
  blue: 'bg-(--color-blue-100)',
  violet: 'bg-(--color-action-primary)',
  orange: 'bg-(--color-orange-100)',
  gray: 'bg-(--color-neutral-300)',
};
const AVPAL = ['#c98a8a', '#8a9bc9', '#8ac9a0', '#c9b78a', '#b88ac9', '#7d9ac9'];

type Card = { title: string; accent: keyof typeof ACCENT; av: number; plus?: number; date?: string; today?: boolean };

const COLS: [string, number][] = [
  ['Новый запрос', 1],
  ['На проверке', 3],
  ['На согласовании', 3],
  ['Согласовано', 2],
];

// По колонкам: [Новый запрос, На проверке, На согласовании, Согласовано]
const PAYMENTS: Card[][] = [
  [{ title: 'Оплата аренды офиса Q3 2026', accent: 'green', av: 2, date: '31 июля' }],
  [{ title: 'Командировочные расходы, июль 2026', accent: 'red', av: 1, date: '15 июля' }],
  [{ title: 'Аванс по договору №45-2026', accent: 'green', av: 1, plus: 1, date: '8 июля' }],
  [{ title: 'Оплата поставщику ООО «Техника»', accent: 'green', av: 1, plus: 1, date: '5 июля' }],
];
const CONTRACTS: Card[][] = [
  [],
  [{ title: 'NDA с партнёром — ГК «Росфинанс»', accent: 'blue', av: 2, date: '12 июля' }],
  [{ title: 'Договор с поставщиком ИТ-услуг', accent: 'violet', av: 1, plus: 1, date: '10 июля' }],
  [{ title: 'Доп. соглашение к договору аренды', accent: 'gray', av: 1, today: true }],
];

function Avatars({ n }: { n: number }) {
  return (
    <div className="flex -space-x-1.5">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="inline-flex h-5 w-5 rounded-full border-2 border-white" style={{ background: AVPAL[i % AVPAL.length] }} />
      ))}
    </div>
  );
}

function BoardCard({ d }: { d: Card }) {
  return (
    <div className="rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-page) p-2.5 shadow-[0_1px_2px_rgba(45,45,45,0.05)]">
      <div className={cn('mb-1.5 h-1 w-8 rounded-full', ACCENT[d.accent])} />
      <div className="text-[11.5px] font-medium leading-snug text-(--color-text-primary)">{d.title}</div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Avatars n={d.av} />
          {d.plus && <span className="text-[10px] font-medium text-(--color-text-secondary)">+{d.plus}</span>}
        </div>
        {d.today ? (
          <span className="inline-flex items-center rounded-md bg-(--color-orange-100) px-1.5 py-0.5 text-[10px] font-semibold text-white">Сегодня</span>
        ) : d.date ? (
          <span className="inline-flex items-center gap-1 text-[10px] text-(--color-text-secondary)">
            <Icon name="Calendar" className="h-3 w-3" strokeWidth={2} />
            {d.date}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function Swimlane({ title, rows }: { title: string; rows: Card[][] }) {
  return (
    <div>
      <div className="px-3 py-2 text-[12px] text-(--color-text-secondary)">{title}</div>
      <div className="grid grid-cols-4">
        {rows.map((cards, i) => (
          <div key={i} className={cn('min-h-[64px] space-y-2 px-2 pb-3', i > 0 && 'border-l border-(--color-border-default)')}>
            {cards.map((c, j) => (
              <BoardCard key={j} d={c} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ApprovalBoardMock() {
  return (
    <div
      aria-hidden
      className="w-full max-w-[760px] overflow-hidden rounded-2xl border border-(--color-orange-100)/40 bg-[#fffdf7] p-3 shadow-[0_10px_40px_-20px_rgba(45,45,45,0.3)]"
    >
      <div className="overflow-hidden rounded-xl border border-(--color-border-default) bg-(--color-surface-page)">
        {/* header */}
        <div className="flex items-center gap-2 border-b border-(--color-border-default) px-3 py-2.5">
          <Icon name="GripVertical" className="h-4 w-4 text-(--color-text-secondary)" strokeWidth={2} />
          <span className="text-[13px] font-semibold text-(--color-text-primary)">Согласование платежей и договоров</span>
        </div>

        {/* column headers */}
        <div className="grid grid-cols-4 border-b border-(--color-border-default) bg-(--color-surface-section)">
          {COLS.map(([name, count], i) => (
            <div key={name} className={cn('flex items-center justify-between px-3 py-2', i > 0 && 'border-l border-(--color-border-default)')}>
              <span className="truncate text-[11px] font-medium text-(--color-text-secondary)">{name}</span>
              <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded bg-(--color-neutral-200) px-1 text-[10px] font-semibold text-(--color-text-primary)">{count}</span>
            </div>
          ))}
        </div>

        <Swimlane title="Платежи" rows={PAYMENTS} />
        <div className="border-t border-(--color-border-default)" />
        <Swimlane title="Договоры" rows={CONTRACTS} />
      </div>
    </div>
  );
}
