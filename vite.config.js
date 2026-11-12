import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: false,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4000",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://127.0.0.1:4000",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three") || id.includes("@react-three")) {
            return "vendor-three";
          }
          if (id.includes("node_modules/gsap") || id.includes("framer-motion")) {
            return "vendor-motion";
          }
          if (id.includes("react-router-dom")) {
            return "vendor-router";
          }
          if (id.includes("@supabase")) {
            return "vendor-supabase";
          }
        },
      },
    },
  },
});
