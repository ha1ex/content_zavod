import { cn } from '../../primitives/cn';

interface Channel {
  label: string;
  on: boolean;
}

interface EventRow {
  label: string;
  /** Отметки по каналам в порядке CHANNELS. */
  checks: boolean[];
}

const TABS = ['Уведомления', 'Подписки на пространства', 'Подписки на колонки', 'Боты'];

const CHANNELS: Channel[] = [
  { label: 'Почта', on: true },
  { label: 'Telegram', on: true },
  { label: 'Max', on: false },
  { label: 'Моб. прилож.', on: true },
];

const PERSONAL: EventRow[] = [
  { label: 'Вас назначили ответственным', checks: [true, true, false, true] },
  { label: 'Вас упомянули в комментарии', checks: [true, true, false, true] },
  { label: 'Напоминание о сроке', checks: [false, false, false, true] },
];

const SUBSCRIBED: EventRow[] = [
  { label: 'Добавлена блокировка', checks: [true, false, false, true] },
  { label: 'Карточка перемещена', checks: [false, true, false, false] },
];

/** Сетка строки: подпись + колонки каналов одной ширины. */
const GRID = 'grid grid-cols-[1fr_repeat(4,74px)] items-center';

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        'relative inline-block h-[18px] w-[32px] rounded-full transition-colors',
        on ? 'bg-(--color-action-primary)' : 'bg-(--color-neutral-300)',
      )}
    >
      <span
        className={cn(
          'absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow-sm',
          on ? 'left-[16px]' : 'left-[2px]',
        )}
      />
    </span>
  );
}

function Check({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex h-[16px] w-[16px] items-center justify-center rounded-[4px] border',
        on
          ? 'border-(--color-action-primary) bg-(--color-action-primary) text-white'
          : 'border-(--color-neutral-300) bg-(--color-surface-section)',
      )}
    >
      {on && (
        <svg viewBox="0 0 12 12" className="h-[10px] w-[10px]" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2.5 6.2 5 8.6l4.5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

function Group({ title, rows }: { title: string; rows: EventRow[] }) {
  return (
    <>
      <div className="border-b border-(--color-border-default) px-1 pb-1.5 pt-3 text-[12px] font-semibold text-(--color-text-primary)">
        {title}
      </div>
      {rows.map((r) => (
        <div key={r.label} className={cn(GRID, 'border-b border-(--color-border-default) px-1 py-2')}>
          <span className="truncate text-[13px] text-(--color-text-primary)">{r.label}</span>
          {r.checks.map((c, i) => (
            <span key={i} className="flex justify-center">
              <Check on={c} />
            </span>
          ))}
        </div>
      ))}
    </>
  );
}

/**
 * Настройка уведомлений Кайтена: вкладки профиля, каналы доставки с общими
 * тумблерами (почта, Telegram, Max, мобильное приложение) и таблица событий
 * по карточкам с отметками по каналам. Поверх — телефон с чатом бота, как в
 * плитке галереи «Боты и уведомления». Для блока «Получайте уведомления о
 * действиях с карточками в удобном для вас формате».
 */
export function WindowNotificationSettingsMock() {
  return (
    <div aria-hidden className="relative w-[796px] pb-6 pr-[166px]">
      <div
        className={cn(
          'overflow-hidden rounded-(--radius-2xl) bg-(--color-surface-card) px-6 pb-3 pt-4',
          'shadow-[0_0_40px_-12px_rgba(24,24,27,0.25)]',
        )}
      >
        {/* Вкладки профиля */}
        <div className="flex gap-5 border-b border-(--color-border-default)">
          {TABS.map((t, i) => (
            <span
              key={t}
              className={cn(
                'pb-2.5 text-[11px] font-semibold uppercase tracking-wide',
                i === 0
                  ? 'border-b-2 border-(--color-action-primary) text-(--color-text-primary)'
                  : 'text-(--color-text-secondary)',
              )}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Каналы доставки */}
        <div className={cn(GRID, 'px-1 pt-4')}>
          <span />
          {CHANNELS.map((c) => (
            <span key={c.label} className="flex flex-col items-center gap-2">
              <span className="whitespace-nowrap text-[12px] text-(--color-text-primary)">{c.label}</span>
              <Toggle on={c.on} />
            </span>
          ))}
        </div>

        <Group title="Личные события" rows={PERSONAL} />
        <Group title="События в карточках, на которые вы подписаны" rows={SUBSCRIBED} />

        <div className="mt-3 flex justify-end gap-2">
          <span className="inline-flex items-center rounded-(--radius-md) border border-(--color-border-default) px-2.5 pb-[5px] pt-[7px] text-[10.5px] font-semibold uppercase leading-none text-(--color-text-primary)">
            Отмена
          </span>
          <span className="inline-flex items-center rounded-(--radius-md) border border-(--color-action-primary) px-2.5 pb-[5px] pt-[7px] text-[10.5px] font-semibold uppercase leading-none text-(--color-text-accent)">
            Сохранить
          </span>
        </div>
      </div>

      {/* Телефон с чатом бота — поверх левого нижнего угла окна настроек */}
      <div
        className={cn(
          'absolute bottom-0 right-[32px] flex h-[300px] w-[170px] flex-col gap-2.5 rounded-[22px] border border-(--color-border-default)',
          'bg-(--color-surface-card) p-3 shadow-[0_10px_40px_-12px_rgba(24,24,27,0.35)]',
        )}
      >
        <div className="flex items-center gap-1.5 border-b border-(--color-border-default) pb-1.5">
          <svg width="15" height="15" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="9" fill="#F11F24" />
            <rect x="4.5" y="4.5" width="11" height="11" rx="2.5" transform="rotate(45 10 10)" fill="#78FFC7" />
            <circle cx="10" cy="10" r="3" fill="#7D4CCF" />
          </svg>
          <span className="text-[13px] font-semibold text-(--color-text-primary)">Кайтен</span>
        </div>
        <span className="text-[13px] font-semibold text-(--color-text-accent)">Чат с ботом</span>
        <span className="self-start rounded-[2px_8px_8px_8px] bg-(--color-surface-section) px-2.5 py-1.5 text-[11.5px] leading-snug text-(--color-text-primary)">
          Вас назначили ответственным: «Макеты главной»
        </span>
        <span className="self-end rounded-[8px_2px_8px_8px] bg-(--color-action-primary-soft) px-2.5 py-1.5 text-[11.5px] text-(--color-text-primary)">
          Беру в работу
        </span>
        <span className="self-start rounded-[2px_8px_8px_8px] bg-(--color-surface-section) px-2.5 py-1.5 text-[11.5px] leading-snug text-(--color-text-primary)">
          Срок завтра, 18:00
        </span>
        <div className="mt-auto flex items-center gap-1 rounded-[8px] border border-(--color-border-default) px-2.5 py-1.5">
          <span className="flex-1 text-[11px] text-(--color-text-secondary)">Сообщение</span>
          <span className="text-[13px] leading-none text-(--color-text-accent)">➜</span>
        </div>
      </div>
    </div>
  );
}
