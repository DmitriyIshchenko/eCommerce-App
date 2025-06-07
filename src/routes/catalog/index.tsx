import { createFileRoute } from '@tanstack/react-router';
import { makeStyles, Spinner } from '@fluentui/react-components';
import { Route as RootRoute } from '../__root';
import { InternalLink } from '../../components/ui/links/fui-tanstack';

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
  component: RouteComponent,
  pendingComponent: () => <Spinner />,
});

function RouteComponent() {
  const styles = useStyles();
  const { categories } = RootRoute.useRouteContext();
  const parentCategories = categories.filter((cat) => !cat.parent?.id);

  return (
    <div className={styles.container}>
      <InternalLink to="/catalog/$category/$" params={{ category: 'all' }} search>
        Shop All
      </InternalLink>
      {parentCategories.map((category) => (
        <InternalLink
          key={category.id}
          to="/catalog/$category/$"
          params={{ category: `${category.slug['en-US']}` }}
          search
        >
          {category.name['en-US']}
        </InternalLink>
      ))}
    </div>
  );
}
