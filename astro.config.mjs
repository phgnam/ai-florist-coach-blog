import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vuon-hoa.replit.app',
  integrations: [mdx(), sitemap()],
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
