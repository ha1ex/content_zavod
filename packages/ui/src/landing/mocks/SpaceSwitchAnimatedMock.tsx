'use client';

import { APP_CSS, APP_ICONS as M } from '../HeroScreenApp';

/**
 * SpaceSwitchAnimatedMock — анимированный мокап интерфейса Кайтена по сценарию
 * ролика kaiten.ru (Dop2_Fin_2_4): курсор идет по «Дереву» пространств слева и
 * по очереди открывает три пространства, а рабочая область каждый раз сменяется
 * на доски этого пространства. Три сцены по 4 секунды, цикл 12 секунд.
 *
 * Интерфейс — тот же, что на первом экране (HsiApp): те же стили `.hsi .app`,
 * шапка, колонки иконок, «Дерево», панель видов и карточки. Здесь добавлены
 * только дерево пространств, курсор и смена сцен. Уважает prefers-reduced-motion.
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

/* ─── данные сцен: три пространства из ролика ─────────────────────────── */
type Card = {
  title: string;
  tag?: { label: string; tone: 'peach' | 'lime' | 'pink' | 'sky' | 'prod' };
  check?: string;
  due?: string;
  dueTone?: 'red';
  icon?: 'dot' | 'doc' | 'chart' | 'bug';
  accent?: string;
  avatars?: string[];
};
type Column = { name: string; count: number; done?: boolean; cards: Card[] };
type Board = { name: string; columns: Column[] };
type Scene = { space: string; boards: Board[] };

const G = '#66bb6a';
const B = '#1976d2';
const Y = '#ffca28';
const P = '#ffcdd2';
const R = '#e53935';

