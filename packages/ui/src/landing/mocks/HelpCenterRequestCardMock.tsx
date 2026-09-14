import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface Card {
  service: string;
  title: string;
  comments: number;
  tag: string;
  author: string;
  fresh?: boolean;
}

interface Column {
  name: string;
  count: number;
  cards: Card[];
}

const COLUMNS: Column[] = [
  {
    name: 'Очередь',
    count: 4,
    cards: [
      {
        service: 'Прием заказов',
        title: 'Не получается зарегистрироваться',
        comments: 0,
        tag: 'Доступ',
        author: 'ДЛ',
      },
      {
        service: 'Помощь',
        title: 'Не могу оплатить тариф',
        comments: 3,
        tag: 'Оплата',
        author: 'ИС',
      },
    ],
  },
  {
    name: 'В работе',
    count: 2,
    cards: [
      {
        service: 'Помощь',
        title: 'Как оформить заказ в магазине',
        comments: 1,
        tag: 'Другое',
        author: 'ЕБ',
        fresh: true,
      },
    ],
  },
  {
    name: 'Готово',
    count: 9,
    cards: [
      {
        service: 'Помощь',
        title: 'Как добавить сотрудника в группу',
        comments: 2,
        tag: 'Доступ',
        author: 'МК',
      },
    ],
  },
];

/**
 * Обращение из Справочного центра на доске команды: заявка приходит отдельной
 * карточкой в колонку «Очередь» и дальше идет по процессу до «Готово». В карточке —
 * сервис, тема обращения, комментарии, метка и автор. Иллюстрирует шаг
 * «Передать заявку в работу».
 */
export function HelpCenterRequestCardMock() {
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
          <span className="font-medium text-(--color-text-primary)">Обращения из Справочного центра</span>
          <span>Доска команды</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">
            Фильтры
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5 bg-(--color-surface-page) p-3.5 md:p-4">
        {COLUMNS.map((col) => (
          <div key={col.name} className="rounded-(--radius-xl) bg-(--color-surface-section) p-2.5">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                {col.name}
              </span>
              <span className="ml-auto rounded-full bg-(--color-neutral-300) px-1.5 text-[9px] font-medium text-(--color-text-primary)">
                {col.count}
              </span>
            </div>

            <div className="space-y-2">
              {col.cards.map((c) => (
                <div
                  key={c.title}
                  className={cn(
                    // Без теней: карточки держатся на белой заливке поверх серой
                    // колонки, свежая заявка выделена фиолетовой обводкой.
                    'rounded-(--radius-lg) bg-(--color-surface-card) p-2.5',
                    c.fresh && 'border border-(--color-action-primary)',
                  )}
                >
                  <div className="mb-1.5 inline-flex items-center gap-1 rounded-full border border-(--color-border-default) px-1.5 py-0.5">
                    <Icon
                      name="Headphones"
                      className="h-2.5 w-2.5 text-(--color-text-secondary)"
                      strokeWidth={2}
                    />
                    <span className="text-[9px] text-(--color-text-secondary)">{c.service}</span>
                  </div>

                  <div className="text-[11.5px] font-semibold leading-tight text-(--color-text-primary)">
                    {c.title}
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-0.5 text-[9px] text-(--color-text-secondary)">
                      <Icon name="MessageSquare" className="h-2.5 w-2.5" strokeWidth={2} />
                      {c.comments}
                    </span>
                    <span className="rounded-full bg-(--color-neutral-200) px-1.5 py-0.5 text-[9px] text-(--color-text-secondary)">
                      {c.tag}
                    </span>
                    <span className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-full bg-(--color-action-primary-soft) text-[9px] font-medium text-(--color-text-accent)">
                      {c.author}
                    </span>
                  </div>

                  {c.fresh && (
                    <div className="mt-2 flex items-center gap-1 border-t border-(--color-border-default) pt-1.5 text-[9px] font-medium text-(--color-text-accent)">
                      <Icon name="Inbox" className="h-2.5 w-2.5" strokeWidth={2} />
                      Новая заявка из портала
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
