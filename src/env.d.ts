/// <reference types="astro/client" />

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
