import { Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../components/header";
import Footer from "../components/footer";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  );
}
