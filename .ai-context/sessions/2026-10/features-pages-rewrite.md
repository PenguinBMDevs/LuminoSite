## 任务：重写 features/index.astro / features/editor.astro（AstroWind 重构）

- 文件：`src/pages/features/index.astro`（126 行，整体覆盖）、`src/pages/features/editor.astro`（290 行，整体覆盖）
- 区块结构：
  - 功能索引：`PageHeader` → `Features2`（5 张模块卡片）→ `Steps`（isDark，01 编辑器 / 02 渲染器 / 03 协作 / 04 导出）→ `CallToAction layout="banner"`。
  - 编辑器：`PageHeader` → `Content`（slot="visual" 钢琴卷帘示意）→ `Features`（columns=2，工具 / 操作各 4 项）→ `Timeline`（isDark，CanvasState / EditorData / InteractionState / History）→ `CallToAction layout="card"`（引导 `/features/performance`）。
- 关键决策：
  - `Features` 网格按行填充，无法按列分组；因此用 `editTools.flatMap` 把两份 4 项列表交错成 `toolMatrix`，使左列恰好是编辑工具、右列恰好是交互操作。
  - 旧页面的 `.piano-roll-demo` / `.velocity-ruler` 视觉改写为纯 Tailwind：外侧 `rounded-2xl border border-line bg-slate-950 p-4 shadow-xl`，内部沿用 `features/collaboration.astro` 的 panel idiom（`border-b border-white/10 pb-3` 标题栏、`rounded-xl border border-white/10 bg-white/5` 分区、`border-indigo-400/25 bg-indigo-500/10` 状态条）。
  - 音符位置与力度条高度全部写成 Tailwind 字面量类名（`top-[13.5%]`、`h-[42%]` 等），页面零行内 style、零 `<style>` 块；这些字面量必须保留在源码里，否则 Tailwind 扫描不到。
  - `metadata.title` 只写页面名（`功能特性` / `MIDI 编辑器`），后缀由 `METADATA.title.template` 追加；`description` 分别 97 / 111 字符。
  - 每页仅 1 个 isDark 区块（索引页 `Steps`、编辑器页 `Timeline`）；`shadow-xl` 按任务要求不加 `shadow-slate-950/10`（与 download/about 页略有不一致）。
- 依赖关系：`~/layouts/PageLayout.astro`、`~/components/widgets/*`、`~/config`（APP.releases / APP.repository）、`~/utils/permalinks`（getPermalink）、`~/types`（Item / TimelineEntry）。
- 注意事项：
  - 图标逐个比对白名单（piano / bolt / plug-connected / users / vector-spline / gpu / file-music / mouse / eraser / pencil / adjustments / select-all / box-multiple / copy / history / layout-2 / database / gauge / layers-intersect / arrow-right / download / brand-github），全部在 @iconify-json/tabler 中已验证。
  - 无编译权（禁止 npm / npx / astro），仅做静态校验：行数、标签配平、大括号配平、isDark 计数、图标白名单、description 字数、href 全部走 getPermalink / APP。
  - 未提交 git；未改动 `src/components/**`、`src/layouts/**`、`src/config.ts`、`src/navigation.ts`、`src/types.ts`、`src/utils/**`、`src/data/**`。
