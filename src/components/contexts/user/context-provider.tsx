import { useEffect, useState, type ReactNode } from 'react';
import { UserContext, type AuthToken } from './context';

import { clearTokens, getStoredTokens, isTokenValid } from '../../../lib/api/token-storage';
import type { Customer } from '@commercetools/platform-sdk';
import { getCurrentCustomer } from '../../../lib/api/get-customer';
import type {
  LoginSchema,
  PersonalSchemaNoPassword,
  RegisterSchema,
} from '../../../lib/schemas/user';

import { login as loginApi } from '../../../lib/api/login';
import { signup as signupApi, type AddressOptions } from '../../../lib/api/create-customer';
import { updateCustomer as updateCustomerApi } from '../../../lib/api/update-customer';
import { getAnonymousClient } from '../../../lib/api/get-anonymous-client';

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<AuthToken | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [authorized, setAuthorized] = useState(isTokenValid('customer'));

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (isTokenValid('customer')) {
          const storedTokens = getStoredTokens('customer');
          const customerData = await getCurrentCustomer();
          setCustomer(customerData);
          setAuthorized(true);
          setToken(storedTokens);
          return;
        }

        if (isTokenValid('anonymous')) {
          const anonToken = getStoredTokens('anonymous');
          setToken(anonToken);
          setAuthorized(false);
          return;
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        clearTokens('anonymous');
        clearTokens('customer');
        setToken(null);
        setAuthorized(false);
        setCustomer(null);
      }
    };

    void initializeAuth();
  }, []);

  const login = async (data: LoginSchema) => {
    const customer = await loginApi(data);
    if (!customer) return;

    clearTokens('anonymous');

    setToken(getStoredTokens('customer'));
    setCustomer(customer.body);
    setAuthorized(true);

    return customer;
  };

  const logout = () => {
    clearTokens('customer');
    setToken(null);
    setAuthorized(false);
    setCustomer(null);

    void getAnonymousClient();
  };

  const signup = async (data: RegisterSchema, options: AddressOptions) => {
    const customer = await signupApi(data, options);
    if (!customer) return;

    clearTokens('anonymous');

    setToken(getStoredTokens('customer'));
    setCustomer(customer.body);
    setAuthorized(true);

    return customer;
  };

  const updateInfo = async (data: PersonalSchemaNoPassword) => {
    if (!customer) return;

    const customerResponse = await updateCustomerApi(data, customer.version);

    setCustomer(customerResponse.body);
  };

  return (
    <UserContext.Provider
      value={{ token, customer, authorized, login, logout, signup, updateInfo }}
    >
      {children}
    </UserContext.Provider>
  );
}
