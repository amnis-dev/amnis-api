import type { Api, Entity } from '@amnis/state';
import {
  dataActions, systemSlice, systemKey, apiSlice,
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

    /**
     * Remap the API base URLs to be absolute if they aren't.
     */
    const url = new URL(originalArgs.url);
    const { origin } = url;
    const apis = (result[apiSlice.key] ?? []) as Entity<Api>[];
    const apisRemapped = apis.map<Entity<Api>>((api) => {
      const baseUrl = api.baseUrl ?? '';
      const apiUrlAbsolute = /^(?:[a-z+]+:)?\/\//.test(baseUrl);

      if (apiUrlAbsolute) {
        return api;
      }

      const newBaseUrl = new URL(baseUrl, origin ?? 'http://localhost').href;

      return {
        ...api,
        baseUrl: newBaseUrl,
      };
    });

    next(dataActions.insert({
      ...result,
      [apiSlice.key]: apisRemapped,
    }));

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
