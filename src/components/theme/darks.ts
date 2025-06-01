import { createDarkTheme } from "@fluentui/react-components";
import { celestiaTheme } from "./celestia";
import type { CustomTheme } from "./light";

export const darkTheme: CustomTheme = {
	...createDarkTheme(celestiaTheme),
	fontFamilyBase: "Montserrat, sans-serif",
	tokenA: "#020303",
	colorCompoundBrandStroke: "#9abfdc",
	fontSizeBase100: "12px",
	fontSizeBase200: "14px",
	fontSizeBase300: "16px",
	fontSizeBase400: "18px",
};

darkTheme.colorBrandForeground1 = celestiaTheme[110];
darkTheme.colorBrandForeground2 = celestiaTheme[120];
