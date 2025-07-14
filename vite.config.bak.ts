import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
// import react from '@vitejs/plugin-react-swc'; // もしくは plugin-react

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/main.jsx',
      refresh: true,
    }),
    react(),
  ],
  server: {
    host: true, // ←これが重要
    port: 5173,
    hmr: {
      host: 'localhost',
      port: 5173, // 明示的に指定
    },
  },
});
