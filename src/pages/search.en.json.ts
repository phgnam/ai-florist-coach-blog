import type { APIRoute } from 'astro';
import { buildSearchIndex } from '../lib/searchIndex';

export const prerender = true;

export const GET: APIRoute = async () => {
  const docs = await buildSearchIndex('en');
  return new Response(JSON.stringify(docs), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
