import React from 'react';

/**
 * HeroScreenInterface — переиспользуемый мокап ПЕРВОГО ЭКРАНА лендинга Kaiten:
 * фон + бейдж + заголовок + подзаголовок + CTA + продуктовый интерфейс
 * (анимированная канбан-доска «портфель дел»).
 *
 * ТЕКСТ НЕ ЗАШИТ — вся копирайт-часть и данные доски задаются пропсами,
 * поэтому один шаблон подходит под разные лендинги. Стили/отступы 1-в-1
 * с лендингом, заскоуплены под `.hsi-screen` / `.hsi`. Токены — var(--token,
 * fallback): подхватывают дизайн-систему Kaiten, иначе работают фолбэки.
 *
 * Анимация перемещения карточки (drag + курсор-рука) встроена: `animate` +
 * `animatedCard`. Уважает prefers-reduced-motion.
 */

export type TagVariant = 'prod' | 'cx' | 'big' | 'urg' | 'ok' | 'blue' | 'jud';

export interface HsiTag {
  label: string;
  variant?: TagVariant;
}

export interface HsiCard {
  title: React.ReactNode;
  tags?: HsiTag[];
  checklist?: { label: string; done: number; total: number };
  assignees?: string[];
  extraAssignee?: string;
  due?: string;
}

export interface HsiColumnHeader {
  label: string;
  count?: number;
  done?: boolean;
}

export interface HsiLane {
  name: string;
  count?: number;
  columns: HsiCard[][];
}

export interface HsiAnimatedCard {
  card: HsiCard;
  fromColumn?: number;
}

export interface HsiCta {
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface HeroScreenInterfaceProps {
  /* ── Копирайт первого экрана ── */
  /** Бейдж-надзаголовок (eyebrow). */
  eyebrow?: string;
  /** Заголовок H1 (можно ReactNode с <br />). */
  heading: React.ReactNode;
  /** Подзаголовок-польза. */
  subheading?: React.ReactNode;
  primaryCta?: HsiCta;
  secondaryCta?: HsiCta;
  /** CSS-фон секции. По умолчанию фирменный радиальный градиент. */
  background?: string;

  /* ── Интерфейс (канбан-доска) ── */
  /** Заголовок модуля-доски. */
  boardTitle: string;
  columns: HsiColumnHeader[];
  lanes: HsiLane[];
  animate?: boolean;
  animatedCard?: HsiAnimatedCard;
  /** Базовый zoom доски (по умолчанию 0.86). */
  scale?: number;

  className?: string;
  ariaLabel?: string;
}

/* ─── иконки ─────────────────────────────────────────────────────────── */
const Chevron = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
);
const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
);
const Calendar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4M16 2v4" /><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18" /></svg>
);
const Checklist = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
);

/* ─── карточка ───────────────────────────────────────────────────────── */
function CardBody({ card }: { card: HsiCard }) {
  const hasFoot = (card.assignees && card.assignees.length) || card.due;
  return (
    <>
      <div className="ct">{card.title}</div>
      {card.tags && card.tags.length > 0 && (
        <div className="tags">
          {card.tags.map((t, i) => (
            <span key={i} className={`tag t-${t.variant ?? 'prod'}`}>{t.label}</span>
          ))}
        </div>
      )}
      {card.checklist && (
        <div className="row">
          <span className="sub"><Checklist />{card.checklist.label} {card.checklist.done}/{card.checklist.total}</span>
        </div>
      )}
      {hasFoot && (
        <div className="foot">
          <span className="avs">
            {card.assignees?.map((c, i) => (
              <span key={i} className="av" style={{ background: c }} />
            ))}
            {card.extraAssignee && <span className="plus">{card.extraAssignee}</span>}
          </span>
          {card.due && <span className="due"><Calendar />{card.due}</span>}
        </div>
      )}
    </>
  );
}

