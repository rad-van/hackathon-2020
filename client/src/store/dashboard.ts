import { createModel } from '@rematch/core';
import { RootModel } from 'store';

export interface DashboardState {
  charts: {}
}

export const dashboard = createModel<RootModel>({
  state: {
    charts: {
      blockedAllowed : {data : {}},
      topRules: {data : {labels: [], datasets: []}},
      topHosts: {data : {}},
      topStatusCodes: {data : {}},
      topSeverity: {data : {}},
      rulesPerMinute: {data : {}}
    }
  } as DashboardState,
  reducers: {
    setBlockedAllowedData(state, payload) {
      return {
        ...state,
        charts: {...state.charts, blockedAllowed: {data: payload}},
      };
    },
    setTopRules(state, payload) {
      return {
        ...state,
        charts: {...state.charts, topRules: {data: payload}},
      };
    },
    setTopHosts(state, payload) {
      return {
        ...state,
        charts: {...state.charts, topHosts: {data: payload}},
      };
    },
    setTopStatusCodes(state, payload) {
      return {
        ...state,
        charts: {...state.charts, topStatusCodes: {data: payload}},
      };
    },
    setTopSeverity(state, payload) {
      return {
        ...state,
        charts: {...state.charts, topSeverity: {data: payload}},
      };
    },
    setRulesPerMinute(state, payload) {
      return {
        ...state,
        charts: {...state.charts, rulesPerMinute: {data: payload}},
      };
    },
  },
});
