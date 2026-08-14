'use client';

import React from 'react';
import { DarkTerminal, ResultCard, TPrompt, TFlag, TStr, TNum, TOk, TMut } from './DarkTerminal';

/**
 * Сценарий «Запуск проекта» лендинга Kaiten CLI: одной прогонкой скрипта
 * заводятся этапы, карточки, веха и связи — а результатом становится
 * диаграмма Ганта. Терминал в общем стиле DarkTerminal, снизу — мини-Гант
 * (язык взят из GanttChartMock: summary-плашки этапов #9034aa, цветные
 * задачи, веха-ромб, связь-зависимость), полосы «прорастают» при въезде во
 * вьюпорт. Домен: cli-community-edition.
 */
export function CliProjectGanttMock() {
  return (
    <div aria-hidden className="mx-auto w-full max-w-[600px] space-y-3">
      <DarkTerminal title="bash — кайтен@ваш-сервер">
        <div className="ln">
          <TPrompt />
          <TFlag>--json</TFlag>
          <span>project init</span>
          <TFlag>--template</TFlag>
          <TStr>roadmap</TStr>
        </div>
        <TOk>
          этапы: Инициация · Планирование · Реализация
        </TOk>
        <div className="ln">
          <TPrompt />
          <span>cards create</span>
          <TFlag>--milestone</TFlag>
          <TStr>&quot;Релиз v1&quot;</TStr>
          <TFlag>--due</TFlag>
          <TNum>2026-06-29</TNum>
        </div>
        <div className="ln">
          <TPrompt />
          <span>links add</span>
          <TFlag>--from</TFlag>
          <TNum>12</TNum>
          <TFlag>--to</TFlag>
          <TNum>18</TNum>
          <TFlag>--type</TFlag>
          <TStr>blocks</TStr>
        </div>
        <TOk>
          проект собран: 3 этапа · 6 задач · <TMut>2 связи</TMut>
        </TOk>
      </DarkTerminal>

      <ResultCard>
        <MiniGantt />
      </ResultCard>
    </div>
  );
}

/* ── мини-диаграмма Ганта ──────────────────────────────────────────────
   13-дневный таймлайн, 4 строки. Полосы «прорастают» слева, веха-ромб
   всплывает, связь-зависимость дорисовывается — по попаданию во вьюпорт. */

const DAYS = 13;
const pct = (d: number) => `${(d / DAYS) * 100}%`;

type Row =
  | { name: string; kind: 'summary' | 'green' | 'violet'; s: number; len: number }
  | { name: string; kind: 'milestone'; at: number };

const ROWS: Row[] = [
  { name: 'Инициация', kind: 'summary', s: 0, len: 3 },
  { name: 'Планирование', kind: 'green', s: 3, len: 4 },
  { name: 'Реализация', kind: 'violet', s: 7, len: 5 },
  { name: 'Релиз v1', kind: 'milestone', at: 12 },
];

const BAR_FILL: Record<'summary' | 'green' | 'violet', string> = {
  summary: '#9034aa',
  green: '#5cb85c',
  violet: '#7d4ccf',
};

const GCSS = `
.mg{font-family:var(--font-sans,'Roboto',system-ui,-apple-system,'Segoe UI',sans-serif)}
.mg__head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.mg__title{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0;color:#757575}
.mg__month{font-size:10.5px;color:#9e9e9e}
.mg__body{display:flex;gap:8px}
.mg__labels{width:92px;flex:none}
.mg__labels div{height:26px;display:flex;align-items:center;font-size:11.5px;color:#2d2d2d;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mg__labels div.sum{font-weight:600}
.mg__canvas{position:relative;flex:1;height:104px}
.mg__wk{position:absolute;top:0;bottom:0;background:#f6f6f7}
.mg__bar{position:absolute;height:14px;border-radius:5px;width:0;transition:width .7s cubic-bezier(.2,.6,.2,1)}
.mg__bar.sum{height:11px;border-radius:3px}
.mg.is-play .mg__bar{width:var(--w)}
.mg__ms{position:absolute;width:12px;height:12px;border-radius:2px;background:#f5a623;
  transform:translate(-50%,-50%) rotate(45deg) scale(0);transition:transform .45s ease .55s}
.mg.is-play .mg__ms{transform:translate(-50%,-50%) rotate(45deg) scale(1)}
.mg__dep{position:absolute;width:1.5px;background:#9e9e9e;height:0;transition:height .4s ease .5s}
.mg.is-play .mg__dep{height:26px}
.mg__dep::after{content:'';position:absolute;left:50%;bottom:-1px;transform:translateX(-50%);
  border-left:3px solid transparent;border-right:3px solid transparent;border-top:4px solid #9e9e9e;opacity:0;transition:opacity .2s ease .9s}
.mg.is-play .mg__dep::after{opacity:1}
@media(prefers-reduced-motion:reduce){
  .mg__bar{width:var(--w);transition:none}
  .mg__ms,.mg__dep{transition:none}
  .mg.is-reduced .mg__ms{transform:translate(-50%,-50%) rotate(45deg) scale(1)}
}
`;

function MiniGantt() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-play');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            el.classList.add('is-play');
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    const t = setTimeout(() => el.classList.add('is-play'), 2500);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="mg" ref={ref}>
      <style dangerouslySetInnerHTML={{ __html: GCSS }} />
      <div className="mg__head">
        <span className="mg__title">Диаграмма Ганта</span>
        <span className="mg__month">июнь 2026</span>
      </div>
      <div className="mg__body">
        <div className="mg__labels">
          {ROWS.map((r) => (
            <div key={r.name} className={r.kind === 'summary' ? 'sum' : undefined}>
              {r.name}
            </div>
          ))}
        </div>
        <div className="mg__canvas">
          {/* лёгкая заливка «выходных» для читаемости таймлайна */}
          <div className="mg__wk" style={{ left: pct(5), width: pct(2) }} />
          <div className="mg__wk" style={{ left: pct(12), width: pct(1) }} />

          {ROWS.map((r, i) =>
            r.kind === 'milestone' ? (
              <div
                key={r.name}
                className="mg__ms"
                style={{ left: pct(r.at), top: i * 26 + 13 }}
                title={r.name}
              />
            ) : (
              <div
                key={r.name}
                className={`mg__bar ${r.kind === 'summary' ? 'sum' : ''}`}
                style={
                  {
                    left: pct(r.s),
                    top: i * 26 + (26 - (r.kind === 'summary' ? 11 : 14)) / 2,
                    background: BAR_FILL[r.kind],
                    ['--w' as string]: pct(r.len),
                  } as React.CSSProperties
                }
              />
            ),
          )}

          {/* связь-зависимость: Планирование → Реализация (день 7) */}
          <div className="mg__dep" style={{ left: pct(7), top: 1 * 26 + 13 }} />
        </div>
      </div>
    </div>
  );
}
