import { Outlet, createRootRoute } from '@tanstack/react-router';
import { makeStyles, tokens } from '@fluentui/react-components';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import ErrorPage from '../pages/error-page';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <ErrorPage />,
});

const useClasses = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: `calc(100vh - 100px)`,
    maxWidth: '1440px',
    margin: '0 auto',
    padding: `0 ${tokens.spacingVerticalXXL}`,
    boxSizing: 'border-box',
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
