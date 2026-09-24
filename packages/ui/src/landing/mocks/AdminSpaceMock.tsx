import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

type Bar = 'violet' | 'pink' | 'slate' | 'blue';
const BAR: Record<Bar, string> = {
  violet: 'bg-(--color-action-primary)',
  pink: 'bg-[#e58fb0]',
  slate: 'bg-[#7c8797]',
  blue: 'bg-(--color-blue-100)',
};

interface Card {
  title: string;
  bar: Bar;
  dates: string;
  who?: string[];
  more?: string;
  urgent?: boolean;
  due?: string;
  icon?: string;
}

interface Column {
  name: string;
  done?: boolean;
  cards: Card[];
}

interface Board {
  title: string;
  columns: Column[];
}

const STRATEGY: Board = {
  title: 'Стратегические проекты компании',
  columns: [
    { name: 'Очередь', cards: [{ title: 'Автоматизация работы торговых представителей', bar: 'violet', dates: '01.02 – 30.06', icon: 'Rocket' }] },
    {
      name: 'В работе',
      cards: [
        { title: 'Запуск интернет-продаж', bar: 'violet', dates: '01.05 – 31.12', who: ['АМ'], icon: 'Rocket' },
        { title: 'Переход на ЭДО', bar: 'violet', dates: '01.07 – 29.10', who: ['ЕГ'], urgent: true, icon: 'Rocket' },
      ],
    },
    { name: 'Готово', done: true, cards: [] },
  ],
};

const IT: Board = {
  title: 'Проекты ИТ-департамента',
  columns: [
    { name: 'Очередь', cards: [] },
    {
      name: 'В работе',
      cards: [
        { title: 'Разработка интернет-магазина', bar: 'pink', dates: '01.11 – 31.03', who: ['ДК', 'ВП'], more: '+3', urgent: true },
        { title: 'Переезд главного офиса', bar: 'pink', dates: '01.12 – 30.07', who: ['ДК', 'СП'], more: '+1' },
      ],
    },
  ],
};

const PEOPLE: Board = {
  title: 'Развитие сотрудников',
  columns: [
    { name: 'Наняты', cards: [{ title: 'Иванов, разработчик', bar: 'slate', dates: '01.10 – 31.12', icon: 'GraduationCap' }] },
    { name: 'Первичное обучение', cards: [{ title: 'Смирнова, аналитик', bar: 'slate', dates: '01.11 – 30.11', who: ['ОК'], icon: 'GraduationCap' }] },
    {
      name: 'Экзамены',
      cards: [
        { title: 'Кузнецов, тестировщик', bar: 'slate', dates: '15.10 – 15.11', who: ['АК'], due: '15.11', icon: 'GraduationCap' },
      ],
    },
    {
      name: 'План развития',
      cards: [
        { title: 'Семенов, старший разработчик', bar: 'slate', dates: '01.02 – 26.02', who: ['АК', 'ВП'], icon: 'GraduationCap' },
        { title: 'Петров, старший разработчик', bar: 'slate', dates: '01.12 – 31.12', who: ['ДЕ'], icon: 'GraduationCap' },
      ],
    },
    {
      name: 'Оценка 360',
      cards: [
        { title: 'Максимов, старший разработчик', bar: 'slate', dates: '02.11 – 29.01', who: ['ПГ'], due: '15.01', icon: 'GraduationCap' },
        { title: 'Федоров, руководитель группы', bar: 'slate', dates: '01.01 – 31.03', who: ['ДЕ'], due: '15.01', icon: 'GraduationCap' },
      ],
    },
  ],
};

function CardView({ c }: { c: Card }) {
  return (
    <div className="rounded-(--radius-md) border border-(--color-border-default) bg-(--color-surface-card) px-2 py-1.5 shadow-[0_1px_2px_rgba(45,45,45,0.06)]">
      {/* метка и иконка в одной строке — иконка не отнимает ширину у заголовка */}
      <div className="mb-1 flex items-center">
        <div className={cn('h-[3px] w-7 rounded-full', BAR[c.bar])} />
        {c.icon && <Icon name={c.icon} className="ml-auto h-3 w-3 text-(--color-text-accent)" strokeWidth={2} />}
      </div>
      <div className="text-[11px] font-medium leading-snug text-(--color-text-primary)">{c.title}</div>
      {/* срок, исполнители и срочность — одной строкой */}
      <div className="mt-1 flex flex-wrap items-center gap-1">
        <span className="inline-flex items-center gap-1 rounded-full border border-(--color-border-default) px-1.5 py-px text-[9px] text-(--color-text-secondary)">
          <Icon name="AlignLeft" className="h-2.5 w-2.5" strokeWidth={2} />
          {c.dates}
        </span>
        {c.who?.map((w) => (
          <span key={w} className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-(--color-neutral-400) text-[7px] font-semibold text-white">
            {w}
          </span>
        ))}
        {c.more && <span className="text-[9px] text-(--color-text-secondary)">{c.more}</span>}
        {c.urgent && (
          <span className="inline-flex items-center gap-0.5 rounded-[4px] bg-[#fdecec] px-1 py-px text-[9px] font-medium text-[#c2413b]">
            <Icon name="Flame" className="h-2.5 w-2.5" strokeWidth={2.2} />
            Срочно
          </span>
        )}
        {c.due && (
          <span className="inline-flex items-center gap-0.5 rounded-[4px] bg-[#fdecec] px-1 py-px text-[9px] font-medium text-[#c2413b]">
            <Icon name="Calendar" className="h-2.5 w-2.5" strokeWidth={2.2} />
            {c.due}
          </span>
        )}
      </div>
    </div>
  );
}

