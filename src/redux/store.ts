import { Action, configureStore, ThunkAction   } from '@reduxjs/toolkit';
import authReducer from './auth';
import callReducer from './calls';
import storage from 'redux-persist/lib/storage'
import { persistReducer, 
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';
import {combineReducers} from 'redux';
import { refreshTokenMiddleWare } from './middlewares';

const rootReducer = combineReducers({
  authStore: authReducer,
  callStore: callReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig,  rootReducer)


export const store =  configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },      
  }).concat(refreshTokenMiddleWare),
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
