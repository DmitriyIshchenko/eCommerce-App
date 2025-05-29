import { type Theme, createDarkTheme } from "@fluentui/react-components";
import { celestiaTheme } from "./celestia";

export const darkTheme: Theme = {
	...createDarkTheme(celestiaTheme),
	fontFamilyBase: "Montserrat, sans-serif;",
};

darkTheme.colorBrandForeground1 = celestiaTheme[110];
darkTheme.colorBrandForeground2 = celestiaTheme[120];
