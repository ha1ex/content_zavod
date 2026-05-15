import {
  HeroSection,
  FeatureGrid,
  PricingPlans,
  FAQAccordion,
  FinalCta,
  LandingFooter,
} from '@buffalo/ui/landing';
import type { LandingSpec, Section } from '../schemas/landing-spec.js';

/**
 * Прямой React-рендер LandingSpec в Next.js preview route.
 * В отличие от renderLandingToTSX (генерит TSX-строку для handoff),
 * этот рендерит прямо в дереве через discriminated union на section.component.
 */

function RenderSection({ section }: { section: Section }) {
  switch (section.component) {
    case 'HeroSection':
      return <HeroSection {...section.props} />;
    case 'FeatureGrid':
      return <FeatureGrid {...section.props} />;
    case 'PricingPlans':
      return <PricingPlans {...section.props} />;
    case 'FAQAccordion':
      return <FAQAccordion {...section.props} />;
    case 'FinalCta':
      return <FinalCta {...section.props} />;
    case 'LandingFooter':
      return <LandingFooter {...section.props} />;
    default: {
      const _exhaustive: never = section;
      void _exhaustive;
      return null;
    }
  }
}

export function RenderLanding({ spec }: { spec: LandingSpec }) {
  return (
    <>
      {spec.sections.map((section) => (
        <RenderSection key={section.id} section={section} />
      ))}
    </>
  );
}
