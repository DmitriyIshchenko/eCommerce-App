import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";

import { LoadingContextProvider } from "./components/contexts/loading/context-provider";
import { routeTree } from "./routeTree.gen";

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
		<FluentProvider theme={webLightTheme}>
			<LoadingContextProvider>
				<RouterProvider router={router} />
			</LoadingContextProvider>
		</FluentProvider>
	</StrictMode>,
);
