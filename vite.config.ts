import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      usePolling: true,
    },
    https: {
      key: "./key.pem",
      cert: "./cert.pem",
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
});
