import { useEffect, useRef, useState } from 'react';

/**
 * Diagrams (Diafram) — модуль «Отчёты/Диаграммы» (секция #reports лендинга,
 * «Руководитель разговаривает с бизнесом на языке данных»).
 *
 * 6 нативных SVG-диаграмм в карточках: сгорание, скорость команды, время
 * выполнения (контрольная), накопительная (CFD), спектральная, пропускная
 * способность. Заголовок/подзаголовок — через пропсы; сами графики встроены.
 *
 * Раскладка (правила адаптации):
 *  - ≥1280: сетка 3 колонки, gap 32;
 *  - 901–1279: 3 колонки, gap 24;
 *  - ≤900: горизонтальная лента-скроллер (свайп) + стрелки ‹ ›, карточка
 *    clamp(308px,90%,360px), scroll-snap;
 *  - ≤767: заголовок/подзаголовок влево, меньший отступ под шапкой.
 *
 * Легенда прижата к низу карточки (одинаковый уровень во всех карточках).
 * Self-contained: scoped `<style>` под `.diagrams-mock`, палитра V01.
 */

export interface DiagramsProps {
  title?: string;
  subtitle?: string;
}

const STYLE = `
.diagrams-mock{
  --sp-1:4px; --sp-4:16px; --sp-5:20px; --sp-6:24px; --sp-8:32px; --sp-12:48px;
  --radius-2xl:16px;
  --fw-semi:600; --fw-reg:400;
  --brand-100:#7d4ccf; --brand-12:#efe9f9; --brand-hover:#6b3fbf;
  --text-title:#2d2d2d; --text-secondary:#757575; --border:#e0e0e0;
  font-family:'Roboto',system-ui,-apple-system,sans-serif; color:var(--text-title);
  display:block; width:100%; padding:48px var(--sp-4); box-sizing:border-box;
}
.diagrams-mock, .diagrams-mock *{box-sizing:border-box;}
.diagrams-mock .s-head{display:flex; flex-direction:column; gap:var(--sp-4); align-items:center; text-align:center; margin:0 auto var(--sp-12); max-width:760px;}
.diagrams-mock .sh__heading{font-size:36px; line-height:40px; font-weight:var(--fw-semi); color:var(--text-title); margin:0;}
.diagrams-mock .sh__desc{font-size:16px; line-height:24px; font-weight:var(--fw-reg); color:#2d2d2d; margin:0;}

.diagrams-mock .repts{display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:var(--sp-6);}
@media(min-width:1280px){.diagrams-mock .repts{gap:var(--sp-8);}}
.diagrams-mock .rept{background:#fff; border:1px solid var(--border); border-radius:var(--radius-2xl); padding:var(--sp-6) var(--sp-6) var(--sp-5); display:flex; flex-direction:column;}
.diagrams-mock .rept__t{font-size:15px; line-height:20px; font-weight:var(--fw-semi); color:var(--text-title); margin-bottom:var(--sp-1);}
.diagrams-mock .rept svg{display:block; width:100%; height:auto;}
.diagrams-mock .rept__lg{display:flex; flex-wrap:wrap; gap:5px 16px; margin-top:auto; padding-top:12px;}
.diagrams-mock .rept__lg span{display:inline-flex; align-items:center; gap:4px; flex:none; white-space:nowrap; font-size:11px; line-height:1; color:var(--text-secondary);}

.diagrams-mock .repts__nav{display:none; justify-content:center; gap:14px; margin-top:var(--sp-5);}
.diagrams-mock .repts__navbtn{width:48px; height:48px; border-radius:9999px; border:1px solid var(--border); background:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--brand-100); transition:background .18s, border-color .18s, color .18s;}
.diagrams-mock .repts__navbtn:hover:not(:disabled){background:var(--brand-12); border-color:#c9b8ec; color:var(--brand-hover);}
.diagrams-mock .repts__navbtn:disabled{color:var(--border); cursor:default;}
.diagrams-mock .repts__navbtn svg{width:24px; height:24px;}

@media(max-width:900px){
  .diagrams-mock .repts{display:flex; grid-template-columns:none; overflow-x:auto; gap:var(--sp-4); scroll-snap-type:x mandatory; padding-bottom:12px; scrollbar-width:none; -webkit-overflow-scrolling:touch;}
  .diagrams-mock .repts::-webkit-scrollbar{display:none;}
  .diagrams-mock .repts > .rept{flex:0 0 auto; width:clamp(308px,90%,360px); scroll-snap-align:start;}
  .diagrams-mock .repts__nav{display:flex;}
}
@media(max-width:767px){
  .diagrams-mock{padding:32px var(--sp-4);}
  .diagrams-mock .s-head{align-items:flex-start; text-align:left; margin:0 0 var(--sp-6);}
  .diagrams-mock .sh__heading{font-size:24px; line-height:32px;}
}
`;

