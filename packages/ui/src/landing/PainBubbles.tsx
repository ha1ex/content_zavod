'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '../primitives/cn';

export interface PainBubbleProps {
  /** Реплика клиента — живая речь со звонка, почищенная от слов-паразитов. */
  text: string;
}

export interface PainBubblesProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: PainBubbleProps[];
  /**
   * Реплики проявляются по очереди, когда блок попадает в вид, — как приходящие
   * сообщения. Выключено — все видны сразу. Уважает prefers-reduced-motion.
   */
  animate?: boolean;
}

/** Шаг между появлением соседних реплик. */
const STEP_MS = 260;

/**
 * Блок узнавания боли: реплики клиентов облачками сообщений — метафора чатов, из
 * которых люди не хотят уходить (ТЗ, блок 2).
 *
 * Облачка приглушённые и «шумные»: серая поверхность, разные ширины, лёгкий
 * разброс по горизонтали и наклон, хвостик у каждого. Это визуальный контраст с
 * порядком в следующих блоках, поэтому фиолетовый акцент здесь не используется.
 */
export function PainBubbles({
  eyebrow,
  title,
  description,
  items,
  animate = false,
}: PainBubblesProps) {
  const listRef = useRef<HTMLUListElement>(null);
  // При выключенной анимации реплики видны сразу — в том числе без JS и в SSR.
  const [shown, setShown] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const el = listRef.current;
    if (!el) return;

    // Без IntersectionObserver (старый браузер) — показываем без анимации.
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  return (
    <section className="bg-(--color-surface-section) px-4 py-12 md:px-6 xl:px-0 md:py-16 lg:py-24">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="mx-auto flex w-full max-w-(--container-kaiten) flex-col gap-6 md:gap-8 lg:gap-12">
        <div className="flex flex-col gap-3 text-left md:items-center md:text-center">
          {eyebrow && (
            <p className="text-sm font-medium text-(--color-text-secondary)">{eyebrow}</p>
          )}
          <h2 className="text-3xl font-semibold text-(--color-text-primary) md:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="max-w-2xl text-lg text-(--color-text-secondary)">{description}</p>
          )}
        </div>

        {/* Masonry-колонки: 1 → 2 → 3 по брейкпоинтам. Облачка плотно
            распределяются по колонкам разной высоты — компактно и без коридоров,
            но всё ещё читается как хаотичная лента сообщений. */}
        <ul
          ref={listRef}
          className="pain-bubbles mx-auto w-full max-w-4xl columns-1 gap-3 sm:columns-2 md:gap-4 lg:columns-3"
        >
          {items.map((item, i) => (
            <li
              key={item.text}
              className={cn(
                'mb-3 break-inside-avoid md:mb-4',
                animate && 'pain-bubbles__item',
                animate && shown && 'is-shown',
              )}
              style={animate ? { animationDelay: `${i * STEP_MS}ms` } : undefined}
            >
              <Bubble text={item.text} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Реплика выезжает со своей стороны — как пришедшее сообщение. Пока блок не в
 * виде, элементы держатся скрытыми; появление запускает класс `is-shown` со
 * ступенчатой задержкой. Fill-mode `both` обязателен: `backwards` держит реплику
 * прозрачной до старта её задержки, `forwards` — оставляет видимой после конца,
 * иначе она вернулась бы к базовому opacity:0 и погасла.
 */
const CSS = `
.pain-bubbles__item{opacity:0}
.pain-bubbles__item.is-shown{animation:painBubbleIn .42s cubic-bezier(.2,0,.2,1) both}
.pain-bubbles__item.is-shown:nth-child(even){animation-name:painBubbleInRight}
@keyframes painBubbleIn{from{opacity:0;transform:translate3d(-16px,10px,0) scale(.96)}to{opacity:1;transform:none}}
@keyframes painBubbleInRight{from{opacity:0;transform:translate3d(16px,10px,0) scale(.96)}to{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){
  .pain-bubbles__item{opacity:1}
  .pain-bubbles__item.is-shown{animation:none}
}
`;

/**
 * Наклоны и горизонтальное выравнивание — фиксированные по индексу (детерминизм).
 * Выравнивание через margin-auto (лево/центр/право) не выталкивает облачко за
 * колонку — оно гуляет в пределах запаса ширины, разрежая ровные столбцы.
 */
const TILT = ['md:-rotate-1', 'md:rotate-1', 'md:-rotate-2', 'md:rotate-1', 'md:-rotate-1', 'md:rotate-2'];
const ALIGN = ['mr-auto', 'ml-auto', 'mx-auto', 'ml-auto', 'mr-auto', 'mx-auto', 'ml-auto', 'mr-auto'];

function Bubble({ text, index }: { text: string; index: number }) {
  return (
    <div
      className={cn(
        // ширина по контенту, но с запасом от края колонки — для гуляния по X
        'relative w-fit max-w-[85%] rounded-(--radius-xl) lg:rounded-(--radius-2xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'px-4 py-3 md:px-5 md:py-3.5',
        'text-sm text-(--color-text-secondary) md:text-base',
        'shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)]',
        TILT[index % TILT.length],
        ALIGN[index % ALIGN.length],
      )}
    >
      {text}
      {/* Хвостик снизу-слева — квадрат под 45°, нижние две грани в рамке. */}
      <span
        aria-hidden
        className={cn(
          'absolute -bottom-[6px] left-5 h-3 w-3 rotate-45 bg-(--color-surface-card)',
          'border-b border-r border-(--color-border-default)',
        )}
      />
    </div>
  );
}
