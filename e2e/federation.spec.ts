import { test, expect } from '@playwright/test';

test.describe('Native Federation routing', () => {
  test('loads editor and deep linked vs route', async ({ page }) => {
    await page.goto('/editor');
    await expect(page.getByText('Editor Remote')).toBeVisible();

    await page.goto('/vs');
    await expect(page.getByText('VS Remote')).toBeVisible();
  });

  test('navigates into conv remote', async ({ page }) => {
    await page.goto('/conv');
    await expect(page.getByText('Conv Remote')).toBeVisible();
  });
});
