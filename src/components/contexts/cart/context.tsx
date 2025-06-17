import { createContext } from 'react';
import type { Cart } from '@commercetools/platform-sdk';

interface CartContextType {
  cart: Cart | null;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
  cartLoading: boolean;
  setCartLoading: (value: boolean) => void;
  addItemToCart: (productId: string, variantId?: number) => Promise<Cart>;
  createCart: () => Promise<Cart>;
  refreshCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | null>(null);
