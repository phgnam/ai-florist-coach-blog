import { Redis } from '@upstash/redis';

export type PostLang = 'en' | 'vi';

const redisUrl = import.meta.env.UPSTASH_REDIS_REST_URL;
const redisToken = import.meta.env.UPSTASH_REDIS_REST_TOKEN;

function isValidRedisConfig(url: string | undefined, token: string | undefined): url is string {
  return Boolean(url?.startsWith('https://') && token && !url.includes('your_') && !token.includes('your_'));
}

export const hasPostViewsStore = isValidRedisConfig(redisUrl, redisToken);

export const postViewsRedis = hasPostViewsStore
  ? new Redis({
      url: redisUrl,
      token: redisToken,
    })
  : null;

export function postViewKey(lang: PostLang, slug: string): string {
  return `post_views:${lang}:${slug}`;
}

export async function getPostViewCounts(lang: PostLang, slugs: string[]): Promise<Map<string, number>> {
  if (!postViewsRedis || slugs.length === 0) return new Map();

  const values = await postViewsRedis.mget<number[]>(...slugs.map((slug) => postViewKey(lang, slug)));

  return new Map(
    slugs.map((slug, index) => {
      const value = values[index];
      return [slug, typeof value === 'number' ? value : Number(value ?? 0) || 0];
    })
  );
}
