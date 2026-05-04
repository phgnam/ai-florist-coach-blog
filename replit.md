# Yor Flower — AI Florist Coach Blog

Static blog about flowers built with Astro 6, MDX, TailwindCSS v3, and Pagefind for static-site search.

## Stack

- **Astro 6** (static output) with Node.js 22
- **MDX** (`@astrojs/mdx`) for rich post authoring
- **TailwindCSS v3** via PostCSS + `@tailwindcss/typography`
- **`@astrojs/sitemap`** — `/sitemap-index.xml`
- **`@astrojs/rss`** — `/rss.xml`
- **Pagefind** — static-site search index built from `.vercel/output/static/`
- **Giscus** — opt-in GitHub Discussions–based comments

## Running the Project

```bash
npm run dev        # Dev server on port 5000 (0.0.0.0)
npm run build      # astro build && pagefind --site .vercel/output/static
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
│   ├── data/glossary.ts     # 20 flower glossary terms for programmatic SEO
│   ├── styles/global.css    # Tailwind entry (fonts loaded async in SEO.astro)
│   ├── layouts/
│   │   ├── BaseLayout.astro     # Accepts pubDate, updatedDate, author, tags, hreflang, breadcrumbs
│   │   └── BlogPostLayout.astro
│   ├── components/
│   │   ├── Header.astro / Footer.astro (footer links to Flower Glossary)
│   │   ├── PostCard.astro / TagList.astro / FormattedDate.astro
│   │   ├── FlowerGallery.astro
│   │   ├── SEO.astro            # Full SEO: OG, Twitter, JSON-LD schema, hreflang, async fonts
│   │   ├── Search.astro         # Pagefind UI (only works after build)
│   │   └── Giscus.astro
│   ├── i18n/
│   │   ├── ui.ts            # All translation strings (EN + VI)
│   │   └── utils.ts         # useTranslations(), localePath(), alternatePath()
│   ├── pages/               # English (default, no prefix)
│   │   ├── index.astro      # hreflang en/vi/x-default
│   │   ├── about.astro
│   │   ├── posts/index.astro + [...slug].astro  # BlogPosting + BreadcrumbList schema
│   │   ├── tags/index.astro + [tag].astro
│   │   ├── learn/index.astro    # Flower Glossary hub (ItemList schema) — programmatic SEO
│   │   ├── learn/[term].astro   # Individual glossary pages (DefinedTerm + FAQPage schema)
│   │   ├── rss.xml.js
│   │   └── vi/              # Vietnamese (optional, /vi/ prefix)
│   │       ├── index.astro
│   │       ├── about.astro
│   │       ├── posts/index.astro + [...slug].astro  # BlogPosting + BreadcrumbList schema
│   │       └── tags/index.astro + [tag].astro
│   └── content/posts/*.mdx   # Blog posts (lang: 'en' | 'vi' field)
└── public/
    ├── favicon.svg
    └── robots.txt            # AI bot governance: blocks training scrapers, allows search bots
```

## SEO Architecture

### SEO.astro — applies to every page
- `og:locale`, `og:site_name`, `theme-color`
- Async non-render-blocking Google Fonts (preconnect + preload pattern)
- **WebSite + Organization JSON-LD** schema on every page
- **BlogPosting JSON-LD** schema when `type="article"` + `pubDate` provided
- **BreadcrumbList JSON-LD** schema when `breadcrumbs` prop provided
- **hreflang** alternate links for EN/VI multilingual pages

### Programmatic SEO — Flower Glossary (`/learn/`)
- **Hub page**: `/learn/` — 20 flower terms, `ItemList` schema
- **Spoke pages**: `/learn/[term]/` — each has:
  - Unique content: symbolism, 5 care tips, varieties, best-for uses, interesting fact
  - `DefinedTerm` + `DefinedTermSet` schema
  - `FAQPage` schema (4 Q&As per term targeting high-volume queries)
  - `BreadcrumbList` schema
  - Target keywords: "[flower] meaning", "[flower] care guide", "how long do [flower]s last"
- **20 terms**: Rose, Lily, Peony, Tulip, Sunflower, Orchid, Lavender, Hydrangea, Dahlia, Carnation, Chrysanthemum, Freesia, Gardenia, Iris, Jasmine, Magnolia, Marigold, Anemone, Ranunculus, Sweet Pea

### robots.txt Bot Governance
- Blocks AI training scrapers: GPTBot, Google-Extended, CCBot, anthropic-ai, ClaudeBot
- Explicitly allows: Googlebot, Bingbot, OAI-SearchBot (retrieval), PerplexityBot

## Design System — "Petal & Ivory" (Direction A)

