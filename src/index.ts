export { default as TimeLine } from './components/TimeLine';
export type { TimeLineRef } from './components/TimeLine';
export * from './components/TimeLine/interface';
export { getRandomColor, getLocal, syncLocal } from './components/TimeLine/core/data';
export { applyGanttConfig, getGanttConfig } from './components/TimeLine/core/config';
export { getRealDuration } from './components/TimeLine/utils/task';
export { isHoliday } from './components/TimeLine/utils/holidays';
export { GetUrlParms, getParamsFromSearch, isMobile } from './components/TimeLine/utils';
