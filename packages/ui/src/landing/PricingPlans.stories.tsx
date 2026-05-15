import type { Meta, StoryObj } from '@storybook/react';
import { PricingPlans } from './PricingPlans';

const meta: Meta<typeof PricingPlans> = {
  title: 'Landing/PricingPlans',
  component: PricingPlans,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof PricingPlans>;

export const ThreeTiers: Story = {
  args: {
    title: 'Понятный pricing',
    description: 'Платите за принятые лендинги, не за попытки.',
    plans: [
      {
        name: 'Starter',
        price: '$0',
        pricePeriod: 'месяц',
        features: ['3 черновика', 'Базовый registry', 'Manual handoff'],
        cta: { label: 'Начать бесплатно', href: '/signup' },
      },
      {
        name: 'Team',
        price: '$49',
        pricePeriod: 'месяц',
        features: ['Безлимит', 'Approve UI', 'SVG hero', 'Repair-loop'],
        cta: { label: 'Получить демо', href: '/demo' },
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'По запросу',
        features: ['Self-host', 'SSO', 'Audit log', 'SLA'],
        cta: { label: 'Связаться', href: '/contact' },
      },
    ],
  },
};
