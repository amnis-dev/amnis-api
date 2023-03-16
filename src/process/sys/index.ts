import type { IoProcessDefinition } from '@amnis/state';
import { processSysSystem } from './sys.system.js';

export const processSys: IoProcessDefinition = {
  meta: {
    reducerPath: 'apiSys',
  },
  endpoints: {
    get: {
      system: processSysSystem,
    },
  },
};

export default processSys;
