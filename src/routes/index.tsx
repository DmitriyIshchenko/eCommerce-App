import { createFileRoute } from "@tanstack/react-router";
import StrangeForm from "../components/strange-form";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<StrangeForm />
		</div>
	);
}
