import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import HeroCarousel from "../components/hero-carousel";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div><HeroCarousel/></div>
      <Outlet />
    </React.Fragment>
  );
}
