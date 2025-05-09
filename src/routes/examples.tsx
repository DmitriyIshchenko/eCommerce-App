import { createFileRoute } from '@tanstack/react-router'
import Example1 from '../components/state-context/1-props-drilling';
import Example2 from '../components/state-context/2-change-parent-state';
import Example3 from '../components/state-context/3-change-relative-state';
import Example4 from '../components/state-context/4-exchange-through-context';
import { ExampleContextProvider } from '../components/state-context/context';

export const Route = createFileRoute('/examples')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ExampleContextProvider>
    <div><Example4/></div>
  </ExampleContextProvider>
}
