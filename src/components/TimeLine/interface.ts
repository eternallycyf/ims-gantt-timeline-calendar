import type { CSSProperties, ReactNode } from 'react';
import type { GanttConfig } from './core/config';

export interface GanttTask {
  name?: string;
  start?: number;
  duration?: number;
  resource?: string;
  category?: string;
  fillColor?: string;
  [key: string]: any;
}

export interface Milestone {
  name?: string;
  start: number;
}

export interface GanttDataChangePayload {
  reason: string;
  tasks: GanttTask[];
  mileStones: Milestone[];
  categories: string[];
  categoryColors: Record<string, string>;
}

export interface TimeLineProps {
  /** 任务列表；末尾建议保留一个空对象 `{}` 作为新建行 */
  tasks?: GanttTask[];
  /** 里程碑 */
  mileStones?: Milestone[];
  /** 覆盖默认绘制参数（格子宽、条高、滚动速度等） */
  config?: Partial<GanttConfig>;
  /** 画布容器高度 */
  height?: number | string;
  /** 画布容器样式 */
  style?: CSSProperties;
  className?: string;
  /** 语言：en | zh */
  locale?: 'en' | 'zh';
  /** 双击任务条编辑 */
  onEditTask?: (payload: { index: number; task: GanttTask }) => void;
  /** 右键菜单 */
  onContextMenu?: (payload: { index: number; x: number; y: number }) => void;
  /** 隐藏右键菜单（点击空白） */
  onHideContextMenu?: () => void;
  /** 点击空行虚线框创建任务 */
  onCreateTask?: (payload: { posX: number; posY: number }) => void;
  /** 数据变更回调 */
  onDataChange?: (payload: GanttDataChangePayload) => void;
  /** 水平滚动变化 */
  onScrollXChange?: (scrollX: number) => void;
  /** 额外工具栏（放在画布上方） */
  toolbar?: ReactNode;
}

export type { GanttConfig };