/* ─── дорожка ─────────────────────────────────────────────────────────── */
function Lane({ lane, foot, animate, animatedCard }: { lane: HsiLane; foot: boolean; animate?: boolean; animatedCard?: HsiAnimatedCard }) {
  const dragCol = animatedCard?.fromColumn ?? 0;
  return (
    <>
      <div className={`lane${foot ? ' lane--foot' : ''}`}>
        <span className="lnm">{lane.name}</span>
        {lane.count != null && <span className="cnt2">{lane.count}</span>}
        <span className="chev"><Chevron size={18} /></span>
      </div>
      <div className="lanebody">
        {lane.columns.map((col, ci) => (
          <div className="col" key={ci}>
            {animate && animatedCard && ci === dragCol && (
              <div className="drag-layer">
                <div className="card drag-card"><CardBody card={animatedCard.card} /></div>
                <span className="hand" aria-hidden="true">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#fff" stroke="#2d2d2d" strokeWidth={1.4} strokeLinejoin="round"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11V7.5a1.5 1.5 0 0 1 3 0V11v-1a1.5 1.5 0 0 1 3 0v5.5a5.5 5.5 0 0 1-5.5 5.5H12a5 5 0 0 1-4.3-2.5l-2.4-4a1.5 1.5 0 0 1 2.5-1.6L9 15z" /></svg>
                </span>
              </div>
            )}
            {col.map((card, ki) => <div className="card" key={ki}><CardBody card={card} /></div>)}
          </div>
        ))}
      </div>
    </>
  );
}

function Cta({ cta, variant }: { cta: HsiCta; variant: 'fill' | 'outline' }) {
  return (
    <a className={`hsi-screen__btn hsi-screen__btn--${variant}`} href={cta.href ?? '#'} onClick={cta.onClick}>
      {cta.label}
    </a>
  );
}

const DEFAULT_BG =
  'radial-gradient(900px 420px at 50% -140px, var(--brand-12, #efe9f9) 0%, rgba(239,233,249,0) 70%), linear-gradient(#fff,#fff)';

