import type { Item } from '~/types';
import { getPermalink } from '~/utils/permalinks';

/**
 * Product capabilities. Shared by the home page and the feature index so the
 * wording never drifts between the two.
 */
export const featureItems: Array<Item> = [
  {
    title: 'MIDI 编辑器',
    description: '钢琴卷帘多轨编辑、音符绘制、力度调整与选框批量操作，面向 Black MIDI 高密度场景优化。',
    icon: 'tabler:piano',
    href: getPermalink('/features/editor'),
    callToAction: { text: '查看编辑器', href: getPermalink('/features/editor') },
  },
  {
    title: '渲染器',
    description: '音频渲染（xsynth / KDMAPI / winmm 低延迟输出）与视频渲染（wgpu GPU 加速可视化）。',
    icon: 'tabler:bolt',
    href: getPermalink('/features/performance'),
    callToAction: { text: '查看渲染器', href: getPermalink('/features/performance') },
  },
  {
    title: '多后端 MIDI I/O',
    description: '同时支持 KDMAPI、winmm 与 xsynth 后端，按场景自由切换延迟与兼容性。',
    icon: 'tabler:plug-connected',
    href: getPermalink('/features/backends'),
    callToAction: { text: '查看后端', href: getPermalink('/features/backends') },
  },
  {
    title: '实时协作',
    description: '多用户同步编辑同一工程，自动广播音符、走带与视口状态，团队协作无缝衔接。',
    icon: 'tabler:users',
    href: getPermalink('/features/collaboration'),
    callToAction: { text: '查看协作', href: getPermalink('/features/collaboration') },
  },
  {
    title: '自动化轨道',
    description: 'CC、弯音等控制器曲线支持 Add / Move / Delete / CycleShape，表情与混音控制精准到位。',
    icon: 'tabler:vector-spline',
    href: getPermalink('/features/automation'),
    callToAction: { text: '查看自动化', href: getPermalink('/features/automation') },
  },
  {
    title: '配置持久化',
    description: '自动保存窗口状态、主题设置与编辑偏好，重启后即刻回到熟悉的创作环境。',
    icon: 'tabler:device-floppy',
    href: getPermalink('/features'),
    callToAction: { text: '功能一览', href: getPermalink('/features') },
  },
];

/** Order used by step-by-step flows (editor → renderer → collaborate → export). */
export const workflowSteps: Array<Item> = [
  {
    title: '打开或新建工程',
    description: '读取标准 MIDI 文件，或从空白工程开始编排多轨钢琴卷帘。',
    icon: 'tabler:file-music',
  },
  {
    title: '绘制与编辑',
    description: '画笔、橡皮擦、力度刷与选框工具协作，百万级音符依旧顺滑。',
    icon: 'tabler:pencil',
  },
  {
    title: '实时聆听与预览',
    description: '音频通道低延迟回放，视频通道同步呈现 GPU 加速可视化。',
    icon: 'tabler:player-play',
  },
  {
    title: '协作与导出',
    description: '邀请协作者同步编辑，完成后导出为标准 MIDI 工程。',
    icon: 'tabler:share-3',
  },
];

/** Rust dependencies the project is built on, shown as a technology strip. */
export const techStack: Array<{ name: string; icon: string; href?: string }> = [
  { name: 'Rust', icon: 'tabler:brand-rust', href: 'https://www.rust-lang.org' },
  { name: 'wgpu', icon: 'tabler:gpu', href: 'https://wgpu.rs' },
  { name: 'iced', icon: 'tabler:layout-2', href: 'https://iced.rs' },
  { name: 'winit', icon: 'tabler:window-maximize', href: 'https://github.com/rust-windowing/winit' },
  { name: 'midir', icon: 'tabler:music', href: 'https://github.com/Boddlnagg/midir' },
  { name: 'AGPL-3.0', icon: 'tabler:license', href: 'https://github.com/PenguinBMDevs/lumino-rs/blob/master/LICENSE' },
];
