import { createFileRoute } from '@tanstack/react-router';
import { getCategoryBySlug } from '../../lib/api/get-categories';
import ErrorPage from '../../pages/error-page';
import CategoryPage from '../../pages/category';

export const Route = createFileRoute('/catalog/$category')({
  loader: async ({ params }) => {
    const slug = params.category;

    if (slug === 'all') return null;

    const category = await getCategoryBySlug(slug);

    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  },
  component: RouteComponent,
  errorComponent: () => <ErrorPage />,
});

function RouteComponent() {
  const category = Route.useLoaderData();
  return <CategoryPage category={category} />;
}
