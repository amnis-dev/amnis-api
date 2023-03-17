/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EndpointBuilder } from '@reduxjs/toolkit/query';
import type {
  IoOutputJson,
  StateEntities,
} from '@amnis/state';

export const apiSysQueries = <T extends EndpointBuilder<any, any, any>>(builder: T) => ({

  system: builder.query<
  IoOutputJson<StateEntities>,
  { url: string; set?: boolean }
  >({
    query: ({ url }) => ({
      url: url ?? 'system',
      method: 'get',
    }),
  }),

});

export default apiSysQueries;
