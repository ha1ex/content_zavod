'use client';

/**
 * InterfaceShowcase — витрина интерфейсов: широкий скриншот продукта, поверх
 * которого по центру живет анимированная канбан-доска.
 *
 * Эталон — блок «Импортозамещение» лендинга «Кайтен on-premise».
 *
 * Композиция (не менять, наполнять новым контентом через пропсы):
 * - Подложка — один PNG во всю ширину контейнера 1216px, скругление 12px.
 * - Доска приклеена к подложке в процентах (левый край 25.74%, ширина 48.52%),
 *   поэтому она попадает ровно в среднее окно скриншота. Проценты рассчитаны
 *   под конкретный кадр: при замене картинки геометрию придется пересчитать.
 * - Доска нарисована кодом и масштабируется переменной --kbs, чтобы совпасть
 *   с масштабом соседних окон на скриншоте.
 * - Карточка «Сверстать лендинг рассылки» циклически переезжает в соседнюю
 *   колонку вместе с курсором-рукой; prefers-reduced-motion останавливает это.
 * - Содержимое доски статично: это витрина, а не редактируемый мокап. Через
 *   пропсы задаются картинка, alt и заголовок доски.
 * - Доска нарисована в системе координат 720×433 и подгоняется под окно
 *   скриншота через переменные --kbs и --kbsy: без них она не совпадет
 *   с масштабом соседних окон.
 */
import React, { useEffect, useRef } from 'react';

export type InterfaceShowcaseProps = {
  /** Путь к скриншоту-подложке. По умолчанию — интерфейсы Кайтена. */
  src?: string;
  /** Альтернативный текст: что именно показано на скриншоте. */
  alt?: string;
  /** Заголовок доски-накладки. */
  boardTitle?: string;
  className?: string;
};

/** Подложка по умолчанию — экспорт интерфейсов Кайтена из Фигмы, 2432×658. */
const DEFAULT_SRC = '/brand/kaiten-interfaces.png';

/** Разметка доски статична — витрина показывает продукт, а не редактируется. */
const BOARD = `<div class="kb"><div class="hdr"><span class="grip"><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="nm">__TITLE__</span><span class="chev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg></span></div><div class="colhdr"><div class="c"><span class="t">Очередь</span><span class="cnt">3</span></div><div class="c"><span class="t">В&nbsp;работе</span><span class="cnt">2</span></div><div class="c"><span class="t">Согласование</span><span class="cnt">1</span></div><div class="c"><span class="chk"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span><span class="t">Готово</span><span class="cnt">2</span></div></div><div class="lanebody"><div class="col"><div class="ghost"><div class="drag-layer"><div class="card drag-card"><div class="ct-row"><span class="ct">Сверстать лендинг рассылки</span><span class="emo">📝</span></div><div class="tags"><span class="tag t-jud">Дизайн</span><span class="tag t-cx">Блог</span></div><div class="foot"><span class="avs"><span class="av ltr">ЕК</span></span></div></div><span class="hand"><svg width="34" height="34" viewBox="0 0 24 24" fill="#fff" stroke="#2d2d2d" stroke-width="1.4" stroke-linejoin="round"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11V7.5a1.5 1.5 0 0 1 3 0V11v-1a1.5 1.5 0 0 1 3 0v5.5a5.5 5.5 0 0 1-5.5 5.5H12a5 5 0 0 1-4.3-2.5l-2.4-4a1.5 1.5 0 0 1 2.5-1.6L9 15z"/></svg></span></div></div><div class="card"><div class="ct-row"><span class="ct">Продуктовая аналитика дашборда</span><span class="emo">🦉</span></div><div class="tags"><span class="tag t-ok">Аналитика</span><span class="tag t-teal">Сайт</span></div><div class="foot"><span class="avs"><span class="av ltr">СП</span></span><span class="due"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/></svg>20 мар.</span></div></div></div><div class="col"><div class="card"><div class="ct-row"><span class="ct">Кейс: конверсия лендинга +30%</span><span class="emo">📈</span></div><div class="row"><span class="cmt"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>1</span><span class="tag t-cx">Блог</span></div><div class="prog"><i style="width:40%"></i><span class="l">Чек-лист</span><span class="n">3/5</span></div><div class="foot"><span class="avs"><span class="av ltr">ИР</span><span class="av ltr">М</span></span><span class="due"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/></svg>1 мар.</span></div></div><div class="card"><div class="ct-row"><span class="ct">Email-рассылка: весенняя распродажа</span><span class="emo">✉️</span></div><div class="row"><span class="cmt"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>1</span><span class="tag t-jud">Email</span></div><div class="foot"><span class="avs"><span class="av ltr">ТЗ</span><span class="av ltr">Н</span></span><span class="due"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/></svg>1 мар.</span></div></div></div><div class="col"><div class="card"><div class="ct-row"><span class="ct">Обновить дизайн-систему</span><span class="emo">🎨</span></div><div class="tags"><span class="tag t-teal">UI</span></div><div class="foot"><span class="avs"><span class="av ltr">ОЛ</span></span><span class="due"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/></svg>31 мар.</span></div></div></div><div class="col"><div class="card"><div class="ct-row"><span class="ct">Релиз приложения 2.0</span><span class="emo">🚀</span></div><div class="tags"><span class="tag t-cx">Блог</span><span class="tag t-ok">Лидген</span></div><div class="prog done"><i style="width:100%"></i><span class="l">Чек-лист</span><span class="n">✓ 6/6</span></div><div class="foot"><span class="avs"><span class="av ltr">РБ</span><span class="av ltr">А</span></span></div></div><div class="card"><div class="ct-row"><span class="ct">A/B-тест главной страницы</span><span class="emo">📊</span></div><div class="tags"><span class="tag t-blue">Аналитика</span></div><div class="prog done"><i style="width:100%"></i><span class="l">Чек-лист</span><span class="n">✓ 4/4</span></div><div class="foot"><span class="avs"><span class="av ltr">АК</span></span></div></div></div></div><div class="hdr hdr--2"><span class="grip"><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="nm">Маркетинг</span><span class="chev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg></span></div></div>`;

