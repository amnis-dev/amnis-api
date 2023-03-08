import type {
  DataCreator,
  DataDeleter,
  Entity,
  MetaSetter,
  UID,
} from '@amnis/state';
import {
  otpActions,
  entityActions,
  dataActions,
} from '@amnis/state';
import type { Middleware } from '@reduxjs/toolkit';
import { isAnyOf } from '@reduxjs/toolkit';
import { apiAuth } from './auth.api.js';

export const apiAuthMiddleware: Middleware = () => (next) => (action) => {
  /**
   * ================================================================================
   * CASES: Login, Register, Create, Credential
   */
  if (isAnyOf(
    apiAuth.endpoints.login.matchFulfilled,
    apiAuth.endpoints.register.matchFulfilled,
    apiAuth.endpoints.create.matchFulfilled,
    apiAuth.endpoints.credential.matchFulfilled,
  )(action)) {
    const { payload: { result } } = action;
    if (!result) {
      return next(action);
    }

    const dataCreator: DataCreator = { ...result };

    /**
     * Provide some indicator that this action was initiated by the apiAuth
     */
    next(dataActions.create(dataCreator));

    /**
     * If the action was a login request, then we need to set entity meta information.
     */

    if (result) {
      const metaSetter = Object.keys(result).reduce<MetaSetter>((acc, key) => {
        const entity = result[key]?.[0] as Entity | undefined;
        if (entity) {
          acc[key] = { active: result[key]?.[0].$id };
        }
        return acc;
      }, {});
      next(entityActions.meta(metaSetter));
    }
  }

  /**
   * ================================================================================
   * CASE: Logout
   */
  if (apiAuth.endpoints.logout.matchFulfilled(action)) {
    const { payload: { result } } = action;
    if (!result) {
      return next(action);
    }

    const dataDeleter: DataDeleter = {
      ...result,
      bearer: ['core' as UID],
    };
    next(dataActions.delete(dataDeleter));
  }

  /**
   * ================================================================================
   * CASE: One-time password OTP
   */
  if (apiAuth.endpoints.otp.matchFulfilled(action)) {
    const { payload: { result } } = action;
    if (!result) {
      return next(action);
    }
    next(otpActions.insert(result));
  }

  return next(action);
};

export default apiAuthMiddleware;
