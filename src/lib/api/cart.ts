import type { CartDraft, MyCartUpdateAction } from '@commercetools/platform-sdk';
import { getApiRootSmart } from './client';

interface CartUpdateDraft {
  version: number;
  productId: string;
  variantId?: number;
  quantity: number;
}

interface ReduceQuantityDraft {
  version: number;
  lineItemId: string;
  quantity?: number;
}

interface DeleteItemDraft {
  version: number;
  lineItemId: string;
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

export async function reduceItemQuantityInCart(productDetails: {
  cartId: string;
  cartUpdateDraft: ReduceQuantityDraft;
}) {
  try {
    const { cartId, cartUpdateDraft } = productDetails;
    const apiRoot = getApiRootSmart();

    const removeAction: MyCartUpdateAction = {
      action: 'removeLineItem',
      lineItemId: cartUpdateDraft.lineItemId,
      ...(cartUpdateDraft.quantity && { quantity: cartUpdateDraft.quantity }),
    };

    const updatedCart = await apiRoot
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartUpdateDraft.version,
          actions: [removeAction],
        },
      })
      .execute();

    return updatedCart;
  } catch {
    throw new Error('Failed to reduce quantity');
  }
}

export async function deleteItemFromCart(productDetails: {
  cartId: string;
  cartUpdateDraft: DeleteItemDraft;
}) {
  try {
    const { cartId, cartUpdateDraft } = productDetails;
    const apiRoot = getApiRootSmart();

    const updatedCart = await apiRoot
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartUpdateDraft.version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId: cartUpdateDraft.lineItemId,
            },
          ],
        },
      })
      .execute();

    return updatedCart;
  } catch {
    throw new Error('Failed to remove item');
  }
}
