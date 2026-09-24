'use client';

import { APP_CSS, APP_ICONS as M } from '../HeroScreenApp';

/**
 * SpaceBoardsExpandAnimatedMock — анимированный мокап интерфейса Кайтена по
 * ролику kaiten.ru (Dop2_Fin_2_3): на одном пространстве «Маркетинг» лежат
 * шесть досок, свернутых в полоски со счетчиком карточек. Курсор по очереди
 * раскрывает нужные доски — под полоской разворачиваются колонки с карточками,
 * а лишняя доска сворачивается обратно. Цикл 12 секунд.
 *
 * Интерфейс — тот же, что на первом экране (те же стили `.hsi .app`): шапка,
 * колонки иконок, панель видов, карточки. Уважает prefers-reduced-motion.
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
const Gift = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M3 15h30v18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" fill="#DD2E44" />
    <path d="M1 9h34v7H1z" fill="#EA596E" />
    <path d="M15 9h6v27h-6z" fill="#FFCC4D" />
  </svg>
);
const Rocket = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M18 2c6 4 9 10 9 17l-4 6H13l-4-6c0-7 3-13 9-17z" fill="#DD2E44" />
    <circle cx="18" cy="14" r="4" fill="#E1E8ED" />
    <path d="M13 25l-4 7 7-3zm10 0l4 7-7-3z" fill="#F4900C" />
  </svg>
);
const Spark = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M18 1l3.4 9.6L31 7l-3.6 9.6L37 20l-9.6 3.4L31 33l-9.6-3.6L18 39l-3.4-9.6L5 33l3.6-9.6L-1 20l9.6-3.4L5 7l9.6 3.4z" fill="#DD2E44" transform="scale(.86) translate(3 2)" />
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
const ICONS = { gift: Gift, rocket: Rocket, spark: Spark, briefcase: Briefcase, doc: Doc } as const;

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
  'Главная Кайтен',
  'Дизайн',
  'Разработка',
  'Маркетинг',
  'Маркетинг: текущие задачи',
  'Новое пространство',
  'HR-отдел (пример)',
  'Онбординг',
  'Отдел продаж',
  'SMM',
  'Портфель проектов',
  'Производство',
];

type Card = {
  title: string;
  icon?: keyof typeof ICONS;
  accent?: string;
  tag?: { label: string; tone: 'sky' | 'peach' | 'lime' | 'pink' };
  check?: string;
  links?: string;
  due?: string;
  dueTone?: 'red' | 'green';
  avatars?: string[];
};
type Column = { name: string; count: number; done?: boolean; cards: Card[] };
type Board = {
  /** ключ для CSS-анимации раскрытия */
  key: string;
  name: string;
  count: string;
  /** высота раскрытой части в дизайн-пикселях */
  bodyHeight: number;
  lane?: string;
  columns: Column[];
};

const V = '#7d4ccf';
const B = '#1976d2';
const Y = '#ffca28';
const G = '#66bb6a';
const R = '#e53935';

