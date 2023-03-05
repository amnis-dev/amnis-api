import type {
  IoContext,
  IoInput,
} from '@amnis/state';
import {
  ioOutput,
  challengeSelectors,
  contextSetup,
} from '@amnis/state';
import { validateSetup } from '@amnis/state/validate';
import type { ApiAuthChallenge } from '../../api.types.js';
import { schemaAuth } from '../../schema/index.js';
import { processAuthChallenge } from './auth.challenge.js';

let context: IoContext;

beforeAll(async () => {
  context = await contextSetup({
    validators: validateSetup([schemaAuth]),
  });
});

/**
 * ================================================================================================
 * ************************************************************************************************
 * ================================================================================================
 */
test('should generate a challenge entity', async () => {
  const input: IoInput<ApiAuthChallenge> = {
    body: {},
  };
  const output = await processAuthChallenge(context)(input, ioOutput());
  const challenge = output.json.result;
  if (!challenge) {
    expect(challenge).toBeDefined();
    return;
  }

  expect(challenge).toMatchObject({
    val: expect.any(String),
  });

  /**
   * Check the challenge on the context store.
   */
  const state = context.store.getState();
  const ioChallenge = challengeSelectors.selectById(state, challenge.$id);

  if (!ioChallenge) {
    expect(ioChallenge).toBeDefined();
    return;
  }

  expect(ioChallenge).toMatchObject({
    val: expect.any(String),
  });
});
