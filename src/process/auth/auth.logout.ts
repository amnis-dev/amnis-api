import type {
  Io,
  IoProcess,
  StateDeleter,
} from '@amnis/state';
import {
  uidList,
  sessionKey,
  systemSelectors,
} from '@amnis/state';
import type { ApiAuthLogout } from '../../api.auth.types.js';
import { mwSession, mwValidate } from '../mw/index.js';

/**
 * Renews a session holder's session and access bearers.
 */
const process: IoProcess<
Io<ApiAuthLogout, StateDeleter>
> = (context) => (
  async (input, output) => {
    const { session } = input;

    /**
   * Get the active system.
   */
    const system = systemSelectors.selectActive(context.store.getState());

    if (!system) {
      output.status = 503;
      output.json.logs.push({
        level: 'error',
        title: 'Inactive System',
        description: 'There is no active system available to complete the logout.',
      });
      return output;
    }

    /**
     * Delete the session cookie.
     */
    output.cookies[system.sessionKey] = undefined;

    /**
     * Tell the client to delete with the session other entities with the session removal.
     */
    if (session) {
      output.json.result = {
        [sessionKey]: uidList([session.$id]),
      };
    }

    return output;
  }
);

export const processAuthLogout = mwSession()(
  mwValidate('auth/ApiAuthLogout')(
    process,
  ),
) as IoProcess<
Io<ApiAuthLogout, StateDeleter>
>;

export default { processAuthLogout };
