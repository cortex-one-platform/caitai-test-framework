import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/core/setup.js'],
    globals: true,
    exclude: [
      'node_modules/**',
      'dist/**',
      '**/*.d.ts',
      'src/templates/**', // Exclude template files from test runs
      'examples/**' // Exclude example files from test runs
    ],
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ]
  },
});
