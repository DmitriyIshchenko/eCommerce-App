import { createFileRoute } from '@tanstack/react-router';
import MainPage from '../pages/main';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <MainPage />
    </div>
  );
}
