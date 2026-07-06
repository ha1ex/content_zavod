import { useState, type ReactNode } from 'react';

/**
 * TabsGallery — модуль «галерея по вкладкам» (секция #teams лендинга,
 * «Каждая команда работает в своём привычном формате»).
 *
 * Шаблон для наполнения: сохранены СТИЛИ, ЭЛЕМЕНТЫ и ПРАВИЛА АДАПТАЦИИ.
 * Количество категорий (вкладок) — любое, задаётся через `items`. Заголовок
 * секции, подписи вкладок, тексты и картинки панелей вынесены в пропсы; по
 * умолчанию — нейтральные плейсхолдеры без реального контента.
 *
 * Устройство: одна активная категория за раз (переключатель по состоянию).
 *  - `.stabs__tabs` — ряд пилюль-вкладок (segmented control на белом фоне),
 *    активная — brand-100 на фиолетовом.
 *  - `.stp` — панель категории (показывается только активная, `.on`).
 *  - `.stabs__card` — карточка панели (radius 16, белый фон):
 *      `.stabs__text` (заголовок 18/28, текст 16/24, outline-CTA) +
 *      `.stabs__imgwrap` → `.stabs__img` (превью, aspect-ratio 1600/886).
 *  - `.stabs__nav` — стрелки ‹ › + счётчик «1 / N» (текущая цифра — brand).
 *
 * Правила адаптации:
 *  - Desktop ≥1024: вкладки-пилюли сверху (`.stabs__tabs` показаны), стрелки
 *    скрыты; панель в строку — текст слева (384px, CTA прижата к низу) +
 *    картинка справа (800px), gap 32.
 *  - Tablet 768–1023: вкладки скрыты, переключение стрелками ‹ ›; панель в
 *    колонку — текст сверху, картинка снизу.
 *  - Mobile ≤767: то же, но картинка сверху, текст снизу; радиус превью 8.
 *
 * Self-contained: scoped `<style>` под `.tabsg-mock`, палитра V01, шрифт Inter.
 */

export interface TabsGalleryItem {
  /** Подпись вкладки. */
  label: ReactNode;
  /** Заголовок панели. */
  title: ReactNode;
  /** Описание панели. */
  desc?: ReactNode;
  /** Ссылка кнопки «Попробовать шаблон». */
  ctaHref?: string;
  /** URL превью-картинки. Если не передать — серый плейсхолдер. */
  image?: string;
}

export interface TabsGalleryProps {
  /** Заголовок секции. */
  title?: string;
  /** Подзаголовок секции. */
  subtitle?: string;
  /** Категории-вкладки. Если не передать — нейтральные плейсхолдеры. */
  items?: TabsGalleryItem[];
  /** Подпись кнопки (по умолчанию «Попробовать шаблон»). */
  ctaLabel?: string;
}