const CHARTS = `<div class="rept"><div class="rept__t">Диаграмма сгорания</div><svg viewBox="0 0 280 150" role="img" aria-label="Диаграмма сгорания"><g stroke="#eee" stroke-width="1"><line x1="6" y1="30" x2="274" y2="30"></line><line x1="6" y1="60" x2="274" y2="60"></line><line x1="6" y1="90" x2="274" y2="90"></line><line x1="6" y1="120" x2="274" y2="120"></line></g><line x1="10" y1="20" x2="270" y2="122" stroke="#5aa5e8" stroke-width="1.5" stroke-dasharray="4 3"></line><polyline points="10,20 52,32 52,46 96,46 96,62 140,62 140,90 184,90 184,106 228,106 228,120 270,120" fill="none" stroke="#ffb340" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></polyline><g><rect x="46" y="128" width="12" height="10" fill="#9569d4"></rect><rect x="90" y="130" width="12" height="8" fill="#9569d4"></rect><rect x="90" y="125" width="12" height="4" fill="#ee6b5f"></rect><rect x="134" y="128" width="12" height="10" fill="#9569d4"></rect><rect x="178" y="132" width="12" height="6" fill="#9569d4"></rect><rect x="10" y="129" width="12" height="9" fill="#9569d4"></rect><rect x="10" y="124" width="12" height="4" fill="#bcd451"></rect></g><g fill="#5aa5e8"><circle cx="10" cy="20" r="2.4"></circle><circle cx="140" cy="90" r="2.4"></circle><circle cx="270" cy="120" r="2.4"></circle></g></svg><div class="rept__lg"><span><i style="width:8px;height:8px;border-radius:2px;background:#9569d4;flex:none"></i>Завершено</span><span><i style="width:12px;height:0;border-top:2px solid #ffb340;flex:none"></i>Осталось</span><span><i style="width:12px;height:0;border-top:2px dashed #5aa5e8;flex:none"></i>Идеальное</span></div></div><div class="rept"><div class="rept__t">Скорость команды</div><svg viewBox="0 0 280 150" role="img" aria-label="Скорость команды"><g stroke="#eee" stroke-width="1"><line x1="6" y1="30" x2="274" y2="30"></line><line x1="6" y1="60" x2="274" y2="60"></line><line x1="6" y1="90" x2="274" y2="90"></line><line x1="6" y1="120" x2="274" y2="120"></line></g><rect x="16" y="116" width="24" height="16" fill="#ffb340"></rect><rect x="16" y="102" width="24" height="14" fill="#75757a"></rect><rect x="16" y="94" width="24" height="8" fill="#5aa5e8"></rect><rect x="52" y="120" width="24" height="12" fill="#ffb340"></rect><rect x="52" y="100" width="24" height="20" fill="#6cbd72"></rect><rect x="88" y="102" width="24" height="30" fill="#ffb340"></rect><rect x="88" y="82" width="24" height="20" fill="#5aa5e8"></rect><rect x="124" y="116" width="24" height="16" fill="#ffb340"></rect><rect x="124" y="100" width="24" height="16" fill="#75757a"></rect><rect x="160" y="116" width="24" height="16" fill="#5aa5e8"></rect><rect x="196" y="126" width="24" height="6" fill="#6cbd72"></rect><rect x="196" y="100" width="24" height="26" fill="#75757a"></rect><rect x="196" y="84" width="24" height="16" fill="#5aa5e8"></rect><rect x="232" y="126" width="24" height="6" fill="#ffb340"></rect><rect x="232" y="78" width="24" height="48" fill="#75757a"></rect><line x1="6" y1="132" x2="274" y2="132" stroke="#e0e0e0" stroke-width="1"></line></svg><div class="rept__lg"><span><i style="width:8px;height:8px;border-radius:2px;background:#5aa5e8;flex:none"></i>Frontend</span><span><i style="width:8px;height:8px;border-radius:2px;background:#75757a;flex:none"></i>Тест</span><span><i style="width:8px;height:8px;border-radius:2px;background:#6cbd72;flex:none"></i>Дизайн</span><span><i style="width:8px;height:8px;border-radius:2px;background:#ffb340;flex:none"></i>Аналитика</span></div></div><div class="rept"><div class="rept__t">Время выполнения задач</div><svg viewBox="0 0 280 150" role="img" aria-label="Время выполнения задач"><g stroke="#eee" stroke-width="1"><line x1="6" y1="30" x2="274" y2="30"></line><line x1="6" y1="60" x2="274" y2="60"></line><line x1="6" y1="90" x2="274" y2="90"></line><line x1="6" y1="120" x2="274" y2="120"></line></g><line x1="6" y1="102" x2="274" y2="102" stroke="#ee6b5f" stroke-width="1.5"></line><g><circle cx="16" cy="134" r="2.6" fill="#ee6b5f"></circle><circle cx="28" cy="130" r="2.6" fill="#ee6b5f"></circle><circle cx="40" cy="128" r="2.6" fill="#ee6b5f"></circle><circle cx="52" cy="132" r="2.6" fill="#5aa5e8"></circle><circle cx="64" cy="126" r="2.6" fill="#ee6b5f"></circle><circle cx="76" cy="133" r="2.6" fill="#ee6b5f"></circle><circle cx="88" cy="130" r="2.6" fill="#ee6b5f"></circle><circle cx="95" cy="28" r="3.2" fill="#9569d4"></circle><circle cx="100" cy="134" r="2.6" fill="#ee6b5f"></circle><circle cx="112" cy="131" r="2.6" fill="#6cbd72"></circle><circle cx="124" cy="133" r="2.6" fill="#ee6b5f"></circle><circle cx="136" cy="128" r="2.6" fill="#ee6b5f"></circle><circle cx="148" cy="134" r="2.6" fill="#ee6b5f"></circle><circle cx="150" cy="42" r="3.2" fill="#9569d4"></circle><circle cx="160" cy="130" r="2.6" fill="#ee6b5f"></circle><circle cx="172" cy="132" r="2.6" fill="#5aa5e8"></circle><circle cx="184" cy="88" r="3.2" fill="#ffb340"></circle><circle cx="190" cy="134" r="2.6" fill="#ee6b5f"></circle><circle cx="196" cy="131" r="2.6" fill="#ee6b5f"></circle><circle cx="205" cy="96" r="3.2" fill="#ee6b5f"></circle><circle cx="208" cy="133" r="2.6" fill="#ee6b5f"></circle><circle cx="215" cy="66" r="3.2" fill="#9e9e9e"></circle><circle cx="220" cy="130" r="2.6" fill="#ee6b5f"></circle><circle cx="232" cy="134" r="2.6" fill="#ee6b5f"></circle><circle cx="235" cy="92" r="3.2" fill="#5aa5e8"></circle><circle cx="244" cy="131" r="2.6" fill="#ee6b5f"></circle><circle cx="256" cy="133" r="2.6" fill="#ee6b5f"></circle><circle cx="268" cy="129" r="2.6" fill="#ee6b5f"></circle></g><line x1="6" y1="138" x2="274" y2="138" stroke="#e0e0e0" stroke-width="1"></line></svg><div class="rept__lg"><span><i style="width:8px;height:8px;border-radius:50%;background:#5aa5e8;flex:none"></i>Карточки</span><span><i style="width:12px;height:0;border-top:2px solid #ee6b5f;flex:none"></i>SLA</span></div></div><div class="rept"><div class="rept__t">Накопительная диаграмма потока</div><svg viewBox="0 0 280 150" role="img" aria-label="Накопительная диаграмма потока"><g stroke="#eee" stroke-width="1"><line x1="6" y1="30" x2="274" y2="30"></line><line x1="6" y1="60" x2="274" y2="60"></line><line x1="6" y1="90" x2="274" y2="90"></line><line x1="6" y1="120" x2="274" y2="120"></line></g><polygon points="6,138 6,82 46,77 86,71 126,60 166,56 206,50 246,46 274,44 274,138" fill="#5aa5e8" opacity="0.85"></polygon><polygon points="6,138 6,112 46,106 86,100 126,90 166,84 206,78 246,72 274,68 274,138" fill="#6cbd72" opacity="0.9"></polygon><polygon points="6,138 6,118 46,113 86,107 126,97 166,91 206,85 246,79 274,74 274,138" fill="#ffb340"></polygon></svg><div class="rept__lg"><span><i style="width:8px;height:8px;border-radius:2px;background:#ffb340;flex:none"></i>Готово</span><span><i style="width:8px;height:8px;border-radius:2px;background:#6cbd72;flex:none"></i>В работе</span><span><i style="width:8px;height:8px;border-radius:2px;background:#5aa5e8;flex:none"></i>Очередь</span></div></div><div class="rept"><div class="rept__t">Спектральная диаграмма</div><svg viewBox="0 0 280 150" role="img" aria-label="Спектральная диаграмма"><g stroke="#eee" stroke-width="1"><line x1="6" y1="30" x2="274" y2="30"></line><line x1="6" y1="60" x2="274" y2="60"></line><line x1="6" y1="90" x2="274" y2="90"></line><line x1="6" y1="120" x2="274" y2="120"></line></g><rect x="12" y="20" width="22" height="118" fill="#5aa5e8"></rect><rect x="44" y="97" width="22" height="41" fill="#5aa5e8"></rect><rect x="76" y="132" width="22" height="6" fill="#5aa5e8"></rect><rect x="108" y="132" width="22" height="6" fill="#5aa5e8"></rect><rect x="140" y="120" width="22" height="18" fill="#5aa5e8"></rect><rect x="172" y="126" width="22" height="12" fill="#5aa5e8"></rect><rect x="204" y="132" width="22" height="6" fill="#5aa5e8"></rect><rect x="236" y="132" width="22" height="6" fill="#5aa5e8"></rect><line x1="66" y1="18" x2="66" y2="138" stroke="#6b78c4" stroke-width="1.3"></line><line x1="128" y1="18" x2="128" y2="138" stroke="#ee6b5f" stroke-width="1.3"></line><line x1="6" y1="138" x2="274" y2="138" stroke="#e0e0e0" stroke-width="1"></line></svg><div class="rept__lg"><span><i style="width:8px;height:8px;border-radius:2px;background:#5aa5e8;flex:none"></i>Карточки</span><span><i style="width:12px;height:0;border-top:2px solid #6b78c4;flex:none"></i>Среднее</span><span><i style="width:12px;height:0;border-top:2px solid #ee6b5f;flex:none"></i>Перцентиль</span></div></div><div class="rept"><div class="rept__t">Пропускная способность</div><svg viewBox="0 0 280 150" role="img" aria-label="Пропускная способность"><g stroke="#eee" stroke-width="1"><line x1="6" y1="30" x2="274" y2="30"></line><line x1="6" y1="60" x2="274" y2="60"></line><line x1="6" y1="90" x2="274" y2="90"></line><line x1="6" y1="120" x2="274" y2="120"></line></g><rect x="28" y="66" width="18" height="72" fill="#5aa5e8"></rect><rect x="28" y="54" width="18" height="12" fill="#75757a"></rect><rect x="50" y="83" width="18" height="55" fill="#5aa5e8"></rect><rect x="50" y="69" width="18" height="14" fill="#75757a"></rect><rect x="50" y="64" width="18" height="5" fill="#6cbd72"></rect><rect x="112" y="54" width="18" height="84" fill="#5aa5e8"></rect><rect x="112" y="46" width="18" height="8" fill="#75757a"></rect><rect x="112" y="43" width="18" height="3" fill="#6cbd72"></rect><rect x="134" y="57" width="18" height="81" fill="#5aa5e8"></rect><rect x="134" y="51" width="18" height="6" fill="#75757a"></rect><rect x="134" y="34" width="18" height="17" fill="#6cbd72"></rect><rect x="196" y="84" width="18" height="54" fill="#5aa5e8"></rect><rect x="196" y="81" width="18" height="3" fill="#75757a"></rect><rect x="218" y="76" width="18" height="62" fill="#5aa5e8"></rect><rect x="218" y="68" width="18" height="8" fill="#75757a"></rect><line x1="6" y1="138" x2="274" y2="138" stroke="#e0e0e0" stroke-width="1"></line></svg><div class="rept__lg"><span><i style="width:8px;height:8px;border-radius:2px;background:#5aa5e8;flex:none"></i>Expedite</span><span><i style="width:8px;height:8px;border-radius:2px;background:#75757a;flex:none"></i>Обратная связь</span><span><i style="width:8px;height:8px;border-radius:2px;background:#6cbd72;flex:none"></i>Standard</span></div></div>`;

export function Diagrams({
  title = 'Руководитель разговаривает с бизнесом на языке данных, а не ощущений',
  subtitle = 'Кайтен собирает 13 автоматических отчетов — для канбан-скрам-команд и не только. Получайте подробную статистику и делайте выводы',
}: DiagramsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const update = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setPrevDisabled(el.scrollLeft <= 2);
    setNextDisabled(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  };

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector('.rept') as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 16;
    const step = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section className="diagrams-mock" aria-label="Отчёты и диаграммы">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="s-head">
        <h2 className="sh__heading">{title}</h2>
        {subtitle ? <p className="sh__desc">{subtitle}</p> : null}
      </div>
      <div className="repts" ref={scrollerRef} dangerouslySetInnerHTML={{ __html: CHARTS }} />
      <div className="repts__nav" role="group" aria-label="Листать отчёты">
        <button type="button" className="repts__navbtn" aria-label="Предыдущий отчёт" disabled={prevDisabled} onClick={() => scrollByCard(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button type="button" className="repts__navbtn" aria-label="Следующий отчёт" disabled={nextDisabled} onClick={() => scrollByCard(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
    </section>
  );
}

export default Diagrams;
