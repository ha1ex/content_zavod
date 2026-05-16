import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

const TABS = [
  { label: 'Профиль', active: true },
  { label: 'Сделки', count: 4 },
  { label: 'История', count: 27 },
  { label: 'Документы', count: 6 },
  { label: 'Задачи', count: 3 },
];

const FIELDS = [
  { label: 'Компания', value: 'ГК «Энергомост»' },
  { label: 'Контакт', value: 'Игорь Лебедев' },
  { label: 'Должность', value: 'COO' },
  { label: 'Телефон', value: '+7 495 ••• 14 02' },
  { label: 'Email', value: 'i.lebedev@…' },
  { label: 'Город', value: 'Москва' },
];

const TIMELINE = [
  {
    icon: 'PhoneIncoming',
    tone: 'violet' as const,
    title: 'Входящий звонок · 12 мин',
    meta: 'Анна Соколова · 14 мая 10:24',
  },
  {
    icon: 'Mail',
    tone: 'blue' as const,
    title: 'Отправлено КП v2',
    meta: 'Шаблон «Корпоративный» · 13 мая',
  },
  {
    icon: 'CheckCircle2',
    tone: 'green' as const,
    title: 'Закрыта задача «Согласовать смету»',
    meta: 'Анна Соколова · 13 мая',
  },
];

const TONE_CLASS: Record<'violet' | 'blue' | 'green' | 'orange', string> = {
  violet: 'bg-(--color-action-primary-soft) text-(--color-text-accent)',
  blue: 'bg-(--color-blue-12) text-(--color-blue-100)',
  green: 'bg-(--color-green-12) text-green-700',
  orange: 'bg-(--color-orange-12) text-amber-800',
};

/**
 * Mock карточки клиента CRM: левая колонка — аватар, реквизиты, теги; правая —
 * табы (Профиль / Сделки / История / Документы / Задачи) и таймлайн событий.
 * Тон: «вся работа с клиентом — в одной карточке, ничего не теряется».
 */
export function CrmClientCardMock() {
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
          <span className="font-medium text-(--color-text-primary)">Клиент · ГК «Энергомост»</span>
          <span>ID 18524</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">
            Активный
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[140px_1fr] gap-4 p-4 md:grid-cols-[180px_1fr] md:gap-5 md:p-5">
        {/* sidebar */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-(--color-action-primary) text-sm font-semibold text-white">
              ИЛ
            </span>
            <div className="min-w-0">
              <div className="truncate text-[11.5px] font-semibold text-(--color-text-primary)">
                Игорь Лебедев
              </div>
              <div className="truncate text-[10px] text-(--color-text-secondary)">COO</div>
            </div>
          </div>

          <div className="space-y-1.5">
            {FIELDS.map((f) => (
              <div key={f.label}>
                <div className="text-[9px] uppercase tracking-wide text-(--color-text-secondary)">
                  {f.label}
                </div>
                <div className="truncate text-[11px] font-medium text-(--color-text-primary)">
                  {f.value}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1 pt-1">
            <span className="inline-flex h-4 items-center rounded-full bg-(--color-action-primary-soft) px-1.5 text-[9px] font-medium text-(--color-text-accent)">
              VIP
            </span>
            <span className="inline-flex h-4 items-center rounded-full bg-(--color-blue-12) px-1.5 text-[9px] font-medium text-(--color-blue-100)">
              B2B
            </span>
          </div>
        </div>

        {/* main */}
        <div className="space-y-3">
          {/* tabs */}
          <div className="flex flex-wrap items-center gap-1 border-b border-(--color-border-default) pb-2">
            {TABS.map((t) => (
              <span
                key={t.label}
                className={cn(
                  'inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium',
                  t.active
                    ? 'bg-(--color-action-primary-soft) text-(--color-text-accent)'
                    : 'text-(--color-text-secondary)',
                )}
              >
                {t.label}
                {t.count && (
                  <span className="rounded-full bg-(--color-neutral-200) px-1 text-[9px] text-(--color-text-primary)">
                    {t.count}
                  </span>
                )}
              </span>
            ))}
          </div>

          {/* active deal */}
          <div className="rounded-(--radius-xl) border border-(--color-action-primary)/30 bg-(--color-action-primary-soft)/30 p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wide text-(--color-text-secondary)">
                  Активная сделка
                </div>
                <div className="mt-0.5 text-[12.5px] font-semibold text-(--color-text-primary)">
                  Внедрение CRM для 80 операторов
                </div>
              </div>
              <div className="text-[13px] font-semibold text-(--color-text-accent)">
                1 250 000 ₽
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[10px]">
              <span className="inline-flex h-4 items-center rounded-full bg-(--color-action-primary) px-1.5 font-medium text-white">
                Квалификация
              </span>
              <span className="text-(--color-text-secondary)">Демо · 18 мая 11:00</span>
            </div>
          </div>

          {/* timeline */}
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">
              Последние события
            </div>
            {TIMELINE.map((e, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-page) p-2"
              >
                <span
                  className={cn(
                    'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-(--radius-lg)',
                    TONE_CLASS[e.tone],
                  )}
                >
                  <Icon name={e.icon} className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[11px] font-medium text-(--color-text-primary)">
                    {e.title}
                  </div>
                  <div className="truncate text-[10px] text-(--color-text-secondary)">
                    {e.meta}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
