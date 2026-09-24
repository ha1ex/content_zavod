'use client';

import { APP_CSS, APP_ICONS as M } from '../HeroScreenApp';

/**
 * ColumnCreateAnimatedMock — анимированный мокап по сценарию ролика kaiten.ru
 * (Dop2_Fin_2_2): на пустой доске с дорожками курсор открывает меню колонки,
 * выбирает «Создать колонку» → «Справа», в окне «Создать колонку» набирается
 * название «Согласование», курсор жмет «Создать» — и колонка появляется на доске.
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

/** «Дерево» пространств на фоне. */
const TREE = [
  'Дашборд руководителя',
  'Справочный центр',
  'Документ',
  'База знаний',
  'Техподдержка',
  'Канбан для разработки',
  'Знакомство с Kaiten',
  'Заявки',
  'Бухгалтерия',
  'Юридический отдел',
  'Продукт X',
  'HR-отдел',
  'Инженерная разработка',
  'Управление проектами',
];

/** Колонки доски: четвертая появляется после создания. */
/** Колонки доски: «Согласование» появляется третьей, перед «Готово». */
const COLUMNS: { name: string; done?: boolean; tools?: boolean; fresh?: boolean }[] = [
  { name: 'Очередь' },
  { name: 'В работе', tools: true },
  { name: 'Согласование', fresh: true },
  { name: 'Готово', done: true },
];
/** Дорожки доски, как в шаблоне «Доска с дорожками». */
const LANES = ['Срочно', 'Обычный приоритет'];

