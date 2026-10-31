import { SITE } from '~/config';
import { defaultLang, localeCodes, type Lang } from '~/i18n/ui';

/** `/en/...` → `en`; everything else is the default locale. */
export const getLangFromPath = (pathname: string): Lang => {
  const [, first] = pathname.split('/');
  const match = localeCodes.find((code) => code === first && code !== defaultLang);
  return match ?? defaultLang;
};

/** Removes a non-default locale prefix so paths can be re-localised. */
export const stripLocale = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && segments[0] === defaultLang) segments.shift();
  else if (segments.length > 0 && localeCodes.includes(segments[0] as Lang)) segments.shift();

  if (segments.length === 0) return '/';
  const needsTrailingSlash = pathname.endsWith('/');
  return `/${segments.join('/')}${needsTrailingSlash ? '/' : ''}`;
};

/** Localised absolute path for the same page in `lang`. */
export const localizePath = (pathname: string, lang: Lang): string => {
  const base = stripLocale(pathname);
  if (lang === defaultLang) return base;
  return base === '/' ? `/${lang}/` : `/${lang}${base}`;
};

/** Full URL used for canonical and `hreflang` links. */
export const getLocalizedUrl = (pathname: string, lang: Lang): string =>
  new URL(localizePath(pathname, lang), SITE.site).toString();

/** Compares two paths ignoring the trailing slash, for "current page" styling. */
export const isActivePath = (pathname: string, href: string): boolean => {
  const normalize = (value: string) => `/${value.replace(/^\/+/, '').replace(/\/+$/, '')}`;
  return normalize(pathname) === normalize(href);
};

/** Every locale with its localised URL, for the language picker and `hreflang`. */
export const getLocaleLinks = (pathname: string): Array<{ lang: Lang; href: string; url: string }> =>
  localeCodes.map((lang) => ({
    lang,
    href: localizePath(pathname, lang),
    url: getLocalizedUrl(pathname, lang),
  }));
