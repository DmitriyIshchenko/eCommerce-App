import type { ReactNode } from "react";
import useTheme from "../../../hooks/use-theme";
import { ThemeContext } from "./context";

export default function ThemeProvider({ children }: { children: ReactNode }) {
	const { mode, setMode } = useTheme();

	return (
		<ThemeContext.Provider value={{ mode, setMode }}>
			{children}
		</ThemeContext.Provider>
	);
}
