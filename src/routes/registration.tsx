import { createFileRoute } from '@tanstack/react-router'
import RegistrationForm from '../components/registration-form';
import Registration from '../features/registration';

export const Route = createFileRoute('/registration')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><Registration /></div>
}
