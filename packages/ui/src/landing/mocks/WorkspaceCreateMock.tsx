import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

/** Эмодзи вместо иконок — как в дереве пространств Kaiten. */
const TREE: { emoji: string; label: string; folder?: boolean; active?: boolean }[] = [
  { emoji: '🏢', label: 'Структура компании', folder: true },
  { emoji: '📣', label: 'Маркетинг', active: true },
  { emoji: '💻', label: 'Разработка', folder: true },
  { emoji: '📊', label: 'Дашборд руководителя' },
  { emoji: '📘', label: 'Регламент команды' },
  { emoji: '📚', label: 'База знаний', folder: true },
  { emoji: '🎧', label: 'Техподдержка' },
  { emoji: '👋', label: 'Знакомство с Kaiten' },
];

type Tone = 'violet' | 'blue' | 'orange' | 'green';
const TAG: Record<Tone, string> = {
  violet: 'bg-(--color-action-primary-soft) text-(--color-text-accent)',
  blue: 'bg-(--color-blue-12) text-(--color-blue-100)',
  orange: 'bg-(--color-orange-12) text-amber-800',
  green: 'bg-(--color-green-12) text-green-700',
};

const COLUMNS: { name: string; cards: { title: string; tag: [string, Tone]; who: string }[] }[] = [
  {
    name: 'Очередь',
    cards: [
      { title: 'Статья в блог', tag: ['Блог', 'blue'], who: 'ЕГ' },
      { title: 'Вебинар для партнеров', tag: ['События', 'orange'], who: 'АК' },
      { title: 'Кейс клиента', tag: ['Сайт', 'violet'], who: 'ПС' },
      { title: 'Опрос пользователей', tag: ['Аналитика', 'blue'], who: 'АМ' },
    ],
  },
  {
    name: 'В работе',
    cards: [
      { title: 'Промостраница функции', tag: ['Сайт', 'violet'], who: 'АМ' },
      { title: 'Баннеры для соцсетей', tag: ['Дизайн', 'orange'], who: 'АК' },
      { title: 'Видео о продукте', tag: ['Контент', 'green'], who: 'ЕГ' },
    ],
  },
  {
    name: 'Готово',
    cards: [
      { title: 'Рассылка клиентам', tag: ['Рассылка', 'green'], who: 'ПС' },
      { title: 'Отчет по охвату', tag: ['Аналитика', 'blue'], who: 'ЕГ' },
      { title: 'Пресс-релиз', tag: ['PR', 'violet'], who: 'АМ' },
    ],
  },
];

const MENU: { section: string; items: { icon: string; label: string; active?: boolean }[] }[] = [
  {
    section: 'Добавить',
    items: [
      { icon: 'LayoutDashboard', label: 'Пространство', active: true },
      { icon: 'ChartColumn', label: 'Story map' },
      { icon: 'FileText', label: 'Документ' },
      { icon: 'Folder', label: 'Папку' },
    ],
  },
  {
    section: 'Импортировать',
    items: [
      { icon: 'ChartColumn', label: 'Story map' },
      { icon: 'ArrowDownUp', label: 'Импортировать' },
    ],
  },
];

/**
 * Window: создание пространства в Kaiten. На заднем плане — приложение:
 * дерево пространств и документов слева, доска «Маркетинг» справа. Поверх —
 * выпадающее меню кнопки «+» с подсвеченным пунктом «Пространство».
 * Реконструкция экрана Kaiten упрощённым мокапом, дизайн-ширина 640px.
 */
