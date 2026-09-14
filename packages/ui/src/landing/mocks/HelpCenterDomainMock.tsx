import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

const ARTICLE_BARS = ['w-full', 'w-5/6', 'w-4/6'];

const RELATED: Array<{ title: string }> = [
  { title: 'Как отменить заказ' },
  { title: 'Сроки и способы доставки' },
  { title: 'Возврат и обмен товара' },
];

/**
 * Справочный центр на домене компании: окно браузера с адресом help.company.ru
 * и открытой статьей «Как оформить заказ» — шапка с логотипом компании, текст
 * статьи и похожие материалы. Иллюстрирует вкладку «Собственный домен».
 */
export function HelpCenterDomainMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-xl) lg:rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_0_40px_rgba(45,45,45,0.12)]',
      )}
    >
      {/*
        browser-chrome: адресная строка вынесена под кнопки окна отдельной
        строкой во всю ширину — как в настоящем браузере.
      */}
      <div className="space-y-2 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-300" />
          <span className="h-2 w-2 rounded-full bg-yellow-300" />
          <span className="h-2 w-2 rounded-full bg-green-300" />
        </div>
        <div className="flex min-w-0 items-center gap-1.5 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-page) px-2.5 py-1">
          <Icon name="Lock" className="h-2.5 w-2.5 shrink-0 text-(--color-text-secondary)" strokeWidth={2} />
          <span className="truncate text-[10px] text-(--color-text-primary)">
            help.company.ru<span className="text-(--color-text-secondary)">/kak-oformit-zakaz</span>
          </span>
        </div>
      </div>

      {/* шапка портала компании */}
      <div className="flex items-center gap-3 border-b border-(--color-border-default) bg-(--color-surface-page) px-4 py-2.5">
        <span className="inline-flex h-6 items-center rounded-(--radius-lg) bg-(--color-action-primary-soft) px-2.5 text-[9px] font-semibold text-(--color-text-accent)">
          ВАШ ЛОГОТИП
        </span>
        <span className="text-[10px] font-medium text-(--color-text-primary)">Справочный центр</span>
        <div className="ml-auto flex w-52 shrink items-center gap-1.5 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-section) px-2 py-1">
          <Icon name="Search" className="h-2.5 w-2.5 text-(--color-text-secondary)" strokeWidth={2} />
          <span className="text-[9px] text-(--color-text-secondary)">Поиск</span>
        </div>
      </div>

      {/* статья */}
      <div className="bg-(--color-surface-page) p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-1 text-[10px] text-(--color-text-secondary)">
          <span>Инструкции</span>
          <Icon name="ChevronRight" className="h-2.5 w-2.5" strokeWidth={2} />
          <span className="font-medium text-(--color-text-primary)">Как оформить заказ</span>
        </div>

        <div className="mt-2.5 text-[15px] font-semibold text-(--color-text-primary)">
          Как оформить заказ
        </div>
        <div className="mt-1 text-[11.5px] text-(--color-text-secondary)">
          Пошаговая инструкция для покупателей: как собрать корзину, выбрать доставку и оплатить
          заказ
        </div>

        <div className="mt-3 space-y-1.5">
          {ARTICLE_BARS.map((w) => (
            <div key={w} className={cn('h-2 rounded-full bg-(--color-neutral-200)', w)} />
          ))}
        </div>

        <div className="mt-3.5 rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-card) p-3">
          <div className="mb-2 text-[10px] font-semibold text-(--color-text-primary)">
            Похожие материалы
          </div>
          <div className="space-y-1.5">
            {RELATED.map((r) => (
              <div
                key={r.title}
                className="flex items-center gap-2"
              >
                <span className="w-3 shrink-0 text-[10px] leading-none">📝</span>
                <span className="truncate text-[11px] text-(--color-text-primary)">{r.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
