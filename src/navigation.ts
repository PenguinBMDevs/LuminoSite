import { APP } from '~/config';
import { getPermalink } from '~/utils/permalinks';

export interface NavLink {
  text?: string;
  href?: string;
  ariaLabel?: string;
  icon?: string;
  target?: string;
  links?: Array<NavLink>;
}

export interface FooterLinkGroup {
  title?: string;
  links: Array<NavLink>;
}

export const headerData = {
  links: [
    {
      text: '产品',
      links: [
        { text: '功能一览', href: getPermalink('/features') },
        { text: 'MIDI 编辑器', href: getPermalink('/features/editor') },
        { text: '渲染器', href: getPermalink('/features/performance') },
        { text: 'MIDI 后端', href: getPermalink('/features/backends') },
        { text: '实时协作', href: getPermalink('/features/collaboration') },
        { text: '自动化轨道', href: getPermalink('/features/automation') },
      ],
    },
    { text: '下载', href: getPermalink('/download') },
    { text: '关于', href: getPermalink('/about') },
  ] as Array<NavLink>,
  actions: [
    {
      text: '下载 Lumino',
      href: APP.releases,
      target: '_blank',
      variant: 'primary' as const,
      icon: 'tabler:download',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: '产品',
      links: [
        { text: '功能一览', href: getPermalink('/features') },
        { text: '下载 Lumino', href: getPermalink('/download') },
        { text: '关于 Lumino', href: getPermalink('/about') },
      ],
    },
    {
      title: '功能',
      links: [
        { text: 'MIDI 编辑器', href: getPermalink('/features/editor') },
        { text: '渲染器', href: getPermalink('/features/performance') },
        { text: 'MIDI 后端', href: getPermalink('/features/backends') },
        { text: '实时协作', href: getPermalink('/features/collaboration') },
        { text: '自动化轨道', href: getPermalink('/features/automation') },
      ],
    },
    {
      title: '开发者',
      links: [
        { text: 'GitHub 仓库', href: APP.repository },
        { text: '版本发布', href: APP.releases },
        { text: '问题反馈', href: APP.issues },
        { text: 'AGPL-3.0 许可证', href: APP.license },
      ],
    },
  ] as Array<FooterLinkGroup>,
  secondaryLinks: [
    { text: APP.licenseName, href: APP.license },
    { text: 'GitHub', href: APP.repository },
  ] as Array<NavLink>,
  socialLinks: [
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: APP.repository },
    { ariaLabel: 'GitHub Releases', icon: 'tabler:package', href: APP.releases },
  ] as Array<NavLink>,
  footNote: `© ${new Date().getFullYear()} PenguinBMDevs · Lumino 以 ${APP.licenseName} 发布`,
};
