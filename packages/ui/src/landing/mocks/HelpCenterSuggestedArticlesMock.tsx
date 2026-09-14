import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

/** Кнопки мини-панели форматирования в поле «Комментарий». */
const TOOLBAR = ['Bold', 'Italic', 'Strikethrough', 'Code', 'List', 'ListOrdered', 'Quote', 'Paperclip'];

/** Подпись поля формы. */
function FieldLabel({ children }: { children: string }) {
  return <div className="mb-1 text-[10px] font-medium text-(--color-text-secondary)">{children}</div>;
}

/**
 * Форма «Новая заявка» в Справочном центре: сервис Службы поддержки, название
 * обращения, поле «Где нашли проблему», комментарий с панелью форматирования
 * и кнопки отправки. Иллюстрирует шаг «Обратиться за помощью».
 */
export function HelpCenterSuggestedArticlesMock() {
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
          <span>Создание заявки</span>
        </div>
      </div>

      <div className="bg-(--color-surface-page) p-4 md:p-5">
        <div className="text-[13px] font-semibold text-(--color-text-primary)">Новая заявка</div>

        {/* выбор сервиса */}
        <div className="mt-2.5 flex items-center gap-2 rounded-(--radius-lg) bg-(--color-surface-section) px-3 py-2">
          <Icon name="Headphones" className="h-3.5 w-3.5 text-(--color-text-secondary)" strokeWidth={2} />
          <span className="text-[11.5px] text-(--color-text-primary)">Помощь</span>
          <Icon
            name="ChevronDown"
            className="ml-auto h-3.5 w-3.5 text-(--color-text-secondary)"
            strokeWidth={2}
          />
        </div>

        {/* название — заполнено, поле в фокусе */}
        <div className="mt-3">
          <FieldLabel>Название *</FieldLabel>
          <div className="flex items-center rounded-(--radius-lg) border border-(--color-action-primary) bg-(--color-surface-card) px-3 py-2">
            <span className="text-[11.5px] text-(--color-text-primary)">Как оформить заказ в магазине</span>
            <span className="ml-0.5 inline-block h-3.5 w-px bg-(--color-action-primary)" />
          </div>
        </div>

        {/* где нашли проблему */}
        <div className="mt-3">
          <FieldLabel>Где нашли проблему</FieldLabel>
          <div className="flex items-center rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-card) px-3 py-2">
            <span className="text-[11.5px] text-(--color-text-secondary)">Добавить значение</span>
            <Icon
              name="ChevronDown"
              className="ml-auto h-3.5 w-3.5 text-(--color-text-secondary)"
              strokeWidth={2}
            />
          </div>
          <div className="mt-1 text-[9px] text-(--color-text-secondary)">
            Выберите подходящий вариант
          </div>
        </div>

        {/* сторонний получатель уведомлений */}
        <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-(--color-text-secondary)">
          <Icon name="Plus" className="h-3 w-3" strokeWidth={2} />
          <span>Добавить стороннего получателя уведомлений</span>
          <Icon name="CircleHelp" className="h-3 w-3" strokeWidth={2} />
        </div>

        {/* комментарий с панелью форматирования */}
        <div className="mt-3">
          <FieldLabel>Комментарий</FieldLabel>
          <div className="overflow-hidden rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-card)">
            <div className="flex items-center gap-2.5 border-b border-(--color-border-default) px-2.5 py-1.5">
              {TOOLBAR.map((name) => (
                <Icon
                  key={name}
                  name={name}
                  className="h-3 w-3 text-(--color-text-secondary)"
                  strokeWidth={2}
                />
              ))}
            </div>
            <div className="px-3 pb-6 pt-2.5 text-[10.5px] text-(--color-text-secondary)">
              Напишите комментарий или перетащите сюда файл
            </div>
            <div className="px-3 pb-2 text-right text-[9px] text-(--color-text-secondary)">0 / 4096</div>
          </div>
        </div>

        {/* кнопки формы: отправка неактивна, пока форма не заполнена */}
        <div className="mt-3 flex items-center justify-end gap-2.5">
          <span className="rounded-(--radius-lg) border border-(--color-action-primary) px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-(--color-text-accent)">
            Отмена
          </span>
          <span className="rounded-(--radius-lg) bg-(--color-neutral-200) px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
            Отправить
          </span>
        </div>
      </div>
    </div>
  );
}
