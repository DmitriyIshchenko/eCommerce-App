import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/pages/search')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/pages/search"!</div>;
}
