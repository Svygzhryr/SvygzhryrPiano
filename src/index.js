import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";

import ErrorBoundary from "./components/ErrorBoundary";

import "./styles/reset.css";
import "./styles/app.scss";
import { ErrorFallback } from "./components/ErrorFallback";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
