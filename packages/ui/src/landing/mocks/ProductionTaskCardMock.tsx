import { cn } from '../../primitives/cn';

/**
 * Mock карточки производственной задачи (manufacturing-домен). Показывает
 * карточку «Корпус насосной станции, партия 12 шт» для Проекта Альфа,
 * Цех №3, номер заказа A-2847, с чек-листом 3 из 6 пунктов (Спецификация,
 * Фото материалов), исполнителями и сроком.
 *
 * Источник визуала — скриншот Кайтена,
 * apps/web/public/landings/kaiten-manufacturing/task-card.png.
 * Используется в MediaCopy mediaVariant='production-task-card'.
 */
export function ProductionTaskCardMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative mx-auto w-full max-w-[440px] overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'p-6',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.30)]',
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-300" />
          <span className="h-2 w-2 rounded-full bg-yellow-300" />
          <span className="h-2 w-2 rounded-full bg-green-300" />
        </div>
        <span className="text-[11px] font-medium text-(--color-text-primary)">
          Карточка задачи · Цех №3
        </span>
      </div>
      <img
        src="/landings/kaiten-manufacturing/task-card.png"
        alt=""
        className="block w-full rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-page)"
        loading="lazy"
      />
    </div>
  );
}
