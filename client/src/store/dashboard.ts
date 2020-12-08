import { createModel } from '@rematch/core';
import { RootModel } from 'store';

export interface DashboardState {
  charts: {},
  timeRange: {startTime: number, endTime: any}
}

export const dashboard = createModel<RootModel>({
  state: {
    charts: {
      blockedAllowed : {data : {}},
      topRules: {data : {labels: [], datasets: []}},
      topHosts: {data : {}},
      topStatusCodes: {data : {}},
      topSeverity: {data : {}},
      topClients: {data: {}},
      rulesPerMinute: {data : {}}
    },
    timeRange: {startTime: Date.now() - 900000, endTime: null}
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
    setTopClients(state, payload) {
      return {
        ...state,
        charts: {...state.charts, topClients: {data: payload}},
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
    setTimeRange(state, payload) {
      return {
        ...state,
        timeRange: {startTime: payload[0].valueOf(), endTime: payload[1].valueOf()},
      };
    },
  },
});
