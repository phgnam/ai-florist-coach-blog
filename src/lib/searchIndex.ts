import { getCollection } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { GLOSSARY_TERMS } from '../data/glossary';
import { GLOSSARY_TERMS_VI } from '../data/glossary-vi';

export type SearchKind = 'article' | 'glossary' | 'tool' | 'guide';

export interface SearchDoc {
  kind: SearchKind;
  title: string;
  description: string;
  body: string;
  tags: string[];
  url: string;
  slug: string;
  lang: Lang;
}

const BODY_CHAR_CAP = 4000;

/**
 * Strip MDX/JSX/HTML/Markdown syntax from raw post body to a flat plain-text
 * string suitable for fuzzy search and snippet extraction.
 */
export function stripMdxToText(input: string): string {
  if (!input) return '';
  let s = input;

  s = s.replace(/^---[\s\S]*?\n---\s*/m, '');

  s = s.replace(/^import\s.+?from\s+['"][^'"]+['"];?\s*$/gm, '');
  s = s.replace(/^export\s.+?;?\s*$/gm, '');

  s = s.replace(/```[\s\S]*?```/g, ' ');
  s = s.replace(/`[^`]+`/g, ' ');

  s = s.replace(/<[a-zA-Z][^>]*\/>/g, ' ');
  s = s.replace(/<\/?[a-zA-Z][^>]*>/g, ' ');

  s = s.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');
  s = s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  s = s.replace(/^#{1,6}\s+/gm, '');
  s = s.replace(/^\s*[-*+]\s+/gm, '');
  s = s.replace(/^\s*\d+\.\s+/gm, '');
  s = s.replace(/^\s*>\s?/gm, '');

  s = s.replace(/\*\*([^*]+)\*\*/g, '$1');
  s = s.replace(/\*([^*]+)\*/g, '$1');
  s = s.replace(/_([^_]+)_/g, '$1');
  s = s.replace(/~~([^~]+)~~/g, '$1');

  s = s.replace(/\{[^{}]*\}/g, ' ');

  s = s.replace(/\s+/g, ' ').trim();

  if (s.length > BODY_CHAR_CAP) s = s.slice(0, BODY_CHAR_CAP);
  return s;
}

/**
 * Build the per-locale list of search documents covering blog posts, glossary
 * terms, tool pages, and the flowers-by-occasion guide.
 *
 * Used by the prerendered `/search.<lang>.json` endpoints, the dedicated
 * `/search` pages, and the in-header modal.
 */
export async function buildSearchIndex(lang: Lang): Promise<SearchDoc[]> {
  const docs: SearchDoc[] = [];

  const posts = (
    await getCollection('posts', ({ data }: { data: any }) => !data.draft && data.lang === lang)
  ).sort((a: any, b: any) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const postPath = lang === 'vi' ? '/vi/posts/' : '/posts/';
  for (const post of posts) {
    docs.push({
      kind: 'article',
      title: post.data.title,
      description: post.data.description ?? '',
      body: stripMdxToText((post as { body?: string }).body ?? ''),
      tags: post.data.tags ?? [],
      url: `${postPath}${post.id}/`,
      slug: post.id,
      lang,
    });
  }

  const learnPath = lang === 'vi' ? '/vi/learn/' : '/learn/';
  if (lang === 'en') {
    for (const term of GLOSSARY_TERMS) {
      const body = [
        term.summary,
        term.meaning,
        term.bloomSeason,
        term.lifespan,
        term.careTips.join(' '),
        term.commonVarieties.map((v) => `${v.name}: ${v.description}`).join(' '),
        term.bestFor.join(', '),
        term.interestingFact,
        term.colors.join(', '),
      ]
        .filter(Boolean)
        .join(' ');
      docs.push({
        kind: 'glossary',
        title: term.name,
        description: term.summary,
        body: stripMdxToText(body),
        tags: term.colors.map((c) => c.toLowerCase()),
        url: `${learnPath}${term.slug}/`,
        slug: term.slug,
        lang,
      });
    }
  } else {
    for (const term of GLOSSARY_TERMS_VI) {
      const body = [
        term.summary,
        term.meaning,
        term.bloomSeason,
        term.lifespan,
        term.careTips.join(' '),
        term.commonVarieties.map((v) => `${v.name}: ${v.description}`).join(' '),
        term.bestFor.join(', '),
        term.interestingFact,
        term.colors.join(', '),
      ]
        .filter(Boolean)
        .join(' ');
      docs.push({
        kind: 'glossary',
        title: term.name,
        description: term.summary,
        body: stripMdxToText(body),
        tags: term.colors.map((c) => c.toLowerCase()),
        url: `${learnPath}${term.slug}/`,
        slug: term.slug,
        lang,
      });
    }
  }

  const tools: Array<{ slug: string; title: string; desc: string; tags: string[] }> =
    lang === 'vi'
      ? [
          {
            slug: 'care-calculator',
            title: 'Máy tính tuổi thọ hoa',
            desc:
              'Ước tính thời gian giữ tươi cho hoa cắt cành dựa trên loại hoa, nhiệt độ phòng và cách chăm sóc.',
            tags: ['công cụ', 'chăm sóc', 'tuổi thọ'],
          },
          {
            slug: 'season-planner',
            title: 'Lịch hoa theo mùa',
            desc:
              'Khám phá hoa nào nở rộ mỗi tháng trong năm — cẩm nang cho người tổ chức đám cưới và sự kiện.',
            tags: ['công cụ', 'mùa vụ', 'kế hoạch'],
          },
          {
            slug: 'combination-builder',
            title: 'Gợi ý kết hợp hoa',
            desc:
              'Chọn một loài hoa chủ đạo và nhận 4 gợi ý phối hợp hoa kèm câu chuyện màu sắc và phong cách.',
            tags: ['công cụ', 'phối hợp', 'cắm hoa'],
          },
          {
            slug: 'budget-planner',
            title: 'Máy tính ngân sách hoa',
            desc:
              'Tính toán số bông hoa cho mọi loại lẵng và bó hoa, kèm bảng chi phí buôn lẻ chi tiết.',
            tags: ['công cụ', 'ngân sách', 'kinh doanh'],
          },
        ]
      : [
          {
            slug: 'care-calculator',
            title: 'Vase Life Calculator',
            desc:
              'Estimate how long your cut flowers will last based on flower type, room temperature, and care routine.',
            tags: ['tool', 'care', 'vase life'],
          },
          {
            slug: 'season-planner',
            title: 'Flower Season Planner',
            desc:
              'Discover which flowers are in peak bloom every month of the year — essential for wedding and event planners.',
            tags: ['tool', 'season', 'planning'],
          },
          {
            slug: 'combination-builder',
            title: 'Flower Combination Suggester',
            desc:
              'Pick any hero flower and get curated pairings — colour stories, style notes, and seasonal guides.',
            tags: ['tool', 'combinations', 'arrangement'],
          },
          {
            slug: 'budget-planner',
            title: 'Bouquet Budget Planner',
            desc:
              'Calculate stems for every arrangement and get a full cost breakdown at wholesale and retail prices.',
            tags: ['tool', 'budget', 'business'],
          },
        ];

  const toolsBase = lang === 'vi' ? '/vi/tools/' : '/tools/';
  for (const t of tools) {
    docs.push({
      kind: 'tool',
      title: t.title,
      description: t.desc,
      body: stripMdxToText(`${t.title}. ${t.desc} ${t.tags.join(' ')}`),
      tags: t.tags,
      url: `${toolsBase}${t.slug}/`,
      slug: t.slug,
      lang,
    });
  }

  const guidesBase = lang === 'vi' ? '/vi/guides/' : '/guides/';
  docs.push({
    kind: 'guide',
    title:
      lang === 'vi'
        ? 'Hoa theo dịp — bó hoa cho từng sự kiện'
        : 'Flowers by Occasion — bouquets for every event',
    description:
      lang === 'vi'
        ? 'Hướng dẫn chọn hoa cho đám cưới, sinh nhật, kỷ niệm, lễ tốt nghiệp, tang lễ và các dịp khác.'
        : 'A florist guide to choosing the right flowers for weddings, birthdays, anniversaries, graduations, sympathy, and more.',
    body:
      lang === 'vi'
        ? 'Hoa cưới, hoa sinh nhật, hoa kỷ niệm, hoa tốt nghiệp, hoa tang lễ, hoa Valentine, hoa Ngày của Mẹ, hoa cảm ơn, hoa hồi phục, hoa khai trương — bó hoa, lẵng hoa, ý nghĩa, kết hợp.'
        : 'Wedding flowers, birthday flowers, anniversary flowers, graduation flowers, sympathy flowers, Valentine\'s Day flowers, Mother\'s Day flowers, thank-you flowers, get-well flowers, grand-opening flowers — bouquets, centrepieces, meaning, combinations.',
    tags:
      lang === 'vi'
        ? ['hướng dẫn', 'dịp lễ', 'cưới', 'kỷ niệm', 'sinh nhật']
        : ['guide', 'occasion', 'wedding', 'anniversary', 'birthday'],
    url: `${guidesBase}flowers-by-occasion/`,
    slug: 'flowers-by-occasion',
    lang,
  });

  return docs;
}
