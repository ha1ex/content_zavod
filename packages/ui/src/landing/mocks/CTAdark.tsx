'use client';

/**
 * CTAdark — тёмный CTA-блок «текст + терминал» на фиолетовом градиенте.
 *
 * Эталон стиля — блок «Разворачивается в вашей инфраструктуре» лендинга
 * «Кайтен on-premise» (kaiten-on-premise.vercel.app).
 *
 * Стиль (не менять, заполнять новым контентом через пропсы):
 * - Фон — диагональный градиент 120°: #7d4ccf → #5a2fa8 (60%) → #47217f.
 * - Двухколоночная вёрстка (≥1024): текст слева, терминал справа, по центру по вертикали.
 *   Стек (<1024): текст сверху, терминал снизу.
 * - Радиус контейнера 16px (12px на планшете и мобиле — правило DS), отступы 48 / 32 / 24.
 * - Заголовок 24/32 белый, текст 16/24 с прозрачностью .82, кнопка белая с фиолетовым текстом.
 * - Терминал: фон #1b1626, шапка #251d36 с тремя «светофорами», моноширинный шрифт,
 *   строки появляются по очереди с шагом ~0.45s, когда блок попадает во вьюпорт.
 * - Подсветка синтаксиса: prompt и ok — #78ffc7, служебное — #8f82ab, ссылка — #b79cff.
 */
import React from 'react';

/** Кусок строки терминала. kind задаёт цвет: обычный текст — без kind */
export type TermSegment = {
  text: string;
  kind?: 'prompt' | 'key' | 'ok' | 'link';
};

export type CTAdarkProps = {
  /** Заголовок блока (без точки на конце) */
  title: React.ReactNode;
  /** Подзаголовок-польза, 1–3 предложения */
  text: React.ReactNode;
  /** Текст кнопки — императив без вопроса и восклицания */
  buttonLabel: string;
  /** Ссылка кнопки */
  buttonHref: string;
  /** Подпись в шапке терминала, например «bash — кайтен@ваш-сервер» */
  terminalTitle: string;
  /** Строки вывода: каждая строка — массив сегментов */
  lines: TermSegment[][];
  /** Мигающий курсор в конце последней строки */
  showCursor?: boolean;
};

const css = `
.ctd{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;
  padding:48px;border-radius:16px;color:#fff;
  background:linear-gradient(120deg,#7d4ccf,#5a2fa8 60%,#47217f);
  font-family:'Roboto',system-ui,sans-serif}
.ctd__copy h2{margin:0 0 16px;font-size:24px;line-height:32px;font-weight:600;color:#fff}
.ctd__copy p{margin:0 0 24px;font-size:16px;line-height:24px;color:rgba(255,255,255,.82)}
.ctd__btn{display:inline-flex;align-items:center;justify-content:center;
  padding:14px 24px;border-radius:8px;background:#fff;color:#7d4ccf;
  font-size:16px;line-height:24px;font-weight:600;text-decoration:none;
  transition:background .14s cubic-bezier(.2,0,.2,1)}
.ctd__btn:hover{background:#f3eefc}

.ctd__term{background:#1b1626;border-radius:12px;overflow:hidden;
  box-shadow:0 30px 70px -30px rgba(0,0,0,.6);
  font-family:'JetBrains Mono',ui-monospace,Consolas,monospace}
.ctd__bar{display:flex;align-items:center;gap:6px;background:#251d36;padding:10px 14px}
.ctd__bar i{width:10px;height:10px;border-radius:50%;background:#4a3f63}
.ctd__bar i:first-child{background:#f44336}
.ctd__bar i:nth-child(2){background:#ffa100}
.ctd__bar i:nth-child(3){background:#4caf51}
.ctd__bar span{margin-left:8px;color:#8f82ab;font-size:11px}
.ctd__body{padding:16px 18px 20px;display:flex;flex-direction:column;gap:8px;min-height:172px}
.ctd__line{color:#cfc6e4;font-size:12.5px;line-height:1.5;opacity:0;transform:translateY(4px);
  transition:opacity .3s,transform .3s}
.ctd__term.is-play .ctd__line{opacity:1;transform:none}
.ctd__term.is-play .ctd__line:nth-child(1){transition-delay:.1s}
.ctd__term.is-play .ctd__line:nth-child(2){transition-delay:.55s}
.ctd__term.is-play .ctd__line:nth-child(3){transition-delay:1s}
.ctd__term.is-play .ctd__line:nth-child(4){transition-delay:1.45s}
.ctd__term.is-play .ctd__line:nth-child(5){transition-delay:1.95s}
.ctd__term.is-play .ctd__line:nth-child(6){transition-delay:2.45s}
.ctd__line .is-prompt{color:#78ffc7}
.ctd__line .is-key{color:#8f82ab}
.ctd__line .is-ok{color:#78ffc7;font-weight:600}
.ctd__line .is-link{color:#b79cff;text-decoration:underline}
.ctd__cursor{display:inline-block;width:7px;height:14px;background:#b79cff;margin-left:6px;
  vertical-align:-2px;animation:ctdBlink 1s steps(1) infinite}
@keyframes ctdBlink{50%{opacity:0}}

@media(max-width:1279px){.ctd{border-radius:12px}.ctd__term{border-radius:12px}}
@media(max-width:1023px){.ctd{grid-template-columns:1fr;padding:32px;gap:24px}}
@media(max-width:767px){.ctd{padding:24px}.ctd__body{padding:14px 14px 18px;min-height:0}}
@media(prefers-reduced-motion:reduce){
  .ctd__line{opacity:1;transform:none;transition:none}
  .ctd__cursor{animation:none}
}
`;

export default function CTAdark({
  title,
  text,
  buttonLabel,
  buttonHref,
  terminalTitle,
  lines,
  showCursor = true,
}: CTAdarkProps) {
  const termRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = termRef.current;
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
      { threshold: 0.4 },
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
    <div className="ctd">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="ctd__copy">
        <h2>{title}</h2>
        <p>{text}</p>
        <a className="ctd__btn" href={buttonHref}>
          {buttonLabel}
        </a>
      </div>

      <div className="ctd__term" ref={termRef} aria-hidden="true">
        <div className="ctd__bar">
          <i />
          <i />
          <i />
          <span>{terminalTitle}</span>
        </div>
        <div className="ctd__body">
          {lines.map((segments, li) => (
            <div className="ctd__line" key={li}>
              {segments.map((s, si) =>
                s.kind ? (
                  <span className={`is-${s.kind}`} key={si}>
                    {s.text}
                  </span>
                ) : (
                  <React.Fragment key={si}>{s.text}</React.Fragment>
                ),
              )}
              {showCursor && li === lines.length - 1 && <span className="ctd__cursor" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
