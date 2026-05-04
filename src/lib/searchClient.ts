import type { FuseResult, IFuseOptions } from 'fuse.js';
import type { SearchDoc, SearchKind } from './searchIndex';

const RECENT_KEY = 'vh:recent-searches';
const RECENT_MAX = 5;

/** Strip diacritics so "hoa hong" matches "hoa hồng". */
export function normalizeDiacritics(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export interface IndexedDoc extends SearchDoc {
  _norm: {
    title: string;
    description: string;
    body: string;
    tags: string[];
  };
}

export function indexDocs(docs: SearchDoc[]): IndexedDoc[] {
  return docs.map((d) => ({
    ...d,
    _norm: {
      title: normalizeDiacritics(d.title),
      description: normalizeDiacritics(d.description),
      body: normalizeDiacritics(d.body),
      tags: d.tags.map((t) => normalizeDiacritics(t)),
    },
  }));
}

export const fuseOptions: IFuseOptions<IndexedDoc> = {
  keys: [
    { name: '_norm.title', weight: 2.2 },
    { name: '_norm.description', weight: 1.0 },
    { name: '_norm.tags', weight: 0.8 },
    { name: '_norm.body', weight: 0.4 },
  ],
  threshold: 0.34,
  ignoreLocation: true,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
};

/** Escape HTML entities so user content can't break out of a snippet. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Find the first occurrence of any query token inside the body, slice ±90
 * chars around it, and wrap matches in `<mark>` for highlighting.
 *
 * Returns null if neither the query nor any token is found.
 */
export function buildSnippet(
  body: string,
  query: string,
  radius = 90
): string | null {
  if (!body || !query.trim()) return null;
  const normBody = normalizeDiacritics(body);
  const tokens = normalizeDiacritics(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return null;

  let bestIdx = -1;
  let bestToken = '';
  for (const token of tokens) {
    const idx = normBody.indexOf(token);
    if (idx !== -1 && (bestIdx === -1 || idx < bestIdx)) {
      bestIdx = idx;
      bestToken = token;
    }
  }
  if (bestIdx === -1) return null;

  const start = Math.max(0, bestIdx - radius);
  const end = Math.min(body.length, bestIdx + bestToken.length + radius);
  let snippet = body.slice(start, end);
  if (start > 0) snippet = '…' + snippet;
  if (end < body.length) snippet = snippet + '…';

  const escaped = escapeHtml(snippet);
  let highlighted = escaped;
  for (const token of tokens) {
    if (!token) continue;
    const re = new RegExp(buildAccentInsensitiveRegexSrc(token), 'gi');
    highlighted = highlighted.replace(re, (m) => `<mark>${m}</mark>`);
  }
  return highlighted;
}

/**
 * Build a regex source that matches a normalized (diacritic-stripped) query
 * token against text that may still contain diacritics. We do this by
 * replacing each ASCII letter in the token with a class containing the letter
 * and any common Vietnamese-accented variants.
 */
function buildAccentInsensitiveRegexSrc(normToken: string): string {
  const variants: Record<string, string> = {
    a: 'aàáảãạăằắẳẵặâầấẩẫậ',
    e: 'eèéẻẽẹêềếểễệ',
    i: 'iìíỉĩị',
    o: 'oòóỏõọôồốổỗộơờớởỡợ',
    u: 'uùúủũụưừứửữự',
    y: 'yỳýỷỹỵ',
    d: 'dđ',
  };
  return [...normToken]
    .map((ch) => {
      if (variants[ch]) return `[${variants[ch]}${variants[ch].toUpperCase()}]`;
      if (/[a-z0-9]/i.test(ch)) return ch;
      return ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('');
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

export const GROUP_ORDER: SearchKind[] = ['article', 'glossary', 'tool', 'guide'];

export interface GroupedHits {
  kind: SearchKind;
  hits: FuseResult<IndexedDoc>[];
}

export function groupHits(
  hits: FuseResult<IndexedDoc>[]
): GroupedHits[] {
  const buckets = new Map<SearchKind, FuseResult<IndexedDoc>[]>();
  for (const h of hits) {
    const k = h.item.kind;
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k)!.push(h);
  }
  return GROUP_ORDER.flatMap((k) => {
    const arr = buckets.get(k);
    return arr && arr.length ? [{ kind: k, hits: arr }] : [];
  });
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
