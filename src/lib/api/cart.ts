import type { CartDraft } from '@commercetools/platform-sdk';
import { getApiRootSmart } from './client';

interface CartUpdateDraft {
  version: number;
  productId: string;
  variantId?: number;
  quantity: number;
}

export async function createCartForCurrentCustomer(cartDraft: CartDraft) {
  const { currency } = cartDraft;
  const apiRoot = getApiRootSmart();
  try {
    return apiRoot
      .me()
      .carts()
      .post({
        body: {
          currency,
        },
      })
      .execute();
  } catch {
    throw new Error('Failed to create a cart');
  }
}

export async function getActiveCart() {
  const apiRoot = getApiRootSmart();
  try {
    const activeCart = await apiRoot.me().activeCart().get().execute();

    return activeCart;
  } catch {
    throw new Error('Cart not found');
  }
}

export async function updateActiveCart(productDetails: {
  cartId: string;
  cartUpdateDraft: CartUpdateDraft;
}) {
  const apiRoot = getApiRootSmart();
  try {
    let cartId = productDetails.cartId;
    const cartUpdateDraft = productDetails.cartUpdateDraft;

    if (!cartId) {
      const { body } = await createCartForCurrentCustomer({
        currency: 'USD',
      });
      cartId = body.id;
      cartUpdateDraft.version = body.version;
    }

    const updatedCart = await apiRoot
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartUpdateDraft.version,
          actions: [
            {
              action: 'addLineItem',
              productId: cartUpdateDraft.productId,
              variantId: cartUpdateDraft.variantId,
              quantity: cartUpdateDraft.quantity,
            },
          ],
        },
      })
      .execute();

    return updatedCart;
  } catch {
    throw new Error('Failed to add cart item');
  }
}
