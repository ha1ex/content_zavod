'use client';

// ComparisonCopyMock.tsx — сравнение с ОПИСАТЕЛЬНЫМ текстом в ячейках (а не ✓/−).
// Отдельный мок, чтобы не перегружать эталонный галочковый ComparisonTableMock,
// который используется в 90% случаев (vs-конкурент). Наследует его визуальный
// язык: лиловая панель Кайтена + серая панель второго столбца, скруглённые
// колонки, сноска. Отличия:
//   • ячейки — текст по центру колонки, без ✓/−;
//   • разделы БЕЗ раскрывашек (строки видны сразу); заголовок раздела опционален;
//   • в шапке лиловой колонки — текст brandLabel (напр. «Kaiten CLI Community
//     Edition») вместо логотипа, когда сравниваются два продукта Кайтена.
// Префикс классов `kctc`, чтобы стили не пересекались с `.kct`.

import * as React from "react";

export interface KctcRow {
  label: React.ReactNode;
  /** Левая (лиловая) колонка — текст ячейки */
  a: React.ReactNode;
  /** Правая (серая) колонка — текст ячейки */
  b: React.ReactNode;
}

export interface KctcSection {
  /** Заголовок раздела. Пустой/отсутствует → раздел без заголовка, только строки. */
  title?: React.ReactNode;
  rows: KctcRow[];
}

export interface ComparisonCopyProps {
  /** Заголовок таблицы (в шапке слева) */
  title: React.ReactNode;
  /** Заголовок левой (лиловой) колонки: текст бренда или логотип по умолчанию */
  brandLabel?: React.ReactNode;
  /** Заголовок правой (серой) колонки */
  competitor: React.ReactNode;
  sections: KctcSection[];
  /** Сноска: источник + дата актуальности (обязательна по DS) */
  footnote: React.ReactNode;
  /** Логотип Кайтена в шапке, если brandLabel не задан; по умолчанию — встроенный */
  kaitenLogo?: React.ReactNode;
  className?: string;
}

const CSS = `
.kctc{--brand:#7d4ccf;--brand-12:#efe9f9;--ink:#2d2d2d;--tert:#9e9e9e;
  --line:#d1d5db;--line-strong:#bdbdbd;--line-k:rgba(125,76,207,.28);
  --sec-bg:#f5f5f5;--colw:33%;
  font-family:'Roboto','Inter',system-ui,-apple-system,'Segoe UI',sans-serif;
  letter-spacing:-.2px;color:var(--ink);-webkit-font-smoothing:antialiased}
.kctc *,.kctc *::before,.kctc *::after{box-sizing:border-box;margin:0;padding:0}

.kctc-table{position:relative}
.kctc-bg{position:absolute;top:var(--kctc-bg-top,0px);bottom:0;border-radius:24px 24px 0 0;z-index:0;pointer-events:none}
.kctc-bg--a{right:var(--colw);width:var(--colw);background:var(--brand-12)}
.kctc-bg--b{right:0;width:var(--colw);background:var(--sec-bg)}
.kctc-grid{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr) var(--colw) var(--colw)}

.kctc-hcell{display:flex;align-items:center;justify-content:center;min-height:92px;padding:16px}
.kctc-hcell--label{justify-content:flex-start;padding-left:0}
.kctc-title{font-size:30px;line-height:36px;font-weight:600;letter-spacing:0;text-align:left}
.kctc-hcell--b{font-size:24px;line-height:32px;font-weight:500;text-align:center}
.kctc-brand{font-size:22px;line-height:28px;font-weight:600;color:var(--brand);text-align:center}
.kctc-logo{height:44px;width:auto;color:var(--ink)}

.kctc-sec{grid-column:1/-1;display:flex;align-items:center;justify-content:flex-start;gap:12px;width:100%;
  border-top:1px solid var(--line-strong);border-bottom:1px solid var(--line-strong);text-align:left;padding:16px 0}
.kctc-sec-t{font-size:18px;line-height:28px;font-weight:600;color:var(--brand)}
.kctc-rule{grid-column:1/-1;border-top:1px solid var(--line-strong)}

.kctc-cell{display:flex;align-items:center;min-height:48px;padding:12px 16px;border-bottom:1px solid var(--line)}
.kctc-cell--label{font-size:16px;line-height:24px;padding-left:36px;padding-right:24px;font-weight:500}
.kctc-cell--a,.kctc-cell--b{justify-content:center;text-align:center}
.kctc-cell--a{border-bottom-color:var(--line-k)}
.kctc-cell--last{border-bottom-color:var(--line-strong)}
.kctc-txt{font-size:15px;line-height:22px;color:var(--ink)}
.kctc-cell--a .kctc-txt{font-weight:500}

.kctc-note{margin-top:24px;font-size:14px;line-height:20px;color:var(--tert)}

@media(min-width:768px) and (max-width:1279px){
  .kctc-hcell{min-height:72px}
  .kctc-title,.kctc-hcell--b{font-size:24px;line-height:32px}
  .kctc-brand{font-size:19px;line-height:24px}
  .kctc-logo{height:32px}
  .kctc-cell{min-height:44px}
  .kctc-cell--label{font-size:14px;line-height:20px;padding-right:16px}
  .kctc-txt{font-size:14px;line-height:20px}
  .kctc-sec-t{font-size:16px;line-height:24px}
}
@media(max-width:767px){
  .kctc-bg{border-radius:8px 8px 0 0}
  .kctc-hcell{min-height:56px;padding:10px 6px}
  .kctc-hcell--label{grid-column:1/-1;padding:0 0 16px;min-height:0}
  .kctc-hcell--a{grid-column:2}
  .kctc-hcell--b{grid-column:3;font-size:14px;line-height:20px;font-weight:600}
  .kctc-brand{font-size:13px;line-height:16px}
  .kctc-title{font-size:24px;line-height:32px}
  .kctc-logo{height:20px}
  .kctc-cell{min-height:40px;padding:8px}
  .kctc-cell--label{font-size:12px;line-height:16px;padding-left:36px;padding-right:10px}
  .kctc-txt{font-size:12px;line-height:16px;font-weight:400}
  .kctc-cell--a .kctc-txt{font-weight:500}
  .kctc-sec{padding:12px 0}
  .kctc-sec-t{font-size:14px;line-height:20px}
  .kctc-note{margin-top:16px;font-size:12px;line-height:16px}
}
`;

