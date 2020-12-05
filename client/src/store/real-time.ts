import { createModel } from '@rematch/core';
import { RootModel } from 'store';
import { AuditDocument } from 'store/types/audit-document';

export interface RealTimeState {
  requests: AuditDocument[]
}

export const realTime = createModel<RootModel>({
  state: {
    requests: [],
  } as RealTimeState,
  reducers: {
    addRequest(state: RealTimeState, payload: AuditDocument): RealTimeState {
      return {
        ...state,
        requests: [...state.requests, payload],
      };
    },
  },
});
