import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/main.tsx'],
      refresh: true,
    }),
    react(),
    tailwindcss(),
  ],

  server: {
    host: '0.0.0.0', // Docker対応
    port: 5173, // .envから制御
    strictPort: false, // 競合時は自動でフォールバック
    hmr: {
      host: 'localhost',
    },
    watch: {
      usePolling: true,
    },
  },
  optimizeDeps: {
    include: ['react-datepicker', 'date-fns'], // 依存CSS読み込みエラー防止
  },
  build: {
    rollupOptions: {
      input: 'resources/js/main.tsx',
      // external: ['.ai-config.json', '.project-root'],
    },
  },
  
});
