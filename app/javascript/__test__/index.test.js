/**
 * @jest-environment jsdom
 */
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import App from "../components/App";
// import { container } from "../index";
import { CurrentUserProvider } from "../components/contexts/CurrentUserContext";

jest.mock("react-dom", () => ({ createRoot: jest.fn() }));
jest.mock("../components/App", () => {
  return function App() {
    return <div>APP</div>;
  };
});

describe("Application root", () => {
  test.todo("should render without crashing");
  // const div = document.createElement("div");
  // div.id = "root";
  // document.body.appendChild(div);
  // require("../index.jsx");
  // expect(ReactDOM.createRoot).toHaveBeenCalledWith(container);
  // expect(ReactDOM.render).toHaveBeenCalledWith(
  //   <React.StrictMode>
  //     <BrowserRouter>
  //       <CurrentUserProvider>
  //         <App />
  //       </CurrentUserProvider>
  //     </BrowserRouter>
  //   </React.StrictMode>,
  //   div
  // );
});
