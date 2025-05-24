import { createFileRoute, redirect } from '@tanstack/react-router';
import RegisterPage from '../pages/register';
import { AUTHORIZED_KEY } from '../lib/constants';

export const Route = createFileRoute('/register')({
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
  return <RegisterPage />;
}
