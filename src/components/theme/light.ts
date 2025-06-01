import {
	type Theme,
	createLightTheme,
	tokens,
} from "@fluentui/react-components";
import { celestiaTheme } from "./celestia";

export type CustomTheme = Theme & { tokenA: string };

export const lightTheme: CustomTheme = {
	...createLightTheme(celestiaTheme),
	fontFamilyBase: "Montserrat, sans-serif",
	tokenA: "#020303",
	colorCompoundBrandStroke: "#002c4e",
	fontSizeBase100: "12px",
	fontSizeBase200: "14px",
	fontSizeBase300: "16px",
	fontSizeBase400: "18px",
};

export const customTokens: Record<keyof CustomTheme, string> = {
	...tokens,
	tokenA: "var(--tokenA)",
};
