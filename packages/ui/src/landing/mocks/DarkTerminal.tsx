'use client';

import React from 'react';
import { cn } from '../../primitives/cn';

/**
 * DarkTerminal — переиспользуемый «тёмный» терминал в стиле блока DarkCTA
 * (эталон — packages/ui/src/landing/mocks/CTAdark.tsx). Даёт единый вид всем
 * терминалам лендинга «Kaiten CLI»:
 *  - фон тела #1b1626, шапка #251d36 с тремя «светофорами» и подписью;
 *  - моноширинный JetBrains Mono;
 *  - трёхцветный синтаксис: prompt / ok / строки — зелёный #78ffc7,
 *    флаги и служебное — серый #8f82ab, числа / ключи / ссылки — фиолетовый
 *    #b79cff, обычный текст — #cfc6e4.
 * Палитра синхронизирована с CTAdark — при правке менять в обоих местах.
 */

const CSS = `
.dterm{background:#1b1626;border-radius:12px;overflow:hidden;
  box-shadow:0 24px 60px -30px rgba(0,0,0,.55);
  font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.dterm__bar{display:flex;align-items:center;gap:6px;background:#251d36;padding:10px 14px}
.dterm__bar i{width:10px;height:10px;border-radius:50%;background:#4a3f63}
.dterm__bar i:first-child{background:#f44336}
.dterm__bar i:nth-child(2){background:#ffa100}
.dterm__bar i:nth-child(3){background:#4caf51}
.dterm__bar b{margin-left:8px;color:#8f82ab;font-size:11px;font-weight:400;letter-spacing:0}
.dterm__body{padding:16px 18px 20px;color:#cfc6e4;font-size:12.5px;line-height:1.6;min-height:184px}
.dterm__body .ln{display:flex;flex-wrap:wrap;align-items:baseline;gap:0 8px}
.dterm__body .ln + .ln{margin-top:6px}
.dterm__body .ind{padding-left:14px}
.dterm__body .p{color:#78ffc7}
.dterm__body .k{color:#8f82ab}
.dterm__body .s{color:#78ffc7}
.dterm__body .n{color:#b79cff}
.dterm__body .v{color:#b79cff}
.dterm__body .m{color:#8f82ab}
.dterm__body .ok{color:#78ffc7;font-weight:600}
.dterm__panel{margin-top:10px;border:1px solid rgba(143,130,171,.25);border-radius:8px;
  padding:8px 10px;background:rgba(37,29,54,.5)}

/* появление строк по очереди, когда терминал попадает во вьюпорт.
   анимируем opacity/transform — высота зарезервирована, блок не прыгает */
.dterm__body > *{opacity:0;transform:translateY(4px);transition:opacity .32s ease,transform .32s ease}
.dterm.is-play .dterm__body > *{opacity:1;transform:none}
.dterm.is-play .dterm__body > *:nth-child(1){transition-delay:.10s}
.dterm.is-play .dterm__body > *:nth-child(2){transition-delay:.40s}
.dterm.is-play .dterm__body > *:nth-child(3){transition-delay:.70s}
.dterm.is-play .dterm__body > *:nth-child(4){transition-delay:1.00s}
.dterm.is-play .dterm__body > *:nth-child(5){transition-delay:1.30s}
.dterm.is-play .dterm__body > *:nth-child(6){transition-delay:1.60s}
.dterm.is-play .dterm__body > *:nth-child(7){transition-delay:1.90s}
@media(prefers-reduced-motion:reduce){
  .dterm__body > *{opacity:1;transform:none;transition:none}
}
`;

/** Рамка терминала: шапка со «светофорами» + тёмное тело. */
export function DarkTerminal({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-play');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            el.classList.add('is-play');
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    // страховка для окружений, где observer не срабатывает
    const t = setTimeout(() => el.classList.add('is-play'), 2500);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <div ref={ref} className={`dterm${className ? ' ' + className : ''}`} aria-hidden>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="dterm__bar">
        <i />
        <i />
        <i />
        <b>{title}</b>
      </div>
      <div className="dterm__body">{children}</div>
    </div>
  );
}

/* — сегменты строки (цвета заскоуплены под .dterm__body) — */
export const TPrompt = () => <span className="p select-none">$</span>;
export const TFlag = ({ children }: { children: React.ReactNode }) => <span className="k">{children}</span>;
export const TStr = ({ children }: { children: React.ReactNode }) => <span className="s">{children}</span>;
export const TNum = ({ children }: { children: React.ReactNode }) => <span className="n">{children}</span>;
export const TKey = ({ children }: { children: React.ReactNode }) => <span className="v">{children}</span>;
export const TMut = ({ children }: { children: React.ReactNode }) => <span className="m">{children}</span>;

/**
 * ResultCard — светлая «парящая» карта-результат рядом с терминалом.
 * Минималистичный язык мокапов (эталон — .card из FeatureMocksV01): белый фон,
 * скругление как у терминала, мягкая рассеянная тень, БЕЗ бордера. Заменяет
 * прежний тяжёлый внешний бордер-контейнер вокруг всего мока.
 */
export function ResultCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      style={{ boxShadow: '0 18px 48px -24px rgba(45,45,45,0.30)' }}
      className={cn('rounded-[12px] bg-(--color-surface-card) px-5 py-4', className)}
    >
      {children}
    </div>
  );
}

/** Строка результата с зелёной галочкой. */
export function TOk({ children }: { children: React.ReactNode }) {
  return (
    <div className="ln ok">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        style={{ flex: 'none', transform: 'translateY(2px)' }}
      >
        <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </div>
  );
}
