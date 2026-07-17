import { useRef, useState, type ReactNode } from 'react';

/**
 * HeroScreenVideo — модуль «первый экран лендинга со встроенным видео».
 *
 * Шаблон для наполнения: сохранены СТИЛИ, ТИПОГРАФИКА (размеры/веса/интерлиньяж/
 * трекинг), ОТСТУПЫ и ПРАВИЛА АДАПТАЦИИ. Текст, картинка/видео и шрифт НЕ зашиты —
 * шрифт наследуется от хоста (`font-family:inherit`), контент идёт через пропсы.
 *
 * Состав экрана (центрированная колонка):
 *  - бейдж-пилюля (`.sh-badge`) — фон brand-12, radius 16, текст 14/20 Medium, violet;
 *  - H1 (48/52 SemiBold, letter-spacing −1px);
 *  - подзаголовок (20/28 Regular, max-width 760, отступ снизу 32);
 *  - CTA-кнопка (violet fill, высота 48);
 *  - видео-блок (`.video-ph`, aspect 16/9, radius 16, тень) со встроенным
 *    `<video>` и фирменной круглой кнопкой play (violet 72px); нативные контролы
 *    появляются после старта;
 *  - trust-строка (`.trust-line`) — пункты с иконками через разделители; на
 *    планшете и мобилке превращается в медленную бегущую строку влево (marquee
 *    30s, бесшовный цикл за счёт дублированного набора).
 *
 * Отступы/адаптив:
 *  - hero padding-top: 48 (desktop) / 32 (планшет 768–1279) / 24 (≤767);
 *  - gap колонки: 48 (≥981) / 40 (≤980); ≤767 — выравнивание влево;
 *  - H1: 48/52 → 36/40 (≤767) → 30/36 (≤384); подзаголовок 20/28 → 16/24 (≤767);
 *  - видео radius 16 → 4 (≤767); trust margin-top 16 → 24 (планшет) → 0 (≤767).
 *
 * Self-contained: scoped `<style>` под `.hsv-mock`, палитра V01; шрифт — inherit.
 */

export interface HeroTrustItem {
  /** Иконка пункта (18×18, наследует currentColor). Если не передать — точка. */
  icon?: ReactNode;
  /** Подпись пункта. */
  label: ReactNode;
}

export interface HeroScreenVideoProps {
  /** Текст бейджа над заголовком. */
  badge?: ReactNode;
  /** Заголовок H1. */
  title?: ReactNode;
  /** Подзаголовок под H1. */
  subtitle?: ReactNode;
  /** Подпись кнопки. */
  buttonLabel?: string;
  /** Ссылка кнопки. */
  buttonHref?: string;
  /** URL видео. Если не передать — плейсхолдер с кнопкой play. */
  videoSrc?: string;
  /** Постер видео (кадр-заставка). */
  poster?: string;
  /** Подпись под кнопкой play в плейсхолдере (когда нет видео). */
  placeholderLabel?: ReactNode;
  /** Пункты trust-строки. Если не передать — нейтральные плейсхолдеры. */
  trustItems?: HeroTrustItem[];
}

