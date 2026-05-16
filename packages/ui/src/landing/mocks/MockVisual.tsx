import {
  AnalyticsKpiMock,
  BookingCalendarMock,
  CallOverlayMock,
  CrmAnalyticsMock,
  CrmClientCardMock,
  DocTemplateMock,
  IntegrationsConsoleMock,
  KnowledgeBaseMock,
  MobileCrmMock,
  ModulesMatrixMock,
  OmnichannelInboxMock,
  PmBoardMock,
  RequestCardMock,
  SalesFunnelMock,
  SupportBoardMock,
} from '.';

/**
 * Полный набор slug'ов mock-вариантов. Источник истины для
 * `HeroSection.visual.variant`, `MediaCopy.mediaVariant` и новых секций
 * (`TabbedFeatureSection.tabs[].mockVariant`, `ScenarioWalkthroughSection.steps[].mockVariant`).
 */
export type MockVariant =
  | 'support-board'
  | 'request-card'
  | 'kb-public'
  | 'kb-internal'
  | 'pm-board'
  | 'analytics-kpi'
  | 'integrations-console'
  | 'modules-matrix'
  | 'sales-funnel'
  | 'crm-client-card'
  | 'omnichannel-inbox'
  | 'call-overlay'
  | 'booking-calendar'
  | 'crm-analytics'
  | 'doc-template'
  | 'mobile-crm';

/**
 * Единый dispatcher: slug → React-компонент mock'а. Используй всюду, где
 * нужно отрисовать mock внутри секции. Если slug не известен — возвращает null,
 * чтобы caller сам обработал fallback.
 */
export function MockVisual({ variant }: { variant: MockVariant | undefined }) {
  switch (variant) {
    case 'support-board':
      return <SupportBoardMock />;
    case 'request-card':
      return <RequestCardMock />;
    case 'kb-public':
      return <KnowledgeBaseMock variant="public" />;
    case 'kb-internal':
      return <KnowledgeBaseMock variant="internal" />;
    case 'pm-board':
      return <PmBoardMock />;
    case 'analytics-kpi':
      return <AnalyticsKpiMock />;
    case 'integrations-console':
      return <IntegrationsConsoleMock />;
    case 'modules-matrix':
      return <ModulesMatrixMock />;
    case 'sales-funnel':
      return <SalesFunnelMock />;
    case 'crm-client-card':
      return <CrmClientCardMock />;
    case 'omnichannel-inbox':
      return <OmnichannelInboxMock />;
    case 'call-overlay':
      return <CallOverlayMock />;
    case 'booking-calendar':
      return <BookingCalendarMock />;
    case 'crm-analytics':
      return <CrmAnalyticsMock />;
    case 'doc-template':
      return <DocTemplateMock />;
    case 'mobile-crm':
      return <MobileCrmMock />;
    default:
      return null;
  }
}
