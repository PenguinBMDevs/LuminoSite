/**
 * Site configuration.
 *
 * AstroWind keeps this in `src/config.yaml` and exposes it through a custom
 * integration (`astrowind:config`). This project has no integration layer, so the
 * same data lives in a typed module — same shape, no YAML parsing at build time.
 */

export type ThemeName = 'system' | 'light' | 'dark' | 'light:only' | 'dark:only';

export const SITE = {
  name: 'Lumino',
  /** Deployed origin. Used for canonical URLs, Open Graph and the sitemap. */
  site: 'https://lumino.rs',
  base: '/',
  /** Trailing slashes are emitted by `build.format: 'directory'`. */
  trailingSlash: true,
};

/** Default SEO metadata, overridable per page through `PageLayout`'s `metadata` prop. */
export const METADATA = {
  title: {
    default: 'Lumino — 为 Black MIDI 打造的新一代 MIDI 编辑器',
    template: '%s — Lumino',
  },
  description:
    'Lumino 是一个使用 Rust 构建的跨平台 MIDI 编辑器，基于 wgpu 与 iced，面向 Black MIDI 高密度工程，提供低延迟渲染、多后端 MIDI I/O 与实时协作。',
  keywords: ['MIDI 编辑器', 'Black MIDI', 'Rust', 'wgpu', 'iced', 'Lumino'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    site_name: 'Lumino',
    type: 'website',
    images: [
      {
        url: '/hero-screenshot.png',
        width: 1200,
        height: 630,
        alt: 'Lumino MIDI 编辑器钢琴卷帘界面',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};

export const I18N = {
  language: 'zh-CN',
  textDirection: 'ltr' as const,
};

/** `system` follows the OS preference; `light:only` / `dark:only` freeze the theme. */
export const UI = {
  theme: 'system' as ThemeName,
};

/** External resources referenced from navigation, pages and widgets. */
export const APP = {
  repository: 'https://github.com/PenguinBMDevs/lumino-rs',
  releases: 'https://github.com/PenguinBMDevs/lumino-rs/releases',
  issues: 'https://github.com/PenguinBMDevs/lumino-rs/issues',
  license: 'https://github.com/PenguinBMDevs/lumino-rs/blob/master/LICENSE',
  licenseName: 'AGPL-3.0-or-later',
  version: 'v0.2.0-crates-io-preview1',
};
