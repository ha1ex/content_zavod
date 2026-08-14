'use client';

import React from 'react';
import { CliBatchStatsMock } from './CliBatchStatsMock';

/**
 * Визуал блока «Готов к работе с агентами»: прежний мок cli-batch-stats
 * (терминал batch-get + сравнение обращений к API) плюс компактная полоска
 * совместимых нейросетей снизу. Русскоязычные модели идут первыми (GigaChat,
 * YandexGPT), затем международные (Claude, ChatGPT, Gemini). Аватары —
 * брендовые инициалы в фирменных цветах (не копии логотипов). Чипы появляются
 * по очереди при въезде во вьюпорт и приподнимаются на hover.
 * Домен: cli-community-edition.
 */

type Model = { name: string; tag: 'RU' | 'мир'; logo: React.ReactNode };

/* — простые SVG-марки брендов (не пиксель-в-пиксель копии, а узнаваемые знаки) — */
const GigaLogo = (
  <svg viewBox="0 0 24 24" className="h-full w-full">
    <circle cx="12" cy="12" r="11" fill="#21a038" />
    <path d="M6.8 12.4l3 3 7.4-7.6" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const YandexLogo = (
  <svg viewBox="0 0 24 24" className="h-full w-full">
    <circle cx="12" cy="12" r="11" fill="#fc3f1d" />
    <text x="12" y="17" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700" fill="#fff" textAnchor="middle">Я</text>
  </svg>
);
const ClaudeLogo = (
  <svg viewBox="0 0 24 24" className="h-full w-full" stroke="#d97757" strokeWidth="2.3" strokeLinecap="round">
    <line x1="12" y1="3.5" x2="12" y2="20.5" />
    <line x1="3.5" y1="12" x2="20.5" y2="12" />
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);
const OpenAiLogo = (
  <svg viewBox="0 0 24 24" className="h-full w-full" fill="#0d0d0d">
    <path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A5.98 5.98 0 0 0 4.98 4.18a5.98 5.98 0 0 0-3.99 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.52 2.9A5.98 5.98 0 0 0 13.26 22a6.06 6.06 0 0 0 5.77-4.21 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.07zm-9.02 12.6a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.79.79 0 0 0 .39-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.49 4.5zM3.6 18.3a4.47 4.47 0 0 1-.54-3.01l.14.09 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06L9.74 22a4.5 4.5 0 0 1-6.14-1.65zM2.34 7.9a4.48 4.48 0 0 1 2.35-1.97V11.6a.77.77 0 0 0 .39.68l5.81 3.35-2.02 1.17a.08.08 0 0 1-.07 0l-4.83-2.79A4.5 4.5 0 0 1 2.34 7.9zm16.6 3.86-5.84-3.4L15.12 7.2a.08.08 0 0 1 .07 0l4.83 2.79a4.49 4.49 0 0 1-.68 8.1v-5.68a.79.79 0 0 0-.39-.65zm2.01-3.02-.14-.09-4.77-2.78a.78.78 0 0 0-.79 0L9.42 9.24V6.9a.07.07 0 0 1 .03-.06l4.83-2.78a4.5 4.5 0 0 1 6.68 4.66zM8.32 12.9l-2.02-1.16a.08.08 0 0 1-.04-.06V6.11a4.5 4.5 0 0 1 7.38-3.45l-.14.08-4.78 2.76a.79.79 0 0 0-.39.68zm1.1-2.36 2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5z" />
  </svg>
);
const GeminiLogo = (
  <svg viewBox="0 0 24 24" className="h-full w-full">
    <defs>
      <linearGradient id="cli-gemini-grad" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4285f4" />
        <stop offset="1" stopColor="#9b72cb" />
      </linearGradient>
    </defs>
    <path d="M12 2c.6 5 3 7.4 8 8-5 .6-7.4 3-8 8-.6-5-3-7.4-8-8 5-.6 7.4-3 8-8z" fill="url(#cli-gemini-grad)" />
  </svg>
);

const MODELS: Model[] = [
  { name: 'GigaChat', tag: 'RU', logo: GigaLogo },
  { name: 'YandexGPT', tag: 'RU', logo: YandexLogo },
  { name: 'Claude', tag: 'мир', logo: ClaudeLogo },
  { name: 'ChatGPT', tag: 'мир', logo: OpenAiLogo },
  { name: 'Gemini', tag: 'мир', logo: GeminiLogo },
];

const CSS = `
.aim{font-family:var(--font-sans,'Roboto',system-ui,-apple-system,'Segoe UI',sans-serif)}
.aim__strip{border-radius:12px;border:1px solid var(--color-border-default);background:var(--color-surface-card);
  box-shadow:0 18px 48px -24px rgba(45,45,45,.28);padding:12px 14px}
.aim__cap{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0;color:var(--color-text-secondary)}
.aim__row{margin-top:9px;display:flex;flex-wrap:wrap;gap:7px}
.aim__chip{display:inline-flex;align-items:center;gap:7px;border:1px solid var(--color-border-default);border-radius:999px;
  padding:4px 10px 4px 4px;background:var(--color-surface-card);opacity:0;transform:translateY(6px);
  transition:opacity .3s ease,transform .18s cubic-bezier(.2,.6,.2,1),box-shadow .18s,border-color .18s}
.aim.is-play .aim__chip{opacity:1;transform:none}
.aim.is-play .aim__chip:nth-child(1){transition-delay:.05s}
.aim.is-play .aim__chip:nth-child(2){transition-delay:.12s}
.aim.is-play .aim__chip:nth-child(3){transition-delay:.19s}
.aim.is-play .aim__chip:nth-child(4){transition-delay:.26s}
.aim.is-play .aim__chip:nth-child(5){transition-delay:.33s}
.aim__chip:hover{transform:translateY(-2px);border-color:rgba(125,76,207,.5);box-shadow:0 8px 18px -12px rgba(45,45,45,.4)}
.aim__logo{width:22px;height:22px;flex:none;display:flex;align-items:center;justify-content:center}
.aim__logo svg{display:block}
.aim__nm{font-size:12px;font-weight:500;color:var(--color-text-primary)}
.aim__tag{font-size:9px;font-weight:700;padding:0 5px;border-radius:999px;background:var(--color-green-12);color:#2f7d33}
.aim__tag.world{background:var(--color-neutral-200);color:var(--color-text-secondary)}
@media(prefers-reduced-motion:reduce){.aim__chip{opacity:1;transform:none;transition:none}}
`;

export function CliAiModelsMock() {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-play');
      return;
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add('is-play');
          io.disconnect();
        }
      }),
      { threshold: 0.3 },
    );
    io.observe(el);
    const t = setTimeout(() => el.classList.add('is-play'), 2500);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="aim mx-auto w-full max-w-[600px] space-y-3" ref={ref} aria-hidden>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <CliBatchStatsMock />
      <div className="aim__strip">
        <div className="aim__cap">Работает с любыми ИИ‑инструментами</div>
        <div className="aim__row">
          {MODELS.map((m) => (
            <span className="aim__chip" key={m.name}>
              <span className="aim__logo">{m.logo}</span>
              <span className="aim__nm">{m.name}</span>
              <span className={`aim__tag ${m.tag === 'RU' ? '' : 'world'}`}>{m.tag}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
