'use client';

import { APP_CSS, APP_ICONS as M } from '../HeroScreenApp';

/**
 * SpaceCreateAnimatedMock — анимированный мокап по сценарию ролика kaiten.ru
 * (Dop2_Fin_2_1): курсор жмет «+» в «Дереве», открывается окно «Новое
 * пространство», в поле набирается название, затем открывается окно «Новая
 * доска» с шаблонами — «Простая доска», «Доска с дорожками», «Скрам».
 *
 * Интерфейс — тот же, что на первом экране (HsiApp): те же стили `.hsi .app`,
 * шапка, колонки иконок, «Дерево», панель видов и доска. Цикл 12 секунд.
 * Уважает prefers-reduced-motion: без анимации виден первый кадр.
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

/** «Дерево» пространств на фоне — как в ролике. */
const TREE = [
  'Дашборд руководителя',
  'Справочный центр',
  'Документ',
  'База знаний',
  'Программа на семестры 1-4',
  'Техподдержка',
  'Канбан для разработки',
  'Знакомство с Kaiten',
  'Заявки',
  'Бухгалтерия',
  'Карта пользовательских сценариев',
  'Юридический отдел',
  'Домохозяйство',
  'Продукт X',
  'HR-отдел',
];

/** Шаблоны досок из окна «Новая доска». */
const TEMPLATES = [
  { title: 'Простая доска', sub: 'Будем делать, Делаем, Готово', cols: ['Очередь', 'В работе', 'Готово'], lanes: false },
  { title: 'Доска с дорожками', sub: '3 колонки + дорожки Срочно и Стандартно', cols: ['Очередь', 'В работе', 'Готово'], lanes: true },
  { title: 'Скрам', sub: 'Доски бэклога и спринта', cols: ['Очередь', 'Бэклог спринта', 'В работе', 'Готово'], lanes: false },
];

