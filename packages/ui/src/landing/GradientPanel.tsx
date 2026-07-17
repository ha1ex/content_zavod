import type { ReactNode } from 'react';
import { cn } from '../primitives/cn';

export interface GradientPanelProps {
  /** Паддинги и прочая геометрия — на усмотрение блока-потребителя. */
  className?: string;
  children: ReactNode;
}

/**
 * Подложка градиентного блока — порт `.fcta` + `.fcta__blur` из эталонного
 * `CTAsecondaryMock` (им же рендерится `FinalCta` с `variant='gradient'`):
 * светло-лиловая заливка и размытое пятно розовый→голубой за правой колонкой.
 *
 * Вынесено отдельно, потому что подложку используют несколько блоков
 * (`RegistrationCta`, `SpeakerCard`) — размеры и позиция засвета взяты из мока
 * и должны меняться в одном месте, а не расходиться копиями.
 *
 * Текст внутри — тёмный: на `--violet-12` выворотка нечитаема.
 */
export function GradientPanel({ className, children }: GradientPanelProps) {
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden',
        'rounded-(--radius-xl) lg:rounded-(--radius-3xl)',
        'bg-(--color-action-primary-soft) text-(--color-text-primary)',
        className,
      )}
    >
      {/* Цвета градиента мок-специфичные — в токенах их нет. */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -top-[120px] left-[55%] -z-10 h-[744px] w-[786px]',
          'rounded-full opacity-50 blur-[200px]',
          'bg-[linear-gradient(-90deg,#e298ff,#6fe5ff)]',
        )}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
