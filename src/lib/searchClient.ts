/**
 * Lightweight client-side helpers shared by the header search modal and the
 * dedicated `/search` pages. The actual search engine is Pagefind, loaded
 * lazily from `/pagefind/pagefind.js` once the user opens search.
 */

const RECENT_KEY = 'vh:recent-searches';
const RECENT_MAX = 5;

/** Order kinds appear in grouped results. */
export const GROUP_ORDER = ['article', 'glossary', 'tool', 'guide'] as const;
export type SearchKind = (typeof GROUP_ORDER)[number];

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function loadRecentSearches(): string[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(query: string): void {
  if (typeof localStorage === 'undefined') return;
  const trimmed = query.trim();
  if (trimmed.length < 2) return;
  const current = loadRecentSearches();
  const next = [trimmed, ...current.filter((q) => q !== trimmed)].slice(
    0,
    RECENT_MAX
  );
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* localStorage full or disabled */
  }
}

let analyticsTimer: ReturnType<typeof setTimeout> | null = null;
/**
 * Debounced search-analytics hook. Records the *final* query a user paused on
 * (700ms idle) plus result count via Vercel Analytics if available.
 */
export function trackSearchDebounced(
  query: string,
  lang: string,
  resultCount: number
): void {
  if (typeof window === 'undefined') return;
  if (analyticsTimer) clearTimeout(analyticsTimer);
  analyticsTimer = setTimeout(() => {
    const q = query.trim();
    if (q.length < 2) return;
    const w = window as unknown as {
      va?: (event: 'event', payload: Record<string, unknown>) => void;
    };
    if (typeof w.va === 'function') {
      w.va('event', {
        name: 'search',
        data: { q: q.slice(0, 80), lang, results: resultCount },
      });
    }
  }, 700);
}

/** Result shape returned by `pagefind.search().results[i].data()`. */
export interface PagefindResultData {
  url: string;
  raw_url?: string;
  excerpt: string;
  meta: Record<string, string>;
  filters: Record<string, string[]>;
  word_count: number;
  sub_results?: Array<{ title: string; url: string; excerpt: string }>;
  anchors?: Array<{ element: string; id: string; text: string; location: number }>;
  content: string;
}

/** Minimal subset of the Pagefind module surface we use. */
export interface PagefindModule {
  options(opts: Record<string, unknown>): Promise<void>;
  init(): Promise<void>;
  /** Pass `null` as the query to list every document matching `filters`. */
  search(
    query: string | null,
    options?: { filters?: Record<string, string | string[]> }
  ): Promise<{
    results: Array<{ id: string; data(): Promise<PagefindResultData> }>;
    filters: Record<string, Record<string, number>>;
    totalFilters: Record<string, Record<string, number>>;
  }>;
  filters(): Promise<Record<string, Record<string, number>>>;
}

let pagefindPromise: Promise<PagefindModule | null> | null = null;

/**
 * Lazy-load the Pagefind runtime. Returns null if it can't be loaded
 * (e.g. running `astro dev` where the index hasn't been built yet).
 *
 * The path is built at runtime so the bundler doesn't try to resolve
 * `/pagefind/pagefind.js` (which only exists in the deployed site).
 */
export function loadPagefind(): Promise<PagefindModule | null> {
  if (pagefindPromise) return pagefindPromise;
  pagefindPromise = (async () => {
    try {
      const url = `${window.location.origin}/pagefind/pagefind.js`;
      const mod = (await import(/* @vite-ignore */ url)) as unknown as PagefindModule;
      await mod.options({ excerptLength: 28 });
      return mod;
    } catch {
      return null;
    }
  })();
  return pagefindPromise;
}

/** Pull the kind out of a result's meta, defaulting to article. */
export function resultKind(data: PagefindResultData): SearchKind {
  const k = data.meta.kind as SearchKind | undefined;
  if (k && (GROUP_ORDER as readonly string[]).includes(k)) return k;
  return 'article';
}

/** Sorted bucket of (kind -> hits) using {@link GROUP_ORDER}. */
export interface GroupedPagefindResults {
  kind: SearchKind;
  hits: PagefindResultData[];
}

export function groupResultsByKind(hits: PagefindResultData[]): GroupedPagefindResults[] {
  const buckets = new Map<SearchKind, PagefindResultData[]>();
  for (const h of hits) {
    const k = resultKind(h);
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k)!.push(h);
  }
  return GROUP_ORDER.flatMap((k) => {
    const arr = buckets.get(k);
    return arr && arr.length ? [{ kind: k, hits: arr }] : [];
  });
}
