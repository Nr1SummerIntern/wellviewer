import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.tsx";

console.log("🚀 App is loading...");

const rootElement = document.getElementById("root");
console.log("Root element:", rootElement);

createRoot(rootElement!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

console.log("✅ App mounted successfully");