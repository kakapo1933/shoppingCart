import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: path.resolve(__dirname),
  test: {
    globals: true,
    environment: 'jsdom',
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [react()],
});
