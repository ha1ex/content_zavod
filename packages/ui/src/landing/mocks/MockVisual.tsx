import { ScaleToFit } from './ScaleToFit';
import { cn } from '../../primitives/cn';
import OnPremise from './OnPremise';
import { FeatureTile } from './FeatureTile';
import { Diagrams } from './Diagram';
import { NotificationSettingsMock } from './NotificationSettingsMock';
import { RecurringTaskScheduleMock } from './RecurringTaskScheduleMock';
import { ReportChartMock, type ReportChartKind } from './ReportChartMock';
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
  ReportsChartsCascadeMock,
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
  WorkspaceViewMock,
  KaitenCalendarMock,
  ApiDocsMock,
  WorkspaceViewHeader,
  type WorkspaceView,
  WorkspaceSpacesMock,
  WorkspaceCreateMock,
  BoardCreateColumnMock,
  SpaceSwitchAnimatedMock,
  SpaceCreateAnimatedMock,
  ColumnCreateAnimatedMock,
  PortfolioCardAnimatedMock,
  PortfolioNestedBoardsMock,
  SpaceBoardsExpandAnimatedMock,
  AdminSpaceRealMock,
  ModuleScrumMock,
  ModuleBoardsMock,
  ModuleWorkspaceBoardMock,
  ModuleBoardsOriginMock,
  AdminSpaceMock,
  LaptopBoardTreeMock,
  TabletBoardTreeMock,
  TabletImageMock,
  BoardWindowHeader,
  WindowProjectModalMock,
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
  ExcelGrowMock,
  ExcelTableViewMock,
  TaskCardFullMock,
  WindowCardMock,
  WindowTicketModalMock,
  WindowTicketModalOrigin,
  TasksViewsSliderMock,
  CardChecklistRelationsMock,
  PlatformSliderMock,
  ModulesCollageMock,
  BoardSignalsMock,
  ExcelImportMock,
  TabletPairMock,
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
  | 'portfolio-board-stretch'
  | 'approval-board'
  | 'reports-charts'
  | 'reports-charts-cascade'
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
  // Окна рабочего пространства: создание пространства и пустая доска
  | 'window-workspace-create'
  | 'window-board-new'
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
  // Единое рабочее пространство: одни и те же задачи в шести представлениях
  | 'workspace-view-board'
  | 'workspace-view-list'
  | 'workspace-view-table'
  | 'workspace-view-timeline'
  | 'workspace-view-calendar'
  | 'kaiten-calendar'
  | 'api-docs'
  | 'workspace-view-reports'
  | 'workspace-spaces'
  | 'workspace-access'
  | 'workspace-create'
  | 'board-create-column'
  | 'space-switch-animated'
  | 'space-create-animated'
  | 'column-create-animated'
  | 'portfolio-card-animated'
  | 'portfolio-board-real'
  | 'space-boards-expand-animated'
  | 'admin-space-real'
  | 'scrum-board'
  | 'scrum-board-wide'
  | 'module-boards'
  | 'module-workspace-board'
  | 'module-boards-origin'
  | 'admin-space'
  | 'laptop-boards'
  | 'tablet-boards'
  | 'tablet-team-board'
  // Задачи: карточка проекта и плитки галереи фич (FeatureMocksV01)
  | 'window-project-modal'
  | 'tile-recurring-tasks'
  | 'tile-notifications'
  | 'tile-integrations-git'
  | 'report-diagrams'
  | 'window-rule-full'
  | 'notification-settings'
  | 'recurring-task-schedule'
  // Отчеты: одна диаграмма в карточке фичи
  | 'report-chart-burndown'
  | 'report-chart-velocity'
  | 'report-chart-control'
  | 'report-chart-cfd'
  | 'report-chart-spectral'
  | 'report-chart-throughput'
  | 'report-chart-blocked'
  | 'report-chart-cycle-time'
  // On-premise
  // Переезд из таблиц (Excel → Кайтен)
  | 'excel-grow'
  | 'excel-table-view'
  | 'task-card-full'
  | 'window-card'
  | 'window-ticket-modal'
  | 'window-ticket-modal-origin'
  | 'tasks-views-slider'
  | 'card-checklist-relations'
  | 'platform-slider'
  | 'modules-collage'
  | 'board-signals'
  | 'excel-import'
  | 'tablet-pair'
  | 'on-premise';

