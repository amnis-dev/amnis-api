/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'modules',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AmnisProcess',
      fileName: 'index',
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          '@reduxjs/toolkit': 'ReduxToolkit',
          '@amnis/state': 'AmnisState',
        },
      },
      external: [
        '@reduxjs/toolkit',
        '@amnis/state',
      ],
    },
  },
  test: {
    globals: true,
    testTimeout: 10000,
  },
});
