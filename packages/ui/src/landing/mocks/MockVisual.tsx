import { ScaleToFit } from './ScaleToFit';
import ClosedPerimeter from './ClosedPerimeter';
import {
  AbTestResultsMock,
  AnalyticsKpiMock,
  ApprovalChainMock,
  AudienceSegmentsMock,
  BookingCalendarMock,
  CallOverlayMock,
  CampaignDashboardMock,
  CandidateCardMock,
  CrmAnalyticsMock,
  CrmClientCardMock,
  DocEditorRichMock,
  DocTemplateMock,
  DocsTreeMock,
  EmailSequenceMock,
  HiringPipelineMock,
  IntegrationsConsoleMock,
  IntegrationsHubMock,
  InventoryGridMock,
  InvoiceStatusMock,
  KnowledgeBaseMock,
  LedgerViewMock,
  MarketplaceConnectorMock,
  McpAgentBoardMock,
  McpAgentBoardAnimatedMock,
  MobileCrmMock,
  MobileDocReaderMock,
  ModulesMatrixMock,
  OmnichannelInboxMock,
  OnboardingChecklistMock,
  OrderFlowMock,
  OrderQueueMock,
  OrgChartMock,
  PerformanceReviewMock,
  PermissionsPanelMock,
  PmBoardMock,
  ProcessFlowchartMock,
  ProductionBoardMock,
  ProductionDepartmentsMock,
  ProductionGanttMock,
  ProductionTaskCardMock,
  ReconciliationMatrixMock,
  RequestCardMock,
  SalesFunnelMock,
  ShareLinkCardMock,
  SlaTrackerMock,
  SupportBoardMock,
  TemplateGalleryMock,
  VksArtifactFlowMock,
  MeetingRoomMock,
  MeetListMock,
  CTAmainMock,
  PmBoard1Mock,
  KanbanMinimalMock,
  KanbanMinimalAnimatedMock,
  ModulePortfolioMock,
  ApprovalBoardMock,
  ReportsChartsMock,
  FinanceKbDocsMock,
  OrgBoardMiniMock,
  PlatformFeatureMiniMock,
  RetailCardMock,
  RetailProjectMock,
  RetailPortfolioAnimateMock,
  RetailMobileMock,
  RetailDocMiniMock,
  RetailReportMiniMock,
  GanttChartMock,
  ModulePlatformKaiten,
  WindowRuleTriggerMock,
  WindowRuleActionMock,
  AutomationRulesListMock,
  WindowDeadlineMock,
  WindowChecklistDoneMock,
  WindowCardFlowMock,
  WindowLinksMock,
  WindowResourceMock,
  WindowReportsMock,
  CliTerminalHeroMock,
  CliTerminalHeroAnimatedMock,
  CliTerminalFinalAnimatedMock,
  CliMarkdownExportMock,
  CliSnapshotMetricsMock,
  CliBatchStatsMock,
  CliProjectGanttMock,
  CliMigrateMock,
  CliAiModelsMock,
  CliSafeModeMock,
  CliInstallMock,
  HelpCenterPortalMock,
  HelpCenterSectionsMock,
  HelpCenterRequestFormMock,
  HelpCenterSearchMock,
  HelpCenterSuggestedArticlesMock,
  HelpCenterRequestCardMock,
  HelpCenterRequestsMock,
  HelpCenterBrandingMock,
  HelpCenterDomainMock,
  HelpCenterEmailMock,
  HelpCenterTemplateMock,
  HelpCenterSetupMock,
} from '.';

/**
 * Полный набор slug'ов mock-вариантов. Источник истины для
 * `HeroSection.visual.variant`, `MediaCopy.mediaVariant` и интерактивных
 * секций (`TabbedFeatureSection.tabs[].mockVariant`,
 * `ScenarioWalkthroughSection.steps[].mockVariant`).
 */
