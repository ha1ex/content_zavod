import type { Meta, StoryObj } from '@storybook/react';
import KaitenHeroDashboard from './KaitenHeroDashboard';

const meta: Meta<typeof KaitenHeroDashboard> = {
  title: 'Illustrations/KaitenHeroDashboard',
  component: KaitenHeroDashboard,
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Light: StoryObj<typeof KaitenHeroDashboard> = {
  render: () => (
    <div className="bg-white p-8">
      <KaitenHeroDashboard className="w-full max-w-5xl mx-auto" />
    </div>
  ),
};

export const Dark: StoryObj<typeof KaitenHeroDashboard> = {
  render: () => (
    <div className="dark bg-slate-950 p-8">
      <KaitenHeroDashboard className="w-full max-w-5xl mx-auto" />
    </div>
  ),
};