const STYLE = `
.tabsg-mock{
  --brand-100:#7d4ccf; --brand-hover:#6a3fb3; --brand-12:#efe9f9; --brand-48k:#c4a9ee;
  --border-default:#e0e0e0; --text-title:#2d2d2d; --text-secondary:#757575;
  --surface-page:#ffffff; --surface-section:#f5f5f5;
  --sp-4:16px; --sp-6:24px; --sp-8:32px; --sp-12:48px; --sp-24:96px;
  font-family:'Inter',system-ui,-apple-system,sans-serif; color:var(--text-title);
  display:block; width:100%; background:var(--surface-page);
  padding:var(--sp-24) var(--sp-4); box-sizing:border-box; letter-spacing:-.2px;
}
.tabsg-mock, .tabsg-mock *{box-sizing:border-box;}
.tabsg-mock .s-head{display:flex; flex-direction:column; align-items:center; text-align:center; gap:12px; margin:0 auto var(--sp-12); max-width:760px;}
.tabsg-mock .sh__heading{font-size:36px; line-height:40px; font-weight:600; color:var(--text-title); margin:0;}
.tabsg-mock .sh__desc{font-size:16px; line-height:24px; color:var(--text-secondary); margin:0;}

.tabsg-mock .stabs{width:100%; max-width:1216px; margin:0 auto;}
.tabsg-mock .stabs__tabs{display:none; justify-content:center; margin-bottom:40px;}
.tabsg-mock .stabs__tabgroup{display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:4px; border-radius:8px; background:var(--surface-page); padding:4px; box-shadow:0 0 0 1px var(--border-default) inset;}
.tabsg-mock .stabs__tab{height:36px; display:inline-flex; align-items:center; justify-content:center; white-space:nowrap; border-radius:6px; padding:10px 24px; font-size:14px; font-weight:500; color:var(--text-title); background:none; border:0; cursor:pointer; font-family:inherit; transition:background .15s,color .15s;}
.tabsg-mock .stabs__tab:hover{background:var(--brand-12);}
.tabsg-mock .stabs__tab.on{background:var(--brand-100); color:#fff; box-shadow:0 1px 2px rgba(16,24,40,.05);}

.tabsg-mock .stp{display:none;}
.tabsg-mock .stp.on{display:block;}
.tabsg-mock .stabs__card{overflow:hidden; border-radius:16px; background:var(--surface-page); box-shadow:0 0 0 1px var(--border-default) inset;}
.tabsg-mock .stabs__row{display:flex; flex-direction:column;}
.tabsg-mock .stabs__text{order:2; display:flex; flex-direction:column; justify-content:center; gap:16px; padding:24px;}
.tabsg-mock .stabs__text h3{font-size:18px; line-height:28px; font-weight:600; color:var(--text-title); margin:0;}
.tabsg-mock .stabs__text p{font-size:16px; line-height:24px; color:var(--text-title); margin:0;}
.tabsg-mock .stabs__cta{align-self:flex-start; display:inline-flex; align-items:center; gap:4px; border:1px solid var(--border-default); background:var(--surface-page); border-radius:8px; padding:10px 16px; font-size:16px; line-height:24px; font-weight:500; color:var(--brand-100); text-decoration:none; transition:background .15s;}
.tabsg-mock .stabs__cta:hover{background:var(--brand-12);}
.tabsg-mock .stabs__imgwrap{order:1; min-width:0; flex:1; padding:16px;}
.tabsg-mock .stabs__img{aspect-ratio:1600/886; width:100%; overflow:hidden; border-radius:12px; background:var(--surface-section);}
.tabsg-mock .stabs__img img{height:100%; width:100%; object-fit:cover; object-position:top; display:block;}
.tabsg-mock .stabs__img .ph{height:100%; width:100%; display:flex; align-items:center; justify-content:center; color:#bdbdbd;}
.tabsg-mock .stabs__img .ph svg{width:48px; height:48px;}

.tabsg-mock .stabs__nav{margin-top:24px; display:flex; align-items:center; justify-content:center; gap:16px;}
.tabsg-mock .stabs__navbtn{width:40px; height:40px; border-radius:9999px; border:1px solid var(--border-default); background:var(--surface-page); display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--brand-100); transition:background .18s,border-color .18s,color .18s,box-shadow .18s;}
.tabsg-mock .stabs__navbtn:hover:not(:disabled){background:var(--brand-12); border-color:var(--brand-48k); color:var(--brand-hover);}
.tabsg-mock .stabs__navbtn:focus-visible{outline:none; box-shadow:0 0 0 4px rgba(152,162,179,.14);}
.tabsg-mock .stabs__navbtn svg{width:20px; height:20px;}
.tabsg-mock .stabs__counter{min-width:48px; text-align:center; font-size:16px; font-weight:400; color:var(--text-title); font-variant-numeric:tabular-nums;}
.tabsg-mock .stabs__counter b{color:var(--brand-100); font-weight:500;}

@media(min-width:768px){
  .tabsg-mock .stabs__text{order:1;}
  .tabsg-mock .stabs__imgwrap{order:2;}
}
@media(min-width:1024px){
  .tabsg-mock .stabs__tabs{display:flex;}
  .tabsg-mock .stabs__nav{display:none;}
  .tabsg-mock .stabs__row{flex-direction:row; gap:32px;}
  .tabsg-mock .stabs__text{order:0; width:384px; flex-shrink:0; padding:48px 0 48px 48px; justify-content:flex-start;}
  .tabsg-mock .stabs__text .stabs__cta{margin-top:auto;}
  .tabsg-mock .stabs__imgwrap{order:0; width:800px; flex-shrink:0; padding:16px;}
}
@media(max-width:767px){
  .tabsg-mock{padding:var(--sp-12) var(--sp-4);}
  .tabsg-mock .stabs__img{border-radius:8px;}
}
`;

const PLACEHOLDER_ITEMS: TabsGalleryItem[] = [
  { label: 'Категория 1', title: 'Заголовок категории', desc: 'Короткое описание сценария: что делает команда и какую пользу даёт инструмент.' },
  { label: 'Категория 2', title: 'Заголовок категории', desc: 'Короткое описание сценария: что делает команда и какую пользу даёт инструмент.' },
  { label: 'Категория 3', title: 'Заголовок категории', desc: 'Короткое описание сценария: что делает команда и какую пользу даёт инструмент.' },
];

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const MediaPlaceholder = () => (
  <span className="ph" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  </span>
);

export function TabsGallery({
  title = 'Заголовок секции',
  subtitle = 'Подзаголовок секции — одна строка про суть',
  items,
  ctaLabel = 'Попробовать шаблон',
}: TabsGalleryProps) {
  const data = items && items.length ? items : PLACEHOLDER_ITEMS;
  const [active, setActive] = useState(0);
  const n = data.length;
  const go = (k: number) => setActive(((k % n) + n) % n);

  return (
    <section className="tabsg-mock" aria-label="Категории">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="s-head">
        <h2 className="sh__heading">{title}</h2>
        {subtitle ? <p className="sh__desc">{subtitle}</p> : null}
      </div>

      <div className="stabs">
        <div className="stabs__tabs">
          <div className="stabs__tabgroup" role="tablist">
            {data.map((it, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={'stabs__tab' + (i === active ? ' on' : '')}
                onClick={() => setActive(i)}
              >
                {it.label}
              </button>
            ))}
          </div>
        </div>

        {data.map((it, i) => (
          <div className={'stp' + (i === active ? ' on' : '')} key={i} role="tabpanel">
            <div className="stabs__card">
              <div className="stabs__row">
                <div className="stabs__text">
                  <h3>{it.title}</h3>
                  {it.desc ? <p>{it.desc}</p> : null}
                  <a className="stabs__cta" href={it.ctaHref ?? '#'} target="_blank" rel="noopener">
                    {ctaLabel}
                  </a>
                </div>
                <div className="stabs__imgwrap">
                  <div className="stabs__img">
                    {it.image ? <img src={it.image} alt="" loading="lazy" /> : <MediaPlaceholder />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="stabs__nav" role="group" aria-label="Листать категории">
          <button type="button" className="stabs__navbtn stabs__prev" aria-label="Предыдущая" onClick={() => go(active - 1)}>
            <ChevronLeft />
          </button>
          <span className="stabs__counter"><b>{active + 1}</b> / {n}</span>
          <button type="button" className="stabs__navbtn stabs__next" aria-label="Следующая" onClick={() => go(active + 1)}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default TabsGallery;
