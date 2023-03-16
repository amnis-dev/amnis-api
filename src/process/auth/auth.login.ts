import type {
  Io,
  IoProcess,
  StateEntities,
} from '@amnis/state';
import {
  ioOutputApply,
} from '@amnis/state';
import type { ApiAuthLogin } from '../../api.auth.types.js';
import {
  mwChallenge, mwCredential, mwSignature, mwValidate,
} from '../mw/index.js';
import { authenticateLogin } from '../utility/authenticate.js';

const process: IoProcess<
Io<ApiAuthLogin, StateEntities>
> = (context) => (
  async (input, output) => {
    const { body } = input;

    const {
      handle,
      $credential,
      password,
    } = body;

    const outputAuthentication = await authenticateLogin(
      context,
      {
        handle,
        $credential,
        password,
      },
    );

    /**
     * Complete the authentication.
     */
    ioOutputApply(
      output,
      outputAuthentication,
    );

    return output;
  }
);

export const processAuthLogin = mwValidate('auth/ApiAuthLogin')(
  mwChallenge()(
    mwCredential()(
      mwSignature()(
        process,
      ),
    ),
  ),
) as IoProcess<
Io<ApiAuthLogin, StateEntities>
>;

export default { processAuthLogin };
