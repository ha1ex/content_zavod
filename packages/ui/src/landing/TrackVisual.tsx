/**
 * TrackVisual — «подпись трека» в шапке блока спикеров (концепт «Разгон ↔ Готово»).
 * Пара в неоновой линейной эстетике мотива hero (Joy Division):
 *
 *  • acceleration («Ускорение») — пучок горизонтальных штрихов-«трасс» разной
 *    длины (эффект скорости), прижаты вправо как «прилетевшие» трассеры.
 *  • efficiency  («Эффективность») — мини-чеклист «всё выполнено»: строки-задачи
 *    с галочками — образ завершённости в духе Kaiten.
 *
 * СТАТИКА: без SMIL-анимации — раньше непрерывный морфинг/пробег пересчитывался
 * на главном потоке каждый кадр и давал скролл-джанк. Неон (glow) статичный —
 * рисуется один раз. Цвет из currentColor (= --color-text-accent трека).
 */

export interface TrackVisualProps {
  variant: 'acceleration' | 'efficiency';
  /** Слово трека рядом с графикой, напр. «Ускорение». */
  label?: string;
}

/** Штрихи-«трассы» для ускорения: y и длина. */
const STREAKS = [
  { y: 5, w: 70 },
  { y: 13, w: 46 },
  { y: 22, w: 90 },
  { y: 30, w: 40 },
  { y: 38, w: 62 },
  { y: 44, w: 32 },
] as const;

/** Строки чеклиста: y верх строки, длина строки-задачи. */
const TASKS = [
  { y: 3, w: 150 },
  { y: 18, w: 118 },
  { y: 33, w: 166 },
] as const;

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
                x={190 - s.w}
                y={s.y}
                width={s.w}
                height={3}
                rx={1.5}
                fill="url(#tv-accel-grad)"
                opacity={0.9}
              />
            ))}
          </>
        ) : (
          <>
            {TASKS.map((t, i) => (
              <g key={i}>
                <rect
                  className="track-visual__task"
                  x={22}
                  y={t.y + 3}
                  width={t.w}
                  height={6}
                  rx={3}
                  opacity={0.92}
                />
                <rect
                  className="track-visual__box"
                  x={2}
                  y={t.y}
                  width={12}
                  height={12}
                  rx={3}
                />
                <path
                  className="track-visual__tick"
                  d={`M4.6,${(t.y + 6.4).toFixed(1)} l2.3,2.3 l5,-6.2`}
                  strokeWidth={2}
                />
              </g>
            ))}
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
