import type {
  DataCreator,
  IoOutput,
} from '@amnis/state';
import {
  bearerKey,
  dataActions,
  entityCreate,
  logCreator,
  logKey,
} from '@amnis/state';
import type { Middleware } from '@reduxjs/toolkit';
import { isFulfilled } from '@reduxjs/toolkit';

export const apiMiddleware: Middleware = () => (next) => (action) => {
  /**
   * IoOutput should be returned from all api requests.
   */
  if (isFulfilled(action)) {
    const { payload } = action;

    if (!payload || typeof payload !== 'object') {
      return next(action);
    }

    /**
     * Assume that the payload is possible IoOutput's json property.
     * Still need to check for the existence of the logs and bearers properties.
     */
    const { logs, bearers } = payload as Partial<IoOutput['json']>;
    const dataCreator: DataCreator = {};

    if (logs) {
      dataCreator[logKey] = logs.map((log) => entityCreate(logCreator(log)));
    }

    if (bearers) {
      dataCreator[bearerKey] = bearers;
    }

    if (Object.keys(dataCreator).length > 0) {
      next(dataActions.create(dataCreator));
    }
  }

  return next(action);
};

export default apiMiddleware;
