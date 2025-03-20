import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Proxy all requests starting with /api
        target: 'https://youtube-backend-ubrc.onrender.com/',
        changeOrigin: true,
        secure: true,
        ws: true 
      },
    },
  },
});

