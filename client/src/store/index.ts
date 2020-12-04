import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { realTime } from 'store/real-time';

export interface RootModel {
  realTime: typeof realTime
}

const models: RootModel = {
  realTime,
};

export const store = init({
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
