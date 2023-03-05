import type { Set } from '@amnis/state';
import { apiAuth } from './auth/index.js';
import { apiCrud } from './crud/index.js';
import { mwApi } from './mw.js';

const reducerApi = {
  [apiAuth.reducerPath]: apiAuth.reducer,
  [apiCrud.reducerPath]: apiCrud.reducer,
};

export const setApi: Set<typeof reducerApi> = {
  reducers: reducerApi,
  middleware: [
    apiAuth.middleware,
    apiCrud.middleware,
    mwApi,
  ],
};

export default setApi;
