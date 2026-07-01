import type { Brief } from '../schemas/brief';
import type { LandingSpec, Section } from '../schemas/landing-spec';

/**
 * Business-rules валидатор для LandingSpec (этап 4).
 *
 * Кросс-секционные проверки, которые не выражаются через zod без дублирования:
 *   - hero первой секцией, footer последней;
 *   - ровно 1 hero;
 *   - максимум 1 final_cta;
 *   - максимум 1 highlighted plan;
 *   - все href начинаются с http(s):// или '/' или '#';
 *   - если передан brief — primary CTA hero и final_cta перекликаются с brief.cta;
 *   - все 'icon' значения для FeatureGrid — непустые строки.
 */

export interface LandingBusinessError {
  rule:
    | 'hero-first'
    | 'footer-last'
    | 'single-hero'
    | 'single-final-cta'
    | 'pricing-highlighted'
    | 'href-shape'
    | 'cta-aligned-with-brief'
    | 'feature-icon';
  message: string;
  where?: string;
}

export interface LandingBusinessResult {
  ok: boolean;
  errors: LandingBusinessError[];
}

function countByComponent(sections: Section[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const s of sections) {
    counts.set(s.component, (counts.get(s.component) ?? 0) + 1);
  }
  return counts;
}

function isAcceptableHref(href: string): boolean {
  return /^https?:\/\//i.test(href) || href.startsWith('/') || href.startsWith('#') || href.startsWith('mailto:');
}

function similarish(a: string, b: string): boolean {
  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-zа-яё0-9 ]/giu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  const na = norm(a);
  const nb = norm(b);
  if (!na || !nb) return false;
  if (na.includes(nb) || nb.includes(na)) return true;
  const setA = new Set(na.split(' '));
  const setB = new Set(nb.split(' '));
  let overlap = 0;
  for (const w of setA) if (setB.has(w)) overlap++;
  return overlap >= Math.min(2, Math.min(setA.size, setB.size));
}

export function validateLandingBusiness(spec: LandingSpec, brief?: Brief): LandingBusinessResult {
  const errors: LandingBusinessError[] = [];
  const { sections } = spec;

  if (sections.length === 0) {
    return { ok: false, errors: [{ rule: 'hero-first', message: 'Пустой sections — нужен минимум hero.' }] };
  }

  // hero-first (допускается опциональная секция SiteHeader перед hero)
  const heroFirst =
    sections[0]!.component === 'HeroSection' ||
    (sections[0]!.component === 'SiteHeader' && sections[1]?.component === 'HeroSection');
  if (!heroFirst) {
    errors.push({
      rule: 'hero-first',
      message: `Первая секция — ${sections[0]!.component}, ожидается HeroSection (допустим SiteHeader перед hero).`,
      where: 'sections[0]',
    });
  }

  // footer-last (только если footer присутствует; LandingFooter или LandingFooterMock)
  const counts = countByComponent(sections);
  const FOOTER_COMPONENTS = ['LandingFooter', 'LandingFooterMock'];
  const hasFooter = FOOTER_COMPONENTS.some((c) => counts.get(c));
  const lastIsFooter = FOOTER_COMPONENTS.includes(sections[sections.length - 1]!.component);
  if (hasFooter && !lastIsFooter) {
    errors.push({
      rule: 'footer-last',
      message: 'Подвал (LandingFooter / LandingFooterMock) должен быть последней секцией.',
      where: `sections[${sections.length - 1}]`,
    });
  }

  // single-hero / single-final-cta
  if ((counts.get('HeroSection') ?? 0) > 1) {
    errors.push({
      rule: 'single-hero',
      message: `На странице ${counts.get('HeroSection')} HeroSection, ожидается ровно один.`,
    });
  }
  if ((counts.get('FinalCta') ?? 0) > 1) {
    errors.push({
      rule: 'single-final-cta',
      message: `На странице ${counts.get('FinalCta')} FinalCta, максимум один.`,
    });
  }

  // pricing-highlighted ≤ 1
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i]!;
    if (s.component === 'PricingPlans') {
      const highlighted = s.props.plans.filter((p) => p.highlighted).length;
      if (highlighted > 1) {
        errors.push({
          rule: 'pricing-highlighted',
          message: `Pricing[${i}]: ${highlighted} highlighted plans, ожидается максимум 1.`,
          where: `sections[${i}].plans`,
        });
      }
    }
  }

  // href-shape: пройдёмся по всем CTA-объектам
  const ctaPaths: Array<{ path: string; cta: { label: string; href: string } | null | undefined }> = [];
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i]!;
    if (s.component === 'HeroSection') {
      ctaPaths.push({ path: `sections[${i}].primaryCta`, cta: s.props.primaryCta });
      ctaPaths.push({ path: `sections[${i}].secondaryCta`, cta: s.props.secondaryCta ?? null });
    } else if (s.component === 'FinalCta') {
      ctaPaths.push({ path: `sections[${i}].primaryCta`, cta: s.props.primaryCta });
      ctaPaths.push({ path: `sections[${i}].secondaryCta`, cta: s.props.secondaryCta ?? null });
    } else if (s.component === 'PricingPlans') {
      s.props.plans.forEach((p, j) =>
        ctaPaths.push({ path: `sections[${i}].plans[${j}].cta`, cta: p.cta }),
      );
    } else if (s.component === 'LandingFooter') {
      s.props.columns.forEach((col, j) =>
        col.links.forEach((l, k) =>
          ctaPaths.push({
            path: `sections[${i}].columns[${j}].links[${k}]`,
            cta: { label: l.label, href: l.href },
          }),
        ),
      );
    }
  }
  for (const { path, cta } of ctaPaths) {
    if (!cta) continue;
    if (!isAcceptableHref(cta.href)) {
      errors.push({
        rule: 'href-shape',
        message: `${path}.href="${cta.href}" — ожидается http(s)://, /path, #anchor или mailto:.`,
        where: path,
      });
    }
  }

  // cta-aligned-with-brief
  if (brief?.cta) {
    const heroIdx = sections.findIndex((s) => s.component === 'HeroSection');
    if (heroIdx >= 0) {
      const hero = sections[heroIdx]!;
      if (hero.component === 'HeroSection') {
        if (!similarish(hero.props.primaryCta.label, brief.cta)) {
          errors.push({
            rule: 'cta-aligned-with-brief',
            message: `Hero primaryCta.label="${hero.props.primaryCta.label}" не выровнен с brief.cta="${brief.cta}".`,
            where: `sections[${heroIdx}].primaryCta`,
          });
        }
      }
    }
  }

  // feature-icon: непустые строки
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i]!;
    if (s.component === 'FeatureGrid') {
      s.props.items.forEach((it, j) => {
        if (!it.icon || it.icon.trim().length === 0) {
          errors.push({
            rule: 'feature-icon',
            message: `FeatureGrid[${i}].items[${j}].icon пуст — нужно lucide-имя.`,
            where: `sections[${i}].items[${j}]`,
          });
        }
      });
    }
  }

  return { ok: errors.length === 0, errors };
}

export function formatLandingBusinessErrors(result: LandingBusinessResult): string {
  if (result.ok) return 'OK';
  return result.errors
    .map((e) => `  [business:${e.rule}] ${e.where ?? '*'} — ${e.message}`)
    .join('\n');
}
