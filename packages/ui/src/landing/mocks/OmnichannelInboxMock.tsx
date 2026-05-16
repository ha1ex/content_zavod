import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface Inbox {
  channel: 'phone' | 'telegram' | 'whatsapp' | 'email' | 'chat' | 'vk';
  icon: string;
  tone: 'violet' | 'blue' | 'green' | 'orange';
  customer: string;
  preview: string;
  meta: string;
  unread?: boolean;
  active?: boolean;
}

const INBOX: Inbox[] = [
  {
    channel: 'phone',
    icon: 'PhoneIncoming',
    tone: 'violet',
    customer: 'Анна Соколова',
    preview: 'Пропущенный · ООО «Северный ветер»',
    meta: 'Звонок · только что',
    unread: true,
    active: true,
  },
  {
    channel: 'telegram',
    icon: 'Send',
    tone: 'blue',
    customer: 'Дмитрий Орлов',
    preview: 'Подскажите по тарифам, выбираем между двумя…',
    meta: 'Telegram · 2 мин',
    unread: true,
  },
  {
    channel: 'chat',
    icon: 'MessageCircle',
    tone: 'green',
    customer: 'Bright Coffee',
    preview: 'Счёт оплатили, когда подключение?',
    meta: 'Сайт · 7 мин',
  },
  {
    channel: 'email',
    icon: 'Mail',
    tone: 'orange',
    customer: 'Мария Зайцева',
    preview: 'Re: КП по внедрению для 20 точек',
    meta: 'Почта · 14 мин',
  },
  {
    channel: 'whatsapp',
    icon: 'MessageSquare',
    tone: 'green',
    customer: 'Pixel Studio',
    preview: 'Готовы подписать договор, куда отправить…',
    meta: 'WhatsApp · 22 мин',
  },
];

const TONE_CLASS: Record<Inbox['tone'], string> = {
  violet: 'bg-(--color-action-primary-soft) text-(--color-text-accent)',
  blue: 'bg-(--color-blue-12) text-(--color-blue-100)',
  green: 'bg-(--color-green-12) text-green-700',
  orange: 'bg-(--color-orange-12) text-amber-800',
};

/**
 * Mock omnichannel inbox: единый список обращений из разных каналов (звонок,
 * Telegram, чат на сайте, почта, WhatsApp, VK). У каждой строки — цвет-кодированный
 * канал, имя клиента, превью сообщения и время. Тон: «все обращения в одном окне,
 * менеджеру не нужно держать 5 вкладок».
 */
export function OmnichannelInboxMock() {
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
          <span className="font-medium text-(--color-text-primary)">Обращения · Все каналы</span>
          <span>8 каналов</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">
            12 новых
          </span>
        </div>
      </div>

      {/* channel filters */}
      <div className="flex flex-wrap items-center gap-1 border-b border-(--color-border-default) bg-(--color-surface-page) px-3 py-2">
        {[
          { label: 'Все', count: 47, active: true },
          { label: 'Звонки', count: 6 },
          { label: 'Telegram', count: 12 },
          { label: 'Чат', count: 9 },
          { label: 'Почта', count: 14 },
          { label: 'WhatsApp', count: 6 },
        ].map((f) => (
          <span
            key={f.label}
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px]',
              f.active
                ? 'bg-(--color-action-primary-soft) font-medium text-(--color-text-accent)'
                : 'text-(--color-text-secondary)',
            )}
          >
            {f.label}
            <span className="rounded-full bg-(--color-neutral-200) px-1 text-[9px] text-(--color-text-primary)">
              {f.count}
            </span>
          </span>
        ))}
      </div>

      <div className="space-y-1.5 p-3 md:p-4">
        {INBOX.map((m, i) => (
          <div
            key={i}
            className={cn(
              'flex items-start gap-2.5 rounded-(--radius-xl) border bg-(--color-surface-page) p-2.5',
              m.active
                ? 'border-(--color-action-primary)/40 shadow-sm'
                : 'border-(--color-border-default)',
            )}
          >
            <span
              className={cn(
                'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-(--radius-xl)',
                TONE_CLASS[m.tone],
              )}
            >
              <Icon name={m.icon} className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-[11.5px] font-semibold text-(--color-text-primary)">
                  {m.customer}
                </span>
                {m.unread && (
                  <span className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-action-primary)" />
                )}
                <span className="ml-auto shrink-0 text-[10px] text-(--color-text-secondary)">
                  {m.meta}
                </span>
              </div>
              <div className="mt-0.5 truncate text-[11px] text-(--color-text-secondary)">
                {m.preview}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
