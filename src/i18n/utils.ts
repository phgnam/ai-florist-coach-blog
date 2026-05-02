import { ui, defaultLang, type Lang, type TranslationKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first in ui) return first as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Build a locale-aware URL path.
 *  localePath('en', '/posts') → '/posts'   (en is default, no prefix)
 *  localePath('vi', '/posts') → '/vi/posts'
 */
export function localePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path === '/' ? '' : path}`;
}

/** Given the current pathname, return the equivalent path in the other locale. */
export function alternatePath(pathname: string, currentLang: Lang): string {
  if (currentLang === 'en') {
    // EN pages have no prefix → add /vi prefix
    if (pathname === '/') return '/vi';
    if (pathname.startsWith('/posts/') && pathname.length > '/posts/'.length) return '/vi/posts';
    if (pathname.startsWith('/tags/') && pathname.length > '/tags/'.length) return '/vi/tags';
    return '/vi' + pathname;
  } else {
    // VI pages have /vi prefix → strip it
    const stripped = pathname.replace(/^\/vi/, '') || '/';
    if (stripped.startsWith('/posts/') && stripped.length > '/posts/'.length) return '/posts';
    if (stripped.startsWith('/tags/') && stripped.length > '/tags/'.length) return '/tags';
    return stripped || '/';
  }
}
