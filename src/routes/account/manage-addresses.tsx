import { createFileRoute } from '@tanstack/react-router';
import AccountPage from '../../pages/account';
import AccountInfo from '../../components/ui/account-info';

export const Route = createFileRoute('/account/manage-addresses')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AccountPage>
      <AccountInfo />
    </AccountPage>
  );
}
