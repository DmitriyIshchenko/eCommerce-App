import type { RegisterSchema } from '../schemas/user';
import { createAnonymousClient, getApiRoot } from './client';

function createCustomerDraft(data: RegisterSchema) {
  return {
    ...data,
    dateOfBirth: data.dateOfBirth.toISOString().split('T')[0],
    defaultBillingAddress: 0,
    defaultShippingAddress: 0,
  };
}

export async function createCustomer(data: RegisterSchema) {
  const client = createAnonymousClient();
  const apiRoot = getApiRoot(client);

  const response = await apiRoot
    .customers()
    .post({ body: createCustomerDraft(data) })
    .execute();

  return response;
}
