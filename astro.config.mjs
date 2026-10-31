import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/config.ts';
import { defaultLang, dictionaries, localeCodes } from './src/i18n/ui.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * URL prefix for each locale. The default locale lives at the root (`/`), every
 * other locale is prefixed (`/en/`). The sitemap uses the `hreflang` codes.
 */
const localePrefixes = Object.fromEntries(localeCodes.map((code) => [code, dictionaries[code].htmlLang]));

/** Pages that existed before the site became download-only. */
const legacyRedirects = {
  '/download': '/',
  '/about': '/',
  '/features': '/',
  '/features/editor': '/',
  '/features/performance': '/',
  '/features/backends': '/',
  '/features/collaboration': '/',
  '/features/automation': '/',
};

// https://astro.build/config
export default defineConfig({
  site: new URL(SITE.site).toString(),
  output: 'static',
  build: {
    format: 'directory',
  },

  i18n: {
    defaultLocale: defaultLang,
    locales: [...localeCodes],
    routing: {
      // Chinese stays at `/`, everything else is prefixed (`/en/`).
      prefixDefaultLocale: false,
    },
  },

  redirects: legacyRedirects,

  // Prefetch links as they enter the viewport for snappier navigations.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  integrations: [
    sitemap({
      i18n: {
        // Keys are the URL path segments; values are the `hreflang` codes.
        defaultLocale: defaultLang,
        locales: localePrefixes,
      },
    }),
    icon({
      // Local SVGs can be dropped into `src/assets/icons`; Iconify sets (tabler)
      // are resolved from node_modules.
      iconDir: 'src/assets/icons',
      include: {
        tabler: ['*'],
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
