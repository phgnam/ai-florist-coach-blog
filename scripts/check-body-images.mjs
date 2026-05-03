#!/usr/bin/env node
/**
 * check-body-images.mjs
 *
 * Enforces the playbook's §4 "Visual requirements" rule:
 *   "Every article MUST contain at least one impressive, on-topic image
 *    somewhere in its body. heroImage alone does NOT satisfy this rule."
 *
 * Scans every published .mdx / .md file under src/content/posts/, splits
 * the YAML frontmatter from the body, and fails (exit 1) if any
 * non-draft post's body contains zero body-image markers.
 *
 * Body-image markers (any one is enough):
 *   - <figure ...>     (HTML figure element)
 *   - <img ...>        (raw <img> tag, usually inside <figure>)
 *   - <Image ...>      (Astro <Image /> component)
 *   - ![alt](url)      (markdown image)
 *
 * heroImage in frontmatter is intentionally NOT counted — the rule
 * requires the image to live in the article body, not just the hero.
 *
 * Drafts (`draft: true` in frontmatter) are skipped.
 *
 * No external dependencies — runs from `npm run check:body-images`
 * and as part of the standard build pipeline.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const repoRoot = join(here, '..');
const postsDir = join(repoRoot, 'src/content/posts');

/** Recursively collect all .md / .mdx files under `dir`. */
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (/\.mdx?$/.test(name)) out.push(full);
  }
  return out;
}

/**
 * Split a `.md` / `.mdx` source into its YAML frontmatter (string) and
 * body (string). Returns { frontmatter: '', body: src } if no frontmatter
 * fence is present.
 */
function splitFrontmatter(src) {
  if (!src.startsWith('---')) return { frontmatter: '', body: src };
  // Find the closing fence on its own line.
  const end = src.indexOf('\n---', 3);
  if (end === -1) return { frontmatter: '', body: src };
  const frontmatter = src.slice(3, end);
  // Skip past the closing fence and the newline that follows it.
  const after = src.indexOf('\n', end + 1);
  const body = after === -1 ? '' : src.slice(after + 1);
  return { frontmatter, body };
}

/** Cheap-but-good-enough YAML scalar lookup: `key: value` on a single line. */
function frontmatterValue(frontmatter, key) {
  const re = new RegExp(`^${key}\\s*:\\s*(.+?)\\s*$`, 'm');
  const m = frontmatter.match(re);
  if (!m) return undefined;
  // Strip surrounding quotes.
  return m[1].replace(/^['"]|['"]$/g, '');
}

/** Body-image markers — any one of these makes a post compliant. */
const BODY_IMAGE_RE = /<figure\b|<img\b|<Image\b|!\[[^\]]*\]\(/i;

const offenders = [];
const checked = [];

for (const file of walk(postsDir)) {
  const src = readFileSync(file, 'utf8');
  const { frontmatter, body } = splitFrontmatter(src);
  const draft = frontmatterValue(frontmatter, 'draft') === 'true';
  if (draft) continue;
  checked.push(file);
  if (!BODY_IMAGE_RE.test(body)) {
    offenders.push(relative(repoRoot, file));
  }
}

if (offenders.length > 0) {
  console.error(
    '\n✖ Body-image rule violated (docs/seo-aeo-playbook.md §4):',
  );
  console.error(
    '  Every published article MUST contain at least one body image',
  );
  console.error(
    '  (<figure>, <img>, <Image>, or markdown ![]()). heroImage in',
  );
  console.error('  frontmatter alone does NOT satisfy this rule.\n');
  console.error('Offending files:');
  for (const f of offenders) console.error(`  - ${f}`);
  console.error(
    `\n${offenders.length} file(s) failing, ${checked.length} checked.\n`,
  );
  process.exit(1);
}

console.log(
  `✓ Body-image rule OK — ${checked.length} published post(s) checked.`,
);
