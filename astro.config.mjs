// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// NOTE: `site` is the canonical origin used for sitemap + <link rel="canonical">.
// Change this one value when you deploy to your real domain.
export default defineConfig({
  site: 'https://mdkutubislam.com',
  integrations: [sitemap()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
