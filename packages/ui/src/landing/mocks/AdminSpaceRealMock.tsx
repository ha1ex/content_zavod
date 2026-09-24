'use client';

import { APP_CSS, APP_ICONS as M } from '../HeroScreenApp';

/**
 * AdminSpaceRealMock — «Рабочий кабинет руководителя» в интерфейсе Кайтена:
 * те же стили `.hsi .app`, что на первом экране (шапка, колонки иконок,
 * «Дерево», панель видов), а в рабочей области три доски пространства —
 * «Стратегические проекты компании» и «Проекты ИТ-департамента» рядом,
 * «Развитие сотрудников» под ними. Карточки — с периодами, аватарами и
 * пометками «Срочно». Статичный мокап, дизайн-ширина 1920px.
 */

const I = ({ d, size = 24, className }: { d: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d={d} />
  </svg>
);

const KaitenMark = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
    <circle cx="13" cy="13" r="13" fill="#F11F24" />
    <path d="M10.6 3.3 3.3 10.6a3.4 3.4 0 0 0 0 4.8l7.3 7.3a3.4 3.4 0 0 0 4.8 0l7.3-7.3a3.4 3.4 0 0 0 0-4.8l-7.3-7.3a3.4 3.4 0 0 0-4.8 0z" fill="#78FFC7" />
    <circle cx="13" cy="13" r="6.3" fill="#7D4CCF" />
  </svg>
);

const TREE = [
  'Дашборд руководителя',
  'Справочный центр',
  'Документ',
  'База знаний',
  'Техподдержка',
  'Канбан для разработки',
  'Заявки',
  'Бухгалтерия',
  'Юридический отдел',
  'Продукт X',
  'HR-отдел',
  'Инженерная разработка',
  'Рабочий кабинет руководителя',
  'Портфель проектов',
];

type Card = {
  title: string;
  icon?: keyof typeof ICONS;
  period?: string;
  due?: string;
  urgent?: boolean;
  accent?: string;
  avatars?: string[];
  extra?: string;
};
type Column = { name: string; count: number; done?: boolean; cards: Card[] };
type Board = { name: string; columns: Column[] };

const V = '#7d4ccf';
const P = '#ffcdd2';
const G = '#66bb6a';

const STRATEGIC: Board = {
  name: 'Стратегические проекты компании',
  columns: [
    {
      name: 'Очередь',
      count: 1,
      cards: [{ title: 'Автоматизация работы торговых представителей', icon: 'gear', accent: V, period: '01.02 – 30.06' }],
    },
    {
      name: 'В работе',
      count: 2,
      cards: [
        { title: 'Запуск интернет-продаж', icon: 'rocket', accent: V, period: '01.05 – 31.12', avatars: ['#a5d4d9'] },
        { title: 'Переход на ЭДО', icon: 'doc', accent: V, period: '01.07 – 29.10', avatars: ['#f6c453'], urgent: true },
      ],
    },
    { name: 'Готово', count: 0, done: true, cards: [] },
  ],
};

const IT: Board = {
  name: 'Проекты ИТ-департамента',
  columns: [
    { name: 'Очередь', count: 0, cards: [] },
    {
      name: 'В работе',
      count: 2,
      cards: [
        { title: 'Разработка интернет-магазина', icon: 'cart', accent: P, period: '01.11 – 31.03', avatars: ['#c5cae9', '#9fd3cf'], extra: '+3', urgent: true },
        { title: 'Переход главного офиса', icon: 'box', accent: P, period: '01.12 – 30.07', avatars: ['#f6c453', '#a5d4d9'], extra: '+1' },
      ],
    },
  ],
};

const STAFF: Board = {
  name: 'Развитие сотрудников',
  columns: [
    { name: 'Наняты', count: 1, cards: [{ title: 'Иванов, разработчик', icon: 'laptop', accent: V, period: '01.10 – 31.12' }] },
    { name: 'Первичное обучение', count: 1, cards: [{ title: 'Смирнова, аналитик', icon: 'chart', accent: V, period: '01.11 – 30.11' }] },
    {
      name: 'Экзамены',
      count: 1,
      cards: [{ title: 'Кузнецов, тестировщик', icon: 'target', accent: V, period: '15.10 – 15.11', avatars: ['#a5d4d9'], due: '15.11' }],
    },
    {
      name: 'План развития',
      count: 2,
      cards: [
        { title: 'Семенов, старший разработчик', icon: 'star', accent: G, period: '01.02 – 26.02', avatars: ['#f6c453', '#c5cae9'] },
        { title: 'Петров, старший разработчик', icon: 'book', accent: G, period: '01.12 – 31.12', avatars: ['#9fd3cf'] },
      ],
    },
    {
      name: 'Оценка 360',
      count: 2,
      cards: [
        { title: 'Максимов, старший разработчик', icon: 'bulb', accent: V, period: '02.11 – 29.01', avatars: ['#a5d4d9'], due: '15.01' },
        { title: 'Федоров, руководитель группы', icon: 'briefcase', accent: V, period: '01.01 – 31.03', avatars: ['#f6c453'], due: '15.01' },
      ],
    },
  ],
};


