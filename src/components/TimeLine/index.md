---
title: TimeLine
toc: content
group:
  title: 组件
  order: 0
demo:
  cols: 1
---

基于 [zrender](https://ecomfe.github.io/zrender-doc/public/) Canvas 实现的甘特 / Timeline，交互参考飞书甘特图与 Notion Timeline。

## 功能

- 时间轴、日期格、休息日斜线、今日线、里程碑
- 任务条拖拽（水平移动 / 上下换行）、左右拉伸 duration
- Hover 日期 🚩 创建/删除里程碑；空行虚线框新建任务
- 视口外左右箭头定位；窗口 resize / 横向滚动重绘
- 可选 week / month 视图；localStorage / 远端持久化

<code transform="true" compact="true" src="./demo/index.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tasks | 任务列表（末尾可留 `{}` 空行） | `GanttTask[]` | demo 数据 |
| mileStones | 里程碑 | `Milestone[]` | - |
| config | 绘制参数（unitWidth、barHeight、view 等） | `Partial<GanttConfig>` | - |
| height | 画布高度 | `number \| string` | `420` |
| locale | 语言 | `'zh' \| 'en'` | `'zh'` |
| onEditTask | 双击任务；不传则用内置 Modal | `fn` | - |
| onContextMenu | 右键菜单；不传则用内置菜单 | `fn` | - |
| onCreateTask | 空行点击创建；不传则用内置 Modal | `fn` | - |
| onDataChange | 数据变更 | `fn` | - |

通过 `ref` 可调用 `resetScroll` / `clearTasks` / `updateTask` / `addTasks` 等。
