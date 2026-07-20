'use client';

// ComparisonTableMock.tsx — переиспользуемая адаптивная таблица «Кайтен vs конкурент».
// Эталон стиля выверен на лендинге «Сравнение Кайтен с Trello» (июль 2026) и
// соответствует DS-спеке wiki/design-system/components/comparison-table.md.
//
// КОНТЕНТ НЕ ЗАШИТ — заголовок, название конкурента, разделы/строки и сноска
// приходят пропсами; один шаблон заполняется любой аналогичной структурой.
//
// Раскрытие: десктоп (≥1280) — раскрыты ВСЕ разделы; планшет/мобила — только первый.
//
// Ключевые решения стиля (не менять без причины):
//   • Grid: minmax(0,1fr) + 25% + 25% — колонки продуктов занимают ½ ширины.
//   • Фоновые панели во всю высоту: Кайтен #EFE9F9, конкурент #F5F5F5,
//     скругление 24px сверху (8px на мобиле). В шапке Кайтена — логотип.
//   • Заголовок таблицы живёт В ШАПКЕ (левая ячейка), 30px → 24px (планшет/мобила);
//     на мобиле занимает всю ширину, панели опускаются под него (--kct-bg-top).
//   • Заголовок раздела: шеврон 24px СЛЕВА + зазор 12px; раскрыт — лиловый
//     #7D4CCF без нижней линии; свёрнут — #2D2D2D с линией. Границы разделов
//     #BDBDBD (одна линия на границе: top есть только у первого раздела).
//   • Строки: текст выровнен по заголовку раздела (padding-left 36px);
//     разделители #D1D5DB, в колонке Кайтена rgba(125,76,207,.28);
//     последняя строка раздела замыкается контрастной #BDBDBD.
//   • Иконки: ✓ зелёная #4CAF51 в белом круге 24px (20 на мобиле);
//     «нет» — красный минус #EF4444 10×1.5px (не жирный).
//   • Мобила: заголовки разделов 14px, строки 12px, ячейки min-height 40px.
//   • Сноска обязательна — третичный #9E9E9E.

import * as React from "react";

export interface KctRow {
  label: React.ReactNode;
  /** Функция есть у Кайтена */
  a: boolean;
  /** Функция есть у конкурента */
  b: boolean;
}

export interface KctSection {
  title: React.ReactNode;
  rows: KctRow[];
}

export interface ComparisonTableProps {
  /** Заголовок таблицы (в шапке слева), напр. «Кайтен и X: сравнение функций» */
  title: React.ReactNode;
  /** Название конкурента в шапке правой колонки */
  competitor: React.ReactNode;
  /** Разделы со строками; по умолчанию раскрыт первый */
  sections: KctSection[];
  /** Сноска: источник + дата актуальности (обязательна по DS) */
  footnote: React.ReactNode;
  /** Логотип Кайтена в шапке; по умолчанию — встроенный */
  kaitenLogo?: React.ReactNode;
  className?: string;
}