const SCENES: Scene[] = [
  {
    space: 'Разработка',
    boards: [
      {
        name: 'Sprint',
        columns: [
          {
            name: 'Бэклог спринта',
            count: 2,
            cards: [
              { title: 'Поиск по новостям', accent: B, icon: 'doc', check: '8 ч' },
              { title: 'Лента новостей', accent: B, icon: 'doc', check: '8 ч' },
            ],
          },
          {
            name: 'В работе',
            count: 1,
            cards: [
              {
                title: 'Кабинет редактора',
                accent: Y,
                icon: 'chart',
                tag: { label: 'Важно', tone: 'sky' },
                check: 'Чек-лист 0/3',
                due: '07.11.2023',
                dueTone: 'red',
                avatars: ['#a5d4d9'],
              },
            ],
          },
          {
            name: 'На проверке',
            count: 1,
            cards: [{ title: 'Рассылка дайджеста', accent: B, icon: 'doc', check: '4 ч' }],
          },
          { name: 'Готово', count: 0, done: true, cards: [] },
        ],
      },
      {
        name: 'Устранение багов',
        columns: [
          {
            name: 'Очередь',
            count: 1,
            cards: [
              {
                title: 'В приложении iOS не прогружаются картинки к материалам',
                accent: R,
                icon: 'bug',
                tag: { label: 'iOS', tone: 'lime' },
                check: 'Анализ задачи 2/6',
                avatars: ['#c5cae9'],
              },
            ],
          },
          {
            name: 'В работе',
            count: 1,
            cards: [{ title: 'Не приходят уведомления об ошибках', accent: R, icon: 'bug', avatars: ['#f6c453'] }],
          },
          {
            name: 'Тестирование',
            count: 1,
            cards: [{ title: 'Поиск не находит архивные материалы', accent: Y, icon: 'bug', avatars: ['#9fd3cf'] }],
          },
          { name: 'Готово', count: 0, done: true, cards: [] },
        ],
      },
      {
        name: 'Релизы',
        columns: [
          {
            name: 'Очередь',
            count: 1,
            cards: [{ title: 'Собрать релиз 2.14 для Android', accent: B, icon: 'doc', check: '4 ч' }],
          },
          {
            name: 'В работе',
            count: 1,
            cards: [
              {
                title: 'Регресс перед выкаткой',
                accent: Y,
                icon: 'chart',
                tag: { label: 'QA', tone: 'peach' },
                avatars: ['#c5cae9'],
              },
            ],
          },
          {
            name: 'Тестирование',
            count: 1,
            cards: [{ title: 'Проверка миграций базы', accent: Y, icon: 'bug', avatars: ['#9fd3cf'] }],
          },
          { name: 'Готово', count: 0, done: true, cards: [] },
        ],
      },
    ],
  },
  {
    space: 'HR-отдел (пример)',
    boards: [
      {
        name: 'Поиск новых сотрудников',
        columns: [
          {
            name: 'Очередь',
            count: 3,
            cards: [
              { title: 'Аналитик в отдел маркетинга', accent: G },
              { title: 'Юрист', accent: G },
              { title: 'Директор по закупкам', accent: G },
            ],
          },
          { name: 'Получили резюме', count: 0, cards: [] },
          { name: 'Собеседование 1 этап', count: 1, cards: [{ title: 'Email-маркетолог', accent: B }] },
          { name: 'Собеседование 2 этап', count: 0, cards: [] },
        ],
      },
      {
        name: 'Трудоустройство',
        columns: [
          {
            name: 'Очередь',
            count: 1,
            cards: [{ title: 'Анисимов В.Г. (SEO)', accent: P, tag: { label: 'Маркетинг', tone: 'pink' } }],
          },
          {
            name: 'В работе',
            count: 1,
            cards: [
              {
                title: 'Кривова А.Н. (офис-менеджер)',
                accent: Y,
                tag: { label: 'Бэк-офис', tone: 'peach' },
                check: 'Оформление 1/3',
                avatars: ['#a5d4d9'],
              },
            ],
          },
          {
            name: 'Документы',
            count: 1,
            cards: [{ title: 'Седов П.А. (аналитик)', accent: B, tag: { label: 'Аналитика', tone: 'sky' } }],
          },
          { name: 'Сотрудник оформлен', count: 0, done: true, cards: [] },
        ],
      },
      {
        name: 'Адаптация новичков',
        columns: [
          {
            name: 'Очередь',
            count: 1,
            cards: [{ title: 'Ковалев Д.С. (поддержка)', accent: P, tag: { label: 'Поддержка', tone: 'pink' } }],
          },
          {
            name: 'В работе',
            count: 1,
            cards: [
              {
                title: 'Титова Е.А. (дизайнер)',
                accent: Y,
                tag: { label: 'Дизайн', tone: 'peach' },
                check: 'План на месяц 2/5',
                avatars: ['#c5cae9'],
              },
            ],
          },
          {
            name: 'Наставник назначен',
            count: 1,
            cards: [{ title: 'Орлов И.П. (продажи)', accent: B, tag: { label: 'Продажи', tone: 'sky' }, avatars: ['#9fd3cf'] }],
          },
          { name: 'Готово', count: 0, done: true, cards: [] },
        ],
      },
    ],
  },
  {
    space: 'SMM',
    boards: [
      {
        name: 'Проект «Косметология»',
        columns: [
          {
            name: 'Очередь',
            count: 1,
            cards: [{ title: 'Провести анализ конкурентов', accent: P, icon: 'dot', avatars: ['#f6c453'] }],
          },
          {
            name: 'В работе',
            count: 1,
            cards: [{ title: 'Добавить форму с автоответом', accent: P, icon: 'dot', avatars: ['#c5cae9'] }],
          },
          {
            name: 'На согласовании',
            count: 1,
            cards: [{ title: 'Согласовать контент-план', accent: Y, icon: 'dot', avatars: ['#c5cae9'] }],
          },
          {
            name: 'Готово',
            count: 1,
            done: true,
            cards: [{ title: 'Заменить обложку ВК', accent: G, icon: 'dot', avatars: ['#a5d4d9'] }],
          },
        ],
      },
      {
        name: 'Проект «Онлайн-школа»',
        columns: [
          {
            name: 'Очередь',
            count: 1,
            cards: [{ title: 'Собрать базу для таргета', accent: B, icon: 'doc', avatars: ['#9fd3cf'] }],
          },
          {
            name: 'В работе',
            count: 1,
            cards: [{ title: 'Презентация нового курса', accent: Y, icon: 'chart', avatars: ['#f6c453'] }],
          },
          {
            name: 'На согласовании',
            count: 1,
            cards: [{ title: 'Тексты для рассылки', accent: P, icon: 'doc', avatars: ['#a5d4d9'] }],
          },
          { name: 'Готово', count: 0, done: true, cards: [] },
        ],
      },
      {
        name: 'Блог и рассылки',
        columns: [
          {
            name: 'Очередь',
            count: 1,
            cards: [{ title: 'План статей на квартал', accent: B, icon: 'doc', avatars: ['#c5cae9'] }],
          },
          {
            name: 'В работе',
            count: 1,
            cards: [{ title: 'Статья про кейс клиента', accent: Y, icon: 'chart', avatars: ['#f6c453'] }],
          },
          {
            name: 'На согласовании',
            count: 1,
            cards: [{ title: 'Дайджест за декабрь', accent: P, icon: 'dot', avatars: ['#9fd3cf'] }],
          },
          { name: 'Готово', count: 0, done: true, cards: [] },
        ],
      },
    ],
  },
];

