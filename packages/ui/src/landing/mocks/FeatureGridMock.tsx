'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * FeatureGridMock — модуль «сетка фич продукта» (секция #features лендинга,
 * «Всё, что нужно для работы… — внутри Кайтен»).
 *
 * Шаблон для наполнения: сохранены СТИЛИ, ТИПОГРАФИКА, ОТСТУПЫ и ПРАВИЛА
 * АДАПТАЦИИ. Заголовок секции и карточки (иллюстрация + название + описание)
 * идут через пропсы; по умолчанию — нейтральные плейсхолдеры.
 *
 * ПРАВИЛО: иллюстрацией каждой карточки ВСЕГДА выступает мини-мокап фичи из
 * компонента FeatureMocks (`Feature.tsx`, content_zavod) — по одному на карточку,
 * передаётся в `items[].illustration`. Другие изображения сюда не вставлять.
 * Здесь мокапы НЕ зашиты — только рамка `.fg-illus` (макс. ширина 260, центр);
 * без переданной иллюстрации показывается серый плейсхолдер.
 *
 * Адаптация:
 *  - desktop ≥1280: сетка 3 колонки (grid), навигация скрыта, заголовок по центру;
 *  - планшет/мобилка ≤1279: горизонтальная карусель (flex + scroll-snap), выведена
 *    ВО ВСЮ ШИРИНУ ЭКРАНА (full-bleed: отрицательные поля = паддинг контейнера),
 *    первая карточка отступает по сетке (24px планшет / 16px мобилка), непоместившаяся
 *    карточка видна до края экрана (подгляд), листается стрелками ‹ › со счётчиком;
 *    ширина карточки 340px (планшет) / 86% (мобилка); ≤767 заголовок влево.
 *
 * Карусель управляется на React-хуках (useRef/useState/useEffect): step = ширина
 * карточки + gap, кнопки прокручивают на один step, счётчик и disabled — из scroll.
 * Компонент клиентский (interactive) — отсюда 'use client'.
 *
 * Self-contained: scoped `<style>` под `.fg-mock`, палитра V01, шрифт inherit.
 */

export interface FeatureGridMockItem {
  /** Название фичи. */
  title: ReactNode;
  /** Описание (сценарий → польза). */
  desc?: ReactNode;
  /** ПРАВИЛО: сюда вставляется мини-мокап фичи из FeatureMocks (`Feature.tsx`). Нет — серый плейсхолдер. */
  illustration?: ReactNode;
}

export interface FeatureGridMockProps {
  /** Заголовок секции. */
  title?: string;
  /** Подзаголовок. */
  subtitle?: string;
  /** Карточки фич. Если не передать — нейтральные плейсхолдеры. */
  items?: FeatureGridMockItem[];
}

const STYLE = `
.fg-mock{
  --sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-6:24px; --sp-8:32px; --sp-12:48px; --sp-16:64px; --sp-24:96px;
  --radius-2xl:16px;
  --fw-reg:400; --fw-med:500; --fw-semi:600; --ls:-0.2px;
  --brand-100:#7d4ccf; --brand-12:#efe9f9; --brand-48k:rgba(125,76,207,.48);
  --text-title:#2d2d2d; --text-secondary:#757575; --border-default:#e0e0e0;
  --surface-page:#ffffff; --surface-section:#f5f5f5;
  --ease-ui:cubic-bezier(.2,0,.2,1);
  font-family:inherit; color:var(--text-title);
  display:block; width:100%; background:var(--surface-page);
  padding:var(--sp-24) 0; box-sizing:border-box; overflow:hidden;
}
.fg-mock, .fg-mock *{ box-sizing:border-box; }
.fg-inner{ max-width:1216px; margin:0 auto; padding:0 var(--sp-4); }

.fg-head{ display:flex; flex-direction:column; align-items:center; text-align:center; margin:0 auto var(--sp-12); max-width:820px; }
.fg-heading{ font-size:36px; line-height:40px; font-weight:var(--fw-semi); letter-spacing:0; margin:0; }
.fg-desc{ font-size:16px; line-height:24px; font-weight:var(--fw-reg); letter-spacing:var(--ls); color:var(--text-title); margin:var(--sp-4) 0 0; }

.fg-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:var(--sp-8); }
.fg-card{ background:var(--surface-section); border-radius:var(--radius-2xl); padding:var(--sp-4) var(--sp-6) var(--sp-6); display:flex; flex-direction:column; gap:var(--sp-3); }
.fg-illus{ width:100%; max-width:260px; margin:var(--sp-3) auto; }
.fg-illus .ph{ width:100%; aspect-ratio:240/176; border-radius:12px; background:#e9e9ec; display:flex; align-items:center; justify-content:center; color:#bdbdbd; }
.fg-illus .ph svg{ width:36px; height:36px; }
.fg-card h3{ font-size:20px; line-height:28px; font-weight:var(--fw-semi); color:var(--text-title); margin:0; }
.fg-card p{ font-size:16px; line-height:24px; color:var(--text-secondary); margin:0; }

.fg-nav{ display:none; align-items:center; justify-content:center; gap:14px; margin-top:var(--sp-8); }
.fg-nav button{ width:40px; height:40px; flex:none; border-radius:9999px; display:flex; align-items:center; justify-content:center; cursor:pointer; background:#fff; border:1px solid var(--border-default); color:var(--text-title); transition:background .14s var(--ease-ui), border-color .14s var(--ease-ui), color .14s var(--ease-ui), opacity .14s var(--ease-ui); }
.fg-nav button svg{ width:20px; height:20px; }
.fg-nav button:not(:disabled):hover{ background:var(--brand-12); border-color:var(--brand-48k); color:var(--brand-100); }
.fg-nav button:disabled{ opacity:.35; cursor:default; }
.fg-count{ font-size:16px; color:var(--text-title); min-width:48px; text-align:center; }
.fg-count b{ color:var(--brand-100); font-weight:var(--fw-med); }

/* планшет + мобилка: сетка → карусель во всю ширину экрана */
@media(max-width:1279px){
  .fg-mock{ padding:var(--sp-16) 0; }
  .fg-inner{ padding:0 var(--sp-6); }
  .fg-head{ margin-bottom:var(--sp-8); }
  .fg-grid{
    display:flex; grid-template-columns:none; overflow-x:auto; scroll-snap-type:x proximity;
    gap:var(--sp-6); scrollbar-width:none; -ms-overflow-style:none; padding-bottom:4px;
    margin-inline:calc(-1 * var(--sp-6)); padding-left:var(--sp-6); scroll-padding-left:var(--sp-6);
  }
  .fg-grid::-webkit-scrollbar{ display:none; }
  .fg-card{ flex:0 0 340px; max-width:340px; scroll-snap-align:start; }
  .fg-grid > .fg-card:last-child{ margin-right:var(--sp-6); }
  .fg-nav{ display:flex; }
}
@media(max-width:767px){
  .fg-mock{ padding:var(--sp-12) 0; }
  .fg-inner{ padding:0 var(--sp-4); }
  .fg-head{ align-items:flex-start; text-align:left; margin-bottom:var(--sp-6); }
  .fg-heading{ font-size:24px; line-height:32px; }
  .fg-grid{ gap:var(--sp-4); margin-inline:calc(-1 * var(--sp-4)); padding-left:var(--sp-4); scroll-padding-left:var(--sp-4); }
  .fg-card{ flex:0 0 86%; max-width:none; }
  .fg-grid > .fg-card:last-child{ margin-right:var(--sp-4); }
}
@media(prefers-reduced-motion:reduce){ .fg-grid{ scroll-behavior:auto; } }
`;

