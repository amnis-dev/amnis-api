/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  DataDeleter, DataState, DataUpdater,
} from '@amnis/state';
import { dataActions } from '@amnis/state';
import type { Middleware } from '@reduxjs/toolkit';
import { isAnyOf } from '@reduxjs/toolkit';
import { apiCrud } from './crud.api.js';

export const apiCrudMiddleware: Middleware = (store) => (next) => (action) => {
  /**
   * ================================================================================
   * CASE: Create, Update
   */
  if (
    isAnyOf(
      apiCrud.endpoints.create.matchFulfilled,
      apiCrud.endpoints.update.matchFulfilled,
    )(action)
  ) {
    const { payload: { result } } = action;
    if (!result) {
      return next(action);
    }

    next(dataActions.create(result));
  }

  /**
   * ================================================================================
   * CASE: Read
   */
  if (apiCrud.endpoints.read.matchFulfilled(action)) {
    const { payload: { result } } = action;
    if (!result) {
      return next(action);
    }

    /**
     * Check if there are any differences pending on the state data being read in.
     * Create an updater object to update the state with the differences.
     */
    const state = store.getState();
    const updater: DataUpdater = {};
    Object.keys(result).forEach((key) => {
      const stateSlice = state[key] as DataState;
      if (!stateSlice) {
        return;
      }

      const entities = result[key];
      entities.forEach((entity) => {
        const { $id } = entity;
        const differences = stateSlice.differences?.[$id] as string[] | undefined;
        if (!differences) {
          return;
        }
        if (differences.length > 0) {
          const changes = differences.reduce<Record<string, any>>((acc, k) => {
            /** @ts-ignore */
            acc[k] = entity[k];
            return acc;
          }, {});

          updater[key] = updater[key] || [];
          updater[key].push({ $id, ...changes });
        }
      });
    });

    next(dataActions.create(result));

    /**
     * Reapply the originally pending differences to the state.
     */
    if (Object.keys(updater).length > 0) {
      next(dataActions.update(updater));
    }
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
