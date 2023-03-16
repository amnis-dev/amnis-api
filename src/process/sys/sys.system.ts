import type {
  Io,
  IoProcess,
  StateEntities,
} from '@amnis/state';
import {
  apiSelectors,
  systemKey,
  systemSelectors,
} from '@amnis/state';
import type { ApiSysSystem } from '../../api.sys.types.js';
// import { mwValidate } from '../mw/index.js';

/**
 * Verifies the validity of an access bearer.
 */
export const process: IoProcess<
Io<ApiSysSystem, StateEntities>
> = (context) => (
  async (input, output) => {
    const { store } = context;

    /**
     * Get the active system.
     */
    const system = systemSelectors.selectActive(store.getState());

    if (!system) {
      output.status = 503; // 503 Service Unavailable
      output.json.logs.push({
        level: 'error',
        title: 'Inactive System',
        description: 'There is no active system available to obtain.',
      });
      return output;
    }

    /**
     * Return system apis.
     */
    const apis = apiSelectors.selectSystemApis(store.getState(), system.$id);

    output.json.result = {
      [systemKey]: [system],
    };
    output.json.apis = apis;

    return output;
  }
);

export const processSysSystem = process as IoProcess<
Io<ApiSysSystem, StateEntities>
>;

export default processSysSystem;
