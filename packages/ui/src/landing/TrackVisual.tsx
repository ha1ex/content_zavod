/**
 * TrackVisual — «подпись трека» в шапке блока спикеров (концепт «Разгон ↔ Готово»).
 * Пара в неоновой линейной эстетике мотива hero (Joy Division):
 *
 *  • acceleration («Ускорение») — пучок горизонтальных штрихов-«трасс» разной
 *    длины, которые с ускорением простреливают слева направо (эффект скорости).
 *  • efficiency  («Эффективность») — мини-чеклист: задачи отмечаются готовыми
 *    одна за другой (галочки зажигаются, строки догораются) — «доводим дела до
 *    конца». Образ завершённости в духе Kaiten, без ассоциации с «загрузкой».
 *
 * Цвет берётся из currentColor (= --color-text-accent трека: фиолет/циан), так
 * что фиолетовый первый день и циановый второй раскрашиваются автоматически.
 * Анимация — SMIL + CSS-glow, без JS: работает и в статичной выгрузке.
 */

export interface TrackVisualProps {
  variant: 'acceleration' | 'efficiency';
  /** Слово трека рядом с графикой, напр. «Ускорение». */
  label?: string;
}

/** Штрихи-«трассы» для ускорения: y, длина, длительность, сдвиг фазы. */
const STREAKS = [
  { y: 5, w: 70, dur: 1.15, begin: '-0.10s' },
  { y: 13, w: 46, dur: 0.95, begin: '-0.60s' },
  { y: 22, w: 90, dur: 1.35, begin: '-0.30s' },
  { y: 30, w: 40, dur: 0.9, begin: '-0.85s' },
  { y: 38, w: 62, dur: 1.1, begin: '-0.45s' },
  { y: 44, w: 32, dur: 0.8, begin: '-0.20s' },
] as const;

/** Строки чеклиста: y верх строки, длина строки-задачи, фаза отметки (доля цикла). */
const TASKS = [
  { y: 3, w: 150, p: 0.12 },
  { y: 18, w: 118, p: 0.28 },
  { y: 33, w: 166, p: 0.44 },
] as const;

const CYCLE = '3.4s';

export function TrackVisual({ variant, label }: TrackVisualProps) {
  return (
    <div className="track-visual" aria-hidden>
      <style>{CSS}</style>
      {label && <span className="track-visual__label">{label}</span>}
      <svg
        className="track-visual__svg"
        viewBox="0 0 200 48"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        {variant === 'acceleration' ? (
          <>
            <defs>
              <linearGradient id="tv-accel-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="currentColor" stopOpacity="0" />
                <stop offset="1" stopColor="currentColor" stopOpacity="1" />
              </linearGradient>
            </defs>
            {STREAKS.map((s, i) => (
              <rect
                key={i}
                className="track-visual__streak"
                x={-s.w}
                y={s.y}
                width={s.w}
                height={3}
                rx={1.5}
                fill="url(#tv-accel-grad)"
              >
                <animate
                  attributeName="x"
                  values={`${-s.w};210`}
                  dur={`${s.dur}s`}
                  begin={s.begin}
                  calcMode="spline"
                  keyTimes="0;1"
                  keySplines="0.3 0 1 1"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.16;0.72;1"
                  dur={`${s.dur}s`}
                  begin={s.begin}
                  repeatCount="indefinite"
                />
              </rect>
            ))}
          </>
        ) : (
          <>
            {TASKS.map((t, i) => {
              const p = t.p;
              const tickBegin = p.toFixed(2);
              const tickMid = (p + 0.09).toFixed(2);
              const taskMid = (p + 0.06).toFixed(2);
              return (
                <g key={i}>
                  {/* Строка-задача: тускла, «догорается» при отметке */}
                  <rect
                    className="track-visual__task"
                    x={22}
                    y={t.y + 3}
                    width={t.w}
                    height={6}
                    rx={3}
                    opacity={0.22}
                  >
                    <animate
                      attributeName="opacity"
                      values="0.22;0.22;0.92;0.92;0.22"
                      keyTimes={`0;${tickBegin};${taskMid};0.86;1`}
                      dur={CYCLE}
                      repeatCount="indefinite"
                    />
                  </rect>
                  {/* Чекбокс */}
                  <rect
                    className="track-visual__box"
                    x={2}
                    y={t.y}
                    width={12}
                    height={12}
                    rx={3}
                  />
                  {/* Галочка «готово» — прочерчивается */}
                  <path
                    className="track-visual__tick"
                    d={`M4.6,${(t.y + 6.4).toFixed(1)} l2.3,2.3 l5,-6.2`}
                    strokeWidth={2}
                    strokeDasharray={12}
                    strokeDashoffset={12}
                    opacity={0}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="12;12;0;0"
                      keyTimes={`0;${tickBegin};${tickMid};1`}
                      dur={CYCLE}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0;1;1;0"
                      keyTimes={`0;${tickBegin};${(p + 0.03).toFixed(2)};0.86;1`}
                      dur={CYCLE}
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              );
            })}
          </>
        )}
      </svg>
    </div>
  );
}

const CSS = `
.track-visual{
  display:flex;
  align-items:center;
  gap:0.75rem;
  color:var(--color-text-accent);
}
@media (min-width:640px){ .track-visual{ gap:1rem; } }
.track-visual__label{
  font-size:1.125rem;
  font-weight:600;
  text-transform:uppercase;
  letter-spacing:0.02em;
  white-space:nowrap;
  text-shadow:0 0 18px color-mix(in srgb, currentColor 55%, transparent);
}
@media (min-width:640px){ .track-visual__label{ font-size:1.25rem; } }
.track-visual__svg{
  display:block;
  height:2.75rem;
  width:10rem;
  flex-shrink:0;
  overflow:visible;
}
@media (min-width:640px){ .track-visual__svg{ width:13rem; } }
.track-visual__streak{
  mix-blend-mode:screen;
  filter:drop-shadow(0 0 3px currentColor) drop-shadow(0 0 6px currentColor);
}
.track-visual__task{
  fill:currentColor;
  mix-blend-mode:screen;
  filter:drop-shadow(0 0 3px currentColor) drop-shadow(0 0 6px currentColor);
}
.track-visual__box{
  fill:none;
  stroke:currentColor;
  stroke-width:1.4;
  opacity:0.4;
}
.track-visual__tick{
  fill:none;
  stroke:currentColor;
  stroke-linecap:round;
  stroke-linejoin:round;
  filter:drop-shadow(0 0 3px currentColor) drop-shadow(0 0 7px currentColor);
}
`;
