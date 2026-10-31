import { SITE } from '~/config';

/** Removes leading and trailing slashes so paths can be joined safely. */
export const trimSlash = (value = ''): string => value.replace(/^\/+/, '').replace(/\/+$/, '');

const basePath = (): string => {
  const base = trimSlash(SITE.base);
  return base ? `/${base}` : '';
};

/** Home link, e.g. `/`. */
export const getHomePermalink = (): string => `${basePath()}/`;

/** Absolute-path link with the trailing slash that `build.format: 'directory'` produces. */
export const getPermalink = (path = ''): string => {
  const clean = trimSlash(path);
  const base = basePath();
  if (!clean) return `${base}/`;
  return SITE.trailingSlash ? `${base}/${clean}/` : `${base}/${clean}`;
};

/** Link to a file served from `public/`, e.g. `/favicon.ico`. */
export const getAsset = (asset = ''): string => {
  const base = basePath();
  const clean = trimSlash(asset);
  return clean ? `${base}/${clean}` : `${base}/`;
};

/** Canonical URL for a page path. */
export const getCanonical = (path = ''): string => new URL(path, SITE.site).toString();

/** Compares two paths ignoring trailing slashes and the configured base. */
export const isSamePath = (a = '', b = ''): boolean => {
  const normalize = (value: string) => {
    const base = trimSlash(SITE.base);
    const withoutBase = base && value.startsWith(`/${base}`) ? value.slice(base.length + 1) : value;
    return `/${trimSlash(withoutBase)}`;
  };
  return normalize(a) === normalize(b);
};
