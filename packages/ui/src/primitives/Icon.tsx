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
export function Icon({ name, className, strokeWidth = 1.75 }: IconProps) {
  const map = icons as Record<string, LucideIcon | undefined>;
  const LucideComponent = map[toPascalCase(name)] ?? map[name] ?? Sparkles;
  return <LucideComponent className={className} strokeWidth={strokeWidth} aria-hidden />;
}
