/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EndpointBuilder } from '@reduxjs/toolkit/query';
import type {
  IoOutputJson,
  StateEntities,
} from '@amnis/state';
import type {
  ApiSysSystem,
} from '../../api.sys.types.js';

export const apiSysQueries = <T extends EndpointBuilder<any, any, any>>(builder: T) => ({

  system: builder.mutation<
  IoOutputJson<StateEntities>,
  ApiSysSystem | { url: string; set?: boolean }
  >({
    query: ({ url }) => ({
      url: url ?? 'system',
      method: 'get',
    }),
  }),

});

export default apiSysQueries;
