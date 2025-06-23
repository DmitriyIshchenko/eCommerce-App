import { createFileRoute } from '@tanstack/react-router';
import { getProductBySlug } from '../../lib/api/get-product';
import ProductPage from '../../pages/product';

export const Route = createFileRoute('/catalog/$category/$subcategory/$slug')({
  component: RouteComponent,
  loader: async ({ params: { slug } }) => {
    const product = await getProductBySlug(slug);
    return product;
  },
});

function RouteComponent() {
  const product = Route.useLoaderData();
  return <ProductPage product={product} />;
}
