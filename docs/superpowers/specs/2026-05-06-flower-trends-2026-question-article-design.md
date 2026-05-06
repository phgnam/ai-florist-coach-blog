# 2026 Flower Trends Question Article Design

## Goal

Create a new English MDX article that targets a 2026 trend query in the repo's established SEO/AEO format.

Working title:
`What Are the Biggest Flower Trends in 2026?`

## Scope

The article will be a published post under `src/content/posts/` and will:

- Answer a specific search-style question about 2026 flower trends.
- Follow the mandatory content rules in `docs/seo-aeo-playbook.md`.
- Fit the tone and structure of the stronger existing English posts in the repo.

The article will not:

- Add new components, layouts, or schema helpers.
- Depend on a frontmatter `heroImage`.
- Attempt to source topics from GSC data, since this task is explicitly user-directed.

## Content Structure

The post will use this structure:

1. YAML frontmatter
2. `## Quick Answer` block of roughly 40 to 60 words
3. Question-style H2 sections only
4. `## Frequently Asked Questions`
5. FAQ JSON-LD script at the end

Planned section flow:

- `## Quick Answer`
- `## What defines flower trends in 2026?`
- `## Which colour palettes are leading flower design in 2026?`
- `## Why are sculptural and textural flowers getting more attention in 2026?`
- `## How are sustainability concerns changing flower choices in 2026?`
- `## Which event and wedding flower trends matter most in 2026?`
- `## Are dried and preserved flowers still in style in 2026?`
- `## Frequently Asked Questions`

## Compliance Rules

The article must satisfy all of the following:

- Valid frontmatter matching `src/content.config.ts`
- `lang: 'en'`
- `draft: false`
- One clear long-tail query focus
- A direct Quick Answer near the top
- All H2 headings phrased as questions
- At least one unique, on-topic body image inside the MDX content
- Descriptive image `alt` text
- FAQ content mirrored in FAQ JSON-LD

Because `heroImage` is optional and uniqueness is enforced across posts, this article will omit `heroImage` unless a verified unique local asset is intentionally added later.

## Topic and Tone

The article will be trend-based, tied explicitly to 2026, and written in a practical search-oriented style rather than as a lifestyle editorial.

Tone targets:

- Direct
- Specific
- Useful for a reader deciding what styles, flowers, and palettes feel current
- Strong enough to support internal linking to related care, wedding, and meaning posts when relevant

## Image Strategy

The post will include one inline `<figure>` with a unique CDN image URL that is not already used by another published article.

The image should:

- Show an editorial-quality floral arrangement or design scene
- Feel contemporary and plausibly aligned with 2026 trend language
- Use a descriptive `alt`
- Include a short, informative `figcaption`

## FAQ Plan

The FAQ section will likely cover:

- whether 2026 trends favour bright or muted colours
- whether dried flowers are still relevant
- which flowers are most requested for weddings in 2026
- whether sustainable flower sourcing matters more in 2026

These questions will be mirrored in the JSON-LD block with concise accepted answers.

## Testing and Validation

Before calling the work complete, validate the article with:

- a schema-compatible frontmatter check via the normal Astro content pipeline
- `npm run check:body-images`

If practical in the current environment, also run a targeted build or equivalent content validation command.

## Risks and Mitigations

Risk: Trend article becomes vague or generic.
Mitigation: Keep sections concrete and tied to observable design directions such as palette, texture, sourcing, and events.

Risk: Image uniqueness guard fails.
Mitigation: Check the chosen image URL base against existing post image URLs before finalizing.

Risk: H2 headings drift into statements instead of questions.
Mitigation: Review headings explicitly against the playbook before saving the article.
