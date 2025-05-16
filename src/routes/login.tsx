import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "../components/login-form";
import RegistrationForm from "../components/registration-form";
import Login from "../features/login";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Login />
		</div>
	);
}
