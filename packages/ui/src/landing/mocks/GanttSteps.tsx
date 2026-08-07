'use client';

/**
 * GanttSteps — этапы внедрения диаграммой Ганта: слева пронумерованный список
 * с иконкой, заголовком и описанием, справа полосы на общей шкале времени.
 *
 * Эталон стиля — блок «Как проходит внедрение» лендинга «Кайтен on-premise».
 *
 * Стиль (не менять, заполнять новым контентом через пропсы):
 * - Белая карточка, радиус 16px (на <768 — 12px), паддинг 32px (на <1024 — 24px).
 * - Десктоп (≥1024): колонка описаний 400px, справа шкала с четырьмя
 *   вертикальными направляющими на 20/40/60/80%.
 * - Планшет и мобилка (<1024): описание и шкала в одну колонку, направляющие скрыты.
 * - Номера 26px: первый и последний — фиолетовые (--brand-100), промежуточные
 *   светлые (--brand-12 + фиолетовый текст). Между номерами вертикальная связка.
 * - Полосы задаются в процентах шкалы; цвет — из палитры этапов, по умолчанию
 *   лиловый. Высота полосы 14px, радиус 7px.
 * - Появление по скроллу: полосы выезжают слева направо по очереди с шагом 130ms.
 *   prefers-reduced-motion — всё сразу, без анимации.
 */
import React, { useEffect, useRef } from 'react';

export type GanttStep = {
  /** Заголовок этапа — короткий, без точки на конце */
  title: React.ReactNode;
  /** Описание этапа, 1–2 предложения */
  text: React.ReactNode;
  /** Иконка 18×18 (line-стиль, currentColor) — необязательна */
  icon?: React.ReactNode;
  /** Начало полосы на шкале, % от ширины (0–100) */
  start: number;
  /** Длина полосы, % от ширины шкалы */
  width: number;
  /** Цвет полосы; по умолчанию — лиловый из палитры */
  color?: string;
};

export type GanttStepsProps = {
  /** Этапы внедрения, обычно 4–7 */
  steps: GanttStep[];
  /** Подпись для скринридеров */
  ariaLabel?: string;
};

const BAR_COLORS = ['#c9b6ec', '#a7cdf6', '#b7e0c0', '#f6d79a', '#eab4c8', '#9fd8d2', '#c9b6ec'];

const css = `
.gts{position:relative;font-family:'Roboto',system-ui,sans-serif;color:#2d2d2d;
  background:#fff;border-radius:16px;padding:32px;overflow:hidden}
.gts__gridlines{position:absolute;top:32px;bottom:32px;left:calc(32px + 400px);right:32px;pointer-events:none}
.gts__gridlines i{position:absolute;top:0;bottom:0;width:1px;background:#f5f5f5}
.gts__gridlines i:nth-child(1){left:20%}
.gts__gridlines i:nth-child(2){left:40%}
.gts__gridlines i:nth-child(3){left:60%}
.gts__gridlines i:nth-child(4){left:80%}
.gts__row{position:relative;display:grid;grid-template-columns:400px 1fr;align-items:center;
  column-gap:24px;padding:12px 0}
.gts__row:not(:last-child)::before{content:"";position:absolute;left:13px;top:38px;bottom:-12px;
  width:2px;background:rgba(125,76,207,.48);border-radius:1px;z-index:0}
.gts__label{display:flex;align-items:flex-start;gap:12px}
.gts__num{position:relative;z-index:1;display:inline-flex;width:26px;height:26px;border-radius:50%;
  background:#7d4ccf;color:#fff;align-items:center;justify-content:center;
  font-size:14px;font-weight:600;flex:none}
.gts__row:not(:first-child):not(:last-child) .gts__num{background:#efe9f9;color:#7d4ccf}
.gts__lt{display:flex;flex-direction:column;gap:2px}
.gts__lt b{display:flex;align-items:center;gap:8px;font-size:16px;line-height:24px;font-weight:500}
.gts__lt small{font-size:14px;line-height:20px;color:#757575}
.gts__ic{flex:none;display:inline-flex;width:18px;height:18px;color:#7d4ccf}
.gts__ic svg{width:18px;height:18px}
.gts__track{position:relative;height:14px}
.gts__bar{position:absolute;top:0;height:14px;border-radius:7px;
  transform:scaleX(0);transform-origin:left center;opacity:0;
  transition:transform .7s cubic-bezier(.2,.7,.3,1),opacity .45s ease}
.gts.on .gts__bar{transform:scaleX(1);opacity:1}
@media(max-width:1023px){
  .gts{padding:24px}
  .gts__gridlines{display:none}
  .gts__row{grid-template-columns:1fr;row-gap:8px}
  .gts__row:not(:last-child)::before{bottom:-8px}
}
@media(max-width:767px){.gts{border-radius:12px}}
@media(prefers-reduced-motion:reduce){
  .gts__bar{transform:none;opacity:1;transition:none}
}
`;

export default function GanttSteps({ steps, ariaLabel }: GanttStepsProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    function upd() {
      if (!root) return;
      const r = root.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // включаем, когда верх блока поднялся выше 85% экрана
      if (r.top < vh * 0.85 && r.bottom > 0) root.classList.add('on');
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        upd();
      });
    }

    upd();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // Страховка: во встроенных браузерах scroll-события могут не доходить
    const timer = window.setInterval(upd, 200);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.clearInterval(timer);
    };
  }, [steps.length]);

  return (
    <div ref={rootRef} className="gts" aria-label={ariaLabel}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="gts__gridlines" aria-hidden>
        <i />
        <i />
        <i />
        <i />
      </div>
      {steps.map((step, i) => (
        <div key={i} className="gts__row">
          <div className="gts__label">
            <span className="gts__num">{i + 1}</span>
            <span className="gts__lt">
              <b>
                {step.icon ? <span className="gts__ic">{step.icon}</span> : null}
                {step.title}
              </b>
              <small>{step.text}</small>
            </span>
          </div>
          <div className="gts__track">
            <i
              className="gts__bar"
              style={{
                left: `${step.start}%`,
                width: `${step.width}%`,
                background: step.color ?? BAR_COLORS[i % BAR_COLORS.length],
                transitionDelay: `${(i * 0.13).toFixed(2)}s`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
