# 2026-10 · Lumino 官网按 AstroWind 模板重构

## 任务
把 `LuminoSite`（原本手写 CSS 的 Astro 4 宣传站，霓虹风）按 AstroWind 模板的结构与设计语言整体重构为组件化站点。

## 结果
- 技术栈从 **Astro 4 + 手写全局 CSS** 升级到 **Astro 7 + Tailwind CSS 4（CSS-first）+ astro-icon(Tabler)**，保留静态输出与原有路由。
- 10 个页面全部重写；旧组件 `components/{FeatureCard,Footer,Header,Hero,PageHeader}.astro` 删除。
- 新增组件体系：`components/{ui,widgets,common}`、`layouts/{Layout,PageLayout}`、`config.ts`、`navigation.ts`、`types.ts`、`data/features.ts`、`utils/{permalinks,utils}.ts`、`assets/styles/tailwind.css`、`assets/images/hero-screenshot.png`。

## 关键决策
1. **跟随模板当前形态**：AstroWind 主线已迁移到 Astro 7 + Tailwind 4（`@tailwindcss/vite` + `@theme`），故同步升级，而非停留在 Astro 4 + Tailwind 3。
2. **Vite 版本锁定**：`@tailwindcss/vite` 的 peer 允许 vite ^8，但 npm 会装出嵌套 vite@5，运行时 `createIdResolver is not a function`。在 devDependencies 固定 `vite@^8.3.5` 使全树去重到同一份 Vite。
3. **`@theme inline`**：Tailwind 4 的 `@theme` 会在 `:root` 解析 `var(--aw-*)`，导致 `<WidgetWrapper isDark>` 的局部深色作用域拿到浅色令牌（深色带的标题变成黑底黑字）。改为 `@theme inline` 后工具类内联 `var(--aw-*)`，按元素解析。
4. **`--color-page` 与 `text-page` 冲突**：同时存在自定义 `text-page` 工具类和 `--color-page` 颜色令牌时，自动生成的 `text-page`（页面背景色）会覆盖文本颜色，浅色模式下按钮文字变白不可见。删除自定义 `text-page`，按钮改用 `text-default`。
5. **配置不引入 vendor 集成**：模板用 `src/config.yaml` + `astrowind:config` 虚拟模块；本项目改为类型化 `src/config.ts`（同时被 `astro.config.mjs` 读取），省掉 YAML 解析与自定义集成。
6. **字体自托管**：不用 Astro 原生 Fonts API（构建期需下载字体），改用 `@fontsource-variable/{inter,jetbrains-mono}`，构建可离线复现。
7. **无 `astro-seo` 依赖**：`common/Metadata.astro` 直接输出 title/description/canonical/robots/OG/Twitter，行为与模板一致但少一个依赖。

## 修复的缺陷（构建后目视验证发现）
- Header 中 `<a><Logo/></a>` 造成嵌套 anchor，浏览器会截断 DOM，移动端头部布局错乱（logo 被挤到中间）。改为直接渲染 `<Logo />`。
- 移动端菜单面板缺少 `bottom-0`，展开时下方露出背景，改为满屏滚动面板。
- `Intersect` 的滚动渐显依赖 IntersectionObserver，无 `prefers-reduced-motion` 或观察器失效时可能永久隐藏内容，补 2.5s 兜底显示 + 减少动画降级。
- Hero 底部装饰光斑被 `overflow-hidden` 裁出硬边，改为光斑不跨出分区边界。

## 验证
- `npx astro build`：10 页面，无警告；生成 WebP 多尺寸图（69KB → 9/17/25/37KB）
- `npx astro check`：47 个文件，0 errors / 0 warnings / 0 hints
- 内部链接检查脚本：10 个页面，0 死链
- 无头 Chrome 截图核对：`/`、`/features/`、`/features/{editor,performance,backends,collaboration,automation}/`、`/download/`、`/about/`、`/404.html`，深浅两套主题 + 390px 移动端 + 移动菜单展开态
- 主题持久化探针：预置 `localStorage['aw-color-mode']='dark'` 后在浅色偏好下仍渲染深色 ✓
- 文件长度：最大 290 行（< 400）

## 注意
- 所有颜色走 `components/CustomStyles.astro` 的 `--aw-*`，改品牌色只需改一处。
- 页面只用 Tailwind 工具类，全局样式集中在 `assets/styles/tailwind.css`；新增样式请加到那里（Astro 的 `<style>` 内 `@apply` 需要 `@reference`）。
- 图标必须是 Tabler 图标名，拼错会在构建期抛 `Unable to locate "<name>" icon!`。
