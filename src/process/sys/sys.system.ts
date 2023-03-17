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

/**
 * Verifies the validity of an access bearer.
 */
export const process: IoProcess<
Io<undefined, StateEntities>
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
Io<undefined, StateEntities>
>;

export default processSysSystem;
