import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';
import { KaitenLogo } from '../KaitenLogo';

/**
 * KanbanMinimalAnimatedMock — анимированная версия kanban-minimal.
 * Карточка перетаскивается из «Очередь» в «В работе» курсором-рукой (чистый CSS
 * @keyframes, 5.8с, prefers-reduced-motion). Портировано из проекта «Галерея
 * шаблонов»; статичный близнец — Kanbanminimal.tsx (`kanban-minimal`).
 */

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

// Шаг между колонками в design-координатах (720px), замерен для 3 колонок.
const PITCH = 224;

// Анимация перетаскивания карточки курсором-рукой (чистый CSS @keyframes).
// Тайминг 5.8с: покой → появляется рука → карточка приподнимается и едет в «В работе» → возврат.
// scope `.kmm`, уважает prefers-reduced-motion.
const KEYFRAMES = `
.kmm .drag{ animation: kmmTravel 5.8s ease-in-out infinite; }
.kmm .drag .dcard{ transform-origin:center; animation: kmmLift 5.8s ease-in-out infinite; }
.kmm .hand{ animation: kmmHand 5.8s ease-in-out infinite; }
@keyframes kmmTravel{
  0%,41%{ transform:translate(0,0); }
  50%{ transform:translate(0,-9px); }
  65%{ transform:translate(${PITCH}px,-9px); }
  73%,86%{ transform:translate(${PITCH}px,0); }
  93%{ transform:translate(0,-9px); }
  100%{ transform:translate(0,0); }
}
@keyframes kmmLift{
  0%,44%{ transform:rotate(0) scale(1); box-shadow:0 1px 2px rgba(0,0,0,.06); }
  50%{ transform:rotate(2.5deg) scale(1.03); box-shadow:0 16px 34px -12px rgba(45,45,45,.35); }
  86%{ transform:rotate(2.5deg) scale(1.03); box-shadow:0 16px 34px -12px rgba(45,45,45,.35); }
  100%{ transform:rotate(0) scale(1); box-shadow:0 1px 2px rgba(0,0,0,.06); }
}
@keyframes kmmHand{ 0%,34%{opacity:0;} 41%{opacity:1;} 91%{opacity:1;} 100%{opacity:0;} }
@media (prefers-reduced-motion: reduce){
  .kmm .drag,.kmm .drag .dcard,.kmm .hand{ animation:none !important; }
  .kmm .hand{ display:none; }
}
`;

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

/** Карточка задачи — переиспользуется статичными карточками и drag-карточкой. */
function TaskCard({ c }: { c: Card }) {
  return (
    <div className="space-y-2 rounded-(--radius-lg) border border-[#ededed] bg-(--color-surface-card) p-2.5">
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
  );
}

/** Канбан-доска Kaiten: топбар, сайдбар с иконками, три колонки + анимация drag. */
function KanbanBoard() {
  const dragCard = COLUMNS[0]!.cards[0]!;
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
        <div className="relative flex flex-1 items-start gap-2 overflow-hidden bg-(--color-surface-section) p-2">
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
                  {col.cards.map((c, i) =>
                    // Первая карточка первой колонки — слот, откуда «уезжает» и куда возвращается drag-карточка.
                    idx === 0 && i === 0 ? (
                      <div key={i} className="relative">
                        <div className="invisible">
                          <TaskCard c={c} />
                        </div>
                        <div className="absolute inset-0 rounded-(--radius-lg) border-2 border-dashed border-(--color-border-default) bg-(--color-surface-section)" />
                      </div>
                    ) : (
                      <TaskCard key={i} c={c} />
                    ),
                  )}
                </div>
              </div>
            );
            return idx === 0
              ? [column]
              : [<div key={`${col.title}-divider`} className="w-px self-stretch bg-(--color-border-default)" />, column];
          })}

          {/* Перетаскиваемая карточка + курсор-рука — едет из «Очередь» в «В работе». */}
          <div className="drag absolute z-20 w-[195px]" style={{ left: 14, top: 34 }}>
            <div className="dcard shadow-sm">
              <TaskCard c={dragCard} />
            </div>
            <svg className="hand absolute" style={{ left: '72%', top: '62%' }} width="36" height="36" viewBox="0 0 40 40" aria-hidden>
              <path
                d="M14 22V14a2.2 2.2 0 0 1 4.4 0v-1a2.2 2.2 0 0 1 4.4 0v1a2.2 2.2 0 0 1 4.4 0v1a2.2 2.2 0 0 1 4.4 0v9a8 8 0 0 1-8 8h-2.5a8 8 0 0 1-6.6-3.5l-3.2-4.8a2.3 2.3 0 0 1 3.7-2.8z"
                fill="#fff"
                stroke="#2f2f2f"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Анимированный mock канбан-доски Kaiten — скруглённый экран с фирменной тенью,
 * штатное обрамление моков MediaCopy. Вариант `kanban-minimal-animated`.
 */
export function KanbanMinimalAnimatedMock() {
  return (
    <div className="kmm">
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      <div
        aria-hidden
        className="relative h-[480px] w-[720px] overflow-hidden rounded-(--radius-3xl) border border-(--color-border-default) bg-(--color-surface-card) shadow-[0_30px_80px_-30px_rgba(125,76,207,0.30)]"
      >
        <KanbanBoard />
      </div>
    </div>
  );
}
