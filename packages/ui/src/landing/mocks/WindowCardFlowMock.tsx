import { cn } from '../../primitives/cn';

interface Child {
  /** Колонка доски, в которой лежит дочерняя карточка. */
  column: string;
  title: string;
  /** Дата в правом нижнем углу карточки. */
  date: string;
  /** Карточка едет в соседнюю колонку — висит посередине между ними. */
  moving?: boolean;
  /** Карточку только что перенесло правило — она подсвечена. */
  moved?: boolean;
  /** Пункт отмечен в чек-листе родительской карточки. */
  checked?: boolean;
  /** На сколько сдвинута «едущая» карточка; по умолчанию — половина шага. */
  shift?: number;
  /** Подъём «едущей» карточки вверх; отрицательное значение опускает её. */
  lift?: number;
  /** Серый след на месте, откуда карточка уехала. */
  trace?: boolean;
  /** Карточка идёт поверх остальных — она «в руке». */
  front?: boolean;
  /** Тень «на весу» под едущей карточкой. */
  shadow?: boolean;
}

/** Геометрия доски: три колонки ровно укладываются в 680 − 2×16 padding. */
const COL_W = 208;
const COL_GAP = 12;
/** Полный шаг между колонками: карточка встаёт ровно в соседнюю. */
const FULL_STEP = COL_W + COL_GAP;
/** Половина шага между колонками — на столько смещена «едущая» карточка. */
const HALF_STEP = FULL_STEP / 2 + 24;
/**
 * Высота родительской карточки вместе с отбивкой — измерено в браузере.
 * На столько поднимаем дочернюю карточку, чтобы в соседней колонке она встала
 * вровень с её верхним краем: там родителя над слотом нет.
 */
const PARENT_H = 227;
/** Высота слота: карточка плюс отбивка до соседней. */
const SLOT_H = 76;
/** Размер доски: по нему построен viewBox линий связи. */
const BOARD_W = 680;
const BOARD_H = 381;
/** Г-образная связь со скруглёнными углами: вправо → по вертикали → вправо. */
function elbow(x1: number, y1: number, xTurn: number, y2: number, x2: number, r = 10) {
  const dir = y2 > y1 ? 1 : -1;
  return [
    `M${x1} ${y1}`,
    `H${xTurn - r}`,
    `Q${xTurn} ${y1} ${xTurn} ${y1 + dir * r}`,
    `V${y2 - dir * r}`,
    `Q${xTurn} ${y2} ${xTurn + r} ${y2}`,
    `H${x2}`,
  ].join(' ');
}

/**
 * Связи на доске. Координаты сняты с отрендеренного мока: карточки расставлены
 * абсолютными сдвигами, из констант колонок их не вывести.
 *
 * Первая линия ведёт от пункта «Собрать контент» в чек-листе родителя к самой
 * карточке: вертикаль проходит под «Сверстать лендинг» — svg лежит выше фона
 * колонок, но ниже самих карточек. Вторая продолжает цепочку до «Настроить
 * аналитику».
 */
const LINKS: string[] = [
  elbow(216, 236, 300, 90, 344),
  'M536 90 H570 Q580 90 580 100 V124',
];

const CHILDREN: Child[] = [
  {
    column: 'В работе',
    title: 'Сверстать лендинг',
    date: '21 августа',
    moving: true,
    shift: FULL_STEP,
    lift: PARENT_H - SLOT_H + 12,
    trace: false,
    shadow: false,
    front: true,
  },
  {
    column: 'Согласование',
    title: 'Собрать контент',
    date: '19 августа',
    moving: true,
    checked: true,
    lift: -14,
    shift: 100,
    front: true,
  },
  { column: 'Готово', title: 'Настроить аналитику', date: '18 августа', moved: true, checked: true },
];

/** Дочерняя карточка в колонке доски. */
function ChildCard({
  title,
  date,
  moved,
  moving,
  shift,
  lift,
  trace = true,
  shadow = true,
  front,
}: Child) {
  const card = (
    <div
      className={cn(
        'relative h-full rounded-(--radius-lg) border border-[#ededed] bg-(--color-surface-card)',
        front ? 'z-30' : 'z-20',
        moved ? 'p-2' : 'p-2.5',
      )}
    >
      <div
        className={cn(
          'font-medium leading-snug',
          'text-(--color-text-secondary)',
          moved ? 'text-[11px]' : 'text-[12px]',
        )}
      >
        {title}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-(--color-action-primary-soft) text-[9px] font-semibold text-(--color-text-accent)">
          АК
        </span>
        <span className="ml-auto text-[10px] text-(--color-text-secondary)">{date}</span>
      </div>
    </div>
  );

  // Над приземлившейся карточкой — фиолетовый слот: место, откуда её забрало правило.
  if (moved)
    return (
      <div className="relative mt-21">
        <div className="absolute inset-x-0 bottom-full mb-2 h-[68px] rounded-(--radius-lg) bg-(--color-action-primary)/10" />
        {card}
      </div>
    );

  if (!moving) return card;

  // Карточка уехала вправо, а на её месте в колонке остался серый след.
  return (
    <div className="relative">
      <div className="invisible">{card}</div>
      {trace && <div className="absolute inset-0 rounded-(--radius-lg) bg-black/5" />}
      <div
        className={cn(
          'absolute inset-0',
          front ? 'z-30' : 'z-20',
          shadow && 'shadow-[0_0_30px_-8px_rgba(24,24,27,0.35)]',
        )}
        style={{ transform: `translate(${shift ?? HALF_STEP}px, ${-(lift ?? 0)}px)` }}
      >
        {card}
      </div>
    </div>
  );
}
/** Строка «Основных параметров» карточки задачи. */
function Param({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-[54px] shrink-0 text-[10px] text-(--color-text-secondary)">{label}</span>
      <span className="min-w-0 flex-1 truncate text-[10px] text-(--color-text-primary)">{children}</span>
    </div>
  );
}

