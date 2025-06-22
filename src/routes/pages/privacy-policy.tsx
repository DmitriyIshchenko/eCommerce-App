import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/pages/privacy-policy')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/pages/privacy-policy"!</div>;
}
