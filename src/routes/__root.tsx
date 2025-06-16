import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import ErrorPage from '../pages/error-page';
import { getCategories } from '../lib/api/get-categories';
import type { Category } from '@commercetools/platform-sdk';

interface RouterContext {
  categories: Category[];
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,

  beforeLoad: async () => {
    const categories = await getCategories();

    if (!categories) {
      throw new Error('Categories not found');
    }

    return { categories };
  },

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
