import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["lucide-react"],
  },
  server: {
    proxy: {
      /*
      "/api": {
        target: "https://mixmix2.store",
        changeOrigin: true,
        secure: false,
      },*/
    },
    historyApiFallback: true,
  },
});
