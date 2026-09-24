'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * TasksViewsSliderMock (`tasks-views-slider`) — один и тот же набор задач в разных
 * представлениях Кайтена: списки, таблица, timeline и календарь сменяют друг друга.
 *
 * Кадры — скриншоты продукта из `/brand/features/tasks-views`, смена чистым CSS
 * (плавный кроссфейд, 1,9 с на кадр). Пока мокап за кадром, анимация стоит на первом кадре:
 * переключение начинается, когда блок появляется при скролле. Уважает
 * prefers-reduced-motion. Ширина 1000px, ужимает MockFit.
 */

const FRAMES: { src: string; alt: string }[] = [
  { src: '/brand/features/tasks-views/boards-excel.webp', alt: 'Задачи команды на доске' },
  { src: '/brand/features/tasks-views/tables.webp', alt: 'Задачи команды таблицей' },
  { src: '/brand/features/tasks-views/timeline.webp', alt: 'Задачи команды на timeline' },
  { src: '/brand/features/tasks-views/calendar-excel.webp', alt: 'Задачи команды в календаре' },
];
const STEP = 1.9; // секунд на кадр
const TOTAL = STEP * FRAMES.length;

const CSS = `
.tvs{position:relative;width:1000px;aspect-ratio:2000 / 1218;overflow:hidden;border-radius:16px;background:#fff;
  box-shadow:0 10px 30px -10px rgba(45,45,45,.25)}
.tvs img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;opacity:0;
  animation:tvsFade ${TOTAL}s ease-in-out infinite;animation-play-state:paused}
.tvs.is-live img{animation-play-state:running}
@keyframes tvsFade{0%{opacity:0}8%{opacity:1}25%{opacity:1}33%{opacity:0}100%{opacity:0}}
@media (prefers-reduced-motion: reduce){.tvs img{animation:none}.tvs img:first-child{opacity:1}}
`;

export function TasksViewsSliderMock() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setLive(true);
      return;
    }
    // Переключение стартует, когда мокап попал в кадр, и замирает, когда ушел.
    const io = new IntersectionObserver(([entry]) => setLive(Boolean(entry?.isIntersecting)), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={live ? 'tvs is-live' : 'tvs'} aria-hidden>
      <style>{CSS}</style>
      {FRAMES.map((f, i) => (
        // Отрицательная задержка сдвигает кадры по фазе: первый виден сразу при загрузке.
        <img key={f.src} src={f.src} alt="" loading="lazy" style={{ animationDelay: `${i * STEP - 0.5}s` }} />
      ))}
    </div>
  );
}