/**
 * Обёртка-хук для темы. `display:contents` не создаёт бокс — раскладка мока не
 * меняется, — но даёт селектор `[data-mock]`, по которому тема может подкрутить
 * переменные внутри продуктовых моков. Тёмная тема этим пользуется: акцентный
 * текст в мокапах идёт кеглем 11–12px, и чистый бренд на тёмном там не читается.
 */
const TILE_CAPTIONS: Record<'tile-recurring-tasks' | 'tile-notifications' | 'tile-integrations-git', string> = {
  'tile-recurring-tasks': 'Повторяющиеся задачи',
  'tile-notifications': 'Боты и уведомления',
  'tile-integrations-git': 'Интеграции: GitLab · GitHub',
};

export function MockVisual(props: {
  variant: MockVariant | undefined;
  /** Без боковых полей у моков, которые их задают (канбан-доски): 0 вместо 32px. */
  tight?: boolean;
  /** Серая тень вместо фиолетовой у моков, которые её задают (канбан-доски). */
  grayShadow?: boolean;
}) {
  return (
    <div data-mock className="contents">
      <MockVisualSwitch {...props} />
    </div>
  );
}

function MockVisualSwitch({
  variant,
  tight,
  grayShadow,
}: {
  variant: MockVariant | undefined;
  tight?: boolean;
  grayShadow?: boolean;
}) {
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
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={1440}>
            <IntegrationsHubMock surface="plain" />
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
    // MediaCopy. Обрезка обязательна: scale не меняет layout-бокс 720px. Но режем
    // через overflow:clip с запасом overflow-clip-margin — иначе срезается
    // фиолетовая тень мока (у всех обёрток ниже так же).
    case 'kanban-minimal':
      return (
        <div className={cn('w-full [overflow:clip] [overflow-clip-margin:80px]', tight ? 'px-0' : 'px-8')}>
          <ScaleToFit designWidth={720}>
            {/* grayShadow — серая тень окна, как у остальных моков (у статичной доски своей тени нет) */}
            <div
              className={cn(
                grayShadow && 'rounded-(--radius-3xl) shadow-[0_10px_40px_-20px_rgba(45,45,45,0.3)]',
                // на десктопе окно со скруглением 16px вместо 24px
                grayShadow && 'lg:rounded-2xl lg:[&>div]:rounded-2xl',
              )}
            >
              <KanbanMinimalMock />
            </div>
          </ScaleToFit>
        </div>
      );
    // Анимированный близнец kanban-minimal — карточка едет из «Очередь» в «В работе».
    case 'kanban-minimal-animated':
      return (
        <div
          className={cn(
            'w-full [overflow:clip] [overflow-clip-margin:80px]',
            tight ? 'px-0' : 'px-8',
            // перебивает фиолетовую тень окна доски серой, как у остальных моков
            grayShadow && '[&_.kmm>div]:shadow-[0_10px_40px_-20px_rgba(45,45,45,0.3)]',
          )}
        >
          <ScaleToFit designWidth={720}>
            <KanbanMinimalAnimatedMock />
          </ScaleToFit>
        </div>
      );
    // Мок фиксированной ширины 1360px — в узких слотах (половина MediaCopy,
    // карточка FeatureGrid) он рвёт страницу горизонтальным скроллом, поэтому
    // масштабируется под контейнер. На широких слотах масштаб остаётся 1.
    case 'portfolio-board':
    case 'portfolio-board-stretch':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={1360}>
            <ModulePortfolioMock stretch={variant === 'portfolio-board-stretch'} />
          </ScaleToFit>
        </div>
      );
    // Портфель проектов, свёрнутые доски проектов и доска «Письма», 1360px.
    case 'module-boards':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={1360}>
            <ModuleBoardsMock />
          </ScaleToFit>
        </div>
      );
    // Пространство с меню слева и доской «Запуск продукта» (доска первого экрана), 1360px.
    case 'module-workspace-board':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={1360}>
            <ModuleWorkspaceBoardMock />
          </ScaleToFit>
        </div>
      );
    // Интерфейс Кайтена целиком: дерево, панель видов, доска «Задачи команды», 1920px.
    case 'module-boards-origin':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={1920}>
            <ModuleBoardsOriginMock />
          </ScaleToFit>
        </div>
      );
    // Рабочий кабинет руководителя: доски разных отделов, 820px.
    case 'admin-space':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={820}>
            <AdminSpaceMock />
          </ScaleToFit>
        </div>
      );
    // Ноутбук: канбан-доска производства и дерево разделов, 880px.
    case 'laptop-boards':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={880}>
            <LaptopBoardTreeMock />
          </ScaleToFit>
        </div>
      );
    // Планшет: тот же экран с досками и деревом разделов, 760px.
    case 'tablet-boards':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={760}>
            <TabletBoardTreeMock />
          </ScaleToFit>
        </div>
      );
    // Планшет со скриншотом доски «Задачи команды», 760px.
    case 'tablet-team-board':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={760}>
            <TabletImageMock />
          </ScaleToFit>
        </div>
      );
    case 'approval-board':
      return <ApprovalBoardMock />;
    case 'reports-charts':
      return <ReportsChartsMock />;
    // Каскад окон на холсте 592px — в узких слотах масштабируется.
    case 'reports-charts-cascade':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={592}>
            <ReportsChartsCascadeMock />
          </ScaleToFit>
        </div>
      );
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
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={1040}>
            <GanttChartMock />
          </ScaleToFit>
        </div>
      );
    // Запланированные задания: календарь месяца + окно «Создание задания» поверх.
    case 'recurring-task-schedule':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={800}>
            <RecurringTaskScheduleMock />
          </ScaleToFit>
        </div>
      );
    // Настройка уведомлений: окно каналов и событий + телефон с чатом бота.
    case 'notification-settings':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={796}>
            <NotificationSettingsMock />
          </ScaleToFit>
        </div>
      );
    // Правило целиком: «Когда» и поверх его правого нижнего угла «Выполнить»
    // (две карточки по 520px внахлест — так мок крупнее, чем две в ряд).
    case 'window-rule-full':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={700}>
            <div className="relative h-[462px]">
              <WindowRuleTriggerMock />
              <div className="absolute bottom-0 right-0 translate-y-[31px]">
                <WindowRuleActionMock />
              </div>
            </div>
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
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
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
    // Мок фиксированной ширины 760px — в узких слотах масштабируется.
    // window-board-new — то же окно вида «Доски» (пустая «Новая доска») под именем семейства Window
    case 'window-board-new':
    // Портал разработчиков Kaiten API: дерево методов и страница Introduction.
    case 'api-docs':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={640}>
            <ApiDocsMock />
          </ScaleToFit>
        </div>
      );
    // Календарь пространства один в один с продуктом (месяц, цветные плашки карточек).
    case 'kaiten-calendar':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={760}>
            <KaitenCalendarMock />
          </ScaleToFit>
        </div>
      );
    case 'workspace-view-board':
    case 'workspace-view-list':
    case 'workspace-view-table':
    case 'workspace-view-timeline':
    case 'workspace-view-calendar':
    case 'workspace-view-reports':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={760}>
            <WorkspaceViewMock
              view={variant === 'window-board-new' ? 'board' : (variant.slice('workspace-view-'.length) as WorkspaceView)}
            />
          </ScaleToFit>
        </div>
      );
    // Скрам-доска ~1830px (6 колонок по 300px): целиком в половине колонки
    // нечитаема, поэтому показываем фрагмент — первые три колонки.
    case 'scrum-board':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          {/* 1232 = p-4 слева (16) + четыре колонки по 300 + 16 справа */}
          <ScaleToFit designWidth={1232}>
            {/* окно с шапкой пространства, как у admin-space */}
            <div className="w-[1232px] overflow-hidden rounded-2xl border border-(--color-border-default) bg-(--color-surface-section) shadow-[0_10px_40px_-20px_rgba(45,45,45,0.3)]">
              <BoardWindowHeader title="Разработка" />
              <ModuleScrumMock landing columns={4} />
            </div>
          </ScaleToFit>
        </div>
      );
    // Вся скрам-доска (6 колонок, 1832px) в окне WorkspaceViewMock 760px —
    // с той же шапкой видов (активны «Доски») — для блока видов.
    case 'scrum-board-wide':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          {/* окно 760px как у workspace-view-*: шапка с видами, доска 1832px уменьшена до 758 */}
          <ScaleToFit designWidth={760}>
            <div className="w-[760px] overflow-hidden rounded-(--radius-2xl) border border-(--color-border-default) bg-(--color-surface-card) shadow-[0_10px_40px_-20px_rgba(45,45,45,0.3)]">
              <WorkspaceViewHeader view="board" />
              <div className="h-[392px] overflow-hidden bg-(--color-surface-section)">
                <div className="w-[1832px] origin-top-left" style={{ transform: `scale(${758 / 1832})` }}>
                  <ModuleScrumMock landing columns={6} />
                </div>
              </div>
            </div>
          </ScaleToFit>
        </div>
      );
    // Создание пространства: приложение на фоне и меню «Добавить», 640px.
    // window-workspace-create — то же окно под именем семейства Window
    case 'window-workspace-create':
    case 'workspace-create':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={2000}>
            <WorkspaceCreateMock />
          </ScaleToFit>
        </div>
      );
    // Пустая доска со скриншота и меню «Создать колонку», 2000px.
    case 'board-create-column':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={2000}>
            <BoardCreateColumnMock />
          </ScaleToFit>
        </div>
      );
    // Переключение между пространствами: курсор идет по дереву, доски меняются. 1920px.
    case 'space-switch-animated':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={1920}>
            <SpaceSwitchAnimatedMock />
          </ScaleToFit>
        </div>
      );
    // Создание пространства и доски: окна «Новое пространство» и «Новая доска». 1920px.
    case 'space-create-animated':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={1920}>
            <SpaceCreateAnimatedMock />
          </ScaleToFit>
        </div>
      );
    // Создание колонки на доске: меню колонки и окно «Создать колонку». 1920px.
    case 'column-create-animated':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={1920}>
            <ColumnCreateAnimatedMock />
          </ScaleToFit>
        </div>
      );
    // Портфель проектов: перенос карточки, календарь срока, окно карточки. 1920px.
    case 'portfolio-card-animated':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={1920}>
            <PortfolioCardAnimatedMock />
          </ScaleToFit>
        </div>
      );
    // Пространство с несколькими досками: курсор по очереди раскрывает их. 1920px.
    case 'space-boards-expand-animated':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={1920}>
            <SpaceBoardsExpandAnimatedMock />
          </ScaleToFit>
        </div>
      );
    // Тот же портфель проектов, но без анимации: только доска. 1920px.
    case 'portfolio-board-real':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={1920}>
            <PortfolioNestedBoardsMock />
          </ScaleToFit>
        </div>
      );
    // Рабочий кабинет руководителя в интерфейсе Кайтена: три доски пространства. 1920px.
    case 'admin-space-real':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={1920}>
            <AdminSpaceRealMock />
          </ScaleToFit>
        </div>
      );
    case 'workspace-spaces':
    case 'workspace-access':
      return (
        <div className="w-full [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={640}>
            <WorkspaceSpacesMock variant={variant === 'workspace-spaces' ? 'spaces' : 'access'} />
          </ScaleToFit>
        </div>
      );
    // Мок сам масштабируется из 800px под ширину слота.
    // Шесть диаграмм отчетов (Diagram.tsx) без шапки секции.
    case 'report-diagrams':
      return <Diagrams headless />;
    case 'report-chart-burndown':
    case 'report-chart-velocity':
    case 'report-chart-control':
    case 'report-chart-cfd':
    case 'report-chart-spectral':
    case 'report-chart-throughput':
    case 'report-chart-blocked':
    case 'report-chart-cycle-time':
      return <ReportChartMock kind={variant.slice('report-chart-'.length) as ReportChartKind} />;
    case 'window-project-modal':
      return <WindowProjectModalMock />;
    // Плитки галереи фич 240×176: увеличиваем вдвое через zoom (разметка плитки
    // остается резкой), в узких слотах ScaleToFit ужимает обратно.
    case 'tile-recurring-tasks':
    case 'tile-notifications':
    case 'tile-integrations-git':
      return (
        <div className="mx-auto w-full max-w-[480px] [overflow:clip] [overflow-clip-margin:80px]">
          <ScaleToFit designWidth={480}>
            <div style={{ zoom: 2, width: 240 }}>
              <FeatureTile caption={TILE_CAPTIONS[variant]} />
            </div>
          </ScaleToFit>
        </div>
      );
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
    // Переезд из таблиц: моки фикс. ширины 720px отдаём без обёртки — секции
    // (MediaCopy, вкладки, сценарии) сами ужимают их под колонку через MockFit.
    case 'excel-grow':
      return <ExcelGrowMock />;
    case 'excel-table-view':
      return <ExcelTableViewMock />;
    case 'task-card-full':
      return <TaskCardFullMock />;
    // Окно карточки задачи: заголовок, тулбар действий и основные параметры. Ширина фиксирована — MockFit ужимает.
    case 'window-card':
      return (
        <div className="w-[600px]">
          <WindowCardMock grayShadow />
        </div>
      );
    // Окно обращения Service Desk: карточка слева, переписка справа. 800px, ужимает MockFit.
    case 'window-ticket-modal':
      return <WindowTicketModalMock bare grayShadow card="presentation" />;
    // Карточка задачи Кайтена 1:1 с продукта: поля и чек-лист слева, комментарии справа. 800px, ужимает MockFit.
    case 'window-ticket-modal-origin':
      return <WindowTicketModalOrigin />;
    // Одни и те же задачи в разных представлениях: списки, таблица, timeline, календарь. 1000px, ужимает MockFit.
    case 'tasks-views-slider':
      return <TasksViewsSliderMock />;
    // Фрагмент карточки 1:1 с продукта: чек-лист и связи с дочерней карточкой. 620px, ужимает MockFit.
    case 'card-checklist-relations':
      return <CardChecklistRelationsMock />;
    // Окно Кайтена с боковым меню: разделы по очереди сменяют друг друга. 696px, ужимает MockFit.
    case 'platform-slider':
      return <PlatformSliderMock />;
    // Пять модулей платформы плитками (чаты, документы, дашборды, встречи, поддержка). 1216px, ужимает MockFit.
    case 'modules-collage':
      return <ModulesCollageMock />;
    case 'board-signals':
      return <BoardSignalsMock />;
    case 'excel-import':
      return <ExcelImportMock />;
    // Пара планшетов (сторонний сервис + Кайтен) — резиновая, пропорция 1800:717.
    case 'tablet-pair':
      return <TabletPairMock />;
    case 'on-premise':
      return <OnPremise />;
    default:
      return null;
  }
}
