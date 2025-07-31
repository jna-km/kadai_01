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
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: false,
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
