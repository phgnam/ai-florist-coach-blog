# Vườn Hoa — AI Florist Coach Blog

Static blog about flowers built with Astro 6, MDX, TailwindCSS v3, and Pagefind for client-side search.

## Stack

- **Astro 6** (static output) with Node.js 22
- **MDX** (`@astrojs/mdx`) for rich post authoring
- **TailwindCSS v3** via PostCSS + `@tailwindcss/typography`
- **`@astrojs/sitemap`** — `/sitemap-index.xml`
- **`@astrojs/rss`** — `/rss.xml`
- **Pagefind** — static, client-side search index built from `dist/`
- **Giscus** — opt-in GitHub Discussions–based comments

## Running the Project

```bash
npm run dev        # Dev server on port 5000 (0.0.0.0)
npm run build      # astro build && pagefind --site dist
npm run build:astro    # Astro build only
npm run build:search   # Re-run Pagefind index against existing dist/
npm run preview    # Serve dist/ locally
```

## Project Layout

```
├── astro.config.mjs         # Integrations, site URL, Vite config
├── tailwind.config.cjs      # Tailwind v3 + typography plugin
├── postcss.config.cjs       # PostCSS with Tailwind + autoprefixer
├── src/
│   ├── consts.ts            # Site title, description, Giscus config
│   ├── content.config.ts    # `posts` collection schema (Zod + glob loader)
│   ├── styles/global.css    # Tailwind entry
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogPostLayout.astro
│   ├── components/
│   │   ├── Header.astro / Footer.astro
│   │   ├── PostCard.astro / TagList.astro / FormattedDate.astro
│   │   ├── FlowerGallery.astro
│   │   ├── SEO.astro
│   │   ├── Search.astro      # Pagefind UI (only works after build)
│   │   └── Giscus.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── posts/index.astro + [...slug].astro
│   │   ├── tags/index.astro + [tag].astro
│   │   └── rss.xml.js
│   └── content/posts/*.mdx   # Blog posts
└── public/
    ├── favicon.svg
    └── robots.txt
```

## Design System — "Botanical Luxury"

- **Color palette**: Deep forest green (`#1a3028`), warm cream (`#fdf8f0`), dusty rose (`#c4697e`), amber gold (`#b8935a`)
- **Typography**: Playfair Display (serif, headings/hero) + Lato (body) loaded from Google Fonts
- **Hero pattern**: All pages use a dark forest green gradient hero that fades into the cream content area via a CSS gradient
- **Header**: Transparent over hero, glassmorphism dark green on scroll — JS-driven
- **Cards**: Magazine-style with category badge overlay, smooth `translateY` hover lift
- **Blog posts**: Full-bleed dark hero, reading progress bar (gradient rose→gold), warm cream article area
- **Animations**: `fadeUp` keyframe with staggered delays, `floatPetal` for decorative elements
- **Texture**: Subtle SVG noise overlay on `body::before` for depth

## Key Notes

- **Astro 6 content layer**: Uses `glob` loader from `astro/loaders` in `content.config.ts` (required for Astro 6, unlike older `type: 'content'` collections).
- **TailwindCSS v4 incompatible**: `@tailwindcss/vite` v4 conflicts with Vite 8/rolldown used by Astro 6. Using TailwindCSS v3 with PostCSS instead.
- **Pagefind search**: Only works after `npm run build` (not in dev mode).
- **Giscus comments**: Disabled by default; configure IDs in `src/consts.ts`.
- **Port**: Always 5000 on 0.0.0.0 for Replit preview.

## Adding a Blog Post

Create `src/content/posts/<slug>.mdx`:

```mdx
---
title: 'Tiêu đề'
description: 'Mô tả ngắn'
pubDate: 2026-05-01
tags: ['tag1', 'tag2']
author: 'Tên tác giả'
draft: false
---

Nội dung bài viết...
```

## Deployment

Static site deployment — builds with `npm run build:astro`, serves from `dist/`.
