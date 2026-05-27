import { cn } from '../../primitives/cn';

/**
 * Mock канбан-доски производственного потока (manufacturing-домен).
 * Колонки: Очередь → В работе → Согласование ОТК → Правки ОТК, переработка →
 * Готово. Карточки — производственные заказы (Каркас 6.7 для ООО Атом,
 * Пластины. Проходной заказ) с участками, номерами и компаниями.
 *
 * Источник визуала — реальный скриншот Кайтена для производств, см.
 * apps/web/public/landings/kaiten-manufacturing/production-board.png.
 * Используется в Hero visual.variant='production-board' и MediaCopy
 * mediaVariant='production-board'.
 */
export function ProductionBoardMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.30)]',
      )}
    >
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-yellow-300" />
        <span className="h-2 w-2 rounded-full bg-green-300" />
        <div className="ml-2 flex flex-wrap items-center gap-3 text-[11px] text-(--color-text-secondary)">
          <span className="font-medium text-(--color-text-primary)">Проект Альфа · Производственный поток</span>
          <span>Заказ → Закупка → Производство → ОТК → Отгрузка</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">
            Доска · Канбан · Ганта
          </span>
        </div>
      </div>
      <img
        src="/landings/kaiten-manufacturing/production-board.png"
        alt=""
        className="block w-full"
        loading="lazy"
      />
    </div>
  );
}
