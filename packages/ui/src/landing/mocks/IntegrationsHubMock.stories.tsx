import type { Meta, StoryObj } from '@storybook/react';
import { IntegrationsHubMock } from './IntegrationsHubMock';
import { ScaleToFit } from './ScaleToFit';

const meta: Meta<typeof IntegrationsHubMock> = {
  title: 'Mocks/IntegrationsHubMock',
  component: IntegrationsHubMock,
  parameters: { layout: 'fullscreen' },
};

export default meta;

/** Исходный размер холста 1440×580. */
export const Original: StoryObj<typeof IntegrationsHubMock> = {
  render: () => (
    <div className="bg-white p-8">
      <IntegrationsHubMock />
    </div>
  ),
};

/** Как мок ведёт себя в узком слоте (MediaCopy) — через ScaleToFit. */
export const Scaled: StoryObj<typeof IntegrationsHubMock> = {
  render: () => (
    <div className="bg-white p-8">
      <div className="w-[640px] overflow-hidden">
        <ScaleToFit designWidth={1440}>
          <IntegrationsHubMock />
        </ScaleToFit>
      </div>
    </div>
  ),
};
