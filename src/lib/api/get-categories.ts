import type { ProductProjection } from '@commercetools/platform-sdk';
import { createAnonymousClient, getApiRoot, getApiRootSmart } from './client';

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

export const getProductCategories = async (product: ProductProjection) => {
  try {
    const mainCategoryId = product.categories?.[0]?.id;
    const mainCategory = mainCategoryId ? await getCategoryById(mainCategoryId) : null;

    const subCategoryId = product.categories?.[1]?.id;
    const subCategory = subCategoryId ? await getCategoryById(subCategoryId) : null;

    return {
      category: mainCategory?.slug?.['en-US'] ?? 'all',
      subCategory: subCategory?.slug?.['en-US'] ?? 'whole',
    };
  } catch {
    return {
      category: 'all',
      subCategory: 'whole',
    };
  }
};
