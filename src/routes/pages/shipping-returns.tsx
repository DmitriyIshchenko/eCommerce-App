import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/pages/shipping-returns')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/pages/shipping-returns"!</div>;
}
