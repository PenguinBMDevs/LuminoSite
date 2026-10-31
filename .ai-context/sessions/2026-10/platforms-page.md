# 2026-10 · 「平台与源码构建」独立页面

## 反馈
> 中文没做点击「查看平台与源码构建」后的界面哦

## 诊断
构建产物里 `/download/` 其实是存在的（标题页 `下载 Lumino`，含平台清单与源码构建），点击也确实能打开。问题出在两处：

1. **入口文案与落点不一致**：链接写着「查看平台与源码构建」，落点却是一张标题为「下载 Lumino」、主按钮又是「前往 GitHub Releases」的页面，看起来像「没有做这个页面」。
2. **`/download/` 曾经是重定向页**（更早的那一轮把 `/download` 301 到 `/`），浏览器可能缓存了那份 meta refresh，点击后被弹回首页，于是更确信页面不存在。

## 改法
- 新增独立路由 **`/platforms/`** 与 **`/en/platforms/`**，页面标题即「平台与源码构建 / Platforms & build instructions」，内容为：可用平台矩阵 → 从源码构建（前置要求 + 终端命令）→ 许可证 → 返回首页。
- 标题页次链接、页脚内链改指 `/platforms/`；页脚文案同步为「平台与源码构建 / Platforms & build instructions」。
- 组件 `components/pages/Download.astro` → `Platforms.astro`，字典分组 `download` → `platforms`，`meta.download` → `meta.platforms`。
- **`/download` 301 到 `/platforms/`**（覆盖历史链接与缓存），`/about`、`/features/*` 仍 301 到 `/`。
- 下载按钮保持直连 GitHub Releases（页头、标题页主按钮、平台页按钮），不受本次改动影响。
- 404 页「返回下载页」改为「返回首页 / Back to home」。

## 验证
- `npx astro build`：`/`、`/platforms/`、`/en/`、`/en/platforms/`、`404` + 7 个重定向页（含 `/download/` → `/platforms/`）。
- `npx astro check`：27 文件 0 errors / 0 warnings / 0 hints。
- 无头浏览器实测：从中文标题页点击「查看平台与源码构建」→ 落在「平台与源码构建」页（可用平台卡片可见）；页面底部「返回首页」回到标题页。
- 构建产物核对：`dist/platforms/index.html` 含「平台与源码构建」「可用平台」「从源码构建」；`dist/download/index.html` 为 meta refresh 到 `/platforms/`。

## 环境备注
本轮多次出现 `ReplaceFileW EIO (Win32 32)` / “file is being used by another process” —— 编辑器（VS Code）占用文件导致写入偶发失败，改用「写临时文件 + 重试」后全部成功，与代码无关。
