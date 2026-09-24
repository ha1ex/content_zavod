'use client';

import { APP_CSS, APP_ICONS as M } from '../HeroScreenApp';

/**
 * PortfolioNestedBoardsMock — «Все проекты в одной среде»: пространство, на
 * котором лежат сразу несколько досок проектов. Три доски свернуты в полоски
 * со счетчиком карточек, четвертая раскрыта — с колонками, подколонками и
 * лимитом WIP. Карточки показывают путь до родительского проекта, срок работ
 * и связанные задачи.
 *
 * Структура повторяет реальный интерфейс Кайтена, стили — те же `.hsi .app`,
 * что и на первом экране. Статичный мокап, дизайн-ширина 1920px.
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

/* ─── значки карточек в стиле Twemoji, как в остальных мокапах ────────── */
const Rocket = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M18 2c6 4 9 10 9 17l-4 6H13l-4-6c0-7 3-13 9-17z" fill="#DD2E44" />
    <circle cx="18" cy="14" r="4" fill="#E1E8ED" />
    <path d="M13 25l-4 7 7-3zm10 0l4 7-7-3z" fill="#F4900C" />
  </svg>
);
const Target = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <circle cx="18" cy="18" r="15" fill="#DD2E44" />
    <circle cx="18" cy="18" r="10" fill="#E1E8ED" />
    <circle cx="18" cy="18" r="5" fill="#DD2E44" />
  </svg>
);
const Chart = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4z" fill="#CCD6DD" />
    <path d="M5 5h26v26H5z" fill="#E1E8ED" />
    <path d="M8 18h5v11H8z" fill="#5C913B" /><path d="M16 9h5v20h-5z" fill="#3B88C3" /><path d="M24 14h5v15h-5z" fill="#DD2E44" />
  </svg>
);
const Doc = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M7 3h14l8 8v22a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="#E1E8ED" />
    <path d="M21 3l8 8h-8z" fill="#AAB8C2" />
    <path d="M10 16h16v2H10zm0 5h16v2H10zm0 5h11v2H10z" fill="#8899A6" />
  </svg>
);
const Bulb = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M18 3c6 0 11 4.6 11 10.5 0 4.3-2.4 6.6-4 9-1 1.5-1.3 2.7-1.3 4.5H12.3c0-1.8-.3-3-1.3-4.5-1.6-2.4-4-4.7-4-9C7 7.6 12 3 18 3z" fill="#FFCC4D" />
    <path d="M12.5 29h11v2.5a2.5 2.5 0 0 1-2.5 2.5h-6a2.5 2.5 0 0 1-2.5-2.5z" fill="#9AAAB4" />
  </svg>
);
const Flag = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M8 3h2v30H8z" fill="#66757F" />
    <path d="M10 5h20l-4 6 4 6H10z" fill="#FFAC33" />
  </svg>
);
const ICONS = { rocket: Rocket, target: Target, chart: Chart, doc: Doc, bulb: Bulb, flag: Flag } as const;

const Avatar = ({ bg }: { bg: string }) => (
  <span className="app__av" style={{ background: bg }}>
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path d="M5 28c1-5.2 4.6-8 9-8s8 2.8 9 8z" fill="#fff" opacity=".85" />
      <circle cx="14" cy="12" r="5.2" fill="#f3c9a8" />
      <path d="M8.6 11.6C8.6 7.9 11 6 14 6s5.4 1.9 5.4 5.6c-1.3-1.8-3.4-2.7-5.4-2.7s-4.1.9-5.4 2.7z" fill="#5d4037" />
    </svg>
  </span>
);

/* ─── данные ──────────────────────────────────────────────────────────── */
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
  'Портфель проектов',
  'Управление проектами',
];

/** Свернутые доски: только название и счетчик карточек. */
const COLLAPSED = [
  { name: 'Проект «Альфа»', count: '10 карточек' },
  { name: 'Проект «Бета»', count: '10 карточек' },
  { name: 'Проект «Сигма»', count: '9 карточек' },
];

type Card = {
  parent: [string, string];
  title: string;
  icon: keyof typeof ICONS;
  accent: string;
  period: string;
  links?: string;
  value?: string;
  warn?: boolean;
  avatars?: string[];
};
/** Колонка: либо обычная, либо родительская с подколонками. */
type Column = { name: string; count?: string; wip?: string; done?: boolean; cards: Card[] };
type Group = { name: string; count?: string; wip?: string; done?: boolean; columns: Column[] };

const G = '#66bb6a';
const V = '#7d4ccf';
const B = '#1976d2';
const Y = '#ffca28';

const P: [string, string] = ['Портфель проектов', 'Проект «Омега»'];

