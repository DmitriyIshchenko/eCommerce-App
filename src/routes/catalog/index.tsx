import { createFileRoute, Link } from '@tanstack/react-router';
import { makeStyles, Spinner } from '@fluentui/react-components';
import { Route as RootRoute } from '../__root';

const useStyles = makeStyles({
  container: {
    minHeight: '35vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Route = createFileRoute('/catalog/')({
  // loader: getCategories,
  component: RouteComponent,
  pendingComponent: () => <Spinner />,
});

function RouteComponent() {
  const styles = useStyles();
  const categories = RootRoute.useLoaderData();
  const parentCategories = categories.filter((cat) => !cat.parent?.id);

  return (
    <div className={styles.container}>
      <Link to="/catalog/$category" params={{ category: 'all' }}>
        Shop All
      </Link>
      {parentCategories.map((category) => (
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
