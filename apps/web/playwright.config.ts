import { defineConfig, devices } from '@playwright/test';

/**
 * Visual regression (этап 5).
 *
 * Прогоняем сгенерированные лендинги в одинаковом desktop-viewport, делаем
 * полностраничные скриншоты и сравниваем с baseline'ом в
 * tests/visual/__snapshots__/<slug>-*.png. Любая правка спека → ребейзлайн
 * через `pnpm --filter @kaiten/web test:visual -- --update-snapshots`.
 */
export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: false,
  retries: 0,
  reporter: [['list']],
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
      caret: 'hide',
    },
  },
  use: {
    baseURL: 'http://localhost:3000',
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
