import type { MockOptions } from '@amnis/mock';
import { schemaState } from '@amnis/state/schema';
import { contextSetup } from '@amnis/state/context';
import { processAuth, processCrud, processSys } from '../../../process/index.js';
import { schemaAuth } from '../../../schema/index.js';

export const baseUrl = '/api';

export const serviceConfig = async (): Promise<MockOptions> => {
  const context = await contextSetup({
    schemas: [schemaAuth, schemaState],
  });
  return {
    baseUrl,
    context,
    processes: {
      sys: processSys,
      auth: processAuth,
      crud: processCrud,
    },
  };
};
