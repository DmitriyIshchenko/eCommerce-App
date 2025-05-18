import type { LoginSchema } from '../schemas/user';
import { createClient, getApiRoot } from './client';

export async function login(data: LoginSchema) {
  const client = createClient(data);
  const apiRoot = getApiRoot(client);

  const clientResponse = await apiRoot.me().get().execute();

  return clientResponse;
}
