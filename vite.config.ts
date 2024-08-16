/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    testTimeout: 10000,
    setupFiles: 'src/tests/setup.ts',
  },
  base: '/Weather-Explorer/',
  resolve: {
    alias: {
      src: '/src'
    }
  }
});
