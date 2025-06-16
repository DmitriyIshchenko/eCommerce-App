import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/pages/returns')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/pages/returns"!</div>;
}
