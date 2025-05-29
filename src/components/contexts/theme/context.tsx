import {
	type Dispatch,
	type SetStateAction,
	createContext,
	useContext,
} from "react";

export type ColorMode = "light" | "dark";

export interface ThemeContext {
	mode: ColorMode;
	setMode: Dispatch<SetStateAction<ColorMode>>;
}

export const ThemeContext = createContext<ThemeContext | null>(null);

export function useThemeContext() {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("must be used within provider");
	return context;
}
