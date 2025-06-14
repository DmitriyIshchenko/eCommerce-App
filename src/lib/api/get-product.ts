import { getApiRootSmart } from './client';

export async function getProductById(productId: string) {
  const apiRoot = getApiRootSmart();

  try {
    const productResponse = await apiRoot
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
