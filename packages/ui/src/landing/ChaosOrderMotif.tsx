/**
 * ChaosOrderMotif — фирменный анимированный мотив конференции «ИИ и порядок
 * в работе»: раскиданные карточки съезжаются в аккуратную сетку в несколько
 * рядов и снова рассыпаются. Метафора «из хаоса — в порядок».
 *
 * Карточки — скруглённые прямоугольники (как в первой версии), небольшие;
 * сетка тянется во всю ширину экрана. Чистый CSS (без JS) → работает и в
 * статичной выгрузке; неон под тёмную схему (фиолет + циан). Позиции разлёта
 * детерминированы от индекса (без Math.random) — SSR и клиент совпадают.
 */

const COLS = 12;
const ROWS = 3;
const COUNT = COLS * ROWS;

/** Детерминированный псевдослучайный [0..1) от индекса и «соли». */
function rand(i: number, salt: number): number {
  const x = Math.sin((i + 1) * salt) * 43758.5453;
  return x - Math.floor(x);
}

export function ChaosOrderMotif() {
  const cards = Array.from({ length: COUNT }, (_, i) => {
    const sx = Math.round((rand(i, 12.9898) * 2 - 1) * 340); // разлёт по X, px
    const sy = Math.round((rand(i, 78.233) * 2 - 1) * 190); // разлёт по Y, px
    const r = Math.round((rand(i, 43.7714) * 2 - 1) * 62); // поворот, deg
    const sk = Math.round((rand(i, 9.113) * 2 - 1) * 18); // перекос, deg
    const sc = (0.42 + rand(i, 5.7231) * 1.0).toFixed(2); // масштаб в хаосе 0.42..1.42 (разный размер)
    const d = (rand(i, 3.1415) * 1.4).toFixed(2); // задержка, s
    const cyan = i % 3 === 0;
    return { i, sx, sy, r, sk, sc, d, cyan };
  });

  return (
    <div className="chaos-order" aria-hidden>
      <style>{CSS}</style>
      <div className="chaos-order__grid">
        {cards.map((c) => (
          <span
            key={c.i}
            className={`chaos-order__card${c.cyan ? ' is-cyan' : ''}`}
            style={
              {
                ['--sx']: `${c.sx}px`,
                ['--sy']: `${c.sy}px`,
                ['--r']: `${c.r}deg`,
                ['--sk']: `${c.sk}deg`,
                ['--sc']: c.sc,
                ['--d']: `${c.d}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

const CSS = `
.chaos-order{
  --violet:#8b5cf0; --cyan:#6fe5ff;
  position:relative;
  width:100vw;
  margin-left:calc(50% - 50vw);
  overflow:hidden;
  padding:12px clamp(16px, 4vw, 64px);
}
.chaos-order__grid{
  display:grid;
  grid-template-columns:repeat(${COLS}, 1fr);
  grid-template-rows:repeat(${ROWS}, 1fr);
  gap:clamp(8px, 1vw, 16px);
  width:100%;
  height:clamp(210px, 26vh, 300px);
}
.chaos-order__card{
  border-radius:10px;
  background:linear-gradient(180deg, rgba(139,92,240,.22), rgba(139,92,240,.06));
  border:1px solid rgba(139,92,240,.55);
  box-shadow:0 0 18px rgba(139,92,240,.35), inset 0 0 12px rgba(139,92,240,.15);
  transform:translate(var(--sx), var(--sy)) rotate(var(--r)) skewX(var(--sk)) scale(var(--sc));
  opacity:.14;
  animation:chaos-order-assemble 8s var(--d) cubic-bezier(.22,1,.36,1) infinite;
  will-change:transform, opacity;
}
.chaos-order__card.is-cyan{
  background:linear-gradient(180deg, rgba(111,229,255,.22), rgba(111,229,255,.05));
  border-color:rgba(111,229,255,.55);
  box-shadow:0 0 18px rgba(111,229,255,.35), inset 0 0 12px rgba(111,229,255,.15);
}
@keyframes chaos-order-assemble{
  0%   { transform:translate(var(--sx), var(--sy)) rotate(var(--r)) skewX(var(--sk)) scale(var(--sc)); opacity:.12; }
  38%  { transform:none; opacity:1; }
  72%  { transform:none; opacity:1; }
  100% { transform:translate(var(--sx), var(--sy)) rotate(var(--r)) skewX(var(--sk)) scale(var(--sc)); opacity:.12; }
}
@media (max-width:640px){
  .chaos-order__grid{ height:180px; gap:6px; }
}
@media (prefers-reduced-motion: reduce){
  .chaos-order__card{ animation:none; transform:none; opacity:1; }
}
`;
