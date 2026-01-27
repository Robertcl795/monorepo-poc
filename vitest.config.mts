/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path from 'path';
import angular from '@analogjs/vite-plugin-angular';
import monaco from 'vite-plugin-monaco-editor';

export default defineConfig({
  plugins: [
    angular({
      tsconfig: path.resolve(__dirname, 'tsconfig.vitest.json'),
    }),
    monaco(),
  ],
  resolve: {
    alias: {
      '@rocker-code/shared': path.resolve(__dirname, 'libs/shared/src/public-api.ts'),
      '@rocker-code/theme': path.resolve(__dirname, 'libs/theme/src/public-api.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['vitest.setup.ts'],
    include: ['apps/**/*.{spec,test}.ts', 'libs/**/*.{spec,test}.ts'],
    coverage: {
      provider: 'v8',
    },
  },
});
