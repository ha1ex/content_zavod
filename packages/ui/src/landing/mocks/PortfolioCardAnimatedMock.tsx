'use client';

import { APP_CSS, APP_ICONS as M } from '../HeroScreenApp';

/**
 * PortfolioCardAnimatedMock — анимированный мокап по сценарию ролика kaiten.ru
 * (Dop3_Fin_2) на доске «Портфель проектов» с дорожками «Большие», «Средние»,
 * «Маленькие». Три действия по очереди:
 *   1) карточка «Проект Б» переезжает из «Реализации» в «Контроль»;
 *   2) у карточки «Проект А» открывается календарь и ставится срок 16 января;
 *   3) открывается окно карточки «Проект Б» с блоком «Блокировка».
 *
 * Интерфейс — тот же, что на первом экране (HsiApp): стили `.hsi .app`, шапка,
 * колонки иконок, «Дерево», панель видов. Цикл 18 секунд, уважает
 * prefers-reduced-motion.
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
  'Портфель проектов',
  'Управление проектами',
];

const COLUMNS = [
  { name: 'Идея', count: 4 },
  { name: 'Бюджетирование', count: 2 },
  { name: 'Реализация', count: 2 },
  { name: 'Контроль', count: 2 },
  { name: 'Проект закрыт', count: 0, done: true },
];

/** Портфель: коричневый акцент проекта. */
const ACCENT = '#8d6e63';
/** Значки проектов в стиле Twemoji — у каждой карточки свой. */
const Briefcase = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M4 12h28a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3z" fill="#C1694F" />
    <path d="M13 8h10a2 2 0 0 1 2 2v2h-3v-1H14v1h-3v-2a2 2 0 0 1 2-2z" fill="#8A4B38" />
    <path d="M1 20h34v4H1z" fill="#8A4B38" />
  </svg>
);
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
    <path d="M32 18c0-1-.1-2-.3-2.9l4-2.6-3.4-5.9-4.4 1.9c-1.4-1.3-3-2.3-4.8-3L22.5 1h-6.8l-.6 4.5c-1.8.6-3.4 1.6-4.8 3L5.9 6.6 2.5 12.5l4 2.6C6.3 16 6.2 17 6.2 18s.1 2 .3 2.9l-4 2.6 3.4 5.9 4.4-1.9c1.4 1.3 3 2.3 4.8 3l.6 4.5h6.8l.6-4.5c1.8-.6 3.4-1.6 4.8-3l4.4 1.9 3.4-5.9-4-2.6c.2-.9.3-1.9.3-2.9z" fill="#9AAAB4" />
    <circle cx="19" cy="18" r="6" fill="#66757F" />
  </svg>
);
const Box = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M2 11h32v21a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z" fill="#C1694F" />
    <path d="M1 4h34v8H1z" fill="#D99E82" />
    <path d="M15 4h6v31h-6z" fill="#A0522D" opacity=".5" />
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
const ICONS = { briefcase: Briefcase, rocket: Rocket, chart: ChartIcon, gear: Gear, box: Box, doc: Doc, cart: Cart, laptop: Laptop, target: Target, star: Star, book: Book, bulb: Bulb } as const;

/** Аватар участника: 11 разных сочетаний фона, тона кожи и причёски. */
type Av = { bg: string; skin: string; hair: string; cut: 'short' | 'long' | 'bun' | 'curly' | 'bald' | 'cap' };
const AVATARS: Av[] = [
  { bg: '#c5cae9', skin: '#f3c9a8', hair: '#5d4037', cut: 'short' },
  { bg: '#a5d4d9', skin: '#e8b48c', hair: '#2e2723', cut: 'long' },
  { bg: '#f6c453', skin: '#f7d7bb', hair: '#8d6e63', cut: 'bun' },
  { bg: '#9fd3cf', skin: '#d9a273', hair: '#3e2723', cut: 'curly' },
  { bg: '#ffab91', skin: '#f3c9a8', hair: '#455a64', cut: 'bald' },
  { bg: '#b39ddb', skin: '#e8b48c', hair: '#c62828', cut: 'cap' },
  { bg: '#90caf9', skin: '#f7d7bb', hair: '#fbc02d', cut: 'long' },
  { bg: '#a5d6a7', skin: '#c98c5a', hair: '#212121', cut: 'short' },
  { bg: '#f48fb1', skin: '#f3c9a8', hair: '#6d4c41', cut: 'curly' },
  { bg: '#ce93d8', skin: '#e8b48c', hair: '#37474f', cut: 'bun' },
  { bg: '#80cbc4', skin: '#d9a273', hair: '#4e342e', cut: 'cap' },
];

