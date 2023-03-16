import {
  accountsGet,
  agentUpdate,
  contactKey,
  profileKey,
  sessionKey,
  userKey,
  contactSelectors,
  profileSelectors,
  sessionSelectors,
  userSelectors,
} from '@amnis/state';
import { mockService } from '@amnis/mock';
import { apiAuth } from '../index.js';
import { clientStore } from './store.js';
import {
  serviceConfig,
} from './config.js';
import { apiSys } from '../../sys/index.js';

beforeAll(async () => {
  await mockService.setup(await serviceConfig());
  mockService.start();
  await clientStore.dispatch(
    apiSys.endpoints.system.initiate({
      url: 'http://localhost/api/sys/system',
      set: true,
    }),
  );
});

afterAll(() => {
  mockService.stop();
});

test('should be able to login as user', async () => {
  /**
   * Get the user account information.
   */
  const { user } = await accountsGet();

  const result = await clientStore.dispatch(apiAuth.endpoints.login.initiate({
    handle: user.handle,
    password: user.password,
  }));

  if ('error' in result) {
    expect(result.error).toBeUndefined();
    return;
  }

  const { data } = result;

  expect(Object.keys(data.result || {})).toHaveLength(4);
  expect(data.bearers?.length).toBe(1);

  const state = clientStore.getState();
  const userActive = userSelectors.selectActive(state);
  const profileActive = profileSelectors.selectActive(state);
  const sessionActive = sessionSelectors.selectActive(state);
  const contactActive = contactSelectors.selectActive(state);

  expect(userActive?.$id).toBe(data.result?.[userKey][0].$id);
  expect(profileActive?.$id).toBe(data.result?.[profileKey][0].$id);
  expect(profileActive?.$user).toBe(userActive?.$id);
  expect(sessionActive?.$id).toBe(data.result?.[sessionKey][0].$id);
  expect(contactActive?.$id).toBe(data.result?.[contactKey][0].$id);
  expect(contactActive?.$id).toBe(profileActive?.$contact);
});

test('should NOT be able to login with a bad password', async () => {
  /**
   * Get the user account information.
   */
  const { user } = await accountsGet();

  const result = await clientStore.dispatch(apiAuth.endpoints.login.initiate({
    handle: user.handle,
    password: user.password.slice(1),
  }));

  if ('error' in result) {
    expect(result.error).toBeUndefined();
    return;
  }

  const { data } = result;
  const { logs } = data;

  expect(logs).toHaveLength(1);
  expect(logs?.[0]?.title).toBe('Authentication Failed: Wrong Password');
});

test('should not login as admin with improper agent private key', async () => {
  /**
   * Get the user account information.
   */
  const { admin } = await accountsGet();

  await agentUpdate({
    credentialId: admin.credential.$id,
  });

  const result = await clientStore.dispatch(apiAuth.endpoints.login.initiate({
    handle: admin.handle,
    password: admin.password,
  }));

  if ('error' in result) {
    expect(result.error).toBeUndefined();
    return;
  }

  const { data } = result;
  const { logs } = data;

  expect(logs).toHaveLength(1);
  expect(logs?.[0]?.title).toBe('Invalid Signature');
});

/**
 * TODO: This test will fail because audits are not being saved to the database yet.
 */
// test('should see audits of login requests as admin', async () => {
//   /**
//    * Get the user account information.
//    */
//   const { admin } = await accountsGet();

//   await agentUpdate({
//     credentialId: admin.credential.$id,
//     privateKey: admin.privateKey,
//   });

//   const resultLogin = await clientStore.dispatch(apiAuth.endpoints.login.initiate({
//     handle: admin.handle,
//     password: admin.password,
//   }));

//   if ('error' in resultLogin) {
//     expect(resultLogin.error).toBeUndefined();
//   }

//   const audits = databaseMemoryStorage()[auditKey];

//   expect(Object.keys(audits)).toHaveLength(1);
//   expect(Object.keys(audits).length).toBeGreaterThan(1);
// });
