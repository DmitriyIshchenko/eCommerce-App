/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    assetsInlineLimit: 100000000,
    rollupOptions: {
      output: {
        assetFileNames: 'index.[ext]',
        entryFileNames: 'index.js',
      }
    }
  },
  base: "/",
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['src/setupTest.ts']
  }
});