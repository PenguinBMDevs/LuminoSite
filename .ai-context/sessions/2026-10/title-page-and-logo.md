# 2026-10 · 标题页 + 项目自带 Logo

## 任务
1. 标题直接写 `Lumino: 新一代MIDI编辑器`；
2. 标题单独占一整页；
3. Logo 使用项目中已有的资源，不再自绘。

## 结构变化
| 路径 | 变化 |
| --- | --- |
| `/`、`/en/` | 由下载页改为**标题页**（新增 `components/pages/Cover.astro`） |
| `/download/`、`/en/download/` | 下载页迁到这里（`pages/download/index.astro`、`pages/en/download/index.astro`） |
| `/about`、`/features/*` | 仍 301 到 `/`；`/download` 的旧重定向移除（现在是真实页面） |

## 实现要点
- **标题页**：`min-h-[calc(100svh-4rem)]` 撑满一屏，内容为 Logo（96px）+ H1 + 一句说明 + 「前往下载」按钮；H1 文案来自 `home.title`，按 `:` 切分后只给 `Lumino` 上主色，文本内容与需求完全一致。
- **浏览器标题**：`Metadata` / `Layout` / `PageLayout` 新增 `ignoreTitleTemplate`，首页 `<title>` 原样输出 `Lumino: 新一代MIDI编辑器`，不追加 `— Lumino`。
- **导航**：Header 新增站内「下载 / Downloads」链接（`localizePath('/download/', lang)`），当前页通过 `isActivePath` 显示 `text-link` + `aria-current="page"`；Footer 链接列表首项同样是下载页（站内，其余外链带 `target="_blank"`）。
- **Logo**：`public/favicon.ico` 内含单帧 256×256 PNG，直接提取为 `public/logo.png`（字节级复制，未重绘），`SITE.logo` 指向它；`Logo.astro` 从自绘 SVG 改为 `<img src={SITE.logo}>` + 文字字标；删除自绘的 `public/favicon.svg`，`apple-touch-icon` 改用 `logo.png`。
- **英文标题排版**：`Lumino: A Next‑Generation MIDI Editor` 使用不换行连字符（U+2011），避免在 768–1024px 宽度下被拆成 `Next-` / `Generation`；同时封面容器放宽到 `max-w-6xl`，1440px 下整行显示。

## 过程中出现的问题
- 两次 `ReplaceFileW EIO (Win32 32)` 写入失败（外部进程短暂占用文件），重试即可；不影响结果。
- 首页 H1 曾在中宽度因连字符断行，改用 U+2011 解决（视觉一致，复制粘贴得到的也是连字符）。

## 验证
- `npx astro build`：5 个页面（`/`、`/download/`、`/en/`、`/en/download/`、`404`）+ 6 个重定向页，无警告。
- `npx astro check`：27 文件，0 errors / 0 warnings / 0 hints。
- 内部链接审计：0 死链；sitemap 4 条 URL，含 `hreflang` 交替。
- 页面标题：`Lumino: 新一代MIDI编辑器`（中文首页）、`Lumino: A Next‑Generation MIDI Editor`（英文首页）、`下载 — Lumino`（下载页）。
- 无头 Chrome 核对：中文浅色 / 英文深色 / 900px 与 1440px 宽度下的标题换行、下载页当前导航高亮。
