import { createAnonymousClient, getApiRoot } from './client';

export async function getProductById(productId: string) {
  const anonymousClient = createAnonymousClient();
  const anonymousApiRoot = getApiRoot(anonymousClient);

  try {
    const productResponse = await anonymousApiRoot
      .productProjections()
      .withId({ ID: productId })
      .get()
      .execute();

    const product = productResponse.body;

    return product;
  } catch {
    throw new Error(`Product with ID ${productId} not found`);
  }
}
