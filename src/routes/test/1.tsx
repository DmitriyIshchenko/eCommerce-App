import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/test/1')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div style={{ height: 200, backgroundColor: 'aqua' }}>
      <p>Hello "/test/1"!</p>
      <Link to="/test/1" viewTransition={{ types: ['slide-left'] }}>
        2
      </Link>
    </div>
  );
}
