import { createFileRoute, redirect, useLocation } from '@tanstack/react-router';
import CustomBreadcrumb from '../components/ui/breadcrumb';
import { isTokenValid } from '../lib/api/token-storage';
import type { Link } from '../lib/types';
import { kebabToCapitalizedSpacedString } from '../lib/utils/kebab-to-capitalized-spaced-string';
import LoginPage from '../pages/login';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  beforeLoad: () => {
    if (isTokenValid()) throw redirect({ to: '/' });
  },
});

function RouteComponent() {
  const links: Link[] = useLocation()
    .pathname.split('/')
    .slice(1)
    .reduce((a: Link[], v) => {
      const current: Link = {
        text: kebabToCapitalizedSpacedString(v),
        to: a.length ? `${a.at(-1)?.to}/${v}` : `/${v}`,
      };
      return [...a, current];
    }, []);
  return (
    <>
      <CustomBreadcrumb links={links} truncate={10} />
      <main style={{ viewTransitionName: 'warp-content' }}>
        <LoginPage />
      </main>
    </>
  );
}
