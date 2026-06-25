import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

/** Фирменный знак Kaiten (точный SVG): красный сквиркл, мятный ромб, фиолетовый круг. */
function KaitenMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#kaitenMobMarkClip)">
        <path d="M76.8113 0H27.1887C12.1728 0 0 12.1661 0 27.1738V76.8262C0 91.8339 12.1728 104 27.1887 104H76.8113C91.8272 104 104 91.8339 104 76.8262V27.1738C104 12.1661 91.8272 0 76.8113 0Z" fill="#F11F24" />
        <path d="M41.4148 11.3364L11.3364 41.4148C5.55453 47.1967 5.55453 56.571 11.3364 62.3529L41.4148 92.4313C47.1967 98.2132 56.571 98.2132 62.3529 92.4313L92.4313 62.3529C98.2132 56.571 98.2132 47.1967 92.4313 41.4148L62.3529 11.3364C56.571 5.55453 47.1967 5.55453 41.4148 11.3364Z" fill="#78FFC7" />
        <path d="M51.715 77.4267C65.917 77.4267 77.43 65.9144 77.43 51.7133C77.43 37.5123 65.917 26 51.715 26C37.513 26 26 37.5123 26 51.7133C26 65.9144 37.513 77.4267 51.715 77.4267Z" fill="#7D4CCF" />
      </g>
      <defs>
        <clipPath id="kaitenMobMarkClip">
          <rect width="104" height="104" rx="52" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

type Card =
  | { kind: 'block'; bar: string }
  | { kind: 'bar'; bar: string }
  | { kind: 'blocker' };

type Column = { title: string; count?: number; cards: Card[] };
type Lane = { title: string; columns: Column[] };

const LANES: Lane[] = [
  {
    title: 'Цели',
    columns: [
      {
        title: 'Очередь',
        count: 1,
        cards: [{ kind: 'block', bar: '#7d4ccf' }],
      },
      {
        title: 'В работе',
        count: 1,
        cards: [{ kind: 'block', bar: '#e0a400' }],
      },
    ],
  },
  {
    title: 'Текущие задачи',
    columns: [
      {
        title: 'Очередь',
        count: 2,
        cards: [{ kind: 'blocker' }, { kind: 'bar', bar: '#7d4ccf' }],
      },
      {
        title: 'В работе',
        count: 2,
        cards: [{ kind: 'bar', bar: '#e0a400' }, { kind: 'bar', bar: '#4caf51' }],
      },
    ],
  },
];

function Lines({ widths }: { widths: string[] }) {
  return (
    <div className="space-y-1.5">
      {widths.map((w, i) => (
        <span key={i} className={cn('block h-1.5 rounded-full bg-(--color-border-default)', w)} />
      ))}
    </div>
  );
}

function CardView({ card }: { card: Card }) {
  if (card.kind === 'block') {
    return (
      <div className="space-y-2 rounded-(--radius-lg) border border-[#ededed] bg-(--color-surface-card) px-2.5 py-3">
        <div className="h-16 rounded-md bg-(--color-surface-section)" />
        <span className="block h-1.5 w-12 rounded-full" style={{ background: card.bar }} />
        <Lines widths={['w-full', 'w-4/5', 'w-2/3']} />
      </div>
    );
  }
  if (card.kind === 'blocker') {
    return (
      <div className="space-y-2 rounded-(--radius-lg) border border-[#ededed] bg-(--color-surface-card) px-2.5 py-3">
        <div className="flex items-center gap-2 rounded-md bg-[#fdecec] px-2 py-1.5">
          <span className="text-[12px] leading-none">✋</span>
          <span className="block h-1.5 flex-1 rounded-full bg-[#f1a5a5]" />
        </div>
        <span className="block h-1.5 w-12 rounded-full bg-[#4caf51]" />
        <Lines widths={['w-full', 'w-3/4']} />
      </div>
    );
  }
  return (
    <div className="space-y-2 rounded-(--radius-lg) border border-[#ededed] bg-(--color-surface-card) px-2.5 py-3">
      <span className="block h-1.5 w-12 rounded-full" style={{ background: card.bar }} />
      <Lines widths={['w-full', 'w-4/5', 'w-2/3']} />
    </div>
  );
}

function ColumnView({ col }: { col: Column }) {
  return (
    <div className="w-[170px] shrink-0 space-y-2">
      <div className="flex items-center gap-1.5">
        <span className="text-[14px] font-semibold text-(--color-text-primary)">{col.title}</span>
        {col.count != null && (
          <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-[#d9f2ec] px-1.5 text-[11px] font-semibold text-[#1d9e75]">
            {col.count}
          </span>
        )}
      </div>
      {col.cards.map((c, i) => (
        <CardView key={i} card={c} />
      ))}
    </div>
  );
}

/**
 * Mock мобильного приложения Kaiten — канбан с дорожками-свимлейнами.
 * Шапка с логотипом, группы «Цели» и «Текущие задачи», колонки с карточками
 * (заглушки, цветные акценты, блокер с эмодзи) и подсматривающей соседней колонкой.
 */
export function MobileKanbanMock() {
  return (
    <div aria-hidden className="relative flex items-center justify-center">
      {/* phone frame */}
      <div
        className={cn(
          'relative flex aspect-[280/560] w-[280px] flex-col overflow-hidden rounded-[40px]',
          'border-[7px] border-white',
          'bg-(--color-surface-card) shadow-[0_0_44px_-16px_rgba(45,45,45,0.20)]',
        )}
      >
        {/* header */}
        <div className="flex items-center gap-2 border-b border-(--color-border-default) px-4 py-3">
          <KaitenMark className="h-6 w-6" />
          <span className="text-[18px] font-bold text-(--color-text-primary)">Kaiten</span>
          <div className="ml-auto flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-7 w-7 rounded-lg bg-(--color-surface-section)" />
            ))}
          </div>
        </div>

        {/* board: swimlanes */}
        <div className="flex-1 space-y-3 overflow-hidden bg-(--color-surface-section) py-3 pl-3">
          {LANES.map((lane, li) => (
            <div key={lane.title} className={cn('space-y-2', li > 0 && 'border-t border-(--color-border-default) pt-3')}>
              <div className="flex items-center gap-1.5 text-(--color-text-secondary)">
                <Icon name="GripVertical" className="h-3.5 w-3.5" strokeWidth={2} />
                <span className="text-[11px] font-medium">{lane.title}</span>
              </div>
              <div className="flex gap-3 overflow-hidden">
                {lane.columns.map((col) => (
                  <ColumnView key={col.title} col={col} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* внутренняя тень по рамке */}
        <div className="pointer-events-none absolute inset-0 z-20 rounded-[32px] shadow-[inset_0_0_6px_0_rgba(0,0,0,0.1)]" />
      </div>
    </div>
  );
}
