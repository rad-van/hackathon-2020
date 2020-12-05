import { createModel } from '@rematch/core';
import { RootModel } from 'store';

export interface DashboardState {
  charts: {}
}

export const dashboard = createModel<RootModel>({
  state: {
    charts: { blockedAllowed : {data : {}} }
  } as DashboardState,
  reducers: {
    setBlockedAllowedData(state, payload) {
      return {
        ...state,
        charts: {...state.charts, blockedAllowed: {data: payload}},
      };
    },
  },
});
