import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';
import { DIAGRAMS_STYLE, DIAGRAM_CARDS } from './Diagram';

export type WorkspaceView = 'board' | 'list' | 'table' | 'timeline' | 'calendar' | 'reports';

type Tone = 'violet' | 'blue' | 'green' | 'orange';
type Column = 'Очередь' | 'В работе' | 'Готово';
type Lane = 'Контент' | 'Реклама';

const TAG: Record<Tone, string> = {
  violet: 'bg-(--color-action-primary-soft) text-(--color-text-accent)',
  blue: 'bg-(--color-blue-12) text-(--color-blue-100)',
  green: 'bg-(--color-green-12) text-green-700',
  orange: 'bg-(--color-orange-12) text-amber-800',
};

interface Task {
  title: string;
  column: Column;
  lane: Lane;
  who: string;
  tag: [string, Tone];
  /** Дни сентября: начало и срок. */
  start: number;
  due: number;
  blocked?: boolean;
}

/** Одни и те же задачи во всех видах — мок показывает, что меняется только представление. */
const TASKS: Task[] = [
  { title: 'Промостраница новой функции', column: 'В работе', lane: 'Контент', who: 'АМ', tag: ['Сайт', 'violet'], start: 9, due: 18 },
  { title: 'Статья в блог', column: 'Очередь', lane: 'Контент', who: 'ЕГ', tag: ['Блог', 'blue'], start: 16, due: 22 },
  { title: 'Вебинар для партнеров', column: 'Очередь', lane: 'Контент', who: 'АК', tag: ['События', 'orange'], start: 19, due: 25 },
  { title: 'Рассылка клиентам', column: 'Готово', lane: 'Контент', who: 'ПС', tag: ['Рассылка', 'green'], start: 7, due: 11 },
  { title: 'Баннеры для соцсетей', column: 'В работе', lane: 'Реклама', who: 'АК', tag: ['Дизайн', 'orange'], start: 11, due: 17, blocked: true },
  { title: 'Запуск рекламной кампании', column: 'Очередь', lane: 'Реклама', who: 'АМ', tag: ['Реклама', 'violet'], start: 17, due: 24 },
  { title: 'Отчет по охвату', column: 'Готово', lane: 'Реклама', who: 'ЕГ', tag: ['Аналитика', 'blue'], start: 8, due: 14 },
];

const COLUMNS: Column[] = ['Очередь', 'В работе', 'Готово'];
const LANES: Lane[] = ['Контент', 'Реклама'];

const VIEWS: { id: WorkspaceView; icon: string; label: string }[] = [
  { id: 'board', icon: 'LayoutGrid', label: 'Доски' },
  { id: 'list', icon: 'List', label: 'Списки' },
  { id: 'table', icon: 'Table2', label: 'Таблица' },
  { id: 'timeline', icon: 'AlignLeft', label: 'Таймлайн' },
  { id: 'calendar', icon: 'Calendar', label: 'Календарь' },
  { id: 'reports', icon: 'ChartLine', label: 'Отчеты' },
];

function Avatar({ who }: { who: string }) {
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#b9a3e3] text-[9px] font-semibold leading-none text-white">
      {who}
    </span>
  );
}

function Tag({ tag }: { tag: [string, Tone] }) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[10.5px] font-medium', TAG[tag[1]])}>
      {tag[0]}
    </span>
  );
}

/** Пустая «Новая доска» с открытым меню колонки — как на экране создания доски в Kaiten. */
const NEW_BOARD_COLUMNS = ['Очередь', 'В работе', 'Готово'];
const NEW_BOARD_LANES = ['Срочно', 'Обычный приоритет'];

function Badge() {
  return (
    <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[4px] bg-(--color-neutral-400) px-1 text-[10px] font-semibold text-white">
      0
    </span>
  );
}

