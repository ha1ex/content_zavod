import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface Field {
  label: string;
  value: string;
  hint?: string;
  filled?: boolean;
  active?: boolean;
}

const FIELDS: Field[] = [
  { label: 'Название', value: 'Не могу оплатить тариф', filled: true, active: true },
  {
    label: 'Где нашли проблему',
    value: 'Настройки профиля',
    hint: 'Выберите подходящий вариант',
    filled: true,
  },
];

/**
 * Форма «Новая заявка» в Справочном центре: выбор сервиса Службы поддержки,
 * подсказка сервиса, заполненные поля обращения и кнопка отправки. Иллюстрирует
 * блок «Обращения в поддержку» — заявка отправляется прямо из портала.
 */
export function HelpCenterRequestFormMock() {
  return (
    <div
      aria-hidden
      className={cn(
        // Ширина зафиксирована: снаружи мок оборачивается в `w-max`
        // и без неё разъезжается по max-content на всю колонку.
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
          <span>Новая заявка</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">
            Мои заявки
          </span>
        </div>
      </div>

      <div className="bg-(--color-surface-page) p-4 md:p-5">
        {/* плашка в конце статьи — точка входа в форму */}
        <div className="flex items-center gap-3 rounded-(--radius-xl) bg-(--color-action-primary-soft) px-3.5 py-3">
          <div className="min-w-0">
            <div className="text-[11.5px] font-semibold text-(--color-text-primary)">
              Не нашли ответ на свой вопрос?
            </div>
            <div className="text-[10px] text-(--color-text-secondary)">
              Создайте заявку — поможем разобраться
            </div>
          </div>
          <span className="ml-auto shrink-0 rounded-(--radius-lg) bg-(--color-action-primary) px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-(--color-text-inverse)">
            Создать заявку
          </span>
        </div>

        <div className="mt-4 text-[15px] font-semibold text-(--color-text-primary)">Новая заявка</div>

        {/* выбор сервиса */}
        <div className="mt-3">
          <div className="mb-1 text-[10px] font-medium text-(--color-text-secondary)">Сервис</div>
          <div className="flex items-center gap-2 rounded-(--radius-lg) bg-(--color-surface-section) px-3 py-2">
            <Icon name="Headphones" className="h-3.5 w-3.5 text-(--color-text-accent)" strokeWidth={2} />
            <span className="text-[11.5px] font-medium text-(--color-text-primary)">Помощь</span>
            <Icon
              name="ChevronDown"
              className="ml-auto h-3.5 w-3.5 text-(--color-text-secondary)"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* подсказка сервиса */}
        <div className="mt-2.5 rounded-(--radius-lg) bg-(--color-surface-section) px-3 py-2.5 text-[11px] leading-snug text-(--color-text-secondary)">
          Расскажите подробно о своей проблеме, приложите скриншоты, если есть — мы поможем
          разобраться и ответим в течение 1 рабочего дня
        </div>

        {/* поля формы */}
        <div className="mt-3 space-y-2.5">
          {FIELDS.map((f) => (
            <div key={f.label}>
              <div className="mb-1 text-[10px] font-medium text-(--color-text-secondary)">
                {f.label}
              </div>
              <div
                className={cn(
                  'rounded-(--radius-lg) px-3 py-2 text-[11.5px]',
                  f.active
                    ? 'border border-(--color-action-primary) bg-(--color-surface-card) text-(--color-text-primary)'
                    : f.filled
                      ? 'bg-(--color-surface-section) text-(--color-text-primary)'
                      : 'bg-(--color-surface-section) text-(--color-text-secondary) opacity-60',
                )}
              >
                {f.value}
              </div>
              {f.hint && (
                <div className="mt-1 text-[9px] text-(--color-text-secondary)">{f.hint}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2.5">
          <span className="rounded-(--radius-lg) bg-(--color-action-primary) px-3.5 py-2 text-[11px] font-semibold text-(--color-text-inverse)">
            Отправить заявку
          </span>
        </div>
      </div>
    </div>
  );
}
