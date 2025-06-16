import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/pages/custom-framing')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/pages/custom-framing"!</div>;
}
