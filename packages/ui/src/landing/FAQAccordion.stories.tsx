import type { Meta, StoryObj } from '@storybook/react';
import { FAQAccordion } from './FAQAccordion.js';

const meta: Meta<typeof FAQAccordion> = {
  title: 'Landing/FAQAccordion',
  component: FAQAccordion,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof FAQAccordion>;

export const Default: Story = {
  args: {
    title: 'Частые вопросы',
    items: [
      { question: 'Это просто обёртка над ChatGPT?', answer: 'Нет. Контур вокруг LLM с registry, валидаторами и repair-loop.' },
      { question: 'Можно использовать свой LLM?', answer: 'Да — провайдер переключается через AI_PROVIDER. По умолчанию через Vercel AI Gateway.' },
      { question: 'Куда уходит готовый лендинг?', answer: 'В ZIP — TSX + spec + manifest. Разработчики тянут к себе в репо.' },
    ],
  },
};
