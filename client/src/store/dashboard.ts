import { createModel } from '@rematch/core';
import { RootModel } from 'store';

export interface DashboardState {
  charts: {},
  timeRange: {startTime: number, endTime: any},
  autoRefresh: boolean
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
    timeRange: {startTime: Date.now() - 900000, endTime: null},
    autoRefresh: true
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
        autoRefresh: payload.autoRefresh ? payload.autoRefresh : true,
        timeRange: {startTime: payload.value[0].valueOf(), endTime: payload.value[1] !== null ? payload.value[1].valueOf() : null},
      };
    },
  },
});
