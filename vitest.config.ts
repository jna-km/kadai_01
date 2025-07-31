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
    exclude: [
      // 他に除外したいファイル・フォルダをここに追加可能
    ],
  },
});