/** Ширина колонки одинакова во всех досках: 800 = (3·145 + 2·8 + 20) + 10 + (2·145 + 8 + 20). */
const COL_W = 145;

/** width — ширина доски: по ней считаем зазор между колонками, чтобы разделитель встал ровно посередине. */
function BoardView({ b, width, className }: { b: Board; width: number; className?: string }) {
  const n = b.columns.length;
  const gap = (width - 20 - n * COL_W) / (n - 1);
  return (
    <div className={cn('rounded-(--radius-lg) bg-(--color-surface-section) p-2.5', className)}>
      <div className="mb-2 flex items-center px-1">
        <span className="text-[12px] font-semibold text-(--color-text-primary)">{b.title}</span>
        <Icon name="ChevronUp" className="ml-auto h-3.5 w-3.5 text-(--color-text-secondary)" strokeWidth={2} />
      </div>
      <div className="grid justify-between gap-2" style={{ gridTemplateColumns: `repeat(${b.columns.length}, ${COL_W}px)` }}>
        {b.columns.map((col, i) => (
          <div key={col.name} className="relative min-w-0">
            {i > 0 && <div className="absolute inset-y-0 w-px bg-(--color-border-default)" style={{ left: -gap / 2 - 0.5 }} />}
            <div className="mb-1.5 flex items-center gap-1 px-1 text-[10.5px] font-semibold text-(--color-text-primary)">
              {col.done && <Icon name="Check" className="h-3 w-3 text-(--color-text-secondary)" strokeWidth={2.5} />}
              <span className="truncate">{col.name}</span>
              <span className="ml-auto rounded-[4px] bg-(--color-neutral-400) px-1 text-[9px] font-semibold text-white">{col.cards.length}</span>
            </div>
            <div className="flex min-h-[32px] flex-col gap-1.5">
              {col.cards.map((c) => (
                <CardView key={c.title} c={c} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const VIEWS = ['LayoutGrid', 'List', 'Table2', 'AlignLeft', 'Calendar', 'ChartLine'];

/**
 * Шапка окна пространства Kaiten: меню, название, переключатель видов
 * (активны «Доски») и кнопка «Фильтры». Общая для досочных моков лендинга.
 */
export function BoardWindowHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-(--color-border-default) bg-(--color-surface-card) px-3 py-2">
      <Icon name="Menu" className="h-4 w-4 text-(--color-text-secondary)" strokeWidth={2} />
      <span className="text-[12.5px] font-semibold text-(--color-text-primary)">{title}</span>
      <div className="ml-3 flex items-center gap-0.5">
        {VIEWS.map((v, i) => (
          <span
            key={v}
            className={cn(
              'inline-flex items-center gap-1 rounded-(--radius-md) px-1.5 py-1',
              i === 0 ? 'bg-(--color-action-primary-soft) text-(--color-text-accent)' : 'text-(--color-text-secondary)',
            )}
          >
            <Icon name={v} className="h-3.5 w-3.5" strokeWidth={2} />
            {i === 0 && <span className="text-[10px] font-semibold uppercase">Доски</span>}
          </span>
        ))}
      </div>
      <span className="ml-auto inline-flex items-center gap-1 rounded-(--radius-md) border border-(--color-border-default) px-2 py-1 text-[10px] font-semibold uppercase text-(--color-text-secondary)">
        <Icon name="ListFilter" className="h-3 w-3" strokeWidth={2} />
        Фильтры
      </span>
    </div>
  );
}

/**
 * Window: административное пространство «Рабочий кабинет руководителя» —
 * доски разных отделов на одном экране: «Стратегические проекты компании» и
 * «Проекты ИТ-департамента» рядом, «Развитие сотрудников» на всю ширину.
 * Реконструкция скриншота kaiten.ru/features (s2_3) упрощённым мокапом.
 * Дизайн-ширина 820px, в узких слотах масштабируется.
 */
export function AdminSpaceMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'w-[820px] overflow-hidden rounded-(--radius-2xl) border border-(--color-border-default)',
        'bg-(--color-surface-card) shadow-[0_10px_40px_-20px_rgba(45,45,45,0.3)]',
      )}
    >
      <BoardWindowHeader title="Рабочий кабинет руководителя" />
      <div className="grid grid-cols-[471px_318px] gap-2.5 p-2.5">
        <BoardView b={STRATEGY} width={471} />
        <BoardView b={IT} width={318} />
        <BoardView b={PEOPLE} width={799} className="col-span-2" />
      </div>
    </div>
  );
}
