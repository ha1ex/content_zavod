import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

type StatusTone = 'done' | 'progress' | 'queue';

interface Request {
  id: string;
  status: string;
  tone: StatusTone;
  title: string;
  service: string;
  date: string;
  muted?: boolean;
}

const REQUESTS: Request[] = [
  {
    id: '69314780',
    status: 'Готово',
    tone: 'done',
    title: 'Не могу оплатить тариф',
    service: 'Помощь',
    date: '27.08.2026',
  },
  {
    id: '69315532',
    status: 'В работе',
    tone: 'progress',
    title: 'Нужна помощь с доступом',
    service: 'Прием заказов',
    date: '26.08.2026',
  },
  {
    id: '68898124',
    status: 'Очередь',
    tone: 'queue',
    title: 'Не получается зарегистрироваться',
    service: 'Прием заказов',
    date: '19.08.2026',
  },
];

const STATUS_STYLE: Record<StatusTone, string> = {
  done: 'bg-(--color-green-12) text-(--color-green-100)',
  progress: 'bg-(--color-action-primary-soft) text-(--color-text-accent)',
  queue: 'bg-(--color-neutral-200) text-(--color-text-secondary)',
};

/**
 * Раздел «Мои заявки» в Справочном центре: поиск, фильтр по статусу и таблица
 * обращений пользователя — номер, статус, тема, сервис и дата. Иллюстрирует шаг
 * «Следить за статусом обращения» и возможность «История заявок».
 */
export function HelpCenterRequestsMock() {
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
          <span>Мои заявки</span>
        </div>
      </div>

      <div className="bg-(--color-surface-page) p-4 md:p-5">
        <div className="text-[15px] font-semibold text-(--color-text-primary)">Заявки</div>

        {/* поиск и фильтры */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-card) px-2.5 py-1.5">
            <Icon name="Search" className="h-3 w-3 shrink-0 text-(--color-text-secondary)" strokeWidth={2} />
            <span className="truncate text-[10px] text-(--color-text-secondary)">поиск</span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-card) px-2.5 py-1.5">
            <span className="text-[10px] text-(--color-text-primary)">Статус: Все</span>
            <Icon name="ChevronDown" className="h-3 w-3 text-(--color-text-secondary)" strokeWidth={2} />
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-card) px-2.5 py-1.5">
            <Icon name="ListFilter" className="h-3 w-3 text-(--color-text-secondary)" strokeWidth={2} />
            <span className="text-[10px] text-(--color-text-primary)">Фильтр</span>
          </div>
        </div>

        {/* заголовок таблицы */}
        <div className="mt-3.5 grid grid-cols-[64px_74px_1fr_92px_74px] gap-2 border-b border-(--color-border-default) pb-2 text-[9px] font-medium uppercase tracking-wide text-(--color-text-secondary)">
          <span>Номер</span>
          <span>Статус</span>
          <span>Название</span>
          <span>Сервис</span>
          <span>Создана</span>
        </div>

        {/* строки */}
        <div className="divide-y divide-(--color-border-default)">
          {REQUESTS.map((r) => (
            <div
              key={r.id}
              className={cn(
                'grid grid-cols-[64px_74px_1fr_92px_74px] items-center gap-2 py-2.5',
                r.muted && 'opacity-60',
              )}
            >
              <span className="text-[10px] text-(--color-text-secondary)">{r.id}</span>
              <span
                className={cn(
                  'inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[9px] font-medium',
                  STATUS_STYLE[r.tone],
                )}
              >
                {r.status}
              </span>
              <span className="truncate text-[11.5px] font-medium text-(--color-text-primary)">
                {r.title}
              </span>
              <span className="truncate text-[10px] text-(--color-text-secondary)">{r.service}</span>
              <span className="text-[10px] text-(--color-text-secondary)">{r.date}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-[10px] text-(--color-text-secondary)">
          <Icon name="Bell" className="h-3 w-3" strokeWidth={2} />
          Об изменении статуса приходит письмо по шаблону вашей компании
        </div>
      </div>
    </div>
  );
}
