import { createFileRoute } from '@tanstack/react-router';
import MaterialDifferencesPage from '../../pages/material-differences';

export const Route = createFileRoute('/pages/material-differences')({
  component: RouteComponent,
});

function RouteComponent() {
  return <MaterialDifferencesPage />;
}
