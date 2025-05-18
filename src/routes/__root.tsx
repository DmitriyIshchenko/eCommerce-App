import { Outlet, createRootRoute } from '@tanstack/react-router';
import { makeStyles } from '@fluentui/react-components';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import ErrorPage from '../pages/error-page';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <ErrorPage />,
});

const useClasses = makeStyles({
  main: {
    margin: '0 auto',
    minHeight: 'calc(100vh - 100px)',
    maxWidth: '1440px',
  },
});

function RootComponent() {
  const classes = useClasses();
  return (
    <>
      <Header />
      <main className={classes.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
