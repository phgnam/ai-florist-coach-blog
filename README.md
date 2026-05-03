# Vườn Hoa — AI Florist Coach Blog

Static blog about flowers built with [Astro](https://astro.build), MDX, TailwindCSS v4, and [Pagefind](https://pagefind.app) for client-side search. Companion site to the AI Florist Coach app.

## Stack

- Astro 6 (static output)
- MDX (`@astrojs/mdx`) for rich post authoring
- TailwindCSS v4 via the official Vite plugin (`@tailwindcss/vite`) + `@tailwindcss/typography`
- `@astrojs/sitemap` — `/sitemap-index.xml`
- `@astrojs/rss` — `/rss.xml`
- Pagefind — static, client-side search index built from `dist/`
- Giscus — opt-in GitHub Discussions–based comments

## Scripts

```bash
npm install        # install once

npm run dev        # Astro dev server on http://localhost:4321
npm run build      # astro build && pagefind --site dist
npm run build:astro    # Astro build only
npm run build:search   # Re-run Pagefind index against existing dist/
npm run preview    # serve dist/ locally
```

The combined `npm run build` is what production uses — it generates the Pagefind index after Astro outputs `dist/`. The `<Search />` component lazy-loads `/pagefind/pagefind-ui.js` from the built site, so search **only works on `npm run preview` or production**, not in `npm run dev`.

## Project layout

```
blog/
├── astro.config.mjs       # Integrations, site URL, Vite plugins
├── src/
│   ├── consts.ts          # Site title, description, Giscus config
│   ├── content.config.ts  # `posts` collection schema (Zod)
│   ├── styles/global.css  # Tailwind v4 entry + theme tokens
│   ├── layouts/
│   │   ├── BaseLayout.astro     # HTML shell + SEO + Header/Footer
│   │   └── BlogPostLayout.astro # Article shell + JSON-LD + Giscus
│   ├── components/
│   │   ├── Header.astro / Footer.astro
│   │   ├── PostCard.astro / TagList.astro / FormattedDate.astro
│   │   ├── FlowerGallery.astro  # Use inside MDX posts
│   │   ├── SEO.astro            # Meta + OG + Twitter + JSON-LD
│   │   ├── Search.astro         # Pagefind UI dialog
│   │   └── Giscus.astro         # Comments (gated on consts.ts placeholders)
│   ├── pages/
│   │   ├── index.astro          # Hero + featured + recent + tag cloud
│   │   ├── about.astro
│   │   ├── posts/
│   │   │   ├── index.astro      # All posts grid
│   │   │   └── [...slug].astro  # Per-post route
│   │   ├── tags/
│   │   │   ├── index.astro      # All tags
│   │   │   └── [tag].astro      # Posts filtered by tag
│   │   └── rss.xml.js
│   └── content/posts/*.mdx       # The actual blog posts
└── public/
    ├── favicon.svg / favicon.ico
    └── robots.txt
```

## Adding a post

> **MANDATORY:** Every new article MUST follow [`docs/seo-aeo-playbook.md`](./docs/seo-aeo-playbook.md). No exceptions.
>
> Before writing, confirm:
> - Topic comes from **Google Search Console** impression data (no intuition picks).
> - Title is a specific long-tail **question** (not a broad "ultimate guide").
> - First section is a **Quick Answer** block (40–60 words) directly answering the title question.
> - All H2 headings are phrased as questions.
> - Article emits `Article` + `FAQPage` JSON-LD; FAQ section mirrors the schema.
> - **At least one impressive, on-topic image** — preferably set as `heroImage` in frontmatter so it powers the hero, the OG share card, and the Twitter card. See the playbook's "Visual requirements" section.
> - After publish: ping IndexNow and request indexing in GSC.
>
> Skipping any of the above is a defect — see the playbook's "What NOT to Do" section.

Create `src/content/posts/<slug>.mdx`:

```mdx
---
title: 'Tiêu đề bài viết'
description: 'Mô tả ngắn cho meta description và OG.'
pubDate: 2026-05-01
heroImage: '../../assets/your-image.jpg'
heroAlt: 'Mô tả ảnh cho người dùng screen reader'
tags: ['hoa hồng', 'chăm sóc']
author: 'Tên tác giả'
draft: false
---

import FlowerGallery from '../../components/FlowerGallery.astro';
import flowerOne from '../../assets/your-image.jpg';

Nội dung bài viết bằng Markdown + JSX...

<FlowerGallery items={[{ src: flowerOne, alt: 'caption', caption: 'Caption' }]} />
```

Set `draft: true` to keep a post out of the build, RSS feed, and sitemap.

## Enabling comments

Giscus is included but disabled until you provide IDs. The `<Giscus />` component renders a placeholder note if `repoId` or `categoryId` is still set to its placeholder value.

1. Enable Discussions on the GitHub repo (`Settings → General → Features → Discussions`).
2. Create a category — e.g. "Blog comments" — with the "Announcements" template recommended by giscus.
3. Visit https://giscus.app, fill the form, and copy `data-repo-id` + `data-category-id`.
4. Edit `src/consts.ts`, replacing `REPLACE_WITH_REPO_ID` and `REPLACE_WITH_CATEGORY_ID`.

## SEO checklist

> Authoritative rule: [`docs/seo-aeo-playbook.md`](./docs/seo-aeo-playbook.md). The list below is the **technical** baseline only — content/AEO requirements live in the playbook.

- `<title>`, `<meta description>`, canonical, OG, Twitter Card — all in `src/components/SEO.astro`.
- JSON-LD: homepage emits `Blog`, every post emits `BlogPosting` (with author, dates, image, keywords). Articles MUST also emit `FAQPage` per the playbook.
- Sitemap: `/sitemap-index.xml` (excludes drafts).
- RSS: `/rss.xml`.
- `public/robots.txt` references the sitemap.
- `llms.txt` at site root for AEO (LLM crawlers).
- Performance budget: PageSpeed desktop ≥ 95, mobile LCP ≤ 1.0s target.

## Search (Pagefind)

`Search.astro` renders a `<dialog>` and lazy-loads `/pagefind/pagefind-ui.js` only when the user opens it, so the homepage payload stays small. The search index is generated by `pagefind --site dist` as part of `npm run build`. To re-index without rebuilding the whole site (e.g. in CI when only content changed), run `npm run build:search`.

Vietnamese stemming is not yet supported by Pagefind — searches still match exact / partial substrings, but won't normalize across word forms.
# ai-florist-coach-blog