const Rocket = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M18 2c6 4 9 10 9 17l-4 6H13l-4-6c0-7 3-13 9-17z" fill="#DD2E44" />
    <circle cx="18" cy="14" r="4" fill="#E1E8ED" />
    <path d="M13 25l-4 7 7-3zm10 0l4 7-7-3z" fill="#F4900C" />
  </svg>
);
const ChartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4z" fill="#CCD6DD" />
    <path d="M5 5h26v26H5z" fill="#E1E8ED" />
    <path d="M8 18h5v11H8z" fill="#5C913B" /><path d="M16 9h5v20h-5z" fill="#3B88C3" /><path d="M24 14h5v15h-5z" fill="#DD2E44" />
  </svg>
);
const Gear = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <circle cx="18" cy="18" r="15" fill="#9AAAB4" />
    <circle cx="18" cy="18" r="6" fill="#66757F" />
  </svg>
);
const People = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <circle cx="13" cy="12" r="6" fill="#F4900C" />
    <circle cx="24" cy="13" r="5" fill="#FFCC4D" />
    <path d="M3 31c0-6 4.5-10 10-10s10 4 10 10z" fill="#F4900C" />
    <path d="M22 31c0-5 3-8 7-8s6 3 6 8z" fill="#FFCC4D" />
  </svg>
);

const Briefcase = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M4 12h28a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3z" fill="#C1694F" />
    <path d="M13 8h10a2 2 0 0 1 2 2v2h-3v-1H14v1h-3v-2a2 2 0 0 1 2-2z" fill="#8A4B38" />
    <path d="M1 20h34v4H1z" fill="#8A4B38" />
  </svg>
);
const Doc = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M7 3h14l8 8v22a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="#E1E8ED" />
    <path d="M21 3l8 8h-8z" fill="#AAB8C2" />
    <path d="M10 16h16v2H10zm0 5h16v2H10zm0 5h11v2H10z" fill="#8899A6" />
  </svg>
);
const Cart = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M2 5h5l5 18h17v3H10L4 8H2z" fill="#66757F" />
    <path d="M9 9h25l-3 11H12z" fill="#3B88C3" />
    <circle cx="14" cy="31" r="3" fill="#66757F" />
    <circle cx="27" cy="31" r="3" fill="#66757F" />
  </svg>
);
const Box = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M18 3l15 6-15 6-15-6z" fill="#D99E82" />
    <path d="M3 9v18l15 6V15z" fill="#C1694F" />
    <path d="M33 9v18l-15 6V15z" fill="#A6593F" />
  </svg>
);
const Laptop = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M6 7h24a2 2 0 0 1 2 2v15H4V9a2 2 0 0 1 2-2z" fill="#66757F" />
    <path d="M7 10h22v11H7z" fill="#BDDDF4" />
    <path d="M1 26h34v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z" fill="#9AAAB4" />
  </svg>
);
const Target = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <circle cx="18" cy="18" r="15" fill="#DD2E44" />
    <circle cx="18" cy="18" r="10" fill="#E1E8ED" />
    <circle cx="18" cy="18" r="5" fill="#DD2E44" />
  </svg>
);
const Star = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M18 3l4.6 9.6 10.4 1.4-7.6 7.3 1.9 10.5L18 26.8 8.7 31.8l1.9-10.5L3 14l10.4-1.4z" fill="#FFCC4D" />
  </svg>
);
const Book = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M5 5h11a3 3 0 0 1 2 1v25a3 3 0 0 0-2-1H5z" fill="#5C913B" />
    <path d="M31 5H20a3 3 0 0 0-2 1v25a3 3 0 0 1 2-1h11z" fill="#77B255" />
    <path d="M3 5h2v27H3zm28 0h2v27h-2z" fill="#3E721D" />
  </svg>
);
const Bulb = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M18 3c6 0 11 4.6 11 10.5 0 4.3-2.4 6.6-4 9-1 1.5-1.3 2.7-1.3 4.5H12.3c0-1.8-.3-3-1.3-4.5-1.6-2.4-4-4.7-4-9C7 7.6 12 3 18 3z" fill="#FFCC4D" />
    <path d="M12.5 29h11v2.5a2.5 2.5 0 0 1-2.5 2.5h-6a2.5 2.5 0 0 1-2.5-2.5z" fill="#9AAAB4" />
  </svg>
);
const ICONS = { briefcase: Briefcase, rocket: Rocket, chart: ChartIcon, gear: Gear, people: People, doc: Doc, cart: Cart, box: Box, laptop: Laptop, target: Target, star: Star, book: Book, bulb: Bulb } as const;

