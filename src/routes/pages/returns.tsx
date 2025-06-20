import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/pages/returns')({
  component: RouteComponent,
});

function RouteComponent() {
  return <main style={{ viewTransitionName: 'warp-content' }}>Hello "/pages/returns"!</main>;
}
