/**
 * CTAproduct — CTA-блок «текст + иллюстрация платформы» на градиенте.
 *
 * Эталон стиля — блок «Переходите из Trello за пару кликов» лендинга
 * «Сравнение Кайтен с Trello» (kaiten-vs-trello.vercel.app).
 *
 * Стиль (не менять, заполнять новым контентом через пропсы):
 * - Фон — градиент в цветах аккордеона: #ece0ff (лаванда) → #cdecff (холодный голубой).
 *   Двухколоночная вёрстка (≥1024): горизонтальный 90° — лаванда за текстом слева,
 *   холодный за иллюстрацией справа. Стек (<1024): вертикальный 180° — лаванда сверху.
 * - Радиус контейнера и иллюстрации по шкале DS: 16px на десктопе (≥1024),
 *   12px на планшете и мобилке. Внутренние отступы 48 (24 на <560).
 * - Заголовок H2, текст 16/24, кнопка DS btn 8px. Кнопок может быть две:
 *   основная и контурная, в один ряд.
 * - Иллюстрация по центру своей колонки: 72% на десктопе, 62% на планшете,
 *   85% на мобилке. Без пропа `image` рисуется эталонный скриншот мока.
 */
import React from 'react';

export type CTAproductProps = {
  /** Заголовок блока (без точки на конце) */
  title: React.ReactNode;
  /** Подзаголовок-польза, 1–2 предложения */
  text: React.ReactNode;
  /** Текст кнопки — императив без вопроса и восклицания */
  buttonLabel: string;
  /** Ссылка кнопки */
  buttonHref: string;
  /** Вторая кнопка — контурная, рядом с основной. */
  secondaryButton?: { label: string; href: string } | null;
  /** Иллюстрация платформы/продукта. Не задана — эталонный скриншот мока. */
  image?: { src: string; alt: string };
};

/**
 * Эталонная иллюстрация блока: обзорный экран Кайтен — доска задач, загрузка
 * команды, аналитика и Гант-план. Взята из лендинга «Кайтен vs MS Project».
 * Меняется только осознанно: это лицо мока во всех лендингах завода.
 */
const DEFAULT_IMAGE = {
  src: '/brand/features/cta-product.png',
  alt: 'Интерфейс Кайтен: доска задач, загрузка команды, аналитика и Гант-план',
};

const css = `
.ctp{position:relative;overflow:hidden;border-radius:12px;padding:48px;
  display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:48px;
  background:linear-gradient(90deg,#ece0ff,#cdecff);
  font-family:'Roboto',system-ui,sans-serif;color:#2d2d2d}
.ctp__copy{position:relative;z-index:1}
.ctp__copy h2{font-size:30px;line-height:36px;font-weight:600;color:#2d2d2d;margin:0}
@media(min-width:1280px){.ctp__copy h2{font-size:36px;line-height:40px}}
.ctp__copy p{font-size:16px;line-height:24px;color:#424242;margin:16px 0 0}
/* Кнопки в один ряд; в столбик уходят только на самых узких экранах,
   где две штуки физически не помещаются по ширине. */
.ctp__cta{display:flex;flex-wrap:nowrap;gap:12px;margin-top:24px}
/* Кнопки по шкале DS: высота 48, паддинг 12/20, радиус 8, начертание 500. */
.ctp__btn{display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;
  height:48px;padding:12px 20px;border-radius:8px;border:1px solid transparent;
  background:#7d4ccf;color:#fff;
  font-size:16px;line-height:24px;font-weight:500;text-decoration:none;
  transition:background .18s, border-color .18s, color .18s}
.ctp__btn:hover{background:#6a3cbf}
/* Контурная — как btn--outline в DS: белая с рамкой и брендовым текстом. */
.ctp__btn--ghost{background:#fff;border-color:#dbe1e0;color:#7d4ccf}
.ctp__btn--ghost:hover{background:#efe9f9;border-color:rgba(125,76,207,.48);color:#6a3cbf}
.ctp__visual{position:relative;z-index:1;display:flex;justify-content:center;align-items:center}
.ctp__visual img{width:85%;height:auto;display:block;border-radius:12px}
@media(min-width:1024px){.ctp{border-radius:16px}.ctp__visual img{border-radius:16px}}
@media(min-width:768px) and (max-width:1279px){.ctp__visual img{width:80%}}
@media(min-width:1280px){.ctp__visual img{width:84%}}
@media(max-width:1023px){
  .ctp{grid-template-columns:1fr;text-align:center;background:linear-gradient(180deg,#ece0ff,#cdecff)}
  .ctp__cta{justify-content:center}
  .ctp__visual{order:2}
}
@media(max-width:767px){
  .ctp{text-align:left}
  .ctp__copy h2{font-size:24px;line-height:32px}
  .ctp__cta{justify-content:center}
}
@media(min-width:560px) and (max-width:767px){.ctp{padding:48px}}
@media(max-width:559px){.ctp{padding:24px}.ctp__cta{flex-wrap:wrap}}
`;

export default function CTAproduct({
  title,
  text,
  buttonLabel,
  buttonHref,
  secondaryButton,
  image = DEFAULT_IMAGE,
}: CTAproductProps) {
  return (
    <div className="ctp">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="ctp__copy">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="ctp__cta">
          <a className="ctp__btn" href={buttonHref}>{buttonLabel}</a>
          {secondaryButton && (
            <a className="ctp__btn ctp__btn--ghost" href={secondaryButton.href}>
              {secondaryButton.label}
            </a>
          )}
        </div>
      </div>
      <div className="ctp__visual">
        <img src={image.src} alt={image.alt} loading="lazy" />
      </div>
    </div>
  );
}
