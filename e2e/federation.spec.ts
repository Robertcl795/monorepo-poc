import { test, expect } from '@playwright/test';

test.describe('Native Federation routing', () => {
  test('loads editor and deep linked challenger route', async ({ page }) => {
    await page.goto('/editor');
    await expect(page.getByText('Editor Remote')).toBeVisible();

    await page.goto('/challenger/week/2026-01-20');
    await expect(page.getByText('Week of 2026-01-20')).toBeVisible();
    await expect(page.getByText('Challenger Remote')).toBeVisible();
  });
});
