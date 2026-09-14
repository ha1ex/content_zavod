import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface LogoSlot {
  title: string;
  usage: string;
  specs: string;
  wide?: boolean;
}

const LOGO_SLOTS: LogoSlot[] = [
  {
    title: 'Горизонтальный логотип',
    usage: 'Используется в шапке портала',
    specs: 'PNG · 480×192px · до 2 МБ',
    wide: true,
  },
  {
    title: 'Квадратный логотип',
    usage: 'Используется в письмах и для фавиконки',
    specs: 'PNG · 256×256px · до 2 МБ',
  },
];

/**
 * Окно «Брендирование» Справочного центра: загрузка горизонтального и квадратного
 * логотипа компании, выбор основного цвета портала и переключатель названия в шапке.
 * Иллюстрирует вкладку «Фирменный стиль».
 */
export function HelpCenterBrandingMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-xl) lg:rounded-(--radius-3xl)',
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
          <span className="font-medium text-(--color-text-primary)">Настройки Справочного центра</span>
          <span>Брендирование</span>
        </div>
      </div>

      <div className="bg-(--color-surface-page) p-4 md:p-5">
        <div className="flex items-center justify-between">
          <div className="text-[15px] font-semibold text-(--color-text-primary)">Брендирование</div>
          <span className="text-[10px] font-medium text-(--color-text-accent)">Сбросить настройки</span>
        </div>

        {/* слоты логотипов */}
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {LOGO_SLOTS.map((slot) => (
            <div
              key={slot.title}
              className="rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-card) p-3"
            >
              <div
                className={cn(
                  'flex items-center justify-center rounded-(--radius-lg) border border-dashed border-(--color-border-default) bg-(--color-surface-section) py-3',
                  slot.wide ? 'px-4' : 'px-3',
                )}
              >
                <span
                  className={cn(
                    'inline-flex items-center justify-center rounded-(--radius-lg) bg-(--color-action-primary-soft) text-[10px] font-semibold text-(--color-text-accent)',
                    slot.wide ? 'h-7 px-3' : 'h-7 w-7',
                  )}
                >
                  {slot.wide ? 'ВАШ ЛОГОТИП' : 'ВЛ'}
                </span>
              </div>
              <div className="mt-2 text-[11.5px] font-semibold leading-tight text-(--color-text-primary)">
                {slot.title}
              </div>
              <div className="mt-0.5 text-[10px] text-(--color-text-secondary)">{slot.usage}</div>
              <div className="mt-1 text-[9px] text-(--color-text-secondary)">{slot.specs}</div>
            </div>
          ))}
        </div>

        {/* основной цвет */}
        <div className="mt-2.5 flex items-center gap-3 rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-card) p-3">
          <span className="h-9 w-9 shrink-0 rounded-(--radius-lg) bg-(--color-action-primary)" />
          <div className="min-w-0">
            <div className="text-[11.5px] font-semibold text-(--color-text-primary)">Основной цвет</div>
            <div className="text-[10px] text-(--color-text-secondary)">
              Используется в интерфейсе портала и в письмах
            </div>
          </div>
          <Icon
            name="Pipette"
            className="ml-auto h-3.5 w-3.5 shrink-0 text-(--color-text-secondary)"
            strokeWidth={2}
          />
        </div>

        {/* название портала */}
        <div className="mt-2.5 flex items-center gap-3 rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-card) p-3">
          <span className="relative inline-flex h-4 w-7 shrink-0 rounded-full bg-(--color-action-primary)">
            <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-(--color-surface-card)" />
          </span>
          <div className="min-w-0">
            <div className="text-[11.5px] font-semibold text-(--color-text-primary)">
              Название портала
            </div>
            <div className="text-[10px] text-(--color-text-secondary)">
              Отображается в шапке портала возле логотипа
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
