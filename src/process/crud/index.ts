import type { IoProcessMap, IoProcessMapMethods } from '@amnis/state';
import { processCrudCreate } from './crud.create.js';
import { processCrudRead } from './crud.read.js';
import { processCrudUpdate } from './crud.update.js';
import { processCrudDelete } from './crud.delete.js';

export const processCrudPost: IoProcessMap = {
  create: processCrudCreate,
  read: processCrudRead,
  update: processCrudUpdate,
  delete: processCrudDelete,
};

export const processCrud: IoProcessMapMethods = {
  post: processCrudPost,
};

export default processCrud;
