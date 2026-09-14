import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface TreeNode {
  /** Эмодзи раздела — так материалы помечены в самом портале. */
  emoji: string;
  label: string;
  level: 0 | 1;
  open?: boolean;
  active?: boolean;
  muted?: boolean;
}

const TREE: TreeNode[] = [
  { emoji: '🏠', label: 'Главная страница', level: 0 },
  { emoji: '📝', label: 'Инструкции', level: 0, open: true },
  { emoji: '📄', label: 'Знакомство с компанией', level: 1 },
  { emoji: '📄', label: 'Как создать доску', level: 1, active: true },
  { emoji: '📄', label: 'Как добавить задачу', level: 1 },
  { emoji: '📄', label: 'Как пригласить коллег', level: 1 },
  { emoji: '📄', label: 'Как создать документ', level: 1 },
  { emoji: '❓', label: 'Ответы на частые вопросы', level: 0 },
  { emoji: '📋', label: 'Регламенты компании', level: 0 },
  { emoji: '📚', label: 'Документация продукта', level: 0 },
  { emoji: '🔖', label: 'Новости компании', level: 0, muted: true },
];

const ARTICLE_BARS = ['w-full', 'w-5/6', 'w-4/6', 'w-3/4'];
const ARTICLE_BARS_2 = ['w-full', 'w-11/12', 'w-3/4'];

/**
 * Структура разделов Справочного центра: дерево материалов компании слева
 * (главная, инструкции со статьями, вопросы и ответы, новости) и превью
 * открытой статьи справа. Иллюстрирует блок «Инструкции и ответы на вопросы».
 */
export function HelpCenterSectionsMock() {
  return (
    <div
      aria-hidden
      className={cn(
        // Ширина зафиксирована: снаружи мок оборачивается в `w-max` и
        // масштабируется под колонку — без неё сетка растягивается по
        // max-content и мок ужимается почти вдвое.
        'relative w-[576px] overflow-hidden rounded-(--radius-xl) lg:rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_0_40px_rgba(45,45,45,0.12)]',
      )}
    >
      {/* window-chrome */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-yellow-300" />
        <span className="h-2 w-2 rounded-full bg-green-300" />
        <div className="ml-2 flex flex-wrap items-center gap-3 text-[11px] text-(--color-text-secondary)">
          <span className="font-medium text-(--color-text-primary)">Справочный центр</span>
          <span>Материалы</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">
            50 статей опубликовано
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[168px_1fr]">
        {/* дерево разделов */}
        <div className="space-y-0.5 bg-(--color-surface-section) p-3">
          {TREE.map((n, i) => (
            <div
              key={i}
              className={cn(
                'flex items-center gap-1.5 rounded-(--radius-lg) py-1.5 pr-2 text-[11px]',
                n.level === 0 ? 'pl-2' : 'pl-6',
                n.active
                  ? 'bg-(--color-action-primary-soft) font-medium text-(--color-text-accent)'
                  : 'text-(--color-text-primary)',
                n.muted && 'opacity-60',
              )}
            >
              {n.level === 0 ? (
                <Icon
                  name={n.open ? 'ChevronDown' : 'ChevronRight'}
                  className="h-3 w-3 shrink-0 text-(--color-text-secondary)"
                  strokeWidth={2.5}
                />
              ) : (
                <span className="h-3 w-3 shrink-0" />
              )}
              <span className="w-3.5 shrink-0 text-[11px] leading-none">{n.emoji}</span>
              <span className="truncate">{n.label}</span>
            </div>
          ))}
        </div>

        {/* превью статьи */}
        <div className="bg-(--color-surface-page) p-4 md:p-5">
          <div className="flex flex-wrap items-center gap-1 text-[10px] text-(--color-text-secondary)">
            <span>Справочный центр</span>
            <Icon name="ChevronRight" className="h-2.5 w-2.5" strokeWidth={2} />
            <span>Инструкции</span>
            <Icon name="ChevronRight" className="h-2.5 w-2.5" strokeWidth={2} />
            <span className="font-medium text-(--color-text-primary)">Как создать доску</span>
          </div>

          <div className="mt-3 text-[15px] font-semibold text-(--color-text-primary)">
            Как создать доску
          </div>
          <div className="mt-1 text-[11.5px] text-(--color-text-secondary)">
            Инструкция для новых сотрудников: где создать доску, как назвать колонки и кого добавить
            в команду
          </div>

          <div className="mt-3.5 space-y-1.5">
            {ARTICLE_BARS.map((w) => (
              <div key={w} className={cn('h-2 rounded-full bg-(--color-neutral-200)', w)} />
            ))}
          </div>

          <div className="mt-4 text-[12.5px] font-semibold text-(--color-text-primary)">
            Кого добавить в команду доски
          </div>
          <div className="mt-2 space-y-1.5">
            {ARTICLE_BARS_2.map((w) => (
              <div key={w} className={cn('h-2 rounded-full bg-(--color-neutral-200)', w)} />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-(--color-border-default) pt-2.5 text-[10px] text-(--color-text-secondary)">
            <span className="inline-flex items-center gap-1">
              <Icon name="Clock" className="h-3 w-3" strokeWidth={2} />
              Обновлена 14 мая
            </span>
            <span className="inline-flex items-center gap-1">
              <Icon name="Globe" className="h-3 w-3" strokeWidth={2} />
              Опубликована для всех
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
