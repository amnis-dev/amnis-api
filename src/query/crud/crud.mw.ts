import type { DataDeleter, EntityObjects } from '@amnis/state';
import { dataActions } from '@amnis/state';
import type { Middleware } from '@reduxjs/toolkit';
import { isAnyOf } from '@reduxjs/toolkit';
import { apiCrud } from './crud.api.js';

export const apiCrudMiddleware: Middleware = () => (next) => (action) => {
  /**
   * ================================================================================
   * CASE: Create, Read, Update
   */
  if (
    isAnyOf(
      apiCrud.endpoints.create.matchFulfilled,
      apiCrud.endpoints.read.matchFulfilled,
      apiCrud.endpoints.update.matchFulfilled,
    )(action)
  ) {
    const { payload: { result } } = action;
    if (!result) {
      return next(action);
    }

    const dataCreator: EntityObjects = { ...result };
    next(dataActions.create(dataCreator));
  }

  /**
   * ================================================================================
   * CASE: Delete
   */
  if (apiCrud.endpoints.delete.matchFulfilled(action)) {
    const { payload: { result } } = action;
    if (!result) {
      return next(action);
    }

    const dataDeleter: DataDeleter = { ...result };
    next(dataActions.delete(dataDeleter));
  }

  return next(action);
};

export default apiCrudMiddleware;