const BOARDS: Board[] = [
  {
    key: 'goals',
    name: 'Цели: 4 квартал',
    count: '6 карточек',
    bodyHeight: 318,
    columns: [
      {
        name: 'Очередь',
        count: 2,
        cards: [
          {
            title: 'Провести новогоднюю акцию',
            icon: 'gift',
            accent: V,
            check: 'Чек-лист 0/4',
            due: '30.11.2022',
            dueTone: 'red',
          },
          { title: 'Коллаборация с онлайн-школой', accent: V, check: 'Чек-лист 1/3' },
        ],
      },
      {
        name: 'В работе',
        count: 2,
        cards: [
          { title: 'Запуск нового продукта', icon: 'rocket', accent: Y, check: 'Чек-лист 1/3', avatars: ['#c5cae9'] },
          {
            title: 'Выйти в ТОП-5 в рейтинге поисковых запросов',
            accent: Y,
            check: 'Чек-лист 0/4',
            avatars: ['#f6c453'],
          },
        ],
      },
      {
        name: 'На согласовании',
        count: 1,
        cards: [{ title: 'Бюджет на промоакции', accent: B, check: 'Чек-лист 2/2', avatars: ['#c5cae9'] }],
      },
      {
        name: 'Готово',
        count: 2,
        done: true,
        cards: [
          { title: 'Офлайн-конференция', accent: G, avatars: ['#a5d4d9'] },
          { title: 'Перенос коммуникаций в соцсетях в ВК', accent: G, avatars: ['#9fd3cf'] },
        ],
      },
    ],
  },
  {
    key: 'tasks',
    name: 'Маркетинг: текущие задачи',
    count: '11 карточек',
    bodyHeight: 424,
    lane: 'Срочно / к точной дате',
    columns: [
      {
        name: 'Очередь',
        count: 4,
        cards: [
          { title: 'Маркетинговая кампания нового продукта', icon: 'briefcase', accent: V },
          { title: 'Анализ результатов акции прошлого года', accent: V, due: '19 янв', avatars: ['#c5cae9'] },
          { title: 'Отчет по неделе', accent: B, due: '20 янв' },
        ],
      },
      {
        name: 'В работе',
        count: 1,
        cards: [
          {
            title: 'Тест гипотезы про развлекательный контент',
            accent: Y,
            links: '2',
            due: '2 февр',
            avatars: ['#f6c453'],
          },
        ],
      },
      {
        name: 'У подрядчиков',
        count: 4,
        cards: [
          { title: 'Тест гипотезы с рекламой в Директе', icon: 'spark', accent: R, due: '3 февр', avatars: ['#a5d4d9'] },
          {
            title: 'SEO адаптация описания нового продукта',
            accent: B,
            tag: { label: 'Важно', tone: 'sky' },
            check: 'Подготовка к работе 2/4',
            due: '20 янв',
            avatars: ['#c5cae9', '#f6c453'],
          },
        ],
      },
      {
        name: 'Готово',
        count: 11,
        done: true,
        cards: [
          { title: 'Реклама через Яндекс-дзен — тест гипотезы и отчет', accent: G, avatars: ['#9fd3cf'] },
          {
            title: 'Оформить посадочную демо-страницу нового продукта',
            accent: G,
            due: '14.11.2022',
            dueTone: 'green',
            avatars: ['#a5d4d9'],
          },
        ],
      },
    ],
  },
  { key: 'ads', name: 'Таргет и реклама', count: '4 карточки', bodyHeight: 0, columns: [] },
  {
    key: 'content',
    name: 'Контент-отдел',
    count: '5 карточек',
    bodyHeight: 292,
    columns: [
      {
        name: 'Очередь',
        count: 2,
        cards: [
          { title: 'Нативный контент с блогерами для новогодней акции', accent: V },
          { title: 'Контент-поддержка партнерской программы в соцсетях', accent: V, avatars: ['#c5cae9'] },
        ],
      },
      {
        name: 'В работе',
        count: 2,
        cards: [
          {
            title: 'Контент-план на декабрь, включая освещение НГ акции',
            icon: 'doc',
            accent: Y,
            avatars: ['#f6c453'],
          },
          { title: 'Статья в блог про продукт', accent: Y, avatars: ['#a5d4d9'] },
        ],
      },
      {
        name: 'Согласование',
        count: 1,
        cards: [{ title: 'Контент-план для соцсетей', accent: B, avatars: ['#9fd3cf'] }],
      },
      { name: 'Готово', count: 0, done: true, cards: [] },
    ],
  },
  { key: 'seo', name: 'SEO', count: '4 карточки', bodyHeight: 0, columns: [] },
  { key: 'partners', name: 'Партнерства и коллабы', count: '3 карточки', bodyHeight: 0, columns: [] },
];

