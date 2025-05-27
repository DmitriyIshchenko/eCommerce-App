import { createAnonymousClient, getApiRoot } from './client';

export async function getCategories() {
  const anonymousClient = createAnonymousClient();
  const anonymousApiRoot = getApiRoot(anonymousClient);

  try {
    const categoriesResponse = await anonymousApiRoot.categories().get().execute();

    return categoriesResponse.body.results;
  } catch {
    throw new Error('no categories found');
  }
}

export async function getCategoryBySlug(slug: string) {
  const anonymousClient = createAnonymousClient();
  const anonymousApiRoot = getApiRoot(anonymousClient);

  try {
    const categoriesResponse = await anonymousApiRoot
      .categories()
      .get({
        queryArgs: {
          where: `slug(en-US="${slug}")`,
        },
      })
      .execute();

    return categoriesResponse.body.results[0];
  } catch {
    throw new Error('no categories found');
  }
}
