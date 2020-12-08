import { init, RematchDispatch } from '@rematch/core';
import { realTime, RealTimeState } from 'store/real-time';
import {dashboard, DashboardState} from "store/dashboard";
import {audit, AuditState} from "store/audit";

export interface RootModel {
  realTime: typeof realTime,
  dashboard: typeof dashboard,
  audit: typeof audit
}

const models: RootModel = {
  realTime,
  dashboard,
  audit
};

export const store = init({
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;

export interface RootState {
  realTime: RealTimeState,
  dashboard: DashboardState,
  audit: AuditState
}
