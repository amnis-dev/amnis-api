import {
  dataActions, systemSlice, systemKey,
} from '@amnis/state';
import type { Middleware } from '@reduxjs/toolkit';
import { apiSys } from './sys.api.js';

export const apiSysMiddleware: Middleware = () => (next) => (action) => {
  /**
   * ================================================================================
   * CASE: System
   */
  if (apiSys.endpoints.system.matchFulfilled(action)) {
    const { payload: { result }, meta: { arg: { originalArgs } } } = action;
    if (!result) {
      return next(action);
    }

    next(dataActions.create(result));

    if (originalArgs?.set) {
      const system = result[systemKey]?.[0];
      if (system) {
        next(systemSlice.action.activeSet(system.$id));
      }
    }
  }

  return next(action);
};

export default apiSysMiddleware;
