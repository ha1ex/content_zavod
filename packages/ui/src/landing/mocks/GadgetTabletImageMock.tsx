import { cn } from '../../primitives/cn';

/* Material Icons для левой колонки разделов (24×24). */
const RAIL_ICONS: string[] = [
  // почта
  'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
  // пространства команды
  'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z',
  // избранное
  'M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  // дерево
  'M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z',
  // панели с настройкой
  'M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm15.5 1.2.9-.5.8 1.3-.9.6c.1.3.1.6.1.9s0 .6-.1.9l.9.6-.8 1.3-.9-.5c-.4.4-1 .7-1.5.9V21h-1.6v-1.1c-.6-.2-1.1-.5-1.5-.9l-.9.5-.8-1.3.9-.6c-.1-.3-.1-.6-.1-.9s0-.6.1-.9l-.9-.6.8-1.3.9.5c.4-.4 1-.7 1.5-.9V13h1.6v1.1c.6.2 1.1.5 1.5.9zM17 16a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z',
  // встречи (веб-камера)
  'M12 2a8 8 0 0 1 3.3 15.3l1.2 2.7H18v2H6v-2h1.5l1.2-2.7A8 8 0 0 1 12 2zm0 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 2.2a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6z',
  // отправленные
  'M2.01 21 23 12 2.01 3 2 10l15 2-15 2z',
];

/** Ширина и шаг колонки в пикселях продукта (эталон — экран Кайтена 1:1). */
const RAIL_W = 52;
const RAIL_STEP = 48;
/** Иконки опущены под скругление рамки, чтобы счетчик «99+» у почты был виден целиком. */
const RAIL_TOP = 34;
const IMG_W = 2000;
const IMG_H = 1331;
/** Правая колонка на скриншоте — 86 из 2000 px; левая той же видимой ширины. */
const IMG_RAIL = 86;

/**
 * Левая колонка разделов Кайтена: почта со счетчиком, пространства, избранное,
 * дерево, панели, встречи, отправленные со счетчиком. Нарисована в пикселях
 * продукта и масштабируется вместе с экраном.
 */
function LeftRail({ height }: { height: number }) {
  return (
    <svg viewBox={`0 0 ${RAIL_W} ${height}`} className="block h-full w-full" aria-hidden="true">
      <rect width={RAIL_W} height={height} fill="#ebefef" />
      <rect x={RAIL_W - 1} width="1" height={height} fill="#ced2d2" />
      {RAIL_ICONS.map((d, i) => (
        <g key={i} transform={`translate(${(RAIL_W - 1) / 2 - 11} ${RAIL_TOP + i * RAIL_STEP - 11}) scale(${22 / 24})`}>
          <path d={d} fill="#6c6e6e" />
        </g>
      ))}
      {/* 99+ у почты */}
      <rect x="23" y={RAIL_TOP - 16} width="27" height="15" rx="7.5" fill="#9c27b0" stroke="#ebefef" strokeWidth="1.5" />
      <text x="36.5" y={RAIL_TOP - 5} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="Roboto, system-ui, sans-serif">99+</text>
      {/* 3 у отправленных */}
      <circle cx="37" cy={RAIL_TOP + 6 * RAIL_STEP - 10} r="8" fill="#9c27b0" stroke="#ebefef" strokeWidth="1.5" />
      <text x="37" y={RAIL_TOP + 6 * RAIL_STEP - 6.5} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="Roboto, system-ui, sans-serif">3</text>
    </svg>
  );
}

/**
 * Mock планшета (iPad, альбомная ориентация, flat-white) со скриншотом продукта
 * вместо нарисованного экрана. Рамка как у TabletKanbanMock: ровный белый безель,
 * мягкая внешняя и внутренняя тень. Слева к скриншоту
 * пристроена колонка разделов той же видимой ширины, что правая колонка на
 * скриншоте; высота экрана подогнана под пропорции картинки, без обрезки.
 */
export function TabletImageMock({
  src = '/brand/kaiten-board-team-tasks.webp',
  alt = 'Доска «Задачи команды» в Кайтене',
}: {
  src?: string;
  alt?: string;
}) {
  const inner = 744; // 760 минус безель 8+8
  // rail = IMG_RAIL * (inner - rail) / IMG_W  →  rail = IMG_RAIL * inner / (IMG_W + IMG_RAIL)
  const rail = (IMG_RAIL * inner) / (IMG_W + IMG_RAIL);
  const imgW = inner - rail;
  const screenH = (imgW * IMG_H) / IMG_W;
  const railH = Math.round((screenH * RAIL_W) / rail);
  return (
    <div
      className={cn(
        'relative w-[760px] overflow-hidden rounded-[28px] border-[8px] border-white bg-(--color-surface-card)',
        'shadow-[0_0_44px_-16px_rgba(45,45,45,0.20)]',
      )}
      style={{ height: screenH + 16 }}
    >
      <div className="flex h-full overflow-hidden rounded-[20px]">
        <div className="h-full shrink-0" style={{ width: rail }}>
          <LeftRail height={railH} />
        </div>
        <img src={src} alt={alt} className="block h-full min-w-0 flex-1 object-cover object-left-top" loading="lazy" />
      </div>
      {/* внутренняя тень по рамке */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20 rounded-[20px] shadow-[inset_0_0_6px_0_rgba(0,0,0,0.1)]" />
    </div>
  );
}