const GROUPS: Group[] = [
  {
    name: 'Очередь',
    count: '3',
    columns: [
      {
        name: 'Очередь',
        cards: [
          {
            parent: P,
            title: 'Анализ рынка и конкурентов',
            icon: 'chart',
            accent: G,
            period: '16.09.2024 – 20.09.2024',
            links: '4',
            avatars: ['#c5cae9'],
          },
          {
            parent: P,
            title: 'Требования к первой версии',
            icon: 'doc',
            accent: G,
            period: '16.09.2024 – 27.09.2024',
            links: '2',
            avatars: ['#a5d4d9'],
          },
          {
            parent: P,
            title: 'Веха: утверждение бюджета',
            icon: 'flag',
            accent: B,
            period: '23.09.2024 – 30.09.2024',
            links: '1',
            value: '11 100 000',
            warn: true,
          },
        ],
      },
    ],
  },
  {
    name: 'Анализ',
    count: '1',
    columns: [
      {
        name: 'Анализ',
        cards: [
          {
            parent: P,
            title: 'Оценка трудозатрат по этапам',
            icon: 'chart',
            accent: G,
            period: '02.09.2024 – 13.09.2024',
            links: '3',
            avatars: ['#f6c453'],
          },
        ],
      },
    ],
  },
  {
    name: 'Готово к работе',
    count: '2',
    done: true,
    columns: [
      {
        name: 'Готово к работе',
        done: true,
        cards: [
          {
            parent: P,
            title: 'Схема интеграций с 1С',
            icon: 'doc',
            accent: G,
            period: '05.08.2024 – 23.08.2024',
            links: '5',
            avatars: ['#9fd3cf'],
          },
          {
            parent: P,
            title: 'План перехода на новый процесс',
            icon: 'bulb',
            accent: G,
            period: '26.08.2024 – 30.08.2024',
            links: '2',
            avatars: ['#c5cae9', '#f6c453'],
          },
        ],
      },
    ],
  },
  {
    name: 'В работе',
    wip: '2/2',
    columns: [
      {
        name: 'В работе',
        cards: [
          {
            parent: P,
            title: 'Настройка отчетности для дирекции',
            icon: 'target',
            accent: Y,
            period: '22.07.2024 – 02.08.2024',
            links: '6',
            avatars: ['#a5d4d9'],
          },
          {
            parent: P,
            title: 'Обучение региональных команд',
            icon: 'rocket',
            accent: Y,
            period: '22.07.2024 – 02.08.2024',
            links: '3',
            avatars: ['#f6c453', '#c5cae9'],
          },
        ],
      },
    ],
  },
  { name: 'Готово', done: true, columns: [{ name: 'Готово', done: true, cards: [] }] },
];

function CardView({ card }: { card: Card }) {
  const Icon = ICONS[card.icon];
  return (
    <div className="app__card pnb__card">
      {/* путь до родительской карточки: пространство → проект */}
      <div className="pnb__parent">
        <span>{card.parent[0]}</span>
        <span>{card.parent[1]}</span>
      </div>
      <span className="app__accent" style={{ background: card.accent }} />
      <div className="app__ct-row">
        <div className="app__ct">{card.title}</div>
        <span className="app__ti"><Icon /></span>
      </div>
      <div className="pnb__meta">
        <span className="pnb__links">
          <I d={M.schema} size={18} />
          {card.links}
        </span>
        {card.warn && <span className="pnb__warn">!</span>}
        {card.avatars && (
          <span className="app__avs">
            {card.avatars.map((c, i) => (
              <Avatar bg={c} key={i} />
            ))}
          </span>
        )}
      </div>
      {card.value && <div className="pnb__value">{card.value}</div>}
      <div className="pnb__period">
        <I d={M.sort} size={16} />
        {card.period}
      </div>
    </div>
  );
}

