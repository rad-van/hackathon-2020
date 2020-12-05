import { createModel } from '@rematch/core';
import { RootModel } from 'store';
import { AuditDocument } from 'store/types/audit-document';
import { cloneDeep } from 'lodash';

export interface RealTimeState {
  auditDocuments: AuditDocument[]
}

export const realTime = createModel<RootModel>({
  state: {
    auditDocuments: [],
  } as RealTimeState,
  reducers: {
    addAuditDocument(state: RealTimeState, payload: AuditDocument): RealTimeState {
      const auditDocs = state.auditDocuments;
      const existingDocIdx = auditDocs.findIndex(a => a.unique_id === payload.unique_id);

      if (existingDocIdx === -1) {
        const doc = { ...payload };
        doc.messages = [doc.message!];
        delete doc.message;

        return {
          ...state,
          auditDocuments: [doc, ...state.auditDocuments],
        };
      }

      const newDoc = cloneDeep(auditDocs[existingDocIdx]);
      newDoc.messages.push(payload.message!);
      state.auditDocuments.splice(existingDocIdx, 1, newDoc);

      return {
        ...state,
      };
    },
  },
});
