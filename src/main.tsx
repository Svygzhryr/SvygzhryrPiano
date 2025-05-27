import { createRoot } from "react-dom/client";
import { App } from "./components/App";

import ErrorBoundary from "./components/ErrorBoundary";

import { ErrorFallback } from "./components/ErrorFallback";
import "./styles/app.scss";
import "./styles/reset.css";

import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./store/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
