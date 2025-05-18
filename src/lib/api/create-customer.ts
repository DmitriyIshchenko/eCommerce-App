import type { RegisterSchema } from '../schemas/user';
import { createAnonymousClient, getApiRoot } from './client';

function createCustomerDraft(data: RegisterSchema) {
  const { email, password, firstName, lastName, dateOfBirth, ...address } = data;

  const addresses = [
    {
      country: address.country,
      city: address.city,
      postalCode: address.postalCode,
      streetName: address.street,
    },
  ];
  return {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth: dateOfBirth.toISOString().split('T')[0],
    addresses,
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