/** Родительская карточка: лежит в той же колонке, что и дочерняя в работе. */
function ParentCard() {
  return (
    <div className="relative z-20 mb-2 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-card) p-2.5 shadow-[0_0_10px_-2px_rgba(24,24,27,0.10)]">
      <div className="text-[9px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
        Родительская карточка
      </div>
      <div className="mt-1 text-[12px] font-medium leading-snug text-(--color-text-primary)">
        Запуск нового сайта
      </div>

      {/* основные параметры карточки — как в карточке задачи Kaiten */}
      <div className="mt-2 space-y-1 border-t border-(--color-border-default) pt-2">
        <Param label="Колонка">В работе</Param>
        <Param label="Участник">
          <span className="inline-flex items-center gap-1">
            <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-(--color-action-primary-soft) text-[7px] font-semibold text-(--color-text-accent)">
              АК
            </span>
            Ответственный
          </span>
        </Param>
        <Param label="Срок">21 августа</Param>
      </div>
      {/* дочерние карточки цели — списком с галочками */}

      {/* прогресс по дочерним — тот же вид, что у чек-листа в соседнем моке */}
      <div className="mt-2">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="text-[10px] text-(--color-text-secondary)">Дочерние</span>
          <span className="ml-auto text-[10px] font-semibold text-green-700">2/3</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-(--color-neutral-200)">
          <div className="h-full rounded-full bg-(--color-action-primary)" style={{ width: '67%' }} />
        </div>
      </div>
      {/* закрытые пункты сверху, незакрытый — снизу; порядок обратен колонкам доски */}
      <ul className="mt-2 space-y-1">
        {[...CHILDREN].reverse().map((c) => (
          <li key={c.title} className="flex items-center gap-1.5">
            {c.checked ? (
              <span className="inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-[3px] bg-(--color-action-primary)">
                <svg viewBox="0 0 12 12" className="h-2 w-2" fill="none" stroke="#fff" strokeWidth="2.5">
                  <path d="M2.5 6.2l2.4 2.4L9.6 3.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ) : (
              <span className="inline-flex h-3 w-3 shrink-0 rounded-[3px] border border-(--color-neutral-300)" />
            )}
            <span className="truncate text-[11.5px] text-(--color-text-secondary)">{c.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
/**
 * Доска из трёх колонок — «В работе», «Согласовано», «Готово» — с дочерними
 * карточками цели «Запуск нового сайта». Сама родительская карточка лежит
 * в «В работе» рядом со своей дочерней, а в «Готово» карточка помечена как
 * перенесённая правилом: как только она закрылась, родитель уехал следом.
 */
export function WindowCardFlowMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative w-[680px] overflow-hidden rounded-(--radius-xl) lg:rounded-(--radius-2xl)',
        'bg-(--color-surface-card)',
        'shadow-[0_0_40px_-12px_rgba(24,24,27,0.25)]',
      )}
    >
      {/* window-chrome */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-yellow-300" />
        <span className="h-2 w-2 rounded-full bg-green-300" />
        <div className="ml-2 flex flex-wrap items-center gap-3 text-[11px] text-(--color-text-secondary)">
          <span className="font-medium text-(--color-text-primary)">Текущие задачи</span>
          <span>Связи</span>
        </div>
      </div>

      <div className="relative p-4">
        {/* связи родительской карточки с дочерними */}
        <svg
          className="pointer-events-none absolute left-0 top-0 z-10"
          width={BOARD_W}
          height={BOARD_H}
          viewBox={`0 0 ${BOARD_W} ${BOARD_H}`}
          fill="none"
          aria-hidden
        >
          {LINKS.map((d) => (
            <path
              key={d}
              d={d}
              stroke="var(--color-action-primary)"
              strokeOpacity="0.7"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ))}
        </svg>
        {/* доска: дочерние карточки разложены по колонкам */}
        <div className="flex min-h-[220px]" style={{ gap: COL_GAP }}>
          {CHILDREN.map((c) => (
            <div
              key={c.column}
              className="shrink-0 rounded-(--radius-lg) bg-(--color-surface-section) px-2 pb-3 pt-2"
              style={{ width: COL_W }}
            >
              <div className="mb-2 flex items-center gap-1.5 px-1">
                <span className="truncate text-[11px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                  {c.column}
                </span>
                <span className="ml-auto inline-flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-(--color-border-default) px-1 text-[10px] font-semibold text-(--color-text-secondary)">
                  {c.column === 'В работе' ? 2 : 1}
                </span>
              </div>
              {c.column === 'В работе' && <ParentCard />}
              <ChildCard {...c} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
