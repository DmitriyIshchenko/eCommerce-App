import type { Cart } from '@commercetools/platform-sdk';
import { useState, type ReactNode } from 'react';
import {
  createCartForCurrentCustomer,
  getActiveCart,
  updateActiveCart,
} from '../../../lib/api/cart';
import { CartContext } from './context';

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartLoading, setCartLoading] = useState(false);

  const createCart = async () => {
    const { body: newCart } = await createCartForCurrentCustomer({ currency: 'USD' });
    setCart(newCart);
    return newCart;
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

    // console.log('added to cart: ', updatedCart);

    setCart(updatedCart);

    return updatedCart;
  };

  const refreshCart = async () => {
    const { body: activeCart } = await getActiveCart();
    setCart(activeCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, cartLoading, setCartLoading, createCart, refreshCart, addItemToCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
