import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setState } from '@amnis/state';
import { setApi } from '../../set.js';

const reducers = combineReducers({
  ...setState.reducers,
  ...setApi.reducers,
});

export const clientStore = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat([...setState.middleware, ...setApi.middleware])
  ),
});

export default clientStore;
