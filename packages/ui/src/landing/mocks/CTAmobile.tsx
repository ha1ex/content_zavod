import type { ReactNode } from 'react';
import { MobileKanbanMock } from './GadgetMobileKanbanMock';

/**
 * CTAmobile — CTA-блок «мобильное приложение»: слева заголовок, подзаголовок,
 * чек-лист с белыми булитами и кнопка, справа макет мобильного приложения
 * (канбан магазинов). Градиентный фон + мягкий засвет (blur-glow).
 *
 * Раскладка:
 *  - desktop ≥1024: две колонки (текст + телефон 440px справа), телефон
 *    уходит за нижнюю кромку блока (bleed);
 *  - планшет 768–1023: две колонки (телефон 320px), телефон ниже по высоте
 *    (400px) и по центру — цельная карточка с равными отступами блока сверху/снизу;
 *  - мобилка ≤767: одна колонка, телефон под текстом.
 *
 * Контент по умолчанию — сценарий ритейла («Куратор магазина…»); всё меняется
 * через пропсы. Self-contained: scoped `<style>` под `.ctam`, палитра V01.
 */

export interface CTAmobileButton {
  label: string;
  href?: string;
}

export interface CTAmobileProps {
  title?: string;
  subtitle?: string;
  /** Пункты с белыми булитами-галочками. */
  checklist?: string[];
  button?: CTAmobileButton;
  /** Кастомный визуал справа (по умолчанию — макет мобильного приложения). */
  visual?: ReactNode;
}

const STYLE = `
.ctam{
  --sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-5:20px; --sp-6:24px; --sp-8:32px; --sp-10:40px; --sp-12:48px; --sp-16:64px;
  --radius-3xl:24px; --radius-lg:8px;
  --fw-med:500; --fw-semi:600; --ls:0;
  --brand-12:#efe9f9; --brand-100:#7d4ccf; --brand-hover:#6a3cbf; --brand-48:rgba(125,76,207,.48);
  --border-default:#dbe1e0; --text-title:#2d2d2d;
  font-family:'Inter',system-ui,-apple-system,sans-serif; color:var(--text-title);
  display:block; width:100%; padding:96px var(--sp-4); box-sizing:border-box;
}
.ctam, .ctam *{box-sizing:border-box;}
.ctam__fcta{position:relative; overflow:hidden; max-width:1216px; margin:0 auto; background:var(--brand-12); border-radius:var(--radius-3xl); text-align:left; padding:var(--sp-16) var(--sp-12) 0;}
.ctam__blur{position:absolute; width:786px; height:744px; left:55%; top:-120px; border-radius:9999px; background:linear-gradient(-90deg,#e298ff,#6fe5ff); filter:blur(200px); opacity:.5; pointer-events:none; z-index:0;}
.ctam__in{position:relative; z-index:1; display:grid; grid-template-columns:minmax(0,1fr) 440px; gap:var(--sp-10); align-items:center;}
.ctam__copy{max-width:720px; align-self:start;}
.ctam__fcta h2{font-size:30px; line-height:36px; font-weight:var(--fw-semi); margin:0 0 var(--sp-4);}
.ctam__fcta p{font-size:16px; line-height:24px; color:#2d2d2d; margin:0 0 var(--sp-4);}
@media(min-width:1024px){.ctam__fcta p{white-space:pre-line;}}
.ctam__list{list-style:none; margin:24px 0; padding:0; display:flex; flex-direction:column; gap:12px; text-align:left;}
.ctam__list li{display:flex; align-items:flex-start; gap:10px; font-size:16px; line-height:24px;}
.ctam__list .bul{flex:none; display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:9999px; background:#fff;}
.ctam__cta{display:flex; gap:var(--sp-2); justify-content:flex-start; flex-wrap:nowrap;}
.ctam .btn{display:inline-flex; align-items:center; justify-content:center; gap:var(--sp-1); font-family:inherit; font-weight:var(--fw-med); letter-spacing:var(--ls); border-radius:var(--radius-lg); border:none; cursor:pointer; white-space:nowrap; text-decoration:none; height:48px; padding:var(--sp-3) var(--sp-5); font-size:16px; line-height:24px; background:var(--brand-100); color:#fff; transition:background .18s cubic-bezier(.2,0,.2,1);}
.ctam .btn:hover{background:var(--brand-hover);}
.ctam__visual{justify-self:end; align-self:end; width:440px; max-width:100%; overflow:visible; text-align:left;}

/* планшет: две колонки, телефон ниже и по центру — цельная карточка, равные отступы блока */
@media(min-width:768px) and (max-width:1023px){
  .ctam__fcta{padding-bottom:var(--sp-16);}
  .ctam__in{grid-template-columns:minmax(0,1fr) 320px; gap:var(--sp-8);}
  .ctam__visual{align-self:center;}
  .ctam__visual > div > div{height:400px; border-bottom-width:7px; border-bottom-left-radius:40px; border-bottom-right-radius:40px; box-shadow:0 24px 50px -24px rgba(45,45,45,.20);}
}

/* мобилка: одна колонка, телефон под текстом */
@media(max-width:767px){
  .ctam{padding:48px var(--sp-4);}
  .ctam__fcta{padding:var(--sp-12) var(--sp-4) 0; border-radius:12px;}
  .ctam__in{grid-template-columns:minmax(0,1fr); text-align:center; gap:var(--sp-8); justify-items:center;}
  .ctam__copy{max-width:680px; margin:0 auto; min-width:0; text-align:left;}
  .ctam__fcta h2{font-size:20px; line-height:28px;}
  .ctam__fcta p{font-size:14px; line-height:20px;}
  .ctam__list li{font-size:14px; line-height:20px;}
  .ctam__cta{flex-direction:row; flex-wrap:wrap; justify-content:center;}
  .ctam__visual{justify-self:center; align-self:auto; width:100%; max-width:520px; text-align:center;}
}
`;

const DEFAULT_CHECKLIST = [
  'Приложение для iOS и Android',
  'Уведомления в Telegram и Макс — ответить можно прямо в мессенджере, ответ появится в карточке',
  'Push-уведомления о сроках и новых задачах',
];

const Bullet = () => (
  <span className="bul" aria-hidden="true">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7d4ccf" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  </span>
);

export function CTAmobile({
  title = 'Куратор магазина обновляет статус задачи прямо в торговом зале',
  subtitle = 'Не нужен ноутбук, чтобы ответить на комментарий, проверить чек-лист или отметить задачу выполненной',
  checklist = DEFAULT_CHECKLIST,
  button = { label: 'Попробовать Кайтен бесплатно', href: '/signup' },
  visual,
}: CTAmobileProps) {
  return (
    <section className="ctam" aria-label="Мобильное приложение">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="ctam__fcta">
        <div className="ctam__blur" aria-hidden="true" />
        <div className="ctam__in">
          <div className="ctam__copy">
            <h2>{title}</h2>
            {subtitle ? <p>{subtitle}</p> : null}
            {checklist && checklist.length > 0 && (
              <ul className="ctam__list">
                {checklist.map((it, i) => (
                  <li key={i}>
                    <Bullet />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            )}
            {button ? (
              <div className="ctam__cta">
                <a className="btn" href={button.href ?? '#'}>{button.label}</a>
              </div>
            ) : null}
          </div>
          <div className="ctam__visual">{visual ?? <MobileKanbanMock />}</div>
        </div>
      </div>
    </section>
  );
}

export default CTAmobile;
