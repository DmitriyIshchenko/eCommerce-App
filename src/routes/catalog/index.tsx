import { Spinner, makeStyles } from '@fluentui/react-components';
import { createFileRoute, useLocation } from '@tanstack/react-router';
import CustomBreadcrumb from '../../components/ui/breadcrumb';
import { InternalLink } from '../../components/ui/links/fui-tanstack';
import type { Link } from '../../lib/types';
import { kebabToCapitalizedSpacedString } from '../../lib/utils/kebab-to-capitalized-spaced-string';
import { Route as RootRoute } from '../__root';
import CollectionsOverview from '../../features/collections-overview';

const useStyles = makeStyles({
  container: {
    minHeight: '35vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    viewTransitionName: 'warp-container',
  },
});

export const Route = createFileRoute('/catalog/')({
  component: RouteComponent,
  pendingComponent: () => <Spinner />,
});

function RouteComponent() {
  const styles = useStyles();
  const { categories } = RootRoute.useRouteContext();
  // const parentCategories = categories.filter((cat) => !cat.parent?.id);

  const links: Link[] = useLocation()
    .pathname.split('/')
    .slice(1)
    .reduce((a: Link[], v) => {
      const current: Link = {
        text: kebabToCapitalizedSpacedString(v),
        to: a.length ? `${a.at(-1)?.to}/${v}` : `/${v}`,
      };
      return [...a, current];
    }, []);

  return (
    <>
      <CustomBreadcrumb links={links} />
      <main className={styles.container}>
        <CollectionsOverview />
      </main>
    </>
  );
}
