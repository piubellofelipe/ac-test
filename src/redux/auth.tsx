import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import API, { doLoginParameters } from '../api/aircallAPI';
import { RootState } from './store';
import { RouteComponentProps } from 'react-router-dom';

export interface AuthState {
  token: string;
  loading: boolean;
  error: Error | null,

}

const initialState: AuthState = {
  token: "",
  loading: false,
  error: null,
};


type doLoginActionParameters =  doLoginParameters & {
    history: RouteComponentProps["history"];
}

export const login = createAsyncThunk(
  'auth/doLogin',
  async ({username, password, history}: doLoginActionParameters ) => {
    const res = await API.login({username, password});
    history.push('/calls')
    return res;
  }
);

export const authStore = createSlice({
  name: 'authStore',
  initialState,
  reducers: {
    update_token: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        const [token, error] = action.payload;
        if (error) {
          state.error = error;
        } else {
          state.token = token.access_token;
        }
      })
      ;
  },
});

export const {update_token, reset} = authStore.actions;


export const loginLoading = (state: RootState) => state.authStore.loading;
export const selectToken = (state: RootState) => state.authStore.token;
export const selectIsLoggedIn = (state: RootState) => !!state.authStore.token;


export default authStore.reducer;
