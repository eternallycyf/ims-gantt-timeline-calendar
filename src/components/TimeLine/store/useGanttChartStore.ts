import { create } from 'zustand';
import { StorageEnum } from '../type/enum';
import { GetUrlParms } from '../utils';
import { getItem, removeItem, setItem } from '../utils/storage';

export interface SearchParamsType {
  currentGroup: any;
  debug: boolean;
  taskOwner: string;
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
  view: string;
  mockTaskSize: number;
  todayOffset: number;
  initLastScrollX: number;
  filter: React.CSSProperties['color'];
  showFilter: boolean;
  arrowSize: number;
  showArrow: boolean;
}

interface SearchParamsStore {
  searchParams: SearchParamsType;
  actions: {
    refreshSearchParamsStore: () => void;
    setSearchParamsStore: (settings: Partial<SearchParamsType>) => void;
    clearSearchParamsStore: () => void;
  };
}

const useSearchParamsStore = create<SearchParamsStore>((set, get) => {
  const unitWidth = 160;
  const halfUnitWidth = 160 / 2;
  const barHeight = 30;
  const todayOffset = Math.floor((+new Date() - +new Date('2024-01-01')) / (60 * 60 * 24 * 1000));

  return {
    searchParams: getItem<SearchParamsType>(StorageEnum.searchParams) || {
      currentGroup: null,
      debug: false,
      taskOwner: 'alexq',
      unitWidth,
      halfUnitWidth,
      taskNamePaddingLeft: 15,
      initChartStartX: 1,
      initChartStartY: 50,
      timeScaleHeight: 20,
      milestoneTopHeight: 20,
      barHeight: 30,
      barMargin: 1,
      scrollSpeed: 35,
      includeHoliday: false,
      useLocal: false,
      useRemote: false,
      view: '',
      mockTaskSize: 0,
      todayOffset: todayOffset,
      initLastScrollX: (todayOffset - 1) * unitWidth,
      filter: undefined,
      showFilter: false,
      arrowSize: (barHeight / 3) * 2,
      showArrow: true,
    },
    actions: {
      refreshSearchParamsStore: () => {
        const params = GetUrlParms();
        const { [StorageEnum.searchParams]: defaultSearchParams } = get();
        const newParams = {
          ...defaultSearchParams,
          ...params,
          halfUnitWidth: (params?.unitWidth || unitWidth) / 2,
          barMargin: params?.debug ? 10 : params?.barMargin ?? 1,
          view: params?.view ?? '',
          mockTaskSize:
            !params?.useRemote && !params?.useLocal && params?.mockTaskSize
              ? Number(params.mockTaskSize)
              : 0,
          initLastScrollX: (params?.todayOffset - 1) * (params?.unitWidth ?? unitWidth),
        };
        set({ [StorageEnum.searchParams]: newParams });
        setItem(StorageEnum.searchParams, newParams);
      },
      setSearchParamsStore: (searchParams) => {
        const { [StorageEnum.searchParams]: defaultSearchParams } = get();
        const newDefaultSearchParams = { ...defaultSearchParams, ...searchParams };
        set({ [StorageEnum.searchParams]: newDefaultSearchParams });
        setItem(StorageEnum.searchParams, newDefaultSearchParams);
      },
      clearSearchParamsStore: () => removeItem(StorageEnum.searchParams),
    },
  };
});

export const useSearchParams = () => useSearchParamsStore((state) => state.searchParams);
export const useSearchParamsActions = () => useSearchParamsStore((state) => state.actions);