export type MockVariant =
  // PM
  | 'pm-board'
  | 'mcp-agent-board'
  | 'mcp-agent-board-animated'
  | 'analytics-kpi'
  | 'integrations-console'
  | 'integrations-hub'
  | 'modules-matrix'
  // Support
  | 'support-board'
  | 'request-card'
  | 'kb-public'
  | 'kb-internal'
  // CRM
  | 'sales-funnel'
  | 'crm-client-card'
  | 'omnichannel-inbox'
  | 'call-overlay'
  | 'booking-calendar'
  | 'crm-analytics'
  | 'doc-template'
  | 'mobile-crm'
  // HR
  | 'hiring-pipeline'
  | 'candidate-card'
  | 'onboarding-checklist'
  | 'org-chart'
  | 'performance-review'
  // Marketing
  | 'campaign-dashboard'
  | 'email-sequence'
  | 'ab-test-results'
  | 'audience-segments'
  // BPM
  | 'process-flowchart'
  | 'approval-chain'
  | 'sla-tracker'
  // Finance
  | 'ledger-view'
  | 'invoice-status'
  | 'reconciliation-matrix'
  // E-commerce
  | 'order-queue'
  | 'inventory-grid'
  | 'marketplace-connector'
  // Docs / Knowledge base
  | 'docs-tree'
  | 'permissions-panel'
  | 'share-link-card'
  | 'doc-editor-rich'
  | 'template-gallery'
  | 'mobile-doc-reader'
  // Manufacturing / Производство
  | 'production-board'
  | 'order-flow'
  | 'production-gantt'
  | 'production-task-card'
  | 'production-departments'
  // ВКС / Встречи
  | 'vks-artifact-flow'
  | 'meeting-room'
  | 'meet-list'
  | 'pm-board-1'
  | 'kanban-minimal'
  | 'kanban-minimal-animated'
  // Финансы / портфель
  | 'portfolio-board'
  | 'approval-board'
  | 'reports-charts'
  | 'finance-kb-docs'
  | 'mini-org-clients'
  | 'mini-org-it'
  | 'mini-org-legal'
  | 'mini-org-ops'
  | 'mini-org-management'
  | 'mini-feat-gantt'
  | 'mini-feat-reports'
  | 'mini-feat-automation'
  | 'mini-feat-ai'
  | 'mini-feat-chat'
  | 'mini-feat-mobile'
  // Retail / розничная сеть (pm)
  | 'retail-task-card'
  | 'retail-project'
  | 'retail-portfolio-animated'
  | 'retail-mobile'
  | 'retail-doc-instruction'
  | 'retail-doc-standards'
  | 'retail-doc-contracts'
  | 'retail-report-stores'
  | 'retail-report-bottlenecks'
  | 'retail-report-ai'
  | 'gantt-chart'
  // Автоматизации (модуль Kaiten): конструктор правила «если — то» и сценарии
  | 'window-rule-trigger'
  | 'window-rule-action'
  | 'automation-rules-list'
  | 'window-deadline'
  | 'window-checklist-done'
  | 'window-card-flow'
  | 'platform-kaiten'
  // Window-моки планирования (эталон — лендинг сравнения с MS Project)
  | 'window-links'
  | 'window-resource'
  | 'window-reports'
  // Kaiten CLI (cli-community-edition)
  | 'cli-terminal-hero'
  | 'cli-terminal-hero-animated'
  | 'cli-terminal-final-animated'
  | 'cli-markdown-export'
  | 'cli-snapshot-metrics'
  | 'cli-batch-stats'
  | 'cli-project-gantt'
  | 'cli-migrate'
  | 'cli-ai-models'
  | 'cli-safe-mode'
  | 'cli-install'
  // Справочный центр (help-center): портал компании с материалами и обращениями
  | 'help-center-portal'
  | 'help-center-sections'
  | 'help-center-request-form'
  | 'help-center-search'
  | 'help-center-suggested-articles'
  | 'help-center-request-card'
  | 'help-center-requests'
  | 'help-center-branding'
  | 'help-center-domain'
  | 'help-center-email'
  | 'help-center-template'
  | 'help-center-setup'
  | 'help-center-portal-compact'
  // On-premise
  | 'closed-perimeter';

/**
 * Обёртка-хук для темы. `display:contents` не создаёт бокс — раскладка мока не
 * меняется, — но даёт селектор `[data-mock]`, по которому тема может подкрутить
 * переменные внутри продуктовых моков. Тёмная тема этим пользуется: акцентный
 * текст в мокапах идёт кеглем 11–12px, и чистый бренд на тёмном там не читается.
 */
export function MockVisual(props: { variant: MockVariant | undefined }) {
  return (
    <div data-mock className="contents">
      <MockVisualSwitch {...props} />
    </div>
  );
}

