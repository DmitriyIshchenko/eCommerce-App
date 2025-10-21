import { allColors, allMaterials, PRODUCTS_LIMIT, type Color, type Material } from '../constants';
import { getApiRootSmart } from './client';
import { isRangeFacetResult, isTermFacetResult } from './type-guards/facet';

export async function getProducts() {
  const apiRoot = getApiRootSmart();

  try {
    const productsResponse = await apiRoot
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
  const apiRoot = getApiRootSmart();

  try {
    const productsResponse = await apiRoot
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
  const apiRoot = getApiRootSmart();

  try {
    const productsResponse = apiRoot
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
  categoryId?: string,
  page?: number,
  q?: string,
  colors?: string[],
  materials?: string[],
  minPrice?: number,
  maxPrice?: number,
  sort?: string,
) {
  const apiRoot = getApiRootSmart();

  try {
    const filters: string[] = [];

    const facets: string[] = [];

    if (categoryId) {
      filters.push(`categories.id:"${categoryId}"`);
    }

    if (colors?.length) {
      filters.push(`variants.attributes.color:${colors.map((c) => `"${c}"`).join(',')}`);
    }

    if (materials?.length) {
      filters.push(
        `variants.attributes.material.key:${materials.map((m) => `"${m.toLowerCase()}"`).join(',')}`,
      );
    }

    facets.push(
      'variants.price.centAmount:range (0 to *)',
      'variants.attributes.color',
      'variants.attributes.material.key',
    );

    if (minPrice !== undefined && maxPrice !== undefined) {
      filters.push(`variants.price.centAmount:range (${minPrice * 100} to ${maxPrice * 100})`);
    }

    const productsResponse = apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          markMatchingVariants: true,
          ...(q && { 'text.en-us': `${q}` }),
          sort: sort ?? 'name.en-us asc',
          fuzzy: true,
          limit: PRODUCTS_LIMIT,
          offset: PRODUCTS_LIMIT * ((page ?? 1) - 1),
          ...(filters.length > 0 && { 'filter.query': filters }),
          facet: facets,
        },
      })
      .execute();

    return productsResponse;
  } catch {
    throw new Error('Products not found');
  }
}

export async function getCategoryProductsFacets(...args: Parameters<typeof getProductsBySearch>) {
  const { total, facets } = (await getProductsBySearch(...args)).body;
  let minCategoryPrice = 0;
  let maxCategoryPrice = 10000;
  let categoryColors: Color[] = [];
  let categoryMaterials: Material[] = [];
  const colorFacet = facets?.['variants.attributes.color'];
  const priceRangeFacet = facets?.['variants.price.centAmount'];
  const materialFacet = facets?.['variants.attributes.material.key'];

  if (priceRangeFacet && isRangeFacetResult(priceRangeFacet)) {
    minCategoryPrice = Math.ceil(priceRangeFacet.ranges[0].min / 100);
    maxCategoryPrice = Math.max(
      Math.ceil(priceRangeFacet.ranges[0].max / 100),
      minCategoryPrice + 1,
    );
  }

  if (colorFacet && isTermFacetResult(colorFacet)) {
    categoryColors = colorFacet.terms
      .filter((c) => allColors.some((v) => c.term === v.value))
      .map((c) => {
        const value = typeof c.term === 'string' ? c.term : '';
        return {
          color: allColors.find((c) => c.value === value)?.color ?? '',
          value,
          'aria-label': value,
        };
      });
  }

  if (materialFacet && isTermFacetResult(materialFacet)) {
    categoryMaterials = materialFacet.terms.map((m) => {
      const value = typeof m.term === 'string' ? m.term : '';
      const material = allMaterials.find((v) => v.value === value);
      return {
        swatchSrc: material?.swatchSrc ?? '',
        value,
        label: value,
        fullImageSrc: material?.fullImageSrc ?? '',
      };
    });
  }

  return {
    minCategoryPrice,
    maxCategoryPrice,
    categoryColors,
    categoryMaterials,
    total,
  };
}
