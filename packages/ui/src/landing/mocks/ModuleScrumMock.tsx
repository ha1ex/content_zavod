import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

const BAR: Record<string, string> = { violet: '#7d4ccf', green: '#4caf51', blue: '#2f6fed', dark: '#2d2d2d' };
const TAG: Record<'violet' | 'green' | 'yellow', [string, string]> = {
  violet: ['#efe9f9', '#7d4ccf'],
  green: ['#e4f2de', '#4a8a2f'],
  yellow: ['#faf1cf', '#8a6a00'],
};
const DUE: Record<'red' | 'green' | 'gray', [string, string, string]> = {
  red: ['#d9594e', '#ffffff', '#ffffff'],
  green: ['#2e9e5b', '#ffffff', '#ffffff'],
  gray: ['#ececee', '#6b6b70', '#9a9a9e'],
};
/** Приглушённый красный для лендингов: светлая заливка вместо сплошной. */
const DUE_RED_MUTED: [string, string, string] = ['#fdecec', '#c2413b', '#c2413b'];
/** Карточки, которые не показываем в лендинговом режиме. */
const LANDING_HIDDEN_IDS = new Set(['FM-222', 'FM-207', 'FM-203']);
/** В лендинговом режиме видны первые три колонки: остальные за кадром только тянут высоту дорожек. */
const LANDING_COLS = 3;
/** Короткие заголовки для лендингового режима — в две строки. */
const LANDING_TITLES: Record<string, string> = {
  'FM-223': 'Рекомендации «Вам понравится» по истории заказов',
};

type Card = {
  plain?: boolean;
  title: string;
  bar?: 'violet' | 'green' | 'blue' | 'dark';
  bug?: boolean;
  banner?: string;
  pts?: number;
  sub?: string | boolean;
  com?: number;
  tag?: [string, 'violet' | 'green' | 'yellow'];
  id?: string;
  nums?: number[];
  range?: string;
  task?: [string, string];
  check?: [string, string];
  av?: string[];
  due?: [string, 'red' | 'green' | 'gray'];
};

const COLS: { t: string; n: number; done?: boolean }[] = [
  { t: 'Бэклог спринта', n: 3 }, { t: 'В работе', n: 5 }, { t: 'Ревью', n: 6 },
  { t: 'Доработка', n: 2 }, { t: 'Тестирование', n: 3 }, { t: 'Готово', n: 2, done: true },
];

const LANES: { name: string; count: number; cells: Card[][] }[] = [
  { name: 'Критический', count: 5, cells: [
    [],
    [{ bar: 'violet', title: 'Система персонализированных рекомендаций «Вам понравится» на основе истории заказов', pts: 8, sub: '0/4', com: 1, tag: ['Поиск и каталог', 'violet'], id: 'FM-223', nums: [13, 10], range: '27 апр. 12:00 - 4 мая 21:00', task: ['Подзадачи', '0/4'], av: ['p'], due: ['30 апр.', 'gray'] }],
    [{ bar: 'dark', bug: true, title: 'Утечка памяти в сервисе нотификаций', pts: 3, tag: ['Платформа', 'green'], id: 'FM-232', nums: [8, 5], range: '12 мар. 12:00 - 19 мар. 21:00', av: ['p', 'p'], due: ['24 апр.', 'red'] }],
    [{ bar: 'green', title: 'Автотесты на Playwright для чекаута', pts: 5, tag: ['Платформа', 'green'], id: 'FM-233', nums: [10, 7], check: ['Чек-лист', '0/3'], av: ['p', 'p'], due: ['24 апр.', 'red'] }],
    [{ bar: 'dark', bug: true, title: 'Шрифты едут на iOS 16 при смене языка', pts: 2, tag: ['ux', 'green'], id: 'FM-242', nums: [7, 4], range: '2 мар. 9:00 - 31 мар. 18:00', av: ['p', 'VU'] }],
    [{ bar: 'dark', bug: true, title: 'GPS-трекинг сбрасывается при сворачивании', pts: 3, tag: ['Приложение курьера v2', 'yellow'], id: 'FM-214', nums: [8, 5], due: ['31 янв.', 'red'] }],
  ]},
  { name: 'Высокий', count: 12, cells: [
    [
      { bar: 'violet', title: 'Применение промокодов и скидок при оформлении', pts: 5, tag: ['Новый чекаут', 'violet'], id: 'FM-205', nums: [10, 7], due: ['20 февр.', 'red'] },
      { bar: 'violet', title: 'Фильтры: кухня, рейтинг, время доставки', pts: 5, tag: ['Поиск и каталог', 'violet'], id: 'FM-222', nums: [10, 7], due: ['25 февр.', 'red'] },
    ],
    [
      { bar: 'green', title: 'Мониторинг: алерты в Grafana при падении заказов', pts: 3, tag: ['Платформа', 'green'], id: 'FM-230', nums: [8, 5], range: '12 мар. 12:00 - 19 мар. 21:00', av: ['p'], due: ['15 янв.', 'red'] },
      { bar: 'blue', title: 'Unit-тесты для расчёта стоимости доставки', pts: 3, tag: ['Новый чекаут', 'violet'], id: 'FM-207', nums: [8, 5], av: ['p'], due: ['3 февр.', 'red'] },
    ],
    [
      { bug: true, title: 'Сумма заказа не пересчитывается при удалении товара', pts: 3, tag: ['Новый чекаут', 'violet'], id: 'FM-206', nums: [8, 5], av: ['p'], due: ['31 янв.', 'red'] },
      { banner: 'Отправили на доработку', title: 'Выбор способа оплаты (СБП, карта, SberPay)', pts: 5, tag: ['Новый чекаут', 'violet'], id: 'FM-203', nums: [10, 7], av: ['p', 'VU'], due: ['5 февр.', 'red'] },
    ],
    [
      { plain: true, title: 'Система персонализированны…' },
      { bar: 'violet', title: 'Разработать алгоритм анализа истории заказов', pts: 6, sub: true, tag: ['Поиск и каталог', 'violet'], nums: [11, 8], range: '9 февр. 9:00 - 16 февр. 15:00', av: ['p'] },
    ],
    [
      { bar: 'violet', title: 'Полнотекстовый поиск по меню ресторанов', pts: 8, tag: ['Поиск и каталог', 'violet'], id: 'FM-221', nums: [13, 10], av: ['p'], due: ['10 февр.', 'red'] },
      { bar: 'green', title: 'Индексация меню в Elasticsearch', pts: 5, tag: ['Поиск и каталог', 'violet'], id: 'FM-224', nums: [10, 7], av: ['p'], due: ['3 февр.', 'red'] },
    ],
    [
      { bar: 'violet', title: 'Фото подтверждение доставки', pts: 5, tag: ['Приложение курьера v2', 'yellow'], id: 'FM-215', nums: [10, 7], av: ['p'], due: ['5 февр.', 'green'] },
    ],
  ]},
];

