import type {
  Io,
  IoProcess,
  Otp,
  Entity,
  ApiAuthOtp,
} from '@amnis/state';
import {
  ioOutputApply,
} from '@amnis/state';
import { mwValidate } from '../mw/index.js';
import { otpNew } from '../utility/otp.js';

const process: IoProcess<
Io<ApiAuthOtp, Otp>
> = (context) => (
  async (input, output) => {
    const { body: { $subject, purpose } } = input;

    ioOutputApply(
      output,
      await otpNew(context, {
        $subject,
        purpose,
      }),
    );
    return output;
  }
);

export const processAuthOtp = mwValidate('ApiAuthOtp')(
  process,
) as IoProcess<
Io<ApiAuthOtp, Entity<Otp>>
>;

export default { processAuthOtp };
