import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/pages/terms-of-service')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/pages/terms-of-service"!</div>;
}
