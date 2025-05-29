import {
	type Theme,
	createLightTheme,
	tokens,
} from "@fluentui/react-components";
import { celestiaTheme } from "./celestia";

type CustomTheme = Theme & { tokenA: string };

export const lightTheme: CustomTheme = {
	...createLightTheme(celestiaTheme),
	fontFamilyBase: "Montserrat, sans-serif;",
	tokenA: "#020303",
	colorCompoundBrandStroke: "#002c4e",
};

export const customTokens: Record<keyof CustomTheme, string> = {
	...tokens,
	tokenA: "var(--tokenA)",
};
