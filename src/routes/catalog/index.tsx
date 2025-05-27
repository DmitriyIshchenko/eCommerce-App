import { createFileRoute, Link } from '@tanstack/react-router';
import { getCategories } from '../../lib/api/get-categories';
import { Spinner } from '@fluentui/react-components';

export const Route = createFileRoute('/catalog/')({
  loader: getCategories,
  component: RouteComponent,
  pendingComponent: () => <Spinner />,
});

function RouteComponent() {
  const categories = Route.useLoaderData();

  return (
    <div>
      <Link to="/catalog/$category" params={{ category: 'all' }}>
        Shop All
      </Link>
      <Link to="/catalog/$category" params={{ category: 'test' }}>
        TEST
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          to="/catalog/$category"
          params={{ category: `${category.slug['en-US']}` }}
        >
          {category.name['en-US']}
        </Link>
      ))}
    </div>
  );
}
