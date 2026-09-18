import { categoryFilter, useLocal, useRemote, view } from './config';
import { t } from './i18n';
import type { GanttTask, Milestone } from '../interface';

declare global {
  interface Window {
    tasks: GanttTask[];
    mileStones: Milestone[];
    syncLocal?: typeof syncLocal;
    redrawChart?: (clear?: boolean, scrollX?: number, scrollY?: number) => void;
  }
}

const defaultValues: Record<string, GanttTask[] | Milestone[]> = {
  tasks: [{}],
  mileStones: [],
};

export function syncLocal(_key?: string) {
  if (categoryFilter) return;
  if (syncRemote()) return;
  if (!useLocal) return;
  Object.keys(defaultValues).forEach((key) => {
    const lastLocalStorage = localStorage.getItem(key);
    try {
      localStorage.setItem(key, JSON.stringify((window as any)[key]));
    } catch (error) {
      console.error('fail to syncLocal');
      if (lastLocalStorage != null) {
        localStorage.setItem(key, lastLocalStorage);
      }
    }
  });
}

if (typeof window !== 'undefined') {
  window.syncLocal = syncLocal;
}

let timer: ReturnType<typeof setTimeout> | null = null;

function syncRemote() {
  if (useRemote) {
    const data = { tasks: window.tasks, mileStones: window.mileStones };
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      recordUpdate(data).then((res) => {
        if (res.status === 0) {
          console.log('recordUpdate成功', res);
        }
      });
    }, 200);
    return true;
  }
  return false;
}

const remoteHost =
  typeof localStorage !== 'undefined' && localStorage.getItem('remoteHost')
    ? localStorage.getItem('remoteHost')!
    : 'http://localhost:3004';

function recordUpdate(data: { tasks: GanttTask[]; mileStones: Milestone[] }) {
  return fetch(`${remoteHost}/record/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ view, ...data }),
  }).then((res) => res.json());
}

function recordQuery() {
  return fetch(`${remoteHost}/record/query${view ? `?view=${view}` : ''}`).then((res) =>
    res.json(),
  );
}

export function getLocal(key: 'tasks' | 'mileStones' = 'tasks') {
  try {
    const stored = localStorage.getItem(key);
    const res = stored ? JSON.parse(stored) : null;
    if (!Array.isArray(res) || res.length === 0) {
      localStorage.setItem(key, JSON.stringify(defaultValues[key]));
      return defaultValues[key];
    }
    return res;
  } catch (error) {
    console.error('fail to getLocal');
    try {
      localStorage.setItem(key, JSON.stringify(defaultValues[key]));
    } catch {
      // ignore
    }
    return defaultValues[key];
  }
}

export function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return (
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0')
  );
}

export function initData(zr: any, redrawChart: () => void) {
  zr.dom.style.opacity = 0;
  recordQuery().then((res) => {
    const { data } = res;
    if (data?.tasks || data?.mileStones) {
      const defaultCategory = t('category.uncategorized');
      const filteredTasks = (data.tasks || []).filter((item: GanttTask) =>
        categoryFilter ? (item.category || defaultCategory) === categoryFilter : true,
      );
      updateData('tasks', filteredTasks);
      updateData('mileStones', data.mileStones || []);
    } else if (!data) {
      window.tasks.push({});
    }
    redrawChart();
    zr.dom.style.opacity = 1;
  });
}

export function updateData(key: 'tasks' | 'mileStones', data: any[]) {
  (window as any)[`old_${key}`] = [...((window as any)[key] || [])];
  (window as any)[key].length = 0;
  (window as any)[key].push(...data);
}