const CSS = `
.kct{--brand:#7d4ccf;--brand-12:#efe9f9;--ink:#2d2d2d;--tert:#9e9e9e;
  --line:#d1d5db;--line-strong:#bdbdbd;--line-k:rgba(125,76,207,.28);
  --ok:#4caf51;--no:#ef4444;--sec-bg:#f5f5f5;--colw:25%;
  font-family:'Roboto',system-ui,-apple-system,'Segoe UI',sans-serif;
  letter-spacing:-.2px;color:var(--ink);-webkit-font-smoothing:antialiased}
.kct *,.kct *::before,.kct *::after{box-sizing:border-box;margin:0;padding:0}
.kct button{font:inherit;letter-spacing:inherit;color:inherit;background:none;border:none;cursor:pointer}

.kct-table{position:relative}
.kct-bg{position:absolute;top:var(--kct-bg-top,0px);bottom:0;border-radius:24px 24px 0 0;z-index:0;pointer-events:none}
.kct-bg--a{right:var(--colw);width:var(--colw);background:var(--brand-12)}
.kct-bg--b{right:0;width:var(--colw);background:var(--sec-bg)}
.kct-grid{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr) var(--colw) var(--colw)}

.kct-hcell{display:flex;align-items:center;justify-content:center;min-height:92px;padding:16px}
.kct-hcell--label{justify-content:flex-start;padding-left:0}
.kct-title{font-size:30px;line-height:36px;font-weight:600;letter-spacing:0;text-align:left}
.kct-hcell--b{font-size:24px;line-height:32px;font-weight:500}
.kct-logo{height:44px;width:auto;color:var(--ink)}

.kct-sec{grid-column:1/-1;display:flex;align-items:center;justify-content:flex-start;gap:12px;width:100%;
  border-bottom:1px solid var(--line-strong);text-align:left;padding:16px 0}
.kct-sec--first{border-top:1px solid var(--line-strong)}
.kct-sec[aria-expanded="true"]{border-bottom-color:transparent}
.kct-sec-t{font-size:18px;line-height:28px;font-weight:600;transition:color .18s}
.kct-sec[aria-expanded="true"] .kct-sec-t{color:var(--brand)}
.kct-chev{order:-1;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;color:#757575;flex:none;transition:color .18s}
.kct-chev svg{width:20px;height:20px;transition:transform .24s cubic-bezier(.2,0,.2,1)}
.kct-sec[aria-expanded="true"] .kct-chev{color:var(--brand)}
.kct-sec[aria-expanded="true"] .kct-chev svg{transform:rotate(180deg)}

.kct-cell{display:flex;align-items:center;min-height:48px;padding:8px 16px;border-bottom:1px solid var(--line)}
.kct-cell--label{font-size:16px;line-height:24px;padding-left:36px;padding-right:24px}
.kct-cell--a,.kct-cell--b{justify-content:center}
.kct-cell--a{border-bottom-color:var(--line-k)}
.kct-cell--last{border-bottom-color:var(--line-strong)}
.kct-cell--hidden{display:none}

.kct-ic{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:9999px;background:#fff;flex:none;box-shadow:0 0 0 1px rgba(45,45,45,.04)}
.kct-ic--yes{color:var(--ok)}
.kct-ic--yes svg{width:15px;height:15px}
.kct-ic--no::after{content:"";width:10px;height:1.5px;border-radius:9999px;background:var(--no)}

.kct-note{margin-top:24px;font-size:14px;line-height:20px;color:var(--tert)}

@media(min-width:768px) and (max-width:1279px){
  .kct-hcell{min-height:72px}
  .kct-title,.kct-hcell--b{font-size:24px;line-height:32px}
  .kct-logo{height:32px}
  .kct-cell{min-height:44px}
  .kct-cell--label{font-size:14px;line-height:20px;padding-right:16px}
  .kct-sec-t{font-size:16px;line-height:24px}
}
@media(max-width:767px){
  .kct-bg{border-radius:8px 8px 0 0}
  .kct-hcell{min-height:56px;padding:10px 6px}
  .kct-hcell--label{grid-column:1/-1;padding:0 0 16px;min-height:0}
  .kct-hcell--a{grid-column:2}
  .kct-hcell--b{grid-column:3;font-size:14px;line-height:20px;font-weight:600}
  .kct-title{font-size:24px;line-height:32px}
  .kct-logo{height:20px}
  .kct-cell{min-height:40px;padding:6px 8px}
  .kct-cell--label{font-size:12px;line-height:16px;padding-left:36px;padding-right:10px}
  .kct-ic{width:20px;height:20px}
  .kct-ic--yes svg{width:12px;height:12px}
  .kct-sec{padding:12px 0}
  .kct-sec-t{font-size:14px;line-height:20px}
  .kct-note{margin-top:16px;font-size:12px;line-height:16px}
}
`;

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
);
const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
);
const KaitenLogoDefault = () => (
  <svg className="kct-logo" viewBox="0 0 44 44" role="img" aria-label="Кайтен">
    <path d="M32.5 0h-21C5.15 0 0 5.15 0 11.5v21C0 38.85 5.15 44 11.5 44h21C38.85 44 44 38.85 44 32.5v-21C44 5.15 38.85 0 32.5 0Z" fill="#F11F24" />
    <path d="M17.52 4.8 4.8 17.52c-2.45 2.45-2.45 6.41 0 8.86L17.52 39.1c2.45 2.45 6.41 2.45 8.86 0L39.1 26.38c2.45-2.45 2.45-6.41 0-8.86L26.38 4.8c-2.45-2.45-6.41-2.45-8.86 0Z" fill="#78FFC7" />
    <circle cx="21.88" cy="21.88" r="10.88" fill="#7D4CCF" />
  </svg>
);

