import type { Cart } from '@commercetools/platform-sdk';
import { useCallback, useState, type ReactNode } from 'react';
import {
  addDiscountCodeToCart,
  createCartForCurrentCustomer,
  deleteCart,
  deleteItemFromCart,
  getActiveCart,
  reduceItemQuantityInCart,
  removeDiscountCodeFromCart,
  updateActiveCart,
} from '../../../lib/api/cart';
import { CartContext } from './context';
import { useLoading } from '../../../hooks/use-loading';

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const { setLoading: setCartLoading } = useLoading();

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

  const addItemToCart = useCallback(
    async (productId: string, variantId?: number, quantity = 1) => {
      try {
        setCartLoading(true);
        const { body: activeCart } = await getActiveCart();

        const { body: updatedCart } = await updateActiveCart({
          cartId: activeCart.id,
          cartUpdateDraft: {
            version: activeCart.version,
            productId,
            variantId,
            quantity: quantity,
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
    },
    [setCartLoading],
  );

  const reduceItemQuantity = useCallback(
    async (id: string) => {
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
    },
    [setCartLoading],
  );

  const deleteItem = useCallback(
    async (id: string) => {
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
    },
    [setCartLoading],
  );

  const deleteItemByProductId = useCallback(
    async (id: string, variantId = 1) => {
      try {
        setCartLoading(true);
        const { body: activeCart } = await getActiveCart();

        const lineItem = activeCart.lineItems.find((item) => {
          return id === item.productId && variantId === item.variant.id;
        });

        if (!lineItem) {
          console.error('Item not found in cart');
          return activeCart;
        }

        const { body: updatedCart } = await deleteItemFromCart({
          cartId: activeCart.id,
          cartUpdateDraft: {
            version: activeCart.version,
            lineItemId: lineItem?.id || id,
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
    },
    [setCartLoading],
  );

  const refreshCart = useCallback(async () => {
    try {
      const activeCart = await getActiveCart();
      if (activeCart.statusCode === 200) {
        setCart(activeCart.body);
      }
    } catch (error) {
      console.error('Failed to refresh cart:', error);
    }
  }, []);

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
  }, [createCart, setCartLoading]);

  const isCartEmpty = useCallback(() => !cart || cart?.lineItems.length === 0, [cart]);

  const addDiscountCode = useCallback(async (code: string) => {
    try {
      const { body: activeCart } = await getActiveCart();

      const { body: updatedCart } = await addDiscountCodeToCart({
        id: activeCart.id,
        version: activeCart.version,
        code: code,
      });

      setCart(updatedCart);

      return updatedCart;
    } catch (error) {
      console.error('Failed to add discount code:', error);
      throw error;
    }
  }, []);

  const removeDiscountCode = useCallback(async (codeId: string) => {
    try {
      const { body: activeCart } = await getActiveCart();

      const { body: updatedCart } = await removeDiscountCodeFromCart({
        id: activeCart.id,
        version: activeCart.version,
        codeId,
      });

      setCart(updatedCart);

      return updatedCart;
    } catch (error) {
      console.error('Failed to remove discount code:', error);
      throw error;
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addItemToCart,
        createCart,
        refreshCart,
        reduceItemQuantity,
        deleteItem,
        deleteItemByProductId,
        clearCart,
        isCartEmpty,
        addDiscountCode,
        removeDiscountCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
