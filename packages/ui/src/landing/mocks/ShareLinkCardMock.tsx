import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

/**
 * Mock карточки публичной ссылки на документ: тумблер доступа, URL с кнопкой
 * скопировать, ограничения для внешнего читателя, заметка про автообновление.
 * Тон: «отправил ссылку — клиент всегда видит актуальную версию документа».
 */
export function ShareLinkCardMock() {
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
          <span className="font-medium text-(--color-text-primary)">Поделиться документом</span>
        </div>
      </div>

      <div className="p-4 md:p-5">
        {/* doc header */}
        <div className="flex items-start gap-3 border-b border-(--color-border-default) pb-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-(--radius-xl) bg-(--color-action-primary-soft) text-(--color-text-accent)">
            <Icon name="FileText" className="h-4 w-4" strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12.5px] font-semibold text-(--color-text-primary)">
              Гид по подключению для клиентов
            </div>
            <div className="mt-0.5 truncate text-[10.5px] text-(--color-text-secondary)">
              Обновлён 14 мая · Команда поддержки
            </div>
          </div>
          <span className="inline-flex h-5 shrink-0 items-center gap-1 rounded-full bg-(--color-green-12) px-2 text-[10px] font-medium text-green-700">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-green-600" />
            Доступ открыт
          </span>
        </div>

        {/* toggle row */}
        <div className="mt-3 flex items-center gap-2.5 rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-page) p-2.5">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-(--radius-xl) bg-(--color-action-primary-soft) text-(--color-text-accent)">
            <Icon name="Globe2" className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[11.5px] font-semibold text-(--color-text-primary)">
              Открыт по публичной ссылке
            </div>
            <div className="text-[10px] text-(--color-text-secondary)">
              Внешние читатели увидят документ без регистрации
            </div>
          </div>
          <span className="inline-flex h-5 w-9 shrink-0 items-center rounded-full bg-(--color-action-primary) p-0.5">
            <span className="h-4 w-4 translate-x-4 rounded-full bg-white" />
          </span>
        </div>

        {/* link */}
        <div className="mt-3 flex items-center gap-2 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-section) p-2">
          <Icon name="Link" className="h-3.5 w-3.5 text-(--color-text-secondary)" strokeWidth={2} />
          <span className="flex-1 truncate font-mono text-[11px] text-(--color-text-primary)">
            docs.example.ru/share/onboarding-9f2c
          </span>
          <span className="inline-flex h-6 items-center gap-1 rounded-(--radius-md) bg-(--color-action-primary) px-2 text-[10.5px] font-medium text-white">
            <Icon name="Copy" className="h-3 w-3" strokeWidth={2.5} />
            Скопировать
          </span>
        </div>

        {/* perms */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { icon: 'Eye', label: 'Только просмотр', on: true },
            { icon: 'MessageSquare', label: 'Комментарии', on: false },
            { icon: 'Download', label: 'Скачивание', on: false },
            { icon: 'Calendar', label: 'Срок действия', on: true, value: 'до 30 июня' },
          ].map((p, i) => (
            <div
              key={i}
              className={cn(
                'flex items-center gap-2 rounded-(--radius-lg) border bg-(--color-surface-page) p-2',
                p.on
                  ? 'border-(--color-action-primary)/30 bg-(--color-action-primary-soft)/30'
                  : 'border-(--color-border-default)',
              )}
            >
              <Icon
                name={p.icon}
                className={cn(
                  'h-3.5 w-3.5',
                  p.on ? 'text-(--color-text-accent)' : 'text-(--color-text-secondary)',
                )}
                strokeWidth={2}
              />
              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    'text-[10.5px] font-medium',
                    p.on ? 'text-(--color-text-accent)' : 'text-(--color-text-secondary)',
                  )}
                >
                  {p.label}
                </div>
                {p.value && (
                  <div className="text-[9.5px] text-(--color-text-secondary)">{p.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* footer note */}
        <div className="mt-3 flex items-start gap-2 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-section) p-2.5">
          <Icon name="RefreshCw" className="h-3.5 w-3.5 shrink-0 text-(--color-text-accent)" strokeWidth={2} />
          <span className="text-[10.5px] text-(--color-text-secondary)">
            Когда документ обновится, читатели по ссылке сразу увидят новую версию — пересылать
            файл заново не нужно.
          </span>
        </div>
      </div>
    </div>
  );
}
