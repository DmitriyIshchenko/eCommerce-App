import { createFileRoute } from '@tanstack/react-router';
import LoginPage from '../pages/login';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginPage />;
}
