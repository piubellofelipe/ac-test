import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from '../api/aircallAPI';
import { RootState } from './store';
import * as utils from '../utils';
import { toast } from 'react-toastify';

export type Call = {
    call_type: 'missed' | 'answered' | 'voicemail';
    created_at: string;
    direction: 'inbound' | 'outbound';
    duration: number;
    from: string;
    id: string;
    is_archived: boolean;
    notes: Note[];
    to: string;
    via: string;
}

export type Note = {
  id: string;
  content: string;
}

export type singleCallGroup = {
  date: string;
  calls: string[];
}

export type GroupedCalls = singleCallGroup[];

type CallsMap = {
  [key: string]: Call;
}

export interface CallsState {
  callGroups: GroupedCalls;
  calls: CallsMap;
  bulkArchiveIds: string[];
  loading: boolean;
  totalCount: number;
  error: Error | null;
  archiving: boolean;
  unarchiving: boolean;
  showArchived: boolean;
  sendingNote: boolean;
}

const initialState: CallsState = {
  callGroups: [],
  bulkArchiveIds: [],
  calls: {},
  totalCount: 0,
  loading: false,
  archiving: false,
  unarchiving: false,
  error: null,
  showArchived: false,
  sendingNote: false,
};


export const fetchCalls = createAsyncThunk(
  'callStore/fetchCalls',
  async ({offset = 0, limit = 10}: {offset: number, limit: number}) => {
    return API.fetchCalls(offset, limit);
  }
);
export const archiveCalls = createAsyncThunk(
  'callStore/archiveCall',
  async (callId: string) => {
    return API.archiveCall(callId);
  }
);
export const sendNote = createAsyncThunk(
  'callStore/sendNote',
  async ({callId, note}: {callId: string, note: string}) => {
    return API.sendNote(callId, note);
  }
);
export const doBulkArchive = createAsyncThunk(
  'callStore/bulkArchive',
  async (params, thunkAPI: any) => {
    const callStore: CallsState = thunkAPI.getState().callStore as CallsState;
    const archiveIds = callStore.bulkArchiveIds;
    const callsToArchive = archiveIds.filter((callId: string) => {
      const call = selectCall(callId)(thunkAPI.getState());
      if (call.is_archived) return false;
      return true;
    })
    toast(`${callsToArchive.length} calls were archived`)
    return Promise.all(callsToArchive.map((id) => API.archiveCall(id)));
  }
);


export const doBulkUnarchive = createAsyncThunk(
  'callStore/bulkUnarchive',
  async (params, thunkAPI: any) => {
    const callStore: CallsState = thunkAPI.getState().callStore as CallsState;
    const archiveIds = callStore.bulkArchiveIds;
    const callsToArchive = archiveIds.filter((callId: string) => {
      const call = selectCall(callId)(thunkAPI.getState());
      if (!call.is_archived) return false;
      return true;
    })
    toast(`${callsToArchive.length} calls were unarchived`)
    return Promise.all(callsToArchive.map((id) => API.archiveCall(id)));
  }
);

export const callStore = createSlice({
  name: 'callStore',
  initialState,
  reducers: {
    updateCall: (state, action: PayloadAction<Call>) => {
      state.calls[action.payload.id] = action.payload;
    },
    addToBulkArchive: (state, action: PayloadAction<string>) => {
      if (state.bulkArchiveIds.indexOf(action.payload) > -1) {
        state.bulkArchiveIds = state.bulkArchiveIds.filter(id => id !== action.payload)
      } else {
        state.bulkArchiveIds.push(action.payload);
      }
    },
    toggleShowArchived: (state) => {
      state.showArchived = !state.showArchived;
    },
    reset: state => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalls.fulfilled, (state, action) => {
        state.loading = false;
        const [res, error] = action.payload;
        if (error) {
          state.error = error;
        } else {
          const groupedCalls = utils.groupCallsByDay(res.nodes)
          state.callGroups = groupedCalls;
          state.totalCount = res.totalCount;
          state.calls = {
            ...state.calls,
            ...res.nodes.reduce((previousValue: CallsMap, nextValue: Call) => {
              return {
                ...previousValue,
                [nextValue.id]: nextValue,
              }
            }, {})
          }
        }
      })
      .addCase(doBulkArchive.pending, (state) => {
        state.archiving = true;
      })
      .addCase(doBulkUnarchive.pending, (state) => {
        state.unarchiving = true;
      })
      .addCase(doBulkArchive.fulfilled, (state) => {
        state.archiving = false;
        state.bulkArchiveIds = [];
      })
      .addCase(doBulkUnarchive.fulfilled, (state) => {
        state.unarchiving = false;
        state.bulkArchiveIds = [];
      })
      .addCase(archiveCalls.fulfilled, (state, action) => {
        const [updatedCall, error]: [Call, Error | null] = action.payload;
        if (error) {
          state.error = error;
        } else {
          state.calls[updatedCall.id] = updatedCall;
        }
      })
      .addCase(sendNote.pending, (state) => {
        state.sendingNote = true;
      })
      .addCase(sendNote.fulfilled, (state) => {
        state.sendingNote = false;
      })
      .addCase(sendNote.rejected, (state) => {
        state.sendingNote = false;
      })
      .addDefaultCase((state, action) => {
        if (action.type === 'LOGOUT') {
          state = initialState;
        }
      })
    },
});

export const {updateCall, addToBulkArchive, toggleShowArchived, reset} = callStore.actions;


export const selectCallGroups = (state: RootState) => state.callStore.callGroups;
export const selectCall = (callId: string) => (state: RootState) => state.callStore.calls[callId];
export const selectShowArchived = (state: RootState) => state.callStore.showArchived;
export const selectLoadingCalls = (state: RootState) => state.callStore.loading;
export const selectTotalRecords = (state: RootState) => state.callStore.totalCount;
export const selectBulkArchiveIds = (state: RootState) => state.callStore.bulkArchiveIds;
export const selectIsSendingNote = (state: RootState) => state.callStore.sendingNote;

export default callStore.reducer;
