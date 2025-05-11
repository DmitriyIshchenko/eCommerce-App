import {
	RouterProvider,
	createMemoryHistory,
	createRootRoute,
	createRoute,
	createRouter,
} from "@tanstack/react-router";
// import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";
import Header from ".";
import { UserContextProvider } from "../contexts/user/context-provider";
import Login from "../../features/login";

describe("Navigation to Login and Registration Pages for Unauthorized Users (15 points)", () => {
	beforeEach(async () => {
		const rootRoute = createRootRoute();
		const indexRoute = createRoute({
			getParentRoute: () => rootRoute,
			path: "/",
			component: () => (
				<div data-testid="is-rendered">
					<UserContextProvider>
						<Header />
					</UserContextProvider>
				</div>
			),
		});
		const loginRoute = createRoute({
			getParentRoute: () => rootRoute,
			path: "/login",
			component: () => (
				<div data-testid="is-rendered">
					<UserContextProvider>
						<Login />
					</UserContextProvider>
				</div>
			),
		});
		const testRouter = createRouter({
			routeTree: rootRoute.addChildren([indexRoute, loginRoute]),
			history: createMemoryHistory({
				initialEntries: ["/"],
			}),
		});
		render(<RouterProvider router={testRouter} />);

		await waitFor(() => {
			expect(screen.getByTestId("is-rendered")).toBeInTheDocument();
		});
	});

	test("Debug Example", () => {
		screen.debug();
	});
	test("A clear and visible link for the login page is present for unauthorized users.", () => {
		const link = screen.getByRole("link", { name: "Login" });
		expect(link).toBeVisible();
	});
	test("Clicking the link takes the user to the login page.", async () => {
		const link = screen.getByRole("link", { name: "Login" });
		await userEvent.click(link);
		await waitFor(() => {
			expect(
				screen.getByText("Something Unique For Login Page"),
			).toBeInTheDocument();
		});
		screen.debug(); // remove it then
	});
	test("A clear and visible link for the registration page is present for unauthorized users.", () => {
		// implement independently by analogy
	});
	test("Clicking the link takes the user to the registration page.", () => {
		// implement independently by analogy
		// don't forget to create Registration Page route inside BeforeEach
	});
});
