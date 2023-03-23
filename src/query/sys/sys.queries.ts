/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EndpointBuilder } from '@reduxjs/toolkit/query';
import type {
  IoOutputJson,
  EntityObjects,
} from '@amnis/state';

export const apiSysQueries = <T extends EndpointBuilder<any, any, any>>(builder: T) => ({

  system: builder.query<
  IoOutputJson<EntityObjects>,
  { url: string; set?: boolean }
  >({
    query: ({ url }) => ({
      url: url ?? 'system',
      method: 'get',
    }),
  }),

});

export default apiSysQueries;
