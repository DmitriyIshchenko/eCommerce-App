import { createFileRoute } from '@tanstack/react-router';
import { getCategoryBySlug } from '../../../lib/api/get-categories';
import { getProducts, getProductsByCategoryId } from '../../../lib/api/get-products';
import { Spinner } from '@fluentui/react-components';
import ErrorPage from '../../../pages/error-page';
import CategoryPage from '../../../pages/category';

export const Route = createFileRoute('/catalog/$category/')({
  loader: async ({ params }) => {
    const slug = params.category;

    const category = await getCategoryBySlug(slug);
    const products = category ? await getProductsByCategoryId(category.id) : await getProducts();

    if (!products) {
      throw new Error('Products not found');
    }

    return { products, category };
  },
  component: RouteComponent,
  pendingComponent: () => <Spinner size="large" style={{ padding: '54px 0' }} />,
  errorComponent: () => <ErrorPage />,
});

function RouteComponent() {
  const { products, category } = Route.useLoaderData();
  return <CategoryPage products={products} category={category} />;
}
