/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: 'jsdom',
    testTimeout: 10000,
    setupFiles: 'src/tests/setup.ts',
    // alias: [{find: '/^@visx/scale$/', replacement: '@visx/scale/esm/index.js'}]
  },
  base: '/Weather-Explorer/',
  resolve: {
    alias: {
      src: '/src'
    }
  },
});
