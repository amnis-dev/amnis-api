import { mockService } from '@amnis/mock';
import {
  contactKey,
  entityStrip,
  contactCreator,
  accountsGet,
  agentUpdate,
  contactActions,
  contactSelectors,
  userSelectors,
  apiActions,
} from '@amnis/state';
import { apiAuth } from '../../auth/index.js';
import { apiCrud } from '../index.js';
import { baseUrl, serviceConfig } from './config.js';
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

test('should be able to create a new contact', async () => {
  /**
   * Get the user account information.
   */
  const { admin } = await accountsGet();

  await agentUpdate({
    credentialId: admin.credential.$id,
    privateKey: admin.privateKey,
  });

  await clientStore.dispatch(apiAuth.endpoints.login.initiate({
    handle: admin.handle,
    password: admin.password,
  }));

  const contactCreatorAction = contactActions.create(contactCreator({
    name: 'New Contact',
    emails: ['new@email.com'],
    phones: [],
    socials: [],
  }));
  const contactActionEntityId = contactCreatorAction.payload.entity.$id;

  /**
   * Locally create the entity.
   */
  clientStore.dispatch(contactCreatorAction);

  /**
   * Select the newly created entity.
   */
  const contactLocal = contactSelectors.selectById(clientStore.getState(), contactActionEntityId);
  if (!contactLocal) {
    expect(contactLocal).toBeDefined();
    return;
  }
  expect(contactLocal.committed).toBe(false);
  expect(contactLocal.new).toBe(true);

  const contactStripped = entityStrip(contactLocal);
  const result = await clientStore.dispatch(apiCrud.endpoints.create.initiate({
    [contactKey]: [contactStripped],
  }));

  if ('error' in result) {
    expect(result.error).toBeUndefined();
    return;
  }

  const { data } = result;
  const contactResult = data.result?.[contactKey]?.[0];

  expect(contactResult).toBeDefined();

  const state = clientStore.getState();
  const user = userSelectors.selectActive(state);
  const contact = contactSelectors.selectById(state, contactResult?.$id || '');

  expect(contact).toMatchObject({
    name: 'New Contact',
    emails: ['new@email.com'],
    $creator: user?.$id,
    $owner: user?.$id,
    committed: true,
    new: false,
  });
});
