import { createFileRoute } from '@tanstack/react-router';
import CustomFramingPage from '../../pages/custom-framing';

export const Route = createFileRoute('/pages/custom-framing')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CustomFramingPage />;
}
