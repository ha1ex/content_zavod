/**
 * CTAplatform — CTA-блок «текст + иллюстрация платформы» на градиенте.
 *
 * Эталон стиля — блок «Переходите из Trello за пару кликов» лендинга
 * «Сравнение Кайтен с Trello» (kaiten-vs-trello.vercel.app).
 *
 * Стиль (не менять, заполнять новым контентом через пропсы):
 * - Фон — градиент в цветах аккордеона: #ece0ff (лаванда) → #cdecff (холодный голубой).
 *   Двухколоночная вёрстка (≥1024): горизонтальный 90° — лаванда за текстом слева,
 *   холодный за иллюстрацией справа. Стек (<1024): вертикальный 180° — лаванда сверху.
 * - Радиус контейнера 24px (16px на мобиле), внутренние отступы 48 (24 на <560).
 * - Заголовок H2, текст 16/24, кнопка DS btn 8px.
 * - Иллюстрация: ширина 100% своей колонки, на десктопе (≥1280) — 85%, по центру.
 */
import React from 'react';

export type CTAplatformProps = {
  /** Заголовок блока (без точки на конце) */
  title: React.ReactNode;
  /** Подзаголовок-польза, 1–2 предложения */
  text: React.ReactNode;
  /** Текст кнопки — императив без вопроса и восклицания */
  buttonLabel: string;
  /** Ссылка кнопки */
  buttonHref: string;
  /** Иллюстрация платформы/продукта */
  image: { src: string; alt: string };
};

const css = `
.ctp{position:relative;overflow:hidden;border-radius:24px;padding:48px;
  display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:48px;
  background:linear-gradient(90deg,#ece0ff,#cdecff);
  font-family:'Roboto',system-ui,sans-serif;color:#2d2d2d}
.ctp__copy{position:relative;z-index:1}
.ctp__copy h2{font-size:30px;line-height:36px;font-weight:600;color:#2d2d2d;margin:0}
.ctp__copy p{font-size:16px;line-height:24px;color:#424242;margin:16px 0 0}
.ctp__btn{display:inline-flex;align-items:center;justify-content:center;margin-top:24px;
  padding:14px 24px;border-radius:8px;background:#7d4ccf;color:#fff;
  font-size:16px;line-height:24px;font-weight:600;text-decoration:none;
  transition:background .14s cubic-bezier(.2,0,.2,1)}
.ctp__btn:hover{background:#6f42bb}
.ctp__visual{position:relative;z-index:1;display:flex;justify-content:center;align-items:center}
.ctp__visual img{width:100%;height:auto;display:block;border-radius:16px}
@media(min-width:1280px){.ctp__visual img{width:85%}}
@media(max-width:1023px){
  .ctp{grid-template-columns:1fr;text-align:center;background:linear-gradient(180deg,#ece0ff,#cdecff)}
  .ctp__btn{margin-inline:auto}
  .ctp__visual{order:2}
}
@media(max-width:767px){
  .ctp{border-radius:16px;text-align:left}
  .ctp__copy h2{font-size:24px;line-height:32px}
  .ctp__btn{display:flex;width:fit-content}
}
@media(min-width:560px) and (max-width:767px){.ctp{padding:48px}}
@media(max-width:559px){.ctp{padding:24px}}
`;

export default function CTAplatform({ title, text, buttonLabel, buttonHref, image }: CTAplatformProps) {
  return (
    <div className="ctp">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="ctp__copy">
        <h2>{title}</h2>
        <p>{text}</p>
        <a className="ctp__btn" href={buttonHref}>{buttonLabel}</a>
      </div>
      <div className="ctp__visual">
        <img src={image.src} alt={image.alt} loading="lazy" />
      </div>
    </div>
  );
}