const css = `
.ish{width:100%}
.ish .shw3-wrap{width:100%}
.ish .shw3-wrap{max-width:1216px;margin:0 auto;padding:0 var(--sp-4,16px)}
@media(min-width:1280px){
.ish .shw3-wrap{padding:0}
}
@media(max-width:767px){
.ish .shw3-wrap{padding:0}
}
.ish .shw3{margin:0}
.ish .shw3 img{display:block;width:100%;height:auto}
.ish .shw3{position:relative}
.ish .shw3-kb{position:absolute;z-index:2;left:25.74%;top:0%;width:48.52%;height:100%;overflow:hidden;border-radius:12px;background:#f1f1f4}
.ish .shw3-kb{box-shadow:0 26px 48px -26px rgba(45,45,45,.15)}
.ish .shw3-kb .kb{position:absolute;top:0;left:0;width:720px;height:433px;transform-origin:top left;transform:scale(var(--kbs,.5),var(--kbsy,var(--kbs,.5)));
  --ts:#8a8a8f;--bd:#e8e8eb;background:#f1f1f4;border:1px solid #e8e8eb;border-top:0;border-bottom:0;border-radius:12px;overflow:hidden;
  font-family:Roboto,Arial,sans-serif;color:#2d2d2d;text-align:left}
.ish .shw3-kb .kb *{box-sizing:border-box;margin:0;padding:0}
.ish .shw3-kb .hdr{display:flex;align-items:center;gap:9px;padding:11px 14px}
.ish .shw3-kb .grip{display:grid;grid-template-columns:repeat(2,3px);gap:3px}
.ish .shw3-kb .grip i{width:3px;height:3px;border-radius:50%;background:#c4c4c9;display:block}
.ish .shw3-kb .hdr .nm{font-size:14px;font-weight:600}
.ish .shw3-kb .hdr .chev{margin-left:auto;color:var(--ts);display:flex}
.ish .shw3-kb .hdr .chev svg{width:16px;height:16px}
.ish .shw3-kb .colhdr{display:flex;padding:4px 8px 8px;border-bottom:1px solid var(--bd)}
.ish .shw3-kb .colhdr .c{flex:1;display:flex;align-items:center;gap:6px;padding:0 7px;min-width:0}
.ish .shw3-kb .colhdr .c .t{font-size:11.5px;font-weight:500;color:#2d2d2d;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ish .shw3-kb .colhdr .c .chk{color:#4a8a2f;display:flex;flex:none}
.ish .shw3-kb .cnt{margin-left:auto;display:inline-flex;min-width:18px;height:18px;align-items:center;justify-content:center;background:#5f5e5a;color:#fff;border-radius:5px;padding:0 5px;font-size:10px;font-weight:600;line-height:1;flex:none}
.ish .shw3-kb .lanebody{display:flex;padding:11px 6px}
.ish .shw3-kb .col{flex:1;padding:0 7px;display:flex;flex-direction:column;gap:9px;position:relative;min-width:0}
.ish .shw3-kb .col + .col::before{content:"";position:absolute;left:0;top:-11px;bottom:-11px;border-left:1px solid var(--bd)}
.ish .shw3-kb .card{background:#fff;border:1px solid var(--bd);border-radius:9px;padding:10px;box-shadow:0 1px 2px rgba(45,45,45,.05);display:flex;flex-direction:column;gap:8px}
.ish .shw3-kb .ct-row{display:flex;align-items:flex-start;justify-content:space-between;gap:7px}
.ish .shw3-kb .ct{flex:1;min-width:0;font-size:11.5px;font-weight:500;line-height:1.35;color:#2d2d2d}
.ish .shw3-kb .emo{flex:none;font-size:14px;line-height:1.15}
.ish .shw3-kb .row{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.ish .shw3-kb .tags{display:flex;flex-wrap:wrap;gap:5px}
.ish .shw3-kb .tag{border-radius:999px;padding:2px 8px;font-size:10px;font-weight:500;white-space:nowrap}
.ish .shw3-kb .t-prod{background:#ededf0;color:#6b6b70}
.ish .shw3-kb .t-cx{background:#f7f0cf;color:#8a6a00}
.ish .shw3-kb .t-big, .ish .shw3-kb .t-jud{background:#efe9f9;color:#7d4ccf}
.ish .shw3-kb .t-urg{background:#fbe3ec;color:#c2185b}
.ish .shw3-kb .t-ok{background:#e7f3df;color:#2f7d33}
.ish .shw3-kb .t-blue{background:#e2eefb;color:#2f6fb0}
.ish .shw3-kb .t-teal{background:#d9f0ec;color:#0e7a66}
.ish .shw3-kb .cmt{display:inline-flex;align-items:center;gap:4px;color:var(--ts);font-size:10px}
.ish .shw3-kb .cmt svg{width:12px;height:12px}
.ish .shw3-kb .prog{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:6px;border-radius:4px;background:#eef3f7;padding:3px 8px;font-size:10px;color:#4d6b86}
.ish .shw3-kb .prog i{position:absolute;left:0;top:0;bottom:0;background:#dcebf7}
.ish .shw3-kb .prog.done{color:#3f7a4a;background:#eef7ef}
.ish .shw3-kb .prog.done i{background:#dff0e1}
.ish .shw3-kb .prog .l{position:relative;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ish .shw3-kb .prog .n{position:relative;font-weight:600;flex:none}
.ish .shw3-kb .foot{display:flex;align-items:center;justify-content:space-between;gap:6px}
.ish .shw3-kb .avs{display:flex;align-items:center}
.ish .shw3-kb .av{width:19px;height:19px;border-radius:50%;border:2px solid #fff;margin-left:-6px;display:inline-flex;align-items:center;justify-content:center;font-size:8.5px;font-weight:600;color:#757575;background:#e6e6e9;flex:none}
.ish .shw3-kb .av:first-child{margin-left:0}
.ish .shw3-kb .due{display:inline-flex;align-items:center;gap:4px;background:#f1f1f4;border-radius:999px;padding:2px 8px;color:#5b5b62;font-size:10px;white-space:nowrap}
.ish .shw3-kb .due svg{width:11px;height:11px}
.ish .shw3-kb .ghost{position:relative;height:107px;border-radius:9px;background:rgba(0,0,0,.05)}
.ish .shw3-kb .drag-layer{position:absolute;top:0;left:0;right:0;z-index:30;animation:hsiTravel2 5s ease-in-out infinite}
.ish .shw3-kb .drag-card{border:1px solid #e0d6f3;transform-origin:center;animation:hsiLift2 5s ease-in-out infinite}
.ish .shw3-kb .hand{position:absolute;left:58%;top:66%;transform:translate(-50%,-50%);width:34px;height:34px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.25));animation:hsiHand2 5s ease-in-out infinite;z-index:31}
@media(prefers-reduced-motion:reduce){
.ish .shw3-kb .drag-layer, .ish .shw3-kb .drag-card, .ish .shw3-kb .hand{animation:none}
.ish .shw3-kb .drag-card{box-shadow:0 1px 2px rgba(45,45,45,.06)}
}
@media(max-width:767px){
.ish .shw3-kb .drag-layer{animation:none;transform:translate(88px,24px)}
.ish .shw3-kb .drag-card{animation:none;transform:rotate(3deg) scale(1.03);box-shadow:0 14px 28px -10px rgba(45,45,45,.28)}
.ish .shw3-kb .hand{animation:none;opacity:1}
}
.ish .shw3 img{filter:none}
.ish .shw3{position:relative}
.ish .shw3 img{position:relative;z-index:1;filter:drop-shadow(0 10px 14px rgba(45,45,45,.08))}
.ish .shw3::after{content:"";position:absolute;left:4%;right:4%;bottom:-8px;height:34px;z-index:0;pointer-events:none;
  background:
    radial-gradient(46% 52% at 50% 46%,rgba(45,45,45,.17),rgba(45,45,45,0) 72%),
    radial-gradient(70% 60% at 50% 50%,rgba(45,45,45,.08),rgba(45,45,45,0) 76%)}
.ish .shw3-kb .kb{box-shadow:0 22px 34px -20px rgba(45,45,45,.28)}
@media(min-width:768px) and (max-width:1279px){
.ish .shw3-wrap{max-width:none;padding:0}
}
.ish .shw3-kb .kb .hdr--2{margin-top:0;padding-top:14px;border-top:1px solid #DDDDE2}
@keyframes hsiTravel2{0%,38%{transform:translate(0,0)}47%{transform:translate(3px,-8px)}64%,76%{transform:translate(172px,44px)}88%{transform:translate(3px,-8px)}100%{transform:translate(0,0)}}
@keyframes hsiLift2{0%,38%{transform:rotate(0) scale(1);box-shadow:0 1px 2px rgba(45,45,45,.06)}47%{transform:rotate(3deg) scale(1.03);box-shadow:0 14px 28px -10px rgba(45,45,45,.28)}88%{transform:rotate(3deg) scale(1.03);box-shadow:0 14px 28px -10px rgba(45,45,45,.28)}100%{transform:rotate(0) scale(1);box-shadow:0 1px 2px rgba(45,45,45,.06)}}
@keyframes hsiHand2{0%,38%{opacity:0}46%{opacity:1}88%{opacity:1}100%{opacity:0}}`;