export function ColumnCreateAnimatedMock() {
  const views = [M.kanbanO, M.grid, M.sort, M.calendarO, M.sync, M.folderO];
  return (
    <div className="hsi hsi--app cca" aria-hidden="true" style={{ zoom: 1 }}>
      <style dangerouslySetInnerHTML={{ __html: APP_CSS + CCA_CSS }} />
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
              <I d={M.add} size={26} />
            </div>
            <div className="app__tree-list">
              {TREE.map((label, i) => (
                <div className={i === 13 ? 'app__tree-it is-active' : 'app__tree-it'} key={label + i}>
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
                <section className="app__board cca__board">
                  <div className="app__bhd">
                    <span className="app__grip"><i /><i /><i /><i /><i /><i /></span>
                    <span className="app__bnm">Новая доска</span>
                    <I d={M.expandLess} size={24} className="app__bchev" />
                  </div>

                  {/* шапка колонок: третьей появляется новая «Согласование» */}
                  <div className="cca__chd">
                    {COLUMNS.map((c) => (
                      <div className={c.fresh ? 'cca__c cca__c--new' : 'cca__c'} key={c.name}>
                        {c.done && <I d={M.check} size={20} className="app__chk" />}
                        <span className="app__cnm">{c.name}</span>
                        {c.tools && (
                          <span className="cca__tools">
                            <span className="cca__tool cca__tool--add"><I d={M.add} size={20} /></span>
                            <span className="cca__tool"><I d={M.moreVert} size={20} /></span>
                          </span>
                        )}
                        <span className="app__cnt">0</span>
                      </div>
                    ))}
                  </div>

                  {/* сплошные вертикальные разделители колонок на всю высоту доски */}
                  <div className="cca__grid" aria-hidden="true">
                    {COLUMNS.map((c) => (
                      <span className={c.fresh ? 'cca__gc cca__gc--new' : 'cca__gc'} key={c.name} />
                    ))}
                  </div>

                  {/* дорожки с пустыми колонками */}
                  {LANES.map((lane) => (
                    <div className="cca__lane" key={lane}>
                      <div className="cca__lane-hd">
                        <span className="app__grip"><i /><i /><i /><i /><i /><i /></span>
                        <span className="cca__lane-nm">{lane}</span>
                        <I d={M.expandLess} size={22} className="app__bchev" />
                      </div>
                      <div className="cca__lane-cols">
                        {COLUMNS.map((c) => (
                          <span className={c.fresh ? 'cca__cell cca__cell--new' : 'cca__cell'} key={c.name} />
                        ))}
                      </div>
                    </div>
                  ))}
                </section>

                {/* меню колонки */}
                <div className="cca__menu">
                  <div className="cca__mi cca__mi--hv cca__mi--h1">Создать карточку</div>
                  <div className="cca__sep" />
                  <div className="cca__mi cca__mi--hv cca__mi--h2">
                    Создать колонку
                    <I d={M.expandLess} size={18} className="cca__mi-chev" />
                  </div>
                  <div className="cca__mi cca__mi--sub cca__mi--hv cca__mi--h3">Слева</div>
                  <div className="cca__mi cca__mi--sub cca__mi--hv cca__mi--h4">Справа</div>
                  <div className="cca__mi">Добавить 2 подколонки</div>
                </div>
              </div>

              <nav className="app__rail app__rail--r">
                {[M.peopleO, M.avTimer, M.history, M.filterNone, M.brightnessAutoO, M.block, M.camera, M.shareO, M.schema].map((d, i) => (
                  <span className="app__rail-it" key={i}><I d={d} size={24} /></span>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* затемнение и окно «Создать колонку» */}
        <div className="cca__dim" />
        <div className="cca__modal">
          <div className="cca__ttl">Создать колонку</div>
          <label className="cca__field">
            <span className="cca__label">Наименование колонки</span>
            <span className="cca__input"><span className="cca__typed">Согласование</span><i className="cca__caret" /></span>
          </label>
          <div className="cca__actions">
            <span className="cca__btn">Отмена</span>
            <span className="cca__btn cca__btn--accent">Создать</span>
          </div>
        </div>

        {/* курсор: кнопка «+» в колонке → «Справа» в меню → «Создать» в окне */}
        <span className="cca__cursor">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" stroke="#2d2d2d" strokeWidth={1.4} strokeLinejoin="round">
            <path d="M5 3l14 8.5-6.2 1.3 3.2 6-2.6 1.3-3.1-6L5 18.6z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

const CCA_CSS = `
.hsi.hsi--app.cca{zoom:1}
/* доска без карточек: шапка колонок и дорожки */
.cca .cca__board{position:relative;height:auto}
.cca .cca__chd{display:flex;padding:0 20px 0 23px}
.cca .cca__c{position:relative;flex:1 1 0;display:flex;align-items:center;gap:6px;height:34px;padding:0 12px}
.cca .cca__c+.cca__c{border-left:1px solid #dadbdc}
/* имя колонки забирает свободное место — инструменты и счетчик стоят у правого края */
.cca.hsi--app .cca__c .app__cnm{flex:1;min-width:0}
.cca.hsi--app .cca__c .app__cnt{margin-left:0}
.cca .cca__tools{display:inline-flex;gap:2px;margin-right:2px;color:#424242;opacity:0;animation:ccaTools 14s steps(1,end) infinite}
.cca .cca__tool{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:4px}
/* курсор наводится на «+» — он подсвечивается, как в продукте */
.cca .cca__tool--add{animation:ccaPlus 14s steps(1,end) infinite}
@keyframes ccaPlus{0%{background:transparent}6.857%{background:#dfe1e5}10.714%{background:transparent}100%{background:transparent}}
@keyframes ccaTools{0%,5.143%{opacity:0}6.857%,39.429%{opacity:1}41.143%,85.714%{opacity:0}100%{opacity:0}}
/* новая колонка появляется после «Создать» */
/* новая колонка раздвигает доску: до создания ее слот нулевой */
.cca .cca__c--new,.cca .cca__cell--new{opacity:0;flex-grow:0;min-width:0;overflow:hidden;white-space:nowrap;animation:ccaNew 14s ease-in-out infinite}
@keyframes ccaNew{0%,66.857%{opacity:0;flex-grow:0;padding-left:0;padding-right:0}72%,82.286%{opacity:1;flex-grow:1;padding-left:12px;padding-right:12px}85.714%,100%{opacity:0;flex-grow:0;padding-left:0;padding-right:0}}
.cca .cca__grid{position:absolute;left:0;right:0;top:75px;bottom:0;display:flex;padding:0 20px 0 23px;pointer-events:none}
.cca .cca__gc{flex:1 1 0;border-left:1px solid #dadbdc}
.cca .cca__gc:first-child{border-left:0}
.cca .cca__gc--new{flex-grow:0;min-width:0;border-left:1px solid #dadbdc;animation:ccaNewCol 14s ease-in-out infinite}
@keyframes ccaNewCol{0%,66.857%{flex-grow:0}72%,82.286%{flex-grow:1}85.714%,100%{flex-grow:0}}
.cca .cca__lane{position:relative;z-index:1;border-top:1px solid #e4e7ec}
.cca .cca__lane-hd{display:flex;align-items:center;gap:12px;height:40px;padding:0 20px 0 23px}
.cca .cca__lane-nm{font-size:15.5px;color:#424242}
.cca .cca__lane-hd .app__bchev{margin-left:auto}
.cca .cca__lane-cols{display:flex;padding:0 20px 0 23px}
.cca .cca__cell{flex:1 1 0;height:210px}
/* меню колонки */
.cca .cca__menu{position:absolute;left:1230px;top:150px;width:300px;padding:8px 0;background:#fff;border-radius:8px;
  box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);
  opacity:0;z-index:15;animation:ccaMenu 14s ease-in-out infinite}
@keyframes ccaMenu{0%,8.571%{opacity:0}11.143%,34.286%{opacity:1}37.714%,85.714%{opacity:0}100%{opacity:0}}
.cca .cca__mi{display:flex;align-items:center;padding:9px 20px;font-size:19px;color:#212121}
.cca .cca__mi--sub{padding-left:38px}
.cca .cca__mi.is-hover{background:#f2eaf6}
/* курсор идёт сверху вниз — пункты подсвечиваются по очереди под ним */
.cca .cca__mi--hv{animation-duration:14s;animation-timing-function:steps(1,end);animation-iteration-count:infinite}
.cca .cca__mi--h1{animation-name:ccaHv1}
.cca .cca__mi--h2{animation-name:ccaHv2}
.cca .cca__mi--h3{animation-name:ccaHv3}
.cca .cca__mi--h4{animation-name:ccaHv4}
@keyframes ccaHv1{0%{background:transparent}11.143%{background:#f2eaf6}12.857%{background:transparent}100%{background:transparent}}
@keyframes ccaHv2{0%{background:transparent}12.857%{background:#f2eaf6}15%{background:transparent}100%{background:transparent}}
@keyframes ccaHv3{0%{background:transparent}15%{background:#f2eaf6}17.143%{background:transparent}100%{background:transparent}}
@keyframes ccaHv4{0%{background:transparent}17.143%{background:#f2eaf6}37.714%{background:transparent}100%{background:transparent}}
.cca .cca__mi-chev{margin-left:auto;color:#757575}
.cca .cca__sep{height:1px;margin:6px 0;background:#e0e0e0}
/* окно «Создать колонку» */
.cca .cca__dim{position:absolute;inset:0;background:rgba(45,45,45,.35);opacity:0;z-index:20;animation:ccaDim 14s ease-in-out infinite}
@keyframes ccaDim{0%,37.714%{opacity:0}41.143%,61.714%{opacity:1}65.143%,85.714%{opacity:0}100%{opacity:0}}
.cca .cca__modal{position:absolute;left:50%;top:50%;z-index:21;width:640px;background:#fff;border-radius:10px;padding:30px 34px 22px;
  box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14);
  transform:translate(-50%,-50%) scale(.96);opacity:0;animation:ccaModal 14s ease-in-out infinite}
@keyframes ccaModal{0%,37.714%{opacity:0;transform:translate(-50%,-50%) scale(.96)}41.143%,61.714%{opacity:1;transform:translate(-50%,-50%) scale(1)}65.143%,85.714%{opacity:0;transform:translate(-50%,-50%) scale(.98)}100%{opacity:0;transform:translate(-50%,-50%) scale(.98)}}
.cca .cca__ttl{font-size:26px;font-weight:500;color:#212121}
.cca .cca__field{position:relative;display:block;margin-top:30px}
.cca .cca__label{position:absolute;left:12px;top:-9px;padding:0 6px;background:#fff;font-size:14px;color:#757575;
  animation:ccaLabel 14s steps(1,end) infinite}
@keyframes ccaLabel{0%{color:#757575}41%{color:#9c27b0}60%{color:#757575}}
.cca .cca__input{display:flex;align-items:center;height:56px;padding:0 16px;border:2px solid #e0e0e0;border-radius:6px;
  font-size:21px;color:#212121;animation:ccaInput 14s steps(1,end) infinite}
@keyframes ccaInput{0%{border-color:#e0e0e0}41%{border-color:#9c27b0}60%{border-color:#e0e0e0}}
.cca .cca__typed{overflow:hidden;white-space:nowrap;max-width:0;animation:ccaType 14s steps(12,end) infinite}
@keyframes ccaType{0%,46.286%{max-width:0}56.571%,85.714%{max-width:240px}100%{max-width:240px}}
.cca .cca__caret{width:2px;height:26px;background:#212121;margin-left:2px;visibility:hidden;animation:ccaCaret 1s steps(1,end) infinite,ccaCaretOn 14s steps(1,end) infinite}
@keyframes ccaCaretOn{0%{visibility:hidden}41%{visibility:visible}60%{visibility:hidden}}
@keyframes ccaCaret{0%,50%{opacity:1}51%,100%{opacity:0}}
.cca .cca__actions{display:flex;align-items:center;justify-content:flex-end;gap:20px;margin-top:26px;font-size:17px;font-weight:500;letter-spacing:.6px;text-transform:uppercase}
.cca .cca__btn{color:#616161}
.cca .cca__btn--accent{display:inline-flex;align-items:center;height:38px;padding:0 18px;border:1px solid #9c27b0;border-radius:4px;color:#9c27b0}
/* курсор */
.cca .cca__cursor{position:absolute;left:0;top:0;z-index:22;filter:drop-shadow(0 2px 3px rgba(0,0,0,.25));
  animation:ccaCursor 14s ease-in-out infinite,ccaCursorOut 14s linear infinite}
/* на паузе в конце цикла курсор уходит из кадра */
@keyframes ccaCursorOut{0%,85%{opacity:1}88%,100%{opacity:0}}
@keyframes ccaCursor{0%{transform:translate(1000px,430px) scale(1)}6.857%,8.929%{transform:translate(1280px,170px) scale(1)}9.429%{transform:translate(1280px,170px) scale(.82)}9.929%{transform:translate(1280px,170px) scale(1)}18.857%,33.786%{transform:translate(1242px,321px) scale(1)}34.286%{transform:translate(1242px,321px) scale(.82)}34.786%{transform:translate(1242px,321px) scale(1)}41.143%,44.929%{transform:translate(700px,516px) scale(1)}45.429%{transform:translate(700px,516px) scale(.82)}45.929%,54.857%{transform:translate(700px,516px) scale(1)}60%,63.786%{transform:translate(1186px,568px) scale(1)}64.286%{transform:translate(1186px,568px) scale(.82)}64.786%{transform:translate(1186px,568px) scale(1)}72%,85.714%{transform:translate(1478px,168px) scale(1)}100%{transform:translate(1478px,168px) scale(1)}}
@media(prefers-reduced-motion:reduce){
  .cca .cca__tools,.cca .cca__menu,.cca .cca__dim,.cca .cca__modal,.cca .cca__cursor,.cca .cca__typed,.cca .cca__caret,.cca .cca__c--new,.cca .cca__cell--new,.cca .cca__mi--hv,.cca .cca__tool--add,.cca .cca__input,.cca .cca__label,.cca .cca__gc--new{animation:none}
  .cca .cca__input{border-color:#9c27b0}
  .cca .cca__label{color:#9c27b0}
  .cca .cca__mi--h4{background:#f2eaf6}
  .cca .cca__tools{opacity:1}
  .cca .cca__menu{opacity:1}
  .cca .cca__cursor{transform:translate(818px,316px)}
}
`;

export default ColumnCreateAnimatedMock;
