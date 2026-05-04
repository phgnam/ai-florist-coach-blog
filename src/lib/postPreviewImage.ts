import type { CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro:assets';

/**
 * Pick a preview image for a post card.
 *
 * Resolution order:
 * 1. The first `<img>` inside a `<figure>` element in the MDX body (most
 *    articles store their hero image as the opening figure).
 * 2. The `heroImage` frontmatter field, if set.
 *
 * Returns `undefined` when neither is available so the caller can render a
 * placeholder.
 */
export function firstPreviewImage(
  post: CollectionEntry<'posts'>
): string | ImageMetadata | undefined {
  const figureImage = post.body?.match(/<figure>[\s\S]*?<img[^>]+src="([^"]+)"/)?.[1];
  return figureImage ?? (post.data.heroImage as ImageMetadata | undefined);
}
