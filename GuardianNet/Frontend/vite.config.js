import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config for GuardianNet frontend.
// The dev server proxies /api calls to the backend so the frontend
// can always call relative paths (e.g. axios.get('/api/auth/login'))
// without worrying about the backend's host/port in development.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
