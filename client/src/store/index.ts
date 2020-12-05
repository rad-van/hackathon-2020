import { init, RematchDispatch } from '@rematch/core';
import { realTime, RealTimeState } from 'store/real-time';
import {dashboard, DashboardState} from "store/dashboard";

export interface RootModel {
  realTime: typeof realTime,
  dashboard: typeof dashboard
}

const models: RootModel = {
  realTime,
  dashboard
};

export const store = init({
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;

export interface RootState {
  realTime: RealTimeState,
  dashboard: DashboardState
}
