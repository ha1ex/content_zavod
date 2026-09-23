'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ProductNavIcon, isProductNavIcon } from './ProductNavIcon';
import { HsiApp, APP_DESIGN_WIDTH } from './HeroScreenApp';

/** Ширина, на которой нарисована доска, и её предел на десктопе (контейнер DS). */
const BOARD_DESIGN_WIDTH = 1360;
const BOARD_MAX_WIDTH = 1216;

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

export type TagVariant = 'prod' | 'cx' | 'big' | 'urg' | 'ok' | 'blue' | 'jud' | 'peach' | 'lime' | 'pink' | 'sky';

export interface HsiTag {
  label: string;
  variant?: TagVariant;
}

export interface HsiCard {
  title: React.ReactNode;
  tags?: HsiTag[];
  checklist?: { label: string; done: number; total: number };
  /** Мини-счетчики карточки: вложения, комментарии, дочерние карточки. */
  counters?: { attachments?: number; comments?: number; children?: number; childrenDone?: number };
  /* Поля ниже рисуются только в режиме appShell. */
  /** Цветная полоска-тип над заголовком (hex). */
  accent?: string;
  /** Иконка типа карточки справа от заголовка. */
  icon?: 'dot' | 'doc' | 'folder' | 'chart';
  /** Заливка срока: красная или оранжевая («Сегодня»). */
  dueTone?: 'red' | 'orange';
  /** Бейдж «Срочно». */
  urgent?: boolean;
  /** Красная плашка блокировки над карточкой. */
  blocker?: string;
  /** Родительская карточка — рамка над заголовком. */
  parent?: string;
  assignees?: string[];
  /** Буквы внутри аватаров — по порядку `assignees`. */
  assigneeInitials?: string[];
  /** Цель анимации «наведение → щелчок → окно карточки» (при `cardWindow`). */
  active?: boolean;
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
  /** Иконка слева в бейдже (имя из набора ProductNavIcon). */
  eyebrowIcon?: string;
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
  /** Боковое меню пространств слева от доски (как в интерфейсе Кайтена). */
  sidebar?: boolean;
  /** Окно открытой карточки задачи поверх правого края доски. Opt-in. */
  cardWindow?: boolean;
  /**
   * Полный интерфейс Кайтена вокруг доски (шапка, рельсы иконок, «Дерево»,
   * панель видов). Нарисован на 1920px, доска — одна дорожка без заголовка.
   */
  appShell?: boolean;
  /** Название пространства в шапке (при appShell). */
  spaceTitle?: string;
  /** Базовый zoom доски (по умолчанию 0.86). */
  scale?: number;
  /**
   * Строка доверия под доской: короткие пункты через разделитель
   * («Российское ПО · Облако и сервер · Бесплатный тариф · Легко освоить»).
   */
  trustLine?: string[];

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

/* ─── боковое меню ───────────────────────────────────────────────────── */
type MenuItem = { i: number; label: string; emoji?: string; folder?: string; board?: string; chev?: 'r' | 'd'; active?: boolean };
/** Дерево по образцу ModuleKnowledgeBaseMock1; активна доска «Запуск продукта». */
const MENU: MenuItem[] = [
  { i: 0, emoji: '❤️', label: 'Маркетинг', chev: 'r' },
  { i: 0, emoji: '📚', label: 'База знаний', chev: 'r' },
  { i: 0, emoji: '🧑', label: 'Команда' },
  { i: 0, emoji: '📋', label: 'Процессы', chev: 'd' },
  { i: 1, folder: '#9e9e9e', label: 'Редакция', chev: 'r' },
  { i: 1, folder: '#9e9e9e', label: 'Маркетинг', chev: 'd' },
  { i: 2, board: '#9e9e9e', label: 'Запуск продукта', active: true },
  { i: 2, board: '#9e9e9e', label: 'Разработка' },
  { i: 1, folder: '#9e9e9e', label: 'Разработка', chev: 'r' },
  { i: 1, folder: '#9e9e9e', label: 'HR', chev: 'r' },
  { i: 0, emoji: '🧾', label: 'Бухгалтерия' },
  { i: 0, board: '#9e9e9e', label: 'Пространство руководителя', chev: 'r' },
  { i: 0, board: '#9e9e9e', label: 'Продакт-менеджмент', chev: 'r' },
  { i: 0, board: '#9e9e9e', label: 'Служба поддержки' },
  { i: 0, folder: '#9e9e9e', label: 'Проекты', chev: 'r' },
];
const MenuFolder = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={color}><path d="M3 7a2 2 0 0 1 2-2h4l1.6 1.6H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" /></svg>
);
const MenuBoard = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={color}><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="8" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /><rect x="13" y="13" width="8" height="8" rx="2" /></svg>
);
const MenuChev = ({ dir }: { dir: 'r' | 'd' | 'l' }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d={dir === 'd' ? 'm6 9 6 6 6-6' : dir === 'l' ? 'm11 17-5-5 5-5M18 17l-5-5 5-5' : 'm9 18 6-6-6-6'} />
  </svg>
);

