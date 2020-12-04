import { createModel } from '@rematch/core';
import { RootModel } from 'store';

export interface RealTimeState {
  requests: any[]
}

export const realTime = createModel<RootModel>({
  state: {
    requests: [],
  } as RealTimeState,
  reducers: {
    // handle state changes with pure functions
    addRequest(state: RealTimeState, payload: any): RealTimeState {
      const newState = {
        ...state,
        requests: [...state.requests, payload],
      };
      return newState;
    },
  },
});
