import { init, RematchDispatch } from '@rematch/core';
import { realTime, RealTimeState } from 'store/real-time';

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

export interface RootState {
  realTime: RealTimeState
}
