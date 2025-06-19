import type { CheckboxProps } from '@fluentui/react-components';
import type { RegisterSchema } from '../schemas/user';
import { createAnonymousClient, createPasswordClient, getApiRoot } from './client';

export type AddressOptions = Record<string, CheckboxProps['checked']>;

function createCustomerDraft(data: RegisterSchema, options: AddressOptions) {
  const { isDefaultShippingAddress, isDefaultBillingAddress, shippingAsBilling } = options;

  const addresses = shippingAsBilling ? data.addresses.slice(1) : data.addresses;

  return {
    ...data,
    addresses,
    dateOfBirth: data.dateOfBirth.toISOString().split('T')[0],
    shippingAddresses: [0],
    billingAddresses: [shippingAsBilling ? 0 : 1],
    ...(isDefaultShippingAddress && { defaultShippingAddress: 0 }),
    ...(isDefaultBillingAddress && { defaultBillingAddress: shippingAsBilling ? 0 : 1 }),
  };
}

export async function signup(data: RegisterSchema, options: AddressOptions) {
  const apiRoot = getApiRoot(createAnonymousClient());
  const signupResponse = await apiRoot
    .me()
    .signup()
    .post({ body: createCustomerDraft(data, options) })
    .execute();

  if (signupResponse.statusCode === 201) {
    const customerClient = createPasswordClient({ email: data.email, password: data.password });
    const customerApiRoot = getApiRoot(customerClient);

    const customerResponse = await customerApiRoot.me().get().execute();

    return customerResponse;
  }
}
