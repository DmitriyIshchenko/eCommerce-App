import { createContext } from 'react';
import type { Cart } from '@commercetools/platform-sdk';

interface CartContextType {
  cart: Cart | null;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
  addItemToCart: (productId: string, variantId?: number) => Promise<Cart>;
  reduceItemQuantity: (id: string) => Promise<Cart>;
  deleteItem: (id: string) => Promise<Cart>;
  createCart: () => Promise<Cart>;
  refreshCart: () => Promise<void>;
  clearCart: () => Promise<void>;
  isCartEmpty: () => boolean;
}

export const CartContext = createContext<CartContextType | null>(null);
