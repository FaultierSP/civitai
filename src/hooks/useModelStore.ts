import { ModelType, MetricTimeframe } from '@prisma/client';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import { ModelSort } from '~/server/common/enums';

type ModelStoreState = {
  filters: {
    type?: ModelType;
    sort?: ModelSort;
    period?: MetricTimeframe;
    query?: string;
    users?: number[];
    tags?: number[];
  };
  index?: number;
  setIndex: (value?: number) => void;
  setType: (value?: ModelType) => void;
  setSort: (value?: ModelSort) => void;
  setPeriod: (value?: MetricTimeframe) => void;
  setQuery: (value?: string) => void;
  setUsers: (value?: number[]) => void;
  setTags: (value?: number[]) => void;
};

export const useModelStore = create(
  persist<ModelStoreState>(
    (set, get) => {
      return {
        filters: {
          sort: ModelSort.HighestRated,
          period: MetricTimeframe.AllTime,
        },
        setIndex: (value?) =>
          set(
            produce((state: ModelStoreState) => {
              state.index = value;
            })
          ),
        setType: (value) =>
          set(
            produce((state: ModelStoreState) => {
              state.filters.type = value;
            })
          ),
        setSort: (value) =>
          set(
            produce((state: ModelStoreState) => {
              state.filters.sort = value;
            })
          ),
        setPeriod: (value) =>
          set(
            produce((state: ModelStoreState) => {
              state.filters.period = value;
            })
          ),
        setTags: (value) =>
          set(
            produce((state: ModelStoreState) => {
              state.filters.tags = value;
            })
          ),
        setUsers: (value?) =>
          set(
            produce((state: ModelStoreState) => {
              state.filters.users = value;
            })
          ),
        setQuery: (value) =>
          set(
            produce((state: ModelStoreState) => {
              state.filters.query = value;
            })
          ),
      };
    },
    {
      name: 'modelCache', // unique name
      getStorage: () => sessionStorage,
    }
  )
);
