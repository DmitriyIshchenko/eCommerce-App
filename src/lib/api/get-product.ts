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

export async function getProductBySlug(productSlug: string) {
  const apiRoot = getApiRootSmart();

  try {
    const productResponse = await apiRoot
      .productProjections()
      .get({
        queryArgs: {
          where: `slug(en-US="${productSlug}")`,
        },
      })
      .execute();

    const product = productResponse.body.results[0];

    return product;
  } catch {
    throw new Error(`Product with SLUG ${productSlug} not found`);
  }
}
