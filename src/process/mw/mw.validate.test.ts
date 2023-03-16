import type {
  IoContext,
  IoInput,
  IoProcess,
} from '@amnis/state';
import {
  contactCreator,
  ioOutput,
  ioOutputErrored,
} from '@amnis/state';
import { schemaEntity } from '@amnis/state/schema';
import { contextSetup } from '@amnis/state/context';
import { mwValidate } from './mw.validate.js';

let context: IoContext;

/**
 * Create an empty process for the middleware.
 */
const noprocess: IoProcess = () => async (i, o) => o;

beforeAll(async () => {
  context = await contextSetup({
    schemas: [schemaEntity],
  });
});

test('should validate a valid contact object', async () => {
  const process = mwValidate('entities/Contact')(noprocess);

  const input: IoInput = {
    body: contactCreator({
      name: 'Name',
    }),
  };
  const output = await process(context)(input, ioOutput());

  expect(output.status).toBe(200);
  expect(output.json.logs).toHaveLength(0);
});

test('should NOT validate an ivalid contact object', async () => {
  const process = mwValidate('entities/Contact')(noprocess);

  const input: IoInput = {
    body: {
      name: 0,
      prop: false,
    },
  };
  const output = await process(context)(input, ioOutput());

  expect(output.status).toBe(400);
  expect(output.json.logs).toHaveLength(1);
  expect(ioOutputErrored(output)).toBe(true);
});
