# SEO + AEO Playbook (Project Rule)

> Mandatory rules for ALL articles and product/landing pages in this blog project.
> Source: validated playbook (10K users / 6 weeks / $0 ads / 300K+ impressions/month).

## 1. Content Strategy

### Pages-as-Acquisition-Channels
- Treat every page (article, product, landing) as a **permanent acquisition channel**.
- Goal density: many narrow pages > few broad pages. Target 100+ indexed pages.
- Every published page MUST target ONE specific long-tail query.

### Data-Driven Topic Selection (No Guessing)
- Source topics from **Google Search Console** weekly export (queries, pages, clicks, impressions, positions).
- Only write articles for queries where the site already has impressions but no dedicated content.
- Prefer specific questions over broad guides:
  - GOOD: "How to install skills in Claude Code"
  - BAD: "The Ultimate Guide to AI Agent Skills"
- Long-tail = easier rank + higher conversion.

## 2. AEO (Answer Engine Optimization) — MANDATORY

Every article MUST include:

1. **Quick Answer block** at top: 40–60 words directly answering the main question.
2. **All H2 headings phrased as questions**.
3. **FAQ schema** (JSON-LD) on every content page.
4. **Entity anchor page** with `Organization` + `Person` schema.
5. **`llms.txt`** file at site root describing what the site is for LLM crawlers.

Targets: ChatGPT, Gemini, Perplexity, Claude, Doubao (ByteDance), Copilot.

## 3. Structured Data (Day-One Requirement)

| Page Type | Required Schema |
|-----------|-----------------|
| Homepage | `Organization` |
| Product / Landing | `Product` or `SoftwareApplication` |
| Article / Content | `Article` + `FAQPage` |
| About / Author | `Person` |

AI engines read schema to decide who to cite. No schema = no citation.

## 4. Technical SEO (Non-Negotiable)

### SSR/SSG Required
- Client-side-only rendering (raw React SPA, Lovable/Bolt default) is a **disqualifier**.
- Google must see fully rendered HTML, not an empty div + JS bundle.
- This blog uses Astro — keep prerender ON for content; avoid client-only routes for indexable pages.

### Performance Budget (PageSpeed Insights)
- Desktop score: ≥ 95
- Mobile LCP: ≤ 1.0s (target), ≤ 2.5s (hard ceiling)
- JS bundle: keep total payload under ~200KB gzipped per route
- Images: never serve a 100KB+ image rendered at <200px — resize and use WebP/AVIF
- Audit before merging any UI/perf-sensitive change

### Visual requirements (MANDATORY for every article)

- **Every article MUST contain at least one impressive, on-topic image somewhere in its body.** Text-only articles are rejected.
- An inline `<figure>` (or markdown image) with descriptive `alt` text satisfies this rule. The image does not have to be the hero.
- `heroImage` in the MDX frontmatter is **recommended but optional**. Setting it powers the in-page hero, Open Graph (`og:image`) share card, Twitter card, and `BlogPosting.image` field, so prefer it whenever a strong cover image is available. When you do set `heroImage`, you must also set a descriptive `heroAlt`.
- "Impressive" means: editorial-quality, well-lit, on-topic, free-to-use or properly licensed. Avoid stock-photo clichés, AI-slop close-ups, and images already used as another article's hero.
- Performance: any image you commit through Astro's `image()` schema must be ≤ 250 KB delivered (WebP/AVIF) and sized for a 1600px-wide render. Inline `<figure>` images sourced from a CDN (e.g. Unsplash with `?w=800&q=75&auto=format`) should hit the same effective ceiling at the rendered width.

## 5. Weekly Growth Loop (Mandatory Cadence)

Every Monday (~2–3 hours):

1. Export GSC data (queries, pages, clicks, impressions, positions) as CSV.
2. Analyze for: keyword gaps, cannibalization, CTR problems on top-impression pages.
3. Identify 3–5 concrete opportunities with exact numbers (impressions, current position, CTR).
4. Action items:
   - Write 2–3 new articles targeting identified gaps.
   - Rewrite titles/meta on underperforming high-impression pages.
   - Add internal links from high-authority pages → weak/new pages.
5. Ping **IndexNow** for new URLs (sub-24h crawl).
6. Manually request indexing in GSC for new articles.

This loop is the highest-ROI activity. Other channels (Product Hunt, directories, cold outreach) produce one-time spikes; this **compounds**.

## 6. Article Template (Apply to Every New Article)

```markdown
---
title: "<exact long-tail question>"
description: "<150-160 chars, includes target query>"
heroImage: "../../assets/<descriptive-name>.webp"   # OPTIONAL but recommended — powers OG / Twitter / BlogPosting.image
heroAlt: "<descriptive alt text, not a filename>"   # REQUIRED when heroImage is set
schema: Article + FAQPage
---

## Quick Answer
<40–60 words answering the main question directly.>

## <Question phrased as H2>
...

<figure>
  <img src="..." alt="<descriptive alt>" loading="lazy" />
  <figcaption>...</figcaption>
</figure>
<!-- At least one body image somewhere in the article is MANDATORY (§4 Visual requirements) -->

## <Question phrased as H2>
...

## Frequently Asked Questions
<3–6 Q&A pairs mirrored in FAQ JSON-LD>
```

## 7. What NOT to Do

- ❌ Spend on ads before organic engine compounds.
- ❌ Write broad "ultimate guide" articles.
- ❌ Ship client-side-only rendered pages and expect indexing.
- ❌ Skip schema "to add later".
- ❌ Pick topics by intuition instead of GSC data.
- ❌ Rely on Product Hunt / directories as primary growth channels.
- ❌ Publish a text-only article. Every article needs at least one impressive, on-topic image in its body (see §4).

## 8. Success Metrics

Benchmark targets at week 6 (solo founder, $0 ads):

- 300K+ Google impressions/month
- 1,000+ organic clicks/week
- 850+ page-1 rankings
- 350+ AI-referred sessions/month across 6+ AI engines
- $0 CAC

## 9. Required Toolchain

- Google Search Console (set up **before** launch)
- IndexNow integration
- LLM-assisted GSC analysis (Claude / similar) for the weekly loop
- Schema validator (schema.org / Rich Results Test) on every new template
- PageSpeed Insights pre-merge check

---

**Authority:** This playbook OVERRIDES generic SEO advice. When in conflict with another doc, this rule wins for content and indexable-page work.
