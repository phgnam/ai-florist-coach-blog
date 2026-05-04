# Yor Flower — AI Florist Coach Blog

Static blog about flowers built with [Astro](https://astro.build), MDX, TailwindCSS v3, and [Pagefind](https://pagefind.app/) for static-site search across articles, the flower glossary, tools, and guides. Companion site to the AI Florist Coach app.

## Stack

- Astro 6 (static output)
- MDX (`@astrojs/mdx`) for rich post authoring
- TailwindCSS v3 via PostCSS (`postcss.config.cjs` + `tailwind.config.cjs`) with `@tailwindcss/typography`
- `@astrojs/sitemap` — `/sitemap-index.xml`
- `@astrojs/rss` — `/rss.xml`
- Pagefind — static-site search; index is generated at build time into `/pagefind/` and lazy-loaded by the modal + `/search` pages
- Giscus — opt-in GitHub Discussions–based comments

## Scripts

```bash
npm install        # install once

npm run dev        # Astro dev server on http://localhost:5000 (search index is unavailable in dev)
npm run build      # astro build && pagefind --site .vercel/output/static
npm run build:astro    # Astro build only
npm run build:search   # rerun pagefind on an existing build
npm run preview        # astro preview (no Pagefind index)
npm run preview:static # static server over .vercel/output/static (search works here)
```

The site uses Pagefind static-site search. The index is built from rendered HTML during `npm run build` and ends up at `.vercel/output/static/pagefind/`. The `<Search />` modal lazy-loads `/pagefind/pagefind.js` only on first open; since the index does not exist on `astro dev`, run `npm run build && npm run preview:static` to exercise search locally.

## Project layout

```
blog/
├── astro.config.mjs       # Integrations, site URL, Vite plugins
├── src/
│   ├── consts.ts          # Site title, description, Giscus config
│   ├── content.config.ts  # `posts` collection schema (Zod)
│   ├── styles/global.css  # Tailwind v3 entry (@tailwind base/components/utilities) + theme tokens
│   ├── layouts/
│   │   ├── BaseLayout.astro     # HTML shell + SEO + Header/Footer
│   │   └── BlogPostLayout.astro # Legacy article shell (unused)
│   ├── components/
│   │   ├── Header.astro / Footer.astro
│   │   ├── PostCard.astro / TagList.astro / FormattedDate.astro
│   │   ├── FlowerGallery.astro  # Use inside MDX posts
│   │   ├── SEO.astro            # Meta + OG + Twitter + JSON-LD
│   │   ├── Search.astro         # Pagefind-powered ⌘K modal + mobile trigger
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
> - **At least one impressive, on-topic image *inside the article body*** — `<figure>`, `<img>`, `<Image>`, or markdown `![alt](url)`. **`heroImage` in the frontmatter alone does NOT satisfy this rule** — the hero is rendered above the body, separately. The body image is *in addition to* `heroImage`, not instead of it. `heroImage` itself is recommended but optional; when set, it also powers OG share card, Twitter card, and `BlogPosting.image`. Enforced by `npm run check:body-images` (runs as `prebuild`). See the playbook's "Visual requirements" section.
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

`Search.astro` renders a header `<dialog>` (also reachable from a mobile-nav button and the dedicated `/search` and `/vi/search` pages). It lazy-loads `/pagefind/pagefind.js` only when the user first opens search, so the homepage payload stays small. ⌘/Ctrl+K opens it from anywhere; ↑/↓/Enter navigate results; Esc closes.

The Pagefind index is built from the rendered HTML during `npm run build`. Each indexable page wraps its main content in:

```html
<article
  data-pagefind-body
  data-pagefind-meta="kind:article, description:..., image:..."
  data-pagefind-filter="kind:article, tag:hoa-hong, tag:cham-soc"
>
```

Non-content UI (breadcrumbs, share box, related posts, comments) is annotated with `data-pagefind-ignore` so it stays out of the index. Pagefind auto-detects `<h1>` for the title.

Indexable surfaces:

- `src/pages/posts/[...slug].astro` and `src/pages/vi/posts/[...slug].astro` — articles
- `src/pages/learn/[term].astro` and `src/pages/vi/learn/[term].astro` — glossary terms
- `src/pages/tools/*.astro` and `src/pages/vi/tools/*.astro` — the four tool pages
- `src/pages/guides/flowers-by-occasion.astro` and its Vietnamese sibling — guides

Results are grouped in the UI as **Articles / Glossary / Tools / Guides** by the `kind` meta value. Tag filtering on the dedicated `/search` and `/vi/search` pages uses the `tag` Pagefind filter. Pagefind auto-segments per language using the `lang` attribute on the rendered `<html>`, so EN queries hit only EN docs and VI queries hit only VI docs without any extra plumbing.

Recent searches are persisted to `localStorage`, and search events fire to Vercel Analytics (debounced) for tuning relevance.

> Pagefind only runs against built HTML, so search is **unavailable** under `npm run dev` / `npm run preview`. Use `npm run build && npm run preview:static` to exercise search locally.
# ai-florist-coach-blog
