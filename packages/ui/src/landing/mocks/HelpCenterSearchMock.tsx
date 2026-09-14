import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface Result {
  /** Эмодзи раздела — так материалы помечены в самом портале. */
  emoji: string;
  title: string;
  muted?: boolean;
}

const RESULTS: Result[] = [
  { emoji: '📄', title: 'Как создать доску' },
  { emoji: '📄', title: 'Как пригласить коллег' },
  { emoji: '📄', title: 'Знакомство с компанией' },
  { emoji: '📄', title: 'Как добавить задачу' },
  { emoji: '❓', title: 'Ответы на частые вопросы', muted: true },
];

/**
 * Поиск по Справочному центру: строка запроса и простой список найденных
 * материалов — иконка документа и название, без рамок и бейджей разделов,
 * как в самом портале. Иллюстрирует шаг «Найти ответ».
 */
export function HelpCenterSearchMock() {
  return (
    <div
      aria-hidden
      className={cn(
        // Ширина зафиксирована: без неё мок на планшете и мобилке
        // переверстывается, а должен уменьшаться целиком, как картинка.
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
          <span>Поиск по материалам</span>
        </div>
      </div>

      <div className="bg-(--color-surface-page) p-4 md:p-5">
        {/* поисковая строка */}
        <div className="flex items-center gap-2 rounded-(--radius-xl) bg-(--color-surface-section) px-3 py-2.5">
          <Icon name="Search" className="h-4 w-4 shrink-0 text-(--color-text-secondary)" strokeWidth={2} />
          <span className="truncate text-[12.5px] text-(--color-text-primary)">как создать доску</span>
          <Icon
            name="X"
            className="ml-auto h-3.5 w-3.5 shrink-0 text-(--color-text-secondary)"
            strokeWidth={2}
          />
        </div>

        <div className="mt-4 text-[11px] text-(--color-text-secondary)">
          Результаты поиска по «как создать доску»:
        </div>

        {/* простой список результатов — без рамок и бейджей */}
        <div className="mt-3 space-y-2.5 pl-1">
          {RESULTS.map((r) => (
            <div key={r.title} className={cn('flex items-center gap-2.5', r.muted && 'opacity-60')}>
              <span className="w-4 shrink-0 text-[13px] leading-none">{r.emoji}</span>
              <span className="truncate text-[12.5px] text-(--color-text-primary)">{r.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