- **Color palette**: Blush pink (`#E8A4B0`), dusty rose (`#C47A8A`), ivory cream (`#FAF5EE`), petal mist (`#F5E6EA`), deep mauve (`#4A2D35`), warm taupe (`#9E8A80`), rose doré gold (`#C8956A`)
- **Typography**: Cormorant Garamond (serif, headings/hero, wght 300/400/600) + Jost (body, wght 300/400/500) — loaded async via SEO.astro head tags
- **CSS tokens**: `--blush`, `--blush-dark`, `--blush-light`, `--blush-mid`, `--ivory`, `--ivory-dark`, `--petal-mist`, `--mauve`, `--mauve-mid`, `--taupe`, `--gold`, `--gold-light`
- **Hero**: Soft blush pink gradient (`#FDF0F2 → #F5E6EA → #EDA8B8`) — light & airy, no dark backgrounds
- **Header**: Fully transparent over hero, ivory glassmorphism on scroll, all text in mauve tones
- **Footer**: Deep mauve (`#4A2D35`) background, 4-column grid including Florist Resources links
- **Page headers**: Blush gradient on all inner pages (posts, tags, about)
- **Post hero**: Blush gradient with mauve text overlay
- **Cards**: Clean white cards, subtle pink border, spring lift + shadow deepen on hover, mauve titles, blush-dark CTA with animated arrow. Placeholder cards use botanical SVG bloom motif on soft per-palette gradient (4 palettes: blush, rose, gold, violet) — no emoji placeholders. Staggered entrance animation on listing pages.
- **Trending section**: Flat editorial 3-column layout (no card boxes), horizontal rule borders top/bottom, vertical dividers between columns, matches reference magazine layout; dynamically rendered via JS — all `.trending-*` CSS must use `:global()` to bypass Astro scoping
- **Related posts**: Flat editorial 3-column layout (same style as trending) using `<a>` elements directly instead of PostCard components, with vertical right-border dividers, subtle `transform: translateY(-2px)` on hover
- **Tags pages**: Unique emoji per tag topic (📖 guide, 🌍 culture, 🌱 gardening, 📜 history, etc.) on both EN (/tags) and VI (/vi/tags)
- **Buttons**: Pill-shaped (`border-radius: 999px`), blush-dark primary, ghost with blush border
- **Animations**: `fadeUp`, `floatPetal`, `petalDrift` for decorative elements; `cardEntrance` for staggered card reveals on listing pages
- **Prose**: Drop cap on first paragraph (`::first-letter` — Cormorant Garamond, blush-dark). Gradient HR, blockquote with large decorative `"` mark, improved h2/h3 borders, better link underline colors.
- **Post hero**: Deeper overlay gradient (0.72 opacity), taller (560px), frosted-glass category badge, better shadow on title
- **AuthorBox**: Gradient background, left bleed accent bar, shadow on avatar
- **Section labels**: Gradient-fade rule lines (transparent → ivory → transparent) instead of solid
- **Active nav**: `nav-link--active` class set server-side via `isActive()` on `Astro.url.pathname`; works for nested routes without over-highlighting HOME

## Multilingual (i18n)

- **Default locale**: English at `/` — no URL prefix
- **Secondary locale**: Vietnamese at `/vi/` — all pages under `/vi/`
- **Language switcher**: `EN | VI` pill in the header on every page
- **hreflang**: en/vi/x-default tags on homepage and listing pages
- **Content filtering**: posts with `lang: 'en'` appear on EN pages; `lang: 'vi'` on VI pages
- **Adding EN post**: set `lang: 'en'` in MDX frontmatter
- **Adding VI post**: omit `lang` (defaults to `'vi'`) or set `lang: 'vi'`

## Key Notes

- **Astro 6 content layer**: Uses `glob` loader from `astro/loaders` in `content.config.ts`.
- **TailwindCSS v4 incompatible**: Using TailwindCSS v3 with PostCSS instead.
- **Google Fonts**: Loaded asynchronously in `SEO.astro` — removed from `global.css` to fix render-blocking LCP.
- **Pagefind search**: Only works after `npm run build` (not in dev mode).
- **Giscus comments**: Disabled by default; configure IDs in `src/consts.ts`.
- **Port**: Always 5000 on 0.0.0.0 for Replit preview.

## Adding a Blog Post

Create `src/content/posts/<slug>.mdx`:

```mdx
---
title: 'Title'
description: 'Short description'
pubDate: 2026-05-01
tags: ['tag1', 'tag2']
author: 'Author Name'
draft: false
lang: 'en'
---

Post content...
```

## Deployment

Static site deployment — builds with `npm run build:astro`, serves from `dist/`.
Submit `/sitemap-index.xml` to Google Search Console after deploying.
