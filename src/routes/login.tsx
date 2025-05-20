import { createFileRoute, redirect } from '@tanstack/react-router';
import LoginPage from '../pages/login';
import { AUTHORIZED_KEY } from '../lib/constants';

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    if (localStorage.getItem(AUTHORIZED_KEY)) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginPage />;
}
