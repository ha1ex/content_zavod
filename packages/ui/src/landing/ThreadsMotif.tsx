/**
 * ThreadsMotif — фирменный мотив: много светящихся неоновых нитей разной
 * толщины и цвета. ПОКОЙ — ровные параллельные линии без искажения. ИСКАЖЕНИЕ —
 * знаковая волновая гряда в духе обложки Joy Division «Unknown Pleasures»
 * (ровные по краям линии с грядой острых пиков в центре, пики выше в средних
 * рядах; нижние линии перекрывают верхние — hidden-line). Цикл: покой → гряда
 * поднимается и вибрирует → покой. Метафора «из хаоса — в порядок».
 *
 * Каждая нить — заливка-«гора» (цвет фона, перекрывает нити позади; видна только
 * в фазе искажения) + неоновый штрих (контур). Морфинг — SMIL `<animate d>`;
 * вибрация — CSS только в фазе искажения. Без JS, детерминировано от индекса.
 */

const N = 14;
const K = 36;
const W = 1000;
const H = 340;
const MAXAMP = 100; // амплитуда искажения (в обе стороны)
const MARGIN = 12; // защитный отступ сверху/снизу, чтобы пики не вылезали за кромку
const DUR = 10;
// цикл: покой(hold) → плавный морф → гряда(дольше hold) → плавный морф → покой
const KEYTIMES = '0;0.1;0.38;0.66;0.9;1';
const SPLINES = '0 0 1 1 ; 0.42 0 0.58 1 ; 0 0 1 1 ; 0.42 0 0.58 1 ; 0 0 1 1';

const PALETTE = ['#8b5cf0', '#a855f7', '#7c3aed', '#818cf8', '#38bdf8', '#22b8d6', '#6fe5ff'];

function rand(i: number, salt: number): number {
  const x = Math.sin((i + 1) * salt) * 43758.5453;
  return x - Math.floor(x);
}

function laneY(i: number): number {
  return 42 + i * ((H - 84) / (N - 1)); // дорожки с запасом сверху/снизу под пики
}

function envelope(i: number): number {
  // мягче → искажение захватывает больше рядов
  return Math.pow(1 - Math.abs(i / (N - 1) - 0.5) * 2, 0.82);
}

/** Ровная линия (покой). */
function flatPts(i: number): Array<[number, number]> {
  const y = laneY(i);
  return Array.from({ length: K }, (_, k) => [Math.round((k / (K - 1)) * W), Math.round(y)]);
}

/**
 * Искажение: острые зубцы по ВСЕЙ ширине и в ОБЕ стороны (вверх и вниз, линии
 * пересекаются). Амплитуда ряда ограничена его запасом до кромки — пики не
 * вылезают за границу и нет плоского обреза сверху (без жёсткого clamp).
 */
function ridgePts(i: number): Array<[number, number]> {
  const y0 = laneY(i);
  const env = 0.5 + 0.5 * envelope(i);
  // запас до верхней и нижней кромки для этого ряда
  const room = Math.min(y0 - MARGIN, H - MARGIN - y0);
  const rowAmp = Math.min(MAXAMP * env, room);
  const edge = 0.05;
  const pts: Array<[number, number]> = [];
  for (let k = 0; k < K; k++) {
    const t = k / (K - 1);
    let taper: number;
    if (t < edge) taper = t / edge;
    else if (t > 1 - edge) taper = (1 - t) / edge;
    else taper = 1;
    taper = 0.5 * (1 - Math.cos(Math.PI * taper));
    const signed = rand(i * 137 + k, 24.13) * 2 - 1; // [-1..1] — вверх и вниз
    const off = rowAmp * taper * signed;
    pts.push([Math.round(t * W), Math.round(y0 - off)]);
  }
  return pts;
}

function polyline(pts: Array<[number, number]>): string {
  return 'M' + pts.map((p) => `${p[0]},${p[1]}`).join(' L');
}

export function ThreadsMotif() {
  const threads = Array.from({ length: N }, (_, i) => {
    const flat = polyline(flatPts(i));
    const ridge = polyline(ridgePts(i));
    const y0 = Math.round(laneY(i));
    // заливка-«гора» замыкается на базовую линию ряда → локальная прозрачная гора
    const close = ` L${W},${y0} L0,${y0} Z`;
    // цикл: flat, flat(hold), ridge, ridge(hold), flat, flat(hold)
    return {
      i,
      flat,
      strokeValues: `${flat};${flat};${ridge};${ridge};${flat};${flat}`,
      fillFlat: flat + close,
      fillValues: `${flat + close};${flat + close};${ridge + close};${ridge + close};${flat + close};${flat + close}`,
      color: PALETTE[Math.floor(rand(i, 91.7) * PALETTE.length) % PALETTE.length],
      width: (0.6 + rand(i, 5.23) * 3.4).toFixed(2),
      glow: (3 + rand(i, 7.71) * 6).toFixed(1),
      opacity: (0.5 + rand(i, 2.13) * 0.38).toFixed(2),
    };
  });

  return (
    <div className="threads-motif" aria-hidden>
      <style>{CSS}</style>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" width="100%" height="100%">
        {threads.map((t) => (
          <g key={t.i}>
            <path className="threads-motif__fill" d={t.fillFlat} fill={t.color} opacity={0}>
              <animate
                attributeName="d"
                values={t.fillValues}
                keyTimes={KEYTIMES}
                calcMode="spline"
                keySplines={SPLINES}
                dur={`${DUR}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0;0.16;0.16;0;0"
                keyTimes={KEYTIMES}
                dur={`${DUR}s`}
                repeatCount="indefinite"
              />
            </path>
            <path
              className="threads-motif__thread"
              d={t.flat}
              style={
                {
                  color: t.color,
                  strokeWidth: t.width,
                  opacity: t.opacity,
                  ['--glow']: t.glow,
                } as React.CSSProperties
              }
            >
              <animate
                attributeName="d"
                values={t.strokeValues}
                keyTimes={KEYTIMES}
                calcMode="spline"
                keySplines={SPLINES}
                dur={`${DUR}s`}
                repeatCount="indefinite"
              />
            </path>
          </g>
        ))}
      </svg>
    </div>
  );
}

const CSS = `
.threads-motif{
  position:relative;
  width:100vw;
  margin-left:calc(50% - 50vw);
  height:clamp(250px, 32vh, 360px);
  overflow:hidden;
  padding-block:8px;
}
.threads-motif svg{ display:block; }
.threads-motif__fill{ stroke:none; mix-blend-mode:screen; }
.threads-motif__thread{
  fill:none;
  stroke:currentColor;
  stroke-linecap:round;
  stroke-linejoin:round;
  filter:drop-shadow(0 0 calc(var(--glow) * 1px) currentColor)
         drop-shadow(0 0 calc(var(--glow) * 2px) currentColor);
  vector-effect:non-scaling-stroke;
  mix-blend-mode:screen;
}
`;
