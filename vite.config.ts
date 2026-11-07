/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const DAY = 60 * 60 * 24;
const APP_BG = "#0E1116";

// https://vite.dev/config/
export default defineConfig({
  define: {
    "process.env": {}, // This prevents the "process is not defined" error
  },
  build: {
    outDir: "build",
  },
  plugins: [
    react(),
    // Installable app + offline support. The service worker only runs in a
    // production build (npm run build && npm run preview), not in npm run dev
    VitePWA({
      // A new version waits until the player chooses to reload (see
      // components/UI/UpdatePrompt), so it never reloads mid-battle
      registerType: "prompt",
      includeAssets: ["favicon.ico", "favicon.svg", "apple-touch-icon.png"],
      manifest: {
        id: "/",
        name: "Eternal Battle",
        short_name: "Eternal Battle",
        description:
          "A hero vs villain card game. Build your hand, battle the computer over five rounds and browse every character in the Herodex.",
        lang: "en",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: APP_BG,
        background_color: APP_BG,
        categories: ["games", "entertainment"],
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // App shell, icons and the hero data are cached at install, so the
        // game and the Herodex work offline
        globPatterns: ["**/*.{js,css,html,svg,png,ico,webp,woff2,json}"],
        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: { cacheName: "google-fonts-stylesheets" },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 30, maxAgeSeconds: 365 * DAY },
            },
          },
          {
            // Character art. Images load without CORS, so the responses are
            // opaque and count heavily against storage; keep the cache small
            urlPattern:
              /^https:\/\/cdn\.jsdelivr\.net\/gh\/akabab\/superhero-api.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "hero-images",
              cacheableResponse: { statuses: [0, 200] },
              expiration: {
                maxEntries: 300,
                maxAgeSeconds: 30 * DAY,
                purgeOnQuotaError: true,
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
