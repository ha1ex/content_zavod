import { cn } from '../../primitives/cn';

/**
 * Mock доски заказов на поставку (manufacturing-домен). Показывает два
 * параллельных потока — «Заказы на поставку» (внешние заявки от клиентов)
 * и «Проект Омега» (внутренний производственный цикл) — с одинаковыми
 * стадиями. Каждая карточка содержит номер заказа, компанию-заказчика
 * и срок.
 *
 * Источник визуала — скриншот Кайтена,
 * apps/web/public/landings/kaiten-manufacturing/order-flow.png.
 * Используется в Hero visual.variant='order-flow' и MediaCopy
 * mediaVariant='order-flow'.
 */
export function OrderFlowMock() {
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
          <span className="font-medium text-(--color-text-primary)">Заказы на поставку · Проект Омега</span>
          <span>Очередь · В работе · Согласование ОТК · Документы · Оплата · Готово</span>
        </div>
      </div>
      <img
        src="/landings/kaiten-manufacturing/order-flow.png"
        alt=""
        className="block w-full"
        loading="lazy"
      />
    </div>
  );
}
