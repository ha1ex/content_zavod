import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';

/** Пункт полосы: строка (плоский режим) или {icon?, text} (для chips). */
export type BenefitsStripItem = string | { icon?: string; text: string };

export interface BenefitsStripProps {
  items: BenefitsStripItem[];
  /**
   * 'plain' (дефолт) — короткие пункты через точки-разделители (как было).
   * 'chips' — пилюли-бейджи по DS (badge/icon-box): нейтральный фон, рамка,
   * маленькая акцентная иконка слева. Иконки берутся из items[].icon.
   */
  variant?: 'plain' | 'chips';
}

function normalize(item: BenefitsStripItem): { icon?: string; text: string } {
  return typeof item === 'string' ? { text: item } : item;
}

/**
 * Узкая полоса под hero с короткими маркетинговыми пунктами.
 * Из референса: «Российский сервис · Настройка за 30 минут · Шаблонные ответы · Аналитика и SLA».
 */
export function BenefitsStrip({ items, variant = 'plain' }: BenefitsStripProps) {
  const list = items.map(normalize);
  const chips = variant === 'chips';

  return (
    <section className="border-y border-(--color-border-default) bg-(--color-surface-section)/50">
      <div
        className={cn(
          'mx-auto w-full max-w-(--container-kaiten)',
          'flex flex-wrap items-center justify-center',
          chips ? 'gap-2.5 py-5' : 'gap-x-8 gap-y-2 py-4',
          'px-4 md:px-6 xl:px-0',
        )}
      >
        {list.map((item, i) =>
          chips ? (
            <span
              key={i}
              data-comp={`benefits_strip.items[${i}]`}
              className={cn(
                'inline-flex items-center gap-2 rounded-full',
                'border border-(--color-border-default) bg-(--color-surface-page)',
                'px-3.5 py-1.5 text-sm font-medium text-(--color-text-primary)',
                'shadow-[0_1px_2px_rgba(45,45,45,0.04)]',
              )}
            >
              {item.icon && (
                <Icon
                  name={item.icon}
                  className="h-4 w-4 shrink-0 text-(--color-text-accent)"
                  strokeWidth={2}
                />
              )}
              {item.text}
            </span>
          ) : (
            <span
              key={i}
              data-comp={`benefits_strip.items[${i}]`}
              className="flex items-center gap-3 text-sm font-medium text-(--color-text-primary)"
            >
              {item.text}
              {i < list.length - 1 && (
                <span className="h-1 w-1 rounded-full bg-(--color-neutral-400)" aria-hidden />
              )}
            </span>
          ),
        )}
      </div>
    </section>
  );
}
