import { isTokenValid } from './token-storage';
import { createClientWithToken, getApiRoot } from './client';

export async function getCurrentCustomer() {
  if (!isTokenValid('customer')) {
    throw new Error('Session expired - please login again');
  }

  const client = createClientWithToken('customer');
  const apiRoot = getApiRoot(client);

  const response = await apiRoot.me().get().execute();

  return response.body;
}
