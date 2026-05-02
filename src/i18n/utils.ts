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
 *  prefix('en', '/posts') → '/en/posts'
 *  prefix('vi', '/posts') → '/posts'
 */
export function localePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path === '/' ? '' : path}`;
}

/** Given the current pathname, return the equivalent path in the other locale. */
export function alternatePath(pathname: string, currentLang: Lang): string {
  if (currentLang === 'en') {
    const stripped = pathname.replace(/^\/en\/?/, '') || '';
    if (stripped.startsWith('posts/')) return '/posts';
    if (stripped.startsWith('tags/')) return '/tags';
    return '/' + stripped;
  } else {
    if (pathname.startsWith('/posts/') && pathname !== '/posts') return '/en/posts';
    if (pathname.startsWith('/tags/') && pathname !== '/tags') return '/en/tags';
    if (pathname === '/') return '/en';
    return '/en' + pathname;
  }
}
