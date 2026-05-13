import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: process.env.SITE_URL || 'https://ai-florist-coach-blog.vercel.app',
  output: 'static',
  adapter: vercel(),
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
  },
});
