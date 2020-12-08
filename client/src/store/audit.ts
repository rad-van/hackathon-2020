import { createModel } from '@rematch/core';
import { RootModel } from 'store';

export interface AuditState {
  dataSource: {data: []},
  timeRange: {startTime: number, endTime: any}
}

export const audit = createModel<RootModel>({
  state: {
    dataSource: {data: []},
    timeRange: {startTime: Date.now() - 900000, endTime: null}
  } as AuditState,
  reducers: {
    setData(state, payload) {
      return {
        ...state,
        dataSource: {data : payload.hits.hits},
      };
    },
    setTimeRange(state, payload) {
      return {
        ...state,
        timeRange: {startTime: payload[0].valueOf(), endTime: payload[1] !== null ? payload[1].valueOf() : null},
      };
    },
  },
});
