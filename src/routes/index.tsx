import { createFileRoute } from '@tanstack/react-router';
import { MainBanner } from '../components/main-banner';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <MainBanner/>;
}
