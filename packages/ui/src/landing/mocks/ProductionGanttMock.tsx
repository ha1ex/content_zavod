import { cn } from '../../primitives/cn';

/**
 * Mock диаграммы Ганта для производственных проектов (manufacturing-домен).
 * Фазы: Инициация → Планирование → Реализация, в карточках — Экономическое
 * обоснование, План работ, Анализ идей, Дорожная карта, Подзадачи Альфа /
 * Бета / Гамма. Цветные полосы показывают занятость участков по неделям,
 * пересечения этапов видны на одной шкале.
 *
 * Источник визуала — скриншот Кайтена,
 * apps/web/public/landings/kaiten-manufacturing/gantt.png.
 * Используется в MediaCopy mediaVariant='production-gantt' и Hero
 * visual.variant='production-gantt'.
 */
export function ProductionGanttMock() {
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
          <span className="font-medium text-(--color-text-primary)">Диаграмма Ганта · Загрузка участков</span>
          <span>Инициация · Планирование · Реализация · Ресурсное планирование</span>
        </div>
      </div>
      <img
        src="/landings/kaiten-manufacturing/gantt.png"
        alt=""
        className="block w-full"
        loading="lazy"
      />
    </div>
  );
}
