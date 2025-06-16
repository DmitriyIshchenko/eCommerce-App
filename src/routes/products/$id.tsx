import { createFileRoute } from '@tanstack/react-router';
import { getProductById } from '../../lib/api/get-product';
import ProductPage from '../../pages/product';

export const Route = createFileRoute('/products/$id')({
  loader: async ({ params }) => {
    const productId = params?.id.split('/').at(-1);
    if (!productId) {
      throw new Error('Product not ID');
    }
    const product = await getProductById(productId);

    if (!product) {
      throw new Error('Product not found');
    }
    return { product };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { product } = Route.useLoaderData();
  return <ProductPage product={product} />;
}