/** «Дерево» пространств: три пункта-цели открываются по очереди. */
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
  'Первое пространство',
  'SMM',
  'Портфель проектов',
  'Производство',
  'Управление проектами',
];
/** Индексы пунктов, на которые наводится курсор (по сценам). */
const T1 = 2;
const T2 = 6;
const T3 = 10;
/** Шаг пункта дерева и верх списка — как в интерфейсе первого экрана. */
const STEP = 44;
const LIST_TOP = 142;

/* ─── значки карточек в стиле Twemoji, как на первом экране ───────────── */
const TwDoc = () => (
  <svg width="24" height="24" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M32 6H8a3 3 0 0 0-3 3v21a3 3 0 0 1-3-3V13H1v14a4 4 0 0 0 4 4h26a4 4 0 0 0 4-4V9a3 3 0 0 0-3-3z" fill="#99AAB5" />
    <path d="M6 9a3 3 0 0 1 3-3h22a3 3 0 0 1 3 3v18a4 4 0 0 1-4 4H5V9z" fill="#CCD6DD" />
    <path d="M9 10h9v8H9z" fill="#55ACEE" />
    <path d="M20 10h10v2H20zm0 4h10v2H20zM9 20h21v2H9zm0 4h21v2H9z" fill="#99AAB5" />
  </svg>
);
const TwChart = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4z" fill="#CCD6DD" />
    <path d="M5 5h26v26H5z" fill="#E1E8ED" />
    <path d="M8 18h5v11H8z" fill="#5C913B" />
    <path d="M16 9h5v20h-5z" fill="#3B88C3" />
    <path d="M24 14h5v15h-5z" fill="#DD2E44" />
  </svg>
);
const TwBug = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <ellipse cx="18" cy="21" rx="9" ry="11" fill="#DD2E44" />
    <path d="M18 10c3 0 5 2 5 4H13c0-2 2-4 5-4z" fill="#292F33" />
    <circle cx="14.5" cy="18" r="1.6" fill="#292F33" />
    <circle cx="21.5" cy="18" r="1.6" fill="#292F33" />
    <path d="M9 14 4 11m23 3 5-3M9 22H3m30 0h-6M10 29l-4 3m20-3 4 3" stroke="#292F33" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

