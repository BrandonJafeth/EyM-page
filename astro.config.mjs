// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://emyasociados.net',
  output: 'static',
  adapter: vercel(),
  
  // Redirecciones 301 para URLs antiguas
  redirects: {
    '/about-7151': '/sobre-nosotros',
    '/about': '/sobre-nosotros',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});