function Sidebar() {
  return (
    <div className="side">
      <div className="side__hd"><span>Меню</span></div>
      <div className="side__search">
        <span className="side__input">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          Найти..
        </span>
        <span className="side__plus">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
        </span>
      </div>
      <div className="side__tree">
        {MENU.map((it, idx) => (
          <div key={idx} className={`side__it${it.active ? ' is-active' : ''}`} style={{ paddingLeft: 8 + it.i * 16 }}>
            {it.emoji && <span className="side__emoji">{it.emoji}</span>}
            {it.folder && <MenuFolder color={it.folder} />}
            {it.board && <MenuBoard color={it.board} />}
            {it.chev && <span className="side__muted"><MenuChev dir={it.chev} /></span>}
            <span className="side__lbl">{it.label}</span>
          </div>
        ))}
      </div>
      <div className="side__foot">
        <div className="side__it"><MenuBoard color="#9e9e9e" /><span className="side__lbl">Шаблоны пространств</span></div>
        <div className="side__it">
          <span className="side__muted"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></svg></span>
          <span className="side__muted"><MenuChev dir="r" /></span>
          <span className="side__lbl">Администрирование</span>
        </div>
      </div>
    </div>
  );
}

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
      {card.counters && (
        <div className="row cnts">
          {card.counters.attachments != null && (
            <span className="sub"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m21 11-8.6 8.6a5 5 0 0 1-7-7l8.6-8.6a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9" /></svg>{card.counters.attachments}</span>
          )}
          {card.counters.comments != null && (
            <span className="sub"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>{card.counters.comments}</span>
          )}
          {card.counters.children != null && (
            <span className="sub"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="6" cy="5" r="2" /><circle cx="18" cy="19" r="2" /><path d="M6 7v6a4 4 0 0 0 4 4h6" /></svg>{card.counters.children}</span>
          )}
        </div>
      )}
      {hasFoot && (
        <div className="foot">
          <span className="avs">
            {card.assignees?.map((c, i) => (
              <span key={i} className="av" style={{ background: c }}>{card.assigneeInitials?.[i]}</span>
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
              // .drag-slot остаётся в потоке: пока карточка «поднята», на её месте
              // виден призрак-плашка (чёрный 10%), как в реальном перетаскивании
              <div className="drag-slot">
                <span className="drag-ghost" aria-hidden="true" />
                <div className="drag-layer">
                <div className="card drag-card"><CardBody card={animatedCard.card} /></div>
                <span className="hand" aria-hidden="true">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#fff" stroke="#2d2d2d" strokeWidth={1.4} strokeLinejoin="round"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11V7.5a1.5 1.5 0 0 1 3 0V11v-1a1.5 1.5 0 0 1 3 0v5.5a5.5 5.5 0 0 1-5.5 5.5H12a5 5 0 0 1-4.3-2.5l-2.4-4a1.5 1.5 0 0 1 2.5-1.6L9 15z" /></svg>
                </span>
                </div>
              </div>
            )}
            {col.map((card, ki) => (
              <div className={card.active ? 'card is-target' : 'card'} key={ki}>
                <CardBody card={card} />
                {card.active && (
                  <span className="pick" aria-hidden="true">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="#fff" stroke="#2d2d2d" strokeWidth={1.4} strokeLinejoin="round"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11V7.5a1.5 1.5 0 0 1 3 0V11v-1a1.5 1.5 0 0 1 3 0v5.5a5.5 5.5 0 0 1-5.5 5.5H12a5 5 0 0 1-4.3-2.5l-2.4-4a1.5 1.5 0 0 1 2.5-1.6L9 15z" /></svg>
                  </span>
                )}
              </div>
            ))}
            {/* светло-фиолетовая плашка-приемник под карточками колонки, куда едет карточка */}
            {animate && animatedCard && ci === dragCol + 1 && <span className="drop-slot" aria-hidden="true" />}
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

/* Иконки строки доверия (lucide-контуры, как на «Кайтен vs MS Project»).
   Подбираются по ключевому слову пункта; фолбэк — галочка в круге. */
const TRUST_ICONS: { match: RegExp; path: React.ReactNode }[] = [
  { match: /российск|реестр|\bПО\b/i, path: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></> },
  { match: /облак|сервер|коробк|on-?premise/i, path: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /> },
  { match: /тариф|бесплат|цена|стоимост/i, path: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /></> },
  { match: /импорт|перенос|перееза?д|миграц/i, path: <><path d="M4 8h16" /><path d="m16 4 4 4-4 4" /><path d="M20 16H4" /><path d="m8 12-4 4 4 4" /></> },
  { match: /освоить|прост|легк|быстр|внедрен/i, path: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><path d="M4 22V3" /></> },
];

function TrustIcon({ label }: { label: string }) {
  const hit = TRUST_ICONS.find((i) => i.match.test(label));
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {hit ? hit.path : <><circle cx="12" cy="12" r="9" /><path d="m9 12 2 2 4-4" /></>}
    </svg>
  );
}

/** Один проход пунктов строки доверия с разделителями между ними. */
function TrustSet({ items, clone }: { items: string[]; clone?: boolean }) {
  return (
    <div className="trust-set" {...(clone ? { 'aria-hidden': 'true' as const } : {})}>
      <span className="sep sep--lead" aria-hidden="true" />
      {items.map((label, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="sep" />}
          <b><TrustIcon label={label} />{label}</b>
        </React.Fragment>
      ))}
    </div>
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
  --_ls:var(--ls,0);
  position:relative;padding:var(--sp-12,48px) 0 var(--sp-6,24px);overflow:hidden;
  font-family:var(--_font);letter-spacing:var(--_ls);color:var(--_ink);
}
.hsi-screen *,.hsi-screen *::before,.hsi-screen *::after{box-sizing:border-box}
.hsi-screen__container{max-width:var(--container,1216px);margin:0 auto;padding:0 var(--sp-4,16px)}
/* Боковой отступ: 16 на мобилке, 24 с планшета; на десктопе контейнер
   упирается в 1216 и отступ не нужен. */
@media(min-width:768px){.hsi-screen__container{padding:0 var(--sp-6,24px)}}
@media(min-width:1280px){.hsi-screen__container{padding:0}}
.hsi-screen__grid{display:flex;flex-direction:column;align-items:center;text-align:center;gap:var(--sp-12,48px)}
.hsi-screen__copy{width:100%;max-width:940px;margin:0 auto;text-align:center}
.hsi-screen__badge{display:inline-flex;align-items:center;justify-content:center;background:var(--_brand-12k);border-radius:var(--radius-2xl,16px);padding:var(--sp-1,4px) var(--sp-4,16px);margin-bottom:0}
.hsi-screen__badge-icon{width:18px;height:18px;flex:none;margin:0 6px 0 14px;color:var(--_brand)}
.hsi-screen__badge-text{font-size:var(--fs-sm,14px);line-height:var(--lh-sm,20px);font-weight:var(--fw-med,500);color:var(--_brand);white-space:nowrap;position:relative;top:1px}
/* Первое слово бейджа: капсом и обычным начертанием, цвет фирменный */
.hsi-screen__badge-text--lead{font-size:12px;font-weight:var(--fw-med,500);text-transform:uppercase;position:relative;top:1px}
.hsi-screen__title{font-size:var(--fs-4xl,36px);line-height:var(--lh-4xl,44px);font-weight:var(--fw-semi,600);letter-spacing:0;margin:var(--sp-4,16px) 0 var(--sp-5,20px);white-space:pre-line}
.hsi-screen__sub{font-size:var(--fs-lg,18px);line-height:var(--lh-lg,28px);font-weight:var(--fw-reg,400);color:#2d2d2d;max-width:820px;margin:0 auto var(--sp-8,32px);white-space:pre-line}
.hsi-screen__cta{display:flex;gap:var(--sp-3,12px);flex-wrap:wrap;justify-content:center}
.hsi-screen__btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--sp-1,4px);height:48px;padding:var(--sp-3,12px) var(--sp-5,20px);font-family:var(--_font);font-size:var(--fs-md,16px);line-height:var(--lh-md,24px);font-weight:var(--fw-med,500);letter-spacing:var(--_ls);border-radius:var(--radius-lg,8px);border:none;cursor:pointer;white-space:nowrap;text-decoration:none;transition:background .18s,border-color .18s,color .18s}
.hsi-screen__btn--fill{background:var(--_brand);color:#fff}
.hsi-screen__btn--fill:hover{background:var(--_brand-hover)}
.hsi-screen__btn--outline{background:#fff;border:1px solid var(--_border);color:var(--_brand)}
.hsi-screen__btn--outline:hover{background:var(--_brand-12);border-color:var(--_brand-48k);color:var(--_brand-hover)}
.hsi-screen__visual{width:100%;display:flex;justify-content:center}
/* Строка доверия — стилистика лендинга «Кайтен vs MS Project»:
   иконка-контур брендового цвета + подпись, разделитель-палочка между пунктами,
   на узких экранах — бегущая строка с растворением по краям. */
.hsi-screen__trust{display:flex;align-items:center;justify-content:center;gap:16px;font-size:16px;margin-top:var(--sp-4,16px)}
.hsi-screen__trust b{display:inline-flex;align-items:center;gap:8px;white-space:nowrap;font-size:16px;line-height:22px;font-weight:var(--fw-reg,400);color:#424242}
.hsi-screen__trust b svg{width:18px;height:18px;color:var(--_brand);flex:0 0 auto}
.hsi-screen__trust .sep{width:1px;height:20px;background:var(--_border);flex:0 0 auto}
.hsi-screen__trust .trust-track{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:16px;min-width:0}
.hsi-screen__trust .trust-set{display:flex;align-items:center;gap:16px;flex:0 0 auto}
.hsi-screen__trust .trust-track>[aria-hidden="true"],.hsi-screen__trust .trust-track>.trust-gap{display:none}
.hsi-screen__trust .trust-gap{width:16px}
.hsi-screen__trust .sep--lead{display:none}
@media(max-width:839px){
  .hsi-screen__trust{overflow:hidden;justify-content:flex-start;mask-image:linear-gradient(90deg,transparent 0,#000 40px,#000 calc(100% - 40px),transparent 100%)}
  .hsi-screen__trust .trust-track{width:max-content;flex:0 0 auto;flex-wrap:nowrap;justify-content:flex-start;animation:hsiTrustMarquee 30s linear infinite}
  .hsi-screen__trust .trust-track>[aria-hidden="true"]{display:flex}
  .hsi-screen__trust .sep--lead{display:block}
  .hsi-screen__trust .trust-track>.trust-gap{display:none}
}
@media(max-width:767px){.hsi-screen__trust{font-size:14px;gap:12px;padding-inline:16px}.hsi-screen__trust b{font-size:14px}.hsi-screen__trust b svg{width:16px;height:16px}.hsi-screen__trust .sep{height:16px}}
@keyframes hsiTrustMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media(prefers-reduced-motion:reduce){.hsi-screen__trust .trust-track{animation:none}}
@media(max-width:980px){.hsi-screen__grid{gap:var(--sp-10,40px)}.hsi-screen__copy{max-width:none}.hsi-screen__sub{max-width:none}}
@media(max-width:767px){.hsi-screen{padding:var(--sp-12,48px) 0 var(--sp-6,24px)}.hsi-screen__title{font-size:var(--fs-3xl,30px);line-height:var(--lh-3xl,36px)}.hsi-screen__sub{font-size:var(--fs-md,16px);white-space:normal}.hsi-screen__copy{text-align:left}.hsi-screen__cta{justify-content:center}}
@media(max-width:480px){.hsi-screen__badge{max-width:100%}.hsi-screen__badge-text{white-space:normal}}
@media(max-width:384px){.hsi-screen__title{font-size:var(--fs-3xl,30px);line-height:var(--lh-3xl,36px)}}

.hsi{--tp:#2d2d2d;--ts:#8a8a8f;--acc:#7d4ccf;--bd:#e8e8eb;--sec:#f4f4f6;font-family:var(--font-sans,'Roboto',system-ui,-apple-system,'Segoe UI',sans-serif);color:var(--tp);-webkit-font-smoothing:antialiased;text-align:left;display:flex;justify-content:center;zoom:.894}
.hsi *{box-sizing:border-box;margin:0;padding:0}
.hsi .mod{width:1360px;flex:0 0 auto;background:#f1f1f4;border:1px solid var(--bd);border-radius:16px;box-shadow:0 14px 34px -20px rgba(45,45,45,.30);overflow:hidden}
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
.hsi .card{background:#fff;border:1px solid var(--bd);border-radius:12px;padding:14px;box-shadow:0 0 2px rgba(45,45,45,.05);display:flex;flex-direction:column;gap:11px}
.hsi .ct{font-size:14.5px;font-weight:500;line-height:1.35;color:var(--tp)}
.hsi .row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.hsi .prio{display:inline-flex;align-items:center;gap:3px;color:var(--ts);font-size:13px}
.hsi .prio b{color:#6b6b70;font-weight:600}
.hsi .sub{display:inline-flex;align-items:center;gap:4px;color:var(--ts);font-size:12.5px}
.hsi .cnts{display:flex;gap:12px}
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
.hsi .av{width:24px;height:24px;border-radius:50%;border:2px solid #fff;margin-left:-7px;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;line-height:1}
.hsi .av:first-child{margin-left:0}
.hsi .plus{font-size:12.5px;color:var(--ts);margin-left:7px}
.hsi .due{display:inline-flex;align-items:center;gap:5px;color:var(--ts);font-size:12.5px}
.hsi .drag-slot{position:relative}
/* Окно карточки (opt-in cardWindow): поверх правого края доски, стиль WindowCardMock */
/* Анимация cardWindow: курсор наводится на карточку, щелкает, окно выезжает справа налево */
.hsi .cw-clip{position:absolute;top:0;right:0;bottom:0;width:490px;overflow:hidden;border-radius:0 16px 16px 0;z-index:5;pointer-events:none}
.hsi .card.is-target{position:relative}
.hsi .stage .card.is-target{animation:hsiPickCard 5s ease-in-out .4s 1 both}
.hsi .pick{display:none}
.hsi .stage .pick{display:block;position:absolute;left:58%;top:34%;z-index:6;pointer-events:none;opacity:0;transform-origin:15px 6px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.25));animation:hsiPick 5s ease-in-out .4s 1 both}
@keyframes hsiPick{0%{opacity:0;transform:translate(110px,115px)}10%{opacity:1;transform:translate(110px,115px)}45%{opacity:1;transform:translate(0,0) scale(1)}52%{transform:translate(0,0) scale(.8)}58%,100%{opacity:1;transform:translate(0,0) scale(1)}}
@keyframes hsiPickCard{0%,44%{border-color:var(--bd);box-shadow:0 0 2px rgba(45,45,45,.05)}47%,100%{border-color:#b99be8;box-shadow:0 8px 22px -10px rgba(125,76,207,.45)}}
@keyframes hsiPanel{0%,52%{transform:translateX(105%)}72%,100%{transform:translateX(0)}}

.hsi .stage{position:relative;flex:0 0 auto}
/* С окном карточки столбцы доски узкие и фиксированные — видно больше колонок слева от окна */
.hsi .stage .colhdr .c,.hsi .stage .col{flex:1 1 0;min-width:0}
/* Доска не ниже окна карточки, иначе низ окна обрезается */
.hsi .stage .mod{min-height:690px}
.hsi .cw{position:absolute;right:0;top:0;bottom:0;animation:hsiPanel 5s cubic-bezier(.4,0,.2,1) .4s 1 both;display:flex;flex-direction:column;width:440px;z-index:5;background:#fff;border:1px solid var(--bd);border-radius:0 16px 16px 0;box-shadow:-14px 0 28px -18px rgba(45,45,45,.25);padding:20px 24px}
/* Мобилка и уменьшенное движение: без анимации, сразу последний кадр */
@media(max-width:767px){
  .hsi .cw{animation:none;transform:translateX(0)}
  .hsi .stage .pick{animation:none;opacity:1;transform:translate(0,0)}
  .hsi .stage .card.is-target{animation:none;border-color:#b99be8;box-shadow:0 8px 22px -10px rgba(125,76,207,.45)}
}
@media(prefers-reduced-motion:reduce){
  .hsi .cw{animation:none;transform:translateX(0)}
  .hsi .stage .pick{animation:none;opacity:1;transform:translate(0,0)}
  .hsi .stage .card.is-target{animation:none;border-color:#b99be8;box-shadow:0 8px 22px -10px rgba(125,76,207,.45)}
}
.hsi .cw__desc{margin-top:8px;font-size:12.5px;line-height:1.45;color:var(--tp)}
.hsi .cw__cm{margin-top:auto;padding-top:10px;display:flex;gap:10px;font-size:13px;line-height:1.45}
.hsi .cw__cm b{font-weight:600}
.hsi .cw__cm .t{color:var(--ts);font-size:12px;margin-left:6px}
.hsi .cw__lk{margin-top:8px;display:flex;flex-direction:column;gap:6px}
.hsi .cw__lk-hd{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:var(--ts)}
.hsi .cw__lk-sel{border:1px solid var(--bd);border-radius:6px;padding:2px 8px;font-size:12px;color:var(--tp)}
.hsi .cw__child{display:flex;align-items:center;gap:10px;border:1px solid var(--bd);border-radius:6px;padding:3px 10px;font-size:12px;line-height:1.35}
.hsi .cw__child .n{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hsi .cw__child .m{display:flex;align-items:center;gap:8px;color:var(--ts);font-size:12px;flex:none}
.hsi .cw__child .m>span{display:inline-flex;align-items:center;gap:3px;white-space:nowrap}
.hsi .cw__child .a{width:18px;height:18px;border-radius:50%;background:var(--sec);display:inline-flex;align-items:center;justify-content:center;font-size:10px;color:var(--ts)}
.hsi .cw__add{align-self:flex-start;border:1px solid var(--bd);border-radius:6px;padding:3px 10px;font-size:10.5px;line-height:1.4;font-weight:600;text-transform:uppercase;color:var(--tp)}
.hsi .cw__x{position:absolute;top:26px;right:26px;color:var(--ts);display:flex;line-height:0}
.hsi .cw__t{padding-right:28px;font-size:20px;font-weight:600;line-height:1.3}
.hsi .cw__meta{margin-top:8px;font-size:13px;color:var(--ts)}
.hsi .cw__meta a{color:var(--acc);text-decoration:underline;text-underline-offset:2px}
.hsi .cw__tb{display:flex;align-items:center;gap:6px;margin-top:10px}
.hsi .cw__plus{width:36px;height:36px;border-radius:50%;background:var(--acc);color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;line-height:1}
.hsi .cw__btn{height:32px;padding:0 12px;border:1px solid var(--bd);border-radius:16px;display:flex;align-items:center;font-size:12px;font-weight:600;text-transform:uppercase;color:var(--tp)}
.hsi .cw__btn{gap:6px}
.hsi .cw__ic{width:32px;padding:0;justify-content:center;font-size:14px}
.hsi .cw__rec{width:10px;height:10px;border-radius:2px;background:var(--acc);display:inline-block}
.hsi .cw__sec{margin-top:12px;font-size:14px;font-weight:600}
.hsi .cw__row{display:grid;grid-template-columns:120px 1fr;align-items:center;gap:12px;margin-top:8px;font-size:13.5px}
.hsi .cw__row .l{color:var(--ts)}
.hsi .cw__link{color:var(--acc);text-decoration:underline;text-underline-offset:2px}
.hsi .cw__pill{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:4px 10px;font-size:12px;background:var(--sec)}
.hsi .cw__av{width:18px;height:18px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:8px;font-weight:600}
.hsi .cw__bar{height:6px;border-radius:3px;background:#ececef;overflow:hidden}
.hsi .cw__bar i{display:block;height:100%;width:60%;background:var(--acc)}
.hsi .cw__ck{display:flex;align-items:center;gap:10px;margin-top:7px;font-size:13.5px}
.hsi .cw__box{width:18px;height:18px;border-radius:4px;border:1.5px solid #cfcfd4;display:flex;align-items:center;justify-content:center;color:#fff;flex:none}
.hsi .cw__box.on{background:var(--acc);border-color:var(--acc)}
/* Боковое меню (opt-in sidebar): окно 1360 = меню 260 + доска */
.hsi .win{width:1360px;flex:0 0 auto;display:flex;background:#fff;border:1px solid var(--bd);border-radius:16px;box-shadow:0 0 50px -24px rgba(45,45,45,.35);overflow:hidden}
.hsi .win .mod{width:auto;flex:1;min-width:0;border:0;border-radius:0;box-shadow:none}
.hsi .side{width:260px;flex:none;display:flex;flex-direction:column;background:var(--sec);border-right:1px solid var(--bd);padding:12px 8px}
.hsi .side__hd{display:flex;align-items:center;justify-content:space-between;padding:4px 8px 10px;font-size:16px;font-weight:600}
.hsi .side__muted{color:var(--ts);display:inline-flex;flex:none}
.hsi .side__search{display:flex;gap:8px;padding:0 4px 8px}
.hsi .side__input{flex:1;display:flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--bd);border-radius:8px;padding:7px 10px;font-size:13.5px;color:var(--ts)}
.hsi .side__plus{width:34px;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid var(--bd);border-radius:8px;color:var(--ts)}
.hsi .side__tree{flex:1;overflow:hidden}
.hsi .side__it{display:flex;align-items:center;gap:7px;padding:7px 8px;border-radius:8px;font-size:13.5px;color:var(--tp);white-space:nowrap}
.hsi .side__it.is-active{background:#e6e6ea;font-weight:500}
.hsi .side__emoji{font-size:14px;line-height:1;width:16px;text-align:center;flex:none}
.hsi .side__lbl{overflow:hidden;text-overflow:ellipsis}
.hsi .win .lane .cnt2{background:#dcdce1;color:#45454a}
.hsi .win .hand{top:52%}
.hsi .side__foot{border-top:1px solid var(--bd);padding-top:6px}
/* Место, откуда карточку унесли: плашка чёрным с прозрачностью 10%. */
/* Доска с меню (лендинг «Единое рабочее пространство»): после цикла пауза 5 секунд */
@keyframes hsiTravelP{0%{transform:translate(0,0)}5%{transform:translate(0,0)}10%{transform:translate(4px,-12px)}22%{transform:translate(154px,48px)}28%{transform:translate(154px,48px)}41%{transform:translate(4px,-12px)}47%{transform:translate(0,0)}50%,100%{transform:translate(0,0)}}
@keyframes hsiLiftP{0%{transform:rotate(0) scale(1);box-shadow:0 0 2px rgba(45,45,45,.06)}5%{transform:rotate(0) scale(1);box-shadow:0 0 2px rgba(45,45,45,.06)}10%{transform:rotate(3deg) scale(1.03);box-shadow:0 0 45px -12px rgba(45,45,45,.40)}41%{transform:rotate(3deg) scale(1.03);box-shadow:0 0 45px -12px rgba(45,45,45,.40)}47%{transform:rotate(0) scale(1);box-shadow:0 0 2px rgba(45,45,45,.06)}50%,100%{transform:rotate(0) scale(1);box-shadow:0 0 2px rgba(45,45,45,.06)}}
@keyframes hsiHandP{0%{opacity:0}5%{opacity:0}10%{opacity:1}43%{opacity:1}50%,100%{opacity:0}}
@keyframes hsiGhostP{0%{opacity:0}7%{opacity:0}10%{opacity:1}41%{opacity:1}46%{opacity:0}50%,100%{opacity:0}}
@keyframes hsiDropP{0%,15%{opacity:0}19%{opacity:1}38%{opacity:1}42%,50%,100%{opacity:0}}
@media(min-width:768px){.hsi .win .drag-layer{animation-name:hsiTravelP;animation-duration:10s}.hsi .win .drag-card{animation-name:hsiLiftP;animation-duration:10s}.hsi .win .hand{animation-name:hsiHandP;animation-duration:10s}.hsi .win .drag-ghost{animation-name:hsiGhostP;animation-duration:10s}.hsi .win .drop-slot{animation-name:hsiDropP;animation-duration:10s}}
.hsi .drop-slot{display:block;height:120px;border-radius:12px;background:var(--_brand-12k);opacity:0;animation:hsiDrop 5s ease-in-out infinite}
@keyframes hsiDrop{0%,30%{opacity:0}38%{opacity:1}76%{opacity:1}84%,100%{opacity:0}}
.hsi .drag-ghost{position:absolute;inset:0;border-radius:12px;background:rgba(0,0,0,.1);opacity:0;z-index:1;pointer-events:none;animation:hsiGhost 5s ease-in-out infinite}
.hsi .drag-layer{position:relative;z-index:30;animation:hsiTravel 5s ease-in-out infinite}
.hsi .drag-card{border:1px solid #e0d6f3;transform-origin:center;animation:hsiLift 5s ease-in-out infinite}
.hsi .hand{position:absolute;left:84%;top:32%;transform:translate(-50%,-50%);width:40px;height:40px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.25));animation:hsiHand 5s ease-in-out infinite;z-index:31}
@keyframes hsiTravel{0%{transform:translate(0,0)}10%{transform:translate(0,0)}20%{transform:translate(4px,-12px)}44%{transform:translate(154px,48px)}56%{transform:translate(154px,48px)}82%{transform:translate(4px,-12px)}94%{transform:translate(0,0)}100%{transform:translate(0,0)}}
@keyframes hsiLift{0%{transform:rotate(0) scale(1);box-shadow:0 0 2px rgba(45,45,45,.06)}10%{transform:rotate(0) scale(1);box-shadow:0 0 2px rgba(45,45,45,.06)}20%{transform:rotate(3deg) scale(1.03);box-shadow:0 0 45px -12px rgba(45,45,45,.40)}82%{transform:rotate(3deg) scale(1.03);box-shadow:0 0 45px -12px rgba(45,45,45,.40)}94%{transform:rotate(0) scale(1);box-shadow:0 0 2px rgba(45,45,45,.06)}100%{transform:rotate(0) scale(1);box-shadow:0 0 2px rgba(45,45,45,.06)}}
@keyframes hsiHand{0%{opacity:0}10%{opacity:0}20%{opacity:1}86%{opacity:1}100%{opacity:0}}
@keyframes hsiGhost{0%{opacity:0}14%{opacity:0}20%{opacity:1}82%{opacity:1}92%{opacity:0}100%{opacity:0}}
@media(prefers-reduced-motion:reduce){.hsi .drag-layer,.hsi .drag-card,.hsi .hand,.hsi .drag-ghost{animation:none}}
/* Фолбэк до гидратации: заведомо меньшие ступени, чтобы доска не вылезала
   за экран ещё до того, как JS посчитает точный масштаб по ширине слота. */
@media(max-width:1279px){.hsi{zoom:.68}}
@media(max-width:980px){.hsi{zoom:.5}}
@media(max-width:767px){.hsi{zoom:.42}}
@media(max-width:600px){.hsi{zoom:.34}}
@media(max-width:480px){.hsi{zoom:.26}}
@media(max-width:384px){.hsi{zoom:.2}}
/* Мобилка: доска без анимации. Кадр застывает в момент, когда карточку донесли до соседней
   колонки: слой смещён в конечную точку, карточка приподнята, рука и призрак видны. */
@media(max-width:767px){
  .hsi .drop-slot{animation:none;opacity:1}
  .hsi .drag-layer{animation:none;transform:translate(154px,48px)}
  .hsi .drag-card{animation:none;transform:rotate(3deg) scale(1.03);box-shadow:0 0 45px -12px rgba(45,45,45,.40)}
  .hsi .hand{animation:none;opacity:1}
  .hsi .drag-ghost{animation:none;opacity:1}
}
`;

/** Окно открытой карточки задачи — для opt-in `cardWindow` первого экрана. */
function CardWindow() {
  const Box = ({ on }: { on?: boolean }) => (
    <span className={on ? 'cw__box on' : 'cw__box'}>{on && <Check />}</span>
  );
  return (
    <div className="cw">
      <span className="cw__x" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </span>
      <div className="cw__t">Промостраница новой функции</div>
      <div className="cw__meta"><a>#48210573</a> Заказчик <a>Анна</a> · Создана 3 дня назад</div>
      <div className="cw__tb">
        <span className="cw__plus">+</span>
        <span className="cw__btn cw__ic"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 5v14l11-7z" fill="currentColor" stroke="none" /></svg></span>
        <span className="cw__btn">→ Проверка</span>
        <span className="cw__btn cw__ic"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="currentColor" stroke="none" /></svg></span>
        <span className="cw__btn cw__ic">!</span>
        <span className="cw__btn cw__ic"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" /></svg></span>
        <span className="cw__btn cw__ic">⋮</span>
      </div>
      <div className="cw__sec">Основные параметры</div>
      <div className="cw__row"><span className="l">Расположение</span><span className="cw__link">Маркетинг / Проверка</span></div>
      <div className="cw__row"><span className="l">Участники</span><span><span className="cw__pill"><span className="cw__av" style={{ background: '#b88ac9' }}>АК</span>Ответственный</span></span></div>
      <div className="cw__row"><span className="l">Срок</span><span>18 сентября</span></div>
      <div className="cw__row"><span className="l">Метки</span><span><span className="cw__pill" style={{ background: '#e9f5ea', color: '#2e7d32' }}>Сайт</span></span></div>
      <div className="cw__row"><span className="l">Чек-лист 3/5</span><span className="cw__bar"><i /></span></div>
      <div className="cw__ck"><Box on />Собрать тексты и скриншоты</div>
      <div className="cw__ck"><Box on />Согласовать макет</div>
      <div className="cw__ck"><Box />Опубликовать страницу</div>
      <div className="cw__sec">Описание</div>
      <div className="cw__desc">Страница о новой функции для раздела «Продукт»: текст, три скриншота и кнопка регистрации. Макет в дочерней карточке.</div>
      <div className="cw__sec">Связи</div>
      <div className="cw__lk">
        <div className="cw__lk-hd"><span>Дочерние карточки</span><span className="cw__lk-sel">Список ▾</span></div>
          <div className="cw__child"><span className="n">Верстка главной страницы</span><span className="m"><span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m21 11-8.6 8.6a5 5 0 0 1-7-7l8.6-8.6a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9"/></svg> 1</span><span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg> 1</span><span className="a">А</span></span></div>
          <div className="cw__child"><span className="n">Тестирование главной и каталога</span><span className="m"><span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m21 11-8.6 8.6a5 5 0 0 1-7-7l8.6-8.6a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9"/></svg> 1</span><span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg> 2</span><span className="a">А</span></span></div>
        <span className="cw__add">Добавить дочернюю карточку</span>
      </div>
      <div className="cw__cm">
        <span className="cw__av" style={{ background: '#8aa8c9', width: 28, height: 28, flex: 'none', fontSize: 11, marginTop: 4 }}>Е</span>
        <span><b>Елена</b><span className="t">сегодня, 11:40</span><br />Скриншоты приложила, осталось согласовать заголовок</span>
      </div>
    </div>
  );
}

export function HeroScreenInterface({
  eyebrow,
  eyebrowIcon,
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
  sidebar,
  cardWindow,
  appShell,
  spaceTitle,
  scale,
  trustLine,
  className,
  ariaLabel,
}: HeroScreenInterfaceProps) {
  /*
   * Доска нарисована на 1360px. Масштаб считаем от реальной ширины слота, а не
   * ступенями по брейкпоинтам: на десктопе упираемся в контейнер DS (1216px),
   * ниже — сжимаем пропорционально, чтобы доска целиком влезала в экран.
   */
  const visualRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<number | null>(null);

  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (!w) return;
      const next = Math.min(BOARD_MAX_WIDTH, w) / (appShell ? APP_DESIGN_WIDTH : BOARD_DESIGN_WIDTH);
      setFit((prev) => (prev == null || Math.abs(prev - next) > 0.001 ? next : prev));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [appShell]);

  const boardZoom = scale ?? fit ?? undefined;
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
            <div className="hsi-screen__badge">
              {isProductNavIcon(eyebrowIcon) ? (
                <>
                  {/* Иконка встает после первого слова бейджа: «Функция ▣ «Задачи»» */}
                  <span className="hsi-screen__badge-text hsi-screen__badge-text--lead">{eyebrow.split(' ')[0]}</span>
                  <ProductNavIcon name={eyebrowIcon} className="hsi-screen__badge-icon" />
                  {eyebrow.split(' ').slice(1).join(' ') && (
                    <span className="hsi-screen__badge-text">{eyebrow.split(' ').slice(1).join(' ')}</span>
                  )}
                </>
              ) : (
                <span className="hsi-screen__badge-text">{eyebrow}</span>
              )}
            </div>
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

        <div className="hsi-screen__visual" ref={visualRef}>
          <div className={appShell ? 'hsi hsi--app' : 'hsi'} aria-hidden="true" style={boardZoom != null ? { zoom: boardZoom } : undefined}>
            {appShell ? (
              <HsiApp boardTitle={boardTitle} spaceTitle={spaceTitle} columns={columns} lanes={lanes} />
            ) : (() => {
              const board = (
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
              );
              const shell = sidebar ? <div className="win"><Sidebar />{board}</div> : board;
              return cardWindow ? <div className="stage">{shell}<div className="cw-clip"><CardWindow /></div></div> : shell;
            })()}
          </div>
        </div>

        {trustLine && trustLine.length > 0 && (
          <div className="hsi-screen__trust">
            <div className="trust-track">
              <TrustSet items={trustLine} />
              <span className="trust-gap" aria-hidden="true" />
              <TrustSet items={trustLine} clone />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Доска первого экрана отдельно от копирайта — для Module-мока в библиотеке
 * (`module-workspace-board`). Та же разметка и стили, что в HeroScreenInterface,
 * дизайн-ширина 1360px; масштаб задает обертка (ScaleToFit), поэтому свой zoom
 * сброшен в 1 (иначе сработали бы ступени zoom из медиазапросов первого экрана).
 */
export function HsiBoard({
  boardTitle,
  columns,
  lanes,
  animate,
  animatedCard,
  sidebar,
}: Pick<HeroScreenInterfaceProps, 'boardTitle' | 'columns' | 'lanes' | 'animate' | 'animatedCard' | 'sidebar'>) {
  const board = (
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
  );
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="hsi" aria-hidden="true" style={{ zoom: 1 }}>
        {sidebar ? <div className="win"><Sidebar />{board}</div> : board}
      </div>
    </>
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