function CardView({ card }: { card: Card }) {
  return (
    <div className="app__card">
      {card.accent && <span className="app__accent" style={{ background: card.accent }} />}
      <div className="app__ct-row">
        <div className="app__ct">{card.title}</div>
        {card.icon && (
          <span className="app__ti">
            {card.icon === 'dot' ? (
              <span className="app__dot" />
            ) : card.icon === 'doc' ? (
              <TwDoc />
            ) : card.icon === 'chart' ? (
              <TwChart />
            ) : (
              <TwBug />
            )}
          </span>
        )}
      </div>
      {card.tag && (
        <div className="app__tags">
          <span className={`app__tag g-${card.tag.tone}`}>{card.tag.label}</span>
        </div>
      )}
      {card.check && <div className="app__meta"><span>{card.check}</span></div>}
      {(card.avatars || card.due) && (
        <div className="app__foot">
          <span className="app__avs">
            {card.avatars?.map((c, i) => (
              <span className="app__av" style={{ background: c }} key={i}>
                <svg viewBox="0 0 28 28" aria-hidden="true">
                  <path d="M5 28c1-5.2 4.6-8 9-8s8 2.8 9 8z" fill="#fff" opacity=".85" />
                  <circle cx="14" cy="12" r="5.2" fill="#f3c9a8" />
                  <path d="M8.6 11.6C8.6 7.9 11 6 14 6s5.4 1.9 5.4 5.6c-1.3-1.8-3.4-2.7-5.4-2.7s-4.1.9-5.4 2.7z" fill="#5d4037" />
                </svg>
              </span>
            ))}
          </span>
          {card.due && (
            <span className={card.dueTone ? `app__due app__due--${card.dueTone}` : 'app__due'}>
              <I d={M.event} size={17} />
              {card.due}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function BoardView({ board }: { board: Board }) {
  return (
    <section className="app__board ssw__board">
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

export function SpaceSwitchAnimatedMock() {
  const views = [M.kanbanO, M.grid, M.sort, M.calendarO, M.sync, M.folderO];
  return (
    <div className="hsi hsi--app ssw" aria-hidden="true" style={{ zoom: 1 }}>
      <style dangerouslySetInnerHTML={{ __html: APP_CSS + SSW_CSS }} />
      <div className="app">
        <header className="app__top">
          <span className="app__logo"><KaitenMark />Kaiten</span>
          <span className="app__space"><I d={M.spaceDashboard} size={24} />Пространства команды</span>
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
            <span className="app__rail-it is-active"><I d={M.accountTree} size={26} /></span>
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
            <div className="app__tree-list ssw__list">
              {/* подсветка открытого пространства переезжает между пунктами */}
              <span className="ssw__hover" />
              <span className="ssw__active" />
              {TREE.map((label, i) => (
                <div className="app__tree-it" key={label + i}>
                  <span className="app__tree-ic"><I d={M.spaceDashboard} size={22} /></span>
                  <span className="app__tree-lbl">{label}</span>
                </div>
              ))}
            </div>
            {/* курсор идет по дереву и «нажимает» пункты */}
            <span className="ssw__cursor">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" stroke="#2d2d2d" strokeWidth={1.4} strokeLinejoin="round">
                <path d="M5 3l14 8.5-6.2 1.3 3.2 6-2.6 1.3-3.1-6L5 18.6z" />
              </svg>
            </span>
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
              <div className="app__area ssw__area">
                {SCENES.map((scene, i) => (
                  <div className={`ssw__scene ssw__scene--${i + 1}`} key={scene.space}>
                    {scene.boards.map((b) => (
                      <BoardView board={b} key={b.name} />
                    ))}
                  </div>
                ))}
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

const SSW_CSS = `
.hsi.hsi--app.ssw{zoom:1}
.ssw .app__tree-list{position:relative}
/* строки поверх подсветки, иначе плашка перекрывает название */
.ssw .app__tree-list .app__tree-it{position:relative;z-index:1}
/* подсветка открытого пространства */
/* серая плашка наведения: едет за курсором по тем же кадрам */
.ssw .ssw__hover{position:absolute;left:0;right:8px;top:0;height:${STEP}px;border-radius:6px;background:#dde1e1;
  animation:sswHover 11s steps(1,end) infinite}
@keyframes sswHover{
  0%{transform:translateY(${T1 * STEP}px)}
  14.1%{transform:translateY(${3 * STEP}px)}
  16.3%{transform:translateY(${4 * STEP}px)}
  18.1%{transform:translateY(${5 * STEP}px)}
  20.3%{transform:translateY(${T2 * STEP}px)}
  41.1%{transform:translateY(${7 * STEP}px)}
  43.3%{transform:translateY(${8 * STEP}px)}
  45.1%{transform:translateY(${9 * STEP}px)}
  47.3%,100%{transform:translateY(${T3 * STEP}px)}
}
.ssw .ssw__active{position:absolute;left:0;right:8px;top:0;height:${STEP}px;border-radius:6px;background:#e1d7e7;
  animation:sswActive 11s steps(1,end) infinite}
@keyframes sswActive{
  0%{transform:translateY(${T1 * STEP}px)}
  27.3%{transform:translateY(${T2 * STEP}px)}
  54.5%,100%{transform:translateY(${T3 * STEP}px)}
}
/* курсор */
.ssw .ssw__cursor{position:absolute;left:190px;top:${LIST_TOP}px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.25));z-index:3;
  animation:sswCursor 11s ease-in-out infinite}
@keyframes sswCursor{
  0%,11.5%{transform:translateY(${T1 * STEP}px) scale(1)}
  22.9%{transform:translateY(${T2 * STEP}px) scale(1)}
  24.5%,25.8%{transform:translateY(${T2 * STEP}px) scale(.82)}
  27.3%,38.5%{transform:translateY(${T2 * STEP}px) scale(1)}
  49.9%{transform:translateY(${T3 * STEP}px) scale(1)}
  51.5%,52.8%{transform:translateY(${T3 * STEP}px) scale(.82)}
  54.5%,100%{transform:translateY(${T3 * STEP}px) scale(1)}
}
/* сцены: доски пространства сменяют друг друга */
.ssw .ssw__area{position:relative}
.ssw .ssw__scene{position:absolute;left:9px;right:9px;top:8px;display:flex;flex-direction:column;gap:14px;opacity:0;
  animation-duration:11s;animation-timing-function:ease-in-out;animation-iteration-count:infinite}
.ssw .ssw__scene--1{animation-name:sswScene1}
.ssw .ssw__scene--2{animation-name:sswScene2}
.ssw .ssw__scene--3{animation-name:sswScene3}
@keyframes sswScene1{0%,25.3%{opacity:1}27.3%,100%{opacity:0}}
@keyframes sswScene2{0%,25.3%{opacity:0}27.3%,52.5%{opacity:1}54.5%,100%{opacity:0}}
/* третья сцена держится последние 2 секунды — пауза перед перезапуском */
@keyframes sswScene3{0%,52.5%{opacity:0}54.5%,100%{opacity:1}}
/* доска в сцене: высота по содержимому, а не во всю область */
.ssw .ssw__board{height:auto;border-bottom:1px solid #e4e7ec;border-radius:8px}
.ssw .ssw__board .app__cols{padding-bottom:16px}
@media(prefers-reduced-motion:reduce){
  .ssw .ssw__active,.ssw .ssw__cursor,.ssw .ssw__scene,.ssw .ssw__hover{animation:none}
  .ssw .ssw__hover{display:none}
  .ssw .ssw__active{transform:translateY(${T1 * STEP}px)}
  .ssw .ssw__cursor{transform:translateY(${T1 * STEP}px)}
  .ssw .ssw__scene--1{opacity:1}
}
`;

export default SpaceSwitchAnimatedMock;
