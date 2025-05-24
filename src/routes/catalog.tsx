import { createFileRoute } from '@tanstack/react-router';
import CatalogPage from '../pages/catalog';

export const Route = createFileRoute('/catalog')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CatalogPage />;
}
