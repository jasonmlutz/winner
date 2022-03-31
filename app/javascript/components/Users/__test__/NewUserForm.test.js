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

const renderNewUserForm = () => {
  createRoot(container).render(
    <BrowserRouter>
      <CurrentUserProvider>
        <NewUserForm />
      </CurrentUserProvider>
    </BrowserRouter>
  );
};

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
    renderNewUserForm();
  });
  expect(screen.getByText(/create a new account/i));
});

describe("username validation", () => {
  test("initial state has no username message", () => {
    act(() => {
      renderNewUserForm();
    });
    const usernameAvailabilityText = screen.queryByText(/available!/i);
    expect(usernameAvailabilityText).toBeNull();
  });
  test("displays when username is unavailable", () => {});
  test.todo("displays when username is available");
});
describe("password validation", () => {
  test.todo("displays when passwords match ");
  test.todo("displays when passwords do not match");
  test.todo(
    "correctly updates password validation message on ⌘+delete/selectAll+delete"
  );
});
describe("register button", () => {
  it("disabled on initial render", () => {
    act(() => {
      renderNewUserForm();
    });
    expect(screen.getByRole("button", { name: /register/i })).toBeDisabled();
  });
  test.todo("enabled for valid username and matching passwords");
});
describe("navigation", () => {
  test.todo("link to sign in page");
  test.todo("button to browse as guest");
});
describe("registration", () => {
  test.todo("user can register");
});