function MockVisualSwitch({ variant }: { variant: MockVariant | undefined }) {
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
    case 'mcp-agent-board':
      return <McpAgentBoardMock />;
    case 'mcp-agent-board-animated':
      return <McpAgentBoardAnimatedMock />;
    case 'analytics-kpi':
      return <AnalyticsKpiMock />;
    case 'integrations-console':
      return <IntegrationsConsoleMock />;
    // Карта интеграций фикс. ширины 1440px — в узких слотах масштабируется.
    case 'integrations-hub':
      return (
        <div className="w-full overflow-hidden">
          <ScaleToFit designWidth={1440}>
            <IntegrationsHubMock />
          </ScaleToFit>
        </div>
      );
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
    case 'hiring-pipeline':
      return <HiringPipelineMock />;
    case 'candidate-card':
      return <CandidateCardMock />;
    case 'onboarding-checklist':
      return <OnboardingChecklistMock />;
    case 'org-chart':
      return <OrgChartMock />;
    case 'performance-review':
      return <PerformanceReviewMock />;
    case 'campaign-dashboard':
      return <CampaignDashboardMock />;
    case 'email-sequence':
      return <EmailSequenceMock />;
    case 'ab-test-results':
      return <AbTestResultsMock />;
    case 'audience-segments':
      return <AudienceSegmentsMock />;
    case 'process-flowchart':
      return <ProcessFlowchartMock />;
    case 'approval-chain':
      return <ApprovalChainMock />;
    case 'sla-tracker':
      return <SlaTrackerMock />;
    case 'ledger-view':
      return <LedgerViewMock />;
    case 'invoice-status':
      return <InvoiceStatusMock />;
    case 'reconciliation-matrix':
      return <ReconciliationMatrixMock />;
    case 'order-queue':
      return <OrderQueueMock />;
    case 'inventory-grid':
      return <InventoryGridMock />;
    case 'marketplace-connector':
      return <MarketplaceConnectorMock />;
    case 'docs-tree':
      return <DocsTreeMock />;
    case 'permissions-panel':
      return <PermissionsPanelMock />;
    case 'share-link-card':
      return <ShareLinkCardMock />;
    case 'doc-editor-rich':
      return <DocEditorRichMock />;
    case 'template-gallery':
      return <TemplateGalleryMock />;
    case 'mobile-doc-reader':
      return <MobileDocReaderMock />;
    case 'production-board':
      return <ProductionBoardMock />;
    case 'order-flow':
      return <OrderFlowMock />;
    case 'production-gantt':
      return <ProductionGanttMock />;
    case 'production-task-card':
      return <ProductionTaskCardMock />;
    case 'production-departments':
      return <ProductionDepartmentsMock />;
    case 'vks-artifact-flow':
      return <VksArtifactFlowMock />;
    case 'meeting-room':
      return <MeetingRoomMock />;
    case 'meet-list':
      return <MeetListMock />;
    case 'pm-board-1':
      return <PmBoard1Mock />;
    // Мок фикс. ширины 720px — в узком слоте (половина MediaCopy) масштабируем.
    // Обрамление (бордер + фиолетовая тень) даёт сам мок, как у прочих моков
    // MediaCopy. overflow-hidden обязателен: scale не меняет layout-бокс 720px,
    // а padding — запас, чтобы этот же clip не срезал фиолетовую тень мока
    // (она направлена вниз, поэтому pb больше боковых и верхнего).
    case 'kanban-minimal':
      return (
        <div className="w-full overflow-hidden px-8">
          <ScaleToFit designWidth={720}>
            <KanbanMinimalMock />
          </ScaleToFit>
        </div>
      );
    // Анимированный близнец kanban-minimal — карточка едет из «Очередь» в «В работе».
    case 'kanban-minimal-animated':
      return (
        <div className="w-full overflow-hidden px-8">
          <ScaleToFit designWidth={720}>
            <KanbanMinimalAnimatedMock />
          </ScaleToFit>
        </div>
      );
    // Мок фиксированной ширины 1360px — в узких слотах (половина MediaCopy,
    // карточка FeatureGrid) он рвёт страницу горизонтальным скроллом, поэтому
    // масштабируется под контейнер. На широких слотах масштаб остаётся 1.
    case 'portfolio-board':
      return (
        <div className="w-full overflow-hidden">
          <ScaleToFit designWidth={1360}>
            <ModulePortfolioMock />
          </ScaleToFit>
        </div>
      );
    case 'approval-board':
      return <ApprovalBoardMock />;
    case 'reports-charts':
      return <ReportsChartsMock />;
    case 'finance-kb-docs':
      return <FinanceKbDocsMock />;
    case 'mini-org-clients':
    case 'mini-org-it':
    case 'mini-org-legal':
    case 'mini-org-ops':
    case 'mini-org-management':
      return <OrgBoardMiniMock variant={variant} />;
    case 'mini-feat-gantt':
    case 'mini-feat-reports':
    case 'mini-feat-automation':
    case 'mini-feat-ai':
    case 'mini-feat-chat':
    case 'mini-feat-mobile':
      return <PlatformFeatureMiniMock variant={variant} />;
    case 'retail-task-card':
      return <RetailCardMock />;
    case 'retail-project':
      return <RetailProjectMock />;
    case 'retail-portfolio-animated':
      return <RetailPortfolioAnimateMock />;
    case 'retail-mobile':
      return <RetailMobileMock />;
    case 'retail-doc-instruction':
    case 'retail-doc-standards':
    case 'retail-doc-contracts':
      return <RetailDocMiniMock variant={variant} />;
    case 'retail-report-stores':
    case 'retail-report-bottlenecks':
    case 'retail-report-ai':
      return <RetailReportMiniMock variant={variant} />;
    case 'gantt-chart':
      return (
        <div className="w-full overflow-hidden">
          <ScaleToFit designWidth={1040}>
            <GanttChartMock />
          </ScaleToFit>
        </div>
      );
    case 'window-rule-trigger':
      return <WindowRuleTriggerMock />;
    case 'window-rule-action':
      return <WindowRuleActionMock />;
    case 'automation-rules-list':
      return <AutomationRulesListMock />;
    case 'window-deadline':
      return <WindowDeadlineMock />;
    case 'window-checklist-done':
      return <WindowChecklistDoneMock />;
    case 'window-card-flow':
      return <WindowCardFlowMock />;
    case 'platform-kaiten':
      return (
        <div className="w-full overflow-hidden">
          <ScaleToFit designWidth={2000}>
            <ModulePlatformKaiten />
          </ScaleToFit>
        </div>
      );
    case 'window-links':
      return <WindowLinksMock />;
    case 'window-resource':
      return <WindowResourceMock />;
    case 'window-reports':
      return <WindowReportsMock />;
    case 'cli-terminal-hero':
      return <CliTerminalHeroMock />;
    case 'cli-terminal-hero-animated':
      return <CliTerminalHeroAnimatedMock />;
    case 'cli-terminal-final-animated':
      return <CliTerminalFinalAnimatedMock />;
    case 'cli-markdown-export':
      return <CliMarkdownExportMock />;
    case 'cli-snapshot-metrics':
      return <CliSnapshotMetricsMock />;
    case 'cli-batch-stats':
      return <CliBatchStatsMock />;
    case 'cli-project-gantt':
      return <CliProjectGanttMock />;
    case 'cli-migrate':
      return <CliMigrateMock />;
    case 'cli-ai-models':
      return <CliAiModelsMock />;
    case 'cli-safe-mode':
      return <CliSafeModeMock />;
    case 'cli-install':
      return <CliInstallMock />;
    case 'help-center-portal':
      return <HelpCenterPortalMock />;
    case 'help-center-sections':
      return <HelpCenterSectionsMock />;
    case 'help-center-request-form':
      return <HelpCenterRequestFormMock />;
    case 'help-center-search':
      return <HelpCenterSearchMock />;
    case 'help-center-suggested-articles':
      return <HelpCenterSuggestedArticlesMock />;
    case 'help-center-request-card':
      return <HelpCenterRequestCardMock />;
    case 'help-center-requests':
      return <HelpCenterRequestsMock />;
    case 'help-center-branding':
      return <HelpCenterBrandingMock />;
    case 'help-center-domain':
      return <HelpCenterDomainMock />;
    case 'help-center-email':
      return <HelpCenterEmailMock />;
    case 'help-center-template':
      return <HelpCenterTemplateMock />;
    case 'help-center-setup':
      return <HelpCenterSetupMock />;
    case 'help-center-portal-compact':
      return <HelpCenterPortalMock variant="compact" />;
    case 'closed-perimeter':
      return <ClosedPerimeter />;
    default:
      return null;
  }
}
