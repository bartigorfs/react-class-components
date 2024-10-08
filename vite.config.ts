import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/core/components'),
      '@api': path.resolve(__dirname, './src/core/api'),
      '@utils': path.resolve(__dirname, './src/core/utils'),
      '@routes': path.resolve(__dirname, './src/core/routes'),
      '@hooks': path.resolve(__dirname, './src/core/hooks'),
      '@ctx': path.resolve(__dirname, './src/core/ctx'),
      '@providers': path.resolve(__dirname, './src/core/providers'),
      '@store': path.resolve(__dirname, './src/core/store'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTesting.ts'],
    mockReset: true,
    testTimeout: 1000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