function Tag({ label, tone }: { label: string; tone: 'violet' | 'green' | 'yellow' }) {
  const t = TAG[tone];
  return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-medium" style={{ background: t[0], color: t[1] }}>{label}</span>;
}
function Pill({ children, round }: { children: React.ReactNode; round?: boolean }) {
  return <span className={cn('inline-flex h-[22px] items-center justify-center border border-(--color-border-default) text-[12px] text-(--color-text-secondary)', round ? 'min-w-[22px] rounded-full px-1' : 'rounded-full px-2')}>{children}</span>;
}
function Avatars({ list }: { list: string[] }) {
  return (
    <div className="flex -space-x-1">
      {list.map((a, i) => a === 'VU'
        ? <span key={i} className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#c7c7cc] text-[9px] font-semibold text-white">VU</span>
        : <span key={i} className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#a78bda] text-white"><Icon name="User" className="h-3 w-3" strokeWidth={2.5} /></span>
      )}
    </div>
  );
}
function Due({ value, tone, muted }: { value: string; tone: 'red' | 'green' | 'gray'; muted?: boolean }) {
  const t = muted && tone === 'red' ? DUE_RED_MUTED : DUE[tone];
  return (
    <span className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-medium" style={{ background: t[0], color: t[1] }}>
      <Icon name="Calendar" className="h-3.5 w-3.5" strokeWidth={2} />
      {value}
    </span>
  );
}

