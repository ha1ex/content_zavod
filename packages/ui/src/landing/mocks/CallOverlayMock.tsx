import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

const SCRIPT_STEPS = [
  { label: 'Поприветствовать клиента', done: true },
  { label: 'Уточнить тип обращения', done: true },
  { label: 'Зафиксировать сумму сделки', done: false, active: true },
  { label: 'Назначить демо', done: false },
];

/**
 * Mock интерфейса звонка CRM: на фоне — карточка клиента, поверх — overlay
 * звонка с таймером, кнопками управления и скриптом разговора. Тон: «звонок
 * открывает карточку, скрипт ведёт менеджера, запись сохраняется».
 */
export function CallOverlayMock() {
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
          <span className="font-medium text-(--color-text-primary)">CRM · Карточка клиента</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-(--color-green-12) px-1.5 py-0.5 text-[10px] font-medium text-green-700">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-(--color-green-100)" />
            Идёт звонок
          </span>
        </div>
      </div>

      <div className="relative p-4 md:p-5">
        {/* background — faux client card */}
        <div className="space-y-2 opacity-50">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-(--color-action-primary-soft) text-[11px] font-semibold text-(--color-text-accent)">
              АС
            </span>
            <div>
              <div className="text-[11.5px] font-semibold text-(--color-text-primary)">
                Анна Соколова
              </div>
              <div className="text-[10px] text-(--color-text-secondary)">
                ООО «Северный ветер»
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="h-2 rounded-full bg-(--color-neutral-200)" />
            <div className="h-2 rounded-full bg-(--color-neutral-200)" />
            <div className="h-2 rounded-full bg-(--color-neutral-200)" />
          </div>
        </div>

        {/* overlay — call panel */}
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr]">
          {/* left: call controls */}
          <div className="rounded-(--radius-2xl) border border-(--color-action-primary)/40 bg-(--color-surface-page) p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-action-primary) text-white">
                  <Icon name="Phone" className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <div>
                  <div className="text-[12px] font-semibold text-(--color-text-primary)">
                    +7 495 ••• 14 02
                  </div>
                  <div className="text-[10px] text-(--color-text-secondary)">
                    Входящий · повторный клиент
                  </div>
                </div>
              </div>
              <div className="font-mono text-[12px] font-semibold tabular-nums text-(--color-text-accent)">
                12:48
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                className="inline-flex h-8 items-center gap-1 rounded-full bg-(--color-neutral-200) px-2.5 text-[11px] font-medium text-(--color-text-primary)"
              >
                <Icon name="Mic" className="h-3.5 w-3.5" strokeWidth={2} />
                Mute
              </button>
              <button
                type="button"
                className="inline-flex h-8 items-center gap-1 rounded-full bg-(--color-neutral-200) px-2.5 text-[11px] font-medium text-(--color-text-primary)"
              >
                <Icon name="Pause" className="h-3.5 w-3.5" strokeWidth={2} />
                Hold
              </button>
              <button
                type="button"
                className="inline-flex h-8 items-center gap-1 rounded-full bg-(--color-neutral-200) px-2.5 text-[11px] font-medium text-(--color-text-primary)"
              >
                <Icon name="UserPlus" className="h-3.5 w-3.5" strokeWidth={2} />
                Перевод
              </button>
              <button
                type="button"
                className="inline-flex h-8 items-center gap-1 rounded-full bg-red-500 px-3 text-[11px] font-medium text-white"
              >
                <Icon name="PhoneOff" className="h-3.5 w-3.5" strokeWidth={2.5} />
                Завершить
              </button>
            </div>

            <div className="mt-3 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-section) p-2">
              <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">
                Запись разговора
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <Icon name="Circle" className="h-2.5 w-2.5 fill-red-500 text-red-500" />
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-(--color-neutral-200)">
                  <div className="h-full w-2/3 rounded-full bg-(--color-action-primary)" />
                </div>
                <span className="font-mono text-[10px] text-(--color-text-secondary)">12:48</span>
              </div>
            </div>
          </div>

          {/* right: script */}
          <div className="rounded-(--radius-2xl) border border-(--color-border-default) bg-(--color-surface-page) p-4">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">
                Скрипт продаж
              </div>
              <span className="inline-flex h-4 items-center rounded-full bg-(--color-action-primary-soft) px-1.5 text-[9px] font-medium text-(--color-text-accent)">
                2 из 4
              </span>
            </div>
            <div className="mt-2.5 space-y-1.5">
              {SCRIPT_STEPS.map((s, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex items-center gap-2 rounded-(--radius-lg) px-2 py-1.5',
                    s.active && 'bg-(--color-action-primary-soft)/50',
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-md border text-[10px]',
                      s.done
                        ? 'border-(--color-action-primary) bg-(--color-action-primary) text-white'
                        : s.active
                          ? 'border-(--color-action-primary) bg-white text-(--color-action-primary)'
                          : 'border-(--color-border-default) bg-white',
                    )}
                  >
                    {s.done && '✓'}
                  </span>
                  <span
                    className={cn(
                      'text-[11px] leading-tight',
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
            <div className="mt-3 border-t border-(--color-border-default) pt-2">
              <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">
                Заметка после разговора
              </div>
              <div className="mt-1 rounded-(--radius-lg) border border-dashed border-(--color-border-default) bg-(--color-surface-section) p-2 text-[10px] text-(--color-text-secondary)">
                Сумма обсуждается, отправить КП на 1,8 млн ₽…
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
