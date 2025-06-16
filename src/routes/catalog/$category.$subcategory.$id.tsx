import { createFileRoute } from '@tanstack/react-router';
import { getProductById } from '../../lib/api/get-product';
import ProductPage from '../../pages/product';

export const Route = createFileRoute('/catalog/$category/$subcategory/$id')({
  component: RouteComponent,
  loader: async ({ params: { id } }) => {
    const product = await getProductById(id);
    return product;
  },
});

function RouteComponent() {
  const product = Route.useLoaderData();
  return <ProductPage product={product} />;
}
