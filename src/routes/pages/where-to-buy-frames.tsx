import { createFileRoute } from '@tanstack/react-router';
import WhereToBuyFramesPage from '../../pages/where-to-buy-frames';

export const Route = createFileRoute('/pages/where-to-buy-frames')({
  component: RouteComponent,
});

function RouteComponent() {
  return <WhereToBuyFramesPage />;
}
