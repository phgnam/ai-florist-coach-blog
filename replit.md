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

## Design System — "Petal & Ivory" (Direction A)

- **Color palette**: Blush pink (`#E8A4B0`), dusty rose (`#C47A8A`), ivory cream (`#FAF5EE`), petal mist (`#F5E6EA`), deep mauve (`#4A2D35`), warm taupe (`#9E8A80`), rose doré gold (`#C8956A`)
- **Typography**: Cormorant Garamond (serif, headings/hero, wght 300/400/600) + Jost (body, wght 300/400/500) — Google Fonts
- **CSS tokens**: `--blush`, `--blush-dark`, `--blush-light`, `--blush-mid`, `--ivory`, `--ivory-dark`, `--petal-mist`, `--mauve`, `--mauve-mid`, `--taupe`, `--gold`, `--gold-light`
- **Hero**: Soft blush pink gradient (`#FDF0F2 → #F5E6EA → #EDA8B8`) — light & airy, no dark backgrounds
- **Header**: Fully transparent over hero, ivory glassmorphism on scroll, all text in mauve tones
- **Footer**: Deep mauve (`#4A2D35`) background replacing old forest green
- **Page headers**: Blush gradient on all inner pages (posts, tags, about)
- **Post hero**: Blush gradient with mauve text overlay (replaces dark green)
- **Cards**: White cards with rose-pink hover shadow, mauve titles, blush-dark CTA links
- **Buttons**: Pill-shaped (`border-radius: 999px`), blush-dark primary, ghost with blush border
- **Tag hover**: Blush-dark fill replacing old green-deep fill
- **Animations**: `fadeUp`, `floatPetal`, `petalDrift` for decorative elements
- **Texture**: Subtle SVG noise overlay on `body::before`, reduced opacity for lightness

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
