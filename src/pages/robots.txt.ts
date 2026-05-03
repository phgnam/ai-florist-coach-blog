import type { APIRoute } from 'astro';

const SITE = import.meta.env.SITE_URL ?? 'https://ai-florist-coach-blog.vercel.app';

const rules = `User-agent: *
Allow: /

# Block AI training scrapers (non-beneficial)
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: ClaudeBot
Disallow: /

# Allow beneficial search and AI retrieval agents
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${SITE}/sitemap-index.xml
`;

export const GET: APIRoute = () => {
  return new Response(rules, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
