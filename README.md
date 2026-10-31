# Lumino 官网

Lumino（Rust 编写的开源 MIDI 编辑器）的官方站点。按 [AstroWind](https://github.com/onwidget/astrowind) 模板的结构与设计语言搭建，**只保留下载页**：不包含功能宣传页，所有平台安装包与源码构建说明集中在一个页面里，并提供中英双语。

- **框架**：Astro 7（`output: 'static'`，`build.format: 'directory'`）
- **样式**：Tailwind CSS 4（CSS-first，`@tailwindcss/vite`）
- **图标**：`astro-icon` + `@iconify-json/tabler`
- **字体**：`@fontsource-variable` 自托管 Inter / JetBrains Mono（构建期不请求第三方 CDN）
- **国际化**：Astro i18n 路由，默认 `zh`（`/`），英文（`/en/`）

## 开发

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # 输出到 dist/
npm run preview   # 预览 dist/
npm run check     # astro check（类型检查）
```

## 目录结构

```
src/
├── config.ts                 # 站点/社交元数据、主题模式、外部链接（含版本号）
├── i18n/
│   ├── ui.ts                 # 各语言全部文案 + 语言列表（加语言只改这里）
│   └── utils.ts              # 路径本地化、hreflang、语言识别
├── components/
│   ├── CustomStyles.astro    # 浅色 / 深色调色板（--aw-* 变量）
│   ├── Favicons.astro, Logo.astro
│   ├── common/               # Metadata、ApplyColorMode、ToggleTheme、Intersect
│   ├── pages/Download.astro  # 下载页正文（两个语言共用）
│   ├── ui/Button.astro
│   └── widgets/              # Header、Footer、LanguagePicker
├── layouts/
│   ├── Layout.astro          # html 骨架 / 主题初始化 / SEO
│   └── PageLayout.astro      # Header + main + Footer
├── pages/
│   ├── index.astro           # /      （中文下载页）
│   ├── en/index.astro        # /en/   （英文下载页）
│   └── 404.astro             # 双语 404
└── assets/styles/tailwind.css
```

## 国际化

所有用户可见文案都在 [src/i18n/ui.ts](src/i18n/ui.ts) 的 `Dictionary` 里，组件只读 `getDictionary(lang)`，不硬编码文字。

**新增一门语言**（以日语为例）：

1. `src/i18n/ui.ts`：在 `languages` 加 `ja: { label: '日本語', short: 'JA' }`，在 `dictionaries` 补一份 `ja` 字典；
2. 新建 `src/pages/ja/index.astro`，内容与 `src/pages/en/index.astro` 相同，把 `const lang: Lang = 'ja'`；
3. `astro.config.mjs` 的 `i18n.locales` 会自动读取 `localeCodes`，无需改动。

URL 规则：默认语言不带前缀（`/`），其他语言带前缀（`/en/`、`/ja/`）。
`<link rel="alternate" hreflang>`、`og:locale`、sitemap 的 `xhtml:link` 都由 `src/i18n/utils.ts` 自动生成。

## 主题与配色

所有颜色通过 `--aw-*` CSS 变量流动：`src/components/CustomStyles.astro` 定义浅色与 `.dark` 两套调色板，
`src/assets/styles/tailwind.css` 用 `@theme inline` 把它们映射成 Tailwind 令牌
（`text-heading`、`text-muted`、`border-line`、`bg-surface`、`text-primary` …）。

改品牌色只需改 `CustomStyles.astro` 里的 `--aw-color-primary / secondary / accent / link`。
默认主题模式由 `src/config.ts` 的 `UI.theme` 控制（`system` / `light` / `dark` / `light:only` / `dark:only`），
用户选择保存在 `localStorage` 的 `aw-color-mode` 键。

## 旧链接

站点改为单一下载页后，历史地址统一 301 到首页（见 `astro.config.mjs` 的 `redirects`）：
`/download`、`/about`、`/features/*` → `/`。

## 维护提示

| 要改什么 | 改哪里 |
| --- | --- |
| 下载地址 / 仓库 / 许可证链接、版本号 | `src/config.ts` 的 `APP` |
| 页面文案（含标题、描述、平台说明） | `src/i18n/ui.ts` |
| 平台列表（名称、架构、说明） | `src/i18n/ui.ts` 的 `download.platforms` |
| 品牌色 / 深浅色 | `src/components/CustomStyles.astro` |
| 按钮等通用样式 | `src/assets/styles/tailwind.css` |

图标必须使用 Tabler 图标名（`tabler:…`），拼错会在构建期报 `Unable to locate "<name>" icon!`。

## 与 AstroWind 模板的差异

| 模板做法 | 本项目做法 | 原因 |
| --- | --- | --- |
| `src/config.yaml` + vendor 集成虚拟模块 | `src/config.ts` 类型化配置 | 站点只有一个，省掉 YAML 解析 |
| Astro 原生 Fonts API（构建期下载字体） | `@fontsource-variable` 依赖 | 构建可离线复现 |
| `astro-seo` | `common/Metadata.astro` 直接输出 meta | 依赖更少，输出一致 |
| 博客 / 多套首页 / 组件商城式 widgets | 只保留下载页所需组件 | 站点目标单一 |
