import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.union([image(), z.string().url()]).optional(),
      heroAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      author: z.string().default('Yor Flower'),
      draft: z.boolean().default(false),
      lang: z.enum(['vi', 'en']).default('vi'),
    }),
});

export const collections = { posts };
