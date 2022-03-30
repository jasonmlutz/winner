/**
 * @jest-environment jsdom
 */
// react imports
import React from "react";
import { BrowserRouter } from "react-router-dom";

// testing imports
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import { screen } from "@testing-library/react";
import { toBeDisabled } from "@testing-library/jest-dom";

// component imports
import NewUserForm from "../NewUserForm";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";

// fixing The current testing environment is not configured to support act(...)
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

it("renders correctly from snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <CurrentUserProvider>
          <NewUserForm />
        </CurrentUserProvider>
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  container.remove();
  container = null;
});

it("displays register-themed messaging", () => {
  act(() => {
    createRoot(container).render(
      <BrowserRouter>
        <CurrentUserProvider>
          <NewUserForm />
        </CurrentUserProvider>
      </BrowserRouter>
    );
  });
  expect(screen.getByText(/create a new account/i));
});

it("renders with register button disabled", () => {
  act(() => {
    createRoot(container).render(
      <BrowserRouter>
        <CurrentUserProvider>
          <NewUserForm />
        </CurrentUserProvider>
      </BrowserRouter>
    );
  });
  expect(screen.getByRole("button", { name: /register/i })).toBeDisabled();
});

test.todo("informs user when username is unavailable");

test.todo("informs user when username is available");

test.todo("user can register");
