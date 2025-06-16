import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/pages/where-to-buy-frames')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/pages/where-to-buy-frames"!</div>;
}
