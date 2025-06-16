import type { Cart } from '@commercetools/platform-sdk';
import { createContext, type Dispatch, type SetStateAction } from 'react';

interface CartContextType {
  cart: Cart | null;
  setCart: Dispatch<SetStateAction<Cart | null>>;
  cartLoading: boolean;
  createCart: () => Promise<Cart>;
  setCartLoading: (value: boolean) => void;
  refreshCart: () => Promise<void>;
  addItemToCart: (productId: string, variantId?: number) => Promise<Cart>;
}

export const CartContext = createContext<CartContextType | null>(null);
