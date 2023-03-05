import { mockService } from '@amnis/mock';
import { contextSetup } from '@amnis/state';
import { validateSetup } from '@amnis/state/validate';
import { processAuth } from '../../../process/index.js';
import { schemaAuth } from '../../../schema/index.js';

export const baseUrl = 'https://amnis.dev/api';

export const serviceStart = async () => {
  const context = await contextSetup({
    validators: validateSetup([schemaAuth]),
  });
  await mockService.setup({
    baseUrl,
    context,
    processes: {
      auth: processAuth,
    },
  });
  mockService.start();
};

export const serviceStop = () => {
  mockService.stop();
};
