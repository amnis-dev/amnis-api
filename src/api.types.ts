/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IoOutputJson } from '@amnis/state';

export type ApiError = {
  status: number;
  data: IoOutputJson;
};
