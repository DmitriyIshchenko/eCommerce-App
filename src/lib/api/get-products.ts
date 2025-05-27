import { createAnonymousClient, getApiRoot } from './client';

export async function getProducts() {
  const anonymousClient = createAnonymousClient();
  const anonymousApiRoot = getApiRoot(anonymousClient);

  try {
    const productsResponse = await anonymousApiRoot
      .productProjections()
      .get({
        queryArgs: {
          limit: 60,
        },
      })
      .execute();

    const products = productsResponse.body.results;

    return products;
  } catch {
    throw new Error('Products not found');
  }
}

export async function getProductsByCategoryId(categoryId: string) {
  const anonymousClient = createAnonymousClient();
  const anonymousApiRoot = getApiRoot(anonymousClient);

  try {
    const productsResponse = await anonymousApiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: [`categories.id:"${categoryId}"`],
          limit: 20,
        },
      })
      .execute();

    const products = productsResponse.body.results;

    return products;
  } catch {
    throw new Error('Products not found');
  }
}
