import { Outlet, createRootRouteWithContext, useLocation } from '@tanstack/react-router';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import ErrorPage from '../pages/error-page';
import { getCategories } from '../lib/api/get-categories';
import type { Category } from '@commercetools/platform-sdk';
import { isTokenValid } from '../lib/api/token-storage';
import { createCartForCurrentCustomer } from '../lib/api/cart';
import { PromoBanner } from '../components/promo-banner';
import CustomBreadcrumb from '../components/ui/breadcrumb';
import type { Link } from '../lib/types';
import { formatString } from '../lib/utils/format-string';

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
  const { pathname } = useLocation();
  const pathnames = pathname
    .split('/')
    .slice(1)
    .filter((v) => v && v !== 'whole' && v !== 'pages');
  const links: Link[] = pathnames.reduce((a: Link[], v) => {
    const current: Link = {
      text: formatString(v),
      to: a.length ? `${a.at(-1)?.to}/${v}` : `/${v}`,
    };
    return [...a, current];
  }, []);

  return (
    <>
      <PromoBanner />
      <Header />
      <CustomBreadcrumb links={links} truncate={12} />
      <Outlet />
      <Footer />
    </>
  );
}
