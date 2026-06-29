import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "copy-seo-files",
      apply: "build",
      enforce: "post",
      generateBundle() {
        // Copy robots.txt and sitemap.xml to dist
        const publicDir = path.resolve(__dirname, "public");
        const distDir = path.resolve(__dirname, "dist");

        // Ensure dist directory exists
        if (!fs.existsSync(distDir)) {
          fs.mkdirSync(distDir, { recursive: true });
        }

        // Copy robots.txt
        const robotsPath = path.join(publicDir, "robots.txt");
        if (fs.existsSync(robotsPath)) {
          const robotsContent = fs.readFileSync(robotsPath, "utf-8");
          this.emitFile({
            type: "asset",
            fileName: "robots.txt",
            source: robotsContent,
          });
        }

        // Copy sitemap.xml
        const sitemapPath = path.join(publicDir, "sitemap.xml");
        if (fs.existsSync(sitemapPath)) {
          const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
          this.emitFile({
            type: "asset",
            fileName: "sitemap.xml",
            source: sitemapContent,
          });
        }

        // Copy 404.html for GitHub Pages SPA routing
        const notFoundPath = path.join(publicDir, "404.html");
        if (fs.existsSync(notFoundPath)) {
          const notFoundContent = fs.readFileSync(notFoundPath, "utf-8");
          this.emitFile({
            type: "asset",
            fileName: "404.html",
            source: notFoundContent,
          });
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ensure index.html is treated as entry point
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
    },
  },
});
