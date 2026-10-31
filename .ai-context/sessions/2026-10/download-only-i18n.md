# 2026-10 · 站点改为「多语言下载页」

## 任务
在上一轮 AstroWind 重构（commit `315405d`）基础上继续：
1. 增加 i18n 支持；
2. 去掉功能性宣传内容，站点只保留下载页。

## 结构变化
- 删除页面：`/features/*`（7 个）、`/about`、`/download`。
- 新增页面：`/`（中文下载页）、`/en/`（英文下载页）、双语 `404`。
- 旧地址在 `astro.config.mjs` 的 `redirects` 里 301 到 `/`：`/download`、`/about`、`/features/*`（共 8 条）。
- 删除随宣传页一起失去用途的组件：`widgets/{Brands,CallToAction,Content,FAQs,Features,Features2,Hero,Metrics,Note,PageHeader,Stats,Steps,Timeline}.astro`、`ui/{Headline,WidgetWrapper}.astro`、`common/ToggleMenu.astro`、`data/features.ts`、`utils/{permalinks,utils}.ts`、`navigation.ts`、`assets/images/`。
- 新增：`i18n/{ui,utils}.ts`、`components/pages/Download.astro`、`widgets/LanguagePicker.astro`、`pages/en/index.astro`。
- 保留并可复用的骨架：`layouts/{Layout,PageLayout}`、`components/{common,ui,assets/styles}`、`CustomStyles.astro`。

## i18n 设计
- 单一事实来源：[src/i18n/ui.ts](../../../src/i18n/ui.ts) 的 `Dictionary` 接口 + `zh` / `en` 两份字典；组件只读 `getDictionary(lang)`。
- URL 规则：默认语言无前缀（`/`），其余带前缀（`/en/`），由 `astro.config.mjs` 的 `i18n.routing.prefixDefaultLocale: false` 表达。
- 派生能力全部集中在 [src/i18n/utils.ts](../../../src/i18n/utils.ts)：`getLangFromPath`、`stripLocale`、`localizePath`、`getLocalizedUrl`、`getLocaleLinks`。
- SEO：`Metadata.astro` 生成 canonical、`hreflang`（含 `x-default`）、`og:locale` + `og:locale:alternate`；sitemap 通过 `@astrojs/sitemap` 的 `i18n` 选项输出 `xhtml:link`，`defaultLocale` 必须是 locales 的**路径键**（`zh`），不是 hreflang 值（`zh-CN`）。
- 语言切换器 `LanguagePicker.astro` 用 `localizePath(Astro.url.pathname, code)` 保持当前页面不变。

## 过程中的问题与修复
1. `getDictionary` 最初放在 `i18n/utils.ts`，而页面从 `i18n/ui.ts` 导入 → 构建报 `MISSING_EXPORT`。改为在 `ui.ts` 导出（数据层职责），`utils.ts` 只保留路径工具。
2. `Logo.astro` 仍引用已删除的 `~/utils/permalinks` → 改为 `localizePath('/', lang)`，lang 由 props 传入或从 `Astro.url.pathname` 推导。
3. `astro-icon` 默认找不到 `src/icons` 会警告 → 显式设置 `iconDir: 'src/assets/icons'` 并保留空目录（`.gitkeep`）。
4. sitemap i18n 报 `defaultLocale` 不在 `locales` 中 → 传路径键 `zh` 而非 `zh-CN`。
5. 英文页出现中文全角冒号（`License：AGPL-3.0-or-later`）→ 标题与许可证名拆成「标题 + 等宽徽章」，与语言无关。
6. 首屏 eyebrow（`DOWNLOAD`）与 H1 重复 → 删除该字段与元素。

## 验证
- `npx astro build`：3 个真实页面 + 8 个重定向页，无警告；sitemap 含 `hreflang` 交替链接。
- `npx astro check`：24 个文件，0 errors / 0 warnings / 0 hints。
- 无头 Chrome：中文/英文 × 浅色/深色 × 1440px 与 390px；语言切换点击（`/en/` → 中文）实测跳转到 `/`；主题切换与持久化保持可用。
- `<html lang>`：`zh-CN` / `en`；redirect 页含 `noindex` 与 canonical。