const KaitenLogoDefault = () => (
  <svg className="kctc-logo" viewBox="0 0 44 44" role="img" aria-label="Кайтен">
    <path d="M32.5 0h-21C5.15 0 0 5.15 0 11.5v21C0 38.85 5.15 44 11.5 44h21C38.85 44 44 38.85 44 32.5v-21C44 5.15 38.85 0 32.5 0Z" fill="#F11F24" />
    <path d="M17.52 4.8 4.8 17.52c-2.45 2.45-2.45 6.41 0 8.86L17.52 39.1c2.45 2.45 6.41 2.45 8.86 0L39.1 26.38c2.45-2.45 2.45-6.41 0-8.86L26.38 4.8c-2.45-2.45-6.41-2.45-8.86 0Z" fill="#78FFC7" />
    <circle cx="21.88" cy="21.88" r="10.88" fill="#7D4CCF" />
  </svg>
);

function Cell({ value, kaiten, last }: { value: React.ReactNode; kaiten?: boolean; last?: boolean }) {
  const cls = [
    "kctc-cell",
    kaiten ? "kctc-cell--a" : "kctc-cell--b",
    last ? "kctc-cell--last" : "",
  ].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      <span className="kctc-txt">{value}</span>
    </div>
  );
}

export function ComparisonCopyMock({ title, brandLabel, competitor, sections, footnote, kaitenLogo, className }: ComparisonCopyProps) {
  const tableRef = React.useRef<HTMLDivElement>(null);
  const headRef = React.useRef<HTMLDivElement>(null);

  // На мобиле заголовок занимает всю ширину шапки — панели опускаются под него.
  React.useEffect(() => {
    const upd = () => {
      const t = tableRef.current, h = headRef.current;
      if (!t || !h) return;
      t.style.setProperty("--kctc-bg-top", (window.innerWidth < 768 ? h.offsetHeight : 0) + "px");
    };
    upd();
    window.addEventListener("resize", upd);
    const iv = window.setInterval(upd, 400);
    return () => { window.removeEventListener("resize", upd); window.clearInterval(iv); };
  }, []);

  return (
    <div className={`kctc${className ? ` ${className}` : ""}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="kctc-table" ref={tableRef}>
        <div className="kctc-bg kctc-bg--a" />
        <div className="kctc-bg kctc-bg--b" />
        <div className="kctc-grid">
          <div className="kctc-hcell kctc-hcell--label" ref={headRef}><h2 className="kctc-title">{title}</h2></div>
          <div className="kctc-hcell kctc-hcell--a">{brandLabel ? <span className="kctc-brand">{brandLabel}</span> : (kaitenLogo ?? <KaitenLogoDefault />)}</div>
          <div className="kctc-hcell kctc-hcell--b">{competitor}</div>

          {sections.map((sec, si) => (
            <React.Fragment key={si}>
              {sec.title ? (
                <div className="kctc-sec"><span className="kctc-sec-t">{sec.title}</span></div>
              ) : (
                <div className="kctc-rule" />
              )}
              {sec.rows.map((row, ri) => {
                const last = ri === sec.rows.length - 1;
                return (
                  <React.Fragment key={ri}>
                    <div className={`kctc-cell kctc-cell--label${last ? " kctc-cell--last" : ""}`}>{row.label}</div>
                    <Cell value={row.a} kaiten last={last} />
                    <Cell value={row.b} last={last} />
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <p className="kctc-note">{footnote}</p>
    </div>
  );
}

export default ComparisonCopyMock;
