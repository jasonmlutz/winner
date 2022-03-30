/**
 * @jest-environment jsdom
 */
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import App from "../components/App";
import { CurrentUserProvider } from "../components/contexts/CurrentUserContext";

jest.mock("react-dom", () => ({ render: jest.fn() }));
jest.mock("../components/App", () => {
  return function App() {
    return <div>APP</div>;
  };
});

describe("Application root", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("../index.jsx");
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <BrowserRouter>
          <CurrentUserProvider>
            <App />
          </CurrentUserProvider>
        </BrowserRouter>
      </React.StrictMode>,
      div
    );
  });
});
