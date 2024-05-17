import type { SearchParamsType } from '../store/useGanttChartStore';

export function getParamsFromSearch(key: SearchParamsType, autoConvert = true) {
  const params = new URLSearchParams(location.search);
  return params.get(key as unknown as string) && autoConvert
    ? Number(params.get(key as unknown as string))
    : params.get(key as unknown as string);
}

export function GetUrlParms(): Record<keyof SearchParamsType, any> {
  let args: any = new Object();
  let query = decodeURIComponent(location.search).substring(1);
  let pairs = query.split('&');
  for (let i = 0; i < pairs.length; i++) {
    let pos = pairs[i].indexOf('=');
    if (pos == -1) continue;
    let argname = pairs[i].substring(0, pos);
    let value = pairs[i].substring(pos + 1);
    args[argname] = unescape(value);
  }
  return args;
}

export function getRandomColor() {
  // Generate random values for red, green, and blue components
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Convert values to hexadecimal and format the color
  const hexColor =
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0');

  return hexColor;
}

export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent,
);
