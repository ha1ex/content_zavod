import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

const FIELDS = [
  { label: 'Заказчик', value: 'ГК «Энергомост»', filled: true },
  { label: 'ИНН', value: '7728168971', filled: true },
  { label: 'Сумма', value: '1 250 000,00 ₽', filled: true, accent: true },
  { label: 'Срок оплаты', value: '14 банковских дней', filled: true },
  { label: 'Услуга', value: 'Внедрение CRM', filled: true },
];

const LINES = [
  { qty: '1', name: 'Внедрение CRM · 80 рабочих мест', price: '950 000 ₽' },
  { qty: '40', name: 'Обучение менеджеров · группа 10 чел.', price: '12 000 ₽' },
  { qty: '1', name: 'Миграция базы клиентов из таблиц', price: '300 000 ₽' },
];

/**
 * Mock документа CRM: счёт/КП с автоподстановкой полей клиента и статусом
 * подписания. Тон: «документ собирается из шаблона за минуту, статус
 * меняется автоматически».
 */
export function DocTemplateMock() {
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
          <span className="font-medium text-(--color-text-primary)">Документы · Счёт №2418</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-(--color-orange-12) px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
            <Icon name="Eye" className="h-3 w-3" strokeWidth={2} />
            Просмотрен · 14 мая
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[180px_1fr] gap-4 p-4 md:p-5">
        {/* sidebar — template + status */}
        <div className="space-y-3">
          <div className="rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-section) p-3">
            <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">
              Шаблон
            </div>
            <div className="mt-1 text-[11.5px] font-semibold text-(--color-text-primary)">
              Счёт на оплату · корпоративный
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-(--color-text-secondary)">
              <Icon name="Sparkles" className="h-3 w-3 text-(--color-text-accent)" strokeWidth={2} />
              Поля подставлены из карточки клиента
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">
              Статус
            </div>
            {[
              { label: 'Сформирован', done: true },
              { label: 'Отправлен клиенту', done: true },
              { label: 'Просмотрен', done: true },
              { label: 'Оплачен', done: false, active: true },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className={cn(
                    'inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px]',
                    s.done
                      ? 'bg-(--color-action-primary) text-white'
                      : s.active
                        ? 'border border-(--color-action-primary) bg-white text-(--color-action-primary)'
                        : 'border border-(--color-border-default) bg-white',
                  )}
                >
                  {s.done && '✓'}
                </span>
                <span
                  className={cn(
                    'text-[11px]',
                    s.done
                      ? 'text-(--color-text-secondary) line-through'
                      : s.active
                        ? 'font-medium text-(--color-text-primary)'
                        : 'text-(--color-text-primary)',
                  )}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <span className="inline-flex h-7 items-center justify-center gap-1 rounded-(--radius-lg) bg-(--color-action-primary) px-2 text-[11px] font-medium text-white">
              <Icon name="Send" className="h-3.5 w-3.5" strokeWidth={2.5} />
              Отправить клиенту
            </span>
            <span className="inline-flex h-7 items-center justify-center gap-1 rounded-(--radius-lg) border border-(--color-border-default) bg-white px-2 text-[11px] font-medium text-(--color-text-primary)">
              <Icon name="Download" className="h-3.5 w-3.5" strokeWidth={2} />
              Скачать PDF
            </span>
          </div>
        </div>

        {/* main — document preview */}
        <div className="rounded-(--radius-2xl) border border-(--color-border-default) bg-(--color-surface-page) p-4">
          <div className="flex items-start justify-between border-b border-(--color-border-default) pb-2.5">
            <div>
              <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">
                Счёт на оплату
              </div>
              <div className="mt-0.5 text-[14px] font-semibold text-(--color-text-primary)">
                № 2418 от 14 мая 2026
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-(--color-text-secondary)">К оплате</div>
              <div className="text-[14px] font-bold text-(--color-text-accent)">1 250 000 ₽</div>
            </div>
          </div>

          {/* auto-filled fields */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            {FIELDS.map((f) => (
              <div
                key={f.label}
                className={cn(
                  'rounded-(--radius-lg) border bg-(--color-surface-page) p-2',
                  f.accent
                    ? 'border-(--color-action-primary)/30 bg-(--color-action-primary-soft)/30'
                    : 'border-(--color-border-default)',
                )}
              >
                <div className="text-[9px] uppercase tracking-wide text-(--color-text-secondary)">
                  {f.label}
                </div>
                <div
                  className={cn(
                    'mt-0.5 truncate text-[11px] font-semibold',
                    f.accent ? 'text-(--color-text-accent)' : 'text-(--color-text-primary)',
                  )}
                >
                  {f.value}
                </div>
              </div>
            ))}
          </div>

          {/* line items */}
          <div className="mt-3 space-y-1">
            <div className="grid grid-cols-[28px_1fr_80px] gap-2 border-b border-(--color-border-default) pb-1 text-[9px] uppercase tracking-wide text-(--color-text-secondary)">
              <span>Кол-во</span>
              <span>Наименование</span>
              <span className="text-right">Сумма</span>
            </div>
            {LINES.map((l, i) => (
              <div
                key={i}
                className="grid grid-cols-[28px_1fr_80px] items-center gap-2 py-1 text-[11px] text-(--color-text-primary)"
              >
                <span className="text-(--color-text-secondary) tabular-nums">{l.qty}</span>
                <span className="truncate">{l.name}</span>
                <span className="text-right font-medium tabular-nums">{l.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
