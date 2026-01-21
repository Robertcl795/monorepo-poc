import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:4200',
    headless: true,
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:4200',
    reuseExistingServer: true,
    timeout: 240_000,
  },
});