/** Размеры, в которых нарисована доска-накладка. */
const BOARD_W = 720;
const BOARD_H = 433;

export default function InterfaceShowcase({
  src = DEFAULT_SRC,
  alt = 'Проекты, канбан-доска и команда в Кайтен',
  boardTitle = 'Разработка',
  className,
}: InterfaceShowcaseProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    function fit() {
      if (!box) return;
      const kb = box.querySelector<HTMLElement>('.kb');
      if (!kb) return;
      const w = box.clientWidth;
      const h = box.clientHeight;
      if (!w) return; // раскладки еще нет — ждем
      kb.style.setProperty('--kbs', String(w / BOARD_W));
      // вертикальный масштаб считаем, только когда высота известна: до загрузки
      // картинки высота накладки почти нулевая и доска схлопнулась бы в полоску
      if (h > 40) kb.style.setProperty('--kbsy', String(h / BOARD_H));
      else kb.style.removeProperty('--kbsy');
    }

    fit();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null;
    if (ro) ro.observe(box);
    window.addEventListener('resize', fit);
    const img = box.parentElement?.querySelector('img');
    img?.addEventListener('load', fit);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', fit);
      img?.removeEventListener('load', fit);
    };
  }, []);

  return (
    <div className={className ? `ish ${className}` : 'ish'}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="shw3-wrap">
        <figure className="shw3">
          <img src={src} alt={alt} />
          <div
            className="shw3-kb"
            ref={boxRef}
            aria-hidden
            dangerouslySetInnerHTML={{ __html: BOARD.replace('__TITLE__', boardTitle) }}
          />
        </figure>
      </div>
    </div>
  );
}