const CSS = `
.hsi-screen__glow{position:absolute;width:720px;height:520px;left:50%;top:-220px;transform:translateX(-50%);border-radius:9999px;background:linear-gradient(-90deg,#e298ff,#6fe5ff);filter:blur(220px);opacity:.28;pointer-events:none;z-index:0}
.hsi-screen__container{position:relative;z-index:1}
.hsi-screen{
  --_brand:var(--brand-100,#7d4ccf);--_brand-hover:var(--brand-hover,#6f43b8);
  --_brand-12:var(--brand-12,#efe9f9);--_brand-12k:var(--brand-12k,rgba(125,76,207,.12));
  --_brand-48k:var(--brand-48k,rgba(125,76,207,.48));--_border:var(--border-default,#e0e0e0);
  --_ink:#2d2d2d;--_font:var(--font-sans,'Roboto',system-ui,-apple-system,'Segoe UI',sans-serif);
  --_ls:var(--ls,-0.2px);
  position:relative;padding:var(--sp-12,48px) 0 var(--sp-20,80px);overflow:hidden;
  font-family:var(--_font);letter-spacing:var(--_ls);color:var(--_ink);
}
.hsi-screen *,.hsi-screen *::before,.hsi-screen *::after{box-sizing:border-box}
.hsi-screen__container{max-width:var(--container,1216px);margin:0 auto;padding:0 var(--sp-4,16px)}
.hsi-screen__grid{display:flex;flex-direction:column;align-items:center;text-align:center;gap:var(--sp-12,48px)}
.hsi-screen__copy{width:100%;max-width:820px;margin:0 auto;text-align:center}
.hsi-screen__badge{display:inline-flex;align-items:center;justify-content:center;background:var(--_brand-12k);border-radius:var(--radius-2xl,16px);padding:var(--sp-1,4px) var(--sp-4,16px);margin-bottom:var(--sp-4,16px)}
.hsi-screen__badge-text{font-size:var(--fs-sm,14px);line-height:var(--lh-sm,20px);font-weight:var(--fw-med,500);color:var(--_brand);white-space:nowrap}
.hsi-screen__title{font-size:var(--fs-5xl,48px);line-height:var(--lh-5xl,52px);font-weight:var(--fw-semi,600);letter-spacing:-1px;margin:var(--sp-4,16px) 0 var(--sp-5,20px)}
.hsi-screen__sub{font-size:var(--fs-xl,20px);line-height:var(--lh-xl,28px);font-weight:var(--fw-reg,400);color:#2d2d2d;max-width:680px;margin:0 auto var(--sp-8,32px)}
.hsi-screen__cta{display:flex;gap:var(--sp-3,12px);flex-wrap:wrap;justify-content:center}
.hsi-screen__btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--sp-1,4px);height:48px;padding:var(--sp-3,12px) var(--sp-5,20px);font-family:var(--_font);font-size:var(--fs-md,16px);line-height:var(--lh-md,24px);font-weight:var(--fw-med,500);letter-spacing:var(--_ls);border-radius:var(--radius-lg,8px);border:none;cursor:pointer;white-space:nowrap;text-decoration:none;transition:background .18s,border-color .18s,color .18s}
.hsi-screen__btn--fill{background:var(--_brand);color:#fff}
.hsi-screen__btn--fill:hover{background:var(--_brand-hover)}
.hsi-screen__btn--outline{background:#fff;border:1px solid var(--_border);color:var(--_brand)}
.hsi-screen__btn--outline:hover{background:var(--_brand-12);border-color:var(--_brand-48k);color:var(--_brand-hover)}
.hsi-screen__visual{width:100%;display:flex;justify-content:center}
@media(max-width:980px){.hsi-screen__grid{gap:var(--sp-10,40px)}.hsi-screen__copy{max-width:680px}}
@media(max-width:767px){.hsi-screen{padding:var(--sp-12,48px) 0}.hsi-screen__title{font-size:var(--fs-4xl,36px);line-height:var(--lh-4xl,40px)}.hsi-screen__sub{font-size:var(--fs-md,16px)}.hsi-screen__copy{text-align:left}.hsi-screen__cta{justify-content:center}}
@media(max-width:480px){.hsi-screen__badge{max-width:100%}.hsi-screen__badge-text{white-space:normal}}
@media(max-width:384px){.hsi-screen__title{font-size:var(--fs-3xl,30px);line-height:var(--lh-3xl,36px)}}

.hsi{--tp:#2d2d2d;--ts:#8a8a8f;--acc:#7d4ccf;--bd:#e8e8eb;--sec:#f4f4f6;font-family:var(--font-sans,'Roboto',system-ui,-apple-system,'Segoe UI',sans-serif);color:var(--tp);-webkit-font-smoothing:antialiased;text-align:left;display:flex;justify-content:center;zoom:.86}
.hsi *{box-sizing:border-box;margin:0;padding:0}
.hsi .mod{width:1360px;flex:0 0 auto;background:#f1f1f4;border:1px solid var(--bd);border-radius:16px;box-shadow:0 18px 50px -24px rgba(45,45,45,.35);overflow:hidden}
.hsi .hdr{display:flex;align-items:center;gap:12px;padding:14px 18px}
.hsi .grip{display:grid;grid-template-columns:repeat(2,3px);gap:3px}
.hsi .grip i{width:3px;height:3px;border-radius:50%;background:#c4c4c9;display:block}
.hsi .hdr .nm{font-size:17px;font-weight:600}
.hsi .hdr .chev{margin-left:auto;color:var(--ts);display:flex}
.hsi .colhdr{display:flex;padding:6px 16px 10px;border-bottom:1px solid var(--bd)}
.hsi .colhdr .c{flex:1;display:flex;align-items:center;gap:8px;padding:0 9px}
.hsi .colhdr .c .t{font-size:14.5px;font-weight:500;color:var(--tp)}
.hsi .colhdr .c .chk{color:#4a8a2f;display:flex}
.hsi .cnt{margin-left:auto;display:inline-flex;min-width:24px;height:24px;align-items:center;justify-content:center;background:#5f5e5a;color:#fff;border-radius:7px;padding:0 7px;font-size:12.5px;font-weight:600}
.hsi .lane{display:flex;align-items:center;gap:12px;padding:13px 18px;border-bottom:1px solid var(--bd)}
.hsi .lane--foot{border-top:1px solid var(--bd)}
.hsi .lane .lnm{font-size:15px;font-weight:600}
.hsi .lane .cnt2{margin-left:auto;display:inline-flex;min-width:30px;height:24px;align-items:center;justify-content:center;background:#ededf0;color:#6b6b70;border-radius:7px;padding:0 8px;font-size:12.5px;font-weight:600}
.hsi .lane .chev{color:var(--ts);display:flex}
.hsi .lanebody{display:flex;padding:14px 8px}
.hsi .col{flex:1;padding:0 9px;display:flex;flex-direction:column;gap:12px;position:relative}
.hsi .col + .col::before{content:"";position:absolute;left:0;top:-14px;bottom:-14px;border-left:1px solid var(--bd)}
.hsi .card{background:#fff;border:1px solid var(--bd);border-radius:12px;padding:14px;box-shadow:0 1px 2px rgba(45,45,45,.05);display:flex;flex-direction:column;gap:11px}
.hsi .ct{font-size:14.5px;font-weight:500;line-height:1.35;color:var(--tp)}
.hsi .row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.hsi .prio{display:inline-flex;align-items:center;gap:3px;color:var(--ts);font-size:13px}
.hsi .prio b{color:#6b6b70;font-weight:600}
.hsi .sub{display:inline-flex;align-items:center;gap:4px;color:var(--ts);font-size:12.5px}
.hsi .tags{display:flex;flex-wrap:wrap;gap:6px}
.hsi .tag{border-radius:999px;padding:3px 10px;font-size:12.5px;font-weight:500;white-space:nowrap}
.hsi .t-prod{background:#ededf0;color:#6b6b70}
.hsi .t-cx{background:#f7f0cf;color:#8a6a00}
.hsi .t-big{background:#efe9f9;color:#7d4ccf}
.hsi .t-urg{background:#fbe3ec;color:#c2185b}
.hsi .t-ok{background:#e7f3df;color:#2f7d33}
.hsi .t-blue{background:#e2eefb;color:#2f6fb0}
.hsi .t-jud{background:#efe9f9;color:#7d4ccf}
.hsi .foot{display:flex;align-items:center;justify-content:space-between}
.hsi .avs{display:flex;align-items:center}
.hsi .av{width:24px;height:24px;border-radius:50%;border:2px solid #fff;margin-left:-7px}
.hsi .av:first-child{margin-left:0}
.hsi .plus{font-size:12.5px;color:var(--ts);margin-left:7px}
.hsi .due{display:inline-flex;align-items:center;gap:5px;color:var(--ts);font-size:12.5px}
.hsi .drag-layer{position:relative;z-index:30;animation:hsiTravel 5s ease-in-out infinite}
.hsi .drag-card{border:1px solid #e0d6f3;transform-origin:center;animation:hsiLift 5s ease-in-out infinite}
.hsi .hand{position:absolute;left:76%;top:32%;transform:translate(-50%,-50%);width:40px;height:40px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.25));animation:hsiHand 5s ease-in-out infinite;z-index:31}
@keyframes hsiTravel{0%{transform:translate(0,0)}10%{transform:translate(0,0)}20%{transform:translate(4px,-12px)}44%{transform:translate(154px,48px)}56%{transform:translate(154px,48px)}82%{transform:translate(4px,-12px)}94%{transform:translate(0,0)}100%{transform:translate(0,0)}}
@keyframes hsiLift{0%{transform:rotate(0) scale(1);box-shadow:0 1px 2px rgba(45,45,45,.06)}10%{transform:rotate(0) scale(1);box-shadow:0 1px 2px rgba(45,45,45,.06)}20%{transform:rotate(3deg) scale(1.03);box-shadow:0 22px 45px -12px rgba(45,45,45,.40)}82%{transform:rotate(3deg) scale(1.03);box-shadow:0 22px 45px -12px rgba(45,45,45,.40)}94%{transform:rotate(0) scale(1);box-shadow:0 1px 2px rgba(45,45,45,.06)}100%{transform:rotate(0) scale(1);box-shadow:0 1px 2px rgba(45,45,45,.06)}}
@keyframes hsiHand{0%{opacity:0}10%{opacity:0}20%{opacity:1}86%{opacity:1}100%{opacity:0}}
@media(prefers-reduced-motion:reduce){.hsi .drag-layer,.hsi .drag-card,.hsi .hand{animation:none}}
@media(max-width:1279px){.hsi{zoom:.68}}
@media(max-width:980px){.hsi{zoom:.5}}
@media(max-width:767px){.hsi{zoom:.42}}
@media(max-width:600px){.hsi{zoom:.34}}
@media(max-width:480px){.hsi{zoom:.26}}
@media(max-width:384px){.hsi{zoom:.2}}
`;