const STYLE = `
.hsv-mock{
  --sp-1:4px; --sp-1-5:6px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-5:20px; --sp-6:24px; --sp-8:32px; --sp-10:40px; --sp-12:48px; --sp-16:64px; --sp-24:96px;
  --radius-lg:8px; --radius-2xl:16px;
  --fw-reg:400; --fw-med:500; --fw-semi:600; --ls:-0.2px;
  --brand-100:#7d4ccf; --brand-hover:#6f43b8; --brand-12:#efe9f9; --brand-12k:rgba(125,76,207,.12); --border-default:#e0e0e0;
  --surface-section:#f5f5f5; --text-title:#2d2d2d; --text-secondary:#757575;
  font-family:inherit; color:var(--text-title);
  display:block; width:100%; box-sizing:border-box;
  padding:var(--sp-12) 0 0; overflow:hidden;
  background:radial-gradient(900px 420px at 50% -140px, var(--brand-12) 0%, rgba(239,233,249,0) 70%), linear-gradient(#fff,#fff);
}
.hsv-mock .hsv-glow{position:absolute;width:720px;height:520px;left:50%;top:-220px;transform:translateX(-50%);border-radius:9999px;background:linear-gradient(-90deg,#e298ff,#6fe5ff);filter:blur(220px);opacity:.28;pointer-events:none;z-index:0}
.hsv-mock .hero__grid{position:relative;z-index:1}
.hsv-mock, .hsv-mock *{box-sizing:border-box;}
.hsv-mock .hsv-container{max-width:1216px; margin:0 auto; padding:0 var(--sp-4);}
.hsv-mock .hero__grid{display:flex; flex-direction:column; align-items:center; text-align:center; gap:var(--sp-12);}
.hsv-mock .hero__copy{width:100%; max-width:820px; margin:0 auto; text-align:center;}
.hsv-mock .sh-badge{display:inline-flex; align-items:center; justify-content:center; background:var(--brand-12k); border-radius:var(--radius-2xl); padding:var(--sp-1) var(--sp-4);}
.hsv-mock .sh-badge__text{font-size:14px; line-height:20px; font-weight:var(--fw-med); letter-spacing:var(--ls); color:var(--brand-100); white-space:nowrap;}
.hsv-mock h1{font-size:48px; line-height:52px; font-weight:var(--fw-semi); letter-spacing:-1px; margin:var(--sp-4) 0 var(--sp-5);}
.hsv-mock .hero__sub{font-size:20px; line-height:28px; color:var(--text-title); font-weight:var(--fw-reg); max-width:760px; margin:0 auto var(--sp-8);}
.hsv-mock .hero__cta{display:flex; gap:var(--sp-3); flex-wrap:wrap; justify-content:center;}
.hsv-mock .hsv-btn{display:inline-flex; align-items:center; justify-content:center; gap:var(--sp-1); height:48px; padding:var(--sp-3) var(--sp-5); font-size:16px; line-height:24px; font-weight:var(--fw-med); letter-spacing:var(--ls); border-radius:var(--radius-lg); border:none; cursor:pointer; text-decoration:none; white-space:nowrap; background:var(--brand-100); color:#fff; transition:background .18s;}
.hsv-mock .hsv-btn:hover{background:var(--brand-hover);}
.hsv-mock .hero__visual{width:100%; display:flex; justify-content:center;}
.hsv-mock .video-ph{width:100%; max-width:1008px; margin:0 auto; aspect-ratio:16/9; border-radius:var(--radius-2xl); background:var(--surface-section); border:1px solid var(--border-default); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:var(--sp-4); box-shadow:0 24px 60px -30px rgba(45,45,45,.22); position:relative; overflow:hidden;}
.hsv-mock .video-ph__video{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; border:none; background:#000; z-index:0;}
.hsv-mock .video-ph__play{position:relative; z-index:2; width:72px; height:72px; padding:0; border:none; cursor:pointer; border-radius:9999px; background:var(--brand-100); color:#fff; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 30px -8px rgba(125,76,207,.5);}
.hsv-mock .video-ph__play svg{width:30px; height:30px; margin-left:4px;}
.hsv-mock .video-ph__label{position:relative; z-index:2; font-size:18px; line-height:28px; color:var(--text-secondary);}
.hsv-mock .trust-line{display:flex; align-items:center; justify-content:center; flex-wrap:nowrap; gap:16px; color:#424242; font-size:16px; line-height:22px; letter-spacing:-0.2px; min-width:0; max-width:100%; overflow:hidden; padding-top:0; padding-bottom:24px; margin-top:16px;}
.hsv-mock .trust-line b{display:inline-flex; align-items:center; gap:8px; white-space:nowrap; color:#424242; font-weight:400;}
.hsv-mock .trust-line b svg{width:18px; height:18px; color:var(--brand-100); flex:none;}
.hsv-mock .trust-line .sep{width:1px; height:20px; background:var(--border-default); flex:none;}
.hsv-mock .trust-track{display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:16px; min-width:0;}
.hsv-mock .trust-set{display:flex; align-items:center; gap:16px; flex:none;}
.hsv-mock .trust-track>[aria-hidden="true"], .hsv-mock .trust-track>.trust-gap{display:none;}
@media(min-width:768px) and (max-width:1279px){.hsv-mock{padding-top:var(--sp-8);}}
@media(max-width:1279px){
  .hsv-mock .trust-line{justify-content:flex-start; margin-top:24px;}
  .hsv-mock .trust-track{width:max-content; flex:0 0 auto; flex-wrap:nowrap; justify-content:flex-start; animation:hsv-trustmarquee 30s linear infinite;}
  .hsv-mock .trust-track>[aria-hidden="true"]{display:flex;}
  .hsv-mock .trust-track>.trust-gap{display:block;}
}
@keyframes hsv-trustmarquee{from{transform:translateX(0);} to{transform:translateX(-50%);}}
@media(prefers-reduced-motion:reduce){.hsv-mock .trust-track{animation:none;}}
@media(max-width:980px){.hsv-mock .hero__grid{gap:var(--sp-10);} .hsv-mock .hero__copy{max-width:680px;}}
@media(max-width:767px){
  .hsv-mock{padding-top:var(--sp-6);}
  .hsv-mock .hero__grid{align-items:flex-start; text-align:left;}
  .hsv-mock .hero__copy{text-align:left;}
  .hsv-mock .hero__cta{justify-content:flex-start;}
  .hsv-mock h1{font-size:36px; line-height:40px;}
  .hsv-mock .hero__sub{font-size:16px; line-height:24px;}
  .hsv-mock .video-ph{border-radius:4px;}
  .hsv-mock .video-ph__play{width:56px; height:56px;}
  .hsv-mock .video-ph__play svg{width:24px; height:24px;}
  .hsv-mock .video-ph__label{font-size:16px; line-height:24px;}
  .hsv-mock .trust-line{font-size:14px; gap:12px; margin-top:0; padding-inline:16px;}
  .hsv-mock .trust-line b svg{width:16px; height:16px;}
  .hsv-mock .trust-line .sep{height:16px;}
}
@media(max-width:384px){.hsv-mock h1{font-size:30px; line-height:36px;}}
`;

