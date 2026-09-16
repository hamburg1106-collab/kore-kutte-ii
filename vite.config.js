import { defineConfig } from "vite";

export default defineConfig({
  // "./" にしておくと、GitHub Pages のどのURLに置いても
  // CSS/JS の読み込みパスがずれない。
  base: "./",
  build: {
    outDir: "dist",

    /* Firebaseはアプリ本体の何十倍も大きいので、別ファイルに切り出す。
       こうしておくと、アプリを直しても変わるのは小さい方のファイルだけになり、
       利用者は毎回Firebaseを落とし直さずに済む（ブラウザのキャッシュが効く）。 */
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/firebase") || id.includes("node_modules/@firebase")) {
            return "firebase";
          }
        },
      },
    },

    // 分割後もFirebase側は500kBを超えるので、意味のない警告を止めておく
    chunkSizeWarningLimit: 800,
  },
  server: {
    // スマホの実機で確認したいとき、同じWi-Fiから開けるようにする
    host: true,
  },
});
