import { defineConfig } from "vite";

export default defineConfig({
  // "./" にしておくと、GitHub Pages のどのURLに置いても
  // CSS/JS の読み込みパスがずれない。
  base: "./",
  build: {
    outDir: "dist",
  },
  server: {
    // スマホの実機で確認したいとき、同じWi-Fiから開けるようにする
    host: true,
  },
});