const Avatar = ({ i }: { i: number }) => {
  const a = AVATARS[i % AVATARS.length] as Av;
  return (
    <span className="app__av" style={{ background: a.bg }}>
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M5 28c1-5.2 4.6-8 9-8s8 2.8 9 8z" fill="#fff" opacity=".85" />
        <circle cx="14" cy="12" r="5.2" fill={a.skin} />
        {a.cut === 'short' && (
          <path d="M8.6 11.6C8.6 7.9 11 6 14 6s5.4 1.9 5.4 5.6c-1.3-1.8-3.4-2.7-5.4-2.7s-4.1.9-5.4 2.7z" fill={a.hair} />
        )}
        {a.cut === 'long' && (
          <path d="M8.3 11.4C8.3 7.7 10.8 5.8 14 5.8s5.7 1.9 5.7 5.6v6.4l-1.9-1.3v-4.3c-1.2-1.6-2.3-2.3-3.8-2.3s-2.6.7-3.8 2.3v4.3l-1.9 1.3z" fill={a.hair} />
        )}
        {a.cut === 'bun' && (
          <>
            <path d="M8.6 11.6C8.6 7.9 11 6 14 6s5.4 1.9 5.4 5.6c-1.3-1.8-3.4-2.7-5.4-2.7s-4.1.9-5.4 2.7z" fill={a.hair} />
            <circle cx="14" cy="4.4" r="2.2" fill={a.hair} />
          </>
        )}
        {a.cut === 'curly' && (
          <>
            <circle cx="10" cy="8.8" r="2.6" fill={a.hair} />
            <circle cx="14" cy="7.3" r="2.9" fill={a.hair} />
            <circle cx="18" cy="8.8" r="2.6" fill={a.hair} />
          </>
        )}
        {a.cut === 'bald' && (
          <path d="M9.4 9.7C10.2 7.7 11.9 6.9 14 6.9s3.8.8 4.6 2.8c-1.3-1-2.8-1.5-4.6-1.5s-3.3.5-4.6 1.5z" fill={a.hair} opacity=".5" />
        )}
        {a.cut === 'cap' && (
          <>
            <path d="M8.4 10C8.4 7 10.9 5.4 14 5.4s5.6 1.6 5.6 4.6z" fill={a.hair} />
            <path d="M19.2 9.2h3.6v1.7h-3.6z" fill={a.hair} />
          </>
        )}
      </svg>
    </span>
  );
};

function ProjectCard({ title, extra, icon = 'briefcase', av = 0, blocked, className }: { title: string; extra?: 'progress' | 'due'; icon?: keyof typeof ICONS; av?: number; blocked?: string; className?: string }) {
  const Icon = ICONS[icon];
  return (
    <div className={className ? `app__card pfc__card ${className}` : 'app__card pfc__card'}>
      {blocked && (
        <div className="app__blocker pfc__blocked">
          <span className="app__hand">✋</span>
          <span>{blocked}</span>
        </div>
      )}
      <span className="app__accent" style={{ background: ACCENT }} />
      <div className="app__ct-row">
        <div className="app__ct">{title}</div>
        <span className="app__ti"><Icon /></span>
      </div>
      {extra === 'progress' && (
        <div className="pfc__prog">
          <span>Бюджетирование</span>
          <span>1/2</span>
        </div>
      )}
      {extra === 'due' && <div className="app__meta"><span><I d={M.split} size={17} />0/5</span></div>}
      <div className="app__foot">
        <span className="app__avs">
          <Avatar i={av} />
        </span>
        {extra === 'due' && (
          <span className="app__due pfc__due"><I d={M.event} size={17} />16 янв.</span>
        )}
      </div>
    </div>
  );
}

