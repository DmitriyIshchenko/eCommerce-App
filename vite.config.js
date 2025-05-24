/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({ target: 'react', autoCodeSplitting: true }), react()],
  build: {
    assetsInlineLimit: 100000000,
    rollupOptions: {
      output: {
        assetFileNames: 'index.[ext]',
        entryFileNames: 'index.js',
      },
    },
  },
  base: '/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['/vitest.setup.ts'],
  },
});
