import type { ReactNode } from 'react';
import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

/**
 * IconBox — плашка с иконкой для landing-блоков, карточек и списков преимуществ.
 * Выделяет смысловую категорию, но не является кнопкой (без hover/focus-состояний).
 *
 * Источник: Figma Landing-DS → Icon Box (node 2387:14289) и
 * wiki/design-system/components/icon-box.md.
 *
 * Варианты:
 *  - size 64 — плашка 64×64, radius 12, иконка 32;
 *  - size 56 — плашка 56×56, radius 12, иконка 28;
 *  - size 48 — плашка 48×48, radius 10.286, иконка 24;
 *  - size 36 — плашка 36×36, radius 7.714, иконка 24;
 *  - size 24 — только иконка 24×24 без плашки и тени (inline-вариант).
 *  - color light — фон brand-12 #EFE9F9, иконка brand-100 #7D4CCF (по умолчанию);
 *  - color accent — фон brand-100 #7D4CCF, иконка белая; для активного/выделенного
 *    элемента внутри группы.
 *
 * Правила: 64/56 — крупные карточки у hero; 48 — обычные фиче-сетки; 36 — плотные
 * списки; 24 — только как inline-иконка. Один размер в пределах одной сетки.
 */

export type IconBoxSize = 64 | 56 | 48 | 36 | 24;
export type IconBoxColor = 'light' | 'accent';

export interface IconBoxProps {
  /** Имя lucide-иконки для примитива Icon (например, "Clock", "PanelLeft"). */
  icon?: string;
  size?: IconBoxSize;
  color?: IconBoxColor;
  /** Кастомная иконка вместо lucide (SVG 1:1 в квадрате). */
  children?: ReactNode;
  className?: string;
}

/* Визуальная толщина штриха из Figma: 2.03175 на иконке 24px,
   масштабируется вместе с иконкой (32 → 2.709, 28 → 2.37). */
const STROKE = 2.03175;

const SIZES: Record<IconBoxSize, { box: string; icon: string; plaque: boolean }> = {
  64: { box: 'size-[64px] rounded-[12px]', icon: 'size-[32px]', plaque: true },
  56: { box: 'size-[56px] rounded-[12px]', icon: 'size-[28px]', plaque: true },
  48: { box: 'size-[48px] rounded-[10.286px]', icon: 'size-[24px]', plaque: true },
  36: { box: 'size-[36px] rounded-[7.714px]', icon: 'size-[24px]', plaque: true },
  24: { box: 'size-[24px]', icon: 'size-[24px]', plaque: false },
};

const COLORS: Record<IconBoxColor, { plaque: string; text: string }> = {
  light: {
    plaque: 'bg-[#efe9f9] shadow-[inset_0_0_3px_0_rgba(0,0,0,0.15)]',
    text: 'text-[#7d4ccf]',
  },
  accent: {
    plaque: 'bg-[#7d4ccf] shadow-[inset_0_0_4px_0_rgba(0,0,0,0.35)]',
    text: 'text-white',
  },
};

export function IconBox({ icon = 'PanelLeft', size = 64, color = 'light', children, className }: IconBoxProps) {
  const s = SIZES[size];
  const c = COLORS[color];
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center',
        s.box,
        s.plaque && c.plaque,
        c.text,
        className,
      )}
    >
      <span className={cn('flex items-center justify-center', s.icon)}>
        {children ?? <Icon name={icon} className="size-full" strokeWidth={STROKE} />}
      </span>
    </span>
  );
}

export default IconBox;
