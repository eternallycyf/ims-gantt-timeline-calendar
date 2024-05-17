import { isHoliday } from './holidays';

const taskStartDate = +new Date('2024-01-01');
const taskDayCount = 60 * 60 * 24 * 1000;

// 获取天数
export function getRealDuration(task: any, includeHoliday: any) {
  const { start, duration } = task;
  if (includeHoliday) return task.duration;
  let res = 0;
  const endLen = duration + start;
  for (let i = start; i < endLen; i++) {
    if (isHoliday(new Date(taskStartDate + taskDayCount * i)).isHoliday) continue;
    res++;
  }
  return res;
}
