import { createFileRoute, redirect } from '@tanstack/react-router';
import RegisterPage from '../pages/register';
import { isTokenValid } from '../lib/api/token-storage';

export const Route = createFileRoute('/register')({
  component: RouteComponent,
  beforeLoad: () => {
    if (isTokenValid()) {
      throw redirect({ to: '/' });
    }
  },
});

function RouteComponent() {
  return <RegisterPage />;
}
