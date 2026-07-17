import React from 'react';

/**
 * HeroScreen — переиспользуемый шаблон первого экрана лендинга Kaiten.
 *
 * Стили, отступы и адаптив зафиксированы по дизайн-системе V01 (шкала 4px,
 * бренд #7D4CCF, контейнер 1216px). Тексты НЕ зашиты — передаются пропсами.
 * «Начинка» визуала (`visual`) — произвольный ReactNode: продуктовый мокап,
 * <img> или <video>. При медиа оставляй mediaFrame (рамка со скруглением 24px
 * и мягкой тенью); для собственного HTML-мокапа со своими стилями — mediaFrame={false}.
 *
 * Токены заданы как var(--token, fallback): если на странице подключена
 * дизайн-система Kaiten — берутся её значения; иначе работают вшитые фолбэки.
 */

export interface HeroCta {
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface HeroScreenProps {
  /** Текст бейджа-надзаголовка (eyebrow). Скрыт, если не задан. */
  eyebrow?: string;
  /** Заголовок H1. Можно передать строку или ReactNode с <br /> для переносов. */
  title: React.ReactNode;
  /** Подзаголовок-польза. Скрыт, если не задан. */
  subtitle?: React.ReactNode;
  /** Первичная кнопка (fill). */
  primaryCta?: HeroCta;
  /** Вторичная кнопка (outline). */
  secondaryCta?: HeroCta;
  /** Визуал первого экрана: продуктовый мокап, <img> или <video>. */
  visual?: React.ReactNode;
  /** Оборачивать visual в медиа-рамку (скругление + тень). По умолчанию true. */
  mediaFrame?: boolean;
  /** Доп. класс на корневую <section>. */
  className?: string;
  /** aria-label секции. */
  ariaLabel?: string;
}

const CSS = `
.k-hero{
  --_brand:var(--brand-100,#7d4ccf);
  --_brand-hover:var(--brand-hover,#6f43b8);
  --_brand-12:var(--brand-12,#efe9f9);
  --_brand-12k:var(--brand-12k,rgba(125,76,207,.12));
  --_brand-48k:var(--brand-48k,rgba(125,76,207,.48));
  --_border:var(--border-default,#e0e0e0);
  --_ink:var(--text-title,#2d2d2d);
  --_font:var(--font-sans,'Roboto','Inter',system-ui,-apple-system,'Segoe UI',sans-serif);
  --_ls:var(--ls,-0.2px);
  position:relative;
  padding:var(--sp-12,48px) 0 var(--sp-20,80px);
  overflow:hidden;
  font-family:var(--_font);
  letter-spacing:var(--_ls);
  color:var(--_ink);
  background:radial-gradient(120% 100% at 50% 0%,var(--_brand-12) 0%,#fff 60%);
}
.k-hero *,.k-hero *::before,.k-hero *::after{box-sizing:border-box}
.k-hero__container{
  max-width:var(--container,1216px);
  margin:0 auto;
  padding:0 var(--sp-4,16px);
}
.k-hero__grid{
  display:flex;
  flex-direction:column;
  align-items:center;
  text-align:center;
  gap:var(--sp-12,48px);
}
.k-hero__copy{width:100%;max-width:820px;margin:0 auto;text-align:center}
.k-hero__badge{
  display:inline-flex;align-items:center;justify-content:center;
  background:var(--_brand-12k);
  border-radius:var(--radius-2xl,16px);
  padding:var(--sp-1,4px) var(--sp-4,16px);
  margin-bottom:var(--sp-4,16px);
}
.k-hero__badge-text{
  font-size:var(--fs-sm,14px);line-height:var(--lh-sm,20px);
  font-weight:var(--fw-med,500);color:var(--_brand);white-space:nowrap;
}
.k-hero__title{
  font-size:var(--fs-5xl,48px);line-height:var(--lh-5xl,52px);
  font-weight:var(--fw-semi,600);letter-spacing:-1px;
  margin:var(--sp-4,16px) 0 var(--sp-5,20px);
}
.k-hero__sub{
  font-size:var(--fs-xl,20px);line-height:var(--lh-xl,28px);
  font-weight:var(--fw-reg,400);color:#2d2d2d;
  max-width:680px;margin:0 auto var(--sp-8,32px);
}
.k-hero__cta{display:flex;gap:var(--sp-3,12px);flex-wrap:wrap;justify-content:center}
.k-hero__btn{
  display:inline-flex;align-items:center;justify-content:center;gap:var(--sp-1,4px);
  height:48px;padding:var(--sp-3,12px) var(--sp-5,20px);
  font-family:var(--_font);font-size:var(--fs-md,16px);line-height:var(--lh-md,24px);
  font-weight:var(--fw-med,500);letter-spacing:var(--_ls);
  border-radius:var(--radius-lg,8px);border:none;cursor:pointer;white-space:nowrap;
  text-decoration:none;transition:background .18s,border-color .18s,color .18s;
}
.k-hero__btn--fill{background:var(--_brand);color:#fff}
.k-hero__btn--fill:hover{background:var(--_brand-hover)}
.k-hero__btn--outline{background:#fff;border:1px solid var(--_border);color:var(--_brand)}
.k-hero__btn--outline:hover{background:var(--_brand-12);border-color:var(--_brand-48k);color:var(--_brand-hover)}
.k-hero__visual{width:100%;display:flex;justify-content:center}
.k-hero__media{
  max-width:100%;
  border-radius:var(--radius-3xl,24px);
  overflow:hidden;
  box-shadow:var(--shadow-mock,0 30px 80px -30px rgba(125,76,207,.30));
}
.k-hero__media img,.k-hero__media video{display:block;width:100%;height:auto}

/* Адаптив первого экрана (совпадает с лендингом) */
@media(max-width:980px){
  .k-hero__grid{gap:var(--sp-10,40px)}
  .k-hero__copy{max-width:680px}
}
@media(max-width:767px){
  .k-hero{padding:var(--sp-12,48px) 0}
  .k-hero__title{font-size:var(--fs-4xl,36px);line-height:var(--lh-4xl,40px)}
  .k-hero__sub{font-size:var(--fs-md,16px)}
  .k-hero__copy{text-align:left}
  .k-hero__cta{justify-content:center}
}
@media(max-width:480px){
  .k-hero__badge{max-width:100%}
  .k-hero__badge-text{white-space:normal}
}
@media(max-width:384px){
  .k-hero__title{font-size:var(--fs-3xl,30px);line-height:var(--lh-3xl,36px)}
}
`;

function CtaLink({ cta, variant }: { cta: HeroCta; variant: 'fill' | 'outline' }) {
  return (
    <a
      className={`k-hero__btn k-hero__btn--${variant}`}
      href={cta.href ?? '#'}
      onClick={cta.onClick}
    >
      {cta.label}
    </a>
  );
}

export function HeroScreen({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  visual,
  mediaFrame = true,
  className,
  ariaLabel,
}: HeroScreenProps) {
  return (
    <section className={`k-hero${className ? ` ${className}` : ''}`} aria-label={ariaLabel}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="k-hero__container k-hero__grid">
        <div className="k-hero__copy">
          {eyebrow && (
            <div className="k-hero__badge">
              <span className="k-hero__badge-text">{eyebrow}</span>
            </div>
          )}
          <h1 className="k-hero__title">{title}</h1>
          {subtitle && <p className="k-hero__sub">{subtitle}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="k-hero__cta">
              {primaryCta && <CtaLink cta={primaryCta} variant="fill" />}
              {secondaryCta && <CtaLink cta={secondaryCta} variant="outline" />}
            </div>
          )}
        </div>
        {visual && (
          <div className="k-hero__visual" aria-hidden="true">
            {mediaFrame ? <div className="k-hero__media">{visual}</div> : visual}
          </div>
        )}
      </div>
    </section>
  );
}

export default HeroScreen;

/*
Пример использования:

<HeroScreen
  eyebrow="Кайтен для юристов"
  title={<>Управляйте юридическими<br />делами в&nbsp;Кайтен</>}
  subtitle="Поручения, сроки, документы и загрузка отдела — в одной системе. Дела не теряются, а сроки всегда под контролем."
  primaryCta={{ label: 'Попробовать бесплатно', href: 'https://kaiten.ru' }}
  secondaryCta={{ label: 'Заказать демо', href: '#cta' }}
  ariaLabel="Первый экран"
  // Вариант A — продуктовый мокап (свои стили): mediaFrame={false}
  visual={<MyKanbanMock />}
  mediaFrame={false}
/>

// Вариант B — фото/видео в медиа-рамке:
<HeroScreen
  title="Заголовок"
  visual={<img src="/hero.png" alt="" />}   // или <video src="/hero.mp4" autoPlay muted loop />
/>
*/
