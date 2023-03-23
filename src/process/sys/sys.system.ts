import type {
  Io,
  IoProcess,
  EntityObjects,
} from '@amnis/state';
import {
  apiSlice,
  systemKey,
  systemSlice,
} from '@amnis/state';

/**
 * Verifies the validity of an access bearer.
 */
export const process: IoProcess<
Io<undefined, EntityObjects>
> = (context) => (
  async (input, output) => {
    const { store } = context;

    /**
     * Get the active system.
     */
    const system = systemSlice.selectors.active(store.getState());

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
    const apis = apiSlice.selectors.systemApis(store.getState(), system.$id);

    output.json.result = {
      [systemKey]: [system],
    };
    output.json.apis = apis;

    return output;
  }
);

export const processSysSystem = process as IoProcess<
Io<undefined, EntityObjects>
>;

export default processSysSystem;
