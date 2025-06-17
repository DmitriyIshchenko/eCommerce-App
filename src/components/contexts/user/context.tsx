import { createContext } from 'react';
import type {
  LoginSchema,
  PersonalSchemaNoPassword,
  RegisterSchema,
} from '../../../lib/schemas/user';
import type { Cart, ClientResponse, Customer } from '@commercetools/platform-sdk';
import type { AddressOptions } from '../../../lib/api/create-customer';

export interface AuthToken {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  scope: string;
  expiresAt: number;
}

interface UserContextType {
  token: AuthToken | null;
  customer: Customer | null;
  authorized: boolean;
  login: (data: LoginSchema) => Promise<ClientResponse<Customer> | undefined>;
  logout: () => Promise<void>;
  signup: (
    data: RegisterSchema,
    options: AddressOptions,
  ) => Promise<ClientResponse<Customer> | undefined>;
  updateInfo: (data: PersonalSchemaNoPassword) => Promise<void>;
  cart: Cart | null;
  cartLoading: boolean;
  setCartLoading: (value: boolean) => void;
  addItemToCart: (productId: string, variantId?: number) => Promise<Cart>;
  createCart: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);
