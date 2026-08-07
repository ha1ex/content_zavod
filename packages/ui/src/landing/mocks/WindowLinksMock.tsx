import { cn } from '../../primitives/cn';

interface ChildCard {
  title: string;
  initials: string;
  color: string;
}

const CHILDREN: ChildCard[] = [
  { title: 'Армирование колонн и перекрытий — 1 этаж', initials: 'ВК', color: 'bg-(--color-green-100)' },
  { title: 'Бетонирование перекрытий — 1 этаж', initials: 'ДМ', color: 'bg-(--color-orange-100)' },
  { title: 'Армирование и бетонирование — 2 этаж', initials: 'АС', color: 'bg-(--color-action-primary)' },
  { title: 'Армирование и бетонирование — 3 этаж', initials: 'НП', color: 'bg-(--color-blue-100)' },
];

const TreeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="5" r="2" />
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="19" r="2" />
    <path d="M12 7V12M12 12l-5 5M12 12l5 5" />
  </svg>
);

/**
 * Window: панель «Связи» карточки Kaiten.
 * Родительская карточка проекта и очередь дочерних карточек
 * (финиш-старт): у каждой строки прогресс, ответственный и запуск.
 */
export function WindowLinksMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'overflow-hidden rounded-(--radius-3xl) border border-(--color-border-default)',
        'bg-(--color-surface-card) p-5 md:p-6',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.25)]',
      )}
    >
      {/* header */}
      <div className="flex items-center gap-2.5 border-b border-(--color-border-default) pb-3">
        <TreeIcon className="h-4.5 w-4.5 text-(--color-text-primary)" />
        <span className="text-base font-semibold text-(--color-text-primary)">Связи</span>
        <span className="ml-auto inline-flex overflow-hidden rounded-(--radius-lg)">
          {[
            <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="h-3.5 w-3.5"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>,
            <svg key="f" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M5 5l7 7-7 7zM13 5l7 7-7 7z" /></svg>,
            <svg key="d" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M20 6 9 17l-5-5" /></svg>,
          ].map((icon, i) => (
            <span
              key={i}
              className={cn(
                'flex h-6.5 w-8.5 items-center justify-center bg-(--color-action-primary) text-white',
                i > 0 && 'border-l border-white/35',
              )}
            >
              {icon}
            </span>
          ))}
        </span>
      </div>

      {/* parent */}
      <div className="mt-4 text-[13px] font-semibold text-(--color-text-primary)">Родительские карточки</div>
      <div className="mt-2 flex flex-col gap-1.5 rounded-(--radius-xl) border border-(--color-neutral-200) px-3 py-2.5">
        <span className="h-1 w-24 rounded-full bg-(--color-action-primary)" />
        <div className="flex items-center gap-2.5">
          <span className="min-w-0 flex-1 truncate text-sm text-(--color-text-primary)">Офисный центр «Гранит» — строительство</span>
          <span className="flex items-center gap-2 text-xs text-(--color-text-secondary)">
            <TreeIcon className="h-3.5 w-3.5" />
            0/1
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-3.5 w-3.5"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
          </span>
        </div>
      </div>
      <span className="mt-2.5 inline-block rounded-(--radius-lg) border border-(--color-border-default) px-3.5 py-2 text-[11px] font-semibold text-(--color-text-primary)">
        ДОБАВИТЬ РОДИТЕЛЬСКУЮ КАРТОЧКУ
      </span>

      {/* children */}
      <div className="mt-4 flex items-center text-[13px] font-semibold text-(--color-text-primary)">
        Дочерние карточки
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-(--radius-lg) border border-(--color-border-default) px-2.5 py-1 text-xs font-normal text-(--color-text-primary)">
          Список
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-(--color-text-secondary)"><path d="M6 9l6 6 6-6" /></svg>
        </span>
      </div>
      <div className="mt-2 overflow-hidden rounded-(--radius-xl) border border-(--color-neutral-200)">
        {CHILDREN.map((card, i) => (
          <div
            key={card.title}
            className={cn('flex flex-col gap-1.5 px-3 py-2.5', i > 0 && 'border-t border-(--color-neutral-200)')}
          >
            <span className="h-1 w-24 rounded-full bg-(--color-action-primary)" />
            <div className="flex items-center gap-2.5">
              <span className="min-w-0 flex-1 truncate text-sm text-(--color-text-primary)">{card.title}</span>
              <span className="flex items-center gap-2 text-(--color-text-secondary)">
                <TreeIcon className="h-3.5 w-3.5" />
                <span className={cn('flex h-5.5 w-5.5 items-center justify-center rounded-full text-[10px] font-semibold text-white', card.color)}>
                  {card.initials}
                </span>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-(--color-blue-100)"><path d="M7 4.5l12 7.5-12 7.5z" /></svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
