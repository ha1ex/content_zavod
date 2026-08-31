import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface Rule {
  /** Событие-триггер правила. */
  when: string;
  /** Действие Kaiten в ответ. */
  then: string;
  /** Доска, на которой работает правило. */
  board: string;
  /** Правило включено. */
  on: boolean;
  /** Приглушённая строка — «кадр обрезан», список продолжается. */
  muted?: boolean;
}

const RULES: Rule[] = [
  {
    when: 'Карточка попала в колонку «В работе»',
    then: 'Назначить ответственного',
    board: 'Текущие задачи',
    on: true,
  },
  {
    when: 'Все пункты чек-листа закрыты',
    then: 'Создать дочернюю карточку «Тестирование»',
    board: 'Текущие задачи',
    on: true,
  },
  {
    when: 'Изменилось поле «Клиент» в карточке',
    then: 'Подставить значение в дочерние карточки',
    board: 'Проекты клиентов',
    on: true,
  },
  {
    when: 'Карточка создана в колонке «Очередь»',
    then: 'Добавить чек-лист «Критерии приемки»',
    board: 'Текущие задачи',
    on: false,
    muted: true,
  },
];

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        'relative inline-flex h-4 w-7 shrink-0 rounded-full',
        on ? 'bg-(--color-action-primary)' : 'bg-(--color-neutral-300)',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 h-3 w-3 rounded-full bg-(--color-surface-card)',
          on ? 'right-0.5' : 'left-0.5',
        )}
      />
    </span>
  );
}

/**
 * Экран «Автоматизации» пространства Kaiten: список настроенных правил
 * «Когда → Выполнить» с досками и тумблерами включения. Показывает, что
 * рутинные шаги уже работают сами — для блока сценариев «Освобождение от рутины»
 * на лендинге модуля «Автоматизации».
 */
export function AutomationRulesListMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative w-[680px] overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_0_40px_-12px_rgba(125,76,207,0.30)]',
      )}
    >
      {/* window-chrome */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-yellow-300" />
        <span className="h-2 w-2 rounded-full bg-green-300" />
        <div className="ml-2 flex flex-wrap items-center gap-3 text-[11px] text-(--color-text-secondary)">
          <span className="font-medium text-(--color-text-primary)">Автоматизации</span>
          <span>Правила</span>
          <span>Журнал</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">
            Создать правило
          </span>
        </div>
      </div>

      <div className="divide-y divide-(--color-border-default)">
        {RULES.map((r) => (
          <div key={r.when} className={cn('flex items-center gap-3 px-4 py-3', r.muted && 'opacity-60')}>
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-(--radius-lg) bg-(--color-action-primary-soft) text-(--color-text-accent)">
              <Icon name="Zap" aria-hidden className="h-4 w-4" strokeWidth={2} />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 text-[11.5px] leading-tight">
                <span className="font-semibold text-(--color-text-accent)">Когда</span>
                <span className="font-semibold text-(--color-text-primary)">{r.when}</span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11.5px] leading-tight">
                <span className="font-semibold text-(--color-text-accent)">Выполнить</span>
                <span className="text-(--color-text-primary)">{r.then}</span>
              </div>
              <div className="mt-1.5 flex items-center gap-1 text-[10px] text-(--color-text-secondary)">
                <Icon name="LayoutGrid" aria-hidden className="h-3 w-3" strokeWidth={2} />
                {r.board}
              </div>
            </div>

            <Toggle on={r.on} />
          </div>
        ))}
      </div>
    </div>
  );
}
