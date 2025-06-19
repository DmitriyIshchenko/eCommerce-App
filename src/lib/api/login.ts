import type { LoginSchema } from '../schemas/user';
import { createAnonymousClient, createPasswordClient, getApiRoot } from './client';

export async function login(data: LoginSchema) {
  const anonymousClient = createAnonymousClient();
  const anonymousApiRoot = getApiRoot(anonymousClient);

  const loginResponse = await anonymousApiRoot
    .me()
    .login()
    .post({
      body: {
        email: data.email,
        password: data.password,
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
      },
    })
    .execute();

  if (loginResponse.statusCode === 200) {
    const customerClient = createPasswordClient(data);
    const customerApiRoot = getApiRoot(customerClient);

    const customerResponse = await customerApiRoot.me().get().execute();
    return customerResponse;
  }

  return;
}