function Cell({ has, kaiten, hidden, last }: { has: boolean; kaiten?: boolean; hidden?: boolean; last?: boolean }) {
  const cls = [
    "kct-cell",
    kaiten ? "kct-cell--a" : "kct-cell--b",
    hidden ? "kct-cell--hidden" : "",
    last ? "kct-cell--last" : "",
  ].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {has ? <i className="kct-ic kct-ic--yes"><Check /></i> : <i className="kct-ic kct-ic--no" />}
    </div>
  );
}

export function ComparisonTableMock({ title, competitor, sections, footnote, kaitenLogo, className }: ComparisonTableProps) {
  const [open, setOpen] = React.useState(() => sections.map((_, i) => i === 0));
  const tableRef = React.useRef<HTMLDivElement>(null);
  const headRef = React.useRef<HTMLDivElement>(null);
  const modeRef = React.useRef<string | null>(null);

  // Правило раскрытия: десктоп (≥1280) — все разделы раскрыты,
  // планшет/мобила — только первый. Ручные клики внутри режима не перетираются.
  React.useEffect(() => {
    const apply = () => {
      const desktop = window.innerWidth >= 1280;
      const mode = desktop ? "d" : "m";
      if (modeRef.current === mode) return;
      modeRef.current = mode;
      setOpen(sections.map((_, i) => desktop || i === 0));
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [sections.length]);

  // На мобиле заголовок занимает всю ширину шапки — панели опускаются под него
  React.useEffect(() => {
    const upd = () => {
      const t = tableRef.current, h = headRef.current;
      if (!t || !h) return;
      t.style.setProperty("--kct-bg-top", (window.innerWidth < 768 ? h.offsetHeight : 0) + "px");
    };
    upd();
    window.addEventListener("resize", upd);
    const iv = window.setInterval(upd, 400); // страховка для iframe/эмуляций без resize-событий
    return () => { window.removeEventListener("resize", upd); window.clearInterval(iv); };
  }, []);

  return (
    <div className={`kct${className ? ` ${className}` : ""}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="kct-table" ref={tableRef}>
        <div className="kct-bg kct-bg--a" />
        <div className="kct-bg kct-bg--b" />
        <div className="kct-grid">
          <div className="kct-hcell kct-hcell--label" ref={headRef}><h2 className="kct-title">{title}</h2></div>
          <div className="kct-hcell kct-hcell--a">{kaitenLogo ?? <KaitenLogoDefault />}</div>
          <div className="kct-hcell kct-hcell--b">{competitor}</div>

          {sections.map((sec, si) => (
            <React.Fragment key={si}>
              <button
                className={`kct-sec${si === 0 ? " kct-sec--first" : ""}`}
                type="button"
                aria-expanded={open[si]}
                onClick={() => setOpen(o => o.map((v, i) => (i === si ? !v : v)))}
              >
                <span className="kct-sec-t">{sec.title}</span>
                <span className="kct-chev"><Chevron /></span>
              </button>
              {sec.rows.map((row, ri) => {
                const hidden = !open[si];
                const last = ri === sec.rows.length - 1;
                return (
                  <React.Fragment key={ri}>
                    <div className={`kct-cell kct-cell--label${hidden ? " kct-cell--hidden" : ""}${last ? " kct-cell--last" : ""}`}>{row.label}</div>
                    <Cell has={row.a} kaiten hidden={hidden} last={last} />
                    <Cell has={row.b} hidden={hidden} last={last} />
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <p className="kct-note">{footnote}</p>
    </div>
  );
}

export default ComparisonTableMock;

/*
Пример заполнения (контент — свой под каждое сравнение, структура та же):

<ComparisonTableMock
  title={<>Кайтен и&nbsp;Конкурент: сравнение функций</>}
  competitor="Конкурент"
  sections={[
    { title: "Название раздела", rows: [
      { label: <>Название функции</>, a: true,  b: true  },
      { label: <>Ещё функция</>,      a: true,  b: false },
    ]},
    { title: "Второй раздел", rows: [
      { label: "Функция", a: true, b: false },
    ]},
  ]}
  footnote="Сравнение составлено на основании открытых источников по состоянию на ДД.ММ.ГГГГ. Функциональность сервисов может отличаться в зависимости от тарифа, конфигурации и настроек."
/>
*/
