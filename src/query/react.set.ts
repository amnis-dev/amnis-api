import type { Set } from '@amnis/state';
import { apiAuth } from './auth/index.react.js';
import { apiAuthMiddleware } from './auth/auth.mw.js';
import { apiCrud } from './crud/index.react.js';
import { apiCrudMiddleware } from './crud/crud.mw.js';
import { apiMiddleware } from './mw.js';

const reducerApi = {
  [apiAuth.reducerPath]: apiAuth.reducer,
  [apiCrud.reducerPath]: apiCrud.reducer,
};

export const setApi: Set<typeof reducerApi> = {
  reducers: reducerApi,
  middleware: [
    apiAuth.middleware,
    apiCrud.middleware,
    apiMiddleware,
    apiAuthMiddleware,
    apiCrudMiddleware,
  ],
};

export default setApi;