function BoardView() {
  return (
    <div className="relative overflow-hidden rounded-(--radius-lg) bg-(--color-surface-section)">
      <div className="flex items-center gap-2 px-3 pb-1.5 pt-2.5">
        <Icon name="GripVertical" className="h-3.5 w-3.5 text-(--color-text-secondary)" strokeWidth={2} />
        <span className="text-[13px] font-semibold text-(--color-text-primary)">Новая доска</span>
        <Icon name="ChevronUp" className="ml-auto h-3.5 w-3.5 text-(--color-text-secondary)" strokeWidth={2} />
      </div>
      <div className="grid grid-cols-3 px-2 pb-2">
        {NEW_BOARD_COLUMNS.map((c, i) => (
          <div key={c} className={cn('flex items-center gap-1.5 px-2 py-1 text-[11.5px] font-semibold text-(--color-text-primary)', i > 0 && 'border-l border-(--color-border-default)')}>
            {c === 'Готово' && <Icon name="Check" className="h-3.5 w-3.5" strokeWidth={2.4} />}
            {c}
            <span className="ml-auto flex items-center gap-1.5">
              {c === 'В работе' && (
                <>
                  <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-[4px] bg-(--color-action-primary) text-white">
                    <Icon name="Plus" className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <Icon name="EllipsisVertical" className="h-3.5 w-3.5 text-(--color-text-secondary)" strokeWidth={2} />
                </>
              )}
              <Badge />
            </span>
          </div>
        ))}
      </div>
      {NEW_BOARD_LANES.map((lane) => (
        <div key={lane}>
          <div className="flex items-center gap-1.5 border-t border-(--color-border-default) px-3 py-2 text-[11.5px] text-(--color-text-primary)">
            {lane}
            <span className="ml-auto flex items-center gap-1.5">
              <Badge />
              <Icon name="ChevronUp" className="h-3.5 w-3.5 text-(--color-text-secondary)" strokeWidth={2} />
            </span>
          </div>
          <div className="grid h-[92px] grid-cols-3 border-t border-(--color-border-default) px-2 py-2">
            {NEW_BOARD_COLUMNS.map((c, i) => (
              <div key={c} className={cn(i > 0 && 'border-l border-(--color-border-default)')} />
            ))}
          </div>
        </div>
      ))}

      {/* меню колонки «В работе» */}
      <div className="absolute left-[318px] top-[62px] z-10 w-[230px] rounded-(--radius-md) border border-(--color-border-default) bg-(--color-surface-card) py-1.5 text-[11.5px] text-(--color-text-primary) shadow-[0_8px_24px_-8px_rgba(45,45,45,0.3)]">
        <div className="px-3 py-1.5 text-(--color-text-secondary)">Создать карточку на дорожке</div>
        <div className="px-3 py-1.5">Срочно</div>
        <div className="px-3 py-1.5">Обычный приоритет</div>
        <div className="my-1 border-t border-(--color-border-default)" />
        <div className="flex items-center bg-(--color-action-primary-soft) px-3 py-1.5 text-(--color-text-accent)">
          Создать колонку
          <Icon name="ChevronDown" className="ml-auto h-3.5 w-3.5" strokeWidth={2} />
        </div>
        <div className="px-3 py-1.5">Добавить 2 подколонки</div>
      </div>
    </div>
  );
}

/** Дополнительные строки для таблицы и списка — заполняют окно до низа. */
const TABLE_EXTRA: Task[] = [
  { title: 'Кейс клиента для сайта', column: 'В работе', lane: 'Контент', who: 'ПС', tag: ['Сайт', 'violet'], start: 12, due: 19 },
  { title: 'Посевы в Telegram-каналах', column: 'Очередь', lane: 'Реклама', who: 'АК', tag: ['Реклама', 'violet'], start: 18, due: 26 },
  { title: 'Обновить презентацию', column: 'Готово', lane: 'Контент', who: 'ЕГ', tag: ['Дизайн', 'orange'], start: 6, due: 10 },
];

