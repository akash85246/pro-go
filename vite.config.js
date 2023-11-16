import React from "@vitejs/plugin-react";
import ChakraUiResolver from "@chakra-ui/vite-plugin";

export default {
  plugins: [React(), ChakraUiResolver()],
  build: {
    rollupOptions: {
      external: ["react-toastify"],
    },
  },
  server: {
    host: "0.0.0.0",
  },
};
