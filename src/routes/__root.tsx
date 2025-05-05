import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import HeroCarousel from "../components/hero-carousel";
import Header from "../components/header";
import Footer from "../components/footer";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Header/>
      <Outlet />
      <Footer/>
    </React.Fragment>
  );
}
