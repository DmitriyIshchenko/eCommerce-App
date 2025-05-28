import { Spinner } from '@fluentui/react-components';
import { createFileRoute } from '@tanstack/react-router';
import ErrorPage from '../../../pages/error-page';
import { getCategoryBySlug } from '../../../lib/api/get-categories';
import { getProductsByCategoryId } from '../../../lib/api/get-products';
import CategoryPage from '../../../pages/category';

export const Route = createFileRoute('/catalog/$category/$subcategory')({
  loader: async ({ params }) => {
    const slugCat = params.category;
    const slugSubcat = params.subcategory;

    const category = await getCategoryBySlug(slugCat);
    const subcategory = await getCategoryBySlug(slugSubcat);

    const products = await getProductsByCategoryId(subcategory.id);

    if (!products) {
      throw new Error('Products not found');
    }

    return { products, category, subcategory };
  },
  component: RouteComponent,
  pendingComponent: () => <Spinner size="large" style={{ padding: '54px 0' }} />,
  errorComponent: () => <ErrorPage />,
});

function RouteComponent() {
  const { products, category, subcategory } = Route.useLoaderData();
  return <CategoryPage products={products} category={category} subcategory={subcategory} />;
}
