import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts', ({ data }: { data: any }) => !data.draft);

  const index = posts.map((post: any) => ({
    title: post.data.title,
    description: post.data.description ?? '',
    tags: post.data.tags ?? [],
    lang: post.data.lang ?? 'en',
    slug: post.id,
  }));

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
