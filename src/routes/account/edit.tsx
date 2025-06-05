import { createFileRoute } from '@tanstack/react-router';
import AccountPage from '../../pages/account';
import PersonalEditForm from '../../features/account/personal-edit-form';

export const Route = createFileRoute('/account/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AccountPage>
      <PersonalEditForm />
    </AccountPage>
  );
}
