import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src/lib", "src/index.ts", "src/vite-env.d.ts"],
      insertTypesEntry: true
    })
  ],
  css: {
    postcss: "./postcss.config.cjs"
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "OdontogramView",
      cssFileName: "styles",
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ["react", "react-dom"]
    },
    sourcemap: true
  }
});
