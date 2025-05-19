import type { CheckboxProps } from '@fluentui/react-components';
import type { RegisterSchema } from '../schemas/user';
import { createAnonymousClient, getApiRoot } from './client';

type AddressOptions = Record<string, CheckboxProps['checked']>;

function createCustomerDraft(data: RegisterSchema, options: AddressOptions) {
  const { isDefaultShippingAddress, isDefaultBillingAddress, shippingAsBilling } = options;

  return {
    ...data,
    dateOfBirth: data.dateOfBirth.toISOString().split('T')[0],
    shippingAddresses: [0],
    billingAddresses: [shippingAsBilling ? 0 : 1],
    ...(isDefaultShippingAddress && { defaultShippingAddress: 0 }),
    ...(isDefaultBillingAddress && { defaultBillingAddress: shippingAsBilling ? 0 : 1 }),
  };
}

export async function createCustomer(data: RegisterSchema, options: AddressOptions) {
  const client = createAnonymousClient();
  const apiRoot = getApiRoot(client);

  const response = await apiRoot
    .customers()
    .post({
      body: createCustomerDraft(data, options),
    })
    .execute();

  return response;
}