function TemplateCard({ t, active }: { t: (typeof TEMPLATES)[number]; active?: boolean }) {
  return (
    <div className={active ? 'scr__tpl is-active' : 'scr__tpl'}>
      <div className="scr__tpl-ttl">{t.title}</div>
      <div className="scr__tpl-sub">{t.sub}</div>
      <div className="scr__tpl-board">
        {t.lanes && (
          <div className="scr__tpl-lanes">
            <span>Срочно</span>
            <span>Обычный приоритет</span>
          </div>
        )}
        <div className="scr__tpl-cols">
          {t.cols.map((c, i) => (
            <div className="scr__tpl-col" key={c}>
              <div className="scr__tpl-cnm">{c}</div>
              <div className="scr__tpl-cards">
                <span />
                {i !== 1 && <span />}
                {t.lanes && i === 0 && <span />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SpaceCreateAnimatedMock() {
  const views = [M.kanbanO, M.grid, M.sort, M.calendarO, M.sync, M.folderO];
  return (
    <div className="hsi hsi--app scr" aria-hidden="true" style={{ zoom: 1 }}>
      <style dangerouslySetInnerHTML={{ __html: APP_CSS + SCR_CSS }} />
      <div className="app">
        <header className="app__top">
          <span className="app__logo"><KaitenMark />Kaiten</span>
          <span className="app__space"><I d={M.spaceDashboard} size={24} />Управление проектами</span>
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
              {/* кнопка «+», по которой «щелкает» курсор */}
              <span className="scr__plus"><I d={M.add} size={26} /></span>
            </div>
            <div className="app__tree-list">
              {TREE.map((label, i) => (
                <div className="app__tree-it" key={label + i}>
                  <span className="app__tree-ic"><I d={M.spaceDashboard} size={22} /></span>
                  <span className="app__tree-lbl">{label}</span>
                </div>
              ))}
              {/* новое пространство появляется в конце списка */}
              <div className="app__tree-it scr__new">
                <span className="app__tree-ic"><I d={M.spaceDashboard} size={22} /></span>
                <span className="app__tree-lbl">Управление</span>
              </div>
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
                {/* пустая доска нового пространства на фоне */}
                <section className="app__board">
                  <div className="app__bhd">
                    <span className="app__grip"><i /><i /><i /><i /><i /><i /></span>
                    <span className="app__bnm">Задачи команды</span>
                    <I d={M.expandLess} size={24} className="app__bchev" />
                  </div>
                  <div className="app__cols">
                    {['Запланировано', 'В работе', 'На согласовании', 'Готово'].map((c, i) => (
                      <div className="app__col" key={c}>
                        <div className="app__chd">
                          {i === 3 && <I d={M.check} size={20} className="app__chk" />}
                          <span className="app__cnm">{c}</span>
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

        {/* затемнение под окнами */}
        <div className="scr__dim" />

        {/* окно «Новое пространство» */}
        <div className="scr__modal scr__modal--space">
          <div className="scr__ttl">Новое пространство</div>
          <label className="scr__field">
            <span className="scr__label">Название</span>
            <span className="scr__input"><span className="scr__typed">Управление</span><i className="scr__caret" /></span>
          </label>
          <div className="scr__hint">Добавить пространство в группы</div>
          {['Группы «Администраторов»', 'Группы «Редакторов»', 'Группы «Комментаторов»'].map((g) => (
            <div className="scr__select" key={g}>
              <span className="scr__select-lbl">{g}</span>
              Выберите группы
              <I d={M.expandLess} size={22} className="scr__select-chev" />
            </div>
          ))}
          <div className="scr__actions">
            <span className="scr__btn">Отмена</span>
            <span className="scr__btn scr__btn--accent">Создать</span>
          </div>
        </div>

        {/* окно «Новая доска» с шаблонами */}
        <div className="scr__modal scr__modal--board">
          <div className="scr__ttl">Новая доска</div>
          <div className="scr__tabs">
            <span className="is-on">Основные</span>
            <span>Блоки</span>
            <span>Scrum и Kanban</span>
          </div>
          <p className="scr__text">
            Любой процесс в вашей компании состоит из этапов. Доска — это визуальное представление этих этапов,
            она помогает понять, на каком этапе находится та или иная работа.
          </p>
          <div className="scr__tpls">
            {TEMPLATES.map((t, i) => (
              <TemplateCard t={t} active={i === 1} key={t.title} />
            ))}
          </div>
        </div>

        {/* курсор: «+» в дереве → поле названия → кнопка «Создать» → шаблон доски */}
        <span className="scr__cursor">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" stroke="#2d2d2d" strokeWidth={1.4} strokeLinejoin="round">
            <path d="M5 3l14 8.5-6.2 1.3 3.2 6-2.6 1.3-3.1-6L5 18.6z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

const SCR_CSS = `
.hsi.hsi--app.scr{zoom:1}
/* затемнение и окна */
.scr .scr__dim{position:absolute;inset:0;background:rgba(45,45,45,.35);opacity:0;z-index:20;animation:scrDim 11s ease-in-out infinite}
@keyframes scrDim{0%,6.545%{opacity:0}9.818%,76.909%{opacity:1}80.182%,81.818%{opacity:0}100%{opacity:0}}
.scr .scr__modal{position:absolute;left:50%;top:50%;z-index:21;background:#fff;border-radius:10px;
  box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14);
  padding:28px 32px;transform:translate(-50%,-50%) scale(.96);opacity:0}
.scr .scr__modal--space{width:660px;animation:scrSpace 11s ease-in-out infinite}
.scr .scr__modal--board{width:1100px;padding-bottom:34px;animation:scrBoard 11s ease-in-out infinite}
@keyframes scrSpace{0%,6.545%{opacity:0;transform:translate(-50%,-50%) scale(.96)}9.818%,36%{opacity:1;transform:translate(-50%,-50%) scale(1)}39.273%,81.818%{opacity:0;transform:translate(-50%,-50%) scale(.98)}100%{opacity:0;transform:translate(-50%,-50%) scale(.98)}}
@keyframes scrBoard{0%,39.273%{opacity:0;transform:translate(-50%,-50%) scale(.96)}42.545%,76.909%{opacity:1;transform:translate(-50%,-50%) scale(1)}80.182%,81.818%{opacity:0;transform:translate(-50%,-50%) scale(.98)}100%{opacity:0;transform:translate(-50%,-50%) scale(.98)}}
.scr .scr__ttl{font-size:26px;font-weight:500;color:#212121;letter-spacing:.2px}
/* поле названия с набором текста */
.scr .scr__field{position:relative;display:block;margin-top:26px}
.scr .scr__label{position:absolute;left:12px;top:-9px;padding:0 6px;background:#fff;font-size:14px;color:#757575;animation:scrLabel 11s steps(1,end) infinite}
@keyframes scrLabel{0%{color:#757575}11.455%{color:#9c27b0}31.091%{color:#757575}100%{color:#757575}}
.scr .scr__input{display:flex;align-items:center;height:56px;padding:0 16px;border:2px solid #e0e0e0;border-radius:6px;font-size:19px;color:#212121;animation:scrInput 11s steps(1,end) infinite}
@keyframes scrInput{0%{border-color:#e0e0e0}11.455%{border-color:#9c27b0}31.091%{border-color:#e0e0e0}100%{border-color:#e0e0e0}}
.scr .scr__typed{overflow:hidden;white-space:nowrap;max-width:0;animation:scrType 11s steps(10,end) infinite}
@keyframes scrType{0%,13.091%{max-width:0}24.545%,81.818%{max-width:180px}100%{max-width:180px}}
.scr .scr__caret{width:2px;height:24px;background:#212121;margin-left:2px;visibility:hidden;animation:scrCaret 1s steps(1,end) infinite,scrCaretOn 11s steps(1,end) infinite}
@keyframes scrCaretOn{0%{visibility:hidden}14%{visibility:visible}38%{visibility:hidden}}
@keyframes scrCaret{0%,50%{opacity:1}51%,100%{opacity:0}}
.scr .scr__hint{margin-top:26px;font-size:17px;color:#616161}
.scr .scr__select{position:relative;display:flex;align-items:center;height:52px;margin-top:20px;padding:0 16px;border:1px solid #e0e0e0;border-radius:6px;font-size:18px;color:#9e9e9e}
.scr .scr__select-lbl{position:absolute;left:12px;top:-9px;padding:0 6px;background:#fff;font-size:13px;color:#9e9e9e}
.scr .scr__select-chev{margin-left:auto;color:#757575;transform:rotate(180deg)}
.scr .scr__actions{display:flex;align-items:center;justify-content:flex-end;gap:20px;margin-top:28px;font-size:17px;font-weight:500;letter-spacing:.6px;text-transform:uppercase}
.scr .scr__btn{color:#616161}
.scr .scr__btn--accent{display:inline-flex;align-items:center;height:40px;padding:0 20px;border:1px solid #9c27b0;border-radius:4px;color:#9c27b0}
/* окно «Новая доска» */
.scr .scr__tabs{display:flex;gap:64px;margin-top:22px;border-bottom:1px solid #e0e0e0;font-size:17px;color:#757575;text-transform:uppercase;letter-spacing:.6px}
.scr .scr__tabs span{padding:0 8px 14px}
.scr .scr__tabs .is-on{color:#9c27b0;border-bottom:2px solid #9c27b0}
.scr .scr__text{margin-top:22px;font-size:16.5px;line-height:24px;color:#424242;max-width:960px}
.scr .scr__tpls{display:flex;gap:24px;margin-top:26px}
.scr .scr__tpl{flex:1;border:1px solid #e0e0e0;border-radius:8px;padding:18px 20px 22px;text-align:center}
.scr .scr__tpl.is-active{animation:scrTpl 11s steps(1,end) infinite}
@keyframes scrTpl{0%,63%{border-color:#e0e0e0;box-shadow:none}65.5%,81.818%{border-color:#9c27b0;box-shadow:0 0 0 1px #9c27b0}100%{border-color:#9c27b0;box-shadow:0 0 0 1px #9c27b0}}
.scr .scr__tpl-ttl{font-size:21px;font-weight:500;color:#212121}
.scr .scr__tpl-sub{margin-top:6px;font-size:14.5px;color:#757575}
.scr .scr__tpl-board{display:flex;gap:10px;margin-top:18px;text-align:left}
.scr .scr__tpl-lanes{display:flex;flex-direction:column;justify-content:space-around;font-size:11px;color:#9e9e9e;transform:rotate(-12deg)}
.scr .scr__tpl-cols{display:flex;gap:8px;flex:1}
.scr .scr__tpl-col{flex:1;border:1px solid #e0e0e0;border-radius:4px;padding:6px}
.scr .scr__tpl-cnm{font-size:11.5px;color:#616161;margin-bottom:6px}
.scr .scr__tpl-cards{display:flex;flex-direction:column;gap:6px}
.scr .scr__tpl-cards span{display:block;height:18px;border-radius:3px;background:#9e9e9e}
/* курсор */
.scr .scr__cursor{position:absolute;left:0;top:0;z-index:22;filter:drop-shadow(0 2px 3px rgba(0,0,0,.25));animation:scrCursor 11s ease-in-out infinite}
@keyframes scrCursor{0%{transform:translate(430px,150px) scale(1)}4.091%{transform:translate(392px,126px) scale(1)}6.545%{transform:translate(392px,126px) scale(.82)}11.455%,24.545%{transform:translate(700px,368px) scale(1)}31.091%{transform:translate(1200px,700px) scale(1)}34.364%{transform:translate(1200px,700px) scale(.82)}63%,81.818%{transform:translate(953px,590px) scale(1)}100%{transform:translate(953px,590px) scale(1)}}
/* новое пространство в дереве появляется после создания */
.scr .scr__new{opacity:0;animation:scrNew 11s steps(1,end) infinite}
@keyframes scrNew{0%,39.273%{opacity:0}42.545%,81.818%{opacity:1}100%{opacity:1}}
.scr .scr__plus{color:#6c6e6e;display:inline-flex;border-radius:6px;animation:scrPlus 11s steps(1,end) infinite}
@keyframes scrPlus{0%,3.273%{background:transparent}4.909%,9.818%{background:#e1d7e7}11.455%,81.818%{background:transparent}100%{background:transparent}}
@media(prefers-reduced-motion:reduce){
  .scr .scr__dim,.scr .scr__modal,.scr .scr__cursor,.scr .scr__typed,.scr .scr__caret,.scr .scr__new,.scr .scr__plus,.scr .scr__input,.scr .scr__label{animation:none}
  .scr .scr__input{border-color:#9c27b0}
  .scr .scr__label{color:#9c27b0}
  .scr .scr__dim{opacity:1}
  .scr .scr__modal--space{opacity:1;transform:translate(-50%,-50%) scale(1)}
  .scr .scr__typed{max-width:180px}
  .scr .scr__cursor{transform:translate(953px,590px)}
  .scr .scr__tpl.is-active{border-color:#9c27b0;box-shadow:0 0 0 1px #9c27b0}
  .scr .scr__new{opacity:1}
}
`;

export default SpaceCreateAnimatedMock;
