import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import ErrorPage from '../pages/error-page';
import { getCategories } from '../lib/api/get-categories';
import type { Category } from '@commercetools/platform-sdk';
import { isTokenValid } from '../lib/api/token-storage';
import { createCartForCurrentCustomer } from '../lib/api/cart';

interface RouterContext {
  categories: Category[];
}

let categories: Category[] | undefined;

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,

  beforeLoad: async () => {
    if (!isTokenValid('anonymous') && !isTokenValid('customer')) {
      await createCartForCurrentCustomer({ currency: 'USD' });
    }

    categories ??= await getCategories();

    if (!categories) {
      throw new Error('Categories not found');
    }

    return { categories };
  },

  notFoundComponent: () => <ErrorPage />,
  errorComponent: () => <ErrorPage />,
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
