import { Outlet, createRootRoute } from "@tanstack/react-router";
import Footer from "../components/footer";
import Header from "../components/header";
import { UserContextProvider } from "../components/contexts/user/context-provider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <UserContextProvider>
      <Header/>
      <Outlet />
      <Footer/>
    </UserContextProvider>
  );
}
