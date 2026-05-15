import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { test, expect } from '@playwright/test';

/**
 * Visual regression по всем спекам из content/landings/.
 * Каждый slug = свой тест → свой baseline.
 */
const repoRoot = resolve(__dirname, '..', '..', '..', '..');
const landingsDir = resolve(repoRoot, 'content', 'landings');

function listSlugs(): string[] {
  try {
    return readdirSync(landingsDir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''));
  } catch {
    return [];
  }
}

const slugs = listSlugs();

if (slugs.length === 0) {
  test('no landings found — placeholder', () => {
    test.skip(true, `content/landings пуст; разместите spec и перезапустите. (искал в ${landingsDir})`);
  });
} else {
  for (const slug of slugs) {
    test(`visual: ${slug}`, async ({ page }) => {
      await page.goto(`/landings/${slug}`, { waitUntil: 'networkidle' });
      // Дополнительная стабилизация: ждём, пока шрифты не догрузятся.
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(`${slug}-desktop.png`, { fullPage: true });
    });
  }
}
