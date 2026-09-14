'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Ужимает мок фиксированной ширины до ширины контейнера. Моки нарисованы под
 * 420–720px, а колонка секции бывает уже (576px на десктопе, 343px на мобилке):
 * без масштабирования мок вылезал за секцию и давал горизонтальную прокрутку
 * страницы. Натуральную ширину берём у самого мока, поэтому значение не нужно
 * прописывать руками под каждый вариант.
 */
export function MockFit({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const update = () => {
      const nw = inner.offsetWidth;
      const nh = inner.offsetHeight;
      const ow = outer.clientWidth;
      if (!nw || !ow) return;
      const next = Math.min(1, ow / nw);
      setScale((prev) => (Math.abs(prev - next) > 0.001 ? next : prev));
      setHeight(nh * next);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  return (
    // Обрезка не нужна: браузер считает область прокрутки по трансформированным
    // границам, поэтому ужатый мок сам по себе не расширяет страницу. Обрезали бы —
    // срезали бы тень по краям. Задаём только высоту: её transform не меняет.
    <div ref={outerRef} data-mockfit="outer" className="w-full" style={{ height }}>
      <div
        ref={innerRef}
        data-mockfit="inner"
        className="w-max"
        style={{ transformOrigin: 'top left', transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
