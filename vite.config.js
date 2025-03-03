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

// TODO: Use this one for itch.io
// export default defineConfig({
//   base: "./",
//   build: {
//     outDir: "dist",
//   },
// });
