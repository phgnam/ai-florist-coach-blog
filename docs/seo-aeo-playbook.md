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
6. **Contextual internal links** whenever the article mentions a topic, flower, care problem, tool, guide, glossary/entity page, flower page, topic/tag page, or any other relevant page that already exists on the site.

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

- **Every article MUST contain a random count of 1–3 impressive, on-topic images *inside the article body*.** Randomly choose the count for each new article so the site does not fall into a fixed visual pattern. A body image is one of `<figure>`, `<img>`, `<Image>`, or markdown `![alt](url)` placed inside the MDX content (not in the frontmatter). Text-only articles are rejected.
- **`heroImage` in the frontmatter alone does NOT satisfy this rule.** The hero is rendered above the article body by the layout; the body-image requirement is *in addition to* `heroImage`, not instead of it. An article that ships with `heroImage` but zero body-image markers will fail the `npm run check:body-images` guard wired into `npm run build` and CI.
- Each body image must carry a descriptive `alt` attribute (not a filename), so it works for screen readers and counts toward `ImageObject` discovery.
- **Randomly decide whether each new article includes `heroImage` or not.** If the random choice is "no hero", omit both `heroImage` and `heroAlt` from frontmatter. If the random choice is "hero", add a strong, on-topic hero image and a descriptive `heroAlt`. Setting `heroImage` powers the in-page hero, Open Graph (`og:image`) share card, Twitter card, and `BlogPosting.image` field.
- "Impressive" means: editorial-quality, well-lit, on-topic, free-to-use or properly licensed. Avoid stock-photo clichés and AI-slop close-ups.
- **Unique Images Required**: The image URLs used in an article (both body images and `heroImage`) MUST NOT duplicate images already used in any other article. If an image URL is already in use, you must find another image.
- Performance: any image you commit through Astro's `image()` schema must be ≤ 250 KB delivered (WebP/AVIF) and sized for a 1600px-wide render. Inline `<figure>` images sourced from a CDN (e.g. Unsplash with `?w=800&q=75&auto=format`) should hit the same effective ceiling at the rendered width. Avoid using more than three body images unless there is a clear editorial reason and the page still meets the performance budget.
- **Enforcement.** `scripts/check-body-images.mjs` scans every published `src/content/posts/*.mdx` for body-image markers and enforces unique images. It exits non-zero if any post has none or has duplicates. It runs as `prebuild`, so `npm run build` (locally and in Vercel) will fail before deploy if this rule is violated. Run it directly with `npm run check:body-images`.

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
# Randomly include or omit heroImage/heroAlt per article.
# If included:
heroImage: "../../assets/<descriptive-name>.webp"   # powers OG / Twitter / BlogPosting.image
heroAlt: "<descriptive alt text, not a filename>"   # REQUIRED when heroImage is set
schema: Article + FAQPage
---

## Quick Answer
<40–60 words answering the main question directly.>

## <Question phrased as H2>
...

When mentioning a topic already covered anywhere on the site, link the first natural mention in context to the most useful internal resource:

- Mentioning roses → link to an existing rose article such as `/posts/rose-care-en/`
- Mentioning edible flowers → link to `/posts/edible-flowers-guide-en/`
- Mentioning pollinator planting → link to `/posts/flowers-for-bees-en/` or `/posts/flowers-for-butterflies-en/`
- Mentioning a flower with a glossary/entity page → link to its `/learn/<flower>/` page
- Mentioning a calculator, checker, planner, or interactive workflow → link to the relevant `/tools/.../` page
- Mentioning a broader category or topic already indexed by the site → link to the relevant guide, topic/tag, or landing page when it helps the reader

Do not add unrelated links just to increase count. Link only when the target page helps the reader continue the same task or understand a mentioned topic.

### Editorial enrichment (SOFT RULE)

To make each article more vivid and useful, choose **1–3 supporting formats** that fit the specific topic and search intent. Do not force every article into the same structure.

Examples of supporting formats:

- Care articles: checklist, seasonal routine, common mistakes, troubleshooting table.
- Problem/diagnosis articles: symptom table, cause-by-cause breakdown, quick fix sequence.
- List articles: comparison table, best-for scenarios, buyer/grower selection criteria.
- Meaning/symbolism articles: use cases, bouquet examples, cultural context.
- DIY articles: materials list, step-by-step sequence, timing, mistake prevention.
- Trend articles: visual examples, palette notes, real-world applications.
- Seasonal articles: timeline, monthly guidance, climate-region notes.

Use these only when they make the article easier to understand, scan, or act on.

<figure>
  <img src="..." alt="<descriptive alt>" loading="lazy" />
  <figcaption>...</figcaption>
</figure>
<!-- MANDATORY: randomly choose 1–3 relevant body images (<figure>, <img>, <Image>, or ![]()) -->
<!-- per article. heroImage in frontmatter does NOT satisfy this rule. -->
<!-- Enforced by scripts/check-body-images.mjs (runs as prebuild). -->

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
- ❌ Publish an article with zero images in its body — even one that ships with `heroImage`. The body-image requirement is in addition to (not instead of) `heroImage` (see §4).
- ❌ Try to satisfy the rule with the frontmatter `heroImage` alone; the hero is rendered above the body by the layout and does not count as a body image.
- ❌ Bypass the `npm run check:body-images` guard. If the guard is wrong about a specific case, fix the guard, not the article.
- ❌ Mention an existing covered topic, flower, care issue, guide, glossary/entity page, tool, topic/tag page, or other useful site resource without linking to the most relevant internal page when a helpful internal link exists.

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