const Avatar = ({ color }: { color: string }) => (
  <span className="app__av" style={{ background: color }}>
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path d="M5 28c1-5.2 4.6-8 9-8s8 2.8 9 8z" fill="#fff" opacity=".85" />
      <circle cx="14" cy="12" r="5.2" fill="#f3c9a8" />
      <path d="M8.6 11.6C8.6 7.9 11 6 14 6s5.4 1.9 5.4 5.6c-1.3-1.8-3.4-2.7-5.4-2.7s-4.1.9-5.4 2.7z" fill="#5d4037" />
    </svg>
  </span>
);

function CardView({ card }: { card: Card }) {
  return (
    <div className="app__card">
      {card.accent && <span className="app__accent" style={{ background: card.accent }} />}
      <div className="app__ct-row">
        <div className="app__ct">{card.title}</div>
        {card.icon && <span className="app__ti">{(() => { const Ic = ICONS[card.icon]; return <Ic />; })()}</span>}
      </div>
      {card.period && (
        <div className="asr__period">
          <I d={M.sort} size={16} />
          {card.period}
        </div>
      )}
      {(card.avatars || card.due || card.urgent) && (
        <div className="app__foot">
          <span className="app__avs">
            {card.avatars?.map((c, i) => (
              <Avatar color={c} key={i} />
            ))}
            {card.extra && <span className="app__plus">{card.extra}</span>}
          </span>
          <span className="app__badges">
            {card.due && (
              <span className="app__due">
                <I d={M.event} size={17} />
                {card.due}
              </span>
            )}
            {card.urgent && (
              <span className="asr__urgent">
                <I d={M.fire} size={16} />
                Срочно
              </span>
            )}
          </span>
        </div>
      )}
    </div>
  );
}

