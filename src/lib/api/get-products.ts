import { PRODUCTS_LIMIT } from '../constants';
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
          limit: 100,
        },
      })
      .execute();

    const products = productsResponse.body.results;

    return products;
  } catch {
    throw new Error('Products not found');
  }
}

export function getProductsByText(search: string) {
  const anonymousClient = createAnonymousClient();
  const anonymousApiRoot = getApiRoot(anonymousClient);

  try {
    const productsResponse = anonymousApiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          'text.en-us': `${search}`,
          fuzzy: true,
        },
      })
      .execute();

    return productsResponse;
  } catch {
    throw new Error('Products not found');
  }
}

export function getProductsBySearch(
  page?: number,
  q?: string,
  color?: string,
  material?: string,
  minPrice?: number,
  maxPrice?: number,
  sort?: string,
  categoryId?: string,
) {
  const anonymousClient = createAnonymousClient();
  const anonymousApiRoot = getApiRoot(anonymousClient);

  try {
    const filters: string[] = [];

    if (categoryId) {
      filters.push(`categories.id:"${categoryId}"`);
    }

    if (color) {
      filters.push(`variants.attributes.color:"${color}"`);
    }

    if (material) {
      filters.push(`variants.attributes.material.key:"${material}"`);
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      filters.push(`variants.price.centAmount:range (${minPrice * 100} to ${maxPrice * 100})`);
    }

    const productsResponse = anonymousApiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          markMatchingVariants: true,
          ...(q && { 'text.en-us': `${q}` }),
          sort: sort ?? 'createdAt asc',
          fuzzy: true,
          limit: PRODUCTS_LIMIT,
          offset: PRODUCTS_LIMIT * ((page ?? 1) - 1),
          ...(filters.length > 0 && { 'filter.query': filters }),
        },
      })
      .execute();

    return productsResponse;
  } catch {
    throw new Error('Products not found');
  }
}
