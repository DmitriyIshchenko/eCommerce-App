import { createFileRoute, useLocation } from '@tanstack/react-router';
import { getProductById } from '../../lib/api/get-product';
import ProductPage from '../../pages/product';
import CustomBreadcrumb from '../../components/ui/breadcrumb';
import type { Link } from '../../lib/types';
import { kebabToCapitalizedSpacedString } from '../../lib/utils/kebab-to-capitalized-spaced-string';

export const Route = createFileRoute('/catalog/$category/$subcategory/$id')({
  component: RouteComponent,
  loader: async ({ params: { id } }) => {
    const product = await getProductById(id);
    return product;
  },
});

function RouteComponent() {
  const product = Route.useLoaderData();

  const links: Link[] = useLocation()
    .pathname.split('/')
    .slice(1)
    .filter((v) => v !== 'whole')
    .reduce((a: Link[], v, i, arr) => {
      const text =
        i === arr.length - 1 ? product.name?.['en-US'] : kebabToCapitalizedSpacedString(v);

      const current: Link = {
        text,
        to: a.length ? `${a.at(-1)?.to}/${v}` : `/${v}`,
      };
      return [...a, current];
    }, []);

  return (
    <>
      <CustomBreadcrumb links={links} truncate={10} />
      <main style={{ viewTransitionName: 'warp-content' }}>
        <ProductPage product={product} />
      </main>
    </>
  );
}
