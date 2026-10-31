# Lumino 官网

Lumino（使用 Rust 构建的 Black MIDI 编辑器）的官方宣传站点，按 [AstroWind](https://github.com/onwidget/astrowind) 模板的结构与设计语言重构。

- **框架**：Astro 7（静态输出 `output: 'static'`）
- **样式**：Tailwind CSS 4（CSS-first 配置，`@tailwindcss/vite` 插件）
- **图标**：`astro-icon` + `@iconify-json/tabler`
- **字体**：`@fontsource-variable` 自托管 Inter / JetBrains Mono，不请求第三方 CDN
- **图片**：`astro:assets` + sharp，构建时自动生成 WebP 与多尺寸 `srcset`

## 开发

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # 输出到 dist/
npm run preview   # 预览构建产物
npm run check     # astro check（类型检查）
```

## 目录结构

```
src/
├── config.ts              # 站点信息、SEO 默认值、外链常量（对应模板的 config.yaml）
├── navigation.ts          # 顶栏 / 页脚导航（对应模板的 navigation.ts）
├── types.ts               # 组件 props 类型
├── assets/
│   ├── images/            # 交给 astro:assets 优化的图片
│   └── styles/tailwind.css # Tailwind 入口 + 设计令牌 + btn 等自定义 utility
├── components/
│   ├── CustomStyles.astro # 浅色 / 深色调色板（--aw-* 变量）
│   ├── Favicons.astro, Logo.astro
│   ├── common/            # Metadata、ApplyColorMode、ToggleTheme、ToggleMenu、Intersect
│   ├── ui/                # Button、Headline、WidgetWrapper
│   └── widgets/           # Hero、PageHeader、Features、Features2、Steps、Stats、Metrics、
│                          # Content、FAQs、Brands、CallToAction、Note、Timeline、Header、Footer
├── data/features.ts       # 功能卡片、工作流、技术栈等共享数据
├── layouts/               # Layout（HTML 骨架 / SEO / 主题）与 PageLayout（Header + main + Footer）
├── pages/                 # 路由：/、/features/*、/download、/about、404
└── utils/                 # permalinks（拼接链接）、utils（列宽、序号等）
```

## 主题与配色

所有颜色都通过 `--aw-*` CSS 变量流动：

- `src/components/CustomStyles.astro` 定义浅色与 `.dark` 两套调色板
- `src/assets/styles/tailwind.css` 把它们映射为 Tailwind 令牌（`text-heading`、`text-muted`、`border-line`、`bg-surface`、`text-primary` …）

改品牌色只需改 `CustomStyles.astro` 里的 `--aw-color-primary / secondary / accent / link`。

默认主题模式由 `src/config.ts` 的 `UI.theme` 控制（`system` / `light` / `dark` / `light:only` / `dark:only`），
用户的选择保存在 `localStorage` 的 `aw-color-mode` 键中。

## 新增一个页面

```astro
---
import PageLayout from '~/layouts/PageLayout.astro';
import PageHeader from '~/components/widgets/PageHeader.astro';
import Features from '~/components/widgets/Features.astro';
---

<PageLayout metadata={{ title: '页面标题', description: '页面描述' }}>
  <PageHeader tagline="Section" title="页面标题" subtitle="一句话说明" />
  <Features title="小节标题" items={[{ title: '要点', description: '说明', icon: 'tabler:check' }]} />
</PageLayout>
```

- `PageLayout` 已包含 Header 与 Footer，页面不再单独引入
- widget 的文案既可以作为 props 传入，也可以通过插槽传入
- 需要自定义视觉时用 `<div slot="visual">…</div>`（`Content`）或直接写在页面里，
  统一使用深色面板风格：`rounded-2xl border border-line bg-slate-950`
- 页面只写 Tailwind utility；新增全局样式请加到 `src/assets/styles/tailwind.css`

## 与 AstroWind 模板的差异

| 模板做法 | 本项目做法 | 原因 |
| --- | --- | --- |
| `src/config.yaml` + `vendor/integration` 虚拟模块 | `src/config.ts` 类型化配置 | 站点只有一个，省掉 YAML 解析与自定义集成 |
| Astro 原生 Fonts API（构建时下载字体） | `@fontsource-variable` 依赖 | 构建环境可离线，字体随包锁定版本 |
| `astro-seo` + Open Graph 工具函数 | `common/Metadata.astro` 直接输出 meta | 依赖更少，输出一致 |
| 博客 / i18n / 多主题首页 | 未启用 | 宣传站不需要 |

## 维护提示

- 更新下载地址：`src/config.ts` 的 `APP.releases`
- 更新版本号：`src/config.ts` 的 `APP.version`
- 新增功能卡片：`src/data/features.ts` 的 `featureItems`
- 图标必须是 Tabler 图标名（`tabler:…`），拼错会在构建时报错
