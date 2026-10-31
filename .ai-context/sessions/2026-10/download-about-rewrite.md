## 任务：重写 download.astro / about.astro（AstroWind 重构）

- 文件：`src/pages/download.astro`（245 行，整体覆盖）、`src/pages/about.astro`（180 行，整体覆盖）
- 关键决策：
  - 统一使用 `PageLayout` + widgets（PageHeader / Content / Note / CallToAction / Features / Brands）+ `~/components/ui/Button.astro`，页面内零 `<style>`、零新增 CSS。
  - `metadata.title` 只写页面名（`下载` / `关于`），由 `METADATA.title.template` 追加 `— Lumino`，与 feature 子页保持一致；`description` 分别为 112 / 107 个字符（含英文技术名）。
  - 自定义视觉统一 `rounded-2xl border border-line bg-slate-950 p-4 shadow-xl shadow-slate-950/10`；终端标题栏三个圆点用 `rose-500/80`、`amber-400/80`、`emerald-500/80`（对齐 `features/performance.astro`）。
  - 版本号、许可证名、仓库地址全部取自 `APP`（`APP.version` / `APP.licenseName` / `APP.repository` / `APP.releases` / `APP.license`），未硬编码。
- 依赖关系：`~/config`（APP）、`~/utils/permalinks`（getPermalink）、`~/data/features`（techStack，about 页 filter 出 winit/wgpu/iced/midir）、`~/components/ui/Button.astro`、`astro-icon/components`。
- 注意事项：
  - 图标仅使用已验证白名单，并逐个比对 `node_modules/@iconify-json/tabler/icons.json`（6499 个图标）确认存在。
  - 项目额外约定：`Header.astro` / `Footer.astro` 已由 `PageLayout` 注入，页面禁止再 import；`isDark` 未使用（0 个）。
  - 无编译权（禁止 npm / npx / astro），仅做静态校验：行数、标签配平、大括号配平、空白与编码扫描、图标存在性。
  - 未提交 git。
