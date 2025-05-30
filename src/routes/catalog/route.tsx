import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import type { Link } from '../../lib/types';
import { formatString } from '../../lib/utils/format-string';
import CustomBreadcrumb from '../../components/ui/breadcrumb';
import { makeStyles, tokens } from '@fluentui/react-components';
import ErrorPage from '../../pages/error-page';

const useStyles = makeStyles({
  breadContainer: {
    width: '100%',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
});

export const Route = createFileRoute('/catalog')({
  component: RouteComponent,
  notFoundComponent: () => <ErrorPage />,
});

function RouteComponent() {
  const styles = useStyles();
  const { pathname } = useLocation();
  const links: Link[] = pathname
    .split('/')
    .slice(1)
    .reduce((a: Link[], v) => {
      const current: Link = {
        text: formatString(v),
        to: a.length ? `${a.at(-1)?.to}/${v}` : `/${v}`,
      };
      return [...a, current];
    }, []);

  return (
    <main>
      <div className={styles.breadContainer}>
        <CustomBreadcrumb links={links} />
      </div>
      <Outlet />
    </main>
  );
}
