# 2026-10 · 下载按钮直连 GitHub Releases

## 任务
保留「点下载就跳到 GitHub Releases」的习惯，不要先绕到站内下载页。

## 现状与改法
上一轮把页头的「下载」做成了站内导航（`/download/`），标题页主按钮也指向站内页面。本轮恢复为：

| 位置 | 行为 |
| --- | --- |
| 页头按钮（桌面文字按钮 + 移动端图标按钮） | `APP.releases`，`target="_blank"` |
| 标题页主按钮「下载 Lumino / Download Lumino」 | `APP.releases` |
| 下载页顶部按钮「前往 GitHub Releases」 | `APP.releases`（本来就如此） |
| 标题页次链接「查看平台与源码构建 / Platforms & build instructions」 | 站内 `/download/`（只作为资料页入口） |
| 页脚首项 | 改名「下载页 / Downloads page」，指向站内 `/download/` |

## 实现细节
- `Header` 去掉站内导航链接与 `aria-current` 逻辑，恢复为 `ui/Button`（`primary`）+ 移动端图标按钮；不再依赖 `isActivePath`。
- `i18n/utils.ts` 删除已无引用的 `isActivePath`。
- 字典新增 `home.infoLink`、`footer.downloadPage`；`home.cta` 改为「下载 Lumino / Download Lumino」，`home.description` 改为说明「点击下载即前往 GitHub Releases」。
- `Cover.astro` 主按钮指向 `APP.releases`，下方增加指向 `/download/` 的次级文字链接（带箭头图标）。

## 验证
- `npx astro build`：5 页面 + 6 重定向页，无警告；`npx astro check`：27 文件 0/0/0。
- 链接审计：0 死链；标题页主按钮 href 实测为 `https://github.com/PenguinBMDevs/lumino-rs/releases`。
- 无头 Chrome：中文浅色 / 英文深色标题页，页头按钮与主按钮均指向 Releases，次链接进入 `/download/`。
