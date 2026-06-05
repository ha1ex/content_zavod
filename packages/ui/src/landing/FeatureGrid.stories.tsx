import type { Meta, StoryObj } from '@storybook/react';
import { FeatureGrid } from './FeatureGrid';

const meta: Meta<typeof FeatureGrid> = {
  title: 'Landing/FeatureGrid',
  component: FeatureGrid,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof FeatureGrid>;

export const Three: Story = {
  args: {
    eyebrow: 'Почему Контент-завод Кайтен',
    title: 'Лендинги, которые остаются в вашем бренде',
    description: 'Никаких выдуманных компонентов и hype-копирайта.',
    columns: 3,
    items: [
      { icon: 'Sparkles', title: 'На ваших компонентах', description: 'Модель собирает страницу из утверждённого Storybook-каталога.' },
      { icon: 'Shield', title: 'Tone of voice', description: 'Brand-валидатор отлавливает запрещённые слова и неподтверждённые обещания.' },
      { icon: 'Zap', title: 'Repair-loop', description: 'Модель исправляет именно проблемные секции, а не переписывает всё.' },
    ],
  },
};
