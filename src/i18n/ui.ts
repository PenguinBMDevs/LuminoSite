/**
 * Localised copy for the whole site.
 *
 * The site is a download page, so every user-facing string lives here: page copy,
 * navigation, metadata and the 404 page. Adding a language means adding one entry
 * to `dictionaries` (and to `languages`) — no component changes.
 */

export const languages = {
  zh: { label: '简体中文', short: '中文' },
  en: { label: 'English', short: 'EN' },
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'zh';

export interface Platform {
  name: string;
  icon: string;
  archs: Array<string>;
  note: string;
}

export interface Dictionary {
  /** Value for `<html lang>`. */
  htmlLang: string;
  /** Open Graph locale, e.g. `zh_CN`. */
  ogLocale: string;

  meta: {
    titleTemplate: string;
    home: { title: string; description: string };
    download: { title: string; description: string };
    notFound: { title: string; description: string };
  };

  a11y: {
    skipToContent: string;
    toggleTheme: string;
    languagePicker: string;
    home: string;
    externalLink: string;
  };

  header: {
    download: string;
  };

  home: {
    /** Rendered verbatim as the page heading, e.g. `Lumino: 新一代MIDI编辑器`. */
    title: string;
    description: string;
    cta: string;
    /** Secondary link to the download page (platform matrix + source build). */
    infoLink: string;
  };

  download: {
    title: string;
    subtitle: string;
    releaseButton: string;
    versionLabel: string;
    versionNote: string;
    platformsHeading: string;
    platformsHint: string;
    platforms: Array<Platform>;
    sourceHeading: string;
    sourceSubtitle: string;
    requirementsHeading: string;
    requirements: Array<string>;
    terminalLabel: string;
    terminalNote: string;
    licenseHeading: string;
    licenseText: string;
    licenseLink: string;
  };

  footer: {
    tagline: string;
    linksHeading: string;
    /** Label of the internal link to the download page (not a download action). */
    downloadPage: string;
    links: Array<{ text: string; href: string }>;
    rights: string;
    licenseLine: string;
  };

  notFound: {
    eyebrow: string;
    title: string;
    text: string;
    backHome: string;
  };
}

const zh: Dictionary = {
  htmlLang: 'zh-CN',
  ogLocale: 'zh_CN',

  meta: {
    titleTemplate: '%s — Lumino',
    home: {
      title: 'Lumino: 新一代MIDI编辑器',
      description: 'Lumino 官方网站。下载页提供 Windows、macOS 与 Linux 安装包，以及从源码构建的说明。',
    },
    download: {
      title: '下载',
      description:
        'Lumino 各平台安装包与源码构建说明。Windows、macOS 与 Linux 安装包统一发布于 GitHub Releases，也可用 cargo 从源码编译。',
    },
    notFound: {
      title: '页面不存在',
      description: '没有找到你访问的页面，请返回下载页获取 Lumino 的安装包。',
    },
  },

  a11y: {
    skipToContent: '跳到主内容',
    toggleTheme: '切换深色 / 浅色主题',
    languagePicker: '切换语言',
    home: 'Lumino 首页',
    externalLink: '在新标签页打开',
  },

  header: {
    download: '下载',
  },

  home: {
    title: 'Lumino: 新一代MIDI编辑器',
    description: '点击下载即可前往 GitHub Releases 获取安装包；安装包说明与源码构建步骤另见下载页。',
    cta: '下载 Lumino',
    infoLink: '查看平台与源码构建',
  },

  download: {
    title: '下载 Lumino',
    subtitle: '安装包统一发布于 GitHub Releases 页面，请选择与你的操作系统和 CPU 架构匹配的文件。',
    releaseButton: '前往 GitHub Releases',
    versionLabel: '最新版本',
    versionNote: '版本号与文件列表以 Releases 页面为准。',
    platformsHeading: '可用平台',
    platformsHint: 'Windows 与 macOS 需按 CPU 架构选择，Linux 提供 AppImage、deb 与 rpm 三种格式。',
    platforms: [
      {
        name: 'Windows',
        icon: 'tabler:brand-windows',
        archs: ['x86_64', 'aarch64'],
        note: '安装包区分 x86_64 与 aarch64 两种架构。',
      },
      {
        name: 'macOS',
        icon: 'tabler:brand-apple',
        archs: ['x86_64', 'Apple Silicon'],
        note: '安装包区分 Intel 与 Apple Silicon 两种版本。',
      },
      {
        name: 'Linux',
        icon: 'tabler:brand-ubuntu',
        archs: ['x86_64', 'aarch64'],
        note: '提供 AppImage、deb 与 rpm，AppImage 可直接运行。',
      },
    ],
    sourceHeading: '从源码构建',
    sourceSubtitle: 'Lumino 是开源项目，克隆仓库后即可用 cargo 在本地编译。',
    requirementsHeading: '前置要求',
    requirements: [
      'Rust 1.94.0 或更高版本',
      'Windows：MSVC / Visual Studio Build Tools',
      'macOS：Xcode Command Line Tools',
      'Linux：GCC / Clang 与 pkg-config',
    ],
    terminalLabel: 'bash · lumino-rs',
    terminalNote: '构建产物位于 target/release/。',
    licenseHeading: '许可证',
    licenseText: 'Lumino 以 AGPL-3.0-or-later 发布，源代码托管在 GitHub，可自由获取与审查。',
    licenseLink: '查看 LICENSE 原文',
  },

  footer: {
    tagline: 'PenguinBMDevs 维护的开源 MIDI 编辑器，使用 Rust 编写。',
    linksHeading: '链接',
    downloadPage: '下载页',
    links: [
      { text: 'GitHub 仓库', href: 'https://github.com/PenguinBMDevs/lumino-rs' },
      { text: '版本发布', href: 'https://github.com/PenguinBMDevs/lumino-rs/releases' },
      { text: '问题反馈', href: 'https://github.com/PenguinBMDevs/lumino-rs/issues' },
    ],
    rights: '© {year} PenguinBMDevs',
    licenseLine: '以 AGPL-3.0-or-later 发布',
  },

  notFound: {
    eyebrow: '404',
    title: '找不到这个页面',
    text: '你访问的链接可能已经失效，或者地址输入有误。',
    backHome: '返回下载页',
  },
};

const en: Dictionary = {
  htmlLang: 'en',
  ogLocale: 'en_US',

  meta: {
    titleTemplate: '%s — Lumino',
    home: {
      title: 'Lumino: A Next‑Generation MIDI Editor',
      description:
        'The official Lumino site. The download page lists Windows, macOS and Linux builds, plus source build instructions.',
    },
    download: {
      title: 'Download',
      description:
        'Download Lumino for Windows, macOS and Linux. Builds are published on GitHub Releases, and Lumino can also be built from source with cargo.',
    },
    notFound: {
      title: 'Page not found',
      description: 'The page you are looking for does not exist. Head back to the download page to get Lumino.',
    },
  },

  a11y: {
    skipToContent: 'Skip to content',
    toggleTheme: 'Toggle dark / light theme',
    languagePicker: 'Change language',
    home: 'Lumino home',
    externalLink: 'Opens in a new tab',
  },

  header: {
    download: 'Downloads',
  },

  home: {
    title: 'Lumino: A Next‑Generation MIDI Editor',
    description:
      'Downloading takes you straight to GitHub Releases; platform notes and source build steps live on the download page.',
    cta: 'Download Lumino',
    infoLink: 'Platforms & build instructions',
  },

  download: {
    title: 'Download Lumino',
    subtitle:
      'Every build is published on GitHub Releases. Pick the file that matches your operating system and CPU architecture.',
    releaseButton: 'Go to GitHub Releases',
    versionLabel: 'Latest release',
    versionNote: 'Version numbers and the file list are managed on the Releases page.',
    platformsHeading: 'Available platforms',
    platformsHint: 'Windows and macOS builds are split by CPU architecture; Linux ships as AppImage, deb and rpm.',
    platforms: [
      {
        name: 'Windows',
        icon: 'tabler:brand-windows',
        archs: ['x86_64', 'aarch64'],
        note: 'Builds are published for x86_64 and aarch64.',
      },
      {
        name: 'macOS',
        icon: 'tabler:brand-apple',
        archs: ['x86_64', 'Apple Silicon'],
        note: 'Builds are published for Intel and Apple Silicon.',
      },
      {
        name: 'Linux',
        icon: 'tabler:brand-ubuntu',
        archs: ['x86_64', 'aarch64'],
        note: 'Available as AppImage, deb and rpm; the AppImage runs standalone.',
      },
    ],
    sourceHeading: 'Build from source',
    sourceSubtitle: 'Lumino is open source. Clone the repository and build it locally with cargo.',
    requirementsHeading: 'Requirements',
    requirements: [
      'Rust 1.94.0 or newer',
      'Windows: MSVC / Visual Studio Build Tools',
      'macOS: Xcode Command Line Tools',
      'Linux: GCC / Clang and pkg-config',
    ],
    terminalLabel: 'bash · lumino-rs',
    terminalNote: 'The binary is written to target/release/.',
    licenseHeading: 'License',
    licenseText:
      'Lumino is released under AGPL-3.0-or-later. The source code is hosted on GitHub and can be read and reviewed freely.',
    licenseLink: 'Read the LICENSE',
  },

  footer: {
    tagline: 'An open source MIDI editor written in Rust, maintained by PenguinBMDevs.',
    linksHeading: 'Links',
    downloadPage: 'Downloads page',
    links: [
      { text: 'GitHub repository', href: 'https://github.com/PenguinBMDevs/lumino-rs' },
      { text: 'Releases', href: 'https://github.com/PenguinBMDevs/lumino-rs/releases' },
      { text: 'Issue tracker', href: 'https://github.com/PenguinBMDevs/lumino-rs/issues' },
    ],
    rights: '© {year} PenguinBMDevs',
    licenseLine: 'Released under AGPL-3.0-or-later',
  },

  notFound: {
    eyebrow: '404',
    title: 'Page not found',
    text: 'The link may be outdated, or the address was typed incorrectly.',
    backHome: 'Back to downloads',
  },
};

export const dictionaries: Record<Lang, Dictionary> = { zh, en };

/** Dictionary for `lang`, falling back to the default locale for unknown codes. */
export const getDictionary = (lang: Lang): Dictionary => dictionaries[lang] ?? dictionaries[defaultLang];

/** Locale codes for the Astro i18n config, in navigation order. */
export const localeCodes = Object.keys(languages) as Array<Lang>;
