import { createFileRoute, redirect } from '@tanstack/react-router';
import AccountPage from '../../pages/account';
import PersonalEditForm from '../../features/account/personal-edit-form';
import { isTokenValid } from '../../lib/api/token-storage';

export const Route = createFileRoute('/account/edit')({
  component: RouteComponent,
  beforeLoad: () => {
    if (!isTokenValid('customer')) throw redirect({ to: '/login' });
  },
});

function RouteComponent() {
  return (
    <AccountPage>
      <PersonalEditForm />
    </AccountPage>
  );
}
