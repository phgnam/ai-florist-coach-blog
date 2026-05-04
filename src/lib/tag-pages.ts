import type { CollectionEntry } from 'astro:content';
import { paginate } from './posts-pagination';

export function sortedPostsForTag(posts: CollectionEntry<'posts'>[], tag: string) {
  return posts
    .filter((post) => post.data.tags.includes(tag))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function tagIndexPaths(posts: CollectionEntry<'posts'>[]) {
  const tags = [...new Set(posts.flatMap((post) => post.data.tags))];

  return tags.map((tag) => {
    const tagPosts = sortedPostsForTag(posts, tag);
    const { slice, currentPage, totalPages } = paginate(tagPosts, 1);

    return {
      params: { tag },
      props: {
        posts: slice,
        currentPage,
        totalPages,
        totalPosts: tagPosts.length,
      },
    };
  });
}

export function tagPaginationPaths(posts: CollectionEntry<'posts'>[]) {
  const tags = [...new Set(posts.flatMap((post) => post.data.tags))];

  return tags.flatMap((tag) => {
    const tagPosts = sortedPostsForTag(posts, tag);
    const { totalPages } = paginate(tagPosts, 1);

    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => {
      const pageNumber = index + 2;
      const { slice, currentPage } = paginate(tagPosts, pageNumber);

      return {
        params: { tag, page: String(pageNumber) },
        props: {
          posts: slice,
          currentPage,
          totalPages,
          totalPosts: tagPosts.length,
        },
      };
    });
  });
}
