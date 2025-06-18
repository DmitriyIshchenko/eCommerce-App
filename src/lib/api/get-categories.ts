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

export async function getSubcategoriesByParentId(parentId: string) {
  const anonymousClient = createAnonymousClient();
  const anonymousApiRoot = getApiRoot(anonymousClient);

  try {
    const categoriesResponse = await anonymousApiRoot
      .categories()
      .get({
        queryArgs: {
          where: `parent(id="${parentId}")`,
        },
      })
      .execute();

    return categoriesResponse.body.results;
  } catch {
    throw new Error('Failed to get subcategories');
  }
}

export async function getCategoryById(id: string) {
  const anonymousClient = createAnonymousClient();
  const anonymousApiRoot = getApiRoot(anonymousClient);

  try {
    const categoryResponse = await anonymousApiRoot.categories().withId({ ID: id }).get().execute();
    return categoryResponse.body;
  } catch {
    throw new Error('Category not found');
  }
}
