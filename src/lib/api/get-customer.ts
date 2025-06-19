import { isTokenValid } from './token-storage';
import { createClientWithToken, getApiRoot } from './client';

export async function getCurrentCustomer() {
  if (!isTokenValid()) {
    throw new Error('Session expired - please login again');
  }

  const client = createClientWithToken();
  const apiRoot = getApiRoot(client);

  const response = await apiRoot.me().get().execute();

  return response.body;
}
