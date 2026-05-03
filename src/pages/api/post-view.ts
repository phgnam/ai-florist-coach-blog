import type { APIRoute } from 'astro';
import { postViewKey, postViewsRedis, type PostLang } from '../../lib/postViews';

export const prerender = false;

const allowedLangs = new Set<PostLang>(['en', 'vi']);
const slugPattern = /^[a-z0-9][a-z0-9-_/]*$/i;

export const POST: APIRoute = async ({ request }) => {
  if (!postViewsRedis) {
    return new Response(JSON.stringify({ ok: false, error: 'Post view store is not configured.' }), {
      status: 503,
      headers: { 'content-type': 'application/json' },
    });
  }

  let payload: { slug?: unknown; lang?: unknown };

  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON payload.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const slug = typeof payload.slug === 'string' ? payload.slug.trim() : '';
  const lang = typeof payload.lang === 'string' ? payload.lang : '';

  if (!allowedLangs.has(lang as PostLang) || !slug || !slugPattern.test(slug)) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid post identifier.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const views = await postViewsRedis.incr(postViewKey(lang as PostLang, slug));

  return new Response(JSON.stringify({ ok: true, views }), {
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
};
