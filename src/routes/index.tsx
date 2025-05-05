import { createFileRoute } from "@tanstack/react-router";
import App from "../App";
import HeroCarousel from "../components/hero-carousel";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <HeroCarousel/>;
}
