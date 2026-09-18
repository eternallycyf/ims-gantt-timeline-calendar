export type GanttView = '' | 'week' | 'month' | string;

export interface GanttConfig {
  debug: boolean;
  defaultTaskOwner: string;
  unitWidth: number;
  halfUnitWidth: number;
  taskNamePaddingLeft: number;
  initChartStartX: number;
  initChartStartY: number;
  timeScaleHeight: number;
  milestoneTopHeight: number;
  barHeight: number;
  barMargin: number;
  scrollSpeed: number;
  includeHoliday: boolean;
  useLocal: boolean;
  useRemote: boolean;
  view: GanttView;
  viewDate: string;
  mockTaskSize: number;
  dayMs: number;
  baseDate: Date;
  todayOffset: number;
  initLastScrollX: number;
  categoryFilter: string | null;
  showFilter: boolean;
  arrowSize: number;
  showArrow: boolean;
  isMobile: boolean;
}

export let currentGroup: any = null;
export const setCurrentGroup = (val: any) => {
  currentGroup = val;
};

export let debug = false;
export let defaultTaskOwner = 'alexq';
export let unitWidth = 160;
export let halfUnitWidth = unitWidth / 2;
export let taskNamePaddingLeft = 15;
export let initChartStartX = 1;
export let initChartStartY = 50;
export let timeScaleHeight = 20;
export let milestoneTopHeight = 20;
export let barHeight = 30;
export let barMargin = 1;
export let scrollSpeed = 35;
export let includeHoliday = false;
export let useLocal = false;
export let useRemote = false;
export let view: GanttView = '';
export let viewDate = '';
export let mockTaskSize = 0;
export let dayMs = 24 * 60 * 60 * 1000;
export let baseDate = new Date(2024, 0, 1);
export let todayOffset = Math.floor((Date.now() - baseDate.getTime()) / dayMs);
export let initLastScrollX = (todayOffset - 1) * unitWidth;
export let categoryFilter: string | null = null;
export let showFilter = false;
export let arrowSize = (barHeight / 3) * 2;
export let showArrow = true;
export let isMobile =
  typeof navigator !== 'undefined'
    ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    : false;

export function applyGanttConfig(partial: Partial<GanttConfig> = {}) {
  if (partial.debug !== undefined) debug = partial.debug;
  if (partial.defaultTaskOwner !== undefined) defaultTaskOwner = partial.defaultTaskOwner;
  if (partial.unitWidth !== undefined) unitWidth = partial.unitWidth;
  if (partial.taskNamePaddingLeft !== undefined) taskNamePaddingLeft = partial.taskNamePaddingLeft;
  if (partial.initChartStartX !== undefined) initChartStartX = partial.initChartStartX;
  if (partial.initChartStartY !== undefined) initChartStartY = partial.initChartStartY;
  if (partial.timeScaleHeight !== undefined) timeScaleHeight = partial.timeScaleHeight;
  if (partial.milestoneTopHeight !== undefined) milestoneTopHeight = partial.milestoneTopHeight;
  if (partial.barHeight !== undefined) barHeight = partial.barHeight;
  if (partial.barMargin !== undefined) barMargin = partial.barMargin;
  if (partial.scrollSpeed !== undefined) scrollSpeed = partial.scrollSpeed;
  if (partial.includeHoliday !== undefined) includeHoliday = partial.includeHoliday;
  if (partial.useLocal !== undefined) useLocal = partial.useLocal;
  if (partial.useRemote !== undefined) useRemote = partial.useRemote;
  if (partial.view !== undefined) view = partial.view;
  if (partial.viewDate !== undefined) viewDate = partial.viewDate;
  if (partial.mockTaskSize !== undefined) mockTaskSize = partial.mockTaskSize;
  if (partial.dayMs !== undefined) dayMs = partial.dayMs;
  if (partial.baseDate !== undefined) baseDate = partial.baseDate;
  if (partial.categoryFilter !== undefined) categoryFilter = partial.categoryFilter;
  if (partial.showFilter !== undefined) showFilter = partial.showFilter;
  if (partial.showArrow !== undefined) showArrow = partial.showArrow;
  if (partial.isMobile !== undefined) isMobile = partial.isMobile;

  halfUnitWidth = unitWidth / 2;
  barMargin = debug ? 10 : barMargin;
  arrowSize = (barHeight / 3) * 2;
  todayOffset =
    partial.todayOffset ?? Math.floor((Date.now() - baseDate.getTime()) / dayMs);
  initLastScrollX = partial.initLastScrollX ?? (todayOffset - 1) * unitWidth;
}

export function getGanttConfig(): GanttConfig {
  return {
    debug,
    defaultTaskOwner,
    unitWidth,
    halfUnitWidth,
    taskNamePaddingLeft,
    initChartStartX,
    initChartStartY,
    timeScaleHeight,
    milestoneTopHeight,
    barHeight,
    barMargin,
    scrollSpeed,
    includeHoliday,
    useLocal,
    useRemote,
    view,
    viewDate,
    mockTaskSize,
    dayMs,
    baseDate,
    todayOffset,
    initLastScrollX,
    categoryFilter,
    showFilter,
    arrowSize,
    showArrow,
    isMobile,
  };
}
