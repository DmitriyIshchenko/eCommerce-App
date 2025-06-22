import { createFileRoute, useLocation } from '@tanstack/react-router';
import { makeStyles, Spinner, tokens } from '@fluentui/react-components';
import CatalogPage from '../../pages/catalog';
import CustomBreadcrumb from '../../components/ui/breadcrumb';
import type { Link } from '../../lib/types';
import { formatString } from '../../lib/utils/format-string';

const useStyles = makeStyles({
  breadContainer: {
    width: '100%',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
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
  pendingComponent: () => (
    <div
      style={{
        minHeight: '35vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spinner />
    </div>
  ),
});

function RouteComponent() {
  const styles = useStyles();

  const { pathname } = useLocation();
  const pathnames = pathname.split('/').slice(1).filter(Boolean);
  const links: Link[] = pathnames.reduce((a: Link[], v) => {
    const current: Link = {
      text: formatString(v),
      to: a.length ? `${a.at(-1)?.to}/${v}` : `/${v}`,
    };
    return [...a, current];
  }, []);

  return (
    <>
      <div className={styles.breadContainer}>
        <CustomBreadcrumb links={links} />
      </div>
      <main className={styles.container}>
        <CatalogPage />
      </main>
    </>
  );
}
