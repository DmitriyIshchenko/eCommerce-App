import { createFileRoute, useLocation } from '@tanstack/react-router';
import CustomBreadcrumb from '../components/ui/breadcrumb';
import type { Link } from '../lib/types';
import { kebabToCapitalizedSpacedString } from '../lib/utils/kebab-to-capitalized-spaced-string';
import AboutPage from '../pages/about';

export const Route = createFileRoute('/about')({
  component: RouteComponent,
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
      <CustomBreadcrumb links={links} />
      <main style={{ viewTransitionName: 'warp-content' }}>
        <AboutPage />
      </main>
    </>
  );
}
