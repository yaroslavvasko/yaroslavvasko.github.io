import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import ReactGA from "react-ga4";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";

// Initialize Google Analytics
// Replace with your actual Google Analytics ID
const GA_ID = import.meta.env.VITE_GA_ID || "G-XXXXXXXXXX";
if (GA_ID && GA_ID !== "G-XXXXXXXXXX") {
  ReactGA.initialize(GA_ID);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
