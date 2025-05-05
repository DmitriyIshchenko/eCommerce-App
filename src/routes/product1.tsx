import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product1')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/product1"!</div>
}
