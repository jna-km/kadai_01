import { defineConfig } from 'vitest/config';
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // @はresources/js配下を指す
      "@": path.resolve(__dirname, "resources/js"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    // setupTests.tsも絶対パス指定で揺れ防止
    setupFiles: [path.resolve(__dirname, "tests/js/setupTests.ts")],
    // ts, tsx, js, jsx 全部拾えるよう拡張
    include: ["tests/js/**/*.test.{ts,tsx,js,jsx}"],
    css: true,
    testTimeout: 20000,
    coverage: {
      provider: 'v8',                    // カバレッジ取得用プロバイダー
      reporter: ['text', 'html'],        // コンソールとHTMLレポート両方
      reportsDirectory: 'coverage-vitest', // レポートの出力ディレクトリ
      include: ['resources/js/**/*.{ts,tsx,js,jsx}'], 
      exclude: [
        'node_modules/**',
        // その他除外したいファイルやフォルダ
      ],
      all: true,                        // 全ファイルを対象に（テストしてないファイルも）
    },

  },
});
