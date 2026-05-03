import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vuon-hoa.replit.app',
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          vi: 'vi-VN',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    server: {
      allowedHosts: true,
    },
    resolve: {
      alias: {
        '@assets': '/attached_assets',
      },
    },
  },
});
