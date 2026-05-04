---
name: testing-search
description: Test the Fuse.js-based site search (header modal, /search and /vi/search pages, hash deep links). Use whenever search-modal, snippet-highlighting, diacritic-matching, or grouped-results behaviour is touched.
---

# Testing the site search

The site uses a Fuse.js modal triggered from the header (`Ctrl+K` / `⌘K`) plus dedicated `/search` and `/vi/search` pages. Search is fuzzy + accent-tolerant + body-content-aware.

## How to serve the build for testing

- **`astro preview` does NOT work** — the Vercel adapter (`output: 'server'`, `adapter: vercel()`) explicitly rejects it.
- **Use `npm run dev`** (binds `0.0.0.0:5000`). This is the only way the server-rendered home pages (`/` and `/vi/`) get served — they are not prerendered to `dist/client`.
- A static `python3 -m http.server -d dist/client 5000` works for *prerendered* routes (`/search/`, `/vi/search/`, `/posts/...`, `/learn/...`, the JSON indexes) but **404s on `/` and `/vi/`**. Don't waste time debugging that — use `npm run dev` if you need the homepages.
- Vercel preview deploys may be auth-protected (return 401). If the preview URL is unreachable, fall back to local `npm run dev`.

## Where the code lives

- `src/components/Search.astro` — header modal (`#search-dialog`, `#search-input`, `#search-results`, `#search-suggestions`). Handles `Ctrl+K`, `data-search-trigger`, mobile variant via `variant="mobile"` + `triggerOnly`.
- `src/pages/search.astro` and `src/pages/vi/search.astro` — dedicated search pages (`#page-search-input`, `#page-search-results`, `.tag-pill`).
- `src/lib/searchIndex.ts` — unified index builder (articles + glossary + tools + guides per locale). Strips MDX to plain text, caps body at 4000 chars.
- `src/lib/searchClient.ts` — Fuse options, diacritic normalization (`normalizeDiacritics`), snippet generation (`buildSnippet`), result grouping (`groupHits`), recent-search storage (`vh:recent-searches`), analytics (`trackSearchDebounced`).
- `src/pages/search.en.json.ts` and `src/pages/search.vi.json.ts` — prerendered per-locale indexes lazy-loaded by the modal.

## Adversarial test ideas (each fails visibly if the change is broken)

- **Body-only word match.** Type a word that doesn't appear in any title/description but DOES in body (e.g. `aphids`, `ladybird`, `water blast`). The snippet under the title must contain that word wrapped in `<mark>`. If body indexing regressed, the snippet either disappears or falls back to the description.
- **Vietnamese diacritic insensitivity.** On `/vi/`, type `hoa hong` (no accents). At least one result whose title contains the diacritic form `hoa hồng` must appear. Without `normalizeDiacritics`, this query returns nothing.
- **Glossary group surfacing.** Type a known glossary slug (`ikebana`, `peony`, `rose`). A `Glossary` (or `Từ điển hoa` on `/vi/`) section header must render. Without `buildSearchIndex` covering `learn/[term]`, only `Articles` would appear.
- **Hash deep link.** Cold-load `/#q=peony`. Modal must auto-open with `peony` pre-filled on first paint. Without `readHashQuery` + `openSearch` wiring, the page renders normally and the hash is ignored.
- **Keyboard navigation.** ↓ / ↑ must move the `.is-active` row (one row at a time — NOTE: `.result-item:hover` shares the same style, so move the cursor away to a neutral spot like `(50, 700)` before screenshotting). Enter on the active row navigates to its URL.
- **Recent searches.** After confirming a query via Enter or modal close, reopen the modal — a `Recent searches` chip must appear. Storage key is `vh:recent-searches`, max 5 entries. Note: hash-deeplink-loaded queries may NOT persist (the save fires on Enter / dialog `close` event / result click, not on initial render).

## Mobile testing on this VM

- DevTools mobile emulation (`Ctrl+Shift+M` after `F12`) at ≤768 px shows the magnifier search button at top-right; the desktop nav links hide. The `<dialog>` element renders awkwardly inside the device-emulator iframe — verify modal-open by checking the DOM tree shows a `<top-layer>` element after click, not by relying on the rendered preview.
- **Do NOT use `wmctrl -e` to resize the actual Chrome window narrow.** On this VM that has killed the Chrome process before, with no easy way to relaunch (the `google-chrome` binary on PATH is a wrapper that POSTs to a debug port — it can't cold-start Chrome). Use DevTools emulation instead.

## Useful curls (sanity)

```bash
curl -s http://127.0.0.1:5000/search.en.json | head -c 300   # confirms body field present
curl -s http://127.0.0.1:5000/search?q=peony | grep -oE 'page-search-input|tag-pill'
curl -s http://127.0.0.1:5000/ | grep -oE 'hero-cmdk[^"]*|Press ⌘K to search'
```

## Lint / build / CI commands

- No `npm run lint` script. CI runs `astro check` and the Vercel preview build.
- `npm run build` — full production build. Outputs to `dist/client/` + `dist/server/`.
- `npm run dev` — dev server on `0.0.0.0:5000`.
- Type/diagnostic check: `npx astro check`.

## Devin Secrets Needed

None for runtime testing of search. The Vercel preview is auth-protected, so if the preview URL returns 401, fall back to local `npm run dev` rather than asking for Vercel credentials.
