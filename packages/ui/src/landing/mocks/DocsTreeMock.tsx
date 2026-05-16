import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface TreeNode {
  icon: string;
  label: string;
  meta?: string;
  level: 0 | 1 | 2;
  open?: boolean;
  active?: boolean;
}

const TREE: TreeNode[] = [
  { icon: 'Building2', label: 'Компания', level: 0, open: true },
  { icon: 'BookOpen', label: 'Регламенты и политики', meta: '18', level: 1, open: true },
  { icon: 'FileText', label: 'Регламент согласований', level: 2 },
  { icon: 'FileText', label: 'Политика по данным', level: 2 },
  { icon: 'FileText', label: 'Регламент онбординга', level: 2, active: true },
  { icon: 'Users', label: 'HR-инструкции', meta: '32', level: 1 },
  { icon: 'Megaphone', label: 'Маркетинг и бренд', meta: '24', level: 1 },
  { icon: 'Package', label: 'Продукт', meta: '47', level: 1, open: true },
  { icon: 'FileText', label: 'PRD платформы', level: 2 },
  { icon: 'FileText', label: 'Релизные заметки', level: 2 },
  { icon: 'Headphones', label: 'Поддержка клиентов', meta: '21', level: 1 },
];

const DOC_BLOCKS: Array<{ kind: 'h' | 'p' | 'check'; text: string; checked?: boolean }> = [
  { kind: 'h', text: 'Регламент онбординга' },
  { kind: 'p', text: 'Этот документ описывает шаги для новых сотрудников в первые две недели в команде.' },
  { kind: 'check', text: 'Получить доступы к рабочим сервисам', checked: true },
  { kind: 'check', text: 'Прочитать раздел «Как мы работаем»', checked: true },
  { kind: 'check', text: 'Пройти встречу 1:1 с руководителем' },
  { kind: 'check', text: 'Закрыть онбординг-чек-лист и поделиться впечатлениями' },
];

const LEVEL_PAD: Record<TreeNode['level'], string> = {
  0: 'pl-2',
  1: 'pl-5',
  2: 'pl-9',
};

/**
 * Mock дерева разделов с фрагментом открытого документа. Подсвеченная ветка —
 * текущий документ. Тон: «вся документация компании в одном понятном дереве».
 */
export function DocsTreeMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.30)]',
      )}
    >
      {/* window chrome */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-yellow-300" />
        <span className="h-2 w-2 rounded-full bg-green-300" />
        <div className="ml-2 flex flex-wrap items-center gap-3 text-[11px] text-(--color-text-secondary)">
          <span className="font-medium text-(--color-text-primary)">База знаний · Компания</span>
          <span>142 документа</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">
            Поиск · Структура · Избранное
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[200px_1fr] gap-0 md:grid-cols-[220px_1fr]">
        {/* tree */}
        <div className="space-y-0.5 border-r border-(--color-border-default) bg-(--color-surface-section) p-3">
          <div className="mb-2 flex items-center gap-1 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-page) px-2 py-1.5">
            <Icon name="Search" className="h-3 w-3 text-(--color-text-secondary)" strokeWidth={2} />
            <span className="text-[10px] text-(--color-text-secondary)">Поиск по документам</span>
          </div>
          {TREE.map((n, i) => (
            <div
              key={i}
              className={cn(
                'flex items-center gap-1.5 rounded-(--radius-lg) py-1 pr-2 text-[11px]',
                LEVEL_PAD[n.level],
                n.active
                  ? 'bg-(--color-action-primary-soft) font-medium text-(--color-text-accent)'
                  : 'text-(--color-text-primary)',
              )}
            >
              {n.level === 0 || n.level === 1 ? (
                <Icon
                  name={n.open ? 'ChevronDown' : 'ChevronRight'}
                  className="h-3 w-3 text-(--color-text-secondary)"
                  strokeWidth={2.5}
                />
              ) : (
                <span className="h-3 w-3" />
              )}
              <Icon
                name={n.icon}
                className={cn(
                  'h-3.5 w-3.5',
                  n.active ? 'text-(--color-text-accent)' : 'text-(--color-text-secondary)',
                )}
                strokeWidth={2}
              />
              <span className="truncate">{n.label}</span>
              {n.meta && (
                <span className="ml-auto rounded-full bg-(--color-neutral-200) px-1.5 text-[9px] text-(--color-text-secondary)">
                  {n.meta}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* document preview */}
        <div className="bg-(--color-surface-page) p-4 md:p-5">
          {/* breadcrumb */}
          <div className="flex flex-wrap items-center gap-1 text-[10px] text-(--color-text-secondary)">
            <span>Компания</span>
            <Icon name="ChevronRight" className="h-2.5 w-2.5" strokeWidth={2} />
            <span>Регламенты и политики</span>
            <Icon name="ChevronRight" className="h-2.5 w-2.5" strokeWidth={2} />
            <span className="font-medium text-(--color-text-primary)">Регламент онбординга</span>
          </div>

          {/* doc body */}
          <div className="mt-3 space-y-2">
            {DOC_BLOCKS.map((b, i) =>
              b.kind === 'h' ? (
                <div key={i} className="text-[15px] font-semibold text-(--color-text-primary)">
                  {b.text}
                </div>
              ) : b.kind === 'p' ? (
                <div key={i} className="text-[11.5px] text-(--color-text-secondary)">
                  {b.text}
                </div>
              ) : (
                <div key={i} className="flex items-start gap-2">
                  <span
                    className={cn(
                      'mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-(--radius-sm) border text-[10px]',
                      b.checked
                        ? 'border-(--color-action-primary) bg-(--color-action-primary) text-white'
                        : 'border-(--color-border-default) bg-(--color-surface-card)',
                    )}
                  >
                    {b.checked && '✓'}
                  </span>
                  <span
                    className={cn(
                      'text-[11.5px]',
                      b.checked
                        ? 'text-(--color-text-secondary) line-through'
                        : 'text-(--color-text-primary)',
                    )}
                  >
                    {b.text}
                  </span>
                </div>
              ),
            )}
          </div>

          {/* footer-meta */}
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-(--color-border-default) pt-2.5 text-[10px] text-(--color-text-secondary)">
            <span className="inline-flex items-center gap-1">
              <Icon name="Clock" className="h-3 w-3" strokeWidth={2} />
              Обновлён 14 мая, Анна Петрова
            </span>
            <span className="inline-flex items-center gap-1">
              <Icon name="Users" className="h-3 w-3" strokeWidth={2} />
              Открыт для команды Продукт
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
