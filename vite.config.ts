/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'modules',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        react: resolve(__dirname, 'src/query/react.ts'),
        process: resolve(__dirname, 'src/process/index.ts'),
      },
      name: 'AmnisApi',
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
        '@amnis/state/schema',
        '@amnis/state/validate',
        'react',
        'react-dom',
        'react-redux',
      ],
    },
  },
  test: {
    globals: true,
    testTimeout: 10000,
  },
});
