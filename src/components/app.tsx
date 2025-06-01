import {
	FluentProvider,
	type Theme,
	Toaster,
	makeStaticStyles,
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

const useStaticCss = makeStaticStyles({
	body: {
		margin: "0",
		backgroundColor: "var(--body-bg)"
	},
	".container": {
		maxWidth: "1440px",
	},
});

function App() {
	const { mode } = useThemeContext();
	const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
	useStaticCss();

	useEffect(() => {
		async function loadTheme() {
			try {
				if (mode === "light") {
					const themeModule = await import("./theme/light.ts");
					setCurrentTheme(themeModule.lightTheme);
					document.body.style.setProperty(
						"--body-bg",
						themeModule.lightTheme.colorNeutralBackground1,
					);
				}
				if (mode === "dark") {
					const themeModule = await import("./theme/darks.ts");
					setCurrentTheme(themeModule.darkTheme);
					document.body.style.setProperty(
						"--body-bg",
						themeModule.darkTheme.colorNeutralBackground1,
					);
				}
			} catch (e) {
				console.error(e);
			}
		}
		void loadTheme();
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
