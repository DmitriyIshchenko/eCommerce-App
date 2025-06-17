import type { Cart } from '@commercetools/platform-sdk';
import { useCallback, useState, type ReactNode } from 'react';
import {
  createCartForCurrentCustomer,
  getActiveCart,
  updateActiveCart,
} from '../../../lib/api/cart';
import { CartContext } from './context';

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartLoading, setCartLoading] = useState(false);

  const createCart = useCallback(async () => {
    try {
      const { body: newCart } = await createCartForCurrentCustomer({ currency: 'USD' });
      setCart(newCart);
      return newCart;
    } catch (error) {
      console.error('Failed to create cart:', error);
      throw error;
    }
  }, []);

  const addItemToCart = useCallback(async (productId: string, variantId?: number) => {
    try {
      setCartLoading(true);
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
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      throw error;
    } finally {
      setCartLoading(false);
    }
  }, []);

  const refreshCart = useCallback(async () => {
    try {
      const activeCart = await getActiveCart();
      if (activeCart.statusCode === 200) {
        setCart(activeCart.body);
      } else {
        await createCart();
      }
    } catch (error) {
      console.error('Failed to refresh cart:', error);
    }
  }, [createCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartLoading,
        setCartLoading,
        addItemToCart,
        createCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
