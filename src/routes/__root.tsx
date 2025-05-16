import { Outlet, createRootRoute } from "@tanstack/react-router";
import Footer from "../components/footer";
import Header from "../components/header";
import { UserContextProvider } from "../components/contexts/user/context-provider";
import { Toaster, useId } from "@fluentui/react-components";
import { TOASTER_ID } from "../lib/constants";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {

  return (
    <UserContextProvider>
      <Header/>
      <Outlet />
      <Footer/>
      <Toaster toasterId={TOASTER_ID} />
    </UserContextProvider>
  );
}
