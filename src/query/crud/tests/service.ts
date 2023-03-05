import { mockService } from '@amnis/mock';
import { contextSetup } from '@amnis/state';
import { schemaEntity, schemaState } from '@amnis/state/schema';
import { validateSetup } from '@amnis/state/validate';
import { processAuth, processCrud } from '../../../process/index.js';
import { schemaAuth } from '../../../schema/index.js';

export const baseUrl = 'https://amnis.dev/api';

export const serviceStart = async () => {
  const context = await contextSetup({
    validators: validateSetup([schemaAuth, schemaState, schemaEntity]),
  });
  await mockService.setup({
    baseUrl,
    context,
    processes: {
      auth: processAuth,
      crud: processCrud,
    },
  });
  mockService.start();
};

export const serviceStop = () => {
  mockService.stop();
};
