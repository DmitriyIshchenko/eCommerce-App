import type { Cart, CartDraft, MyCartUpdateAction } from '@commercetools/platform-sdk';
import { getApiRootSmart } from './client';

interface CartUpdateDraft {
  version: number;
  productId: string;
  variantId?: number;
  quantity: number;
}

type ReduceQuantityDraft = Pick<CartUpdateDraft, 'version' | 'quantity'> & {
  lineItemId: string;
};

type DeleteItemDraft = Omit<ReduceQuantityDraft, 'quantity'>;

type AddDiscountCodeDraft = Pick<Cart, 'id' | 'version'> & {
  code: string;
};

type RemoveDiscountCodeDraft = Pick<Cart, 'id' | 'version'> & {
  codeId: string;
};

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
      quantity: cartUpdateDraft.quantity,
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

export async function deleteCart() {
  try {
    const cart = await getActiveCart();

    const apiRoot = getApiRootSmart();

    await apiRoot
      .me()
      .carts()
      .withId({ ID: cart.body.id })
      .delete({
        queryArgs: {
          version: cart.body.version,
        },
      })
      .execute();
  } catch {
    throw new Error('Failed to delete cart');
  }
}

export async function addDiscountCodeToCart(cartDetails: AddDiscountCodeDraft) {
  const { id, version, code } = cartDetails;

  const apiRoot = getApiRootSmart();

  try {
    const discountedCart = apiRoot
      .me()
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addDiscountCode',
              code,
            },
          ],
        },
      })
      .execute();

    return discountedCart;
  } catch {
    throw new Error('Failed to add discount code to cart');
  }
}

export async function removeDiscountCodeFromCart(cartDetails: RemoveDiscountCodeDraft) {
  const { id, version, codeId } = cartDetails;

  const apiRoot = getApiRootSmart();

  try {
    const undiscountedCart = apiRoot
      .me()
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'removeDiscountCode',
              discountCode: {
                typeId: 'discount-code',
                id: codeId,
              },
            },
          ],
        },
      })
      .execute();

    return undiscountedCart;
  } catch {
    throw new Error('Failed to remove discount code from cart');
  }
}
