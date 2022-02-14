import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { CurrentUserProvider } from "./components/contexts/CurrentUserContext";

import App from "./components/App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
