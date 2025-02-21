import { defineConfig } from "vite";

export default defineConfig({
  base: "/phaser_game",
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
  },
});
