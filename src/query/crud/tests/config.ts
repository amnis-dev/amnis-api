import type { MockOptions } from '@amnis/mock';
import { contextSetup } from '@amnis/state';
import { schemaEntity, schemaState } from '@amnis/state/schema';
import { validateSetup } from '@amnis/state/validate';
import { processAuth, processCrud } from '../../../process/index.js';
import { schemaAuth } from '../../../schema/index.js';

export const baseUrl = 'https://amnis.dev/api';

export const serviceConfig = async (): Promise<MockOptions> => {
  const context = await contextSetup({
    validators: validateSetup([schemaAuth, schemaState, schemaEntity]),
  });
  return {
    baseUrl,
    context,
    processes: {
      auth: processAuth,
      crud: processCrud,
    },
  };
};
