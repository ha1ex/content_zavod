import { MockVisual, type MockVariant } from '@buffalo/ui/landing/mocks';

const DOMAIN_GROUPS: Array<{ domain: string; variants: MockVariant[] }> = [
  {
    domain: 'PM · Project Management',
    variants: ['pm-board', 'analytics-kpi', 'integrations-console', 'modules-matrix'],
  },
  {
    domain: 'Support · Service Desk',
    variants: ['support-board', 'request-card', 'kb-public', 'kb-internal'],
  },
  {
    domain: 'CRM · Sales',
    variants: [
      'sales-funnel',
      'crm-client-card',
      'omnichannel-inbox',
      'call-overlay',
      'booking-calendar',
      'crm-analytics',
      'doc-template',
      'mobile-crm',
    ],
  },
  {
    domain: 'HR · Recruiting',
    variants: [
      'hiring-pipeline',
      'candidate-card',
      'onboarding-checklist',
      'org-chart',
      'performance-review',
    ],
  },
  {
    domain: 'Marketing automation',
    variants: ['campaign-dashboard', 'email-sequence', 'ab-test-results', 'audience-segments'],
  },
  {
    domain: 'BPM · Workflow',
    variants: ['process-flowchart', 'approval-chain', 'sla-tracker'],
  },
  {
    domain: 'Finance · Accounting',
    variants: ['ledger-view', 'invoice-status', 'reconciliation-matrix'],
  },
  {
    domain: 'E-commerce · Retail',
    variants: ['order-queue', 'inventory-grid', 'marketplace-connector'],
  },
  {
    domain: 'Docs · Knowledge base',
    variants: [
      'docs-tree',
      'permissions-panel',
      'share-link-card',
      'doc-editor-rich',
      'template-gallery',
      'mobile-doc-reader',
    ],
  },
];

export function MockCatalog() {
  return (
    <div className="space-y-10">
      {DOMAIN_GROUPS.map(({ domain, variants }) => (
        <section key={domain} id={`domain-${domain.split(' ')[0]?.toLowerCase()}`} className="space-y-4">
          <header className="flex items-baseline gap-3 border-b border-(--color-border-default) pb-2">
            <h3 className="text-lg font-semibold text-(--color-text-primary)">{domain}</h3>
            <span className="text-sm text-(--color-text-secondary)">{variants.length} mocks</span>
          </header>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {variants.map((variant) => (
              <figure
                key={variant}
                className="overflow-hidden rounded-(--radius-2xl) border border-(--color-border-default) bg-(--color-surface-card)"
              >
                <figcaption className="flex items-center justify-between border-b border-(--color-border-default) bg-(--color-surface-section) px-4 py-2">
                  <code className="text-sm font-medium text-(--color-text-accent)">{variant}</code>
                  <span className="text-xs text-(--color-text-secondary)">{domain.split(' ')[0]}</span>
                </figcaption>
                <div className="p-4">
                  <MockVisual variant={variant} />
                </div>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