/** Календарь срока: январь 2023, выбрано 16-е — как в ролике. */
function DuePopover() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <div className="pfc__pop">
      <div className="pfc__pop-row"><span className="pfc__box" />Срочно</div>
      <div className="pfc__cal-hd">
        <I d={M.chevronRight} size={22} className="pfc__cal-prev" />
        январь 2023
        <I d={M.chevronRight} size={22} />
      </div>
      <div className="pfc__cal-wd">{['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((d) => <span key={d}>{d}</span>)}</div>
      <div className="pfc__cal">
        {days.map((d) => (
          <span className={d === 16 ? 'is-sel' : d === 13 ? 'is-today' : ''} key={d}>{d}</span>
        ))}
      </div>
      <div className="pfc__pop-row"><span className="pfc__box" />Установить время</div>
      <div className="pfc__pop-row"><span className="pfc__box" />Не позднее</div>
      <div className="pfc__pop-row pfc__pop-row--muted"><I d={M.avTimer} size={20} />Напомнить<span className="pfc__link">Не напоминать</span></div>
      <div className="pfc__pop-actions"><span>Убрать дату</span><span className="pfc__link pfc__apply">Применить</span></div>
    </div>
  );
}

/** Окно карточки «Проект Б» с блоком «Блокировка». */
function CardWindow() {
  return (
    <div className="pfc__win">
      <I d={M.moreVert} size={22} className="pfc__win-x" />
      <div className="pfc__win-main">
        <div className="pfc__win-ttl">Проект Б</div>
        <div className="pfc__win-meta">
          <span className="pfc__link">#7145639</span> Заказчик <span className="pfc__link">Анна</span>, перемещена несколько секунд назад
        </div>
        <div className="pfc__win-tb">
          <span className="pfc__win-plus">+</span>
          <span className="pfc__win-btn">▶</span>
          <span className="pfc__win-btn">→ Проект закр…</span>
          <span className="pfc__win-btn pfc__win-btn--ic pfc__win-btn--block"><I d={M.block} size={18} /></span>
          <span className="pfc__win-btn pfc__win-btn--ic"><I d={M.shareO} size={18} /></span>
          <span className="pfc__win-btn pfc__win-btn--ic"><I d={M.moreVert} size={18} /></span>
        </div>
        <div className="pfc__block">
          <div className="pfc__block-ttl">Блокировка</div>
          <div className="pfc__block-text">
            <span className="pfc__block-typed">Не достаточно ресурсов</span>
            <i className="pfc__caret" />
          </div>
          <div className="pfc__block-foot">
            <span>+ ⋯</span>
            <span className="pfc__block-act"><I d={M.block} size={16} /> Сохранить</span>
          </div>
          <div className="pfc__block-add">Добавить карточку-блокер</div>
        </div>
        <div className="pfc__row"><span>Расположение</span><span className="pfc__link">Портфель проектов / Контроль (Большие)</span></div>
        <div className="pfc__row"><span>Тип</span><span className="pfc__pill"><Briefcase />Проект</span></div>
        <div className="pfc__row"><span>Участники</span><span className="pfc__pill">Ответственный</span></div>
        <div className="pfc__row"><span>Срок</span><span className="pfc__link">Установить срок</span></div>
        <div className="pfc__win-sec">Описание</div>
        <div className="pfc__win-desc">Введите текст описания задачи, чтобы сделать ее более понятной</div>
      </div>
      <div className="pfc__win-side">
        <div className="pfc__win-sec">Комментарии</div>
        <div className="pfc__win-cm">Напишите комментарий</div>
        <div className="pfc__win-empty">Комментариев пока нет</div>
      </div>
    </div>
  );
}

