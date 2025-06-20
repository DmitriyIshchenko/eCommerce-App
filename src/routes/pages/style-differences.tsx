import { createFileRoute } from '@tanstack/react-router';
import StyleDifferencesPage from '../../pages/style-differences';

export const Route = createFileRoute('/pages/style-differences')({
  component: RouteComponent,
});

function RouteComponent() {
  return <StyleDifferencesPage />;
}