const PLACEHOLDER_ITEMS: FeatureGridMockItem[] = Array.from({ length: 6 }, () => ({
  title: 'Название фичи',
  desc: 'Короткое описание: рабочий сценарий и польза для роли',
}));

const IllusPlaceholder = () => (
  <span className="ph" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 4v16" />
    </svg>
  </span>
);

const PrevIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.25 6L9 12.25L15.25 18.5" />
  </svg>
);
const NextIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.75 19L15 12.75L8.75 6.5" />
  </svg>
);

export function FeatureGridMock({ title = 'Заголовок секции', subtitle, items }: FeatureGridMockProps) {
  const data = items && items.length ? items : PLACEHOLDER_ITEMS;
  const trackRef = useRef<HTMLDivElement>(null);
  const [nav, setNav] = useState({ idx: 0, atStart: true, atEnd: false, show: false });

  const stepOf = (track: HTMLDivElement) => {
    const c = track.querySelector<HTMLElement>('.fg-card');
    return c ? c.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 24) : 320;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      setNav({
        idx: Math.round(track.scrollLeft / stepOf(track)),
        atStart: track.scrollLeft <= 6,
        atEnd: track.scrollLeft >= maxScroll - 6,
        show: maxScroll > 6,
      });
    };
    update();
    const onScroll = () => window.requestAnimationFrame(update);
    track.addEventListener('scroll', onScroll);
    window.addEventListener('resize', update);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    ro?.observe(track);
    return () => {
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      ro?.disconnect();
    };
  }, [data.length]);

  const go = (dir: number) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: dir * stepOf(track), behavior: 'smooth' });
  };

  return (
    <section className="fg-mock" aria-label="Возможности продукта">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="fg-inner">
        <div className="fg-head">
          <h2 className="fg-heading">{title}</h2>
          {subtitle ? <p className="fg-desc">{subtitle}</p> : null}
        </div>

        <div className="fg-grid" ref={trackRef}>
          {data.map((c, i) => (
            <article className="fg-card" key={i}>
              <span className="fg-illus">{c.illustration ?? <IllusPlaceholder />}</span>
              <h3>{c.title}</h3>
              {c.desc ? <p>{c.desc}</p> : null}
            </article>
          ))}
        </div>

        <div className="fg-nav" style={{ display: nav.show ? undefined : 'none' }}>
          <button type="button" className="fg-prev" aria-label="Предыдущий" disabled={nav.atStart} onClick={() => go(-1)}>
            <PrevIcon />
          </button>
          <span className="fg-count"><b>{nav.idx + 1}</b> / {data.length}</span>
          <button type="button" className="fg-next" aria-label="Следующий" disabled={nav.atEnd} onClick={() => go(1)}>
            <NextIcon />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeatureGridMock;