function CardView({ card }: { card: Card }) {
  const Icon = card.icon ? ICONS[card.icon] : null;
  return (
    <div className="app__card">
      {card.accent && <span className="app__accent" style={{ background: card.accent }} />}
      <div className="app__ct-row">
        <div className="app__ct">{card.title}</div>
        {Icon && <span className="app__ti"><Icon /></span>}
      </div>
      {card.tag && (
        <div className="app__tags">
          <span className={`app__tag g-${card.tag.tone}`}>{card.tag.label}</span>
        </div>
      )}
      {card.check && <div className="app__meta"><span>{card.check}</span></div>}
      {(card.avatars || card.due || card.links) && (
        <div className="app__foot">
          <span className="app__avs">
            {card.links && (
              <span className="sbe__links"><I d={M.schema} size={17} />{card.links}</span>
            )}
            {card.avatars?.map((c, i) => (
              <Avatar bg={c} key={i} />
            ))}
          </span>
          {card.due && (
            <span className={card.dueTone ? `app__due sbe__due--${card.dueTone}` : 'app__due'}>
              <I d={M.event} size={17} />
              {card.due}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function SpaceBoardsExpandAnimatedMock() {
  const views = [M.kanbanO, M.grid, M.sort, M.calendarO, M.sync, M.folderO];
  return (
    <div className="hsi hsi--app sbe" aria-hidden="true" style={{ zoom: 1 }}>
      <style dangerouslySetInnerHTML={{ __html: APP_CSS + SBE_CSS }} />
      <div className="app">
        <header className="app__top">
          <span className="app__logo"><KaitenMark />Kaiten</span>
          <span className="app__space"><I d={M.spaceDashboard} size={24} />Маркетинг</span>
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
                <div className={i === 3 ? 'app__tree-it is-active' : 'app__tree-it'} key={label + i}>
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
              <div className="app__area sbe__area">
                {BOARDS.map((b) => (
                  <section className={`app__board sbe__board sbe__board--${b.key}`} key={b.key}>
                    <div className="sbe__hd">
                      <span className="app__grip"><i /><i /><i /><i /><i /><i /></span>
                      <span className="sbe__nm">{b.name}</span>
                      <span className="sbe__cnt">{b.count}</span>
                      <I d={M.expandLess} size={22} className="sbe__chev" />
                    </div>
                    {b.columns.length > 0 && (
                      <div className="sbe__body" style={{ ['--h' as string]: `${b.bodyHeight}px` }}>
                        {b.lane && <div className="sbe__lane">{b.lane}</div>}
                        <div className="app__cols sbe__cols">
                          {b.columns.map((col) => (
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
                      </div>
                    )}
                  </section>
                ))}
              </div>
              <nav className="app__rail app__rail--r">
                {[M.peopleO, M.avTimer, M.history, M.filterNone, M.brightnessAutoO, M.block, M.camera, M.shareO, M.schema].map((d, i) => (
                  <span className="app__rail-it" key={i}><I d={d} size={24} /></span>
                ))}
              </nav>
            </div>
          </div>

          {/* курсор: по очереди раскрывает доски */}
          <span className="sbe__cursor">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" stroke="#2d2d2d" strokeWidth="1.4" aria-hidden="true">
              <path d="M5 3l14 8.5-6.2 1.3 3.2 6-2.6 1.3-3.1-6L5 18.6z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

const SBE_CSS = `
.hsi.hsi--app.sbe{zoom:1}
/* «Дерево» скрыто: доски занимают всю ширину, как в ролике */
.sbe.hsi--app .app__tree{display:none}
.sbe.hsi--app .app__body{position:relative}
.sbe.hsi--app .sbe__area{display:flex;flex-direction:column;gap:8px;padding:8px 9px 12px}
/* полоска доски */
.sbe.hsi--app .sbe__board{height:auto;flex:none;border-radius:8px;overflow:hidden}
.sbe .sbe__hd{display:flex;align-items:center;gap:12px;height:48px;padding:0 20px 0 14px;background:#f4f4f6;border:1px solid #e4e7ec;border-radius:8px}
.sbe .sbe__nm{font-size:19px;font-weight:500;color:#212121}
.sbe .sbe__cnt{margin-left:auto;padding:3px 10px;border-radius:5px;background:#dfe1e5;font-size:15px;color:#5f6368;letter-spacing:.2px}
.sbe .sbe__chev{color:#6c6e6e;transform:rotate(180deg)}
/* раскрытая часть: высота идет от 0 к --h */
.sbe .sbe__body{height:0;overflow:hidden;border:1px solid #e4e7ec;border-top:0;border-radius:0 0 8px 8px;background:#f8f9fb}
.sbe .sbe__lane{display:flex;align-items:center;height:34px;padding:0 20px 0 23px;font-size:16px;color:#616161;border-bottom:1px solid #eceff1}
.sbe.hsi--app .sbe__cols{padding-top:6px}
.sbe.hsi--app .sbe__board .app__card{gap:12px;min-height:104px;padding:13px 12px 15px}
.sbe .sbe__links{display:inline-flex;align-items:center;gap:4px;margin-right:6px;font-size:14px;color:#9e9e9e}
.sbe .sbe__due--red{height:25px;padding:0 7px 0 6px;border-radius:6px;background:#e57373;color:#fff;font-weight:700}
.sbe .sbe__due--green{height:25px;padding:0 7px 0 6px;border-radius:6px;background:#66bb6a;color:#fff;font-weight:700}

/* ─── сценарий: курсор раскрывает доски по очереди ─────────────────── */
.sbe .sbe__board--goals .sbe__body{animation:sbeGoals 14s ease-in-out infinite}
@keyframes sbeGoals{0%,17.143%{height:0}19.714%,38.571%{height:var(--h)}41.143%,85.714%{height:0}100%{height:0}}
.sbe .sbe__board--goals .sbe__chev{animation:sbeChevGoals 14s steps(1,end) infinite}
@keyframes sbeChevGoals{0%{transform:rotate(180deg)}17.143%{transform:rotate(0)}38.571%{transform:rotate(180deg)}100%{transform:rotate(180deg)}}

.sbe .sbe__board--tasks .sbe__body{animation:sbeTasks 14s ease-in-out infinite}
@keyframes sbeTasks{0%,38.571%{height:0}41.143%,61.714%{height:var(--h)}64.286%,85.714%{height:0}100%{height:0}}
.sbe .sbe__board--tasks .sbe__chev{animation:sbeChevTasks 14s steps(1,end) infinite}
@keyframes sbeChevTasks{0%{transform:rotate(180deg)}38.571%{transform:rotate(0)}61.714%{transform:rotate(180deg)}100%{transform:rotate(180deg)}}

.sbe .sbe__board--content .sbe__body{animation:sbeContent 14s ease-in-out infinite}
@keyframes sbeContent{0%,61.714%{height:0}64.286%,85.714%{height:var(--h)}100%{height:var(--h)}}
.sbe .sbe__board--content .sbe__chev{animation:sbeChevContent 14s steps(1,end) infinite}
@keyframes sbeChevContent{0%{transform:rotate(180deg)}61.714%{transform:rotate(0)}100%{transform:rotate(0)}}

/* курсор */
.sbe .sbe__cursor{position:absolute;left:0;top:0;z-index:22;filter:drop-shadow(0 2px 3px rgba(0,0,0,.25));
  animation:sbeCursor 14s ease-in-out infinite}
@keyframes sbeCursor{0%{transform:translate(940px,520px) scale(1)}14.571%,15.857%{transform:translate(1811px,86px) scale(1)}17.143%{transform:translate(1811px,86px) scale(.82)}18.429%{transform:translate(1811px,86px) scale(1)}36%,37.286%{transform:translate(1811px,460px) scale(1)}38.571%{transform:translate(1811px,460px) scale(.82)}39.857%{transform:translate(1811px,460px) scale(1)}59.143%,60.429%{transform:translate(1811px,678px) scale(1)}61.714%{transform:translate(1811px,678px) scale(.82)}63%,85.714%{transform:translate(1811px,678px) scale(1)}100%{transform:translate(1811px,678px) scale(1)}}
@media(prefers-reduced-motion:reduce){
  .sbe .sbe__body,.sbe .sbe__chev,.sbe .sbe__cursor{animation:none}
  .sbe .sbe__board--tasks .sbe__body{height:var(--h)}
  .sbe .sbe__board--tasks .sbe__chev{transform:rotate(0)}
  .sbe .sbe__cursor{transform:translate(1811px,414px)}
}
`;
