import { FluentProvider, Toaster } from "@fluentui/react-components";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LoadingContextProvider } from "./components/contexts/loading/context-provider";
import { UserContextProvider } from "./components/contexts/user/context-provider";
import { TOASTER_ID } from "./lib/constants";
import { routeTree } from "./routeTree.gen";
import "./styles/globals.css";
import { lightTheme } from "./styles/theme";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const root = document.createElement("div");
root.id = "root";
document.body.append(root);

createRoot(root).render(
	<StrictMode>
		<FluentProvider theme={lightTheme}>
			<LoadingContextProvider>
				<UserContextProvider>
					<RouterProvider router={router} />
					<Toaster toasterId={TOASTER_ID} />
				</UserContextProvider>
			</LoadingContextProvider>
		</FluentProvider>
	</StrictMode>,
);
