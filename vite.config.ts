import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/main.tsx'],
      refresh: true,
    }),
    react(),
  ],
  // ↓↓↓ この server セクションを追記します ↓↓↓
  server: {
    host: true, // コンテナの外からのアクセスを許可するために '0.0.0.0' をリッスンする
    port: 5173, // コンテナ内でリッスンするポート
    hmr: {
      host: 'localhost', // ブラウザが接続しにくるホスト名
    },
  },
});
