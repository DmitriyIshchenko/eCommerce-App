import { createFileRoute, redirect } from '@tanstack/react-router';
import LoginPage from '../pages/login';
import { isTokenValid } from '../lib/api/token-storage';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  beforeLoad: () => {
    if (isTokenValid()) throw redirect({ to: '/' });
  },
});

function RouteComponent() {
  return <LoginPage />;
}
