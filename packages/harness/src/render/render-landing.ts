import type { LandingSpec, Section } from '../schemas/landing-spec';
import { IDENTIFIER_KEYS, ruNbsp } from './ru-typography';

/**
 * Детерминированный TSX-string renderer для handoff (этап 6 ZIP).
 *
 * На этапе 1 это простой mapper component-name → JSX-литерал. Никакого LLM на
 * этом шаге — модель только генерит spec, а сборка TSX из spec'а — чистая
 * функция, чтобы результат был воспроизводим и проверяем.
 */

const INDENT = '  ';

function jsxString(value: string): string {
  // Правило DS `ru-nbsp-typography` зашито в рендер (см. ./ru-typography).
  return `"${ruNbsp(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function literal(value: unknown, key?: string): string {
  if (value === null) return 'null';
  if (typeof value === 'string')
    return key && IDENTIFIER_KEYS.has(key) ? JSON.stringify(value) : jsxString(value);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) {
    return `[${value.map((v) => literal(v, key)).join(', ')}]`;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${JSON.stringify(k)}: ${literal(v, k)}`);
    return `{ ${entries.join(', ')} }`;
  }
  return 'undefined';
}

/** Экранирование текстового узла JSX (между тегами). */
function jsxText(value: string): string {
  return ruNbsp(value)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');
}

type AccordionFeatureProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    icon?: string;
    mockVariant: string;
  }>;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  mediaPosition?: 'left' | 'right';
};

/**
 * AccordionFeatureSection теперь принимает ReactNode-пропсы (heading / items[].body /
 * items[].media / cta), а spec остаётся JSON (mockVariant-строки). Поэтому этой
 * секции нужен собственный сериализатор, конвертирующий mockVariant → <MockVisual/>.
 */
function renderAccordionFeature(props: AccordionFeatureProps): string {
  const items = props.items
    .map(
      (it) =>
        `${INDENT}${INDENT}{ title: ${jsxString(it.title)}, body: ${jsxString(
          it.description,
        )}, media: <MockVisual variant=${jsxString(it.mockVariant)} /> },`,
    )
    .join('\n');

  const lines: string[] = ['<AccordionFeatureSection'];
  lines.push(`${INDENT}heading=${jsxString(props.title)}`);
  if (props.description) lines.push(`${INDENT}description=${jsxString(props.description)}`);
  lines.push(`${INDENT}defaultOpen={0}`);
  lines.push(`${INDENT}items={[`);
  lines.push(items);
  lines.push(`${INDENT}]}`);

  if (props.primaryCta || props.secondaryCta) {
    lines.push(`${INDENT}cta={`);
    lines.push(`${INDENT}${INDENT}<>`);
    if (props.primaryCta) {
      lines.push(
        `${INDENT}${INDENT}${INDENT}<a className="btn btn--fill" href=${jsxString(
          props.primaryCta.href,
        )}>${jsxText(props.primaryCta.label)}</a>`,
      );
    }
    if (props.secondaryCta) {
      lines.push(
        `${INDENT}${INDENT}${INDENT}<a className="btn btn--outline" href=${jsxString(
          props.secondaryCta.href,
        )}>${jsxText(props.secondaryCta.label)}</a>`,
      );
    }
    lines.push(`${INDENT}${INDENT}</>`);
    lines.push(`${INDENT}}`);
  }

  lines.push('/>');
  return lines.join('\n');
}

function renderSection(section: Section, theme: 'light' | 'dark' = 'light'): string {
  if (section.component === 'AccordionFeatureSection') {
    return renderAccordionFeature(section.props as AccordionFeatureProps);
  }
  // В тёмной теме вордмарк шапки становится белым.
  if (section.component === 'SiteHeader' && theme === 'dark') {
    return `<SiteHeader\n${INDENT}logoTone="light"\n/>`;
  }
  const tagName = section.component;
  const props = section.props as Record<string, unknown>;
  const attrs = Object.entries(props)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => {
      if (typeof v === 'string')
        return `${INDENT}${k}=${IDENTIFIER_KEYS.has(k) ? JSON.stringify(v) : jsxString(v)}`;
      return `${INDENT}${k}={${literal(v, k)}}`;
    });
  return `<${tagName}\n${attrs.join('\n')}\n/>`;
}

export function renderLandingToTSX(spec: LandingSpec, slug: string): string {
  const usedComponents = new Set<string>();
  const sectionJSX: string[] = [];
  const theme = spec.theme ?? 'light';

  for (const section of spec.sections) {
    usedComponents.add(section.component);
    // AccordionFeatureSection рендерит mock через <MockVisual/> внутри items[].media,
    // поэтому его тоже нужно импортировать в сгенерированной странице.
    if (section.component === 'AccordionFeatureSection') {
      usedComponents.add('MockVisual');
    }
    sectionJSX.push(renderSection(section, theme));
  }

  const imports = [...usedComponents].sort().join(', ');
  const mainClass =
    theme === 'dark'
      ? ' className="landing-theme-dark min-h-screen bg-(--color-surface-page) text-(--color-text-primary)"'
      : '';

  return `// AUTO-GENERATED by @kaiten/harness — do not edit by hand
// slug: ${slug}
// pageType: ${spec.pageType}
// goal: ${spec.goal}

import { ${imports} } from '@kaiten/ui/landing';

export const metadata = {
  title: ${jsxString(spec.seo.title)},
  description: ${jsxString(spec.seo.description)},
};

export default function Landing_${slug.replace(/[^a-zA-Z0-9_]/g, '_')}() {
  return (
    <main${mainClass}>
${sectionJSX.map((s) => s.split('\n').map((l) => INDENT + INDENT + l).join('\n')).join('\n\n')}
    </main>
  );
}
`;
}
