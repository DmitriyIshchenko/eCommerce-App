import {
	FluentProvider,
	type Theme,
	Toaster,
} from "@fluentui/react-components";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TOASTER_ID } from "../lib/constants";
import { routeTree } from "../routeTree.gen";
import { LoadingContextProvider } from "./contexts/loading/context-provider";
import { useThemeContext } from "./contexts/theme/context.tsx";
import { UserContextProvider } from "./contexts/user/context-provider";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	const { mode } = useThemeContext();
	const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);

	useEffect(() => {
		async function loadTheme() {
			try {
				if (mode === "light") {
					const themeModule = await import("../lib/theme/light.ts");
					setCurrentTheme(themeModule.lightTheme);
				}
				if (mode === "dark") {
					const themeModule = await import("../lib/theme/darks.ts");
					setCurrentTheme(themeModule.darkTheme);
				}
			} catch (e) {
				console.error(e);
			}
		}
		loadTheme();
	}, [mode]);

	return (
		<FluentProvider theme={currentTheme ?? undefined}>
			<LoadingContextProvider>
				<UserContextProvider>
					<RouterProvider router={router} />
					<Toaster toasterId={TOASTER_ID} />
				</UserContextProvider>
			</LoadingContextProvider>
		</FluentProvider>
	);
}

export default App;
