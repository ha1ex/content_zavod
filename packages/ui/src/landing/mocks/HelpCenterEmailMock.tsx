import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';


/**
 * Письмо пользователю по шаблону компании: шапка с логотипом и темой обращения,
 * описание заявки от автора, кнопка перехода в заявку и сноска про ответ письмом.
 * Иллюстрирует вкладку «Шаблон писем».
 */
export function HelpCenterEmailMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-xl) lg:rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_0_40px_rgba(45,45,45,0.12)]',
      )}
    >
      {/* window-chrome почтового клиента */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-yellow-300" />
        <span className="h-2 w-2 rounded-full bg-green-300" />
        <div className="ml-2 flex flex-wrap items-center gap-3 text-[11px] text-(--color-text-secondary)">
          <span className="font-medium text-(--color-text-primary)">Входящие</span>
          <span>Письмо пользователю</span>
        </div>
      </div>

      <div className="bg-(--color-surface-card) p-4 md:p-5">
        {/* тело письма */}
        <div className="overflow-hidden rounded-(--radius-2xl) bg-(--color-surface-card)">
          {/* шапка письма */}
          <div className="flex items-center gap-3 bg-(--color-action-primary-soft) px-4 py-3.5">
            <span className="inline-flex h-8 shrink-0 items-center rounded-(--radius-lg) bg-(--color-surface-card) px-2.5 text-[9px] font-semibold text-(--color-text-accent)">
              ВАШ ЛОГОТИП
            </span>
            <div className="min-w-0">
              <div className="text-[10px] text-(--color-text-primary)">
                [Помощь] #69314893 Создана новая заявка
              </div>
              <div className="truncate text-[12px] font-semibold text-(--color-text-accent)">
                Как оформить заказ в магазине
              </div>
            </div>
          </div>

          <div className="bg-(--color-surface-section) p-4">
            <div className="text-[11.5px] font-semibold text-(--color-text-primary)">
              Описание заявки
            </div>

            <div className="mt-2.5 flex gap-2.5">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-action-primary-soft) text-(--color-text-accent)">
                <Icon name="User" className="h-4 w-4" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-medium text-(--color-text-primary)">
                  Ирина Смирнова
                </div>
                <div className="mt-1 text-[11px] leading-snug text-(--color-text-secondary)">
                  Не могу оформить заказ на 100 поводков желтого цвета в вашем интернет-магазине
                </div>
                <div className="mt-2 space-y-1.5 text-[11px] leading-snug text-(--color-text-secondary)">
                  <p>
                    Корзина собирается, но на шаге оплаты появляется ошибка. Пробовала
                    из разных браузеров — результат тот же.
                  </p>
                  <p>Подскажите, пожалуйста, как оформить такой заказ.</p>
                </div>
              </div>
            </div>

            <div className="mt-3.5 flex justify-center">
              <span className="rounded-(--radius-lg) bg-(--color-action-primary) px-4 py-2 text-[11px] font-semibold text-(--color-text-inverse)">
                Перейти в заявку
              </span>
            </div>
          </div>
        </div>

        {/* сноска */}
        <div className="mt-2.5 flex items-start gap-1.5 rounded-(--radius-xl) bg-(--color-surface-section) px-3.5 py-2.5 text-[11px] leading-snug text-(--color-text-secondary)">
          <Icon name="CornerUpLeft" className="mt-px h-3 w-3 shrink-0" strokeWidth={2} />
          <span>
            Вы можете ответить на это письмо — ответ добавится комментарием к{' '}
            <span className="text-(--color-text-accent) underline decoration-(--color-text-accent)/40 underline-offset-2">
              заявке
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
