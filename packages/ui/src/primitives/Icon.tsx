import { type LucideIcon, Sparkles, icons } from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

/** kebab-case → PascalCase ("square-kanban" → "SquareKanban", "building-2" → "Building2"). */
function toPascalCase(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Renders a lucide-react icon by name from spec.
 * Spec/component icon names are kebab-case ("square-kanban", "life-buoy"), but
 * lucide's `icons` map is keyed by PascalCase ("SquareKanban", "LifeBuoy"), so we
 * normalize before lookup. Also accepts an already-PascalCase name. Falls back to
 * Sparkles if the name is unknown so we never crash a generated landing on a typo.
 */
/** Иконки Coolicons из Landing DS, которых нет в lucide. Ключ — имя в спеке. */
const CUSTOM: Record<string, (p: { className?: string; strokeWidth: number }) => React.ReactElement> = {
  // Edit / Select_Multiple (Figma 11372:84912): стопка карточек с галочкой
  'select-multiple': ({ className, strokeWidth }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 9v10.4c0 .56 0 .84.11 1.05.1.19.25.34.44.44.21.11.49.11 1.05.11H15M17 8l-4 4-2-2M7 13.8V6.2c0-1.12 0-1.68.22-2.1.19-.38.5-.69.87-.88C8.52 3 9.08 3 10.2 3h7.6c1.12 0 1.68 0 2.1.22.38.19.69.5.88.87.22.43.22.99.22 2.1v7.6c0 1.12 0 1.68-.22 2.11-.19.37-.5.68-.87.87-.43.22-.99.22-2.1.22h-7.61c-1.12 0-1.68 0-2.1-.22a2 2 0 01-.88-.87C7 15.48 7 14.92 7 13.8z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export function Icon({ name, className, strokeWidth = 1.75 }: IconProps) {
  const Custom = CUSTOM[name];
  if (Custom) return <Custom className={className} strokeWidth={strokeWidth} />;
  const map = icons as Record<string, LucideIcon | undefined>;
  const LucideComponent = map[toPascalCase(name)] ?? map[name] ?? Sparkles;
  return <LucideComponent className={className} strokeWidth={strokeWidth} aria-hidden />;
}
