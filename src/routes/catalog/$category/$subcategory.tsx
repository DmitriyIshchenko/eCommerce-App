import { Spinner } from '@fluentui/react-components';
import { createFileRoute } from '@tanstack/react-router';
import ErrorPage from '../../../pages/error-page';
import { getCategoryBySlug } from '../../../lib/api/get-categories';
import { getProductsBySearch } from '../../../lib/api/get-products';
import CategoryPage from '../../../pages/category';
import { productSearchSchema } from '../../../lib/schemas/products-search';

export const Route = createFileRoute('/catalog/$category/$subcategory')({
  validateSearch: (search) => productSearchSchema.parse(search),

  loaderDeps: ({ search: { q } }) => ({ q }),

  loader: async ({ deps, params }) => {
    const slugCat = params.category;
    const slugSubcat = params.subcategory;
    const q = deps.q;

    const category = await getCategoryBySlug(slugCat);
    const subcategory = await getCategoryBySlug(slugSubcat);

    const products = (await getProductsBySearch(q, subcategory.id)).body.results;

    if (!products) {
      throw new Error('Products not found');
    }

    return { products, category, subcategory };
  },

  component: RouteComponent,

  pendingComponent: () => (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spinner size="large" />
    </div>
  ),

  errorComponent: () => <ErrorPage />,
});

function RouteComponent() {
  const { products, category, subcategory } = Route.useLoaderData();

  return <CategoryPage products={products} category={category} subcategory={subcategory} />;
}