function CardView({ d, muted }: { d: Card; muted?: boolean }) {
  if (d.plain) {
    return <div className="rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-card) px-3 py-2.5 text-[13px] text-(--color-text-primary)">{d.title}</div>;
  }
  return (
    <div className="overflow-hidden rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-card) shadow-[0_1px_2px_rgba(45,45,45,0.05)]">
      {d.banner && (
        <div className="flex items-center gap-1.5 bg-[#f04438] px-3 py-2 text-[12px] font-medium text-white">
          <Icon name="Hand" className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />{d.banner}
        </div>
      )}
      <div className="space-y-2.5 p-3.5">
        {d.bar && <div className="h-[3px] w-9 rounded-full" style={{ background: BAR[d.bar] }} />}
        <div className="flex items-start justify-between gap-2">
          <div className="text-[14px] font-medium leading-snug text-(--color-text-primary)">
            {(muted && d.id && LANDING_TITLES[d.id]) || d.title}
          </div>
          {d.bug && <Icon name="Bug" className="h-4 w-4 shrink-0 text-[#e5484d]" strokeWidth={2} />}
        </div>
        <div className="flex items-center gap-3 text-[12px] text-(--color-text-secondary)">
          <span className="inline-flex items-center gap-1"><Icon name="Flag" className="h-3.5 w-3.5" strokeWidth={2} />{d.pts}</span>
          {d.sub && <span className="inline-flex items-center gap-1"><Icon name="Workflow" className="h-3.5 w-3.5" strokeWidth={2} />{typeof d.sub === 'string' ? d.sub : ''}</span>}
          {d.com && <span className="inline-flex items-center gap-1"><Icon name="MessageSquare" className="h-3.5 w-3.5" strokeWidth={2} />{d.com}</span>}
        </div>
        {d.tag && <div><Tag label={d.tag[0]} tone={d.tag[1]} /></div>}
        <div className="flex items-center gap-1.5">
          {d.id && <Pill>{d.id}</Pill>}
          {d.nums?.map((x, i) => <Pill key={i} round>{x}</Pill>)}
        </div>
        {d.range && (
          <div className="flex items-center gap-1.5 border-t border-(--color-border-default) pt-2 text-[12px] text-(--color-text-secondary)">
            <Icon name="AlignLeft" className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />{d.range}
          </div>
        )}
        {d.task && (
          <div className="flex items-center justify-between border-t border-(--color-border-default) pt-2 text-[12px] text-(--color-text-secondary)">
            <span>{d.task[0]}</span><span>{d.task[1]}</span>
          </div>
        )}
        {d.check && (
          <div className="flex items-center justify-between border-t border-(--color-border-default) pt-2 text-[12px] text-(--color-text-secondary)">
            <span>{d.check[0]}</span><span>{d.check[1]}</span>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-(--color-border-default) pt-2.5">
          {d.av ? <Avatars list={d.av} /> : <span />}
          {d.due ? <Due value={d.due[0]} tone={d.due[1]} muted={muted} /> : <span />}
        </div>
      </div>
    </div>
  );
}

function Lane({ lane, landing, cols }: { lane: { name: string; count: number; cells: Card[][] }; landing?: boolean; cols: number }) {
  return (
    <div className="border-t border-(--color-border-default) pt-3">
      {/* на лендинге название дорожки выровнено по заголовкам колонок (px-4) */}
      <div className={cn('mb-3 flex items-center border-b border-(--color-border-default) pb-2', landing ? 'px-4' : 'px-1')}>
        <span className="text-[14px] font-semibold text-(--color-text-primary)">{lane.name}</span>
        <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-(--color-border-default) px-1.5 text-[12px] font-medium text-(--color-text-secondary)">{lane.count}</span>
        <Icon name="ChevronUp" className="ml-3 h-4 w-4 text-(--color-text-secondary)" strokeWidth={2} />
      </div>
      <div className="flex">
        {lane.cells.slice(0, cols).map((cards, i, cells) => (
          <div key={i} className={cn('w-[300px] shrink-0 space-y-3 px-4 pb-3', i < cells.length - 1 && 'border-r border-(--color-border-default)')}>
            {cards
              .filter((d) => !(landing && d.id && LANDING_HIDDEN_IDS.has(d.id)))
              .map((d, j) => <CardView key={j} d={d} muted={landing} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Mock Scrum-доски спринта Kaiten: свимлейны по приоритету (Критический, Высокий)
 * и колонки (Бэклог спринта → В работе → Ревью → Доработка → Тестирование → Готово)
 * с карточками-задачами: стори-поинты, теги, FM-ID, оценки, диапазоны дат,
 * чек-листы, баг-иконки, баннеры действий, аватары и дедлайн-чипы.
 *
 * `landing` — режим для лендингов: без части карточек (фильтры, unit-тесты,
 * карточка с баннером «Отправили на доработку») и с приглушённым красным у
 * сроков. Без флага мок остаётся прежним — его же выгружают в презентации.
 */
export function ModuleScrumMock({ landing, columns }: { landing?: boolean; columns?: number } = {}) {
  // columns — сколько колонок показать; в лендинговом режиме по умолчанию три
  const cols = columns ?? (landing ? LANDING_COLS : COLS.length);
  return (
    <div aria-hidden className="w-max rounded-2xl bg-(--color-surface-section) p-4">
      {/* board header */}
      <div className="mb-3 flex items-center gap-2 px-1">
        <Icon name="GripVertical" className="h-4 w-4 text-(--color-text-secondary)" strokeWidth={2} />
        <span className="text-[16px] font-semibold text-(--color-text-primary)">Sprint</span>
        <Icon name="ChevronUp" className="ml-auto h-4 w-4 text-(--color-text-secondary)" strokeWidth={2} />
      </div>
      {/* column headers */}
      <div className="flex">
        {COLS.slice(0, cols).map((col, i, cols) => (
          <div key={col.t} className={cn('flex w-[300px] shrink-0 items-center gap-2 px-4 pb-2', i < cols.length - 1 && 'border-r border-(--color-border-default)')}>
            {col.done && <Icon name="Check" className="h-4 w-4 text-(--color-text-secondary)" strokeWidth={2.5} />}
            <span className="text-[14px] font-medium text-(--color-text-primary)">{col.t}</span>
            <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-(--color-border-default) px-1.5 text-[12px] font-medium text-(--color-text-secondary)">{col.n}</span>
          </div>
        ))}
      </div>
      {/* lanes */}
      {LANES.map((lane) => <Lane key={lane.name} lane={lane} landing={landing} cols={cols} />)}
    </div>
  );
}
