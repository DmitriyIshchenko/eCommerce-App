import { createFileRoute, redirect } from '@tanstack/react-router';
import AccountPage from '../../pages/account';
import AccountInfo from '../../components/ui/account-info';
import { isTokenValid } from '../../lib/api/token-storage';

export const Route = createFileRoute('/account/')({
  component: RouteComponent,
  beforeLoad: () => {
    if (!isTokenValid('customer')) throw redirect({ to: '/login' });
  },
});

function RouteComponent() {
  return (
    <AccountPage>
      <AccountInfo />
    </AccountPage>
  );
}