const PLACEHOLDER_TRUST: HeroTrustItem[] = [
  { label: 'Преимущество' },
  { label: 'Преимущество' },
  { label: 'Преимущество' },
  { label: 'Преимущество' },
];

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const DotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-4.5" />
  </svg>
);

function TrustSet({ items, ariaHidden }: { items: HeroTrustItem[]; ariaHidden?: boolean }) {
  return (
    <div className="trust-set" aria-hidden={ariaHidden || undefined}>
      {items.map((it, i) => (
        <span key={i} style={{ display: 'contents' }}>
          {i > 0 ? <span className="sep" /> : null}
          <b>{it.icon ?? <DotIcon />}{it.label}</b>
        </span>
      ))}
    </div>
  );
}

export function HeroScreenVideo({
  badge = 'Бейдж-подпись',
  title = 'Заголовок первого экрана',
  subtitle = 'Подзаголовок: короткое описание пользы продукта в одну-две строки',
  buttonLabel = 'Попробовать бесплатно',
  buttonHref = '#',
  videoSrc,
  poster,
  placeholderLabel = 'Видео о продукте',
  trustItems,
}: HeroScreenVideoProps) {
  const data = trustItems && trustItems.length ? trustItems : PLACEHOLDER_TRUST;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const play = () => { videoRef.current?.play(); };

  return (
    <section className="hsv-mock" aria-label="Первый экран">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="hsv-glow" aria-hidden="true" />
      <div className="hsv-container">
        <div className="hero__grid">
          <div className="hero__copy">
            <div className="sh-badge"><span className="sh-badge__text">{badge}</span></div>
            <h1>{title}</h1>
            <p className="hero__sub">{subtitle}</p>
            <div className="hero__cta">
              <a className="hsv-btn" href={buttonHref}>{buttonLabel}</a>
            </div>
          </div>

          <div className="hero__visual">
            <div className="video-ph">
              {videoSrc ? (
                <>
                  <video
                    ref={videoRef}
                    className="video-ph__video"
                    src={videoSrc}
                    poster={poster}
                    playsInline
                    preload="metadata"
                    controls={playing}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                  />
                  {!playing && (
                    <button className="video-ph__play" type="button" aria-label="Смотреть видео" onClick={play}>
                      <PlayIcon />
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button className="video-ph__play" type="button" aria-label="Смотреть видео">
                    <PlayIcon />
                  </button>
                  <span className="video-ph__label">{placeholderLabel}</span>
                </>
              )}
            </div>
          </div>

          <div className="trust-line">
            <div className="trust-track">
              <TrustSet items={data} />
              <span className="sep trust-gap" />
              <TrustSet items={data} ariaHidden />
              <span className="sep trust-gap" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroScreenVideo;
