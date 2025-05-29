import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import ErrorPage from '../pages/error-page';
import { getCategories } from '../lib/api/get-categories';

export const Route = createRootRoute({
  loader: getCategories,
  component: RootComponent,
  notFoundComponent: () => <ErrorPage />,
});

function RootComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
