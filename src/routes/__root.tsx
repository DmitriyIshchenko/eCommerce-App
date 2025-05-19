import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import ErrorPage from '../pages/error-page';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <ErrorPage />,
});

function RootComponent() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
