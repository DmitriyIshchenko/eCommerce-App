import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";

import App from "./App.tsx";

const root = document.createElement("div");
root.id = "root";
document.body.append(root);

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
