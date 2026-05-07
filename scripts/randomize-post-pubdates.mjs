#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const postsDir = join(process.cwd(), 'src/content/posts');
const start = new Date('2025-01-01T00:00:00+07:00').getTime();
const end = new Date('2026-05-08T23:59:00+07:00').getTime();

function hashString(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededDate(filename) {
  const ratio = hashString(filename) / 0xffffffff;
  const time = start + Math.floor((end - start) * ratio);
  const date = new Date(time);
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const get = (type) => parts.find((part) => part.type === type)?.value;
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}+07:00`;
}

const files = readdirSync(postsDir).filter((file) => /\.mdx?$/.test(file)).sort();
let changed = 0;

for (const file of files) {
  const path = join(postsDir, file);
  const source = readFileSync(path, 'utf8');
  if (!source.startsWith('---')) continue;

  const frontmatterEnd = source.indexOf('\n---', 3);
  if (frontmatterEnd === -1) continue;

  const nextPubDate = seededDate(file);
  const nextSource = source.replace(/^pubDate:\s*.+$/m, `pubDate: ${nextPubDate}`);
  if (nextSource !== source) {
    writeFileSync(path, nextSource);
    changed += 1;
  }
}

console.log(`Updated pubDate in ${changed} post(s).`);
