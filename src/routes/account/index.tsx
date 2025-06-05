import { createFileRoute } from '@tanstack/react-router';
import AccountPage from '../../pages/account';
import AccountInfo from '../../components/ui/account-info';

export const Route = createFileRoute('/account/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AccountPage>
      <AccountInfo />
    </AccountPage>
  );
}