export function WorkspaceCreateMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative w-[640px] overflow-hidden rounded-(--radius-2xl) border border-(--color-border-default)',
        'bg-(--color-surface-card) shadow-[0_10px_40px_-20px_rgba(45,45,45,0.3)]',
      )}
    >
      {/* верхняя панель */}
      <div className="flex items-center gap-2 border-b border-(--color-border-default) px-4 py-2.5">
        <Icon name="Menu" className="h-4 w-4 text-(--color-text-secondary)" strokeWidth={2} />
        <span className="text-[13px] font-semibold text-(--color-text-primary)">Рабочие пространства</span>
        <span className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-full bg-(--color-action-primary) text-[10px] font-semibold text-white">
          АМ
        </span>
      </div>

      <div className="grid h-[380px] grid-cols-[200px_1fr]">
        {/* дерево */}
        <div className="border-r border-(--color-border-default) bg-(--color-surface-section) p-2.5">
          <div className="mb-2 text-[12px] font-semibold text-(--color-text-primary)">Дерево</div>
          <div className="mb-2 flex items-center gap-1.5">
            <div className="flex flex-1 items-center gap-1.5 rounded-(--radius-md) border border-(--color-border-default) bg-(--color-surface-card) px-2 py-1">
              <Icon name="Search" className="h-3 w-3 text-(--color-text-secondary)" strokeWidth={2} />
              <span className="text-[10.5px] text-(--color-text-secondary)">Найти</span>
            </div>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-(--radius-md) bg-(--color-action-primary) text-white">
              <Icon name="Plus" className="h-3.5 w-3.5" strokeWidth={2.4} />
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            {TREE.map((t) => (
              <div
                key={t.label}
                className={cn(
                  'flex items-center gap-1.5 rounded-(--radius-md) px-1.5 py-1 text-[11px]',
                  t.active ? 'bg-(--color-action-primary-soft) font-medium text-(--color-text-accent)' : 'text-(--color-text-primary)',
                )}
              >
                <Icon name={t.folder ? 'ChevronRight' : 'Dot'} className="h-3 w-3 shrink-0 text-(--color-text-secondary)" strokeWidth={2} />
                <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center text-[11px] leading-none">{t.emoji}</span>
                <span className="truncate">{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* доска */}
        <div className="flex flex-col bg-(--color-surface-section)/40 p-2">
          <div className="mb-1.5 text-[12px] font-semibold text-(--color-text-primary)">Маркетинг</div>
          {/* единая панель доски: колонки разделены вертикальными линиями */}
          <div className="grid flex-1 grid-cols-3 rounded-(--radius-lg) bg-(--color-surface-section) py-1.5">
            {COLUMNS.map((col, ci) => (
              <div key={col.name} className={cn('overflow-hidden px-1.5', ci > 0 && 'border-l border-(--color-border-default)')}>
                <div className="mb-1.5 flex items-center px-1 text-[10.5px] font-semibold text-(--color-text-primary)">
                  {col.name}
                  <span className="ml-auto rounded-[4px] bg-(--color-neutral-400) px-1 text-[9px] text-white">{col.cards.length}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {col.cards.map((c) => (
                    <div key={c.title} className="rounded-(--radius-md) border border-(--color-border-default) bg-(--color-surface-card) px-1.5 py-2 shadow-[0_1px_2px_rgba(45,45,45,0.06)]">
                      <div className="text-[10.5px] font-medium leading-snug text-(--color-text-primary)">{c.title}</div>
                      <div className="mt-1.5 flex items-center">
                        <span className={cn('rounded-full px-1.5 py-px text-[9px] font-medium', TAG[c.tag[1]])}>{c.tag[0]}</span>
                        <span className="ml-auto inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#b9a3e3] text-[7px] font-semibold leading-none text-white">
                          {c.who}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* выпадающее меню кнопки «+» */}
      <div className="absolute left-[166px] top-[108px] z-10 w-[164px] rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-card) py-1.5 shadow-[0_12px_32px_-12px_rgba(45,45,45,0.35)]">
        {MENU.map((g, gi) => (
          <div key={g.section} className={cn(gi > 0 && 'mt-1 border-t border-(--color-border-default) pt-1')}>
            <div className="px-3 py-1.5 text-[11px] font-medium text-(--color-text-secondary)">{g.section}</div>
            {g.items.map((it) => (
              <div
                key={g.section + it.label}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-1.5 text-[12px]',
                  it.active ? 'bg-(--color-action-primary-soft) font-medium text-(--color-text-accent)' : 'text-(--color-text-primary)',
                )}
              >
                <Icon name={it.icon} className={cn('h-4 w-4', it.active ? 'text-(--color-text-accent)' : 'text-(--color-text-secondary)')} strokeWidth={2} />
                {it.label}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
