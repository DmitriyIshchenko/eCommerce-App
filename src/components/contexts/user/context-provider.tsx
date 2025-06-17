import { useEffect, useState, type ReactNode } from 'react';
import { UserContext, type AuthToken } from './context';

import { clearTokens, getStoredTokens, isTokenValid } from '../../../lib/api/token-storage';
import type { Cart, Customer } from '@commercetools/platform-sdk';
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
import {
  createCartForCurrentCustomer,
  getActiveCart,
  updateActiveCart,
} from '../../../lib/api/cart';

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<AuthToken | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [authorized, setAuthorized] = useState(isTokenValid('customer'));
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (isTokenValid('customer')) {
          const storedTokens = getStoredTokens('customer');
          const customerData = await getCurrentCustomer();

          setCustomer(customerData);
          setAuthorized(true);
          setToken(storedTokens);

          await refreshCart();
        } else if (isTokenValid('anonymous')) {
          const anonToken = getStoredTokens('anonymous');

          setToken(anonToken);
          setAuthorized(false);

          await refreshCart();
        } else {
          await createCart();
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        clearTokens('anonymous');
        clearTokens('customer');
        setToken(null);
        setAuthorized(false);
        setCustomer(null);
        setCart(null);
      }
    };

    void initializeAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = async (data: LoginSchema) => {
    const customer = await loginApi(data);
    if (!customer) return;

    clearTokens('anonymous');

    setToken(getStoredTokens('customer'));
    setCustomer(customer.body);
    setAuthorized(true);

    await refreshCart();

    return customer;
  };

  const logout = async () => {
    clearTokens('customer');
    setToken(null);
    setAuthorized(false);
    setCustomer(null);
    setCart(null);

    await getAnonymousClient();

    await createCart();
  };

  const signup = async (data: RegisterSchema, options: AddressOptions) => {
    const customer = await signupApi(data, options);
    if (!customer) return;

    clearTokens('anonymous');

    setToken(getStoredTokens('customer'));
    setCustomer(customer.body);
    setAuthorized(true);

    await refreshCart();

    return customer;
  };

  const updateInfo = async (data: PersonalSchemaNoPassword) => {
    if (!customer) return;

    const customerResponse = await updateCustomerApi(data, customer.version);

    setCustomer(customerResponse.body);
  };

  const createCart = async () => {
    const { body: newCart } = await createCartForCurrentCustomer({ currency: 'USD' });
    setCart(newCart);
  };

  const addItemToCart = async (productId: string, variantId?: number) => {
    if (!cart) {
      const { body: newCart } = await createCartForCurrentCustomer({ currency: 'USD' });
      setCart(newCart);
    }

    const { body: activeCart } = await getActiveCart();

    const { body: updatedCart } = await updateActiveCart({
      cartId: activeCart.id,
      cartUpdateDraft: {
        version: activeCart.version,
        productId,
        variantId,
        quantity: 1,
      },
    });

    setCart(updatedCart);

    return updatedCart;
  };

  const refreshCart = async () => {
    const activeCart = await getActiveCart();
    if (activeCart.statusCode === 200) {
      setCart(activeCart.body);
    } else {
      await createCart();
    }
  };

  return (
    <UserContext.Provider
      value={{
        token,
        customer,
        authorized,
        login,
        logout,
        signup,
        updateInfo,
        cart,
        cartLoading,
        setCartLoading,
        addItemToCart,
        createCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
