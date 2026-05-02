import type { APIRoute } from 'astro';

const SITE = 'https://vuon-hoa.replit.app';
const NOW = new Date().toISOString().split('T')[0];

const VI_URLS = [
  { loc: '/vi/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/vi/posts', priority: '0.9', changefreq: 'daily' },
  { loc: '/vi/tags', priority: '0.7', changefreq: 'weekly' },
  { loc: '/vi/about', priority: '0.6', changefreq: 'monthly' },
  // Tools
  { loc: '/vi/tools/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/vi/tools/care-calculator/', priority: '0.85', changefreq: 'monthly' },
  { loc: '/vi/tools/season-planner/', priority: '0.85', changefreq: 'monthly' },
  { loc: '/vi/tools/budget-planner/', priority: '0.85', changefreq: 'monthly' },
  { loc: '/vi/tools/combination-builder/', priority: '0.85', changefreq: 'monthly' },
  // Glossary hub
  { loc: '/vi/learn/', priority: '0.9', changefreq: 'monthly' },
  // Glossary terms (20 flowers)
  { loc: '/vi/learn/rose/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/lily/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/peony/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/tulip/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/sunflower/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/orchid/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/lavender/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/hydrangea/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/dahlia/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/carnation/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/chrysanthemum/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/freesia/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/gardenia/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/iris/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/jasmine/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/magnolia/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/marigold/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/anemone/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/ranunculus/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/vi/learn/sweet-pea/', priority: '0.8', changefreq: 'monthly' },
];

export const GET: APIRoute = () => {
  const urls = VI_URLS.map(u => `
  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${NOW}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    <xhtml:link rel="alternate" hreflang="vi" href="${SITE}${u.loc}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${u.loc.replace(/^\/vi/, '') || '/'}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${u.loc.replace(/^\/vi/, '') || '/'}"/>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
