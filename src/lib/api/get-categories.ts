import { getApiRootSmart } from './client';

export async function getCategories() {
  const apiRoot = getApiRootSmart();

  try {
    const categoriesResponse = await apiRoot.categories().get().execute();

    return categoriesResponse.body.results;
  } catch {
    throw new Error('no categories found');
  }
}

export async function getCategoryBySlug(slug: string) {
  const apiRoot = getApiRootSmart();

  try {
    const categoriesResponse = await apiRoot
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
  const apiRoot = getApiRootSmart();

  try {
    const categoriesResponse = await apiRoot
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
