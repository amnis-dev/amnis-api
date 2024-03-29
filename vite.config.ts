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
        schema: resolve(__dirname, 'src/schema/index.ts'),
      },
      name: 'AmnisApi',
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          '@reduxjs/toolkit': 'ReduxToolkit',
          '@reduxjs/toolkit/query': 'ReduxToolkitQuery',
          '@reduxjs/toolkit/query/react': 'ReduxToolkitQueryReact',
          '@amnis/state': 'AmnisState',
          '@amnis/state/schema': 'AmnisStateSchema',
          '@amnis/state/context': 'AmnisStateContext',
        },
      },
      external: [
        '@reduxjs/toolkit',
        '@reduxjs/toolkit/query',
        '@reduxjs/toolkit/query/react',
        '@amnis/state',
        '@amnis/state/schema',
        '@amnis/state/context',
        'react',
        'react-dom',
        'react-redux',
      ],
    },
  },
  test: {
    globals: true,
    testTimeout: 1000000,
  },
});