function ListView() {
  // в «Готово» добавлена строка из TABLE_EXTRA — список доходит до низа окна
  const tasks = [...TASKS, ...TABLE_EXTRA.filter((t) => t.column === 'Готово')];
  return (
    <div className="flex flex-col gap-3">
      {COLUMNS.map((c) => (
        <div key={c}>
          <div className="mb-1 flex items-center gap-1.5 text-[12px] font-semibold text-(--color-text-accent)">
            <Icon name="ChevronDown" className="h-3.5 w-3.5" strokeWidth={2.2} />
            {c}
            <span className="font-normal text-(--color-text-secondary)">{tasks.filter((t) => t.column === c).length}</span>
          </div>
          {tasks.filter((t) => t.column === c).map((t) => (
            <div key={t.title} className="flex items-center gap-2.5 border-b border-(--color-border-default) py-1.5 pl-5">
              <span
                className={cn(
                  'inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[4px] border',
                  c === 'Готово'
                    ? 'border-(--color-action-primary) bg-(--color-action-primary) text-white'
                    : 'border-(--color-neutral-400)',
                )}
              >
                {c === 'Готово' && <Icon name="Check" className="h-2.5 w-2.5" strokeWidth={3} />}
              </span>
              <span className={cn('text-[12px] text-(--color-text-primary)', c === 'Готово' && 'text-(--color-text-secondary)')}>
                {t.title}
              </span>
              <Tag tag={t.tag} />
              <span className="ml-auto text-[10.5px] text-(--color-text-secondary)">{t.due} сен</span>
              <Avatar who={t.who} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function TableView() {
  const grid = 'grid grid-cols-[1.9fr_0.9fr_0.9fr_1fr_0.7fr_0.9fr]';
  return (
    <div className="overflow-hidden rounded-(--radius-lg) border border-(--color-border-default)">
      <div className={cn(grid, 'bg-(--color-surface-section) text-[11px] font-semibold text-(--color-text-secondary)')}>
        {['Название', 'Колонка', 'Дорожка', 'Ответственный', 'Срок', 'Метка'].map((h) => (
          <div key={h} className="border-r border-(--color-border-default) px-2.5 py-1.5 last:border-r-0">{h}</div>
        ))}
      </div>
      {[...TASKS, ...TABLE_EXTRA].map((t) => (
        <div key={t.title} className={cn(grid, 'items-center border-t border-(--color-border-default) text-[11.5px] text-(--color-text-primary)')}>
          <div className="truncate border-r border-(--color-border-default) px-2.5 py-[7.3px] font-medium">{t.title}</div>
          <div className="border-r border-(--color-border-default) px-2.5 py-[7.3px]">{t.column}</div>
          <div className="border-r border-(--color-border-default) px-2.5 py-[7.3px]">{t.lane}</div>
          <div className="flex items-center gap-1.5 border-r border-(--color-border-default) px-2.5 py-1">
            <Avatar who={t.who} />
          </div>
          <div className="border-r border-(--color-border-default) px-2.5 py-[7.3px]">{t.due}.09</div>
          <div className="px-2.5 py-1"><Tag tag={t.tag} /></div>
        </div>
      ))}
    </div>
  );
}

const TODAY = 15;

/* Таймлайн — диаграмма Ганта по образцу GanttChartMock: этапы с summary-плашками,
   отделы, подзадачи с эмодзи, связи этапов стрелками. Цвета data-viz из Figma-исходника. */
const G_SIDE = 198;
const G_DAY = 20;
const G_DAYS = 28;
const G_ROW = 29;
const G_WEEKENDS = [6, 7, 13, 14, 20, 21, 27, 28];
const G_FILL = { green: '#5cb85c', lime: '#a0c517', amber: '#f5a623', purple: '#9034aa' } as const;
const G_TINT = { green: '#9dd49d', lime: '#c6dc74', amber: '#f9ca7b', violet: '#b194e2' } as const;

type GRow =
  | { kind: 'group'; initial: string; name: string }
  | { kind: 'dept'; name: string }
  | { kind: 'task'; emoji: string; name: string };

const G_ROWS: GRow[] = [
  { kind: 'group', initial: 'П', name: 'Планирование' },
  { kind: 'dept', name: 'Отдел стратегий' },
  { kind: 'task', emoji: '📄', name: 'Эконом. обоснование' },
  { kind: 'task', emoji: '📄', name: 'План работ' },
  { kind: 'group', initial: 'Р', name: 'Реализация' },
  { kind: 'dept', name: 'Отдел разработки' },
  { kind: 'task', emoji: '⭐', name: 'Подзадача Альфа' },
  { kind: 'task', emoji: '🧠', name: 'Подзадача Бета' },
  { kind: 'task', emoji: '✏️', name: 'Подзадача Гамма' },
  { kind: 'group', initial: 'П', name: 'Продвижение проекта' },
  { kind: 'dept', name: 'Отдел маркетинга' },
  { kind: 'task', emoji: '✅', name: 'Пресс-релиз' },
];

const G_BARS: { row: number; s: number; e: number; summary?: boolean; color?: keyof typeof G_FILL; avatars?: (keyof typeof G_TINT)[] }[] = [
  { row: 0, s: 1, e: 5, summary: true },
  { row: 2, s: 1, e: 3, color: 'green', avatars: ['green'] },
  { row: 3, s: 4, e: 5, color: 'green', avatars: ['green', 'violet'] },
  { row: 4, s: 8, e: 18, summary: true },
  { row: 6, s: 8, e: 10, color: 'lime', avatars: ['lime'] },
  { row: 7, s: 11, e: 15, color: 'lime', avatars: ['lime'] },
  { row: 8, s: 16, e: 18, color: 'amber', avatars: ['amber'] },
  { row: 9, s: 19, e: 29, summary: true },
  { row: 11, s: 19, e: 23, color: 'green', avatars: ['green'] },
];

/** Плашка этапа: скругленный верх и скосы по краям снизу. */
function GSummary({ w }: { w: number }) {
  return (
    <svg width={w} height={18} viewBox={`0 0 ${w} 18`} className="block">
      <path d={`M0 3Q0 0 3 0H${w - 3}Q${w} 0 ${w} 3V18L${w - 6} 13H6L0 18Z`} fill={G_FILL.purple} />
    </svg>
  );
}

function GAvatar({ tint }: { tint: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 26 26" className="block">
      <circle cx="13" cy="13" r="11.5" fill="#fff" stroke={tint} strokeWidth="2" />
      <circle cx="13" cy="10.5" r="4" fill={tint} />
      <path d="M5.5 20.5c1.6-3 4.3-4.5 7.5-4.5s5.9 1.5 7.5 4.5" fill={tint} />
    </svg>
  );
}

function TimelineView() {
  const bodyW = G_DAYS * G_DAY;
  const bodyH = G_ROWS.length * G_ROW;
  const cy = (r: number) => r * G_ROW + 12;
  const r = 6;
  // связи этапов: конец предыдущего этапа → начало следующего
  const links = [
    // уголком: вправо, вниз, вправо к началу «Реализации»
    `M ${5 * G_DAY} ${cy(0)} H ${6 * G_DAY - r} Q ${6 * G_DAY} ${cy(0)} ${6 * G_DAY} ${cy(0) + r} V ${cy(4) - r} Q ${6 * G_DAY} ${cy(4)} ${6 * G_DAY + r} ${cy(4)} H ${7 * G_DAY + 1}`,
    // S-кривая: вправо, наискось вниз-влево, вправо к началу «Продвижения»
    `M ${18 * G_DAY} ${cy(4)} H ${18 * G_DAY + 8} Q ${18 * G_DAY + 14} ${cy(4)} ${18 * G_DAY + 13} ${cy(4) + r} L ${18 * G_DAY - 11} ${cy(9) - r} Q ${18 * G_DAY - 12} ${cy(9)} ${18 * G_DAY - 6} ${cy(9)} H ${18 * G_DAY + 1}`,
  ];
  return (
    <div className="flex text-[11px]">
      <div className="shrink-0 border-r border-(--color-border-default)" style={{ width: G_SIDE }}>
        <div className="flex h-[43px] items-center border-b border-(--color-border-default) bg-(--color-surface-section) px-3 text-[11.5px] font-medium text-(--color-text-primary)">
          Название
        </div>
        {G_ROWS.map((row, i) => (
          <div key={i} className="flex items-center gap-1.5 border-b border-(--color-border-default) px-2.5" style={{ height: G_ROW }}>
            {row.kind === 'group' && (
              <>
                <Icon name="ChevronUp" className="h-3 w-3 text-(--color-text-secondary)" strokeWidth={2} />
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-(--color-action-primary) text-[8.5px] text-white">{row.initial}</span>
                <span className="truncate text-(--color-text-primary)">{row.name}</span>
              </>
            )}
            {row.kind === 'dept' && <span className="truncate pl-[42px] font-medium text-(--color-text-accent)">{row.name}</span>}
            {row.kind === 'task' && (
              <>
                <span className="ml-[30px] inline-flex w-3.5 shrink-0 justify-center text-[10px] leading-none">{row.emoji}</span>
                <span className="truncate text-(--color-text-primary)">{row.name}</span>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="shrink-0" style={{ width: bodyW }}>
        <div className="border-b border-(--color-border-default) bg-(--color-surface-section)">
          <div className="h-[21px] text-center text-[10.5px] font-medium leading-[21px] text-(--color-text-primary)">сентябрь</div>
          <div className="flex h-[22px]">
            {Array.from({ length: G_DAYS }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'flex shrink-0 items-center justify-center border-l border-(--color-border-default) text-[9px]',
                  i + 1 === TODAY ? 'font-semibold text-(--color-text-accent)' : 'text-(--color-text-secondary)',
                )}
                style={{ width: G_DAY }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden" style={{ width: bodyW, height: bodyH }}>
          {Array.from({ length: G_DAYS }, (_, i) => (
            <div
              key={i}
              className={cn('absolute inset-y-0 border-l border-(--color-border-default)', G_WEEKENDS.includes(i + 1) && 'bg-(--color-surface-section)')}
              style={{ left: i * G_DAY, width: G_DAY }}
            />
          ))}
          {G_BARS.map((b) => {
            const left = (b.s - 1) * G_DAY + 1;
            const width = (b.e - b.s + 1) * G_DAY - 2;
            return (
              <div key={b.row}>
                {b.summary ? (
                  <div className="absolute" style={{ left, top: b.row * G_ROW + 3 }}>
                    <GSummary w={width} />
                  </div>
                ) : (
                  <div className="absolute rounded-[3px]" style={{ left, width, top: b.row * G_ROW + 6, height: G_ROW - 12, background: G_FILL[b.color!] }} />
                )}
                {b.avatars?.map((a, ai) => (
                  <div key={ai} className="absolute" style={{ left: left + width + 2 + ai * 17, top: b.row * G_ROW + (G_ROW - 16) / 2 }}>
                    <GAvatar tint={G_TINT[a]} />
                  </div>
                ))}
              </div>
            );
          })}
          <svg className="pointer-events-none absolute inset-0" width={bodyW} height={bodyH}>
            <defs>
              <marker id="wsGanttArrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0 0L8 4L0 8Z" fill="#7a7a7a" />
              </marker>
            </defs>
            {links.map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#7a7a7a" strokeWidth="1.2" markerEnd="url(#wsGanttArrow)" />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

function CalendarView() {
  // Сентябрь 2026: 7-е — понедельник. Показываем четыре недели, после 30-го — октябрь.
  const weeks = [7, 14, 21, 28].map((mon) => ({ mon, days: Array.from({ length: 7 }, (_, i) => mon + i) }));
  return (
    <div className="overflow-hidden rounded-(--radius-lg) border border-(--color-border-default)">
      <div className="grid grid-cols-7 bg-(--color-surface-section) text-[10.5px] font-semibold text-(--color-text-secondary)">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d) => (
          <div key={d} className="px-2 py-1.5">{d}</div>
        ))}
      </div>
      {weeks.map((week) => (
        <div key={week.mon} className="grid grid-cols-7 border-t border-(--color-border-default)">
          {week.days.map((day, i) => (
            <div
              key={day}
              className={cn(
                'flex min-h-[82px] flex-col gap-1 border-r border-(--color-border-default) p-1.5 last:border-r-0',
                i > 4 && 'bg-(--color-surface-section)/60',
              )}
            >
              <span
                className={cn(
                  'inline-flex h-5 w-5 items-center justify-center rounded-full text-[10.5px]',
                  day === TODAY ? 'bg-(--color-action-primary) font-semibold text-white' : 'text-(--color-text-secondary)',
                  day > 30 && 'opacity-50',
                )}
              >
                {day > 30 ? day - 30 : day}
              </span>
              {TASKS.filter((t) => t.due === day).map((t) => (
                <span key={t.title} className={cn('truncate rounded-[5px] px-1.5 py-0.5 text-[10px] font-medium leading-tight', TAG[t.tag[1]])}>
                  {t.title}
                </span>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Компактные карточки диаграмм Diagram.tsx под окно 726×360. */
const WS_REPORTS_STYLE = `
.ws-reports .rept{padding:10px 12px 9px; border-radius:10px;}
.ws-reports .rept__t{font-size:11.5px; line-height:15px; font-weight:400; margin-bottom:2px;}
.ws-reports .rept__lg{padding-top:5px; gap:4px 9px;}
.ws-reports .rept__lg span{font-size:9px;}
`;

function ReportsView() {
  // Шесть отчетов Кайтена из Diagram.tsx: сгорание, скорость команды, время выполнения,
  // накопительная, спектральная, пропускная способность — сеткой 3×2.
  return (
    <div className="diagrams-mock is-headless ws-reports h-full" style={{ display: 'flex', alignItems: 'center' }}>
      <style dangerouslySetInnerHTML={{ __html: DIAGRAMS_STYLE + WS_REPORTS_STYLE }} />
      <div className="grid w-full grid-cols-3 gap-2.5">
        {DIAGRAM_CARDS.map((html, i) => (
          <div key={i} className="contents" dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </div>
    </div>
  );
}

const BODY: Record<WorkspaceView, () => React.ReactElement> = {
  board: BoardView,
  list: ListView,
  table: TableView,
  timeline: TimelineView,
  calendar: CalendarView,
  reports: ReportsView,
};

/**
 * Шапка окна пространства: хлебные крошки «Запуск продукта › Маркетинг» и
 * переключатель видов с подсвеченным активным. Дизайн-ширина 760px.
 */
export function WorkspaceViewHeader({ view }: { view: WorkspaceView }) {
  return (
    <div className="flex items-center gap-2 border-b border-(--color-border-default) px-4 py-2.5">
      <Icon name="Menu" className="h-4 w-4 text-(--color-text-secondary)" strokeWidth={2} />
      <span className="text-[12px] text-(--color-text-secondary)">Запуск продукта</span>
      <Icon name="ChevronRight" className="h-3.5 w-3.5 text-(--color-text-secondary)" strokeWidth={2} />
      <span className="text-[13px] font-semibold text-(--color-text-primary)">Маркетинг</span>
      <div className="ml-auto flex items-center gap-0.5">
        {VIEWS.map((v) => {
          const active = v.id === view;
          return (
            <span
              key={v.id}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-(--radius-md) px-1.5 py-1',
                active ? 'bg-(--color-action-primary-soft) text-(--color-text-accent)' : 'text-(--color-text-secondary)',
              )}
            >
              <Icon name={v.icon} className="h-4 w-4" strokeWidth={2} />
              {active && <span className="text-[11px] font-semibold uppercase leading-none">{v.label}</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Window: одно пространство Kaiten в шести представлениях — доски, списки,
 * таблица, таймлайн, календарь, отчеты. Во всех видах одни и те же семь
 * карточек доски «Маркетинг» (дорожки «Контент» и «Реклама»), в тулбаре
 * подсвечен активный вид. Дизайн-ширина 760px, в узких слотах масштабируется.
 */
export function WorkspaceViewMock({ view }: { view: WorkspaceView }) {
  const Body = BODY[view];
  return (
    <div
      aria-hidden
      className={cn(
        'w-[760px] overflow-hidden rounded-(--radius-2xl) border border-(--color-border-default)',
        'bg-(--color-surface-card) shadow-[0_10px_40px_-20px_rgba(45,45,45,0.3)]',
      )}
    >
      <WorkspaceViewHeader view={view} />
      <div
        className={cn(
          'overflow-hidden',
          // доска: компактные поля и высота по содержимому, без пустого низа
          view === 'board' ? 'p-2.5' : 'h-[392px]',
          view !== 'timeline' && view !== 'board' && 'p-4',
        )}
      >
        <Body />
      </div>
    </div>
  );
}
