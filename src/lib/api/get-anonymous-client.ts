import { createAnonymousClient } from './client';

export async function getAnonymousClient() {
  const apiRoot = createAnonymousClient();
  await apiRoot.execute({ uri: '', method: 'GET' });
}
