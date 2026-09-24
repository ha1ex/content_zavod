import { cn } from '../../primitives/cn';

/* Material Icons (24×24, заливка) — как в меню «+» продукта. */
const MI = {
  space: 'M9 21H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h4v18zm2 0h8c1.1 0 2-.9 2-2v-7H11v9zm10-11V5c0-1.1-.9-2-2-2h-8v7h10z',
  storyMap: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z',
  doc: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
  folder: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z',
  importExport: 'M9 3 5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z',
};

const MENU: { section: string; items: { icon: string; label: string }[] }[] = [
  {
    section: 'Добавить',
    items: [
      { icon: MI.space, label: 'Пространство' },
      { icon: MI.storyMap, label: 'Story map' },
      { icon: MI.doc, label: 'Документ' },
      { icon: MI.folder, label: 'Папку' },
    ],
  },
  {
    section: 'Импортировать',
    items: [
      { icon: MI.storyMap, label: 'Story map' },
      { icon: MI.importExport, label: 'Импортировать' },
    ],
  },
];

/** Скриншот пустого пространства Кайтена — подложка под меню. */
const SCREEN = { src: '/brand/kaiten-workspace-empty.webp', w: 2000, h: 1247 };
/** Кнопка «+» на скриншоте: меню раскрывается под ней. */
const MENU_POS = { left: 396, top: 184, scale: 2.4 };

/**
 * Window: создание пространства в Kaiten. Подложка — скриншот пустого
 * пространства (дерево слева, доска справа), поверх него выпадающее меню
 * кнопки «+»: «Добавить» и «Импортировать». Меню нарисованное, как было.
 * Дизайн-ширина — натуральная ширина скриншота, 2000px.
 */
export function WorkspaceCreateMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-2xl) border border-(--color-border-default)',
        'bg-(--color-surface-card) shadow-[0_10px_40px_-20px_rgba(45,45,45,0.3)]',
      )}
      style={{ width: SCREEN.w, height: SCREEN.h }}
    >
      <img src={SCREEN.src} alt="" loading="lazy" className="block h-full w-full object-cover" />
      <div
        className="absolute z-10"
        style={{ left: MENU_POS.left, top: MENU_POS.top, transform: `scale(${MENU_POS.scale})`, transformOrigin: 'top left' }}
      >
          {/* выпадающее меню кнопки «+»: как в продукте — серые заливные иконки, группы без разделителя */}
          <div className="w-[164px] rounded-(--radius-lg) bg-(--color-surface-card) py-1.5 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.2),0_4px_5px_0_rgba(0,0,0,0.14),0_1px_10px_0_rgba(0,0,0,0.12)]">
            {MENU.map((g, gi) => (
              <div key={g.section} className={cn(gi > 0 && 'mt-1')}>
                <div className="px-3 pb-1 pt-1.5 text-[11.5px] font-medium text-[#757575]">{g.section}</div>
                {g.items.map((it) => (
                  <div key={g.section + it.label} className="flex items-center gap-3 px-3 py-[5px] text-[12px] text-[#212121]">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="#616161" aria-hidden="true">
                      <path d={it.icon} />
                    </svg>
                    {it.label}
                  </div>
                ))}
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}
