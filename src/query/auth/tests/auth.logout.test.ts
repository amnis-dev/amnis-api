import {
  contactSelectors,
  profileSelectors,
  sessionSelectors,
  userSelectors,
  accountsGet,
  selectBearer,
  apiActions,
} from '@amnis/state';
import { apiAuth } from '../index.js';
import {
  baseUrl,
  serviceStart,
  serviceStop,
} from './service.js';
import { clientStore } from './store.js';

clientStore.dispatch(apiActions.upsertMany([
  { id: 'apiAuth', baseUrl: `${baseUrl}/auth` },
  { id: 'apiCrud', baseUrl: `${baseUrl}/crud` },
]));

beforeAll(async () => {
  await serviceStart();
});

afterAll(() => {
  serviceStop();
});

test('should be able to login and logout', async () => {
  /**
   * Get the user account information.
   */
  const { user } = await accountsGet();

  await clientStore.dispatch(apiAuth.endpoints.login.initiate({
    handle: user.handle,
    password: user.password,
  }));

  const sessionLoginActive = sessionSelectors.selectActive(clientStore.getState());

  const result = await clientStore.dispatch(apiAuth.endpoints.logout.initiate({}));

  if ('error' in result) {
    expect(result.error).toBeUndefined();
    return;
  }

  const { data } = result;
  expect(data.result?.session?.[0]).toEqual(sessionLoginActive?.$id);

  const state = clientStore.getState();
  const sessionActive = sessionSelectors.selectActive(state);
  const userActive = userSelectors.selectActive(state);
  const profileActive = profileSelectors.selectActive(state);
  const contactActive = contactSelectors.selectActive(state);

  const bearerToken = selectBearer(state, 'core');

  expect(sessionActive).toBeUndefined();
  expect(userActive).toBeUndefined();
  expect(profileActive).toBeUndefined();
  expect(contactActive).toBeUndefined();
  expect(bearerToken).toBeUndefined();
});