export function HeroScreenInterface({
  eyebrow,
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  background,
  boardTitle,
  columns,
  lanes,
  animate,
  animatedCard,
  scale,
  className,
  ariaLabel,
}: HeroScreenInterfaceProps) {
  return (
    <section
      className={`hsi-screen${className ? ` ${className}` : ''}`}
      aria-label={ariaLabel}
      style={{ background: background ?? DEFAULT_BG }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="hsi-screen__glow" aria-hidden="true" />
      <div className="hsi-screen__container hsi-screen__grid">
        <div className="hsi-screen__copy">
          {eyebrow && (
            <div className="hsi-screen__badge"><span className="hsi-screen__badge-text">{eyebrow}</span></div>
          )}
          <h1 className="hsi-screen__title">{heading}</h1>
          {subheading && <p className="hsi-screen__sub">{subheading}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="hsi-screen__cta">
              {primaryCta && <Cta cta={primaryCta} variant="fill" />}
              {secondaryCta && <Cta cta={secondaryCta} variant="outline" />}
            </div>
          )}
        </div>

        <div className="hsi-screen__visual">
          <div className="hsi" aria-hidden="true" style={scale != null ? { zoom: scale } : undefined}>
            <div className="mod">
              <div className="hdr">
                <span className="grip"><i /><i /><i /><i /><i /><i /></span>
                <span className="nm">{boardTitle}</span>
                <span className="chev"><Chevron /></span>
              </div>
              <div className="colhdr">
                {columns.map((c, i) => (
                  <div className="c" key={i}>
                    {c.done && <span className="chk"><Check /></span>}
                    <span className="t">{c.label}</span>
                    {c.count != null && <span className="cnt">{c.count}</span>}
                  </div>
                ))}
              </div>
              {lanes.map((lane, i) => (
                <Lane key={i} lane={lane} foot={i > 0} animate={animate && i === 0} animatedCard={animatedCard} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroScreenInterface;

/*
Пример (тексты и данные — свои под каждый лендинг):

<HeroScreenInterface
  eyebrow="Кайтен для команды"
  heading={<>Управляйте работой<br />в одной системе</>}
  subheading="Задачи, сроки и загрузка — на одной доске."
  primaryCta={{ label: 'Попробовать бесплатно', href: 'https://kaiten.ru' }}
  secondaryCta={{ label: 'Заказать демо', href: '#cta' }}
  boardTitle="Портфель задач"
  columns={[
    { label: 'Очередь', count: 3 },
    { label: 'В работе', count: 4 },
    { label: 'Готово', count: 5, done: true },
  ]}
  lanes={[
    { name: 'Проекты', count: 5, columns: [
      [{ title: 'Карточка A', tags: [{ label: 'Проект', variant: 'jud' }], assignees: ['#e57373'] }],
      [{ title: 'Карточка B', tags: [{ label: 'Проект', variant: 'jud' }], assignees: ['#64b5f6'] }],
      [],
    ] },
  ]}
  animate
  animatedCard={{ card: { title: 'Карточка B', tags: [{ label: 'Проект', variant: 'prod' }] }, fromColumn: 0 }}
/>
*/
