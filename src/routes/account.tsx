import { createFileRoute } from '@tanstack/react-router';
import AccountPage from '../pages/account';

export const Route = createFileRoute('/account')({
  component: RouteComponent,
});

function RouteComponent() {
  return <AccountPage />;
}
