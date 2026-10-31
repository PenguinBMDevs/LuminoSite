/**
 * Non-localised site configuration.
 *
 * Localised copy (titles, descriptions, navigation labels) lives in `src/i18n/ui.ts`;
 * only the values that are identical in every language belong here.
 */

export type ThemeName = 'system' | 'light' | 'dark' | 'light:only' | 'dark:only';

export const SITE = {
  name: 'Lumino',
  /** Deployed origin. Used for canonical URLs, Open Graph and the sitemap. */
  site: 'https://lumino.rs',
  base: '/',
  /** Trailing slashes are emitted by `build.format: 'directory'`. */
  trailingSlash: true,
  /** Project logo, taken from the app icon shipped with the project. */
  logo: '/logo.png',
};

/** Default social metadata; pages override the localised parts. */
export const METADATA = {
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: 'Lumino',
    type: 'website',
    images: [
      {
        url: '/hero-screenshot.png',
        width: 1920,
        height: 1032,
        alt: 'Lumino',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};

/** `system` follows the OS preference; `light:only` / `dark:only` freeze the theme. */
export const UI = {
  theme: 'system' as ThemeName,
};

/** External resources referenced from the header, download page and footer. */
export const APP = {
  repository: 'https://github.com/PenguinBMDevs/lumino-rs',
  releases: 'https://github.com/PenguinBMDevs/lumino-rs/releases',
  issues: 'https://github.com/PenguinBMDevs/lumino-rs/issues',
  license: 'https://github.com/PenguinBMDevs/lumino-rs/blob/master/LICENSE',
  licenseName: 'AGPL-3.0-or-later',
  version: 'v0.2.0-crates-io-preview1',
};