function BoardView({ board, wide }: { board: Board; wide?: boolean }) {
  return (
    <section className={wide ? 'app__board asr__board asr__board--wide' : 'app__board asr__board'}>
      <div className="app__bhd">
        <span className="app__grip"><i /><i /><i /><i /><i /><i /></span>
        <span className="app__bnm">{board.name}</span>
        <I d={M.expandLess} size={24} className="app__bchev" />
      </div>
      <div className="app__cols">
        {board.columns.map((col) => (
          <div className="app__col" key={col.name}>
            <div className="app__chd">
              {col.done && <I d={M.check} size={20} className="app__chk" />}
              <span className="app__cnm">{col.name}</span>
              <span className="app__cnt">{col.count}</span>
            </div>
            <div className="app__cards">
              {col.cards.map((c, i) => (
                <CardView card={c} key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AdminSpaceRealMock() {
  const views = [M.kanbanO, M.grid, M.sort, M.calendarO, M.sync, M.folderO];
  return (
    <div className="hsi hsi--app asr" aria-hidden="true" style={{ zoom: 1 }}>
      <style dangerouslySetInnerHTML={{ __html: APP_CSS + ASR_CSS }} />
      <div className="app">
        <header className="app__top">
          <span className="app__logo"><KaitenMark />Kaiten</span>
          <span className="app__space"><I d={M.spaceDashboard} size={24} />Рабочий кабинет руководителя</span>
          <span className="app__search">Найти<I d={M.search} size={26} /></span>
          <span className="app__ai">Kaiten - AI</span>
          <span className="app__help"><I d={M.help} size={28} /><i /></span>
          <span className="app__me">З<i /></span>
        </header>

        <div className="app__body">
          <nav className="app__rail">
            <span className="app__rail-it"><I d={M.mail} size={26} /><b>36</b></span>
            <span className="app__rail-it"><I d={M.folderShared} size={26} /></span>
            <span className="app__rail-it"><I d={M.star} size={26} /></span>
            <span className="app__rail-it"><I d={M.accountTree} size={26} /></span>
            <span className="app__rail-it"><I d={M.send} size={26} /></span>
            <span className="app__rail-sp" />
            <span className="app__rail-it"><I d={M.viewWeek} size={24} /></span>
            <span className="app__rail-it"><I d={M.adminShield} size={24} /></span>
          </nav>

          <aside className="app__tree">
            <div className="app__tree-hd"><span>Дерево</span><I d={M.sidebar} size={22} /></div>
            <div className="app__tree-search">
              <span className="app__tree-input"><I d={M.search} size={26} />Найти..</span>
              <I d={M.add} size={26} />
            </div>
            <div className="app__tree-list">
              {TREE.map((label, i) => (
                <div className={i === 12 ? 'app__tree-it is-active' : 'app__tree-it'} key={label + i}>
                  <span className="app__tree-ic"><I d={M.spaceDashboard} size={22} /></span>
                  <span className="app__tree-lbl">{label}</span>
                </div>
              ))}
            </div>
          </aside>

          <div className="app__main">
            <div className="app__bar">
              <span className="app__seg">
                <span className="app__btn is-on"><I d={M.dashboardO} size={22} />Доски</span>
                {views.map((d, i) => (
                  <span className="app__vbtn" key={i}><I d={d} size={24} /></span>
                ))}
              </span>
              <span className="app__btn app__btn--g"><I d={M.insights} size={22} />Отчеты</span>
              <span className="app__btn app__btn--g"><I d={M.archiveDown} size={20} />Архив</span>
              <span className="app__btn app__btn--add"><I d={M.add} size={24} />Добавить</span>
              <span className="app__bar-r">
                <span className="app__btn app__btn--g"><I d={M.filter} size={22} />Фильтры</span>
                <span className="app__btn app__btn--g app__btn--ic"><I d={M.cards} size={22} /></span>
                <span className="app__btn app__btn--g app__btn--ic"><I d={M.dblUp} size={22} /></span>
                <span className="app__btn app__btn--g app__btn--ic"><I d={M.starO} size={22} /></span>
              </span>
            </div>

            <div className="app__work">
              <div className="app__area asr__area">
                <div className="asr__row">
                  <BoardView board={STRATEGIC} />
                  <BoardView board={IT} />
                </div>
                <BoardView board={STAFF} wide />
              </div>
              <nav className="app__rail app__rail--r">
                {[M.peopleO, M.avTimer, M.history, M.filterNone, M.brightnessAutoO, M.block, M.camera, M.shareO, M.schema].map((d, i) => (
                  <span className="app__rail-it" key={i}><I d={d} size={24} /></span>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ASR_CSS = `
.hsi.hsi--app.asr{zoom:1}
/* «Дерево» скрыто: доски занимают всю ширину, как при свернутой панели в продукте */
.asr .app__tree{display:none}
.asr .asr__area{display:flex;flex-direction:column;gap:9px;padding:8px 9px 12px}
.asr .asr__row{display:flex;gap:9px}
/* доска с тремя колонками шире, чем с двумя */
.asr .asr__row>.asr__board:first-child{flex:3 1 0}
.asr .asr__row>.asr__board:last-child{flex:2 1 0}
.asr .asr__board{height:auto;flex:1 1 0;min-width:0;border-bottom:1px solid #e4e7ec;border-radius:8px}
.asr .asr__board--wide{flex:none}
.asr .asr__board .app__cols{padding-bottom:16px}
.asr .asr__board .app__card{gap:10px}

/* карточки крупнее: мокап сильно ужимается в слоте, мелкий текст не читается */
.asr.hsi--app .app__card{padding:12px 12px 14px;gap:12px}
.asr.hsi--app .app__ct{font-size:19px;line-height:25px}
.asr.hsi--app .app__cnm{font-size:18px}
.asr .asr__period,.asr.hsi--app .app__due,.asr .asr__urgent{font-size:16px}
.asr.hsi--app .app__av{width:32px;height:32px}
.asr.hsi--app .app__av svg{width:32px;height:32px}
.asr.hsi--app .app__accent{width:60px;height:5px}
/* период работ: как строка со сроками в продукте */
.asr .asr__period{display:inline-flex;align-items:center;gap:6px;align-self:flex-start;padding:2px 8px;border:1px solid #e0e0e0;border-radius:4px;font-size:13.5px;color:#616161}
.asr .asr__period svg{color:#9e9e9e}
.asr .asr__urgent{display:inline-flex;align-items:center;gap:4px;height:25px;padding:0 8px 0 6px;border-radius:6px;background:#fdecef;color:#c2185b;font-size:13.5px;font-weight:700}
`;

export default AdminSpaceRealMock;
