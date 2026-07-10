import type { ReactNode } from 'react';
import { ButtonLink } from '../../primitives/ButtonLink';
import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';
import { RetailCardMock } from './RetailCardMock';

/**
 * WindowCardicons — блок «текст с иконочным чек-листом + окно-карточка».
 * Слева: заголовок, описание, чек-лист (иконка lucide + строка) и первичная
 * кнопка. Справа: макет карточки задачи (`RetailCardMock`, «анатомия карточки»).
 *
 * Раскладка: 1 колонка на мобилке, 2 колонки с 768 (текст слева, окно справа),
 * верхнее выравнивание колонок. Заголовок 24/36 на мобилке → 36 на десктопе,
 * пункты чек-листа 14→16. Всё меняется через пропсы; по умолчанию — сценарий
 * ритейла («Все по задаче — в одной карточке»).
 */

export interface WindowCardiconsItem {
  /** Имя иконки lucide (напр. 'Paperclip', 'ListChecks', 'Tag'). */
  icon?: string;
  text: string;
}

export interface WindowCardiconsCta {
  label: string;
  href: string;
}

export interface WindowCardiconsProps {
  title?: string;
  description?: string;
  checklist?: WindowCardiconsItem[];
  cta?: WindowCardiconsCta;
  /** Окно справа (по умолчанию — карточка задачи RetailCardMock). */
  visual?: ReactNode;
  /** Положение окна: 'right' (по умолчанию) или 'left'. */
  mediaPosition?: 'left' | 'right';
}

const DEFAULT_CHECKLIST: WindowCardiconsItem[] = [
  { icon: 'Paperclip', text: 'Файлы и документы' },
  { icon: 'MessageSquare', text: 'Обсуждение по задаче' },
  { icon: 'ListChecks', text: 'Чек-лист проверки: акт подписан, фото с объекта, подтверждение заказчика' },
  { icon: 'Tag', text: 'Метки: направление, магазин, приоритет' },
  { icon: 'SlidersHorizontal', text: 'Настраиваемые поля: бюджет, категория закупки, тип точки' },
  { icon: 'GitBranch', text: 'Связанные задачи и подзадачи' },
  { icon: 'Ban', text: 'Причины остановки задачи (блокировки)' },
  { icon: 'Clock', text: 'Фактическое время работы' },
];

export function WindowCardicons({
  title = 'Все по задаче — в одной карточке',
  description = 'В Кайтене все, что связано с задачей, лежит в одной карточке. Не нужно искать в переписках, таблицах и на созвонах',
  checklist = DEFAULT_CHECKLIST,
  cta = { label: 'Поставить задачу в Кайтен', href: '/signup' },
  visual,
  mediaPosition = 'right',
}: WindowCardiconsProps) {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 py-12 md:px-6 lg:py-16',
        'tracking-[-0.2px]',
      )}
      aria-label="Все по задаче"
    >
      <div
        className={cn(
          'grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 md:items-start lg:gap-16',
          mediaPosition === 'left' && 'md:[&>div:first-child]:order-2',
        )}
      >
        <div>
          <h2 className="text-2xl font-semibold leading-tight md:text-4xl">{title}</h2>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-(--color-text-primary)">{description}</p>
          )}

          {checklist && checklist.length > 0 && (
            <ul className="mt-6 space-y-4">
              {checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center text-(--color-text-accent)">
                    <Icon name={item.icon ?? 'Check'} className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="text-sm leading-relaxed text-(--color-text-primary) md:text-base">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {cta && (
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
              <ButtonLink size="lg" href={cta.href}>
                {cta.label}
              </ButtonLink>
            </div>
          )}
        </div>

        <div>{visual ?? <RetailCardMock />}</div>
      </div>
    </section>
  );
}

export default WindowCardicons;