export function PortfolioCardAnimatedMock({ still = false }: { still?: boolean } = {}) {
  const views = [M.kanbanO, M.grid, M.sort, M.calendarO, M.sync, M.folderO];
  return (
    <div className={still ? 'hsi hsi--app pfc is-still' : 'hsi hsi--app pfc'} aria-hidden="true" style={{ zoom: 1 }}>
      <style dangerouslySetInnerHTML={{ __html: APP_CSS + PFC_CSS }} />
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
              <div className="app__area">
                <section className="app__board pfc__board">
                  <div className="app__bhd">
                    <span className="app__grip"><i /><i /><i /><i /><i /><i /></span>
                    <span className="app__bnm">Портфель проектов</span>
                    <I d={M.expandLess} size={24} className="app__bchev" />
                  </div>
                  <div className="pfc__chd">
                    {COLUMNS.map((c) => (
                      <div className="pfc__c" key={c.name}>
                        {c.done && <I d={M.check} size={20} className="app__chk" />}
                        <span className="app__cnm">{c.name}</span>
                        <span className="app__cnt">{c.count}</span>
                      </div>
                    ))}
                  </div>

                  {/* дорожка «Большие» */}
                  <div className="pfc__lane">
                    <div className="pfc__lane-hd"><span className="pfc__lane-nm">Большие</span><span className="app__cnt">3</span></div>
                    <div className="pfc__cols">
                      <div className="pfc__cell">
                        <ProjectCard title="Проект Д" icon="rocket" av={0} />
                        <ProjectCard title="Проект В" icon="box" av={1} />
                      </div>
                      <div className="pfc__cell"><ProjectCard title="Проект Г" extra="progress" icon="chart" av={2} /></div>
                      <div className="pfc__cell">
                        {/* карточка переезжает из «Реализации» в «Контроль» */}
                        <div className="pfc__move"><ProjectCard title="Проект Б" icon="briefcase" av={3} blocked="Не достаточно ресурсов" className="pfc__lift" /></div>
                      </div>
                      <div className="pfc__cell"><span className="pfc__drop" /></div>
                      <div className="pfc__cell" />
                    </div>
                  </div>

                  {/* дорожка «Средние» */}
                  <div className="pfc__lane">
                    <div className="pfc__lane-hd"><span className="pfc__lane-nm">Средние</span><span className="app__cnt">2</span></div>
                    <div className="pfc__cols">
                      <div className="pfc__cell"><ProjectCard title="Проект Е" icon="gear" av={4} /></div>
                      <div className="pfc__cell"><ProjectCard title="Проект Ж" icon="doc" extra="progress" av={5} /></div>
                      <div className="pfc__cell"><ProjectCard title="Проект З" icon="target" av={6} /></div>
                      <div className="pfc__cell"><ProjectCard title="Проект А" extra="due" icon="cart" av={7} /></div>
                      <div className="pfc__cell" />
                    </div>
                  </div>

                  <div className="pfc__lane">
                    <div className="pfc__lane-hd"><span className="pfc__lane-nm">Маленькие</span><span className="app__cnt">3</span></div>
                    <div className="pfc__cols">
                      <div className="pfc__cell"><ProjectCard title="Проект И" icon="laptop" av={8} /></div>
                      <div className="pfc__cell" />
                      <div className="pfc__cell"><ProjectCard title="Проект К" icon="bulb" av={9} /></div>
                      <div className="pfc__cell" />
                      <div className="pfc__cell"><ProjectCard title="Проект Л" icon="star" av={10} /></div>
                    </div>
                  </div>
                </section>

                {/* календарь срока */}
                <DuePopover />
              </div>

              <nav className="app__rail app__rail--r">
                {[M.peopleO, M.avTimer, M.history, M.filterNone, M.brightnessAutoO, M.block, M.camera, M.shareO, M.schema].map((d, i) => (
                  <span className="app__rail-it" key={i}><I d={d} size={24} /></span>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* окно карточки */}
        <div className="pfc__dim" />
        <CardWindow />

        <span className="pfc__cursor">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" stroke="#2d2d2d" strokeWidth={1.4} strokeLinejoin="round">
            <path d="M5 3l14 8.5-6.2 1.3 3.2 6-2.6 1.3-3.1-6L5 18.6z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

const PFC_CSS = `
.hsi.hsi--app.pfc{zoom:1}
/* доска портфеля */
.pfc .pfc__board{height:auto}
.pfc .pfc__chd{display:flex;padding:0 20px 0 23px}
.pfc .pfc__c{flex:1 1 0;display:flex;align-items:center;gap:6px;height:34px;padding:0 12px}
.pfc .pfc__c+.pfc__c{border-left:1px solid #dadbdc}
.pfc .pfc__lane{border-top:1px solid #e4e7ec}
.pfc .pfc__lane-hd{display:flex;align-items:center;gap:12px;height:38px;padding:0 20px 0 23px}
.pfc .pfc__lane-nm{font-size:15.5px;color:#424242}
.pfc .pfc__lane-hd .app__cnt{margin-left:auto}
.pfc .pfc__cols{display:flex;padding:0 20px 14px 23px}
.pfc .pfc__cell{flex:1 1 0;min-height:150px;padding:0 12px;display:flex;flex-direction:column;align-items:stretch;gap:10px}
.pfc .pfc__cell+.pfc__cell{border-left:1px solid #dadbdc}
.pfc .pfc__lane--small .pfc__lane-hd{height:44px}
.pfc .pfc__card{gap:10px}
/* плашка блокировки появляется на последних кадрах, когда окно уже закрыто */
.pfc.hsi--app .pfc__blocked{background:#e57373;height:0;padding-top:0;padding-bottom:0;overflow:hidden;opacity:0;animation:pfcBlocked 14s ease-in-out infinite}
@keyframes pfcBlocked{0%,82.5%{height:0;padding-top:0;padding-bottom:0;opacity:0}85.7%,100%{height:35px;padding-top:8px;padding-bottom:9px;opacity:1}}
.pfc .pfc__prog{display:flex;justify-content:space-between;background:#f5f5f5;padding:3px 6px;font-size:13.5px;color:#757575}
.pfc .pfc__due{color:#9e9e9e}
/* перенос карточки «Проект Б» в «Контроль» */
.pfc .pfc__move{position:relative;z-index:6;animation:pfcMove 14s ease-in-out infinite}
@keyframes pfcMove{0%,4.286%{transform:translate(0,0)}6.857%{transform:translate(8px,-14px)}13.714%{transform:translate(285px,6px)}17.143%,85.714%{transform:translate(285px,0)}100%{transform:translate(285px,0)}}
.pfc .pfc__lift{animation:pfcLift 14s ease-in-out infinite}
@keyframes pfcLift{0%,4.286%{transform:rotate(0) scale(1);box-shadow:0 1px 3px rgba(0,0,0,.1)}6.857%,13.714%{transform:rotate(2deg) scale(1.03);box-shadow:0 14px 34px -12px rgba(45,45,45,.45)}17.143%,85.714%{transform:rotate(0) scale(1);box-shadow:0 1px 3px rgba(0,0,0,.1)}100%{transform:rotate(0) scale(1);box-shadow:0 1px 3px rgba(0,0,0,.1)}}
/* плашка-приемник в «Контроле» */
.pfc .pfc__drop{display:block;height:120px;border-radius:6px;background:rgba(125,76,207,.12);opacity:0;animation:pfcDrop 14s ease-in-out infinite}
@keyframes pfcDrop{0%,4.714%{opacity:0}6.857%,12.857%{opacity:1}15.429%,85.714%{opacity:0}100%{opacity:0}}
/* карточки крупнее: мокап сильно ужимается в слоте, мелкий текст не читается */
.pfc.hsi--app .app__card{padding:12px 12px 14px;gap:12px}
.pfc.hsi--app .app__ct{font-size:19px;line-height:25px}
.pfc.hsi--app .app__cnm,.pfc .pfc__lane-nm{font-size:18px}
.pfc .pfc__prog,.pfc.hsi--app .app__meta,.pfc.hsi--app .app__due{font-size:16px}
.pfc.hsi--app .app__av{width:32px;height:32px}
.pfc.hsi--app .app__av svg{width:32px;height:32px}
.pfc.hsi--app .app__accent{width:60px;height:5px}
.pfc .pfc__cell{min-height:170px}
/* календарь срока */
.pfc .pfc__pop{position:absolute;right:120px;top:120px;width:420px;padding:16px 20px 10px;background:#fff;border-radius:8px;z-index:15;
  box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);
  opacity:0;animation:pfcPop 14s ease-in-out infinite}
@keyframes pfcPop{0%,30.857%{opacity:0}34.971%,55.543%{opacity:1}59.657%,85.714%{opacity:0}100%{opacity:0}}
.pfc .pfc__pop-row{display:flex;align-items:center;gap:12px;padding:8px 0;font-size:17px;color:#212121}
.pfc .pfc__pop-row--muted{color:#757575;font-size:15px}
.pfc .pfc__box{width:18px;height:18px;border:2px solid #9e9e9e;border-radius:3px}
.pfc .pfc__cal-hd{display:flex;align-items:center;justify-content:space-between;margin-top:6px;font-size:17px;color:#212121}
.pfc .pfc__cal-hd svg{color:#757575}
.pfc .pfc__cal-prev{transform:rotate(180deg)}
.pfc .pfc__cal-wd,.pfc .pfc__cal{display:grid;grid-template-columns:repeat(7,1fr);text-align:center}
.pfc .pfc__cal-wd{margin-top:10px;font-size:13px;color:#9e9e9e}
.pfc .pfc__cal{margin-top:4px;font-size:15px;color:#424242}
.pfc .pfc__cal span{width:32px;height:32px;margin:1px auto;display:flex;align-items:center;justify-content:center;border-radius:50%}
.pfc .pfc__cal .is-today{color:#9c27b0;font-weight:700}
.pfc .pfc__cal .is-sel{background:transparent;color:#424242;animation:pfcSel 14s steps(1,end) infinite}
@keyframes pfcSel{0%{background:transparent;color:#424242}46.286%{background:#9c27b0;color:#fff}59.657%{background:transparent;color:#424242}100%{background:transparent;color:#424242}}
.pfc .pfc__link{color:#9c27b0}
.pfc .pfc__pop-actions{display:flex;align-items:center;justify-content:flex-end;gap:16px;margin-top:10px;font-size:15px;color:#757575;text-transform:uppercase;letter-spacing:.5px}
.pfc .pfc__apply{display:inline-flex;align-items:center;height:34px;padding:0 16px;border:1px solid #9c27b0;border-radius:4px;color:#9c27b0}
/* окно карточки */
.pfc .pfc__dim{position:absolute;inset:0;background:rgba(45,45,45,.35);opacity:0;z-index:20;animation:pfcDim 14s ease-in-out infinite}
@keyframes pfcDim{0%,60%{opacity:0}63.429%,80.571%{opacity:1}84%,85.714%{opacity:0}100%{opacity:0}}
.pfc .pfc__win{position:absolute;left:50%;top:50%;width:980px;display:flex;gap:28px;background:#fff;border-radius:10px;padding:34px 38px;z-index:21;
  box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14);
  transform:translate(-50%,-50%) scale(.96);opacity:0;animation:pfcWin 14s ease-in-out infinite}
@keyframes pfcWin{0%,60%{opacity:0;transform:translate(-50%,-50%) scale(.96)}63.429%,80.571%{opacity:1;transform:translate(-50%,-50%) scale(1)}84%,85.714%{opacity:0;transform:translate(-50%,-50%) scale(.98)}100%{opacity:0;transform:translate(-50%,-50%) scale(.98)}}
.pfc .pfc__win-main{flex:1;min-width:0}
.pfc .pfc__win-side{width:290px;border-left:1px solid #e0e0e0;padding-left:28px}
.pfc .pfc__win-x{position:absolute;right:26px;top:26px;color:#757575;transform:rotate(90deg)}
.pfc .pfc__win-ttl{font-size:30px;font-weight:500;color:#212121}
.pfc .pfc__win-meta{margin-top:8px;font-size:15px;color:#757575}
.pfc .pfc__win-tb{display:flex;align-items:center;gap:10px;margin-top:18px}
.pfc .pfc__win-plus{width:42px;height:42px;border-radius:50%;background:#9c27b0;color:#fff;display:flex;align-items:center;justify-content:center;font-size:26px}
.pfc .pfc__win-btn{height:36px;display:inline-flex;align-items:center;gap:6px;padding:0 14px;border:1px solid #e0e0e0;border-radius:18px;font-size:14px;color:#424242;text-transform:uppercase;letter-spacing:.4px}
.pfc .pfc__win-btn.is-on{border-color:#9c27b0;color:#9c27b0}
/* кнопки-иконки круглые: 36x36, без горизонтальных отступов */
.pfc .pfc__win-btn--ic{width:36px;padding:0;justify-content:center;flex:none}
/* кнопка «Блокировка» загорается под курсором и открывает блок ниже */
.pfc .pfc__win-btn--block{animation:pfcBlockBtn 14s steps(1,end) infinite}
@keyframes pfcBlockBtn{0%{border-color:#e0e0e0;color:#424242}66.429%{border-color:#9c27b0;color:#9c27b0}100%{border-color:#9c27b0;color:#9c27b0}}
.pfc .pfc__block{margin-top:20px;background:#fdecef;border:1px solid #f8c8d0;border-radius:6px;padding:14px 16px;
  opacity:0;animation:pfcBlockOpen 14s ease-in-out infinite}
@keyframes pfcBlockOpen{0%,66.857%{opacity:0}68.571%,85.714%{opacity:1}100%{opacity:1}}
.pfc .pfc__block-ttl{font-size:15px;color:#c2185b}
.pfc .pfc__block-text{display:flex;align-items:flex-start;min-height:56px;margin-top:8px;font-size:17px;color:#212121}
/* текст блокировки набирается, пока открыто окно карточки */
.pfc .pfc__block-typed{overflow:hidden;white-space:nowrap;max-width:0;animation:pfcBlockType 14s steps(22,end) infinite}
@keyframes pfcBlockType{0%,68.571%{max-width:0}77.143%,85.714%{max-width:230px}100%{max-width:230px}}
.pfc .pfc__caret{width:2px;height:20px;background:#212121;margin-left:2px;visibility:hidden;animation:pfcCaret 1s steps(1,end) infinite,pfcCaretOn 14s steps(1,end) infinite}
@keyframes pfcCaretOn{0%{visibility:hidden}79%{visibility:visible}93%{visibility:hidden}}
@keyframes pfcCaret{0%,50%{opacity:1}51%,100%{opacity:0}}
.pfc .pfc__block-foot{display:flex;align-items:center;justify-content:space-between;margin-top:12px;font-size:15px;color:#757575}
.pfc .pfc__block-act{display:inline-flex;align-items:center;gap:6px;color:#9c27b0;text-transform:uppercase;letter-spacing:.4px}
.pfc .pfc__block-add{margin-top:10px;text-align:right;font-size:14px;color:#757575;text-transform:uppercase;letter-spacing:.4px}
.pfc .pfc__row{display:grid;grid-template-columns:200px 1fr;align-items:center;gap:16px;margin-top:14px;font-size:16px;color:#616161}
.pfc .pfc__pill{display:inline-flex;align-items:center;gap:8px;padding:4px 12px;border-radius:14px;background:#f2f2f4;font-size:15px;color:#424242}
.pfc .pfc__win-sec{margin-top:22px;font-size:17px;font-weight:500;color:#212121}
.pfc .pfc__win-desc{margin-top:8px;font-size:15px;color:#9e9e9e}
.pfc .pfc__win-cm{margin-top:12px;height:44px;display:flex;align-items:center;padding:0 12px;border:1px solid #e0e0e0;border-radius:6px;font-size:15px;color:#9e9e9e}
.pfc .pfc__win-empty{margin-top:14px;font-size:14px;color:#9e9e9e;text-align:center}
/* курсор: тянет карточку → календарь → открывает карточку */
.pfc .pfc__cursor{position:absolute;left:0;top:0;z-index:22;filter:drop-shadow(0 2px 3px rgba(0,0,0,.25));animation:pfcCursor 14s ease-in-out infinite}
@keyframes pfcCursor{0%,2.571%{transform:translate(1100px,380px) scale(1)}4.286%{transform:translate(1060px,262px) scale(1)}5.571%{transform:translate(1060px,262px) scale(.82)}12%{transform:translate(1345px,262px) scale(.82)}14.571%,27.771%{transform:translate(1345px,262px) scale(1)}30.857%{transform:translate(1488px,610px) scale(1)}32.914%{transform:translate(1488px,610px) scale(.82)}41.143%,44.229%{transform:translate(1474px,312px) scale(1)}46.286%{transform:translate(1474px,312px) scale(.82)}52.457%,54.514%{transform:translate(1706px,542px) scale(1)}56.571%{transform:translate(1706px,542px) scale(.82)}58.714%{transform:translate(1358px,268px) scale(1)}60.429%{transform:translate(1358px,268px) scale(.82)}62.571%,64.714%{transform:translate(1358px,268px) scale(1)}65.571%{transform:translate(787px,326px) scale(1)}66.429%{transform:translate(787px,326px) scale(.82)}67.286%{transform:translate(787px,326px) scale(1)}68.571%,85.714%{transform:translate(554px,441px) scale(1)}100%{transform:translate(554px,441px) scale(1)}}
/* статичный режим: доска без анимации, окна и календарь скрыты, левая колонка иконок убрана */
.pfc.is-still .app__tree{display:none}
.pfc.is-still .pfc__move,.pfc.is-still .pfc__lift,.pfc.is-still .pfc__drop,.pfc.is-still .pfc__pop,.pfc.is-still .pfc__dim,.pfc.is-still .pfc__win,.pfc.is-still .pfc__cursor,.pfc.is-still .pfc__caret,.pfc.is-still .pfc__cal .is-sel,.pfc.is-still .pfc__block-typed,.pfc.is-still .pfc__block,.pfc.is-still .pfc__win-btn--block,.pfc.is-still .pfc__blocked{animation:none}
.pfc.is-still .pfc__blocked{display:none}
.pfc.is-still .pfc__block-typed{max-width:none}
.pfc.is-still .pfc__cal .is-sel{background:#9c27b0;color:#fff}
.pfc.is-still .pfc__move{transform:translate(285px,0)}
.pfc.is-still .pfc__drop,.pfc.is-still .pfc__pop,.pfc.is-still .pfc__dim,.pfc.is-still .pfc__win,.pfc.is-still .pfc__cursor{opacity:0}
@media(prefers-reduced-motion:reduce){
  .pfc .pfc__move,.pfc .pfc__lift,.pfc .pfc__drop,.pfc .pfc__pop,.pfc .pfc__dim,.pfc .pfc__win,.pfc .pfc__cursor,.pfc .pfc__caret,.pfc .pfc__cal .is-sel{animation:none}
  .pfc .pfc__cal .is-sel{background:#9c27b0;color:#fff}
  .pfc .pfc__move{transform:translate(285px,0)}
  .pfc .pfc__cursor{transform:translate(1345px,262px)}
}
`;

export default PortfolioCardAnimatedMock;
