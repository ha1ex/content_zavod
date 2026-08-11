import {
  HeroSection,
  FeatureGrid,
  PricingPlans,
  FAQAccordion,
  FinalCta,
  LandingFooter,
  SocialProof,
  ProcessSteps,
  CtaBanner,
  CtaButtons,
  CtaProduct,
  FeatureRows,
  MediaCopy,
  StatStrip,
  PromoBanner,
  BenefitsStrip,
  MetricsSplit,
  TabbedFeatureSection,
  AccordionFeatureSection,
  ScenarioWalkthroughSection,
  IndustryPickerSection,
  ComparisonTable,
  TimelineRoadmap,
  BentoGrid,
  LogoCloud,
  LogoMarquee,
  TestimonialQuote,
  LegalNote,
  PainBubbles,
  SpeakerCard,
  SpeakerGrid,
  RegistrationCta,
  SiteHeader,
  LandingFooterMock,
  ReviewSlider,
  MockVisual,
} from '@kaiten/ui/landing';
import { ButtonLink } from '@kaiten/ui/primitives';
import type { LandingSpec, Section } from '../schemas/landing-spec';
import { ruNbspDeep } from './ru-typography';

/**
 * Прямой React-рендер LandingSpec в Next.js preview route.
 * В отличие от renderLandingToTSX (генерит TSX-строку для handoff),
 * этот рендерит прямо в дереве через discriminated union на section.component.
 */

function RenderSection({
  section,
  expandTabs = false,
  theme = 'light',
}: {
  section: Section;
  expandTabs?: boolean;
  theme?: 'light' | 'dark';
}) {
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
    case 'SiteHeader':
      return <SiteHeader logoTone={theme === 'dark' ? 'light' : 'dark'} />;
    case 'LandingFooterMock':
      return <LandingFooterMock />;
    case 'SocialProof':
      return <SocialProof {...section.props} />;
    case 'ReviewSlider':
      return <ReviewSlider {...section.props} />;
    case 'ProcessSteps':
      return <ProcessSteps {...section.props} />;
    case 'CtaBanner':
      return <CtaBanner {...section.props} />;
    case 'CtaButtons':
      return <CtaButtons {...section.props} />;
    case 'CtaProduct':
      return <CtaProduct {...section.props} />;
    case 'FeatureRows':
      return <FeatureRows {...section.props} />;
    case 'MediaCopy':
      return <MediaCopy {...section.props} />;
    case 'StatStrip':
      return <StatStrip {...section.props} />;
    case 'PromoBanner':
      return <PromoBanner {...section.props} />;
    case 'BenefitsStrip':
      return <BenefitsStrip {...section.props} />;
    case 'MetricsSplit':
      return <MetricsSplit {...section.props} />;
    case 'TabbedFeatureSection':
      return <TabbedFeatureSection {...section.props} staticTabs={expandTabs} />;
    case 'AccordionFeatureSection': {
      // Компонент теперь self-contained (ReactNode-пропсы), а spec остаётся
      // JSON (mockVariant-строки) — конвертируем на границе рендера.
      const p = section.props;
      const hasCta = Boolean(p.primaryCta || p.secondaryCta);
      return (
        <AccordionFeatureSection
          heading={p.title}
          description={p.description}
          defaultOpen={0}
          items={p.items.map((it) => ({
            title: it.title,
            body: it.description,
            media: <MockVisual variant={it.mockVariant} />,
          }))}
          cta={
            hasCta ? (
              <>
                {p.primaryCta && (
                  <ButtonLink size="lg" href={p.primaryCta.href}>
                    {p.primaryCta.label}
                  </ButtonLink>
                )}
                {p.secondaryCta && (
                  <ButtonLink variant="outline" size="lg" href={p.secondaryCta.href}>
                    {p.secondaryCta.label}
                  </ButtonLink>
                )}
              </>
            ) : undefined
          }
        />
      );
    }
    case 'ScenarioWalkthroughSection':
      return <ScenarioWalkthroughSection {...section.props} />;
    case 'IndustryPickerSection':
      return <IndustryPickerSection {...section.props} />;
    case 'ComparisonTable':
      return <ComparisonTable {...section.props} />;
    case 'TimelineRoadmap':
      return <TimelineRoadmap {...section.props} />;
    case 'BentoGrid':
      return <BentoGrid {...section.props} />;
    case 'LogoMarquee':
      return <LogoMarquee {...section.props} />;
    case 'LogoCloud':
      return <LogoCloud {...section.props} />;
    case 'TestimonialQuote':
      return <TestimonialQuote {...section.props} />;
    case 'LegalNote':
      return <LegalNote {...section.props} />;
    case 'PainBubbles':
      return <PainBubbles {...section.props} />;
    case 'SpeakerCard':
      return <SpeakerCard {...section.props} />;
    case 'SpeakerGrid':
      return <SpeakerGrid {...section.props} />;
    case 'RegistrationCta':
      return <RegistrationCta {...section.props} />;
    default: {
      const _exhaustive: never = section;
      void _exhaustive;
      return null;
    }
  }
}

export function RenderLanding({
  spec,
  expandTabs = false,
}: {
  spec: LandingSpec;
  /** Хендофф-режим: секции-табы раскрываются в стопку (все моки в DOM). */
  expandTabs?: boolean;
}) {
  // Правило DS `ru-nbsp-typography` зашито в рендер: неразрывные пробелы для
  // висячих предлогов/союзов/частиц и длинного тире проставляются автоматически.
  const s = ruNbspDeep(spec);
  const theme = s.theme ?? 'light';
  return (
    <div
      data-landing-theme={theme}
      className={
        theme === 'dark'
          ? 'landing-theme-dark min-h-screen bg-(--color-surface-page) text-(--color-text-primary)'
          : undefined
      }
    >
      {s.sections.map((section, i) => (
        <div
          key={`${section.id}-${i}`}
          data-comp={section.id}
          data-comp-index={String(i)}
          className={theme === 'dark' && i >= 2 ? 'reveal-section' : undefined}
        >
          <RenderSection section={section} expandTabs={expandTabs} theme={theme} />
        </div>
      ))}
    </div>
  );
}
