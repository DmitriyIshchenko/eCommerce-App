import { createFileRoute } from '@tanstack/react-router';
import { getCategoryBySlug } from '../../../lib/api/get-categories';
import { getProductsBySearch, getProductsByText } from '../../../lib/api/get-products';
import { Spinner } from '@fluentui/react-components';
import ErrorPage from '../../../pages/error-page';
import CategoryPage from '../../../pages/category';
import { productSearchSchema } from '../../../lib/schemas/products-search';

export const Route = createFileRoute('/catalog/$category/')({
  validateSearch: (search) => productSearchSchema.parse(search),

  loaderDeps: ({ search: { q } }) => ({ q }),

  loader: async ({ deps, params }) => {
    const slug = params.category;
    const q = deps.q;

    const category = await getCategoryBySlug(slug);
    const products = category
      ? (await getProductsBySearch(q, category.id)).body.results
      : (await getProductsByText(deps.q)).body.results;

    if (!products) {
      throw new Error('Products not found');
    }

    return { products, category };
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
  const { products, category } = Route.useLoaderData();
  return <CategoryPage products={products} category={category} />;
}
