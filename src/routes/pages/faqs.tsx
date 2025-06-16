import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/pages/faqs')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/pages/faqs"!</div>;
}
