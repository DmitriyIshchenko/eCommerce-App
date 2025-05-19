import type { CheckboxProps } from '@fluentui/react-components';
import type { RegisterSchema } from '../schemas/user';
import { createAnonymousClient, getApiRoot } from './client';

function createCustomerDraft(
  data: RegisterSchema,
  isDefaultShippingAddress: CheckboxProps['checked'],
  isDefaultBillingAddress: CheckboxProps['checked'],
) {
  return {
    ...data,
    dateOfBirth: data.dateOfBirth.toISOString().split('T')[0],
    shippingAddresses: [0],
    billingAddresses: [1],
    ...(isDefaultShippingAddress && { defaultShippingAddress: 0 }),
    ...(isDefaultBillingAddress && { defaultBillingAddress: 1 }),
  };
}

export async function createCustomer(
  data: RegisterSchema,
  isDefaultShippingAddress: CheckboxProps['checked'],
  isDefaultBillingAddress: CheckboxProps['checked'],
) {
  const client = createAnonymousClient();
  const apiRoot = getApiRoot(client);

  const response = await apiRoot
    .customers()
    .post({ body: createCustomerDraft(data, isDefaultShippingAddress, isDefaultBillingAddress) })
    .execute();

  return response;
}
