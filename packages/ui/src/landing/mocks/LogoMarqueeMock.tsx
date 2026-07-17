import React from 'react';

/**
 * LogoMarqueeMock — переиспользуемый мокап блока доверия Kaiten:
 * заголовок + бесконечная бегущая строка логотипов клиентов.
 *
 * ТЕКСТ И ЛОГОТИПЫ НЕ ЗАШИТЫ — задаются пропсами. Стили, отступы, маска-фейд
 * по краям, скорость и пауза на hover зафиксированы 1-в-1 с лендингом,
 * заскоуплены под `.lmq`. Токены — var(--token, fallback). Уважает
 * prefers-reduced-motion (анимация выключается).
 *
 * Список логотипов дублируется внутри дорожки, поэтому лента прокручивается
 * бесшовно (сдвиг на -50%). Передавайте ОДИН набор — дублирование внутри.
 */

export interface MarqueeLogo {
  src: string;
  alt?: string;
}

export interface LogoMarqueeMockProps {
  /** Заголовок над лентой (опционально). */
  heading?: React.ReactNode;
  /** Логотипы (один набор — дублируется автоматически). */
  logos: MarqueeLogo[];
  /** Длительность полного цикла прокрутки, сек. По умолчанию 38. */
  durationSec?: number;
  /** Высота логотипа, px. По умолчанию 46. */
  logoHeight?: number;
  className?: string;
  ariaLabel?: string;
}

const CSS = `
.lmq{
  --_ink:var(--text-title,#2d2d2d);
  --_font:var(--font-sans,'Roboto','Inter',system-ui,-apple-system,'Segoe UI',sans-serif);
  --_ls:var(--ls,-0.2px);
  font-family:var(--_font);letter-spacing:var(--_ls);color:var(--_ink);
}
.lmq *,.lmq *::before,.lmq *::after{box-sizing:border-box}
.lmq__head{display:flex;flex-direction:column;align-items:center;text-align:center;gap:var(--sp-4,16px);max-width:760px;margin:0 auto}
.lmq__title{font-size:var(--fs-4xl,36px);line-height:var(--lh-4xl,40px);font-weight:var(--fw-semi,600);letter-spacing:0;color:var(--_ink)}
.lmq__marq{margin-top:var(--sp-12,48px);overflow:hidden;-webkit-mask:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.lmq__track{display:flex;align-items:center;width:max-content;animation:lmqScroll 38s linear infinite}
.lmq__marq:hover .lmq__track{animation-play-state:paused}
.lmq__track img{height:46px;width:auto;margin-right:var(--sp-10,40px);flex:none;display:block;object-fit:contain}
@keyframes lmqScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media(prefers-reduced-motion:reduce){.lmq__track{animation:none}}
@media(max-width:767px){
  .lmq__head{align-items:flex-start;text-align:left}
  .lmq__title{font-size:var(--fs-2xl,24px);line-height:var(--lh-2xl,32px)}
  .lmq__marq{margin-top:var(--sp-6,24px)}
  .lmq__track img{margin-right:var(--sp-5,20px)}
}
`;

export function LogoMarqueeMock({
  heading,
  logos,
  durationSec = 38,
  logoHeight = 46,
  className,
  ariaLabel,
}: LogoMarqueeMockProps) {
  const loop = [...logos, ...logos];
  return (
    <section className={`lmq${className ? ` ${className}` : ''}`} aria-label={ariaLabel}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {heading && (
        <div className="lmq__head">
          <h2 className="lmq__title">{heading}</h2>
        </div>
      )}
      <div className="lmq__marq" aria-hidden="true">
        <div className="lmq__track" style={{ animationDuration: `${durationSec}s` }}>
          {loop.map((logo, i) => (
            <img key={i} src={logo.src} alt={logo.alt ?? ''} loading="lazy" style={{ height: logoHeight }} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoMarqueeMock;

/*
Пример (логотипы и текст — свои):

<LogoMarqueeMock
  heading="Более 200 тысяч компаний выбирают Кайтен"
  logos={[
    { src: '/logos/sber.png', alt: 'СБЕР' },
    { src: '/logos/s7.png', alt: 'S7 Airlines' },
    { src: '/logos/x5.png', alt: 'X5 Tech' },
  ]}
/>
*/
