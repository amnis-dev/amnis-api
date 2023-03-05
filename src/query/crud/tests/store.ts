import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setState } from '@amnis/state';
import { apiCrud } from '../index.js';
import { apiAuth } from '../../auth/index.js';

const reducers = combineReducers({
  ...setState.reducers,
  [apiAuth.reducerPath]: apiAuth.reducer,
  [apiCrud.reducerPath]: apiCrud.reducer,
});

export const clientStore = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat([...setState.middleware, apiAuth.middleware, apiCrud.middleware])
  ),
});

export default clientStore;
