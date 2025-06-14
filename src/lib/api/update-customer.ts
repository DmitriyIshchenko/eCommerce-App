import type { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import type { PersonalSchemaNoPassword } from '../schemas/user';
import { createClientWithToken, getApiRoot } from './client';

export async function updateCustomer(data: PersonalSchemaNoPassword, version: number) {
  const { firstName, lastName, email, dateOfBirth } = data;

  const actions: MyCustomerUpdateAction[] = [
    {
      action: 'setFirstName',
      firstName,
    },
    { action: 'setLastName', lastName },
    { action: 'changeEmail', email },
    { action: 'setDateOfBirth', dateOfBirth: dateOfBirth.toISOString().split('T')[0] },
  ];

  const client = createClientWithToken('customer');
  const apiRoot = getApiRoot(client);

  const customer = await apiRoot
    .me()
    .post({
      body: {
        version,
        actions,
      },
    })
    .execute();

  return customer;
}
