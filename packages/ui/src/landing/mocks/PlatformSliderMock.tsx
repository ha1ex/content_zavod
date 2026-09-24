/**
 * PlatformSliderMock (`platform-slider`) — модуль «Slider» из Landing DS (Figma 8404:127368):
 * окно Кайтена с боковым меню, разделы по очереди сменяют друг друга — Задачи,
 * Проекты, Поддержка, Базы знаний, Чат, Встречи, CRM, ИИ агенты. Кадры —
 * экспорт вариантов компонента, смена чистым CSS (кроссфейд, 3 с на кадр).
 * Окно 696×387, ужимает MockFit.
 */

const FRAMES = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/brand/platform-slider/${n}.png`);
const STEP = 3; // секунд на кадр
const TOTAL = STEP * FRAMES.length;

const CSS = `
.pls{position:relative;width:696px;height:387px;overflow:hidden;border-radius:16px;background:#fff;
  box-shadow:0 0 40px rgba(45,45,45,.12)}
.pls img{position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0;
  animation:plsFade ${TOTAL}s infinite}
@keyframes plsFade{0%{opacity:0}2%{opacity:1}12.5%{opacity:1}14.5%{opacity:0}100%{opacity:0}}
@media (prefers-reduced-motion: reduce){.pls img{animation:none}.pls img:first-child{opacity:1}}
`;

export function PlatformSliderMock() {
  return (
    <div className="pls" aria-hidden>
      <style>{CSS}</style>
      {FRAMES.map((src, i) => (
        // Отрицательная задержка сдвигает кадры по фазе: первый виден сразу при загрузке.
        <img key={src} src={src} alt="" loading="lazy" style={{ animationDelay: `${i * STEP - 0.5}s` }} />
      ))}
    </div>
  );
}
