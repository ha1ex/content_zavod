import { cn } from '../../primitives/cn';

interface MaterialCard {
  /** Эмодзи-иконка раздела — так они выглядят в самом Справочном центре. */
  emoji: string;
  title: string;
  description: string;
  muted?: boolean;
}

const CARDS: MaterialCard[] = [
  {
    emoji: '🔔',
    title: 'Настройка уведомлений',
    description: 'Как настроить оповещения на почту и в мессенджеры',
  },
  {
    emoji: '📈',
    title: 'Отчеты и аналитика',
    description: 'Обзор встроенных отчетов и что они показывают',
  },
  {
    emoji: '👥',
    title: 'Группы пользователей',
    description: 'Управление доступами и правами через группы',
  },
  {
    emoji: '🚀',
    title: 'Автоматизация',
    description: 'Настройка событий и триггеров, которые освободят от рутины',
  },
  {
    emoji: '🔒',
    title: 'Ограничения',
    description: 'Правила, которые помогут выстроить строгий процесс',
  },
  {
    emoji: '🤝',
    title: 'Служба поддержки',
    description: 'Сбор вопросов клиентов из разных каналов на одной доске',
  },
];

/**
 * Готовый шаблон Справочного центра: подборка материалов «Как продолжить» —
 * карточки разделов с эмодзи-иконкой, названием-ссылкой и описанием, как на
 * главной странице живого Справочного центра. Остается наполнить своими
 * статьями. Иллюстрирует блок «Начните с готового шаблона».
 */
export function HelpCenterTemplateMock() {
  return (
    <div
      aria-hidden
      className={cn(
        // Ширина зафиксирована: снаружи мок оборачивается в `w-max` и
        // масштабируется под колонку — без неё сетка карточек растягивается
        // по max-content и мок ужимается до нечитаемого.
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
          <span className="font-medium text-(--color-text-primary)">Шаблон Справочного центра</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">
            Готовая структура
          </span>
        </div>
      </div>

      <div className="bg-(--color-surface-page) p-4 md:p-5">
        <div className="text-[15px] font-semibold text-(--color-text-primary)">Как продолжить</div>
        <p className="mt-1 text-[10px] text-(--color-text-secondary)">
          Для тех, кто уже разобрался с основами и хочет использовать Справочный центр на максимум
        </p>

        <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className={cn(
                'rounded-(--radius-xl) border border-dashed border-(--color-border-default) bg-(--color-surface-card) p-3',
                c.muted && 'opacity-60',
              )}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-action-primary-soft) text-base leading-none">
                {c.emoji}
              </span>
              <div className="mt-2.5 text-[11.5px] font-semibold leading-tight text-(--color-text-accent)">
                {c.title}
              </div>
              <div className="mt-1 text-[10px] leading-snug text-(--color-text-secondary)">
                {c.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
