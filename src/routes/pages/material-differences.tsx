import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/pages/material-differences')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/pages/material-differences"!</div>;
}
