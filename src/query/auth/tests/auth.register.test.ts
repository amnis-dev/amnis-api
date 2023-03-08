import { mockService } from '@amnis/mock';
import {
  contactKey,
  credentialKey,
  profileKey,
  sessionKey,
  userKey,
  bearerSelectors,
  contactSelectors,
  credentialSelectors,
  profileSelectors,
  sessionSelectors,
  userSelectors,
  apiActions,
} from '@amnis/state';
import { apiAuth } from '../index.js';
import {
  baseUrl, serviceConfig,
} from './config.js';
import { clientStore } from './store.js';

clientStore.dispatch(apiActions.upsertMany([
  { id: 'apiAuth', baseUrl: `${baseUrl}/auth` },
  { id: 'apiCrud', baseUrl: `${baseUrl}/crud` },
]));

beforeAll(async () => {
  await mockService.setup(await serviceConfig());
  mockService.start();
});

afterAll(() => {
  mockService.stop();
});

test('should register a new account', async () => {
  const response = await clientStore.dispatch(apiAuth.endpoints.register.initiate({
    handle: 'newbie',
    password: 'newpass123',
    email: 'newbie@newbie.addr',
    nameDisplay: 'Newbie User',
  }));

  if ('error' in response) {
    expect(response.error).toBeUndefined();
    return;
  }

  const { data: { logs, result, bearers } } = response;

  if (!result || !bearers) {
    expect(result).toBeDefined();
    expect(bearers).toBeDefined();
    return;
  }

  expect(logs.length).toBeGreaterThanOrEqual(1);

  const userActive = userSelectors.selectActive(clientStore.getState());
  const credentialActive = credentialSelectors.selectActive(clientStore.getState());
  const profileActive = profileSelectors.selectActive(clientStore.getState());
  const contactActive = contactSelectors.selectActive(clientStore.getState());
  const sessionActive = sessionSelectors.selectActive(clientStore.getState());

  const bearerActive = bearerSelectors.selectById(clientStore.getState(), 'core');

  if (
    !userActive
    || !credentialActive
    || !profileActive
    || !contactActive
    || !sessionActive
    || !bearerActive
  ) {
    expect(userActive).toBeDefined();
    expect(credentialActive).toBeDefined();
    expect(profileActive).toBeDefined();
    expect(contactActive).toBeDefined();
    expect(sessionActive).toBeDefined();
    expect(bearerActive).toBeDefined();
    return;
  }

  expect(userActive).toEqual(result[userKey][0]);
  expect(credentialActive).toEqual(result[credentialKey][0]);
  expect(profileActive).toEqual(result[profileKey][0]);
  expect(contactActive).toEqual(result[contactKey][0]);
  expect(sessionActive).toEqual(result[sessionKey][0]);
  expect(bearerActive).toEqual(bearers[0]);
});

test('should logout and login as the newly registered account', async () => {
  /**
   * Logout
   */
  await clientStore.dispatch(apiAuth.endpoints.logout.initiate({}));

  /**
   * Login
   */
  const response = await clientStore.dispatch(apiAuth.endpoints.login.initiate({
    handle: 'newbie',
    password: 'newpass123',
  }));

  if ('error' in response) {
    expect(response.error).toBeUndefined();
    return;
  }

  const { data: { result, bearers } } = response;

  expect(result).toBeDefined();
  expect(bearers).toBeDefined();
});
