import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setState } from '@amnis/state';
import { apiAuth } from '../index.js';

const reducers = combineReducers({
  ...setState.reducers,
  [apiAuth.reducerPath]: apiAuth.reducer,
});

export const clientStore = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat([...setState.middleware, apiAuth.middleware])
  ),
});

export default clientStore;
