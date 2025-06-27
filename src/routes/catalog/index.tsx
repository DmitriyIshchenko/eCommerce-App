import { createFileRoute } from '@tanstack/react-router';
import { makeStyles, Spinner } from '@fluentui/react-components';
import CatalogPage from '../../pages/catalog';

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

  return (
    <main className={styles.container}>
      <CatalogPage />
    </main>
  );
}
