/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const srcDir = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Short imports like `components/Stage` or `lib/vm` resolve from src/
      // (same as `baseUrl: "src"` in tsconfig.json).
      { find: /^(components|lib|state)\//, replacement: `${srcDir}/$1/` },
    ],
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    // Keep the same output folder as Create React App.
    outDir: 'build',
    sourcemap: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/setupTests.ts'],
    // Only unit tests in src/ (e2e/ has its own runner).
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
