import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app";
import ThemeProvider from "./components/contexts/theme/provider";
import "./styles/globals.css";

const root = document.createElement("div");
root.id = "root";
document.body.append(root);

createRoot(root).render(
	<StrictMode>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</StrictMode>,
);
