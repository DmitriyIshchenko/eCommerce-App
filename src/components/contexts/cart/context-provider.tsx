import type { Cart } from '@commercetools/platform-sdk';
import { useCallback, useState, type ReactNode } from 'react';
import {
  createCartForCurrentCustomer,
  deleteCart,
  deleteItemFromCart,
  getActiveCart,
  reduceItemQuantityInCart,
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

  const reduceItemQuantity = useCallback(async (id: string) => {
    try {
      setCartLoading(true);
      const { body: activeCart } = await getActiveCart();

      const { body: updatedCart } = await reduceItemQuantityInCart({
        cartId: activeCart.id,
        cartUpdateDraft: {
          version: activeCart.version,
          lineItemId: id,
          quantity: 1,
        },
      });

      setCart(updatedCart);

      return updatedCart;
    } catch (error) {
      console.error('Failed to decrement quantity:', error);
      throw error;
    } finally {
      setCartLoading(false);
    }
  }, []);

  const deleteItem = useCallback(async (id: string) => {
    try {
      setCartLoading(true);
      const { body: activeCart } = await getActiveCart();

      const { body: updatedCart } = await deleteItemFromCart({
        cartId: activeCart.id,
        cartUpdateDraft: {
          version: activeCart.version,
          lineItemId: id,
        },
      });

      setCart(updatedCart);

      return updatedCart;
    } catch (error) {
      console.error('Failed to delete item:', error);
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

  const clearCart = useCallback(async () => {
    try {
      setCartLoading(true);

      await deleteCart();
      await createCart();
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    } finally {
      setCartLoading(false);
    }
  }, [createCart]);

  const isCartEmpty = useCallback(() => cart?.lineItems.length === 0, [cart?.lineItems.length]);

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
        reduceItemQuantity,
        deleteItem,
        clearCart,
        isCartEmpty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
