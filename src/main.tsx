import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const rootElement = document.createElement("div");
rootElement.id = "root";
document.body.append(rootElement);

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
