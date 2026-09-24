'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FeatureTile, FeatureTilesStyle } from './FeatureTile';

/**
 * ModulesCollageMock (`modules-collage`) — шесть модулей платформы плитками:
 * серая карточка с мини-мокапом фичи из галереи FeatureMocksV01 и подписью.
 * Чаты, Документы, Дашборды и отчеты, Встречи, Служба поддержки, Проекты.
 * Адаптивная сетка без MockFit: 1 / 2 / 3 колонки.
 */

const TILES: { title: string; text: string; tile: string }[] = [
  { title: 'Проекты', text: 'Планируйте сроки и этапы работ', tile: 'Роадмап проектов' },
  { title: 'Чаты', text: 'Обсуждайте задачи с командой', tile: 'chat-mini' },
  { title: 'Документы', text: 'Храните инструкции и регламенты', tile: 'Совместный редактор' },
  { title: 'Дашборды и отчеты', text: 'Следите за показателями', tile: 'Диаграмма сгорания' },
  { title: 'Встречи', text: 'Созванивайтесь с коллегами', tile: 'Видеозвонки и конференции' },
  { title: 'Служба поддержки', text: 'Принимайте и обрабатывайте обращения', tile: 'support-mini' },
];

export function ModulesCollageMock() {
  // На мобилке и планшете плитки листаются (свайп и стрелки), с 1280px — сетка в 3 колонки.
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 1);
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || '16') : 1;
    setIdx(Math.round(el.scrollLeft / step));
  }, []);
  useEffect(() => {
    sync();
    const el = trackRef.current;
    el?.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el?.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);
  const go = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || '16') : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };
  const arrow = 'flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border-default) bg-(--color-surface-card) text-(--color-text-accent) transition enabled:hover:border-(--color-action-primary)/48 enabled:hover:bg-(--color-action-primary-soft) disabled:text-(--color-border-default)';
  return (
    <div className="w-full">
      <FeatureTilesStyle />
      <style>{'.mc-track{scrollbar-width:none}.mc-track::-webkit-scrollbar{display:none}'}</style>
      {/* gap 16 / 24 / 32 (мобилка / планшет до 1280 / десктоп) */}
      <div
        ref={trackRef}
        aria-hidden
        className="mc-track -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 md:-mx-6 md:gap-6 md:scroll-px-6 md:px-6 xl:mx-0 xl:gap-8 xl:grid xl:grid-cols-3 xl:overflow-visible xl:px-0"
      >
        {TILES.map((t) => (
          <div key={t.title} className="w-[340px] max-w-[calc(100vw-32px)] shrink-0 snap-start md:w-[380px] md:max-w-none xl:w-auto">
            <Tile {...t} />
          </div>
        ))}
      </div>
      {scrollable && (
        <div className="mt-6 flex items-center justify-center gap-3.5 md:mt-8 xl:hidden" role="group" aria-label="Листать модули">
          <button type="button" aria-label="Предыдущий модуль" disabled={atStart} onClick={() => go(-1)} className={arrow}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <span className="min-w-[52px] text-center text-base text-(--color-text-secondary)">
            <b className="font-medium text-(--color-text-accent)">{Math.min(idx + 1, TILES.length)}</b> / {TILES.length}
          </span>
          <button type="button" aria-label="Следующий модуль" disabled={atEnd} onClick={() => go(1)} className={arrow}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}

function Tile({ title, text, tile }: { title: string; text: string; tile: string }) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-(--color-surface-section) p-6 lg:p-8">
      <div className="text-lg font-semibold leading-snug text-(--color-text-primary)">{title}</div>
      <div className="mt-1 text-base text-(--color-text-secondary)">{text}</div>
      <div className="mt-auto flex h-[228px] shrink-0 items-center pt-6 lg:pt-8 box-content justify-center lg:h-[242px]">
        {/* плитка галереи 240×176 — увеличиваем, чтобы заполнить карточку */}
        <div className="origin-center scale-[1.22] rounded-2xl lg:scale-[1.3] [&_.card]:!shadow-[0_0_24px_rgba(45,45,45,0.08)] [&_.ttl]:!text-[9.5px] [&_.vcbtn.ai]:!pt-[1.3px] [&_.vcbtn:nth-child(1)_svg]:translate-x-[0.23px] [&_.vcbtn:nth-child(5)_svg]:-translate-y-[0.32px] [&_.vcbtn:nth-child(6)_svg]:translate-x-[0.7px]">
          <div>
            {tile === 'chat-mini' ? <ChatMini /> : tile === 'support-mini' ? <SupportMini /> : <FeatureTile caption={tile} withStyle={false} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Минималистичный мокап чатов в стиле плиток галереи (240×176): список чатов и переписка. */
function ChatMini() {
  const chats: [string, string, boolean, string, string][] = [
    ['М', '#7d4ccf', true, 'Маркетинг', 'Отлично, согласовано!'],
    ['Р', '#ff9800', false, 'Разработка', 'Релиз в пятницу'],
    ['П', '#8bc34a', false, 'Поддержка', 'Новое обращение'],
    ['А', '#4fc3f7', false, 'Анна', 'Отправила макеты'],
    ['В', '#f06292', false, 'Владимир', 'Созвон в 15:00?'],
    ['Д', '#26a69a', false, 'Дизайн', 'Новые баннеры готовы'],
  ];
  return (
    <div className="flex h-[176px] w-[240px] overflow-hidden rounded-2xl bg-white shadow-[0_0_24px_rgba(45,45,45,0.08)]" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>
      <div className="flex w-[92px] flex-none flex-col justify-between border-r border-[#ededed] bg-[#fafafa] px-2 py-2">
        {chats.map(([l, c, on, name, last]) => (
          <div key={l} className={on ? 'flex items-center gap-1.5 rounded-md bg-[#efe9f9] px-1 py-[3px]' : 'flex items-center gap-1.5 px-1 py-[3px]'}>
            <svg width="12" height="12" viewBox="0 0 12 12" className="flex-none"><circle cx="6" cy="6" r="6" fill={c} /><text x="6" y="6.2" textAnchor="middle" dominantBaseline="central" fontSize="6" fontWeight="600" fill="#fff">{l}</text></svg>
            <span className="flex min-w-0 flex-col"><span className="truncate text-[7.5px] font-medium leading-tight text-[#2d2d2d]">{name}</span><span className="truncate text-[6px] leading-tight text-[#9e9e9e]">{last}</span></span>
          </div>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-b border-[#ededed] bg-[#f5f1fb] px-2.5 py-1.5 text-[8px] font-semibold text-[#2d2d2d]">Маркетинг</div>
        <div className="flex flex-1 flex-col justify-end gap-1.5 px-2.5 py-2 text-[7.5px] leading-tight text-[#2d2d2d]">
          <span className="max-w-[80%] self-start rounded-md rounded-bl-none bg-[#f2f2f4] px-2 py-1">Где актуальный план запуска?</span>
          <span className="max-w-[80%] self-end rounded-md rounded-br-none bg-[#efe9f9] px-2 py-1">В карточке задачи, ссылка ниже</span>
          <span className="max-w-[80%] self-start rounded-md rounded-bl-none bg-[#f2f2f4] px-2 py-1">Отлично, согласовано! ✅</span>
        </div>
        <div className="mx-2.5 mb-2.5 flex items-center rounded-md border border-[#ededed] px-2 py-1 text-[7px] text-[#9e9e9e]">
          Напишите сообщение
          <span className="ml-auto inline-flex h-3 w-3 items-center justify-center rounded-sm bg-[#7d4ccf] text-[6px] text-white">➤</span>
        </div>
      </div>
    </div>
  );
}

/** Заявки клиентов со сроками SLA (240×176), иконки векторные — ровно по центру плашек. */
function SupportMini() {
  const V = '#7d4ccf';
  const icons: Record<string, React.ReactElement> = {
    mail: <path d="M2.5 4h7v5h-7zM2.5 4.3 6 7l3.5-2.7" fill="none" stroke={V} strokeWidth="0.9" strokeLinejoin="round" />,
    help: (
      <>
        <path d="M4.6 4.9a1.4 1.4 0 1 1 2 1.3c-.4.2-.6.5-.6.9" fill="none" stroke={V} strokeWidth="0.9" strokeLinecap="round" />
        <circle cx="6" cy="8.6" r=".55" fill={V} />
      </>
    ),
    target: (
      <>
        <circle cx="6" cy="6" r="3" fill="none" stroke={V} strokeWidth="0.9" />
        <circle cx="6" cy="6" r="1.2" fill={V} />
      </>
    ),
    gear: (
      <>
        <path d="M6 2.7 9.4 8.8H2.6Z" fill="none" stroke={V} strokeWidth="0.9" strokeLinejoin="round" />
        <path d="M6 5.2v1.7" stroke={V} strokeWidth="0.9" strokeLinecap="round" />
        <circle cx="6" cy="7.8" r=".45" fill={V} />
      </>
    ),
  };
  const rows: [string, string, string, string, string][] = [
    ['mail', 'Не приходит счет', 'SLA 4 ч', '#e9f5ea', '#2e7d32'],
    ['help', 'Вопрос по тарифу', 'SLA 1 ч', '#fff3e0', '#b26a00'],
    ['target', 'Доступ для сотрудника', 'Просрочено', '#fde8e6', '#e53935'],
    ['gear', 'Ошибка в отчете', 'SLA 2 ч', '#e9f5ea', '#2e7d32'],
  ];
  return (
    <div className="flex h-[176px] w-[240px] flex-col rounded-2xl bg-white p-3 text-[#2d2d2d] shadow-[0_0_24px_rgba(45,45,45,0.08)]" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>
      <div className="mb-[7px] text-[9.5px] font-semibold">Заявки клиентов</div>
      <div className="flex flex-col gap-[6px]">
        {rows.map(([ic, text, chip, bg, fg]) => (
          <div key={text} className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 12 12" className="flex-none">
              <rect width="12" height="12" rx="3.4" fill="#efe9f9" />
              {icons[ic]}
            </svg>
            <span className="min-w-0 flex-1 truncate text-[8.5px] font-normal">{text}</span>
            <span className="inline-flex h-[11px] items-center rounded-full px-1.5 text-[7px] font-semibold leading-none" style={{ background: bg, color: fg }}>{chip}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto border-t border-[#ededed] pt-2">
        <div className="text-[8px] font-medium text-[#757575]">Шаблонный ответ</div>
        <div className="mt-1.5 flex h-[18px] items-center truncate rounded-[6px] bg-[#f5f6f7] px-2 text-[7.5px] text-[#2d2d2d]">Здравствуйте! Уже разбираемся с вашим вопросом</div>
      </div>
    </div>
  );
}