export function PortfolioNestedBoardsMock() {
  const views = [M.kanbanO, M.grid, M.sort, M.calendarO, M.sync, M.folderO];
  return (
    <div className="hsi hsi--app pnb" aria-hidden="true" style={{ zoom: 1 }}>
      <style dangerouslySetInnerHTML={{ __html: APP_CSS + PNB_CSS }} />
      <div className="app">
        <header className="app__top">
          <span className="app__logo"><KaitenMark />Kaiten</span>
          <span className="app__space"><I d={M.spaceDashboard} size={24} />Портфель проектов</span>
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
              <div className="app__area pnb__area">
                {/* свернутые доски проектов */}
                {COLLAPSED.map((b) => (
                  <div className="pnb__folded" key={b.name}>
                    <span className="app__grip"><i /><i /><i /><i /><i /><i /></span>
                    <span className="pnb__folded-nm">{b.name}</span>
                    <I d={M.expandLess} size={22} className="app__bchev pnb__chev" />
                    <span className="pnb__folded-cnt">{b.count}</span>
                  </div>
                ))}

                {/* раскрытая доска с колонками и подколонками */}
                <section className="app__board pnb__board">
                  <div className="app__bhd">
                    <span className="app__grip"><i /><i /><i /><i /><i /><i /></span>
                    <span className="app__bnm">Проект «Омега»</span>
                    <I d={M.expandLess} size={24} className="app__bchev" />
                  </div>
                  <div className="pnb__groups">
                    {GROUPS.map((g) => (
                      <div className={g.columns.length > 1 ? 'pnb__group pnb__group--split' : 'pnb__group'} key={g.name}>
                        <div className="pnb__ghd">
                          {g.done && <I d={M.check} size={20} className="app__chk" />}
                          <span className="app__cnm">{g.name}</span>
                          {g.wip ? (
                            <span className="pnb__wip">{g.wip}</span>
                          ) : (
                            g.count && <span className="app__cnt">{g.count}</span>
                          )}
                        </div>
                        <div className="pnb__subs">
                          {g.columns.map((col) => (
                            <div className="pnb__sub" key={col.name}>
                              {g.columns.length > 1 && (
                                <div className="pnb__shd">
                                  {col.done && <I d={M.check} size={20} className="app__chk" />}
                                  <span className="app__cnm">{col.name}</span>
                                  {col.count && <span className="app__cnt">{col.count}</span>}
                                </div>
                              )}
                              <div className="app__cards pnb__cards">
                                {col.cards.map((c, i) => (
                                  <CardView card={c} key={i} />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
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

const PNB_CSS = `
.hsi.hsi--app.pnb{zoom:1}
/* «Дерево» скрыто: доски занимают всю ширину, как при свернутой панели */
.pnb.hsi--app .app__tree{display:none}
.pnb.hsi--app .pnb__area{display:flex;flex-direction:column;gap:9px;padding:8px 9px 12px}
/* свернутая доска: полоска с названием и счетчиком карточек */
.pnb .pnb__folded{flex:none;display:flex;align-items:center;gap:12px;height:56px;padding:0 20px 0 14px;
  background:#f4f4f6;border:1px solid #e4e7ec;border-radius:8px}
.pnb .pnb__folded-nm{font-size:19px;font-weight:500;color:#212121}
.pnb .pnb__chev{margin-left:auto;transform:rotate(180deg)}
.pnb .pnb__folded-cnt{padding:3px 10px;border-radius:5px;background:#dfe1e5;
  font-size:15px;color:#5f6368;letter-spacing:.2px}
/* раскрытая доска */
.pnb.hsi--app .pnb__board{flex:1 1 auto;height:auto;min-height:0;overflow:hidden;border-bottom:1px solid #e4e7ec;border-radius:8px}
.pnb .pnb__groups{display:flex;align-items:flex-start;padding:0 20px 20px 23px}
.pnb .pnb__group{flex:1 1 0;min-width:0;border-left:1px solid #dadbdc}
.pnb .pnb__group:first-child{border-left:0}
.pnb .pnb__group--split{flex:2 1 0}
.pnb .pnb__ghd,.pnb .pnb__shd{display:flex;align-items:center;gap:8px;height:38px;padding:0 12px}
.pnb .pnb__shd{border-left:1px solid #dadbdc}
.pnb .pnb__subs{display:flex;align-items:flex-start}
.pnb .pnb__sub{flex:1 1 0;min-width:0}
.pnb .pnb__group--split .pnb__sub:first-child .pnb__shd{border-left:0}
.pnb.hsi--app .pnb__cards{padding:0 12px}
/* лимит работ в колонке */
.pnb .pnb__wip{margin-left:auto;height:26px;min-width:44px;display:inline-flex;align-items:center;justify-content:center;
  padding:0 8px;border-radius:5px;background:#ff9800;color:#fff;font-size:15px;font-weight:700;letter-spacing:.2px}
/* карточка: путь до родителя, срок и связи */
.pnb.hsi--app .pnb__card{padding:0 0 14px;gap:0;overflow:hidden}
.pnb .pnb__parent{display:flex;flex-direction:column}
.pnb .pnb__parent span{padding:11px 14px;border-bottom:1px solid #e8e8eb;font-size:17px;color:#5f6368;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pnb.hsi--app .pnb__card .app__accent{width:60px;height:5px;margin:14px 0 0 14px}
.pnb.hsi--app .pnb__card .app__ct-row{padding:8px 14px 0}
.pnb.hsi--app .pnb__card .app__ct{font-size:19px;line-height:25px}
.pnb .pnb__meta{display:flex;align-items:center;gap:10px;padding:10px 14px 0}
.pnb .pnb__links{display:inline-flex;align-items:center;gap:5px;font-size:15px;color:#9e9e9e}
.pnb .pnb__links svg{color:#9e9e9e}
.pnb .pnb__warn{width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;
  border-radius:50%;background:#ffb300;color:#fff;font-size:15px;font-weight:700}
.pnb.hsi--app .pnb__meta .app__avs{margin-left:auto}
.pnb.hsi--app .pnb__card .app__av{width:32px;height:32px}
.pnb.hsi--app .pnb__card .app__av svg{width:32px;height:32px}
.pnb .pnb__value{margin:10px 14px 0;font-size:17px;font-weight:500;color:#212121}
.pnb .pnb__period{display:inline-flex;align-items:center;gap:6px;margin:12px 14px 0;padding:3px 10px;
  border:1px solid #e0e0e0;border-radius:14px;font-size:15px;color:#616161}
.pnb .pnb__period svg{color:#9e9e9e}
`;
