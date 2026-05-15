import type { Meta, StoryObj } from '@storybook/react';
import { FinalCta } from './FinalCta.js';

const meta: Meta<typeof FinalCta> = {
  title: 'Landing/FinalCta',
  component: FinalCta,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof FinalCta>;

export const SinglePrimary: Story = {
  args: {
    title: 'Сэкономьте неделю на следующем лендинге',
    description: 'Бриф → готовый TSX за минуту. Получите доступ к закрытой beta.',
    primaryCta: { label: 'Записаться в beta', href: '/beta' },
  },
};

export const WithSecondary: Story = {
  args: {
    title: 'Готовы попробовать?',
    primaryCta: { label: 'Начать бесплатно', href: '/signup' },
    secondaryCta: { label: 'Демо с командой', href: '/demo' },
  },
};
