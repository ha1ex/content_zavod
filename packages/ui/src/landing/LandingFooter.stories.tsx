import type { Meta, StoryObj } from '@storybook/react';
import { LandingFooter } from './LandingFooter';

const meta: Meta<typeof LandingFooter> = {
  title: 'Landing/LandingFooter',
  component: LandingFooter,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof LandingFooter>;

export const Default: Story = {
  args: {
    brandName: 'Контент-завод Кайтен',
    brandTagline: 'AI harness для генерации лендингов в вашей дизайн-системе.',
    columns: [
      {
        title: 'Продукт',
        links: [
          { label: 'Возможности', href: '/features' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Changelog', href: '/changelog' },
        ],
      },
      {
        title: 'Команда',
        links: [
          { label: 'О нас', href: '/about' },
          { label: 'Контакты', href: '/contact' },
        ],
      },
    ],
  },
};
