import type { MockOptions } from '@amnis/mock';
import { contextSetup } from '@amnis/state/context';
import { processSys, processAuth } from '../../../process/index.js';
import { schemaSys, schemaAuth } from '../../../schema/index.js';

export const baseUrl = '/api';

export const serviceConfig = async (): Promise<MockOptions> => {
  const context = await contextSetup({
    schemas: [schemaSys, schemaAuth],
  });
  return {
    baseUrl,
    context,
    processes: {
      sys: processSys,
      auth: processAuth,
    },
  };
};
