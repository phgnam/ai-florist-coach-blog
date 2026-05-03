/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SHOW_LANG_SWITCH?: string;
  readonly SITE_URL?: string;
  readonly UPSTASH_REDIS_REST_URL?: string;
  readonly UPSTASH_REDIS_REST_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'astro:content' {
  export type CollectionKey = string;
  export type CollectionEntry<C extends CollectionKey> = {
    id: string;
    slug: string;
    body: string;
    collection: C;
    data: any;
    render(): Promise<{ Content: any; headings: any[] }>;
  };
  export function getCollection<C extends CollectionKey>(
    collection: C,
    filter?: (entry: CollectionEntry<C>) => boolean
  ): Promise<CollectionEntry<C>[]>;
  export function getEntry<C extends CollectionKey>(
    collection: C,
    slug: string
  ): Promise<CollectionEntry<C> | undefined>;
}

declare module 'astro:assets' {
  interface ImageMetadata {
    src: string;
    width: number;
    height: number;
    format: string;
  }
}
