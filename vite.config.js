import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["react-toastify"],
    },
  },
  server: {
    host: "0.0.0.0",
  },
});
